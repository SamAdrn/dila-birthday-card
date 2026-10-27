import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Lock from './components/Lock/Lock';
import Notch from './components/Notch/Notch';

type Stage = 'lock' | 'calendar' | 'main';

function App() {
    const [stage, setStage] = useState<Stage>('lock');
    const [unlocked, setUnlocked] = useState(false);

    function handleUnlock() {
        setUnlocked(true); // the notch starts animating now
        setTimeout(() => setStage('calendar'), 700); // then the screen transition
    }

    return (
        // Outer shell fills the viewport; the inner column keeps content phone-width on desktop
        <div className="min-h-dvh bg-mist-900 flex justify-center">
            <Notch unlocked={unlocked} />
            <main className="w-full max-w-md">
                <AnimatePresence mode="popLayout">
                    {stage === 'lock' && (
                        <motion.div key="lock" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.35 }}>
                            <Lock onUnlock={handleUnlock} />
                        </motion.div>
                    )}
                    {stage === 'calendar' && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="min-h-dvh pt-notch grid place-items-center text-white">
                                Calendar reveal goes here
                            </div>
                        </motion.div>
                    )}
                    {stage === 'main' && (
                        <div className="min-h-dvh pt-notch grid place-items-center text-white">Main page goes here</div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
