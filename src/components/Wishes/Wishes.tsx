import { WISHES } from '../../content/wishes';
import WishCard from './WishCard';

// The two columns alternate: the 1st, 3rd, 5th... wish on the left, the rest on the right
const LEFT = WISHES.filter((_, i) => i % 2 === 0);
const RIGHT = WISHES.filter((_, i) => i % 2 === 1);

// The hero's "Your wishes" button scrolls to this id
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
