import { useEffect, useState } from 'react';

export function useFetchRecommendations(idsRecom) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ids || ids.length === 0) {
      setRecommendations([])
      setLoading(false)
      return
    }

    const getRecommendations = async () => {
      try {
        const res = await fetch(`/api/get-recommendations?ids=${encodeURIComponent(idsRecom)}`);
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
  }, [idsRecom]);

  return { recommendations, loading, error };
  
}
