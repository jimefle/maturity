import { useEffect, useState } from 'react';

export function useFetchRecommendations({evaluationId, subdomain}) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!evaluationId || !subdomain) {
      setRecommendations([])
      setLoading(false)
      return
    }

    const getRecommendations = async () => {
      try {
        const res = await fetch(`/api/get-recommendations?evaluationId=${encodeURIComponent(evaluationId)}&subdomain=${encodeURIComponent(subdomain)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error desconocido');
        }

        setRecommendations(data);
      } catch (err) {
        console.error('Error al obtener recomendaciones:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRecommendations();
  }, [evaluationId, subdomain]);

  return { recommendations, loading, error };
  
}
