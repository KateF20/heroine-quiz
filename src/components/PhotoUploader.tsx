'use client';
import { useState } from 'react';

export default function PhotoUploader({ onPick }: { onPick: (f: File|null) => void }) {
  const [preview, setPreview] = useState<string>();

  return (
    <div className="border rounded-xl p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0] ?? null;
          onPick(f);
          setPreview(f ? URL.createObjectURL(f) : undefined);
        }}
      />
      {preview && <img src={preview} alt="preview" className="mt-3 rounded-lg max-h-80" />}
      <p className="text-xs mt-2 opacity-70">Tip: front-facing, good light.</p>
    </div>
  );
}
