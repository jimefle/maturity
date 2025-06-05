'use client';

import { useEffect, useState } from 'react';

export default function Questionnaire({questions, subdomain, evaluationId}) {
  const [responses, setResponses] = useState({}); 
  const [result, setResult] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] =useState(questions[0].id); 

  const currentQuestion = questions.find(q => q.id === currentQuestionId);
  
  const handleChange = (value) => {
     setResponses((prev)=> ({
      ...prev, // respuestas anteriores
      [currentQuestionId]:value
     }))
    if (currentQuestion.next===null) {
      calculateLevel({...responses, [currentQuestionId]:value})
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
    

    setResult(level);

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
  };

  const preguntaActual = questions.find(q => q.id === currentQuestionId);

  if (!preguntaActual) return <p>Cargando pregunta...</p>;
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subdominio: {subdomain}</h1>
      
      <div key={preguntaActual.id} className="mb-6 border p-4 rounded">
        <p className="font-medium mb-1">{preguntaActual.text}</p>
        <p className="text-sm text-gray-600 italic mb-3">{preguntaActual.example}</p>
        <div className="space-y-1">
          {preguntaActual.options.map((opt, index) => (
            <label key={index} className="block">
              <input
                type="radio"
                name={`pregunta-${preguntaActual.id}`}
                value={opt.value}
                onChange={() => handleChange(opt.value)}
                className="mr-2"
              />
              {opt.text}
            </label>
          ))}
          <button
            disabled={!responses[currentQuestionId]}
            onClick={() => {
            if (currentQuestion.next) {
              setCurrentQuestionId(currentQuestion.next);
            } 
            }}
          >
          {result ? 'Finalizar' : 'Siguiente'}
        </button>
        </div>
      </div>

      {result && (
        <p className="mt-4 text-lg font-semibold">
          Resultado final para este subdominio: {result}
        </p>
      )}
    </div>
  );
}
