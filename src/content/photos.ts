// Where the site's photos live. Drop the file in public/, then set its path here.

export type Shape = 'landscape' | 'portrait';
export type PhotoSource = { src: string; shape?: Shape };

/** The photo on the "Allow" prompt, a current one in landscape (5:3) */
export const PROMPT_PHOTO: string | null = '/photos/5-3-now-1.jpg';

/** Her portrait in the hero arch (about 600 × 760) */
export const HERO_PHOTO: string | null = 'photos/3-5-now-2.jpg';
