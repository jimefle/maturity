'use client';
import {motion} from 'framer-motion';

export default function SubtitleMotion({ children }) {
    return (
        <motion.h3 
            className="text-xl text-zinc-200 text-center max-w-xl mx-auto"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.3 }}
        >
            {children}
        </motion.h3>
    )
}