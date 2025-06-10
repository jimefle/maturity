'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Questionnaire({subdomain, evaluationId}) {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] =useState(null); 
  const router = useRouter();

  useEffect(()=>{
    const getQuestions = async ()=>{
      try {
        const res = await fetch(`/api/questions?subdomain=${encodeURIComponent(subdomain)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error desconocido');
        }

        setQuestions(data);
        setCurrentQuestionId(data[0]?.id || null)
      }
      catch (err) {
        console.error('Error al obtener preguntas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [subdomain]);

  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  
  const handleChange = (value) => {
     setResponses((prev)=> ({
      ...prev, // respuestas anteriores
      [currentQuestionId]:value
     }))
  };
  const handleNext = async() => {
    const nextId = currentQuestion?.next;
    if(nextId){
      setCurrentQuestionId(nextId)
    } else{
      const {level, prog} = await calculateLevel({...responses, [currentQuestionId]:responses[currentQuestionId]});
      router.push(`/?level=${encodeURIComponent(level)}&prog=${prog}`);
    }
  };

  const calculateLevel = async (allResponses) => {
    const idsQuestions = questions.map(p=> p.id); // todas las preguntas
    
    const resp = idsQuestions.map(id => {
    const val = allResponses[id];
    return val !== undefined ? Number(val) : 0; // le asigno nivel 0 si no respondio la pregunta (por tema de grafo)
    });
    console.log(resp)
    // nivel de progresión
    const totalImplemented = resp.filter(val => val !== 0); 
    const prog = (totalImplemented.length/resp.length)*100;

    // nivel de capacidad
    const min = totalImplemented.length>0? Math.min(...totalImplemented) : null; 
    let level = 'Nivel 0';
    if (min === 2) level = 'Nivel 2'; 
    else if (min === 3) level = 'Nivel 3';
    else if (min === 1) level = 'Nivel 1';
    
    // Enviar a la API
    try {
      const res = await fetch('/api/save-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationId,
          subdomain: 'Concientización y capacitación',
          responses: responses,
          level,
          prog
        }),
      });

      const data = await res.json();
      console.log('📬 Respuesta de la API:', data);
    } catch (err) {
      console.error('❌ Error al enviar los datos:', err);
    }
    return {level, prog}; 
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentQuestion) return <p>Cargando pregunta...</p>;
  
  return (
    <div className="max-h-screen mx-auto items-center">
      <main className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold text-zinc-100 mb-2 text-center">Evaluación de madurez</h1>
      <p className="text-zinc-500 mb-6 max-w-2xl mx-auto text-center">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. 
          Ex sapien vitae pellentesque sem placerat in id.
      </p>

      <div key={currentQuestion.id} className="mt-10 mb-10 flex flex-col">
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
          <button
            disabled={responses[currentQuestion.id] === undefined}
            onClick={handleNext}
            className="bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-full transition duration-200 m-2"
          >
          {currentQuestion.next? 'Siguiente' : 'Finalizar'}
        </button>
        
      </div>
      </main>
    </div>
  );
}
