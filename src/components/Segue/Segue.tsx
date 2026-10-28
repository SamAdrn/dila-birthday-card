import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BabyPhoto from '../BabyPhoto/BabyPhoto';

type SegueProps = { onDone: () => void };

// The photo glides for 2s (see BabyPhoto), so the text and the hint wait for it
const READY_DELAY_MS = 4200;
const NOW_HOLD_MS = 3000;

export default function Segue({ onDone }: SegueProps) {
    const [beat, setBeat] = useState<'then' | 'now'>('then');
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setReady(true), READY_DELAY_MS);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (beat !== 'now') return;
        const id = setTimeout(onDone, NOW_HOLD_MS);
        return () => clearTimeout(id);
    }, [beat, onDone]);

    function handleTap() {
        if (ready && beat === 'then') setBeat('now');
    }

    return (
        // Already dark: BirthdayPrompt fades the background to this same black while it leaves
        <div
            className="relative h-dvh overflow-hidden flex flex-col items-center justify-center gap-8 px-10 pt-notch text-white bg-black/90"
            onClick={handleTap}
        >
            <AnimatePresence>
                {beat === 'then' && <BabyPhoto className="w-full aspect-4/3" exit={{ opacity: 0, scale: 0.9 }} />}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.p
                    key={beat}
                    className="text-3xl font-semibold"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: beat === 'then' ? 2 : 0.2, duration: 1.5 } }}
                    exit={{ opacity: 0, y: -12 }}
                >
                    {beat === 'then' ? '24 years ago' : 'and now…'}
                </motion.p>
            </AnimatePresence>

            {beat === 'then' && (
                <motion.p
                    className="absolute bottom-10 text-sm text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2 }}
                >
                    tap to continue
                </motion.p>
            )}
        </div>
    );
}
