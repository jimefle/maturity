import { getEvaluationById } from "@/features/evaluation/evaluationController";

export async function GET(request) {
  console.log("✅ Entró a GET /api/get-evaluation");
  const evaluationId = request.nextUrl.searchParams.get('evaluationId');
  return await getEvaluationById(evaluationId);
}
