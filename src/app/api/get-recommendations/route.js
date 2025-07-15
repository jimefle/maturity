import { getRecommendationsBySubdomain } from "@/services/evaluationService";

export async function GET(request) {
  console.log("✅ Entró a GET /api/get-recommendations");
  const evaluationId = request.nextUrl.searchParams.get('evaluationId');
  const subdomain = request.nextUrl.searchParams.get('subdomain');
  return await getRecommendationsBySubdomain(evaluationId, subdomain);
}
