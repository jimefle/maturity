import { calculateSubdomainLevel } from "./calculateSubdomainLevel.js";
// para probar > node src/features/questionnaire/utils/testCalculateMaturity.js

function TestCalculateMaturity() {
  const responses = {
  q1: { value: "0", recommendationsIds: [] },
  q3: { value: "1", recommendationsIds: [] },
  q4: { value: "2", recommendationsIds: [] },
  q5: { value: "1", recommendationsIds: [] },
  q6: { value: "2", recommendationsIds: [] },
  q7: { value: "0", recommendationsIds: [] },
  q9: { value: "1", recommendationsIds: [] },
  q10: { value: "3", recommendationsIds: [] },
  q11: { value: "0", recommendationsIds: [] },
  q13: { value: "0", recommendationsIds: [] },
};
const questions = [
  {
    id: "q1",
    type: "progresion",
    text: "¿Se crean usuarios o identidades únicas para acceder a los sistemas, aplicaciones o dispositivos de la organización?",
    example: "Identidades para personas, servicios, proveedores, equipos, etc.",
    options: [
      { label: "No", value: "0", next: "q3" },
      { label: "Sí", value: "1", next: "q2" },
    ],
  },
  {
    id: "q2",
    type: "capacidad",
    text: "¿Cómo se gestiona la creación de usuarios o identidades?",
    options: [
      {
        label: "Se crean según necesidad, sin procedimiento ni registro formal",
        value: "1",
        next: "q3",
      },
      {
        label:
          "Existe un procedimiento básico y se registran las identidades creadas",
        value: "2",
        next: "q3",
      },
      {
        label:
          "Existe una política formal con criterios definidos, y se registra cada identidad con su responsable",
        value: "3",
        next: "q3",
      },
    ],
  },
  {
    id: "q3",
    type: "progresion",
    text: "¿Se emiten credenciales únicas para cada usuario o entidad que necesita acceder a los sistemas?",
    example: "Contraseñas, claves de acceso, tokens.",
    options: [
      { label: "No", value: "0", next: "q5" },
      { label: "Sí", value: "1", next: "q4" },
    ],
  },
  {
    id: "q4",
    type: "capacidad",
    text: "¿Cómo se emiten y gestionan las credenciales?",
    options: [
      {
        label: "Se emiten sin requisitos definidos ni registro",
        value: "1",
        next: "q5",
      },
      {
        label: "Se aplican requisitos básicos y se registra la emisión",
        value: "2",
        next: "q5",
      },
      {
        label:
          "Se aplican controles técnicos según política formal y se audita el proceso",
        value: "3",
        next: "q5",
      },
    ],
  },
  {
    id: "q5",
    type: "progresion",
    text: "¿Existen reglas mínimas para el uso de contraseñas en los sistemas de la organización?",
    example:
      "Por ejemplo: longitud mínima, combinación de caracteres, cambio periódico.",
    options: [
      { label: "No", value: "0", next: "q7" },
      { label: "Sí", value: "1", next: "q6" },
    ],
  },
  {
    id: "q6",
    type: "capacidad",
    text: "¿Cómo se gestionan y aplican las políticas de contraseñas?",
    options: [
      {
        label:
          "Se definen algunas reglas básicas, sin aplicación técnica ni seguimiento",
        value: "1",
        next: "q7",
      },
      {
        label:
          "Se documentan y aplican en sistemas clave, y se comunican a los usuarios",
        value: "2",
        next: "q7",
      },
      {
        label:
          "Están definidas en una política formal, se aplican técnicamente y se auditan",
        value: "3",
        next: "q7",
      },
    ],
  },
  {
    id: "q7",
    type: "progresion",
    text: "¿Se revocan los accesos cuando una persona deja la empresa, cambia de rol o una cuenta queda inactiva?",
    options: [
      { label: "No", value: "0", next: "q9" },
      { label: "Sí", value: "1", next: "q8" },
    ],
  },
  {
    id: "q8",
    type: "capacidad",
    text: "¿Cómo se gestiona la revocación de accesos?",
    options: [
      {
        label: "Se hace manualmente, según se solicita, sin documentación",
        value: "1",
        next: "q9",
      },
      {
        label: "Existe un procedimiento documentado con roles definidos",
        value: "2",
        next: "q9",
      },
      {
        label:
          "Se aplica una política formal con control automatizado o auditoría periódica",
        value: "3",
        next: "q9",
      },
    ],
  },
  {
    id: "q9",
    type: "progresion",
    text: "¿Se utiliza autenticación multifactor (MFA) o algún método de autenticación reforzada?",
    example:
      "Contraseña + código SMS, aplicación autenticadora, token físico, etc.",
    options: [
      { label: "No", value: "0", next: "q11" },
      { label: "Sí", value: "1", next: "q10" },
    ],
  },
  {
    id: "q10",
    type: "capacidad",
    text: "¿Cómo se aplica la autenticación reforzada?",
    options: [
      {
        label: "Se aplica en algunos casos, sin criterios definidos",
        value: "1",
        next: "q11",
      },
      {
        label:
          "Se aplica según criterios documentados (roles, sistemas, accesos remotos)",
        value: "2",
        next: "q11",
      },
      {
        label:
          "Está definida en una política formal y se monitorea su cumplimiento",
        value: "3",
        next: "q11",
      },
    ],
  },
  {
    id: "q11",
    type: "progresion",
    text: "¿Se asignan accesos según el rol o función del usuario?",
    example:
      "Principio de mínimo privilegio, separación de funciones críticas.",
    options: [
      { label: "No", value: "0", next: "q13" },
      { label: "Sí", value: "1", next: "q12" },
    ],
  },
  {
    id: "q12",
    type: "capacidad",
    text: "¿Cómo se aplican los principios de mínimo privilegio y separación de funciones?",
    options: [
      {
        label:
          "Se aplican informalmente, sin documentación ni perfiles definidos",
        value: "1",
        next: "q13",
      },
      {
        label: "Se definen perfiles de acceso por función y se documentan",
        value: "2",
        next: "q13",
      },
      {
        label: "Está formalizado en una política y se audita periódicamente",
        value: "3",
        next: "q13",
      },
    ],
  },
  {
    id: "q13",
    type: "progresion",
    text: "¿Se revisan periódicamente los accesos asignados a los usuarios?",
    example: "Por ejemplo, cada 6 o 12 meses.",
    options: [
      { label: "No", value: "0", next: null },
      { label: "Sí", value: "1", next: "q14" },
    ],
  },
  {
    id: "q14",
    type: "capacidad",
    text: "¿Cómo se realizan las revisiones de acceso?",
    options: [
      {
        label: "Se hacen manualmente y sin frecuencia establecida",
        value: "1",
        next: null,
      },
      {
        label:
          "Se realizan según un procedimiento periódico y se registran los resultados",
        value: "2",
        next: null,
      },
      {
        label:
          "Existe una política formal y se usan herramientas para detectar inconsistencias",
        value: "3",
        next: null,
      },
    ],
  },
];

  // ✅ Test de cálculo por subdominio
  const result = calculateSubdomainLevel(responses, questions);
  console.log("Resultado por subdominio:", result);
}

TestCalculateMaturity();

// ✅ Test de cálculo por dominio
// const allResults = {
//   'Control de accesos': { level: 'Nivel 2', prog: 60 },
//   'Protección de datos': { level: 'Nivel 3', prog: 90 },
//   'Concientización': { level: 'Nivel 1', prog: 30 }
// };

// const domainResult = calculateDomainLevel(allResults);
// console.log("Resultado por dominio:", domainResult);
