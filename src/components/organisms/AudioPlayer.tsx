"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/atoms/Icon";
import { wedding } from "@/config/wedding";
import { useUIStore } from "@/store/useUIStore";
import { toast } from "@/store/useToastStore";

/**
 * Organism: AudioPlayer — kontrol BGM global yang persisten antar-section (PRD §3.7).
 * Bereaksi terhadap `isAudioPlaying` dari Zustand tanpa memicu re-render lain.
 */
export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAudioPlaying = useUIStore((s) => s.isAudioPlaying);
  const setAudioPlaying = useUIStore((s) => s.setAudioPlaying);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {
        // Autoplay bisa diblokir browser — turunkan status dengan anggun.
        setAudioPlaying(false);
        toast.info("Ketuk ikon musik untuk memutar lagu");
      });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying, setAudioPlaying]);

  return (
    <div className="fixed bottom-24 right-4 z-40 sm:bottom-26">
      <audio ref={audioRef} src={wedding.audio.src} loop preload="none" />
      <button
        type="button"
        onClick={() => useUIStore.getState().toggleAudio()}
        aria-label={isAudioPlaying ? "Jeda musik latar" : "Putar musik latar"}
        aria-pressed={isAudioPlaying}
        className="relative flex size-11 items-center justify-center rounded-full border border-gold/60 bg-surface/90 text-gold shadow-lg shadow-black/5 backdrop-blur transition-colors hover:bg-surface"
      >
        {isAudioPlaying && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-dashed border-gold/50 [animation:spin_6s_linear_infinite]"
          />
        )}
        <Icon name={isAudioPlaying ? "pause" : "music"} className="size-4" />
      </button>
    </div>
  );
}
