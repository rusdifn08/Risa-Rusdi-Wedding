"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export interface DepthRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  /** Sudut masuk dari sumbu X (efek "terbuka dari kedalaman"). */
  rotateX?: number;
  /** Sudut masuk dari sumbu Y (efek "melayang masuk dari samping"). */
  rotateY?: number;
  y?: number;
  z?: number;
}

/**
 * Animasi masuk 3D scroll-linked: elemen "bangkit" dari kedalaman
 * (rotateX/translateZ) menuju posisi normal. Deterministik untuk SSR.
 */
export function DepthReveal({
  children,
  delay = 0,
  rotateX = 10,
  rotateY = 0,
  y = 48,
  z = -80,
  ...rest
}: DepthRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX, rotateY, y, z }}
      whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, z: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1100 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
