import { motion, type HTMLMotionProps } from 'framer-motion';

export default function BabyPhoto({ className = '', ...props }: HTMLMotionProps<'div'>) {
    return (
        <motion.div
            className={`bg-gray-400 ${className}`}
            style={{ borderRadius: 16 }}
            {...props}
        />
    );
}
