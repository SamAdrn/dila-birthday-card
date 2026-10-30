import { motion } from 'framer-motion';

import type { Shape, WishPhoto } from '../../content/photos';

const ASPECT: Record<Shape, string> = {
    landscape: 'aspect-5/3',
    portrait: 'aspect-3/5',
};

export default function PhotoCard({ photo }: { photo: WishPhoto }) {
    const { src, shape, alt = '' } = photo;

    return (
        <motion.figure
            // The frame reserves the photo's shape, so nothing jumps when the image loads (and an empty one is a faint outline)
            className={`overflow-hidden rounded-lg bg-ink/5 ring-1 ring-ink/10 ring-inset ${ASPECT[shape]}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            {src && <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />}
        </motion.figure>
    );
}
