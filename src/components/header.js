'use client';
import { User, LogOut, Info} from 'lucide-react';
import Button from './button';
import { useEffect, useState, useRef } from 'react';
import {motion, AnimatePresence } from 'framer-motion';

export default function Header({volver=false}){
    const [showInfo, setShowInfo] = useState(false);
    const infoRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleInfo= ()=>{
        setShowInfo((prev)=>!prev)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!showInfo) return;
            if(
                (buttonRef.current && buttonRef.current.contains(event.target)) ||
                (infoRef.current && infoRef.current.contains(event.target))
            ) {
                return;
            }
            setShowInfo(false);
        };
        if (showInfo) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInfo]);

    return(
        <div>
        <header className="fixed top-0 z-100 flex justify-between p-6 bg-black/30 backdrop-blur-md w-full h-14">
            <div className='flex gap-8 items-center cursor-pointer text-purple-300'>
                <User />
                <LogOut />
            </div>
            <div className='flex gap-6 items-center cursor-pointer text-purple-300'>
                {volver &&
                 <Button text="Inicio" primary={false}/>
                }
                <div 
                ref={buttonRef}
                onClick={toggleInfo} 
                className='hover:text-purple-100'>               
                    <Info />
                </div>
            </div>
            
        </header>
        <AnimatePresence>
            {showInfo && (
                <motion.div
                    ref={infoRef}
                    className="fixed top-16 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg max-w-xs z-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                <h4 className="font-bold mb-2">Acerca del proyecto</h4>
                <p className="text-sm text-zinc-300">
                    Esta herramienta fue desarrollada como parte de un proyecto académico para la 
                    carrera de Ingeniería en Sistemas de Información en UTN - Facultad Regional 
                    Santa Fe. Su objetivo es brindar a pequeñas y medianas empresas una forma simple 
                    y efectiva de evaluar su madurez en ciberseguridad, adaptando el diagnóstico a 
                    las características específicas de cada organización. <br /></p>
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