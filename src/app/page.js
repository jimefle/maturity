'use client';

import { useEffect, useState } from 'react';
import { awarenessQuestions } from './utils/awarenessQuestions';
import {v4 as uuidv4} from 'uuid';

export default function Home() {
  const [evaluationId, setEvaluationId] = useState('');
  const [responses, setResponses] = useState(Array(awarenessQuestions.length).fill(-1)); // responses va a tener tantas posiciones como preguntas hay, y en cada posicion hay un -1
  const [result, setResult] = useState(null);

  // generar ID de la evaluacion
  useEffect(()=>{
    const newId = uuidv4();
    setEvaluationId(newId)
  },[]);

  const handleChange = (index, value) => {
    const newResponses = [...responses]; // guardo respuestas anteriores
    newResponses[index] = value; // agrego nueva respuesta
    setResponses(newResponses); 
  };

  const calculateLevel = async () => {
  if (responses.includes(-1)) { // si hay algún -1 es porque no se respondieron todas las preguntas
      alert('Por favor responda todas las preguntas.');
      return;
    }

    const total = responses.reduce((acc, val) => acc + val, 0);
    const average = total / responses.length;

    let level = '';
    if (responses.every(val => val === 0)) {
      level = 'No se realizan prácticas de concientización.';
    } else if (average < 2) {
      level = 'Nivel 1: Prácticas básicas e informales.';
    } else if (average < 3) {
      level = 'Nivel 2: Prácticas documentadas y con recursos.';
    } else {
      level = 'Nivel 3: Prácticas formales y evaluadas.';
    }

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
  
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Subdominio de Concientización y Capacitación</h1>
      {awarenessQuestions.map((q, index) => ( // por cada pregunta
        <div key={q.id} className="mb-6 border rounded p-4">
          <p className="font-medium">{q.text}</p>
          {q.example && <p className="text-sm text-gray-600">{q.example}</p>}
          <div className="mt-2 space-y-2">
            {q.options.map((opt, i) => ( // por cada opcion
              <label key={i} className="block">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt.value}
                  checked={responses[index] === opt.value}
                  onChange={() => handleChange(index, opt.value)} // respuesta elegida
                  className="mr-2"
                />
                {opt.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={calculateLevel}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calcular nivel de madurez
      </button>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </main>
  );
}
