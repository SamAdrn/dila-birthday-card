import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

import BabyPhoto from '../BabyPhoto/BabyPhoto';

type BirthdayPromptProps = { onContinue: () => void };

const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 + i * 0.06 },
    }),
    // A child with no matching variant falls back to `hidden`, so the photo must say "stay as you are"
    leave: { opacity: 1, y: 0 },
};

// Everything else fades over ~2s (the longest piece ends at 1.6s + 0.4s)
const LEAVE_S = 2;
const leavingPieces: Variants = {
    ...pieceVariants,
    leave: (i: number) => ({
        opacity: 0,
        y: -12,
        transition: { duration: LEAVE_S - 0.4, ease: 'easeInOut', delay: i * 0.1 },
    }),
};

// The white card is its own layer so it can fade while the pieces fly out of it
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    // Ends last, so its completion is the signal that everything is gone.
    // `scale: 1` is needed: a missing key falls back to `hidden` (0.95) and the card visibly shrinks.
    leave: { opacity: 0, scale: 1, transition: { duration: LEAVE_S, ease: 'easeInOut' } },
};

export default function BirthdayPrompt({ onContinue }: BirthdayPromptProps) {
    const [leaving, setLeaving] = useState(false);

    return (
        // The screen goes dark while the modal fades; Segue starts from the same black
        <motion.div
            className="h-dvh overflow-hidden flex flex-col items-center justify-between px-10 pt-notch pb-6 gap-4 text-white"
            animate={{
                backgroundColor: leaving ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0)',
                transition: { duration: LEAVE_S, ease: 'easeInOut' },
            }}
        >
            <motion.div className="relative w-4/5" initial="hidden" animate={leaving ? 'leave' : 'show'}>
                <motion.div
                    className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                    variants={cardVariants}
                    onAnimationComplete={(definition) => definition === 'leave' && onContinue()}
                />
                <div className="relative py-3 px-5 gap-2 flex flex-col justify-center items-start">
                    <motion.p className="text-5xl py-1" variants={leavingPieces} custom={0}>
                        🎂
                    </motion.p>
                    <motion.h2 className="text-base font-semibold text-black" variants={leavingPieces} custom={1}>
                        Allow "Birthday Celebration" to use your whole day?
                    </motion.h2>
                    <motion.p className="text-sm text-gray-500" variants={leavingPieces} custom={2}>
                        Your birthday has been detected to be on the 31st of October. This will allow your phone to
                        begin your wonderful celebration.
                    </motion.p>
                    <BabyPhoto className="w-full aspect-4/3 my-2" variants={pieceVariants} custom={3} />
                    <motion.button
                        className="rounded-full w-full py-3 cursor-pointer transition-colors bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90"
                        variants={leavingPieces}
                        custom={4}
                        whileTap={{ scale: 0.97 }}
                        disabled={leaving}
                        onClick={() => setLeaving(true)}
                    >
                        Allow
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
