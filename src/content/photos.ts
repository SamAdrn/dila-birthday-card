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

export const WISH_PHOTOS: WishPhoto[] = [
    { id: 'buita-wish-photo', src: '/photos/wish-buita.jpg', shape: 'landscape', after: 'buita' },
    { id: 'sam-wish-photo', src: '/photos/wish-sam.jpg', shape: 'portrait', after: 'sam' },
    { id: 'agasha-wish-photo', src: '/photos/wish-agasha.jpg', shape: 'portrait', after: 'agasha' },
    { id: 'louis-luce-wish-photo', src: '/photos/wish-louis-luce.jpg', shape: 'portrait', after: 'louis-luce' },
    { id: 'prajna-wish-photo', src: '/photos/wish-prajna.jpg', shape: 'portrait', after: 'prajna' },
    { id: 'vinno-wish-photo', src: '/photos/wish-vinno.jpg', shape: 'landscape', after: 'vinno' },
    { id: 'bagas-wish-photo', src: '/photos/wish-bagas.jpg', shape: 'portrait', after: 'bagas' },
    { id: 'tempo-wish-photo', src: '/photos/wish-tempo.jpg', shape: 'portrait', after: 'tempo' },
    { id: 'denisa-wish-photo', src: '/photos/wish-denisa.jpg', shape: 'portrait', after: 'denisa' },
    {
        id: 'ray-and-sheila-wish-photo',
        src: '/photos/wish-ray-and-sheila.jpg',
        shape: 'landscape',
        after: 'ray-and-sheila',
    },
    { id: 'salma-wish-photo', src: '/photos/wish-salma.jpg', shape: 'portrait', after: 'princess' },
    { id: 'rafy-wish-photo', src: '/photos/wish-rafy.jpg', shape: 'landscape', after: 'rafy' },
];
