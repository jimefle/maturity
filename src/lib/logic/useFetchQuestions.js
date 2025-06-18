import { useEffect, useState } from 'react';

export function useFetchQuestions(subdomain) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(`/api/get-questions?subdomain=${encodeURIComponent(subdomain)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error desconocido');
        }

        setQuestions(data);
      } catch (err) {
        console.error('Error al obtener preguntas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [subdomain]);

  return { questions, loading, error };
}
