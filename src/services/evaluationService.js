import { findEvaluationById, saveOrUpdateEvaluation, findQuestionsBySubdomain } from "./evaluationRepository";

export async function getEvaluationById(evaluationId) {
    if (!evaluationId) {
        return Response.json({ error: 'Falta evaluationId' }, { status: 400 });
    }
    console.log("📥 evaluationId recibido:", evaluationId);

    try {
        const doc = await findEvaluationById(evaluationId); 
        if (!doc) {
            return Response.json({ error: 'Evaluación no encontrado' }, { status: 404 });
        }

        return Response.json(doc);
    } catch (error) {
        console.error('❌ Error al obtener evaluación:', error);
        return Response.json({ error: 'Error interno' }, { status: 500 });
    } 
}

export async function saveEvaluation(request) {
    try{
    const body = await request.json();
    const { evaluationId, subdomain, responses, level, prog } = body;

    if (!evaluationId || !subdomain || typeof responses !== "object" || typeof level !== "string" || prog == null) {
      return Response.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.log('✅ Evaluación recibida:', { evaluationId, subdomain, responses, level, prog });

    await upsert({ evaluationId, subdomain, responses, level, prog });

    return Response.json({ message: "Guardado con éxito" }, { status: 200 });
  } catch (err) {
    console.error("❌ Error al guardar evaluación:", err);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function upsert({ evaluationId, subdomain, responses, level, prog }) {
  const resultData = { level, prog, responses };
  await saveOrUpdateEvaluation(evaluationId, subdomain, resultData);
}

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