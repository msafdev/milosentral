"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Volume2, VolumeX, Upload } from "lucide-react";
import { motion } from "motion/react";

export default function AudioCompanion() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSource, setAudioSource] = useState<string>("/audio.mp3");
  const [isOpen, setIsOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
    }
  }, []);

  const handleTogglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio playback couldn't start automatically:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSource(url);
      setIsOpen(false);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: "easeOut" }}
        className="fixed bottom-4 sm:bottom-5 left-4 sm:left-5 z-40 touch-manipulation"
      >
        {isOpen && (
          <div className="mb-2 p-2.5 bg-[#FCFBF8] border border-black/[0.08] rounded-[3px] shadow-sm text-xs">
            <label className="flex items-center gap-1.5 text-[#57534E] hover:text-[#1C1B19] cursor-pointer font-sans-note text-[11px] touch-manipulation py-1">
              <Upload className="w-3 h-3" />
              <span>change audio</span>
              <input
                type="file"
                accept="audio/*,video/mp4"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        <div className="flex items-center gap-1 text-[#78716C] hover:text-[#1C1B19] transition-colors">
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? "Mute" : "Play sound"}
            className="p-2 sm:p-1.5 cursor-pointer touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#1C1B19]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-60" />
            )}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-[12px] sm:text-[11px] font-serif-note italic opacity-70 hover:opacity-100 cursor-pointer pr-1 py-1 touch-manipulation"
          >
            {isPlaying ? "sound on" : "sound"}
          </button>
        </div>
      </motion.div>
    </>
  );
}
