import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        const body = await request.json();

        const {evaluationId, subdomain, responses, level , prog} = body; // valido los datos recibidos
        if (!evaluationId ||!subdomain || typeof responses !== 'object' || typeof level !== 'string' || !prog) {
            return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
            status: 400,
        });
        }
        console.log('✅ Evaluación recibida:', { evaluationId, subdomain, responses, level, prog });

        const client = await clientPromise;
        const db = client.db('maturity');
        const collection = await db.collection('evaluations');

        await collection.updateOne(
            { evaluationId },
            {
                $set: {
                [`results.${subdomain}`]: {
                    level,
                    prog,
                    responses,
                },
                updatedAt: new Date(),
                },
                $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
        );

        return new Response(JSON.stringify({ message: 'Guardado con éxito' }), {
            status: 200,
        });

    } catch (error) {
        console.error('❌ Error al procesar evaluación:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
            status: 500,
        });
  }
}