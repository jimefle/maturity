import { findEvaluationById, saveOrUpdateEvaluation } from "../../data/repositories/evaluationRepository";

export async function getById(evaluationId) {
  return await findEvaluationById(evaluationId);
}

export async function upsert({ evaluationId, subdomain, responses, level, prog }) {
  const resultData = { level, prog, responses };
  await saveOrUpdateEvaluation(evaluationId, subdomain, resultData);
}
