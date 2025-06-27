import { useState } from "react";

export function useSaveEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveEvaluation = async ({ evaluationId, subdomain, responses, level, prog }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/post-evaluation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          evaluationId,
          subdomain,
          responses,
          level,
          prog
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al guardar la evaluación");
      }

      return data;
    } catch (err) {
      setError(err.message);
      console.error("❌ Error al guardar evaluación:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    saveEvaluation,
    loading,
    error
  };
}
