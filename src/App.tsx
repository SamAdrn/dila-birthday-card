import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import Lock from './components/Lock/Lock';
import Notch from './components/Notch/Notch';
import BirthdayPrompt from './components/BirthdayPrompt/BirthdayPrompt';
import Segue from './components/Segue/Segue';

type Stage = 'lock' | 'prompt' | 'segue' | 'main';

function App() {
    const [stage, setStage] = useState<Stage>('lock');
    const [unlocked, setUnlocked] = useState(false);

    function handleUnlock() {
        setUnlocked(true); // the notch starts animating now
        setTimeout(() => setStage('prompt'), 700); // then the screen transition
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
                    {stage === 'prompt' && (
                        <motion.div
                            key="prompt"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8 } }}
                            transition={{ duration: 0.35 }}
                        >
                            <BirthdayPrompt onContinue={() => setStage('segue')} />
                        </motion.div>
                    )}
                    {stage === 'segue' && (
                        <motion.div key="segue" exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
                            <Segue onDone={() => setStage('main')} />
                        </motion.div>
                    )}
                    {stage === 'main' && (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="min-h-dvh pt-notch grid place-items-center text-white"
                        >
                            Main page goes here
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
