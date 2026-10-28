import { motion, type Variants } from 'framer-motion';

type SparkleProps = {
    x: number; // percent of the hero
    y: number;
    size: number;
    className: string; // sets the color through currentColor
    delay: number; // when it fades in
    twinkleDelay?: number; // offsets the loop so two sparkles don't pulse together
};

const appearVariants = (delay: number): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay, duration: 0.6 } },
});

export default function Sparkle({ x, y, size, className, delay, twinkleDelay = 0 }: SparkleProps) {
    return (
        <motion.span
            className={`pointer-events-none absolute ${className}`}
            style={{ left: `${x}%`, top: `${y}%` }}
            variants={appearVariants(delay)}
            aria-hidden
        >
            <motion.svg
                className="block"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                animate={{ scale: [1, 0.6, 1], opacity: [1, 0.55, 1] }}
                transition={{ duration: 2.4, delay: twinkleDelay, repeat: Infinity, ease: 'easeInOut' }}
            >
                <path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" fill="currentColor" />
            </motion.svg>
        </motion.span>
    );
}
