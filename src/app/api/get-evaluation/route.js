import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const evaluationId = request.nextUrl.searchParams.get('evaluationId');

  if (!evaluationId) {
    return Response.json({ error: 'Falta evaluationId' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('maturity');
    const doc = await db.collection('evaluations').findOne({ evaluationId });

    if (!doc) {
      return Response.json({ error: 'Evaluación no encontrado' }, { status: 404 });
    }

    return Response.json(doc);
  } catch (error) {
    console.error('❌ Error al obtener evaluación:', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}