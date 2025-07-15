'use client';
import {motion} from 'framer-motion';

export default function ContentMotion({ children }) {
  return (
    <motion.div 
        className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 mb-12"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.5 }}
    >
      {children}
    </motion.div>
  );
}