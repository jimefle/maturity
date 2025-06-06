'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      const finalLevel = await calculateLevel({...responses, [currentQuestionId]:responses[currentQuestionId]})
      router.push(`/?result=${encodeURIComponent(finalLevel)}`);
    }
  };

  const calculateLevel = async (allResponses) => {
    const idsQuestions = questions.map(p=> p.id); // todas las preguntas

    const resp = idsQuestions.map(id => {
    const val = allResponses[id];
    return val !== undefined ? Number(val) : 0; // le asigno nivel 0 si no respondio la pregunta (por tema de grafo)
    });// Object.values(allResponses);
    const total = resp.reduce((acc, val) => acc + Number(val), 0);
    const average = total / idsQuestions.length;

    let level = 'Nivel 0';
    if (average < 2) level = 'Nivel 1';
    else if (average < 3) level = 'Nivel 2';
    else level = 'Nivel 3';
    
    // Enviar a la API
    try {
      const res = await fetch('/api/save-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationId,
          subdomain: 'Concientización y capacitación',
          responses: responses,
          level
        }),
      });

      const data = await res.json();
      console.log('📬 Respuesta de la API:', data);
    } catch (err) {
      console.error('❌ Error al enviar los datos:', err);
    }
    return level;
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!currentQuestion) return <p>Cargando pregunta...</p>;
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subdominio: {subdomain}</h1>
      
      <div key={currentQuestion.id} className="mb-6 border p-4 rounded">
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
          {currentQuestion.next? 'Siguiente' : 'Finalizar'}
        </button>
        
      </div>
    </div>
  );
}
