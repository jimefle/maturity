'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../../components/questionnaire";
import Header from "../../components/header";
import { useRouter } from "next/navigation";

export default function Evaluation(){
    const [evaluationId, setEvaluationId] = useState('');
    const [currentSubId, setSubId] = useState(0);
    const subdomains = ['Control de accesos', 'Concientización y capacitación', 'Protección de datos'];
    const router = useRouter()

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        <main className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_#581c87,_#18181b,_#18181b)] overflow-hidden">
            <Header volver={true}/>
            <div className="flex-1 flex justify-center items-center">
                <Questionnaire
                    subdomain={subdomains[currentSubId]}
                    evaluationId={evaluationId}
                    onFinishSubdomain={() => {
                    const next = currentSubId + 1;
                    if (next < subdomains.length) {
                        setSubId(next);
                    } else {
                        router.push(`/results?evaluationId=${evaluationId}`);
                    }
                    }}
                />
            </div>
        </main>
    )
}