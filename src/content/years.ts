export const BABY_PHOTO_YEAR = 2002;

export type Beat = { year: number; photo: string | null };

// The first beat is the photo the prompt opens with; the rest play after Continue.
// Photos are null until the real ones arrive (Step 6).
export const BEATS: Beat[] = [
    { year: BABY_PHOTO_YEAR, photo: null },
    { year: 2006, photo: null },
    { year: 2012, photo: null },
    { year: 2019, photo: null },
];

export const yearsAgo = (year: number) => new Date().getFullYear() - year;
