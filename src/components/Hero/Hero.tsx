import { motion, type Variants } from 'framer-motion';

import { HERO_PHOTO } from '../../content/photos';
import Confetti from './Confetti';
import Sparkle from './Sparkle';

const LINES = [
    { text: 'HAPPY', start: 0, color: 'text-ink', poppers: true },
    { text: 'BIRTHDAY', start: 5, color: 'text-coral', poppers: false },
];
const LETTER_COUNT = LINES.reduce((n, line) => n + line.text.length, 0);

// All in seconds after the hero mounts; each step is derived from the one before it
const OVERLAY_DELAY_S = 0.2; // the Story's dark background fades away to the light hero
const OVERLAY_FADE_S = 1.2;
const PHOTO_DELAY_S = 1.2;
const CONFETTI_DELAY_S = PHOTO_DELAY_S + 0.2;
const LETTERS_DELAY_S = PHOTO_DELAY_S + 0.6;
const SPARKLE_DELAY_S = LETTERS_DELAY_S + 0.2;
const LETTER_STEP_S = 0.05;
const POPPER_DELAY_S = LETTERS_DELAY_S + LETTER_COUNT * LETTER_STEP_S;
const NAME_DELAY_S = POPPER_DELAY_S + 0.3;
const UNDERLINE_DELAY_S = NAME_DELAY_S + 0.4;
const HINT_DELAY_S = NAME_DELAY_S + 1;

const GLOW_DRIFT_PX = 16; // how far the peach glow wanders from its spot
const GLOW_DRIFT_S = 22; // one full lap

const photoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { delay: PHOTO_DELAY_S, duration: 0.9, ease: 'easeOut' } },
};

// `custom` is the letter's index across both lines, so the stagger runs straight through
const letterVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: LETTERS_DELAY_S + i * LETTER_STEP_S, duration: 0.5, ease: 'easeOut' },
    }),
};

const popperVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    show: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', delay: POPPER_DELAY_S, stiffness: 260, damping: 12 },
    },
};

const fadeVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: 'easeOut' } },
});

// The squiggle under "Dila" draws itself in
const underlineVariants: Variants = {
    hidden: { pathLength: 0 },
    show: { pathLength: 1, transition: { delay: UNDERLINE_DELAY_S, duration: 1, ease: 'easeOut' } },
};

function Popper({ flip = false }: { flip?: boolean }) {
    return (
        // The wrapper does the mirroring so it doesn't fight Framer's own transform
        <span className={`text-4xl leading-none ${flip ? '-scale-x-100' : ''}`} aria-hidden>
            <motion.span className="inline-block" variants={popperVariants}>
                🎉
            </motion.span>
        </span>
    );
}

// Step 5 gives the wishes section id="wishes"; until it exists this does nothing
function scrollToWishes() {
    document.getElementById('wishes')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Hero() {
    return (
        <motion.section
            className="relative flex h-dvh flex-col items-center overflow-hidden px-6 pt-16 pb-6 text-ink"
            initial="hidden"
            animate="show"
        >
            {/* Same color the Story ends on, so the hand-off has no seam */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 bg-segue"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, transition: { delay: OVERLAY_DELAY_S, duration: OVERLAY_FADE_S } }}
            />

            {/* Peach glow behind the photo; it slowly circles, a few px each way */}
            <motion.div
                className="pointer-events-none absolute -left-4 top-5 size-105"
                style={{ background: 'radial-gradient(circle, var(--color-peach-100) 0%, transparent 68%)' }}
                animate={{
                    x: [0, GLOW_DRIFT_PX, 0, -GLOW_DRIFT_PX, 0],
                    y: [-GLOW_DRIFT_PX, 0, GLOW_DRIFT_PX, 0, -GLOW_DRIFT_PX],
                }}
                transition={{ duration: GLOW_DRIFT_S, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Confetti delay={CONFETTI_DELAY_S} />

            <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                <motion.div
                    className="relative aspect-300/380 h-[min(380px,45dvh)] shrink-0 overflow-hidden rounded-t-full rounded-b-md border-8 border-white bg-gray-400 shadow-xl"
                    variants={photoVariants}
                >
                    {HERO_PHOTO && <img src={HERO_PHOTO} alt="Dila" className="size-full object-cover" />}
                </motion.div>

                <h1
                    className="relative flex flex-col items-center font-display text-5xl leading-none font-black tracking-tight text-shadow-lg"
                    aria-label="Happy Birthday"
                >
                    {LINES.map((line) => (
                        <div key={line.text} className={`flex items-center gap-2 ${line.color}`} aria-hidden>
                            {line.poppers && <Popper flip />}
                            <span>
                                {line.text.split('').map((letter, i) => (
                                    <motion.span
                                        key={line.start + i}
                                        className="inline-block"
                                        custom={line.start + i}
                                        variants={letterVariants}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                            {line.poppers && <Popper />}
                        </div>
                    ))}
                </h1>

                <motion.div className="relative flex flex-col items-center" variants={fadeVariants(NAME_DELAY_S)}>
                    <p className="font-display text-4xl leading-none font-normal italic">Dila</p>
                    <svg className="mt-2 h-3.5 w-30 text-[#ffb347]" viewBox="0 0 120 14" aria-hidden="true">
                        <motion.path
                            d="M4 8 C 16 0, 24 14, 36 7 S 56 1, 68 8 S 90 14, 100 6 S 112 4, 116 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            variants={underlineVariants}
                        />
                    </svg>
                </motion.div>
            </div>

            <Sparkle className="text-butter" x={5.1} y={17.8} size={26} delay={SPARKLE_DELAY_S} />
            <Sparkle className="text-white" x={86.7} y={7.1} size={20} delay={SPARKLE_DELAY_S} twinkleDelay={0.8} />

            <motion.button
                className="relative flex h-14 cursor-pointer flex-col items-center justify-center gap-0.5 px-6 text-sm font-semibold text-ink/80"
                variants={fadeVariants(HINT_DELAY_S)}
                onClick={scrollToWishes}
            >
                Your wishes
                <motion.svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path
                        d="M4 7l6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </motion.button>
        </motion.section>
    );
}
