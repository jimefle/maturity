'use client';
import Button from "@/components/button";
import RecomList from "@/features/recommendations/components/recomList";
import { useSearchParams } from "next/navigation";

export default function Recommendations(){
    const searchParams = useSearchParams();
    const evaluationId = searchParams.get('evaluationId');

    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <main className="pt-16 min-h-screen flex flex-col items-center justify-center px-4 xl:px-16 gap-3">
                <h2 className="text-3xl xl:text-5xl font-bold text-zinc-100 mb-2 text-center">Recomendaciones</h2>
                <RecomList evaluationId={evaluationId}/>
                <Button primary={false} text="Volver" href="/results"/>
            </main>
        </div>
    )
}