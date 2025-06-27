'use client';
import Card from '../components/card';
import Header from '../components/header';
import {motion} from 'framer-motion';

export default function Home() {

  return (
    <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)]'>
      <Header/>
        <main className="pt-16 flex flex-col items-center justify-center px-4 lg:px-10 w-full gap-5 min-h-screen">
        <motion.h1 
          className="text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 text-center pt-9 text-zinc-100"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          Evaluación de Madurez<br /> en Ciberseguridad
        </motion.h1>

        <motion.h3 
          className="text-xl text-zinc-200 mb-4 text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Identificá el nivel actual madurez de tu organización y accedé a recomendaciones personalizadas para mejorar tu postura de seguridad.
        </motion.h3>

        <motion.div 
          className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-2 lg:gap-6 mt-2 mb-6"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card 
            titulo="Cuestionario de Perfil" 
            descrip="Completá un breve formulario para identificar el contexto y características de tu empresa."
            text="Completar" 
            href=""
          />
          <Card 
            titulo="Cuestionario de Madurez" 
            descrip="Respondé preguntas clave sobre prácticas de ciberseguridad para conocer tu nivel de madurez."
            text="Empezar" 
            href="/instructions"
          />
          <Card 
            titulo="Evaluaciones" 
            descrip="Accedé al historial de evaluaciones realizadas y seguí la evolución de tu organización."
            text="Ver evaluaciones" 
            href=""
          />
        </motion.div>
      </main>
    </div>
  );
}