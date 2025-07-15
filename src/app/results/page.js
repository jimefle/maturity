'use client';
import Summary from "@/features/results/components/summary";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Results(){
    const searchParams = useSearchParams();
    const evaluationId = searchParams.get('evaluationId');
    const router = useRouter();

    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <main className="pt-16 min-h-screen flex flex-col items-center justify-center px-4 xl:px-16 gap-3">
                <h2 className="text-3xl xl:text-5xl font-bold text-zinc-100 mb-2 text-center">Resultados de Evaluación</h2>
                <Summary evaluationId={evaluationId}/>
                <button className="mt-4 text-purple-400 hover:text-purple-300 transition-colors" 
                onClick={() => router.push(`/recommendations?evaluationId=${evaluationId}`)}>
                    Ver Recomendaciones
                </button>
            </main>
        </div>
    )
}