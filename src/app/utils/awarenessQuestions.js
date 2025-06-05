export const awarenessQuestions = [
{
    id: 1,
    text: "¿En su empresa se informa sobre buenas prácticas de seguridad digital?",
    example: "Ej: contraseñas seguras, escritorio limpio, reportar incidentes.",
    options: [
      { text: "No se realizan actividades de este tipo", value: 0 },
      { text: "Sí, de manera informal", value: 1 },
      { text: "Sí, con materiales o recursos específicos", value: 2 },
      { text: "Sí, como parte de una política formal y se evalúa", value: 3 }
    ]
  },
  {
    id: 2,
    text: "¿Se capacita sobre amenazas como phishing, malware o ingeniería social?",
    options: [
      { text: "No se capacita sobre esto", value: 0 },
      { text: "Sí, de manera informal o esporádica", value: 1 },
      { text: "Sí, con materiales preparados o acciones regulares", value: 2 },
      { text: "Sí, como parte de una política formal y se evalúa su efectividad", value: 3 }
    ]
  },
  {
    id: 3,
    text: "¿Tienen un plan o cronograma para actividades de concientización?",
    options: [
      { text: "No, se hacen actividades sueltas sin planificación", value: 0 },
      { text: "Sí, pero no está escrito ni estructurado", value: 1 },
      { text: "Sí, hay un plan escrito con fechas y responsables", value: 2 },
      { text: "Sí, y además se revisa y evalúa regularmente", value: 3 }
    ]
  },
  {
    id: 4,
    text: "¿Las capacitaciones se adaptan a distintos roles dentro de la empresa?",
    options: [
      { text: "No, todos reciben la misma información (o no se capacita)", value: 0 },
      { text: "Sí, se adapta de forma general, sin documentación", value: 1 },
      { text: "Sí, con materiales o sesiones específicas según el rol", value: 2 },
      { text: "Sí, y forma parte de una política que se evalúa", value: 3 }
    ]
  }
]