import { useState, type CSSProperties } from 'react';

import { FACES, type Face as FaceData } from '../../content/faces';

const COUNT = 12;

// Every piece takes the same time to fall, and they come in over the top one after the other, a
// fixed gap apart. Same trip time is what keeps them evenly spaced for good: pieces with different
// speeds would drift into bunches after a lap or two.
const FALL_S = 11;
const ENTRY_GAP_S = FALL_S / COUNT;

// Where each one falls. Stepping 5 columns of 12 each time visits every column once, and two faces that
// come in one after the other are always far apart (never side by side).
const COLUMN_STEP = 5;
const EDGE_PCT = 8; // the outer columns sit this far in from each side, so no face is half off the screen

// Size, sideways drift (px, either way) and rock (degrees, either way) cycle through these short lists
// with different lengths, so no two neighbours match
const SIZES = [64, 56, 72, 60, 68];
const SWAYS = [12, 8, 14];
const TILTS = [14, 18, 10, 16];

const PIECES = Array.from({ length: COUNT }, (_, i) => ({
    x: EDGE_PCT + (((i * COLUMN_STEP) % COUNT) / (COUNT - 1)) * (100 - 2 * EDGE_PCT), // percent across
    size: SIZES[i % SIZES.length],
    sway: SWAYS[i % SWAYS.length],
    tilt: TILTS[i % TILTS.length],
}));

type Piece = (typeof PIECES)[number];

// The faces melt away over the bottom of the hero instead of being cut off at its edge. It's a mask, not
// a coloured layer: the page behind the hero is a gradient, and its colour down there depends on the
// screen's height, so a coloured layer would never match it and would show a seam.
const FADE_MASK = 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)';

// Three nested elements, one transform each, so they never fight: the outer one falls, the middle one
// sways and rocks, the inner one pops. The falling and swaying are CSS keyframes (see index.css), so
// they run off the main thread and cost no JavaScript per frame.
function Face({ face, piece, index, delay }: { face: FaceData; piece: Piece; index: number; delay: number }) {
    const [popped, setPopped] = useState(false);
    const size = piece.size * (face.scale ?? 1);
    const swayS = 3.5 + (index % 4); // a different rhythm for each piece

    return (
        <span
            className="pointer-events-none absolute top-0 will-change-transform"
            style={{
                left: `calc(${piece.x}% - ${size / 2}px)`,
                width: size,
                // `backwards` holds it above the top until its turn comes, so the rain starts piece by piece
                animation: `face-fall ${FALL_S}s linear ${delay + index * ENTRY_GAP_S}s infinite backwards`,
            }}
            // A popped face stays gone for the rest of its trip and comes back when it starts over at the top.
            // The event bubbles up from the sway too, so only the fall itself counts.
            onAnimationIteration={(e) => {
                if (e.target === e.currentTarget) setPopped(false);
            }}
        >
            <span
                className="block"
                style={
                    {
                        '--sway': `${piece.sway}px`,
                        '--tilt': `${piece.tilt}deg`,
                        'animation': `face-sway ${swayS}s ease-in-out ${-index * 1.3}s infinite alternate`,
                    } as CSSProperties
                }
            >
                {/* cursor-pointer is what makes iOS Safari send a click to something that isn't a link or button */}
                <span
                    className={`block cursor-pointer transition duration-300 ease-out ${
                        popped ? 'pointer-events-none scale-150 opacity-0' : 'pointer-events-auto'
                    }`}
                    onClick={() => setPopped(true)}
                >
                    <img
                        className="pointer-events-none block w-full select-none"
                        style={{ WebkitTouchCallout: 'none' }}
                        src={face.src}
                        alt=""
                        draggable={false}
                        decoding="async"
                    />
                </span>
            </span>
        </span>
    );
}

// Her face, raining down behind the hero. `delay` is when the first one comes in (seconds after the hero
// opens); the rest follow a beat apart. Tap one and it pops. Hidden for Reduce Motion.
export default function FaceRain({ delay }: { delay: number }) {
    if (FACES.length === 0) return null;

    return (
        <div
            className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
            aria-hidden
        >
            {PIECES.map((piece, i) => (
                <Face key={i} face={FACES[i % FACES.length]} piece={piece} index={i} delay={delay} />
            ))}
        </div>
    );
}
