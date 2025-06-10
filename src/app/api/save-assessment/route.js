// acá van los ENDPOINTS

export async function POST(request) {
    try {
        const body = await request.json();

        const {evaluationId, subdomain, responses, level , prog} = body; // valido los datos recibidos
        if (!evaluationId ||!subdomain || !Array.isArray(responses) || typeof level !== 'string' || !prog) {
            return new Response(JSON.stringify({ error: 'Datos inválidos' }), {
        status: 400,
        });
        }
        console.log('✅ Evaluación recibida:', { evaluationId, subdomain, responses, level, prog });

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