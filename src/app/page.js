'use client';
import { useSearchParams } from 'next/navigation';
import Card from './components/card';
import Header from './components/header';

export default function Home() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level');
  const prog = searchParams.get('prog');

  return (
    <main className="min-h-screen bf-zinc-100 max-w-2xl mx-auto min-w-screen">
      <Header/>
      <h1 className="text-2xl font-bold mb-4 text-center pt-9">Evaluación de madurez en ciberseguridad</h1>
      <h3 className="text-lg text-zinc-400 mb-4 text-center">Identificá el nivel actual de tu organización y accedé a recomendaciones personalizadas para mejorar tu postura de seguridad.</h3>      
      <div className="flex flex-1 md:flex-row justify-center items-center gap-6 mt-10 mb-10">
        <Card titulo="Cuestionario de Perfil" descrip="Completá un breve formulario para identificar el contexto y características de tu empresa."
          boton={"Realizar cuestionario"} href=""/>
        <Card titulo="Evaluación de madurez" descrip="Respondé preguntas clave sobre prácticas de ciberseguridad para conocer tu nivel de madurez."
          boton={"Realizar evaluación"} href="/instructions"/>
        <Card titulo="Evaluaciones" descrip="Accedé al historial de evaluaciones realizadas y seguí la evolución de tu organización."
          boton={"Ver evaluaciones"} href=""/>
      </div>
      {level && prog && (
        <div>
          <p className="mt-4 text-lg font-semibold">
          Resultado final para este subdominio: {level}
          </p>
          <p className="mt-4 text-lg font-semibold">
          Resultado final para este subdominio: {prog}%
          </p>
        </div>
      )}
      
    </main>
  );
}
