import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';

type BirthdayPromptProps = { onContinue: () => void };

// Where each piece flies when the modal decomposes: emoji, heading, body, image, button
const SCATTER = [
    { x: -140, y: -220, rotate: -35 },
    { x: -260, y: -60, rotate: -12 },
    { x: 260, y: -20, rotate: 15 },
    { x: 0, y: 340, rotate: 8 },
    { x: 200, y: 460, rotate: -20 },
];

const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        transition: { delay: 0.15 + i * 0.06 },
    }),
    leave: (i: number) => ({
        ...SCATTER[i],
        opacity: 0,
        transition: { duration: 0.7, ease: 'easeIn', delay: i * 0.04 },
    }),
};

// The white card is its own layer so it can fade while the pieces fly out of it
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    leave: { opacity: 0, scale: 0.9, transition: { duration: 0.9, ease: 'easeIn' } },
};

export default function BirthdayPrompt({ onContinue }: BirthdayPromptProps) {
    const [leaving, setLeaving] = useState(false);

    return (
        <div className="h-dvh overflow-hidden flex flex-col items-center justify-between px-10 pt-notch pb-6 gap-4 text-white">
            <motion.div className="relative w-4/5" initial="hidden" animate={leaving ? 'leave' : 'show'}>
                <motion.div
                    className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                    variants={cardVariants}
                    onAnimationComplete={(definition) => definition === 'leave' && onContinue()}
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
                    <motion.div
                        className="w-full aspect-4/3 bg-gray-400 rounded-2xl my-2"
                        variants={pieceVariants}
                        custom={3}
                    />
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
        </div>
    );
}
