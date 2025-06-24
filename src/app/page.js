'use client';
import { useSearchParams } from 'next/navigation';
import Card from '../components/card';
import Header from '../components/header';
import {motion} from 'framer-motion';

export default function Home() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level');
  const prog = searchParams.get('prog');

  return (
    <div className='max-h-screen flex flex-col'>
      <Header/>
        <main className="flex flex-col items-center justify-center px-4 w-full h-screen bg-cover bg-center bg-no-repeat gap-5">
        <motion.h1 
          className="text-3xl md:text-4xl font-extrabold mb-4 text-center pt-9 text-zinc-100"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          Evaluación de Madurez en Ciberseguridad
        </motion.h1>

        <motion.h3 
          className="text-md md:text-lg text-zinc-400 mb-6 text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Identificá el nivel actual de tu organización y accedé a recomendaciones personalizadas para mejorar tu postura de seguridad.
        </motion.h3>

        <motion.div 
          className="flex flex-col md:flex-row justify-center items-stretch gap-6 mt-8 mb-12"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card 
            titulo="Cuestionario de Perfil" 
            descrip="Completá un breve formulario para identificar el contexto y características de tu empresa."
            boton="Realizar cuestionario" 
            href=""
          />
          <Card 
            titulo="Evaluación de Madurez" 
            descrip="Respondé preguntas clave sobre prácticas de ciberseguridad para conocer tu nivel de madurez."
            boton="Realizar evaluación" 
            href="/instructions"
          />
          <Card 
            titulo="Evaluaciones" 
            descrip="Accedé al historial de evaluaciones realizadas y seguí la evolución de tu organización."
            boton="Ver evaluaciones" 
            href=""
          />
        </motion.div>

        {level && prog && (
          <motion.div 
            className="bg-zinc-800 rounded-2xl shadow-lg p-4 text-center mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-zinc-200">
              Nivel de madurez: <span className="text-purple-400">{level}</span>
            </p>
            <p className="text-lg font-semibold text-zinc-200">
              Progreso: <span className="text-purple-400">{prog}%</span>
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}