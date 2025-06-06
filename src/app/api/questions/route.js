import clientPromise from '@/lib/mongodb';

export async function GET(request) {
  const subdomain = request.nextUrl.searchParams.get('subdomain');

  if (!subdomain) {
    return Response.json({ error: 'Falta el subdominio' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('maturity');
    const doc = await db.collection('questions').findOne({ subdomain });

    if (!doc) {
      return Response.json({ error: 'Subdominio no encontrado' }, { status: 404 });
    }

    return Response.json(doc.questions);
  } catch (error) {
    console.error('❌ Error al obtener preguntas:', error);
    return Response.json({ error: 'Error interno' }, { status: 500 });
  }
}
