import clientPromise from '@/lib/mongodb';

export async function GET() {
  console.log("HOLAAA!");
  try {
    const client = await clientPromise;
    const db = client.db("maturity");
    const collections = await db.collections();
    const collectionNames = collections.map(c => c.collectionName);

    return Response.json({ success: true, collections: collectionNames });
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

