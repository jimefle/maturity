'use client';
import Header from '../../components/header';
import Button from '@/components/button';
import {motion} from 'framer-motion';

export default function Instructions(){
    const href="/evaluation"

    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_left,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <motion.div
                className="absolute top-0 -right-4 bg-purple-900 rounded-full h-64 w-64 filter blur-3xl"
                animate={{
                    scale: [1, 1.7, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-0 right-40 bg-purple-900 rounded-full h-64 w-64 filter blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <Header/>
            <main className="pt-20 min-h-screen flex flex-col xl:flex-row items-center justify-around px-4 xl:px-16 gap-4 ">
                <motion.h1 
                className="text-5xl xl:text-6xl font-extrabold text-center xl:text-start text-zinc-100 z-50"
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                >
                Evaluación<br /> de Madurez en<br />Ciberseguridad
                </motion.h1>
                <motion.div 
                className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 mb-12"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.8, delay: 0.5 }}
                >
                <div className="bg-black/20 backdrop-blur-md  text-white p-10 rounded-2xl shadow-lg w-full  border border-zinc-700 max-w-3xl">
                    <div className="mb-6">
                        <h4 className="text-lg">
                            Respondé una serie de preguntas clave sobre prácticas de ciberseguridad en tu organización. Esta evaluación te va a permitir conocer tu nivel de madurez y detectar oportunidades de mejora.
                        </h4>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-1 text-2xl">Instrucciones</h3>
                        <h4 className="text-lg">
                            Leé atentamente cada pregunta y seleccioná la opción que mejor refleje la situación actual de tu organización. Las respuestas deben basarse en hechos concretos, no en intenciones futuras.<br /><br /> Al finalizar, vas a obtener un perfil de madurez con recomendaciones para avanzar hacia un mayor nivel de seguridad.
                        </h4>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <Button primary={false} text="Cancelar"/>
                        <Button text="Aceptar" href={href}/>
                    </div>
                </div>
                </motion.div>
            </main>
        </div>
    )

};