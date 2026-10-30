import { WISH_PHOTOS, type Shape, type WishPhoto } from '../../content/photos';
import { WISHES, type Wish } from '../../content/wishes';
import PhotoCard from './PhotoCard';
import WishCard from './WishCard';

// Wishes without a priority go after every ranked one
const UNRANKED = 99;

// Rough card height in characters: the columns are narrow, so text length is a good proxy.
// These numbers are guesses; tune them if the columns end up uneven on the phone.
const CHROME = 80; // padding, gaps and the sign-off row
const TITLE_BONUS = 1.3; // the title is larger and heavier than the message
const RIGHT_OFFSET = 30; // the right column is nudged down by mt-7

// A photo is as wide as a column, so its height is fixed by its shape:
// 5:3 is about 100px and 3:5 about 278px. A line of text is about 20px and holds about 18 characters,
// so 1px is roughly 0.9 characters.
const PHOTO_WEIGHT: Record<Shape, number> = { landscape: 90, portrait: 250 };

type Entry = { kind: 'wish'; wish: Wish } | { kind: 'photo'; photo: WishPhoto };

const wishEntry = (wish: Wish): Entry => ({ kind: 'wish', wish });
const photoEntry = (photo: WishPhoto): Entry => ({ kind: 'photo', photo });

const weight = (entry: Entry) =>
    entry.kind === 'photo'
        ? PHOTO_WEIGHT[entry.photo.shape]
        : CHROME + entry.wish.title.length * TITLE_BONUS + (entry.wish.message?.length ?? 0);

// Array.prototype.sort is stable, so equal priorities keep their order in the file
const ORDERED = [...WISHES].sort((a, b) => (a.priority ?? UNRANKED) - (b.priority ?? UNRANKED));

// A photo pinned to a wish (`after`) travels with that card; the rest are spread between the wishes
const wishIds = new Set(WISHES.map((wish) => wish.id));
const floating = WISH_PHOTOS.filter((photo) => !photo.after || !wishIds.has(photo.after));
if (import.meta.env.DEV) {
    for (const photo of floating) {
        if (photo.after) console.warn(`Wish photo "${photo.id}" is pinned to "${photo.after}", which is not a wish id`);
    }
}

// A block is a stack that always lands in one column: a wish and the photos pinned under it, or a lone photo.
// The k-th of P floating photos goes after the wish where (k + 1) / (P + 1) of the wishes have passed.
const blocks: Entry[][] = [];
let nextFloating = 0;
ORDERED.forEach((wish, i) => {
    const pinned = WISH_PHOTOS.filter((photo) => photo.after === wish.id).map(photoEntry);
    blocks.push([wishEntry(wish), ...pinned]);
    while (nextFloating < floating.length && i + 1 >= ((nextFloating + 1) * ORDERED.length) / (floating.length + 1)) {
        blocks.push([photoEntry(floating[nextFloating++])]);
    }
});
// With no wishes at all, the photos still show
for (; nextFloating < floating.length; nextFloating++) blocks.push([photoEntry(floating[nextFloating])]);

// Each block goes in the shorter column (ties go left), so the order reads
// left, right, then whichever side is short, and tall cards don't pile up on one side
const LEFT: Entry[] = [];
const RIGHT: Entry[] = [];
let leftHeight = 0;
let rightHeight = RIGHT_OFFSET;
for (const block of blocks) {
    const blockWeight = block.reduce((sum, entry) => sum + weight(entry), 0);
    if (leftHeight <= rightHeight) {
        LEFT.push(...block);
        leftHeight += blockWeight;
    } else {
        RIGHT.push(...block);
        rightHeight += blockWeight;
    }
}

function EntryCard({ entry }: { entry: Entry }) {
    return entry.kind === 'photo' ? <PhotoCard photo={entry.photo} /> : <WishCard wish={entry.wish} />;
}

const entryKey = (entry: Entry) => (entry.kind === 'photo' ? `photo-${entry.photo.id}` : `wish-${entry.wish.id}`);

export default function Wishes() {
    return (
        <section id="wishes" className="px-6 pt-14 pb-12">
            <h2 className="font-display text-[34px] leading-snug font-bold text-ink">Wishes for you</h2>
            <p className="mt-2 mb-6 text-[15px] leading-normal text-ink/70">From the people who love you.</p>
            <div className="flex items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {LEFT.map((entry) => (
                        <EntryCard key={entryKey(entry)} entry={entry} />
                    ))}
                </div>
                {/* Nudged down so the cards don't line up in rows */}
                <div className="mt-7 flex min-w-0 flex-1 flex-col gap-2">
                    {RIGHT.map((entry) => (
                        <EntryCard key={entryKey(entry)} entry={entry} />
                    ))}
                </div>
            </div>
        </section>
    );
}
