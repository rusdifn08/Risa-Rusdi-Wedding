"use client";

import { motion } from "framer-motion";

/**
 * Partikel ambience cover: kelopak mawar blush yang jatuh bergoyang
 * + bokeh emas lembut. Posisi DETERMINISTIK (tanpa Math.random saat
 * render) agar aman terhadap hidrasi.
 */
const PETALS = [
  { left: "8%", top: "12%", w: 13, h: 20, drift: 90, sway: 26, dur: 11, delay: 0, rot: 20, op: 0.55 },
  { left: "22%", top: "30%", w: 11, h: 17, drift: 110, sway: -22, dur: 13, delay: 1.4, rot: -30, op: 0.45 },
  { left: "37%", top: "8%", w: 14, h: 22, drift: 100, sway: 30, dur: 12, delay: 2.6, rot: 60, op: 0.5 },
  { left: "52%", top: "22%", w: 10, h: 16, drift: 120, sway: -26, dur: 10, delay: 0.8, rot: -45, op: 0.4 },
  { left: "66%", top: "10%", w: 13, h: 20, drift: 95, sway: 24, dur: 14, delay: 3.4, rot: 15, op: 0.5 },
  { left: "80%", top: "28%", w: 11, h: 18, drift: 105, sway: -30, dur: 11.5, delay: 1.9, rot: -20, op: 0.45 },
  { left: "91%", top: "14%", w: 12, h: 19, drift: 115, sway: 22, dur: 12.5, delay: 4.2, rot: 40, op: 0.4 },
  { left: "15%", top: "58%", w: 10, h: 15, drift: 100, sway: -24, dur: 12, delay: 2.2, rot: -60, op: 0.35 },
  { left: "73%", top: "62%", w: 12, h: 18, drift: 95, sway: 28, dur: 13.5, delay: 0.4, rot: 25, op: 0.38 },
];

const BOKEH = [
  { left: "10%", top: "40%", size: 84, dur: 10, delay: 0, opacity: 0.3 },
  { left: "84%", top: "46%", size: 96, dur: 13, delay: 1.2, opacity: 0.28 },
  { left: "46%", top: "70%", size: 72, dur: 11, delay: 2.1, opacity: 0.24 },
  { left: "62%", top: "36%", size: 56, dur: 9.5, delay: 0.7, opacity: 0.22 },
];

export function AmbientBokeh() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BOKEH.map((p, i) => (
        <motion.span
          key={`b-${i}`}
          className="absolute rounded-full bg-gold blur-xl"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -22, 0], opacity: [p.opacity, p.opacity * 0.45, p.opacity] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {PETALS.map((p, i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute bg-blush"
          style={{
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            opacity: p.op,
            borderRadius: "72% 28% 65% 35% / 60% 38% 62% 40%",
          }}
          animate={{
            y: [0, -p.drift / 3, (p.drift * 2) / 3, p.drift],
            x: [0, p.sway, -p.sway / 2, 0],
            rotate: [p.rot, p.rot + 55, p.rot + 110, p.rot + 160],
            opacity: [0, p.op, p.op, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
