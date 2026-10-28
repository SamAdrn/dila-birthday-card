import { motion, useAnimationControls, type Transition, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

import { BEATS, yearsAgo } from '../../content/years';
import BabyPhoto from '../BabyPhoto/BabyPhoto';

type StoryProps = { onDone: () => void };

// Backdrop: the glow shows through at first, then dims to the Segue color (--color-segue).
// Both ends share the same RGB so only the alpha animates.
const SEGUE_RGB = '14, 18, 20';
const BG_DIMMED = `rgba(${SEGUE_RGB}, 0.4)`;
const BG_DARK = `rgb(${SEGUE_RGB})`;

// Leave sequence, in seconds
const BG_DELAY_S = 1; // after the Allow tap
const BG_FADE_S = 1.5;
const MODAL_DELAY_S = 0.25; // after the background fade starts
const MODAL_FADE_S = 0.5;
const MODAL_DROP_PX = 24;
const YEARS_DELAY_S = BG_DELAY_S + MODAL_DELAY_S + MODAL_FADE_S; // right after the modal is gone
const YEARS_FADE_S = 1.5;
const CONTINUE_DELAY_S = YEARS_DELAY_S + 1;
const CONTINUE_FADE_S = 1;

// Beats: each Continue tap crossfades to the next photo and label
const BEAT_OUT_S = 0.6;
const BEAT_IN_S = 1;
const BEAT_IN_DELAY_S = 0.2;
const CONTINUE_RETURN_S = 1.6; // Continue steps aside, then comes back this long after a tap

// "and now…", measured from the final Continue tap
const PHOTO_OUT_S = 0.5; // photo and label fade away first
const NOW_DELAY_S = 0.8;
const NOW_FADE_S = 1.2;
const NOW_HOLD_MS = 1800;
const NOW_DONE_MS = (NOW_DELAY_S + NOW_FADE_S) * 1000 + NOW_HOLD_MS;

const PILL = 'h-13 rounded-full text-[17px] font-semibold cursor-pointer transition-colors disabled:cursor-default';
const PILL_PRIMARY = 'text-white bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90';

// Stand-ins until the real photos arrive (Step 6); distinct so the crossfade is visible
const PLACEHOLDER_TINTS = ['bg-gray-400', 'bg-amber-300', 'bg-sky-300', 'bg-rose-300'];

// iOS-style dismiss: everything drops a little and fades, all at once
const modalLeave = {
    opacity: 0,
    y: MODAL_DROP_PX,
    transition: { delay: BG_DELAY_S + MODAL_DELAY_S, duration: MODAL_FADE_S, ease: 'easeIn' as const },
};

const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.15 + i * 0.06 },
    }),
    leave: modalLeave,
};

// The photo shares the entrance but holds still on leave
const photoVariants: Variants = {
    ...pieceVariants,
    leave: { opacity: 1, y: 0 },
};

// The white card is its own layer so it can fade in separately from the pieces
const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
    leave: { ...modalLeave, scale: 1 },
};

// A beat's photo or label: quick out, slower in
function fade(on: boolean, enter: Transition = { delay: BEAT_IN_DELAY_S, duration: BEAT_IN_S }) {
    return { opacity: on ? 1 : 0, transition: on ? enter : { duration: BEAT_OUT_S } };
}

export default function Story({ onDone }: StoryProps) {
    const [allowed, setAllowed] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [beat, setBeat] = useState(0);
    const [waiting, setWaiting] = useState(false); // Continue is hidden while the next beat crossfades in
    const [now, setNow] = useState(false);
    const shake = useAnimationControls();

    // Continue comes back a moment after the tap that hid it
    useEffect(() => {
        if (!waiting) return;
        const id = setTimeout(() => setWaiting(false), CONTINUE_RETURN_S * 1000);
        return () => clearTimeout(id);
    }, [waiting]);

    // After "and now…" has had its moment, hand over to the hero
    useEffect(() => {
        if (!now) return;
        const id = setTimeout(onDone, NOW_DONE_MS);
        return () => clearTimeout(id);
    }, [now, onDone]);

    // Don't Allow does nothing except shake the card
    function handleDeny() {
        shake.start({ x: [0, -12, 10, -8, 6, -3, 0], transition: { duration: 0.45 } });
    }

    function handleContinue() {
        setCanContinue(false);
        if (beat < BEATS.length - 1) {
            setBeat(beat + 1);
            setWaiting(true);
        } else {
            setNow(true);
        }
    }

    const showContinue = allowed && !now && !waiting;

    return (
        <motion.div
            className="relative h-dvh overflow-hidden flex flex-col items-center justify-center px-6 pt-notch pb-6 text-white"
            initial={false}
            animate={{ backgroundColor: allowed ? BG_DARK : BG_DIMMED }}
            transition={{ delay: BG_DELAY_S, duration: BG_FADE_S, ease: 'easeInOut' }}
        >
            <motion.div className="w-full max-w-75" animate={shake}>
                <motion.div className="relative" initial="hidden" animate={allowed ? 'leave' : 'show'}>
                    <motion.div
                        className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                        variants={cardVariants}
                    />
                    <div className="relative flex flex-col items-center gap-3 p-5 text-center">
                        {/* A plain CSS fade: when "and now…" starts, the photo and its label go together */}
                        <div
                            className={`relative flex w-full justify-center transition-opacity ${now ? 'opacity-0' : 'opacity-100'}`}
                            style={{ transitionDuration: `${PHOTO_OUT_S}s` }}
                        >
                            {/* Every beat's photo is mounted at once and crossfades by opacity */}
                            <BabyPhoto
                                className="relative w-full aspect-5/3 overflow-hidden shadow-sm"
                                variants={photoVariants}
                                custom={0}
                            >
                                {BEATS.map((b, i) => (
                                    <motion.div
                                        key={b.year}
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={fade(i === beat)}
                                    >
                                        {b.photo ? (
                                            <img src={b.photo} alt="" className="size-full object-cover" />
                                        ) : (
                                            <div
                                                className={`size-full ${PLACEHOLDER_TINTS[i % PLACEHOLDER_TINTS.length]}`}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </BabyPhoto>
                            {/* Labels share one grid cell so they stack in place */}
                            <div className="pointer-events-none absolute inset-x-0 top-full mt-5 grid place-items-center">
                                {BEATS.map((b, i) => (
                                    <motion.p
                                        key={b.year}
                                        className="col-start-1 row-start-1 font-display text-4xl leading-snug font-light italic text-gray-100"
                                        initial={false}
                                        animate={fade(
                                            allowed && i === beat,
                                            i === 0 ? { delay: YEARS_DELAY_S, duration: YEARS_FADE_S } : undefined
                                        )}
                                    >
                                        {yearsAgo(b.year)} years ago
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                        <motion.h2
                            className="mt-1 text-base leading-snug font-semibold text-black"
                            variants={pieceVariants}
                            custom={1}
                        >
                            Allow “Birthday Celebration” to use your whole day?
                        </motion.h2>
                        <motion.p className="text-sm leading-snug text-gray-600" variants={pieceVariants} custom={2}>
                            Your birthday has been detected to be on the 31st of October. This will allow your phone to
                            begin your wonderful celebration.
                        </motion.p>
                        <div className="mt-1 flex w-full flex-col gap-2">
                            <motion.button
                                className={`${PILL} w-full ${PILL_PRIMARY}`}
                                variants={pieceVariants}
                                custom={3}
                                whileTap={{ scale: 0.97 }}
                                disabled={allowed}
                                onClick={() => setAllowed(true)}
                            >
                                Allow
                            </motion.button>
                            <motion.button
                                className={`${PILL} w-full text-blue-700 bg-blue-600/10 hover:bg-blue-600/15 active:bg-blue-600/25`}
                                variants={pieceVariants}
                                custom={4}
                                whileTap={{ scale: 0.97 }}
                                disabled={allowed}
                                onClick={handleDeny}
                            >
                                Don’t Allow
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <motion.p
                    className="font-display text-5xl leading-snug font-light italic text-gray-100"
                    initial={false}
                    animate={{ opacity: now ? 1 : 0 }}
                    transition={{ delay: now ? NOW_DELAY_S : 0, duration: NOW_FADE_S }}
                >
                    and now…
                </motion.p>
            </div>

            {/* Disabled (so no taps or keyboard) until it has fully faded in */}
            <motion.button
                className={`${PILL} absolute inset-x-0 bottom-14 mx-auto w-65 ${PILL_PRIMARY}`}
                initial={false}
                animate={{ opacity: showContinue ? 1 : 0 }}
                transition={{
                    delay: showContinue && beat === 0 ? CONTINUE_DELAY_S : 0,
                    duration: showContinue ? CONTINUE_FADE_S : 0.4,
                }}
                onAnimationComplete={() => {
                    if (showContinue) setCanContinue(true);
                }}
                whileTap={{ scale: 0.97 }}
                disabled={!canContinue}
                onClick={handleContinue}
            >
                Continue
            </motion.button>
        </motion.div>
    );
}
