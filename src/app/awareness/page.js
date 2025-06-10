'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../components/questionnaire";
import Link from 'next/link';

export default function AwarenessPafe(){
    const [evaluationId, setEvaluationId] = useState('');

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        <main className="bf-zinc-100 max-w-2xl mx-auto min-w-screen">
        <header className="flex  p-4 bg-zinc-900 shadow-sm">
            <button className="flex justify-start items-center gap-2 bg-zinc-600 hover:bg-zinc-700 text-gray-100 font-semibold py-2 px-4 rounded-md transition">
            Cerrar sesión
            </button>
        </header>
        <div>
        {evaluationId && (
                    <Questionnaire subdomain="Concientización y capacitación" evaluationId={evaluationId}/>
                )}
        
        <Link href="/" className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full inline-block transition duration-200">
            Volver</Link>
        </div>
        </main>
    )
}