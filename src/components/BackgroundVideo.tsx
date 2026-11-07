"use client";

interface BackgroundVideoProps {
  src?: string;
}

export default function BackgroundVideo({ src }: BackgroundVideoProps) {
  if (!src) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply"
      />
    </div>
  );
}
