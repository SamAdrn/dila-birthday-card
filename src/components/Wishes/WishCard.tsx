import { motion } from 'framer-motion';

import type { Tint, Wish } from '../../content/wishes';
import Sparkle from '../Hero/Sparkle';
import type { Corner } from './layout';

const TINT_BG: Record<Tint, string> = {
    peach: 'bg-wish-peach',
    butter: 'bg-wish-butter',
    sky: 'bg-wish-sky',
    mint: 'bg-wish-mint',
    lilac: 'bg-wish-lilac',
    blush: 'bg-wish-blush',
};

// A deeper shade of the card's own tint, so the sparkle shows on the card and on the background behind it
const TINT_SPARKLE: Record<Tint, string> = {
    peach: 'text-[#ff9a62]',
    butter: 'text-[#ffb300]',
    sky: 'text-[#5b9be0]',
    mint: 'text-[#4fbf93]',
    lilac: 'text-[#9a7be0]',
    blush: 'text-[#f0708f]',
};

// The sparkle's box is centered on the corner, so half of it hangs outside the card
const CORNER_POSITION: Record<Corner, string> = {
    'top-left': '-top-2.5 -left-2.5',
    'top-right': '-top-2.5 -right-2.5',
    'bottom-left': '-bottom-2.5 -left-2.5',
    'bottom-right': '-bottom-2.5 -right-2.5',
};

export default function WishCard({ wish, tint, corner }: { wish: Wish; tint: Tint; corner?: Corner }) {
    const { name, title, message } = wish;

    return (
        <motion.article
            className={`relative rounded-lg p-4 text-ink shadow-md ${TINT_BG[tint]}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {/* Wish Title */}
            <h3 className="text-base leading-snug font-semibold">{title}</h3>

            {/* Wish Message (optional) */}
            {message && <p className="mt-2 text-sm leading-snug whitespace-pre-line text-ink/80">{message}</p>}

            {/* Signature */}
            <div className="mt-4 flex items-center gap-2">
                {/* Avatar */}
                <div
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/65 font-display text-sm font-bold"
                    aria-hidden
                >
                    {name.charAt(0)}
                </div>

                {/* Name */}
                <p className="min-w-0 text-sm leading-tight font-medium text-ink/70">{name}</p>
            </div>

            {/* Corner sparkle (some cards only). z-10 keeps it above the card that comes next in the column */}
            {corner && (
                <span className={`pointer-events-none absolute z-10 size-5 ${CORNER_POSITION[corner]}`}>
                    <Sparkle
                        className={TINT_SPARKLE[tint]}
                        x={0}
                        y={0}
                        size={20}
                        delay={0}
                        twinkleDelay={(name.length % 4) * 0.5}
                    />
                </span>
            )}
        </motion.article>
    );
}
