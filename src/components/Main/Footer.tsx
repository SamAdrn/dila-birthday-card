import { motion, type Variants } from 'framer-motion';

import Sparkle from '../Hero/Sparkle';

const SPARKLE_DELAY_S = 0.5;

const fadeVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const cakeVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', delay: 0.4, stiffness: 260, damping: 12 },
    },
};

// The page's last word. It plays once, when it scrolls into view; the Sparkles take their
// "hidden" and "show" from this parent, the same way they do in the hero.
export default function Footer() {
    return (
        <motion.footer
            className="relative flex flex-col items-center px-6 pt-2 pb-16 text-center text-ink"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            <Sparkle className="text-butter" x={31} y={52} size={22} delay={SPARKLE_DELAY_S} />
            <Sparkle className="text-[#ffb88a]" x={65} y={46} size={16} delay={SPARKLE_DELAY_S} twinkleDelay={0.8} />
            <motion.p className="font-display text-3xl leading-tight font-normal italic" variants={fadeVariants}>
                Happy birthday, Dila
            </motion.p>
            <motion.span className="mt-2 inline-block text-4xl" variants={cakeVariants} aria-hidden>
                🎂
            </motion.span>
        </motion.footer>
    );
}
