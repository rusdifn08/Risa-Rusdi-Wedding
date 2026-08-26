"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

/**
 * Primitif animasi scroll-reveal (fade + slide halus).
 * `initial` dibuat deterministik (tanpa branch server/klien) agar hidrasi
 * selalu cocok — preferensi `prefers-reduced-motion` ditangani terpusat
 * oleh <MotionConfig reducedMotion="user"> di InvitationTemplate.
 */
export function Reveal({ children, delay = 0, y = 24, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
