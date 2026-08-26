"use client";

import Image from "next/image";
import { type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Subtitle } from "@/components/atoms/Typography";
import { OrnamentDivider } from "@/components/molecules/OrnamentDivider";
import { OrnateFrame } from "@/components/molecules/OrnateFrame";
import { AmbientBokeh } from "@/components/organisms/AmbientBokeh";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { wedding } from "@/config/wedding";
import { useUIStore } from "@/store/useUIStore";

export interface HeroCoverProps {
  guestName: string;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

/**
 * Organism: HeroSection — cover/lock-screen (PRD §3.1) dengan kedalaman 3D:
 * parallax mouse multi-layer, ken-burns halus, bokeh ambient, dan vignette.
 * Tombol "Buka Undangan" memicu transisi penuh + inisiasi BGM via Zustand.
 */
export function HeroCover({ guestName }: HeroCoverProps) {
  const isCoverOpen = useUIStore((s) => s.isCoverOpen);
  const openCover = useUIStore((s) => s.openCover);

  const fineHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const parallaxEnabled = fineHover && !prefersReducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bgX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const bgY = useSpring(rawY, { stiffness: 50, damping: 20 });
  const fgX = useSpring(rawX, { stiffness: 60, damping: 22 });
  const fgY = useSpring(rawY, { stiffness: 60, damping: 22 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!parallaxEnabled) return;
    const px = event.clientX / window.innerWidth - 0.5;
    const py = event.clientY / window.innerHeight - 0.5;
    rawX.set(px * 22);
    rawY.set(py * 16);
  }

  return (
    <AnimatePresence>
      {!isCoverOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-background"
          initial={false}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: "easeInOut" } }}
          onMouseMove={handleMouseMove}
        >
          {/* Latar foto — ken-burns + parallax mouse (layer terdalam) */}
          <motion.div className="absolute -inset-8" style={{ x: bgX, y: bgY }}>
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <Image
                src="/images/hero.jpg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <AmbientBokeh />

          {/* Overlay + vignette untuk keterbacaan */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/90" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 42%, rgba(19,26,31,0.36) 100%)",
            }}
          />

          {/* Bingkai lengkung ornamen emas (gaya kartu vintage) */}
          <OrnateFrame />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ x: fgX, y: fgY }}
            className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center sm:px-16"
          >
            <motion.div variants={item} className="flex flex-col items-center gap-3">
              <Subtitle>The Wedding Of</Subtitle>
              <p className="font-script text-6xl leading-tight text-gold drop-shadow-sm sm:text-7xl">
                {wedding.couple.bride.shortName} &amp; {wedding.couple.groom.shortName}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-muted">
                {wedding.events.resepsi.dayLabel} · {wedding.events.resepsi.dateLabel}
              </p>
            </motion.div>

            <motion.div variants={item}>
              <OrnamentDivider />
            </motion.div>

            <motion.div
              variants={item}
              className="flex flex-col items-center gap-2 rounded-xl border border-line/70 bg-surface/70 px-8 py-5 backdrop-blur-sm"
            >
              <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </span>
              <span className="font-display text-2xl font-semibold">{guestName}</span>
              <span className="text-[11px] italic text-muted">
                Mohon maaf apabila terdapat kesalahan penulisan nama &amp; gelar
              </span>
            </motion.div>

            <motion.div variants={item}>
              <Button size="lg" onClick={openCover} aria-label="Buka undangan">
                <Icon name="mail" className="size-4" />
                Buka Undangan
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
