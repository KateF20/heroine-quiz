'use client';
import { useMemo, useState } from 'react';
import { QUESTIONS } from '@/lib/questions';
import { Letter, AnswerMap } from '@/types/quiz';
import { scoreQuiz } from '@/lib/scoring';
import { RESULT_BLURBS } from '@/lib/results';
import PhotoUploader from '@/components/PhotoUploader';
import { upload } from '@vercel/blob/client';

export default function QuizPage() {
  // quiz state
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const total = QUESTIONS.length;
  const done = step >= total;
  const progressPct = Math.round((Math.min(step, total) / total) * 100);

  // poster generation state
  const [mode, setMode] = useState<'photo' | 'no-photo' | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [consentAccepted, setConsentAccepted] = useState<boolean>(
    typeof document !== 'undefined' ? document.cookie.includes('photo_consent=1') : false
  );
  const [genImage, setGenImage] = useState<string | null>(null);
  const [loadingGen, setLoadingGen] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  // quiz handlers
  const onPick = (letter: Letter) => {
    const q = QUESTIONS[step];
    setAnswers(prev => ({ ...prev, [q.id]: letter }));
    setStep(step + 1);
  };

  const goBack = () => setStep(Math.max(0, step - 1));
  const restart = () => {
    setAnswers({});
    setStep(0);
    setMode(null);
    setPhotoFile(null);
    setGenImage(null);
    setGenError(null);
    setLoadingGen(false);
  };

  // compute result
  const result = useMemo(() => {
    if (!done) return null;
    if (Object.keys(answers).length !== total) return null;
    return scoreQuiz(answers);
  }, [done, answers, total]);

  // consent cookie
  const acceptConsent = () => {
    document.cookie = 'photo_consent=1; Max-Age=15552000; Path=/'; // ~180 days
    setConsentAccepted(true);
  };

  // generation
  const generateWithPhoto = async () => {
  if (!photoFile) return;

  setLoadingGen(true);
  setGenError(null);
  setGenImage(null);

  try {
    // 1) Upload directly to Blob via our /api/upload handler
    const uploaded = await upload(photoFile.name, photoFile, {
      access: 'public',
      handleUploadUrl: '/api/upload',
      contentType: photoFile.type || 'image/png',
    });
    const blobUrl = uploaded.url;

    // 2) Ask server to generate poster
    const genRes = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answers, blobUrl }),
    });

    const gen = await genRes.json();
    console.log('generateWithPhoto response:', gen); // DEBUG

    if (!genRes.ok) throw new Error(gen?.message || 'Generation failed');

    // IMPORTANT: use imageUrl (not dataUrl)
    setGenImage(gen.imageUrl);
  } catch (err: any) {
    setGenError(err.message || 'Generation failed. Please try again.');
  } finally {
    setLoadingGen(false);
  }
};

const generateNoPhoto = async () => {
  setLoadingGen(true);
  setGenError(null);
  setGenImage(null);

  try {
    const genRes = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answers }), // no blobUrl
    });

    const gen = await genRes.json();
    console.log('generateNoPhoto response:', gen); // DEBUG

    if (!genRes.ok) throw new Error(gen?.message || 'Generation failed');

    // IMPORTANT: use imageUrl (not dataUrl)
    setGenImage(gen.imageUrl);
  } catch (err: any) {
    setGenError(err.message || 'Generation failed. Please try again.');
  } finally {
    setLoadingGen(false);
  }
};


  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Which Musical Heroine Is Sophia?</h1>

      {/* Progress */}
      <div className="mt-4 h-2 w-full rounded bg-neutral-200">
        <div className="h-2 rounded bg-black transition-all" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="mt-1 text-xs opacity-60">{Math.min(step, total)} / {total}</div>

      {done ? (
        <section className="mt-8 space-y-6">
          {result ? (
            <>
              <h2 className="text-2xl font-bold">Your result:</h2>
              <ResultBlock heroine={result.winner} />

              {/* Poster generation panel */}
              <div className="rounded-xl border p-4 space-y-3">
                <h3 className="font-semibold">Create your poster</h3>
                <div className="flex gap-2">
                  <button
                    className={`rounded-lg border px-3 py-2 ${mode === 'photo' ? 'bg-black text-white' : ''}`}
                    onClick={() => setMode('photo')}
                    disabled={loadingGen}
                  >
                    With my photo
                  </button>
                  <button
                    className={`rounded-lg border px-3 py-2 ${mode === 'no-photo' ? 'bg-black text-white' : ''}`}
                    onClick={() => setMode('no-photo')}
                    disabled={loadingGen}
                  >
                    No photo
                  </button>
                </div>

                {mode === 'photo' && (
                  <div className="space-y-3">
                    {!consentAccepted && (
                      <div className="rounded-lg border p-3 text-sm leading-relaxed">
                        <strong>Photo processing notice</strong>
                        <p className="mt-1">
                          Your photo is uploaded temporarily for rendering and is deleted immediately after generation.
                        </p>
                        <button onClick={acceptConsent} className="mt-2 rounded border px-3 py-1">I agree</button>
                      </div>
                    )}
                    <PhotoUploader onPick={setPhotoFile} />
                    <button
                      onClick={generateWithPhoto}
                      disabled={!photoFile || !consentAccepted || loadingGen}
                      className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-40"
                    >
                      {loadingGen ? 'Rendering…' : 'Generate with my photo'}
                    </button>
                  </div>
                )}

                {mode === 'no-photo' && (
                  <div>
                    <button
                      onClick={generateNoPhoto}
                      disabled={loadingGen}
                      className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-40"
                    >
                      {loadingGen ? 'Rendering…' : 'Generate without photo'}
                    </button>
                  </div>
                )}

                {genError && <div className="text-sm text-red-600">{genError}</div>}
              </div>

              {/* --- SINGLE place where the poster renders --- */}
              {genImage && (
                <div className="rounded-2xl border p-4 mt-4">
                  <h4 className="font-semibold mb-2">Your poster</h4>
                  <img src={genImage} alt="Generated poster" className="rounded-lg max-w-full" />
                </div>
              )}

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

              <div className="pt-2">
                <button onClick={restart} className="rounded-xl border px-4 py-2">Take it again</button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Almost there</h2>
              <p className="opacity-70">Looks like one or more answers are missing. Want to restart?</p>
              <button onClick={restart} className="rounded-xl border px-4 py-3">Restart</button>
            </div>
          )}
        </section>
            ) : (
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
            <button onClick={restart} className="text-sm underline opacity-70">
              Restart
            </button>
          </div>
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
