import type { Shape, WishPhoto } from '../../content/photos';
import { TINTS, type Tint, type Wish } from '../../content/wishes';

// Wishes without a priority go after every ranked one
const UNRANKED = 99;

// Rough card height in characters: the columns are narrow, so text length is a good proxy.
// These numbers are guesses; tune them if the columns end up uneven on the phone.
const CHROME = 80; // padding, gaps and the sign-off row
const TITLE_BONUS = 1.3; // the title is larger and heavier than the message
const RIGHT_OFFSET = 30; // the right column is nudged down by mt-7

// A photo is as wide as a column, so its height is fixed by its shape:
// 5:3 is about 100px and 3:5 about 278px. A line of text is about 20px and holds about 18 characters,
// so 1px is roughly 0.9 characters.
const PHOTO_WEIGHT: Record<Shape, number> = { landscape: 90, portrait: 250 };

// The tints are picked with a seeded random number, so every load gives the same colors
// (Math.random would repaint the cards each time). Change the seed to reshuffle them.
const TINT_SEED = 311001;

// Every third wish gets a sparkle on its outer corner (the left column's left edge, the right column's
// right edge, so it sits in the gutter), alternating top and bottom
const SPARKLE_EVERY = 3;

export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type Entry = { kind: 'wish'; wish: Wish; tint: Tint; corner?: Corner } | { kind: 'photo'; photo: WishPhoto };

// A block always lands in one column: a wish and the photos pinned under it, or a lone photo
type Block = { wish?: Wish; photos: WishPhoto[] };

const wishWeight = (wish: Wish) => CHROME + wish.title.length * TITLE_BONUS + (wish.message?.length ?? 0);

// A tiny seeded random number generator (mulberry32): the same seed always gives the same numbers
function mulberry32(seed: number) {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function layoutColumns(wishes: Wish[], photos: WishPhoto[]) {
    // 1. Order the wishes. Array.prototype.sort is stable, so equal priorities keep their order in the file
    const ordered = [...wishes].sort((a, b) => (a.priority ?? UNRANKED) - (b.priority ?? UNRANKED));

    // 2. Make the blocks. A photo pinned to a wish (`after`) travels with that card; the rest float.
    //    The k-th of P floating photos goes after the wish where (k + 1) / (P + 1) of the wishes have passed.
    const wishIds = new Set(wishes.map((wish) => wish.id));
    const floating = photos.filter((photo) => !photo.after || !wishIds.has(photo.after));
    if (import.meta.env.DEV) {
        for (const photo of floating) {
            if (photo.after)
                console.warn(`Wish photo "${photo.id}" is pinned to "${photo.after}", which is not a wish id`);
        }
    }

    const blocks: Block[] = [];
    let nextFloating = 0;
    ordered.forEach((wish, i) => {
        blocks.push({ wish, photos: photos.filter((photo) => photo.after === wish.id) });
        while (
            nextFloating < floating.length &&
            i + 1 >= ((nextFloating + 1) * ordered.length) / (floating.length + 1)
        ) {
            blocks.push({ photos: [floating[nextFloating++]] });
        }
    });
    // With no wishes at all, the photos still show
    for (; nextFloating < floating.length; nextFloating++) blocks.push({ photos: [floating[nextFloating]] });

    // 3. Place the blocks: each goes in the shorter column (ties go left), so the order reads
    //    left, right, then whichever side is short, and tall cards don't pile up on one side.
    //    A wish with no tint of its own gets the least-used tint that isn't the one just dealt in either column.
    const random = mulberry32(TINT_SEED);
    const used = Object.fromEntries(TINTS.map((tint) => [tint, 0])) as Record<Tint, number>;
    const pickTint = (avoid: (Tint | undefined)[]) => {
        const open = TINTS.filter((tint) => !avoid.includes(tint));
        const fewest = Math.min(...open.map((tint) => used[tint]));
        const ties = open.filter((tint) => used[tint] === fewest);
        return ties[Math.floor(random() * ties.length)];
    };

    const left: Entry[] = [];
    const right: Entry[] = [];
    let leftHeight = 0;
    let rightHeight = RIGHT_OFFSET;
    let leftTint: Tint | undefined;
    let rightTint: Tint | undefined;
    let wishCount = 0;

    for (const block of blocks) {
        const goesLeft = leftHeight <= rightHeight;
        const entries: Entry[] = [];
        let height = 0;

        if (block.wish) {
            const tint = block.wish.tint ?? pickTint([leftTint, rightTint]);
            used[tint]++;
            if (goesLeft) leftTint = tint;
            else rightTint = tint;
            const sparkles = wishCount % SPARKLE_EVERY === 1;
            const vertical = Math.floor(wishCount / SPARKLE_EVERY) % 2 === 0 ? 'top' : 'bottom';
            const corner: Corner | undefined = sparkles ? `${vertical}-${goesLeft ? 'left' : 'right'}` : undefined;
            wishCount++;
            entries.push({ kind: 'wish', wish: block.wish, tint, corner });
            height += wishWeight(block.wish);
        }
        for (const photo of block.photos) {
            entries.push({ kind: 'photo', photo });
            height += PHOTO_WEIGHT[photo.shape];
        }

        if (goesLeft) {
            left.push(...entries);
            leftHeight += height;
        } else {
            right.push(...entries);
            rightHeight += height;
        }
    }

    return { left, right };
}
