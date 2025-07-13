import { saveEvaluation } from "@/services/evaluationService";

export async function POST(request) {
    console.log("✅ Entró a POST /api/post-evaluation");
    return await saveEvaluation(request);
}