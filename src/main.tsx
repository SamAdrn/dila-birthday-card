import { MotionConfig } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* For anyone with iOS's Reduce Motion on: movement is skipped, fades still play */}
        <MotionConfig reducedMotion="user">
            <App />
        </MotionConfig>
    </StrictMode>
);
