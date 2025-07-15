export async function calculateSubdomainLevel (allResponses, questions) {
  // nivel de progresión
  const progQuestions = questions.filter(q => q.type == "progresion").map(q=> q.id);
  const respProg = progQuestions.map(id => {
    const val = allResponses[id];
    return val !== undefined ? Number(val) : 0; // le asigno nivel 0 si no respondio la pregunta (por tema de grafo)
  });
  const totalImplemented = respProg.filter(val => val !== 0); 
  const prog = parseFloat(((totalImplemented.length/respProg.length)*100).toFixed(2)); 
  
  // nivel de capacidad
  const capQuestions = questions
    .filter(q => q.type == "capacidad" && allResponses[q.id]!== undefined)
    .map(q=> allResponses[q.id]);

  const min = capQuestions.length>0? Math.min(...capQuestions) : 0; 
  let level = 'Nivel 0';
  if (min === 2) level = 'Nivel 2'; 
  else if (min === 3) level = 'Nivel 3';
  else if (min === 1) level = 'Nivel 1';

  return {level, prog}; 
};
