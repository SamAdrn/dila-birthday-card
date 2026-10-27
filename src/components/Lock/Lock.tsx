import { useState } from 'react';
// TODO (Step 4): import { motion, useAnimationControls } from 'framer-motion';

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

function LockIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M17 9V7a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1zM9 7a3 3 0 0 1 6 0v2H9V7z" />
        </svg>
    );
}

export default function Lock({ onUnlock }: LockProps) {
    const [code, setCode] = useState('');
    // TODO (Step 4): const shake = useAnimationControls();

    // Once all digits are in, input is ignored until the code is cleared or we unlock
    const isFull = code.length >= PASSCODE.length;

    function press(digit: string) {
        if (isFull) return;

        // Use `next`, not `code`: state doesn't update until the next render
        const next = code + digit;
        setCode(next);

        if (next.length === PASSCODE.length) {
            if (next === PASSCODE) {
                // Brief pause so the last dot is seen filling
                setTimeout(onUnlock, 250);
            } else {
                // TODO (Step 4): shake before clearing
                setTimeout(() => setCode(''), 400);
            }
        }
    }

    function deleteLast() {
        if (isFull) return;
        setCode((c) => c.slice(0, -1));
    }

    return (
        <div className="h-dvh overflow-hidden flex flex-col items-center justify-between px-10 py-6 gap-4 bg-mist-900 text-white">
            {/* Notch, with the lock icon inside it on the left */}
            <div className="flex h-7.5 w-40 items-center bg-gray-950 rounded-full px-2">
                <LockIcon className="size-3.5" />
            </div>

            {/* Keypad */}
            <div className="flex flex-col items-center justify-center gap-[min(2.5rem,5dvh)]">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h2 className="text-xl leading-4">Enter Passcode</h2>
                    <p className="text-sm font-extralight w-50 text-center">
                        Your password is required to open this surprise
                    </p>
                    <div className="flex flex-row gap-6 mt-4">
                        {Array.from({ length: PASSCODE.length }, (_, i) => (
                            <div
                                key={i}
                                className={`size-3 rounded-full ${i < code.length ? 'bg-white' : 'border border-white'}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-[min(1.5rem,2.5dvh)]">
                    {KEYS.map(({ digit, letters }) => (
                        <button
                            key={digit}
                            type="button"
                            onPointerDown={() => press(digit)}
                            className={`flex size-[min(5rem,10.5dvh)] cursor-pointer select-none touch-manipulation flex-col items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30 active:bg-white/50 ${digit === '0' ? 'col-start-2' : ''}`}
                        >
                            <span className="text-4xl leading-none">{digit}</span>
                            {letters && (
                                <span className="mt-1 pl-[0.25em] text-[10px] font-medium leading-none tracking-[0.25em]">
                                    {letters}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex w-full items-end justify-end">
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
