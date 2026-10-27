import { useState } from 'react';
import Lock from './components/Lock/Lock';

type Stage = 'lock' | 'calendar' | 'main';

function App() {
    const [stage, setStage] = useState<Stage>('lock');

    return (
        // Outer shell fills the viewport; the inner column keeps content phone-width on desktop
        <div className="min-h-dvh bg-mist-900 flex justify-center">
            <main className="w-full max-w-md">
                {stage === 'lock' && <Lock onUnlock={() => setStage('calendar')} />}
                {stage === 'calendar' && (
                    <div className="min-h-dvh grid place-items-center text-white">Calendar reveal goes here</div>
                )}
                {stage === 'main' && (
                    <div className="min-h-dvh grid place-items-center text-white">Main page goes here</div>
                )}
            </main>
        </div>
    );
}

export default App;
