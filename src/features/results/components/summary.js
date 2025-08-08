'use client';
import ContentMotion from "@/components/motion/contentMotion";
import { useFetchEvaluation } from "@/features/results/hooks/useFetchEvaluation";
import LoadingMessage from "@/components/loadingmessage";
import ResultCard from "./resultCard";
import { calculateDomainLevel } from "../utils/calculateDomainLevel";

export default function Summary({ evaluationId}) {
  const { results, loading } = useFetchEvaluation(evaluationId);
  const domainResult = calculateDomainLevel(results);
  
  if (loading) return <LoadingMessage mensaje="resultados"/>;
  if (!results || Object.keys(results).length === 0) return <p className="text-zinc-400 text-center">No hay resultados disponibles.</p>;

  return (
    <div className="max-w-4xl p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-700">
      <ContentMotion>
        <div className="flex flex-col justify-start mr-6 p-4">
          <p className="text-zinc-400 text-sm mb-1">{"Dominio"}</p>
          <p className="text-lg font-semibold text-zinc-100 mb-4">Proteger</p>

          <p className="text-sm text-zinc-400">Nivel de capacidad</p>
          <p className="text-purple-400 font-bold text-xl">{domainResult.level ?? 'N/A'}</p>

          <p className="text-sm text-zinc-400 mt-4">Progreso</p>
          <p className="text-purple-400 font-bold text-xl">{domainResult.prog != null ? `${domainResult.prog}%` : 'N/A'}</p>

          <p className="text-sm text-zinc-400 mt-4">Subdominio más débil</p>
          <p className="text-purple-100 font-semibold">{domainResult.peorSub ?? 'N/A'}</p>
        </div>
        <ul className="grid grid-rows-2 gap-4">
        {Object.entries(results).map(([subdomain, data]) => (
          <ResultCard key={subdomain} name="Subdominio" subdomain={subdomain} data={data} evaluationId={evaluationId} />
        ))}
        </ul>
      </ContentMotion>
    </div>
  );
}
