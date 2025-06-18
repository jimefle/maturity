'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../../components/questionnaire";
import Header from "../../components/header";
import Summary from "@/components/summary";

export default function Evaluation(){
    const [evaluationId, setEvaluationId] = useState('');
    const [showSummary, setShowSummary] = useState(false);
    const [currentSubId, setSubId] = useState(0);
    const subdomains = ['Control de accesos', 'Concientización y capacitación', 'Protección de datos'];

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        <main className="min-h-screen flex flex-col">
            <Header volver={true}/>
            <div className="flex-1 flex justify-center items-center">
            {evaluationId && showSummary ? (
                <Summary evaluationId={evaluationId} />
                ) : (
                <Questionnaire
                    subdomain={subdomains[currentSubId]}
                    evaluationId={evaluationId}
                    onFinishSubdomain={() => {
                    const next = currentSubId + 1;
                    if (next < subdomains.length) {
                        setSubId(next);
                    } else {
                        setShowSummary(true);
                    }
                    }}
                />
                )}

            </div>
        </main>
    )
}