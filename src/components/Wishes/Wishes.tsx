import { WISH_PHOTOS } from '../../content/photos';
import { WISHES } from '../../content/wishes';
import { layoutColumns, type Entry } from './layout';
import PhotoCard from './PhotoCard';
import WishCard from './WishCard';

const { left, right } = layoutColumns(WISHES, WISH_PHOTOS);

function EntryCard({ entry }: { entry: Entry }) {
    return entry.kind === 'photo' ? (
        <PhotoCard photo={entry.photo} />
    ) : (
        <WishCard wish={entry.wish} tint={entry.tint} />
    );
}

const entryKey = (entry: Entry) => (entry.kind === 'photo' ? `photo-${entry.photo.id}` : `wish-${entry.wish.id}`);

export default function Wishes() {
    return (
        <section id="wishes" className="px-6 pt-14 pb-12">
            <h2 className="font-display text-4xl leading-snug font-bold text-ink">Wishes for you</h2>
            <p className="mb-10 text-lg leading-normal text-ink/70">From the people who love you.</p>
            <div className="flex items-start gap-2">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    {left.map((entry) => (
                        <EntryCard key={entryKey(entry)} entry={entry} />
                    ))}
                </div>
                {/* Nudged down so the cards don't line up in rows */}
                <div className="mt-7 flex min-w-0 flex-1 flex-col gap-2">
                    {right.map((entry) => (
                        <EntryCard key={entryKey(entry)} entry={entry} />
                    ))}
                </div>
            </div>
        </section>
    );
}
