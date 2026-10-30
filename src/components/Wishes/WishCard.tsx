import { motion } from 'framer-motion';

import type { Tint, Wish } from '../../content/wishes';

const TINT_BG: Record<Tint, string> = {
    peach: 'bg-wish-peach',
    butter: 'bg-wish-butter',
    sky: 'bg-wish-sky',
    mint: 'bg-wish-mint',
    lilac: 'bg-wish-lilac',
    blush: 'bg-wish-blush',
};

export default function WishCard({ wish, tint }: { wish: Wish; tint: Tint }) {
    const { name, title, message } = wish;

    return (
        <motion.article
            className={`rounded-lg p-4 text-ink ${TINT_BG[tint]}`}
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
        </motion.article>
    );
}
