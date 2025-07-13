import clientPromise from "@/lib/mongodb";

export async function findEvaluationById(evaluationId) {
    const client = await clientPromise;
    const db = client.db('maturity');
    return await db.collection('evaluations').findOne({ evaluationId });    
}

export async function saveOrUpdateEvaluation(evaluationId,subdomain,resultData) {
    const client = await clientPromise;
        const db = client.db('maturity');
        const collection = await db.collection('evaluations');

        await collection.updateOne(
            { evaluationId },
            {
                $set: {
                [`results.${subdomain}`]: resultData,
                updatedAt: new Date(),
                },
                $setOnInsert: { createdAt: new Date() },
            },
            { upsert: true }
        );    
}

export async function findQuestionsBySubdomain(subdomain) {
    const client = await clientPromise;
    const db = client.db('maturity');
    return await db.collection('questions').findOne({ subdomain });    
}