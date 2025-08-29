'use client';
import { useEffect, useRef, useState } from 'react';

export default function PhotoUploader({ onPick }: { onPick: (f: File | null) => void }) {
  const [tab, setTab] = useState<'upload' | 'camera'>('upload');
  const [preview, setPreview] = useState<string>();
  const [streaming, setStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera tracks
  const stopStream = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setStreaming(false);
  };

  useEffect(() => {
    // stop camera when leaving camera tab or unmount
    return () => stopStream();
  }, []);

  // Start camera
  const startCamera = async () => {
    try {
      // Prefer front camera on phones
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1440 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      }
    } catch (e) {
      alert('Kamera-Zugriff nicht möglich. Bitte Berechtigung prüfen oder Datei hochladen.');
    }
  };

  // Take photo -> to File -> preview
  const takePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const w = video.videoWidth || 1080;
    const h = video.videoHeight || 1440;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(video, 0, 0, w, h);

    const blob: Blob = await new Promise(res => canvas.toBlob(b => res(b!), 'image/png', 0.95));
    const file = new File([blob], 'selfie.png', { type: 'image/png' });

    onPick(file);
    const url = URL.createObjectURL(blob);
    setPreview(url);
    // keep stream running so user can retake; they can stop with “Kamera stoppen”
  };

  // Upload handler
  const onFile = (f: File | null) => {
    onPick(f);
    setPreview(f ? URL.createObjectURL(f) : undefined);
  };

  return (
    <div className="rounded-xl border p-4">
      {/* Tabs */}
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          className={`rounded-lg border px-3 py-1 ${tab === 'upload' ? 'bg-black text-white' : ''}`}
          onClick={() => { setTab('upload'); stopStream(); }}
        >
          Upload
        </button>
        <button
          type="button"
          className={`rounded-lg border px-3 py-1 ${tab === 'camera' ? 'bg-black text-white' : ''}`}
          onClick={() => setTab('camera')}
        >
          Kamera
        </button>
      </div>

      {/* Upload tab */}
      {tab === 'upload' && (
        <div>
          <input
            type="file"
            accept="image/*"
            capture="user"       // mobile hint for front camera option
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          {preview && <img src={preview} alt="preview" className="mt-3 rounded-lg max-h-80" />}
          <p className="text-xs mt-2 opacity-70">Tipp: front-facing, gutes Licht.</p>
        </div>
      )}

      {/* Camera tab */}
      {tab === 'camera' && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden bg-red">
            <video
              ref={videoRef}
              playsInline
              className="w-full max-h-96 object-contain bg-red"
              muted
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {!streaming ? (
              <button type="button" onClick={startCamera} className="rounded border px-3 py-2">
                Kamera starten
              </button>
            ) : (
              <>
                <button type="button" onClick={takePhoto} className="rounded bg-black text-white px-3 py-2">
                  Foto aufnehmen
                </button>
                <button type="button" onClick={stopStream} className="rounded border px-3 py-2">
                  Kamera stoppen
                </button>
              </>
            )}
          </div>

          {preview && (
            <div>
              <img src={preview} alt="aufgenommenes Foto" className="mt-3 rounded-lg max-h-80" />
              <p className="text-xs mt-2 opacity-70">Wenn du neu aufnehmen willst: Kamera wieder starten.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
