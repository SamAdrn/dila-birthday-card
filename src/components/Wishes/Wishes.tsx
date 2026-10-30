import { WISHES, type Wish } from '../../content/wishes';
import WishCard from './WishCard';

// Wishes without a priority go after every ranked one
const UNRANKED = 99;

// Rough card height in characters: the columns are narrow, so text length is a good proxy.
// These numbers are guesses; tune them if the columns end up uneven on the phone.
const CHROME = 80; // padding, gaps and the sign-off row
const TITLE_BONUS = 1.3; // the title is larger and heavier than the message
const RIGHT_OFFSET = 30; // the right column is nudged down by mt-7

const weight = (wish: Wish) => CHROME + wish.title.length * TITLE_BONUS + (wish.message?.length ?? 0);

// Array.prototype.sort is stable, so equal priorities keep their order in the file
const ORDERED = [...WISHES].sort((a, b) => (a.priority ?? UNRANKED) - (b.priority ?? UNRANKED));

// Each wish goes in the shorter column (ties go left), so the order reads
// left, right, then whichever side is short, and tall cards don't pile up on one side
const LEFT: Wish[] = [];
const RIGHT: Wish[] = [];
let leftHeight = 0;
let rightHeight = RIGHT_OFFSET;
for (const wish of ORDERED) {
    if (leftHeight <= rightHeight) {
        LEFT.push(wish);
        leftHeight += weight(wish);
    } else {
        RIGHT.push(wish);
        rightHeight += weight(wish);
    }
}

export default function Wishes() {
    return (
        <section id="wishes" className="px-6 pt-14 pb-12">
            <h2 className="font-display text-[34px] leading-snug font-bold text-ink">Wishes for you</h2>
            <p className="mt-2 mb-6 text-[15px] leading-normal text-ink/70">From the people who love you.</p>
            <div className="flex items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {LEFT.map((wish) => (
                        <WishCard key={wish.id} wish={wish} />
                    ))}
                </div>
                {/* Nudged down so the cards don't line up in rows */}
                <div className="mt-7 flex min-w-0 flex-1 flex-col gap-2">
                    {RIGHT.map((wish) => (
                        <WishCard key={wish.id} wish={wish} />
                    ))}
                </div>
            </div>
        </section>
    );
}
