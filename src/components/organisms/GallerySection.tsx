"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/atoms/Icon";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { DepthReveal } from "@/components/motion/DepthReveal";
import { Reveal } from "@/components/motion/Reveal";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";

const RATIO_CLASS: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
};

/** Organism: Galeri — grid masonry + lightbox swipeable (PRD §3.4). */
export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = wedding.gallery;

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setActiveIndex((current) =>
        current === null ? null : (current + delta + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, step]);

  return (
    <section id="galeri" className="px-6 py-20 sm:py-24" aria-labelledby="galeri-title">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Galeri"
            title={<span id="galeri-title">Momen Bahagia</span>}
            description="Sepotong cerita kami, dibingkai untuk Anda."
          />
        </Reveal>

        <div className="columns-2 gap-3 sm:columns-3">
          {items.map((item, index) => (
            <DepthReveal
              key={item.src}
              delay={(index % 3) * 0.08}
              rotateX={7}
              rotateY={index % 2 === 0 ? -7 : 7}
              y={40}
              className="mb-3 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-xl border border-line",
                  RATIO_CLASS[item.ratio]
                )}
                aria-label={`Perbesar ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 640px) 220px, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </button>
            </DepthReveal>
          ))}
        </div>
      </div>

      {/* Lightbox — geser (swipe) untuk navigasi di perangkat sentuh */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={items[activeIndex].alt}
          >
            <motion.div
              key={items[activeIndex].src}
              className="relative mx-6 aspect-[3/4] w-full max-w-md"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[activeIndex].src}
                alt={items[activeIndex].alt}
                fill
                sizes="(min-width: 448px) 448px, 90vw"
                className="rounded-xl object-contain"
              />
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-surface/80 p-2.5 text-foreground backdrop-blur transition-colors hover:text-gold"
            >
              <Icon name="chevron-left" className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-line bg-surface/80 p-2.5 text-foreground backdrop-blur transition-colors hover:text-gold"
            >
              <Icon name="chevron-right" className="size-5" />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Tutup galeri"
              className="absolute right-3 top-3 rounded-full border border-line bg-surface/80 p-2.5 text-foreground backdrop-blur transition-colors hover:text-gold"
            >
              <Icon name="x" className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
