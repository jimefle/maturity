'use client';
import { useFetchEvaluation } from "@/features/results/hooks/useFetchEvaluation";
import LoadingMessage from "@/components/loadingmessage";
import {motion} from 'framer-motion';
import { calculateDomainLevel } from "@/features/questionnaire/utils/calculateMaturity";

export default function Summary({ evaluationId, isSubdomainResult=false }) {
  const { results, loading } = useFetchEvaluation(evaluationId);
  const name = isSubdomainResult ? "Subdominio" : "Dominio";
  const domainResult = !isSubdomainResult ? calculateDomainLevel(results) : null;

 
  if (loading) return <LoadingMessage mensaje="resultados"/>;
  if (!results || Object.keys(results).length === 0) return <p className="text-zinc-400 text-center">No hay resultados disponibles.</p>;

  return (
    <div className="max-w-4xl p-6 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-700">
      <motion.div 
        className="justify-items-center"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {isSubdomainResult? (<ul className="grid grid-cols-3 gap-4">
        {Object.entries(results).map(([subdomain, data]) => (
          <li
            key={subdomain}
            className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 shadow hover:shadow-xl transition duration-300"
          >
            <p className="text-zinc-400 text-sm mb-1">{name}</p>
            <p className="text-lg font-semibold text-zinc-100 mb-2">{subdomain}</p>
            
            <p className="text-sm text-zinc-400">Nivel de capacidad</p>
            <p className="text-purple-400 font-bold">{data.level ?? 'N/A'}</p>
            
            <p className="text-sm text-zinc-400 mt-2">Progreso</p>
            <p className="text-purple-400 font-bold">{data.prog != null ? `${data.prog}%`:'N/A'}</p>
          </li>
        ))}
        </ul>) : 
        (<div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 shadow hover:shadow-xl transition duration-300">
            <p className="text-zinc-400 text-sm mb-1">{name}</p>
            <p className="text-lg font-semibold text-zinc-100 mb-4">Proteger</p>

            <p className="text-sm text-zinc-400">Nivel de capacidad</p>
            <p className="text-purple-400 font-bold text-xl">{domainResult.level ?? 'N/A'}</p>

            <p className="text-sm text-zinc-400 mt-4">Progreso</p>
            <p className="text-purple-400 font-bold text-xl">{domainResult.prog != null ? `${domainResult.prog}%` : 'N/A'}</p>

            <p className="text-sm text-zinc-400 mt-4">Subdominio más débil</p>
            <p className="text-purple-100 font-semibold">{domainResult.peorSub ?? 'N/A'}</p>
          </div>)}
      
      </motion.div>
    </div>
  );
}
