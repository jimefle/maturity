import TitleMotion from '@/components/motion/titleMotion';
import ContentMotion from '@/components/motion/contentMotion';
import SubtitleMotion from '@/components/motion/subtitleMotion';

import Card from '../components/card';

export default function Home() {

  return (
    <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)]'>
        <main className="pt-16 flex flex-col items-center justify-center px-4 lg:px-10 w-full gap-5 min-h-screen">
        <TitleMotion>
          Evaluación de Madurez<br /> en Ciberseguridad
        </TitleMotion>
        <SubtitleMotion>
          Identificá el nivel actual madurez de tu organización y accedé a recomendaciones personalizadas para mejorar tu postura de seguridad.
        </SubtitleMotion>
        <ContentMotion>
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
        </ContentMotion>
      </main>
    </div>
  );
}