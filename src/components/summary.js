'use client';
import { useFetchEvaluation } from "@/lib/logic/useFetchEvaluation";
import LoadingMessage from "./loadingmessage";

export default function Summary({ evaluationId }) {
  const { results, loading } = useFetchEvaluation(evaluationId);

  if (loading) return <LoadingMessage mensaje="resumen"/>;
  if (!results || Object.keys(results).length === 0) return <p className="text-zinc-400 text-center">No hay resultados disponibles.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-700">
      <h2 className="text-2xl font-bold text-zinc-100 mb-6 text-center">Resumen de Evaluación</h2>
      <ul className="grid grid-cols-3 gap-4">
        {Object.entries(results).map(([subdomain, data]) => (
          <li
            key={subdomain}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow hover:shadow-xl transition duration-300"
          >
            <p className="text-zinc-400 text-sm mb-1">Subdominio</p>
            <p className="text-lg font-semibold text-zinc-100 mb-2">{subdomain}</p>
            
            <p className="text-sm text-zinc-400">Nivel de capacidad</p>
            <p className="text-purple-400 font-bold">{data.level}</p>
            
            <p className="text-sm text-zinc-400 mt-2">Progreso</p>
            <p className="text-purple-400 font-bold">{data.prog}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
