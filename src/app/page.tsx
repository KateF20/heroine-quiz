'use client';
import { useMemo, useState } from 'react';
import { QUESTIONS } from '@/lib/questions';
import { Letter, AnswerMap } from '@/types/quiz';
import { scoreQuiz } from '@/lib/scoring';
import { RESULT_BLURBS } from '@/lib/results';

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0..QUESTIONS.length
  const [answers, setAnswers] = useState<AnswerMap>({});

  const total = QUESTIONS.length;
  const done = step >= total;

  const progressPct = Math.round((Math.min(step, total) / total) * 100);

  const onPick = (letter: Letter) => {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: letter }));
    setStep(step + 1);
  };

  const goBack = () => setStep(Math.max(0, step - 1));
  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const result = useMemo(() => {
    if (!done) return null;
    // ensure all answered
    if (Object.keys(answers).length !== total) return null;
    return scoreQuiz(answers);
  }, [done, answers, total]);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Which Musical Heroine Is Sophia?</h1>

      {/* Progress */}
      <div className="mt-4 h-2 w-full rounded bg-neutral-200">
        <div
          className="h-2 rounded bg-black transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="mt-1 text-xs opacity-60">{Math.min(step, total)} / {total}</div>

      {!done ? (
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-medium">{QUESTIONS[step].title}</h2>
          <div className="grid gap-3">
            {QUESTIONS[step].options.map((o) => (
              <button
                key={o.letter}
                onClick={() => onPick(o.letter)}
                className="rounded-xl border px-4 py-3 text-left hover:bg-neutral-50"
              >
                <span className="mr-2 font-semibold">{o.letter})</span>
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="rounded-lg border px-3 py-2 disabled:opacity-40"
            >
              Back
            </button>
            <button onClick={restart} className="text-sm underline opacity-70">Restart</button>
          </div>
        </section>
      ) : (
        <section className="mt-8">
          {result ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your result:</h2>
              <ResultBlock heroine={result.winner} />

              <details className="mt-2 rounded-lg border p-3 text-sm">
                <summary className="cursor-pointer select-none">See your tally</summary>
                <ul className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                  {Object.entries(result.tally).map(([h, v]) => (
                    <li key={h} className="flex items-center justify-between">
                      <span>{h}</span>
                      <span className="font-mono">{v}</span>
                    </li>
                  ))}
                </ul>
              </details>

              <div className="pt-4">
                <button onClick={restart} className="rounded-xl bg-black px-5 py-3 text-white">
                  Take it again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Almost there</h2>
              <p className="opacity-70">Looks like one or more answers are missing. Want to restart?</p>
              <button onClick={restart} className="rounded-xl border px-4 py-3">Restart</button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function ResultBlock({ heroine }: { heroine: keyof typeof RESULT_BLURBS }) {
  const { title, blurb } = RESULT_BLURBS[heroine];
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-neutral-700">{blurb}</p>
    </div>
  );
}
