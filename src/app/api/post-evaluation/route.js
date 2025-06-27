import { saveEvaluation } from "@/features/evaluation/evaluationController";

export async function POST(request) {
    console.log("✅ Entró a POST /api/post-evaluation");
    return await saveEvaluation(request);
}