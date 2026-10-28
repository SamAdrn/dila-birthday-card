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

export default function WishCard({ wish }: { wish: Wish }) {
    const { name, message, photo, tint } = wish;

    return (
        <motion.article
            className={`rounded-lg p-4 text-ink ${TINT_BG[tint]}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {photo ? (
                <img
                    src={photo}
                    alt={`${name}'s photo`}
                    loading="lazy"
                    className="mb-2.5 aspect-141/100 w-full rounded-md object-cover"
                />
            ) : (
                // No photo yet: a round initial instead
                <div
                    className="mb-2.5 flex size-11 items-center justify-center rounded-full bg-white/65 font-display text-[22px] font-bold"
                    aria-hidden
                >
                    {name.charAt(0)}
                </div>
            )}
            <h3 className="text-base font-semibold">{name}</h3>
            <p className="mt-1 text-sm leading-snug whitespace-pre-line text-ink/80">{message}</p>
        </motion.article>
    );
}
