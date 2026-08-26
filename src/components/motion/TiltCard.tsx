"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Derajat maksimum kemiringan (rotateX/rotateY). */
  maxTilt?: number;
  scale?: number;
}

/**
 * Kartu 3D yang miring mengikuti kursor (perspektif + spring).
 * Hanya aktif pada perangkat dengan hover presisi (desktop) dan
 * dinonaktifkan otomatis bila pengguna memilih reduced-motion.
 */
export function TiltCard({ children, className, maxTilt = 8, scale = 1.015 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fineHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fineHover && !prefersReducedMotion;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22, mass: 0.6 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22, mass: 0.6 });

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 2 * maxTilt);
    rotateX.set(-py * 2 * maxTilt);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      whileHover={enabled ? { scale } : undefined}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
