// The faces that fall down the hero. Drop a cutout in public/faces/ (a transparent WebP, about 200 px wide)
// and add it here. An empty list turns the face rain off.
// `scale` resizes one face against the others (1 is normal): use less than 1 for a face that fills its frame
// and so looks bigger than the rest.
export type Face = { src: string; scale?: number };

export const FACES: Face[] = [
    { src: '/faces/face-1.webp', scale: 0.75 },
    { src: '/faces/face-2.webp' },
    { src: '/faces/face-3.webp' },
    { src: '/faces/face-4.webp' },
];
