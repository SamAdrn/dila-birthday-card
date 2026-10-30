import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import Lock from './components/Lock/Lock';
import Main from './components/Main/Main';
import Notch from './components/Notch/Notch';
import Story from './components/Story/Story';
import Wallpaper from './components/Wallpaper/Wallpaper';
import { HERO_PHOTO } from './content/photos';

type Stage = 'lock' | 'story' | 'main';
const STAGES: Stage[] = ['lock', 'story', 'main'];

// Open the site at a later stage, e.g. /?stage=main (handy for testing the wishes, locally or on the phone)
function startStage() {
    const stage = new URLSearchParams(window.location.search).get('stage');
    return STAGES.find((s) => s === stage) ?? 'lock';
}

function App() {
    const [stage, setStage] = useState<Stage>(startStage);
    const [unlocked, setUnlocked] = useState(stage !== 'lock'); // skipping the lock means the notch is already open

    // The hero is the last stop, so start fetching its photo now and it's ready when the story ends
    useEffect(() => {
        if (HERO_PHOTO) new Image().src = HERO_PHOTO;
    }, []);

    function handleUnlock() {
        setUnlocked(true); // the notch starts animating now
        setTimeout(() => setStage('story'), 700); // then the screen transition
    }

    return (
        // Outer shell fills the viewport; the inner column keeps content phone-width on desktop
        <div className="isolate min-h-dvh bg-mist-900 flex justify-center">
            <Wallpaper visible={stage !== 'main'} />
            <Notch unlocked={unlocked} />
            <main className="w-full max-w-md">
                <AnimatePresence mode="popLayout">
                    {stage === 'lock' && (
                        <motion.div key="lock" exit={{ opacity: 0, scale: 1.08 }} transition={{ duration: 0.35 }}>
                            <Lock onUnlock={handleUnlock} />
                        </motion.div>
                    )}
                    {stage === 'story' && (
                        <motion.div
                            key="story"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.8 } }}
                            transition={{ duration: 0.35 }}
                        >
                            <Story onDone={() => setStage('main')} />
                        </motion.div>
                    )}
                    {stage === 'main' && (
                        <motion.div
                            key="main"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Main />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}

export default App;
