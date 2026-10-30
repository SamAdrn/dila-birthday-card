// Where the site's photos live. Drop the file in public/, then set its path here.

export type Shape = 'landscape' | 'portrait';
export type PhotoSource = { src: string; shape?: Shape };

/** The photo on the "Allow" prompt, a current one in landscape (5:3) */
export const PROMPT_PHOTO: string | null = '/photos/prompt.jpg';

/** Her portrait in the hero arch (about 600 × 760) */
export const HERO_PHOTO: string | null = 'photos/hero.jpg';

export type WishPhoto = {
    id: string;
    src: string | null;
    shape: Shape;
    alt?: string;
    after?: string; // the id of a wish: the photo sits directly beneath that card. Omit to spread it between the wishes
};

/** Photos slipped in between the wish cards. Adding one = adding one object; the layout makes room for it. */
export const WISH_PHOTOS: WishPhoto[] = [
    { id: 'sample-1', src: null, shape: 'portrait', after: 'sari' }, // sample: pinned under Sari's wish
    { id: 'sample-2', src: null, shape: 'landscape' },
    { id: 'sample-3', src: null, shape: 'portrait' },
];
