import { motion, useAnimationControls, type Transition, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

import { PROMPT_PHOTO } from '../../content/photos';
import { BEATS, yearsAgo } from '../../content/years';
import Photo from '../Photo/Photo';

type StoryProps = { onDone: () => void };

// Backdrop: the glow shows through at first, then dims to the Segue color (--color-segue).
// Both ends share the same RGB so only the alpha animates.
const SEGUE_RGB = '14, 18, 20';
const BG_DIMMED = `rgba(${SEGUE_RGB}, 0.4)`;
const BG_DARK = `rgb(${SEGUE_RGB})`;

// Leave sequence, in seconds
const BG_DELAY_S = 1; // after the Allow tap
const BG_FADE_S = 1.5;
const MODAL_DELAY_S = 0.5; // after the Allow tap
const MODAL_FADE_S = 0.5;
const MODAL_DROP_PX = 24;
const MODAL_GONE_S = MODAL_DELAY_S + MODAL_FADE_S;
const PHOTO_FADE_S = 2; // every "years ago" photo after the first dissolves in over this long

// Photo Handoff: one thing changes at a time, in this order, all measured from the Allow tap.
// 1. the prompt photo fades out, alone on the dark
// 2. the empty frame reshapes from 5:3 to 3:5;
// 3. the first "years ago" photo develops in
// 4. its label arrives as the photo lands.
const PROMPT_FADE_DELAY_S = MODAL_GONE_S; // wait until the card has left
const PROMPT_FADE_S = 0.6;
const RESHAPE_DELAY_S = 1.8; // the frame is empty by now (and the background is half dark)
const RESHAPE_S = 0.8; // must match `duration-800` in Photo.tsx
const FIRST_DELAY_S = RESHAPE_DELAY_S + RESHAPE_S;
const FIRST_FADE_S = 1.3;
const YEARS_DELAY_S = FIRST_DELAY_S + FIRST_FADE_S - 0.2; // the label starts as the photo lands
const YEARS_FADE_S = 1.2;
const CONTINUE_DELAY_S = YEARS_DELAY_S + 0.6;
const CONTINUE_BACK_DELAY_S = 0.15; // the same beat the Allow button gets
const CONTINUE_TAPPABLE_S = 0.15; // taps start working this long after it begins to appear

// Beats: each Continue tap dissolves to the next photo, then its label arrives
const BEAT_OUT_S = 0.6; // the old label
const BEAT_IN_S = 1; // the new label
const BEAT_IN_DELAY_S = PHOTO_FADE_S; // after the photo has arrived
// Continue steps aside, then comes back as the label finishes landing (it used to wait for it)
const CONTINUE_RETURN_S = BEAT_IN_DELAY_S + BEAT_IN_S - 0.4;

// "and now…", measured from the final Continue tap
const PHOTO_OUT_S = 0.5; // photo and label fade away first
const NOW_DELAY_S = 0.8;
const NOW_FADE_S = 1.2;
const NOW_HOLD_MS = 1800;
const NOW_DONE_MS = (NOW_DELAY_S + NOW_FADE_S) * 1000 + NOW_HOLD_MS;

const PILL = 'h-13 rounded-full text-[17px] font-semibold cursor-pointer transition-colors disabled:cursor-default';
const PILL_PRIMARY = 'text-white bg-blue-600/90 hover:bg-blue-500/90 active:bg-blue-400/90';

// iOS-style dismiss: everything drops a little and fades, all at once
const modalLeave = {
    opacity: 0,
    y: MODAL_DROP_PX,
    transition: { delay: MODAL_DELAY_S, duration: MODAL_FADE_S, ease: 'easeIn' as const },
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

// Continue moves like the Allow button: it rises in the way the pieces do and drops away like
// the modal does, just without the modal's wait. It sets no `transition` of its own on the
// button, so the tap spring stays the default one (a button-level transition would slow it down).
const continueVariants: Variants = {
    hidden: pieceVariants.hidden,
    show: (delay: number) => ({ opacity: 1, y: 0, transition: { delay } }),
    leave: { ...modalLeave, transition: { ...modalLeave.transition, delay: 0 } },
};

// The photo frame shares the entrance but holds still on leave
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

// A beat's label: quick out, slower in
function fade(on: boolean, enter: Transition = { delay: BEAT_IN_DELAY_S, duration: BEAT_IN_S }) {
    return { opacity: on ? 1 : 0, transition: on ? enter : { duration: BEAT_OUT_S } };
}

// A beat's photo dissolves in over the one beneath it. The old photo holds until the new one has
// fully arrived, then drops out unseen, so nothing dips while the two overlap.
function photoFade(
    on: boolean,
    delay = 0,
    duration = PHOTO_FADE_S
): { opacity: number; transition: Transition } {
    return on
        ? { opacity: 1, transition: { delay, duration } }
        : { opacity: 0, transition: { delay: PHOTO_FADE_S, duration: 0 } };
}

export default function Story({ onDone }: StoryProps) {
    const [allowed, setAllowed] = useState(false);
    const [canContinue, setCanContinue] = useState(false);
    const [beat, setBeat] = useState(0);
    const [waiting, setWaiting] = useState(false); // Continue is hidden while the next beat crossfades in
    const [now, setNow] = useState(false);
    const [reshaped, setReshaped] = useState(false); // the empty frame has started changing shape
    const shake = useAnimationControls();

    // Get the years photos decoded while she is still reading the prompt, so the first dissolve
    // never starts on an image the browser hasn't had to paint yet
    useEffect(() => {
        BEATS.forEach(({ photo }) => {
            if (!photo) return;
            const img = new Image();
            img.src = photo.src;
            img.decode().catch(() => {});
        });
    }, []);

    // Continue comes back a moment after the tap that hid it
    useEffect(() => {
        if (!waiting) return;
        const id = setTimeout(() => setWaiting(false), CONTINUE_RETURN_S * 1000);
        return () => clearTimeout(id);
    }, [waiting]);

    // The frame stays landscape (the prompt photo's shape) until the prompt photo has faded out, so
    // nothing is inside it while it changes shape; after that it follows the current beat.
    useEffect(() => {
        if (!allowed) return;
        const id = setTimeout(() => setReshaped(true), RESHAPE_DELAY_S * 1000);
        return () => clearTimeout(id);
    }, [allowed]);

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
    const photoShape = (reshaped && BEATS[beat].photo?.shape) || 'landscape';

    // Taps count once the button is on its way in. Waiting for the spring to settle would leave it
    // looking ready but dead for over a second.
    useEffect(() => {
        if (!showContinue) return;
        const delayS = beat === 0 ? CONTINUE_DELAY_S : CONTINUE_BACK_DELAY_S;
        const id = setTimeout(() => setCanContinue(true), (delayS + CONTINUE_TAPPABLE_S) * 1000);
        return () => clearTimeout(id);
    }, [showContinue, beat]);

    return (
        <motion.div
            className="relative h-dvh overflow-hidden flex flex-col items-center justify-center px-6 pt-notch pb-6 text-white"
            initial={false}
            animate={{ backgroundColor: allowed ? BG_DARK : BG_DIMMED }}
            transition={{ delay: BG_DELAY_S, duration: BG_FADE_S, ease: 'easeInOut' }}
        >
            {/* Modal container */}
            <motion.div className="w-full max-w-75" animate={shake}>
                <motion.div className="relative" initial="hidden" animate={allowed ? 'leave' : 'show'}>
                    {/* Modal fill */}
                    <motion.div
                        className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-4xl shadow-lg"
                        variants={cardVariants}
                    />
                    <div className="relative flex flex-col items-center gap-1 p-5 text-center">
                        {/* Photo slot: always the prompt photo's 5:3, so the card never changes size. The
                            photo is centred in it and can outgrow it, so it reshapes around its own centre. */}
                        <div
                            className={`relative flex aspect-5/3 min-h-0 w-full items-center justify-center transition-opacity ${now ? 'opacity-0' : 'opacity-100'}`}
                            style={{ transitionDuration: `${PHOTO_OUT_S}s` }}
                        >
                            {/* Photo stack: as tall as the photo, so the labels can hang from its bottom edge */}
                            <div className="relative flex w-full shrink-0 justify-center">
                                {/* Photo Container (the empty frame is a faint glass outline) */}
                                <Photo
                                    className="bg-white/7 ring-1 ring-inset ring-white/20"
                                    shape={photoShape}
                                    variants={photoVariants}
                                    custom={0}
                                >
                                    {/* Prompt Photo */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: allowed ? 0 : 1,
                                            transition: {
                                                delay: allowed ? PROMPT_FADE_DELAY_S : 0,
                                                duration: allowed ? PROMPT_FADE_S : 0,
                                            },
                                        }}
                                    >
                                        {PROMPT_PHOTO && (
                                            <img src={PROMPT_PHOTO} alt="" className="size-full object-cover" />
                                        )}
                                    </motion.div>

                                    {/* Year Photos */}
                                    {BEATS.map((b, i) => (
                                        <motion.div
                                            key={b.year}
                                            className="absolute inset-0"
                                            initial={false}
                                            animate={
                                                i === 0
                                                    ? photoFade(allowed && beat === 0, FIRST_DELAY_S, FIRST_FADE_S)
                                                    : photoFade(allowed && i === beat)
                                            }
                                        >
                                            {b.photo ? (
                                                <img src={b.photo.src} alt="" className="size-full object-cover" />
                                            ) : (
                                                <div className="size-full" />
                                            )}
                                        </motion.div>
                                    ))}
                                </Photo>

                                {/* Year labels */}
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
                        </div>

                        {/* Prompt Heading */}
                        <motion.h2
                            className="mt-4 text-base text-left leading-snug font-semibold text-black"
                            variants={pieceVariants}
                            custom={1}
                        >
                            Allow “Birthday Celebration” to use your whole day?
                        </motion.h2>

                        {/* Prompt Message */}
                        <motion.p
                            className="text-sm text-left leading-snug text-gray-600"
                            variants={pieceVariants}
                            custom={2}
                        >
                            Your birthday has been detected to be on the 31st of October. This will allow your phone to
                            begin your wonderful celebration.
                        </motion.p>

                        {/* Prompt Buttons */}
                        <div className="mt-4 flex w-full flex-col gap-2">
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

            {/* Final Year Label */}
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

            {/* Continue Button (to progress year photos only) */}
            <motion.button
                className={`${PILL} absolute inset-x-0 bottom-14 mx-auto w-65 ${PILL_PRIMARY}`}
                variants={continueVariants}
                custom={beat === 0 ? CONTINUE_DELAY_S : CONTINUE_BACK_DELAY_S}
                initial="hidden"
                animate={showContinue ? 'show' : allowed ? 'leave' : 'hidden'}
                whileTap={{ scale: 0.97 }}
                disabled={!canContinue}
                onClick={handleContinue}
            >
                Continue
            </motion.button>
        </motion.div>
    );
}
