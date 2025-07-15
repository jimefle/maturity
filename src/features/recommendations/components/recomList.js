import { useFetchRecommendations } from "../hooks/useFetchRecommendations";
import LoadingMessage from "@/components/loadingmessage";

export default function RecomList({evaluationId}) {
    const { results, eloading } = useFetchEvaluation(evaluationId);
    const { recommendations, loading, error } = useFetchRecommendations(ids);

    if (loading) return <LoadingMessage mensaje="Cargando recomendaciones"/>;
    if (!recommendations || Object.keys(recommendations).length === 0) return <p className="text-zinc-400 text-center">No hay recomendaciones disponibles.</p>;
    if (error) return <p className="text-red-400 text-center">Error: {error}</p>;

    return(
        <h1>Hola</h1>
    )
}