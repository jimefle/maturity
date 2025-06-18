import { useEffect, useState } from 'react';

export function useFetchEvaluation(evaluationId) {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvaluation = async () => {
      try {
        const res = await fetch(`/api/get-evaluation?evaluationId=${encodeURIComponent(evaluationId)}`);
        const data = await res.json();
        if (res.ok) {
          setResults(data.results);
        } else {
          console.error("Error al obtener resultados:", data.error);
        }
      } catch (err) {
        console.error("Error de red:", err);
      } finally {
        setLoading(false);
      }
    };

    getEvaluation();
  }, [evaluationId]);
  
  return {results, loading};
}