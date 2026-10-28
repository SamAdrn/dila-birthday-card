import { motion } from 'framer-motion';
import { useEffect } from 'react';

type SegueProps = { onDone: () => void };

// The prompt's last frame is the "24 years ago" beat; the Segue picks up after it
const NOW_DELAY_S = 0.8; // wait for the prompt to fade out
const NOW_HOLD_MS = 3000;

export default function Segue({ onDone }: SegueProps) {
    useEffect(() => {
        const id = setTimeout(onDone, NOW_HOLD_MS);
        return () => clearTimeout(id);
    }, [onDone]);

    return (
        // Same color the prompt's background fades to, so the hand-off has no seam
        <div className="h-dvh overflow-hidden flex items-center justify-center px-10 pt-notch text-white bg-[rgb(14,18,20)]">
            <motion.p
                className="text-3xl font-semibold"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: NOW_DELAY_S, duration: 1.5 } }}
            >
                and now…
            </motion.p>
        </div>
    );
}
