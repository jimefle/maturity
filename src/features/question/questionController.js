import { findQuestionsBySubdomain } from "@/data/repositories/questionRepository";

export async function getQuestionsBySubdomain(subdomain) {
    if (!subdomain) {
    return Response.json({ error: 'Falta el subdominio' }, { status: 400 });
  }

  try {
    const doc = await findQuestionsBySubdomain(subdomain);

    if (!doc) {
      return Response.json({ error: 'Subdominio no encontrado' }, { status: 404 });
    }

    return Response.json(doc.questions);
  } catch (error) {
    console.error('❌ Error al obtener preguntas:', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
    
}