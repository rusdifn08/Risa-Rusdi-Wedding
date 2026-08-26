"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { wedding } from "@/config/wedding";

/**
 * Pita tipografi besar yang bergeser mengikuti scroll (scroll-linked).
 * Sentuhan editorial antara galeri dan RSVP.
 */
export function ScrollMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-24%"]);

  const phrase = `${wedding.couple.bride.shortName} & ${wedding.couple.groom.shortName}`;
  const detail = `${wedding.events.resepsi.dayLabel} · ${wedding.events.resepsi.dateLabel} · ${wedding.site.hashtag}`;
  const line = Array(3).fill(`${phrase}   ◆   ${detail}   ◆   `).join("");

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="marquee-fade overflow-hidden border-y border-line bg-surface-2/50 py-8 sm:py-10"
    >
      <motion.p
        style={{ x }}
        className="whitespace-nowrap font-script text-5xl leading-none text-gold/60 sm:text-6xl"
      >
        {line}
      </motion.p>
    </div>
  );
}
