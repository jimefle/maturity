"use client";
import { useFetchEvaluation } from "@/lib/logic/useFetchEvaluation";

export default function Summary({ evaluationId }) {
  const { results, loading } = useFetchEvaluation(evaluationId);

  if (loading) return <p>Cargando resumen...</p>;
  if (!results || Object.keys(results).length === 0) return <p>No hay resultados disponibles.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-zinc-900 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Resumen de evaluación</h2>
      <ul className="space-y-2">
        {Object.entries(results).map(([subdomain, data]) => (
          <li key={subdomain} className="border-b pb-2">
            <strong>{subdomain}</strong>:
            <span > {data.level}</span> ({data.prog}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
