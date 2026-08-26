import { BodyText } from "@/components/atoms/Typography";
import { ProfileCard } from "@/components/molecules/ProfileCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { OrnamentDivider } from "@/components/molecules/OrnamentDivider";
import { DepthReveal } from "@/components/motion/DepthReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { wedding } from "@/config/wedding";

/** Organism: Profil Mempelai — kutipan, kartu 3D tilt, pengantar (PRD §3.2). */
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
          <Reveal delay={0.15} className="hidden sm:block">
            <p className="pt-24 font-script text-5xl text-gold" aria-hidden="true">
              &amp;
            </p>
          </Reveal>
          <DepthReveal delay={0.25} rotateX={12} rotateY={6}>
            <TiltCard maxTilt={9}>
              <ProfileCard member={groom} />
            </TiltCard>
          </DepthReveal>
        </div>

        <Reveal delay={0.1} className="sm:hidden">
          <p className="text-center font-script text-5xl text-gold" aria-hidden="true">
            &amp;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
