import { getQuestionsBySubdomain } from '@/features/question/questionController';

export async function GET(request) {
  console.log("✅ Entró a GET /api/get-questions");
  const subdomain = request.nextUrl.searchParams.get('subdomain');
  return await getQuestionsBySubdomain(subdomain);
}
