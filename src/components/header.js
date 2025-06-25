'use client';
import { User, LogOut, Info} from 'lucide-react';
import Button from './button';
import { useState } from 'react';
import {motion, AnimatePresence } from 'framer-motion';

export default function Header({volver=false}){
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo= ()=>{
        setShowInfo((prev)=>!prev)
    }

    return(
        <div>
        <header className="fixed top-0 z-100 flex justify-between p-3 bg-black/30 backdrop-blur-md w-full">
            <div className='flex gap-6 items-center py-2 px-2 cursor-pointer'>
                <User  />
                <LogOut />
                <div onClick={toggleInfo}>               
                    <Info />
                </div>
            </div>
            {volver &&
                <Button text="Volver" primary={false}/>
            }
        </header>
        <AnimatePresence>
            {showInfo && (
                <motion.div
                    className="fixed top-16 left-4 bg-black/80 text-white p-4 rounded-lg shadow-lg max-w-xs z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                <h4 className="font-bold mb-2">Sobre esta página</h4>
                <p className="text-sm text-zinc-300">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br /><br />Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.          </p>
                <button
                onClick={toggleInfo}
                className="mt-2 text-purple-400 hover:text-purple-200 text-sm"
                >
                Cerrar
                </button>
                </motion.div>
            )}
      </AnimatePresence>
      </div>
    )
}