'use client';

export async function calculateLevel (allResponses, questions) {
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

    return {level, prog}; 
  };