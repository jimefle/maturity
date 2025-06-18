'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../../components/questionnaire";
import Header from "../../components/header";

export default function Evaluation(){
    const [evaluationId, setEvaluationId] = useState('');
    const [currentSubId, setSubId] = useState(0);
    const subdomains = ['Control de accesos', 'Concientización y capacitación', 'Protección de datos'];
    const currentSubdomain = subdomains[currentSubId];

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        <main className="min-h-screen flex flex-col">
            <Header volver={true}/>
            <div className="flex-1 flex justify-center items-center">
            {evaluationId && currentSubId < subdomains.length ? (
                <Questionnaire
                    subdomain={currentSubdomain}
                    evaluationId={evaluationId}
                    onFinishSubdomain={() => setSubId((prev) => prev + 1)}
                />
                ) : (
                <p className="text-center">🎉 Evaluación completa</p>
                )}

            </div>
        </main>
    )
}