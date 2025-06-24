'use client';
import Link from 'next/link';
import Header from '../../components/header';

export default function Instructions(){
    const titulo="Evaluación de madurez";
    const descrip="Respondé una serie de preguntas clave sobre prácticas de ciberseguridad en tu organización. Esta evaluación te va a permitir conocer tu nivel de madurez y detectar oportunidades de mejora.";
    const instruc="Leé atentamente cada pregunta y seleccioná la opción que mejor refleje la situación actual de tu organización. Las respuestas deben basarse en hechos concretos, no en intenciones futuras. Al finalizar, vas a obtener un perfil de madurez con recomendaciones para avanzar hacia un mayor nivel de seguridad.";
    const href="/evaluation"

    return(
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <main className="flex flex-1 items-center justify-center px-4 bg-[url(/img1.jpg)] w-full h-screen bg-cover bg-center bg-no-repeat">
                <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white p-10 rounded-2xl shadow-lg w-full  border border-zinc-700 max-w-xl">
                    <h2 className="text-xl font-semibold mb-6 text-center">{titulo}</h2>
                    <div className="mb-6">
                        <h4 className="">{descrip}</h4>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-semibold mb-1">Instrucciones</h3>
                        <h4 className="">{instruc}</h4>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <Link href="/" 
                        className="border-2 border-purple-900 hover:bg-purple-900 active:bg-purple-800 text-white font-semibold py-2.5 px-5 rounded-full inline-block transition-all duration-300 shadow-md hover:shadow-lg">
                        Cancelar</Link>
                        <Link href={href} 
                        className="bg-purple-600 hover:bg-purple-900 active:bg-purple-800 text-white font-semibold py-2.5 px-5 rounded-full inline-block transition-all duration-300 shadow-md hover:shadow-lg">
                        Aceptar</Link>
                    </div>
                </div>
            </main>
        </div>
    )

};