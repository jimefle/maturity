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

export function calculateDomainLevel(allSubdomainsResults){
  let totalProg = 0;
  let totalSubdomains = 0;
  let numericLevels = [];
  let lowestLevel = Infinity;
  let lowestSubdomainName = null;

  for (const [subdomainName, result] of Object.entries(allSubdomainsResults)) {
    totalProg += result.prog || 0;
    totalSubdomains += 1;

    const match = result.level?.match(/Nivel\s(\d)/); // lo paso a números
    const numericLevel = match ? parseInt(match[1], 10) : 0;

    // detectar el más bajo
    if (numericLevel < lowestLevel) {
      lowestLevel = numericLevel;
      lowestSubdomainName = subdomainName;
    }
  }

  //nivel de progresion
  const avgProg = Math.round(totalProg / totalSubdomains);

  // nivel de capacidad
  const level = `Nivel ${lowestLevel}`;
  
  return { level, prog: avgProg, peorSub:lowestSubdomainName };
}