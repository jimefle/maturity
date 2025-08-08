export async function calculateSubdomainLevel(allResponses, questions) {
  // nivel de progresión
  const progQuestions = questions
    .filter((q) => q.type == "progresion")
    .map((q) => q.id);

    const respProg = progQuestions.map((id) => {
    const resp = allResponses[id];
    const value = resp && resp.value !== undefined ? resp.value : resp;
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  });

  const totalImplemented = respProg.filter(
    (val) => Number.isFinite(val) && val !== 0
  );
  const prog =
    respProg.length > 0
      ? parseFloat(
          ((totalImplemented.length / respProg.length) * 100).toFixed(2)
        )
      : 0;

  // nivel de capacidad
  const capQuestions = questions
    .filter((q) => q.type == "capacidad" && allResponses[q.id] !== undefined)
    .map(q => {
      const resp = allResponses[q.id];
      const raw = resp && resp.value !== undefined ? resp.value : resp;
      const num = Number(raw);
      return Number.isFinite(num) ? num : 0;
    });
    
  const min = capQuestions.length > 0 ? Math.min(...capQuestions) : 0;
  let level = "Nivel 0";
  if (min === 2) level = "Nivel 2";
  else if (min === 3) level = "Nivel 3";
  else if (min === 1) level = "Nivel 1";

  return { level, prog };
}
