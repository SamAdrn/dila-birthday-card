import type { PhotoSource } from './photos';

export type Beat = { year: number; photo: PhotoSource | null };

/** Every photo to show in the story after the prompt */
export const BEATS: Beat[] = [
    { year: 2002, photo: { src: '/photos/2002.jpg', shape: 'portrait' } },
    { year: 2006, photo: { src: '/photos/2006.jpg', shape: 'portrait' } },
    { year: 2010, photo: { src: '/photos/2010.jpg', shape: 'portrait' } },
    { year: 2017, photo: { src: '/photos/2017.jpg', shape: 'portrait' } },
    { year: 2019, photo: { src: '/photos/2019.jpg', shape: 'portrait' } },
    { year: 2023, photo: { src: '/photos/2023.jpg', shape: 'portrait' } },
];

export const yearsAgo = (year: number) => new Date().getFullYear() - year;
