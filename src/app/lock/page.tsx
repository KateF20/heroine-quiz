'use client';
import { useState } from 'react';

export default function LockPage() {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Gemeinsame Erkennungszeichen:"
          required
          className="w-full rounded-lg border px-4 py-3"
        />
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
