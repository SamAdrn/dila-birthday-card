import { motion } from 'framer-motion';

type NotchProps = { unlocked: boolean; celebrating: boolean };

// The main page fades in over 0.6s; the cake pops out just after it
const CAKE_DELAY_S = 0.6;
const CAKE_HIDDEN = { scale: 0, rotate: -25, opacity: 0 };
const CAKE_SHOWN = { scale: 1, rotate: 0, opacity: 1 };

const SHACKLE_OPEN_DEG = 75; // how far the shackle swings out to the right
const LOCK_FADE_DELAY_S = 0.55; // long enough for the swing to be seen before the lock fades away

function LockIcon({ unlocked, className }: { unlocked: boolean; className?: string }) {
    return (
        <motion.div
            initial={false}
            animate={{ opacity: unlocked ? 0 : 1 }}
            transition={{ delay: LOCK_FADE_DELAY_S, duration: 0.2 }}
        >
            <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" />
                {/* Hinged on its right leg: it swings out to the right, over the edge of the body */}
                <motion.path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transformBox: 'fill-box', transformOrigin: 'right bottom' }}
                    initial={false}
                    animate={{ rotate: unlocked ? SHACKLE_OPEN_DEG : 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                />
            </svg>
        </motion.div>
    );
}

export default function Notch({ unlocked, celebrating }: NotchProps) {
    return (
        <div className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center">
            <div className="flex h-7.5 w-40 items-center bg-gray-950 rounded-full px-2 text-white">
                {/* overflow-visible: the open shackle reaches past the icon's box */}
                <LockIcon unlocked={unlocked} className="size-3.5 overflow-visible" />

                {/* A cake pops out on the right once the main page opens. The spring overshoots, so it bounces
                    in; the opacity has its own quick fade so Reduce Motion (which skips the scale) still shows it */}
                <motion.span
                    className="ml-auto text-sm leading-none"
                    initial={CAKE_HIDDEN}
                    animate={celebrating ? CAKE_SHOWN : CAKE_HIDDEN}
                    transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 10,
                        delay: CAKE_DELAY_S,
                        opacity: { delay: CAKE_DELAY_S, duration: 0.15 },
                    }}
                    aria-hidden
                >
                    🎂
                </motion.span>
            </div>
        </div>
    );
}
