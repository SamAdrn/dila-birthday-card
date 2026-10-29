import type { PhotoSource } from './photos';

export type Beat = { year: number; photo: PhotoSource | null };

/** Every photo to show in the story after the prompt */
export const BEATS: Beat[] = [
    { year: 2002, photo: { src: '/photos/5-3-young-2.jpg', shape: 'landscape' } },
    { year: 2006, photo: { src: '/photos/3-5-young-2.jpg', shape: 'portrait' } },
    { year: 2012, photo: { src: '/photos/3-5-young-3.jpg', shape: 'portrait' } },
    { year: 2019, photo: { src: '/photos/3-5-young-1.jpg', shape: 'portrait' } },
];

export const yearsAgo = (year: number) => new Date().getFullYear() - year;
