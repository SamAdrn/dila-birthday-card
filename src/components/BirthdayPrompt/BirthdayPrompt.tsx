import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

import BabyPhoto from '../BabyPhoto/BabyPhoto';

type BirthdayPromptProps = { onContinue: () => void };

// Leave sequence, in seconds
const BG_DELAY_S = 1; // after the Allow tap
const BG_FADE_S = 1.5;
const MODAL_DELAY_S = 0.25; // after the background fade starts
const MODAL_FADE_S = 0.5;
const MODAL_DROP_PX = 24;
const YEARS_DELAY_S = BG_DELAY_S + MODAL_DELAY_S + MODAL_FADE_S; // right after the modal is gone
const YEARS_FADE_S = 1.5;
const CONTINUE_DELAY_S = YEARS_DELAY_S + 3; // a few seconds after the modal is gone
const CONTINUE_FADE_S = 1;

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

export default function BirthdayPrompt({ onContinue }: BirthdayPromptProps) {
    const [leaving, setLeaving] = useState(false);
    const [canContinue, setCanContinue] = useState(false);

    return (
        <motion.div
            className="relative h-dvh overflow-hidden flex flex-col items-center justify-between px-10 pt-notch pb-6 gap-4 text-white"
            initial={false}
            animate={{ backgroundColor: leaving ? 'rgb(14, 18, 20)' : 'rgba(0,0,0,0)' }}
            transition={{ delay: BG_DELAY_S, duration: BG_FADE_S, ease: 'easeInOut' }}
        >
            <motion.div className="relative w-4/5" initial="hidden" animate={leaving ? 'leave' : 'show'}>
                <motion.div
                    className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                    variants={cardVariants}
                />
                <div className="relative py-3 px-5 gap-2 flex flex-col justify-center items-start">
                    <motion.p className="text-5xl py-1" variants={pieceVariants} custom={0}>
                        🎂
                    </motion.p>
                    <motion.h2 className="text-base font-semibold text-black" variants={pieceVariants} custom={1}>
                        Allow "Birthday Celebration" to use your whole day?
                    </motion.h2>
                    <motion.p className="text-sm text-gray-500" variants={pieceVariants} custom={2}>
                        Your birthday has been detected to be on the 31st of October. This will allow your phone to
                        begin your wonderful celebration.
                    </motion.p>
                    <div className="relative w-full my-2">
                        <BabyPhoto className="w-full aspect-4/3" variants={photoVariants} custom={3} />
                        <div className="pointer-events-none absolute inset-x-0 top-full mt-6 flex justify-center">
                            <motion.p
                                className="text-3xl font-semibold"
                                initial={false}
                                animate={{ opacity: leaving ? 1 : 0 }}
                                transition={{ delay: YEARS_DELAY_S, duration: YEARS_FADE_S }}
                            >
                                24 years ago
                            </motion.p>
                        </div>
                    </div>
                    <motion.button
                        className="rounded-full w-full py-3 cursor-pointer transition-colors bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90"
                        variants={pieceVariants}
                        custom={4}
                        whileTap={{ scale: 0.97 }}
                        disabled={leaving}
                        onClick={() => setLeaving(true)}
                    >
                        Allow
                    </motion.button>
                </div>
            </motion.div>

            {/* Only clickable once it has fully faded in */}
            <motion.button
                className={`absolute bottom-10 rounded-full px-8 py-3 bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90 transition-colors ${canContinue ? 'cursor-pointer' : 'pointer-events-none'}`}
                initial={false}
                animate={{ opacity: leaving ? 1 : 0 }}
                transition={{ delay: CONTINUE_DELAY_S, duration: CONTINUE_FADE_S }}
                onAnimationComplete={() => {
                    if (leaving) setCanContinue(true);
                }}
                whileTap={{ scale: 0.97 }}
                onClick={onContinue}
            >
                Continue
            </motion.button>
        </motion.div>
    );
}
