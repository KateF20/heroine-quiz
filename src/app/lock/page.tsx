'use client';
import { useState } from 'react';

export default function LockPage() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ passcode: pass }),
    });
    setLoading(false);
    if (res.ok) {
      window.location.href = '/';
    } else {
      setError('Falsches Passwort.');
    }
  };

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="text-2xl font-semibold">Enter passcode</h1>
      <p className="mt-2 text-sm opacity-70">This site is private.</p>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <div className="relative">
          <input
              type={show ? 'text' : 'password'}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Gemeinsame Erkennungszeichen:"
              required
              className="w-full rounded-lg border px-4 py-3 pr-12"
          />
          <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide passcode' : 'Show passcode'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl leading-none"
          >
            {show ? '🙈' : '👁️'}
          </button>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-40"
        >
          {loading ? 'Checking…' : 'Unlock'}
        </button>
      </form>
    </main>
  );
}
