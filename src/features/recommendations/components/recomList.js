'use client';
import { useFetchRecommendations } from "../hooks/useFetchRecommendations";
import LoadingMessage from "@/components/loadingmessage";

export default function RecomList({evaluationId, subdomain}) {
    const { recommendations, loading, error } = useFetchRecommendations({evaluationId, subdomain});

    if (loading) return <LoadingMessage mensaje="Cargando recomendaciones"/>;
    if (!recommendations || Object.keys(recommendations).length === 0) return <p className="text-zinc-400 text-center">No hay recomendaciones disponibles.</p>;
    if (error) return <p className="text-red-400 text-center">Error: {error}</p>;
    
    return(
        <div className="max-w-4xl p-4 bg-zinc-900/70 backdrop-blur-sm rounded-2xl shadow-lg border border-zinc-700">
            <h2 className="text-xl text-center font-bold text-zinc-100 mb-4">{subdomain}</h2>
            <ul className="space-y-4">
                {recommendations.map((rec) => (
                    <li
                        key={rec.id}
                        className="bg-zinc-800 p-2 rounded-lg border border-zinc-700 text-zinc-100 hover:bg-zinc-700 transition"
                    >
                        {rec.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}