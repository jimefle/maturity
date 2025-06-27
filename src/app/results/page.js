'use client';
import Header from "@/components/header";
import Summary from "@/components/summary";
import Button from "@/components/button";
import { useSearchParams } from "next/navigation";

export default function Results(){
    const searchParams = useSearchParams();
    const evaluationId = searchParams.get('evaluationId');
    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <Header />
            <main className="pt-20 min-h-screen flex flex-col items-center justify-center px-4 xl:px-16 gap-4 ">
                <h2 className="text-3xl xl:text-5xl font-bold text-zinc-100 mb-6 text-center">Resultados de Evaluación</h2>
                <Summary evaluationId={evaluationId}/>
                <Summary evaluationId={evaluationId} isSubdomainResult={true}/>
                <Button text="Ir a inicio"/>
            </main>
        </div>
    )
}