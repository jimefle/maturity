import { calculateSubdomainLevel, calculateDomainLevel } from './calculateMaturity.js';
// para probar > node src/features/evaluation/testCalculateMaturity.js

const controlDeAccesosQuestions = [
  {
    id: "q1",
    type: "progresion",
    text: "...",
    options: [{ label: "No", value: "0", next: "q3" }, { label: "Sí", value: "1", next: "q2" }]
  },
  {
    id: "q2",
    type: "capacidad",
    text: "...",
    options: [
      { label: "No", value: "1", next: "q3" },
      { label: "Sí con registro", value: "2", next: "q3" },
      { label: "Sí con política", value: "3", next: "q3" }
    ]
  },
  {
    id: "q3",
    type: "progresion",
    text: "...",
    options: [{ label: "No", value: "0" }, { label: "Sí", value: "1", next: "q4" }]
  },
  {
    id: "q4",
    type: "capacidad",
    text: "...",
    options: [
      { label: "Sin estándares", value: "1" },
      { label: "Con mínimos", value: "2" },
      { label: "Con política", value: "3" }
    ]
  },
  {
    id: "q5",
    type: "progresion",
    text: "...",
    options: [{ label: "No", value: "0", next: "q3" }, { label: "Sí", value: "1", next: "q2" }]
  },
  {
    id: "q6",
    type: "capacidad",
    text: "...",
    options: [
      { label: "Sin estándares", value: "1" },
      { label: "Con mínimos", value: "2" },
      { label: "Con política", value: "3" }
    ]
  }
];

const sampleResponses = {
  q1: '1', // prog
  q2: '3', // cap
  q3: '0', // prog
  q4: '2' // cap
};

// ✅ Test de cálculo por subdominio 
const result = calculateSubdomainLevel(sampleResponses, controlDeAccesosQuestions);
console.log("Resultado por subdominio:", result); 

// ✅ Test de cálculo por dominio
const allResults = {
  'Control de accesos': { level: 'Nivel 2', prog: 60 },
  'Protección de datos': { level: 'Nivel 3', prog: 90 },
  'Concientización': { level: 'Nivel 1', prog: 30 }
};

const domainResult = calculateDomainLevel(allResults);
console.log("Resultado por dominio:", domainResult);
