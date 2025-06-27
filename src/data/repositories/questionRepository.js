import clientPromise from "@/lib/mongodb";

export async function findQuestionsBySubdomain(subdomain) {
    const client = await clientPromise;
    const db = client.db('maturity');
    return await db.collection('questions').findOne({ subdomain });    
}