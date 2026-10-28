import { motion, useAnimationControls, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

import { BABY_PHOTO_YEAR, yearsAgo } from '../../content/years';
import BabyPhoto from '../BabyPhoto/BabyPhoto';

type StoryProps = { onDone: () => void };

// Backdrop: the glow shows through at first, then dims to the Segue color (--color-segue).
// Both ends share the same RGB so only the alpha animates.
const SEGUE_RGB = '14, 18, 20';
const BG_DIMMED = `rgba(${SEGUE_RGB}, 0.4)`;
const BG_DARK = `rgb(${SEGUE_RGB})`;

// Leave sequence, in seconds
const BG_DELAY_S = 1; // after the Allow tap
const BG_FADE_S = 1.5;
const MODAL_DELAY_S = 0.25; // after the background fade starts
const MODAL_FADE_S = 0.5;
const MODAL_DROP_PX = 24;
const YEARS_DELAY_S = BG_DELAY_S + MODAL_DELAY_S + MODAL_FADE_S; // right after the modal is gone
const YEARS_FADE_S = 1.5;
const CONTINUE_DELAY_S = YEARS_DELAY_S + 1; // a few seconds after the modal is gone
const CONTINUE_FADE_S = 1;

// "and now…", measured from the final Continue tap
const PHOTO_OUT_S = 0.5; // photo and label fade away first
const NOW_DELAY_S = 0.8;
const NOW_FADE_S = 1.2;
const NOW_HOLD_MS = 1800;
const NOW_DONE_MS = (NOW_DELAY_S + NOW_FADE_S) * 1000 + NOW_HOLD_MS;

const PILL = 'h-13 rounded-full text-[17px] font-semibold cursor-pointer transition-colors disabled:cursor-default';
const PILL_PRIMARY = 'text-white bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90';

// iOS-style dismiss: everything drops a little and fades, all at once
const modalLeave = {
    opacity: 0,
    y: MODAL_DROP_PX,
    transition: { delay: BG_DELAY_S + MODAL_DELAY_S, duration: MODAL_FADE_S, ease: 'easeIn' as const },
};

const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 + i * 0.06 },
    }),
    leave: modalLeave,
};

// The photo shares the entrance but holds still on leave
const photoVariants: Variants = {
    ...pieceVariants,
    leave: { opacity: 1, y: 0 },
};

// The white card is its own layer so it can fade in separately from the pieces
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    leave: { ...modalLeave, scale: 1 },
};

export default function Story({ onDone }: StoryProps) {
    const [allowed, setAllowed] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [now, setNow] = useState(false);
    const shake = useAnimationControls();

    // After "and now…" has had its moment, hand over to the hero
    useEffect(() => {
        if (!now) return;
        const id = setTimeout(onDone, NOW_DONE_MS);
        return () => clearTimeout(id);
    }, [now, onDone]);

    // Don't Allow does nothing except shake the card
    function handleDeny() {
        shake.start({ x: [0, -12, 10, -8, 6, -3, 0], transition: { duration: 0.45 } });
    }

    function handleContinue() {
        setCanContinue(false);
        setNow(true);
    }

    const showContinue = allowed && !now;

    return (
        <motion.div
            className="relative h-dvh overflow-hidden flex flex-col items-center justify-center px-6 pt-notch pb-6 text-white"
            initial={false}
            animate={{ backgroundColor: allowed ? BG_DARK : BG_DIMMED }}
            transition={{ delay: BG_DELAY_S, duration: BG_FADE_S, ease: 'easeInOut' }}
        >
            <motion.div className="w-full max-w-75" animate={shake}>
                <motion.div className="relative" initial="hidden" animate={allowed ? 'leave' : 'show'}>
                    <motion.div
                        className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                        variants={cardVariants}
                    />
                    <div className="relative flex flex-col items-center gap-3 p-5 text-center">
                        {/* A plain CSS fade: when "and now…" starts, the photo and its label go together */}
                        <div
                            className={`relative flex w-full justify-center transition-opacity ${now ? 'opacity-0' : 'opacity-100'}`}
                            style={{ transitionDuration: `${PHOTO_OUT_S}s` }}
                        >
                            <BabyPhoto className="w-full aspect-5/3 shadow-sm" variants={photoVariants} custom={0} />
                            <div className="pointer-events-none absolute inset-x-0 top-full mt-5 flex justify-center">
                                <motion.p
                                    className="font-display text-4xl leading-snug font-light italic text-gray-100"
                                    initial={false}
                                    animate={{ opacity: allowed ? 1 : 0 }}
                                    transition={{ delay: YEARS_DELAY_S, duration: YEARS_FADE_S }}
                                >
                                    {yearsAgo(BABY_PHOTO_YEAR)} years ago
                                </motion.p>
                            </div>
                        </div>
                        <motion.h2
                            className="mt-1 text-base leading-snug font-semibold text-black"
                            variants={pieceVariants}
                            custom={1}
                        >
                            Allow “Birthday Celebration” to use your whole day?
                        </motion.h2>
                        <motion.p className="text-sm leading-snug text-gray-600" variants={pieceVariants} custom={2}>
                            Your birthday has been detected to be on the 31st of October. This will allow your phone to
                            begin your wonderful celebration.
                        </motion.p>
                        <div className="mt-1 flex w-full flex-col gap-2">
                            <motion.button
                                className={`${PILL} w-full ${PILL_PRIMARY}`}
                                variants={pieceVariants}
                                custom={3}
                                whileTap={{ scale: 0.97 }}
                                disabled={allowed}
                                onClick={() => setAllowed(true)}
                            >
                                Allow
                            </motion.button>
                            <motion.button
                                className={`${PILL} w-full text-blue-700 bg-blue-600/10 hover:bg-blue-600/15 active:bg-blue-600/25`}
                                variants={pieceVariants}
                                custom={4}
                                whileTap={{ scale: 0.97 }}
                                disabled={allowed}
                                onClick={handleDeny}
                            >
                                Don’t Allow
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.p
                    className="font-display text-5xl leading-snug font-light italic text-gray-100"
                    initial={false}
                    animate={{ opacity: now ? 1 : 0 }}
                    transition={{ delay: now ? NOW_DELAY_S : 0, duration: NOW_FADE_S }}
                >
                    and now…
                </motion.p>
            </div>

            {/* Disabled (so no taps or keyboard) until it has fully faded in */}
            <motion.button
                className={`${PILL} absolute inset-x-0 bottom-14 mx-auto w-65 ${PILL_PRIMARY}`}
                initial={false}
                animate={{ opacity: showContinue ? 1 : 0 }}
                transition={{
                    delay: showContinue ? CONTINUE_DELAY_S : 0,
                    duration: showContinue ? CONTINUE_FADE_S : 0.4,
                }}
                onAnimationComplete={() => {
                    if (showContinue) setCanContinue(true);
                }}
                whileTap={{ scale: 0.97 }}
                disabled={!canContinue}
                onClick={handleContinue}
            >
                Continue
            </motion.button>
        </motion.div>
    );
}
