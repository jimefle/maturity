'use client';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Questionnaire from "../components/questionnaire";
import { accessQuestions } from '../utils/accessQuestions';

export default function AwarenessPafe(){
    const [evaluationId, setEvaluationId] = useState('');

    useEffect(()=>{
        const id = localStorage.getItem('evaluationId') || uuidv4();
        localStorage.setItem('evaluationId',id);
        setEvaluationId(id)
    },[]);

    return (
        evaluationId && (
            <Questionnaire questions={accessQuestions} subdomain={"Control de acceso"} evaluationId={evaluationId}/>
        )
    )
}