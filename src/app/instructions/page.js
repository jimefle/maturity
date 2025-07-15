import Button from '@/components/button';
import ContentMotion from '@/components/motion/contentMotion';
import TitleMotion from '@/components/motion/titleMotion';

export default function Instructions(){
    const href="/evaluation"

    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_left,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <main className="pt-20 min-h-screen flex flex-col xl:flex-row items-center justify-around px-4 xl:px-16 gap-4 ">
                <TitleMotion>
                    Evaluación<br /> de Madurez en<br />Ciberseguridad
                </TitleMotion>
                <ContentMotion>
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
                </ContentMotion>
            </main>
        </div>
    )

};