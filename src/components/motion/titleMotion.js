'use client';
import {motion} from 'framer-motion';

export default function TitleMotion({ children }) {
  return (
    <motion.h1 
        className="text-5xl xl:text-6xl font-extrabold text-center xl:text-start text-zinc-100 z-50"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
    >
      {children}
    </motion.h1>
  );
}