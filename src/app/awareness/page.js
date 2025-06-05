'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../components/questionnaire";
import { awarenessQuestions } from '../utils/awarenessQuestions'

export default function AwarenessPafe(){
    const [evaluationId, setEvaluationId] = useState('');

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        evaluationId && (
            <Questionnaire questions={awarenessQuestions} subdomain={"Concientización y capacitación"} evaluationId={evaluationId}/>
        )
    )
}