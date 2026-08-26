"use client";

import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

export interface CountdownBlockProps {
  targetIso: string;
  /** Detik tersisa hasil perhitungan SSR (akurasi awal, PRD §3.3). */
  initialSeconds: number;
  className?: string;
}

const CELLS: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
];

function Cell({ value, label, index }: { value: number; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -85, y: 24 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 600 }}
      className="will-change-transform"
    >
      <div className="flex min-w-16 flex-col items-center gap-1 rounded-lg border border-line bg-surface px-3 py-3 shadow-sm sm:min-w-20 sm:px-4">
        <span className="tabular font-display text-2xl font-semibold sm:text-3xl">
          {String(value).padStart(2, "0")}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{label}</span>
      </div>
    </motion.div>
  );
}

/** Molecule: Angka + label Hari/Jam/Menit/Detik — masuk dengan animasi flip 3D. */
export function CountdownBlock({ targetIso, initialSeconds, className }: CountdownBlockProps) {
  const { days, hours, minutes, seconds, isElapsed } = useCountdown(targetIso, initialSeconds);

  if (isElapsed) {
    return (
      <p className={cn("font-display text-lg italic text-gold", className)}>
        Acara telah berlangsung — terima kasih atas doa restu Anda.
      </p>
    );
  }

  const values = { days, hours, minutes, seconds };

  return (
    <div className={cn("flex items-stretch justify-center gap-2 sm:gap-3", className)}>
      {CELLS.map((cell, i) => (
        <Cell key={cell.key} index={i} label={cell.label} value={values[cell.key]} />
      ))}
    </div>
  );
}
