import { motion, type HTMLMotionProps } from 'framer-motion';

export default function BabyPhoto({ className = '', ...props }: HTMLMotionProps<'div'>) {
    return (
        <motion.div
            layoutId="baby-photo"
            className={`bg-gray-400 ${className}`}
            style={{ borderRadius: 16 }}
            transition={{ layout: { duration: 2, ease: [0.22, 1, 0.36, 1] } }}
            {...props}
        />
    );
}
