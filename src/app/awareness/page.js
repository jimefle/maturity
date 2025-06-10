'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../components/questionnaire";
import Header from "../components/header";

export default function AwarenessPafe(){
    const [evaluationId, setEvaluationId] = useState('');

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        <main className="min-h-screen flex flex-col">
            <Header volver={true}/>
            <div className="flex-1 flex justify-center items-center">
            {evaluationId && (
                        <Questionnaire subdomain="Concientización y capacitación" evaluationId={evaluationId}/>
                    )}
            </div>
        </main>
    )
}