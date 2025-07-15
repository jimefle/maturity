export function calculateDomainLevel(allSubdomainsResults){
  let totalProg = 0;
  let totalSubdomains = 0;
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