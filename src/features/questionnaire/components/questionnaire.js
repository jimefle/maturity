'use client';

import { useEffect, useState } from 'react';
import { calculateSubdomainLevel } from '@/features/questionnaire/utils/calculateSubdomainLevel';
import { useFetchQuestions } from '@/features/questionnaire/hooks/useFetchQuestions';
import { useSaveEvaluation } from '@/features/questionnaire/hooks/useSaveEvaluation';
import LoadingMessage from '@/components/loadingmessage';
import ContentMotion from '@/components/motion/contentMotion';

export default function Questionnaire({ subdomain, evaluationId, onFinishSubdomain }) {
  const { questions, fLoading, fError } = useFetchQuestions(subdomain);
  const { saveEvaluation, sLoading, sError} = useSaveEvaluation();

  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestionId(questions[0].id);
    }
  }, [questions]);

  const currentQuestion = questions.find(q => q.id === currentQuestionId);

  const handleChange = (value) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestionId]: {
        value, 
        recommndationsIds: currentQuestion.options.find(opt => opt.value === value)?.recommndationsIds || []
      }
    }));
  };

  const handleNext = async () => {
    const nextId = currentQuestion.options.find(opt => opt.value === responses[currentQuestionId])?.next;
    if (nextId) {
      setCurrentQuestionId(nextId);
    } else {
      const { level, prog } = await calculateSubdomainLevel(
        { ...responses, [currentQuestionId]: responses[currentQuestionId] },
        questions
      );
      await saveEvaluation({ evaluationId, subdomain, responses, level, prog });
      if (typeof onFinishSubdomain === 'function') {
        onFinishSubdomain();
      }
    }
  };

  if (fLoading) return <LoadingMessage mensaje="preguntas"/>;
  if (fError) return <p className="text-red-400 text-center">Error: {error}</p>;
  if (!currentQuestion) return <LoadingMessage mensaje="pregunta"/>;

  return (
    <div className="max-h-screen flex items-center justify-center p-5">
      <ContentMotion>
      <main className="bg-black/20 backdrop-blur-md border border-zinc-700  shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2 text-center">Evaluación de Madurez</h1>
        <h2 className="text-xl text-purple-400 mb-6 text-center">{subdomain}</h2>

        <div key={currentQuestion.id} className="text-start">
          <h4 className="font-medium text-zinc-200 mb-2">{currentQuestion.text}</h4>
          <h5 className="text-zinc-400 italic mb-4">{currentQuestion.example}</h5>

          <div className="space-y-3">
            {currentQuestion.options.map((opt, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer hover:text-purple-400 transition">
                <input
                  type="radio"
                  name={`pregunta-${currentQuestion.id}`}
                  value={opt.value}
                  checked={responses[currentQuestion.id] === opt.value}
                  onChange={() => handleChange(opt.value)}
                  className="accent-purple-600 w-4 h-4"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              disabled={responses[currentQuestion.id] === undefined || sLoading}
              onClick={handleNext}
              className={`py-2.5 px-6 rounded-full font-semibold shadow-md transition-all duration-300 ${
                responses[currentQuestion.id] === undefined || sLoading
                  ? 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-900 active:bg-purple-800 text-white font-semibold hover:shadow-lg cursor-pointer'
              }`}
            >
              {sLoading? "Guardando..." : "Siguiente"}
            </button>
          </div>
          {sError && <p className="text-red-500 mt-3">❌ {sError}</p>}
        </div>
      </main>
      </ContentMotion>
    </div>
  );
}
