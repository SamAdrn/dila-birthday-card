import { motion, type Variants } from 'framer-motion';

// x and y are percentages of the hero, converted from the design's 390 × 844 artboard.
// `dur` is one bob up and down in seconds; `sway` is how far it slides sideways (px, either way).
const PIECES = [
    { x: 7.2, y: 14.2, w: 10, h: 10, color: '#ffb88a', round: true, rot: 0, delay: 0, dur: 3.4, sway: 8 },
    { x: 85.1, y: 11.4, w: 14, h: 6, color: '#f26b4b', round: false, rot: 35, delay: 0.6, dur: 4.2, sway: -10 },
    { x: 90.3, y: 30.8, w: 9, h: 9, color: '#7fb2ff', round: true, rot: 0, delay: 1.1, dur: 3.2, sway: -7 },
    { x: 4.6, y: 35.5, w: 16, h: 6, color: '#ffd166', round: false, rot: -30, delay: 0.3, dur: 4, sway: 10 },
    { x: 87.7, y: 49.8, w: 12, h: 12, color: '#f7a6b8', round: false, rot: 20, delay: 0.9, dur: 3.6, sway: -8 },
    { x: 5.6, y: 55.7, w: 9, h: 9, color: '#8ed1b2', round: true, rot: 0, delay: 1.4, dur: 4.4, sway: 7 },
    { x: 78, y: 67.1, w: 16, h: 6, color: '#b9a2f0', round: false, rot: 50, delay: 0.2, dur: 3.8, sway: -10 },
    { x: 14.4, y: 75.8, w: 12, h: 5, color: '#f26b4b', round: false, rot: -45, delay: 0.7, dur: 4.3, sway: 9 },
    { x: 88.2, y: 79.1, w: 9, h: 9, color: '#ffd166', round: true, rot: 0, delay: 1.2, dur: 3.3, sway: -6 },
    { x: 7.7, y: 86.5, w: 14, h: 6, color: '#7fb2ff', round: false, rot: 25, delay: 0.5, dur: 3.9, sway: 8 },
];

const TRAVEL_PX = 28; // how far each piece rises before it floats back down
const WOBBLE_DEG = 18; // how far it tilts each way around its resting angle

const appearVariants = (delay: number): Variants => ({
    hidden: { opacity: 0 },
    show: { opacity: 0.9, transition: { delay, duration: 1 } },
});

// The outer span fades in with the hero; the inner one drifts, so the two animations never fight.
// Height, sway and tilt each get their own length, so the three never line up and it looks like air.
const loop = (duration: number, delay: number) => ({
    duration,
    delay,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
});

export default function Confetti({ delay }: { delay: number }) {
    return (
        <>
            {PIECES.map((p, i) => (
                <motion.span
                    key={i}
                    className="pointer-events-none absolute"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    variants={appearVariants(delay)}
                    aria-hidden
                >
                    <motion.span
                        className={`block ${p.round ? 'rounded-full' : 'rounded-md'}`}
                        style={{ width: p.w, height: p.h, backgroundColor: p.color }}
                        animate={{
                            y: [0, -TRAVEL_PX],
                            x: [0, p.sway],
                            rotate: [p.rot - WOBBLE_DEG, p.rot + WOBBLE_DEG],
                        }}
                        transition={{
                            y: loop(p.dur, p.delay),
                            x: loop(p.dur * 1.4, p.delay),
                            rotate: loop(p.dur * 1.8, p.delay),
                        }}
                    />
                </motion.span>
            ))}
        </>
    );
}
