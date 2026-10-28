import { AnimatePresence, motion } from 'framer-motion';

type WallpaperProps = { visible: boolean };

// The festive dusk backdrop. It sits behind every stage and fades away when the hero arrives.
export default function Wallpaper({ visible }: WallpaperProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="pointer-events-none fixed inset-y-0 left-1/2 -z-10 w-full max-w-md -translate-x-1/2"
                    style={{
                        background: `
                            radial-gradient(60% 40% at 18% 14%, rgba(255, 160, 122, 0.55), transparent 70%),
                            radial-gradient(55% 40% at 88% 30%, rgba(120, 150, 255, 0.5), transparent 70%),
                            radial-gradient(70% 45% at 50% 96%, rgba(255, 120, 150, 0.55), transparent 70%),
                            linear-gradient(170deg, var(--color-dusk-800) 0%, var(--color-dusk-700) 52%, var(--color-dusk-500) 100%)
                        `,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    aria-hidden
                />
            )}
        </AnimatePresence>
    );
}
