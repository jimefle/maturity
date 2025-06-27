'use client';
export async function saveAssessment({ evaluationId, subdomain, responses, level, prog }) {
    // Enviar a la API
    try {
      const res = await fetch('/api/save-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationId,
          subdomain: subdomain ,
          responses: responses,
          level,
          prog
        }),
      });

      const data = await res.json();
      console.log('📬 Respuesta de la API:', data);
      return data;
    } catch (err) {
      console.error('❌ Error al enviar los datos:', err);
      return null;
    }
}