import { motion, type HTMLMotionProps } from 'framer-motion';

import type { Shape } from '../../content/photos';

type PhotoProps = HTMLMotionProps<'div'> & { shape?: Shape };

const WIDTH: Record<Shape, string> = {
    landscape: 'w-full',
    portrait: 'mx-auto w-[min(100%,calc((100dvh_-_342px)_*_0.6))]',
};

const ASPECT: Record<Shape, string> = {
    landscape: 'aspect-5/3',
    portrait: 'aspect-3/5',
};

export default function Photo({ shape = 'landscape', className = '', ...props }: PhotoProps) {
    return (
        <motion.div
            className={`relative overflow-hidden rounded-2xl shadow-sm transition-[aspect-ratio,width] duration-500 ease-in-out ${WIDTH[shape]} ${ASPECT[shape]} ${className}`}
            {...props}
        />
    );
}
