'use client';
import Link from 'next/link';
import Header from '../components/header';

export default function Instructions(){
    const titulo="Evaluación de madurez";
    const descrip="Respondé una serie de preguntas clave sobre prácticas de ciberseguridad en tu organización. Esta evaluación te va a permitir conocer tu nivel de madurez y detectar oportunidades de mejora.";
    const instruc="Leé atentamente cada pregunta y seleccioná la opción que mejor refleje la situación actual de tu organización. Las respuestas deben basarse en hechos concretos, no en intenciones futuras. Al finalizar, vas a obtener un perfil de madurez con recomendaciones para avanzar hacia un mayor nivel de seguridad.";
    const href="/awareness"

    return(
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <main className="flex flex-1 items-center justify-center px-4 bg-[url(/img1.jpg)] w-full h-screen bg-cover bg-center bg-no-repeat">
                <div className="bg-zinc-900 rounded-3xl shadow-md p-10 w-full max-w-xl">
                    <h2 className="text-xl font-semibold mb-6 text-center">{titulo}</h2>
                    <div className="mb-6">
                        <p className="text-sm">{descrip}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold mb-1">Instrucciones</h3>
                        <p className="text-sm">{instruc}</p>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <Link href="/" className="border-2 border-purple-800 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full transition duration-400">
                        Cancelar</Link>
                        <Link href={href} className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full transition duration-200">
                        Aceptar</Link>
                    </div>
                </div>
            </main>
        </div>
    )

};