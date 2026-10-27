import { motion } from 'framer-motion';

type NotchProps = { unlocked: boolean };

function LockIcon({ unlocked, className }: { unlocked: boolean; className?: string }) {
    return (
        <motion.div animate={{ opacity: unlocked ? 0 : 1 }} transition={{ delay: 0.4, duration: 0.2 }}>
            <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
                <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" />
                <motion.path
                    d="M8 10V7a4 4 0 0 1 8 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transformBox: 'fill-box', transformOrigin: 'right bottom' }}
                    animate={{ rotate: unlocked ? 30 : 0 }}
                />
            </svg>
        </motion.div>
    );
}

export default function Notch({ unlocked }: NotchProps) {
    return (
        <div className="pointer-events-none fixed inset-x-0 top-3.5 z-50 flex justify-center">
            <div className="flex h-7.5 w-40 items-center bg-gray-950 rounded-full px-2 text-white">
                <LockIcon unlocked={unlocked} className="size-3.5" />
            </div>
        </div>
    );
}
