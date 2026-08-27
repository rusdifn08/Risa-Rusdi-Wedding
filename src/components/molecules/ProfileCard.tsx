"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import type { CoupleMember } from "@/types";

export interface ProfileCardProps {
  member: CoupleMember;
  className?: string;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
  rotation: number;
}

const EMOJIS = ["💖", "✨", "🌸", "💕", "🥰", "🤍"];

/** Molecule: Foto (masking arch) + nama lengkap + gelar + orang tua + animasi lucu & interaktif. */
export function ProfileCard({ member, className }: ProfileCardProps) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [likeCount, setLikeCount] = useState(0);

  const spawnHearts = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newHearts: FloatingHeart[] = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clickX + (Math.random() * 40 - 20),
      y: clickY + (Math.random() * 20 - 10),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      rotation: Math.random() * 40 - 20,
    }));

    setHearts((prev) => [...prev.slice(-12), ...newHearts]);
    setLikeCount((prev) => prev + 1);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1200);
  };

  return (
    <div className={cn("group flex flex-col items-center gap-4 text-center", className)}>
      {/* Arch Foto dengan Animasi & Tap Cinta Interaktif */}
      <motion.div
        onClick={spawnHearts}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative h-56 w-44 cursor-pointer select-none overflow-hidden rounded-t-full border-2 border-gold/50 bg-gold/5 p-1.5 shadow-md shadow-gold/10 transition-shadow duration-300 hover:shadow-xl hover:shadow-gold/20 sm:h-64 sm:w-52"
        title="Klik foto untuk kirim cinta 💕"
      >
        <div className="relative h-full w-full overflow-hidden rounded-t-full">
          <Image
            src={member.photo}
            alt={`Foto ${member.fullName}`}
            fill
            sizes="(min-width: 640px) 208px, 176px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Shimmer Overlay on Hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Floating Sparkles Dekoratif Lucu */}
        <motion.span
          animate={{ y: [0, -4, 0], rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-1 top-4 text-sm"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ y: [0, 4, 0], rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="pointer-events-none absolute -left-1 top-12 text-xs"
        >
          🌸
        </motion.span>

        {/* Badge Kirim Cinta */}
        <motion.div
          animate={{ scale: likeCount > 0 ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-gold/30 bg-surface/90 px-2.5 py-0.5 text-[10px] font-medium text-gold backdrop-blur-md shadow-sm flex items-center gap-1"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
          <span>{likeCount > 0 ? `${likeCount} Cinta` : "Kirim Cinta"}</span>
        </motion.div>

        {/* Letupan Hati Melayang (Floating Hearts Explosion) */}
        <AnimatePresence>
          {hearts.map((h) => (
            <motion.span
              key={h.id}
              initial={{ opacity: 1, scale: 0.5, x: h.x - 12, y: h.y - 12, rotate: h.rotation }}
              animate={{
                opacity: 0,
                scale: 1.6,
                y: h.y - 90 - Math.random() * 30,
                x: h.x + (Math.random() * 40 - 20),
                rotate: h.rotation + (Math.random() * 40 - 20),
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="pointer-events-none absolute z-30 text-base"
            >
              {h.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Informasi Nama & Detail */}
      <div className="flex flex-col items-center gap-1.5">
        <h3 className="font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl">
          {member.fullName}
        </h3>
        <p className="max-w-xs text-xs leading-relaxed text-muted">{member.parents}</p>

        {/* Tombol Instagram Lucu & Menarik */}
        {member.instagram && (
          <motion.a
            href={`https://instagram.com/${member.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="group/ig relative mx-auto mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/40 bg-gradient-to-r from-gold/10 via-blush/20 to-gold/10 px-3.5 py-1.5 text-xs font-medium text-gold shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white hover:shadow-md hover:shadow-gold/20"
          >
            {/* Shimmer sweep animation */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/ig:translate-x-full" />

            <motion.span
              animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              className="inline-flex"
            >
              <Icon name="instagram" className="size-3.5 transition-transform duration-300 group-hover/ig:scale-110" />
            </motion.span>
            <span className="tracking-wide">@{member.instagram}</span>
            <span className="text-[10px] opacity-70 group-hover/ig:opacity-100">✨</span>
          </motion.a>
        )}
      </div>
    </div>
  );
}
