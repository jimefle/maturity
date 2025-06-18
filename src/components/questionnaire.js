'use client';

import { useEffect, useState } from 'react';
import { calculateLevel } from '@/lib/logic/calculateMaturity';
import { saveAssessment } from '@/lib/logic/save-assessment';
import { useFetchQuestions } from '@/lib/logic/useFetchQuestions';

export default function Questionnaire({subdomain, evaluationId, onFinishSubdomain}) {
  const {questions, loading, error } = useFetchQuestions(subdomain);
  const [currentQuestionId, setCurrentQuestionId] =useState(null); 
  const [responses, setResponses] = useState({});

  useEffect(() => {
  if (questions.length > 0) {
    setCurrentQuestionId(questions[0].id);
  }
}, [questions]);

  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  
  const handleChange = (value) => {
     setResponses((prev)=> ({
      ...prev, // respuestas anteriores
      [currentQuestionId]:value
     }))
  };
  const handleNext = async() => {
    const nextId =currentQuestion.options[responses[currentQuestionId]].next;
    if(nextId){
      setCurrentQuestionId(nextId)
    } else{
      const {level, prog} = await calculateLevel({...responses, [currentQuestionId]:responses[currentQuestionId]}, questions);
      await saveAssessment({ evaluationId, subdomain, responses, level, prog });
      if(typeof onFinishSubdomain == 'function'){
        onFinishSubdomain();
      }
    }
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentQuestion) return <p>Cargando pregunta...</p>;
  
  return (
    <div className="max-h-screen flex items-center justify-center">
      <main className="max-w-4xl w-full p-6 ">
      <h1 className="text-3xl font-bold text-zinc-100 mb-2 text-center">Evaluación de madurez</h1>
      <h2 className="text-xl text-zinc-100 mb-2 text-center"> {subdomain} </h2>

      <div key={currentQuestion.id} className="m-10 text-start">
        <p className="font-medium mb-1">{currentQuestion.text}</p>
        <p className="text-sm text-gray-600 italic mb-3">{currentQuestion.example}</p>
        <div className="space-y-1">
          {currentQuestion.options.map((opt, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name={`pregunta-${currentQuestion.id}`}
                value={opt.value}
                checked={responses[currentQuestion.id] === opt.value}
                onChange={() => handleChange(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
          </div>
          <div className='flex justify-end mt-4'>
            <button
            disabled={responses[currentQuestion.id] === undefined}
            onClick={handleNext}
            className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full transition duration-200 m-2"
            >
              {'Siguiente'} 
            </button>
          </div>
                 
      </div>
      </main>
    </div>
  );
}
