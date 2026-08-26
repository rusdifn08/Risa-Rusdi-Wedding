import { ButtonLink } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Divider } from "@/components/atoms/Divider";
import { BodyText, Heading, Subtitle } from "@/components/atoms/Typography";
import { CountdownBlock } from "@/components/molecules/CountdownBlock";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { DepthReveal } from "@/components/motion/DepthReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { wedding } from "@/config/wedding";
import type { EventDetail } from "@/types";

export interface EventDetailsSectionProps {
  /** Detik tersisa menuju acara utama — dihitung di server (PRD §3.3). */
  initialCountdownSeconds: number;
}

function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function EventCard({ event }: { event: EventDetail }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
      <Icon name="calendar" className="size-6 text-gold" />
      <Heading level={4}>{event.title}</Heading>
      <p className="font-display text-lg">
        {event.dayLabel}, {event.dateLabel}
      </p>
      <p className="inline-flex items-center gap-1.5 text-sm text-muted">
        <Icon name="clock" className="size-3.5 text-gold" />
        {event.timeStart} – {event.timeEnd} WIB
      </p>
      <Divider className="w-16" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{event.venue}</p>
        <BodyText muted className="text-xs sm:text-sm">
          {event.address}
        </BodyText>
      </div>
      <ButtonLink
        variant="outline"
        size="sm"
        href={mapsUrl(event.mapsQuery)}
        className="mt-1"
      >
        <Icon name="map-pin" className="size-3.5" />
        Buka di Google Maps
      </ButtonLink>
    </div>
  );
}

/** Organism: Detail Acara — countdown + kartu Akad/Resepsi + dress code (PRD §3.3, §3.7). */
export function EventDetailsSection({ initialCountdownSeconds }: EventDetailsSectionProps) {
  const { akad, resepsi } = wedding.events;
  const { dressCode } = wedding;

  return (
    <section id="acara" className="bg-surface-2/60 px-6 py-20 sm:py-24" aria-labelledby="acara-title">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Save The Date"
            title={<span id="acara-title">Akad &amp; Resepsi</span>}
            description="Dengan hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada rangkaian acara berikut."
          />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col items-center gap-3">
          <Subtitle>Menuju Hari Bahagia</Subtitle>
          <CountdownBlock
            targetIso={wedding.countdownTargetIso}
            initialSeconds={initialCountdownSeconds}
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <DepthReveal delay={0.05} rotateX={12} rotateY={-7}>
            <TiltCard maxTilt={7}>
              <EventCard event={akad} />
            </TiltCard>
          </DepthReveal>
          <DepthReveal delay={0.15} rotateX={12} rotateY={7}>
            <TiltCard maxTilt={7}>
              <EventCard event={resepsi} />
            </TiltCard>
          </DepthReveal>
        </div>

        <DepthReveal delay={0.1} rotateX={9}>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
            <Icon name="shirt" className="size-6 text-gold" />
            <Heading level={5}>{dressCode.title}</Heading>
            <BodyText muted className="max-w-md text-sm">
              {dressCode.description}
            </BodyText>
            <div className="flex items-center gap-3">
              {dressCode.swatches.map((swatch) => (
                <div key={swatch.name} className="flex flex-col items-center gap-1.5">
                  <span
                    className="size-8 rounded-full border border-line"
                    style={{ backgroundColor: swatch.hex }}
                    title={swatch.name}
                  />
                  <span className="text-[10px] uppercase tracking-wider text-muted">
                    {swatch.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DepthReveal>
      </div>
    </section>
  );
}
