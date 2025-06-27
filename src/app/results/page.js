'use client';
import Header from "@/components/header";
import Summary from "@/components/summary";
import { useSearchParams } from "next/navigation";

export default function Results(){
    const searchParams = useSearchParams();
    const evaluationId = searchParams.get('evaluationId');
    return(
        <div className='min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_#581c87,_#18181b,_#18181b)] relative overflow-hidden'>
            <Header volver={true}/>
            <main className="pt-20 min-h-screen flex flex-col xl:flex-row items-center justify-around px-4 xl:px-16 gap-4 ">
                <Summary evaluationId={evaluationId}/>
            </main>
        </div>
    )
}