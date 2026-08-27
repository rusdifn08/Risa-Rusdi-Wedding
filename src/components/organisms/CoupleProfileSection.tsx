"use client";

import { motion } from "framer-motion";
import { BodyText } from "@/components/atoms/Typography";
import { ProfileCard } from "@/components/molecules/ProfileCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { OrnamentDivider } from "@/components/molecules/OrnamentDivider";
import { DepthReveal } from "@/components/motion/DepthReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/atoms/Icon";
import { wedding } from "@/config/wedding";

/** Organism: Profil Mempelai — kutipan, kartu 3D tilt, pengantar, animasi cinta (PRD §3.2). */
export function CoupleProfileSection() {
  const { bride, groom, quote, openingMessage } = wedding.couple;

  return (
    <section id="mempelai" className="px-6 py-20 sm:py-24" aria-labelledby="mempelai-title">
      <div className="mx-auto flex max-w-2xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Mempelai"
            title={
              <span id="mempelai-title" className="font-script text-gold">
                Kami yang Berbahagia
              </span>
            }
          />
        </Reveal>

        <Reveal delay={0.1}>
          <BodyText muted className="text-center">
            {openingMessage}
          </BodyText>
        </Reveal>

        <DepthReveal delay={0.1} rotateX={8}>
          <figure className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
            <blockquote className="font-display text-base italic leading-relaxed text-muted sm:text-lg">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <figcaption className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              — {quote.source}
            </figcaption>
          </figure>
        </DepthReveal>

        <OrnamentDivider />

        <div className="grid items-start gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
          <DepthReveal delay={0.05} rotateX={12} rotateY={-6}>
            <TiltCard maxTilt={9}>
              <ProfileCard member={bride} />
            </TiltCard>
          </DepthReveal>

          {/* Animasi Lucu & Romantis di Tengah (Desktop) */}
          <div className="hidden flex-col items-center justify-center gap-2 pt-20 sm:flex" aria-hidden="true">
            <motion.div
              animate={{ scale: [1, 1.18, 1, 1.12, 1], rotate: [0, -4, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative font-script text-6xl text-gold"
            >
              &amp;
              <motion.span
                animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute -right-2 -top-1 text-xs"
              >
                ✨
              </motion.span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -3, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] text-gold"
            >
              <Icon name="heart" className="size-3 fill-gold" />
              <span>Selamanya</span>
            </motion.div>
          </div>

          <DepthReveal delay={0.25} rotateX={12} rotateY={6}>
            <TiltCard maxTilt={9}>
              <ProfileCard member={groom} />
            </TiltCard>
          </DepthReveal>
        </div>

        {/* Animasi Lucu & Romantis di Tengah (Mobile) */}
        <div className="flex flex-col items-center justify-center gap-1 sm:hidden" aria-hidden="true">
          <motion.p
            animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-center font-script text-5xl text-gold"
          >
            &amp;
          </motion.p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="flex items-center gap-1 text-xs text-gold"
          >
            <Icon name="heart" className="size-3 fill-gold" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
