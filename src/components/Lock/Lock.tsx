import { motion, useAnimationControls, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';

const PASSCODE = '311001';
const KEYS = [
    { digit: '1', letters: '' },
    { digit: '2', letters: 'ABC' },
    { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' },
    { digit: '5', letters: 'JKL' },
    { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' },
    { digit: '8', letters: 'TUV' },
    { digit: '9', letters: 'WXYZ' },
    { digit: '0', letters: '' },
];

type LockProps = { onUnlock: () => void };

export default function Lock({ onUnlock }: LockProps) {
    const [code, setCode] = useState('');
    const shake = useAnimationControls();
    const [poppers, setPoppers] = useState<{ id: number; drift: number }[]>([]);
    const popperId = useRef(0);

    // Once all digits are in, input is ignored until the code is cleared or we unlock
    const isFull = code.length >= PASSCODE.length;

    const keypadVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.15,
                staggerChildren: 0.03,
            },
        },
    };

    const keyVariants: Variants = {
        hidden: { opacity: 0, scale: 0.5, y: 20 },
        show: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 500, damping: 12 },
        },
    };

    function press(digit: string) {
        if (isFull) return;

        // Use `next`, not `code`: state doesn't update until the next render
        const next = code + digit;
        setCode(next);

        if (next.length === PASSCODE.length) {
            if (next === PASSCODE) {
                onUnlock();
            } else {
                shake
                    .start({ x: [0, -32, 32, -16, 16, -4, 4, 0], transition: { duration: 0.5 } })
                    .then(() => setCode(''));
                setTimeout(() => setCode(''), 400);
            }
        }
    }

    function celebrate() {
        const id = popperId.current++;
        // Small random sideways drift so repeated clicks don't stack in a line
        setPoppers((p) => [...p, { id, drift: (Math.random() - 0.5) * 60 }]);
    }

    function deleteLast() {
        if (isFull) return;
        setCode((c) => c.slice(0, -1));
    }

    return (
        <div className="h-dvh overflow-hidden flex flex-col items-center justify-between px-10 pt-notch pb-6 gap-4 bg-mist-900 text-white">
            {/* Keypad */}
            <div className="flex flex-col items-center justify-center gap-[min(2.5rem,5dvh)]">
                <motion.div
                    className="flex flex-col items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-xl leading-4">Enter Passcode</h2>
                    <p className="text-sm font-extralight w-50 text-center">
                        Your passcode is required to open this surprise
                    </p>
                    <motion.div className="flex flex-row gap-6 mt-4" animate={shake}>
                        {Array.from({ length: PASSCODE.length }, (_, i) => (
                            <div
                                key={i}
                                className={`size-3 rounded-full ${i < code.length ? 'bg-white' : 'border border-white'}`}
                            />
                        ))}
                    </motion.div>
                </motion.div>
                <motion.div
                    className="grid grid-cols-3 gap-[min(1.5rem,2.5dvh)]"
                    variants={keypadVariants}
                    initial="hidden"
                    animate="show"
                >
                    {KEYS.map(({ digit, letters }) => (
                        <motion.button
                            key={digit}
                            type="button"
                            onPointerDown={() => press(digit)}
                            className={`flex size-[min(5rem,10.5dvh)] cursor-pointer select-none touch-manipulation flex-col items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30 active:bg-white/50 ${digit === '0' ? 'col-start-2' : ''}`}
                            variants={keyVariants}
                        >
                            <span className="text-3xl leading-none">{digit}</span>
                            {letters && (
                                <span className="mt-1 pl-[0.25em] text-[10px] font-medium leading-none tracking-[0.25em]">
                                    {letters}
                                </span>
                            )}
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Footer */}
            <div className="flex w-full items-end justify-between">
                <div className="relative">
                    {poppers.map(({ id, drift }) => (
                        <motion.span
                            key={id}
                            aria-hidden
                            className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 text-2xl"
                            initial={{ opacity: 1, y: 0, x: 0, scale: 0.6 }}
                            animate={{ opacity: 0, y: -160, x: drift, scale: 1.2 }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            onAnimationComplete={() => setPoppers((p) => p.filter((x) => x.id !== id))}
                        >
                            🎉
                        </motion.span>
                    ))}
                    <button
                        type="button"
                        onClick={celebrate}
                        className="cursor-pointer select-none touch-manipulation text-sm font-extralight transition-opacity hover:opacity-70 active:opacity-50"
                    >
                        Celebrate
                    </button>
                </div>
                <button
                    type="button"
                    onPointerDown={code.length > 0 ? deleteLast : undefined}
                    className="cursor-pointer select-none touch-manipulation text-sm font-extralight transition-opacity hover:opacity-70 active:opacity-50"
                >
                    {code.length > 0 ? 'Delete' : 'Cancel'}
                </button>
            </div>
        </div>
    );
}
