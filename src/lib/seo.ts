import type { Metadata } from "next";
import { wedding } from "@/config/wedding";

/** Metadata dinamis per-tamu (pola PRD §4.1) — dipakai root & route [guest]. */
export function buildGuestMetadata(guestName: string): Metadata {
  return {
    title: `Undangan Pernikahan ${wedding.couple.bride.shortName} & ${wedding.couple.groom.shortName} — Spesial untuk ${guestName}`,
    description: `Kepada Yth. ${guestName}, kami mengundang Anda pada acara pernikahan kami. ${wedding.events.resepsi.dayLabel}, ${wedding.events.resepsi.dateLabel}.`,
    openGraph: {
      title: `${wedding.couple.bride.shortName} & ${wedding.couple.groom.shortName} Wedding`,
      description: `Kepada Yth. ${guestName}, kami menanti kehadiran Anda.`,
      images: [
        {
          url: `/api/og?guest=${encodeURIComponent(guestName)}`,
          width: 1200,
          height: 630,
          alt: wedding.site.name,
        },
      ],
    },
  };
}

/** Structured data schema.org Event untuk rich result Google. */
export function buildEventJsonLd(): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Pernikahan ${wedding.couple.bride.fullName} & ${wedding.couple.groom.fullName}`,
    startDate: wedding.countdownTargetIso,
    endDate: `${wedding.events.resepsi.dateIso}T${wedding.events.resepsi.timeEnd.replace(".", ":")}:00+07:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: wedding.events.resepsi.venue,
      address: wedding.events.resepsi.address,
    },
    image: [`${wedding.site.url}/api/og`],
    description: wedding.couple.openingMessage,
    organizer: [
      { "@type": "Person", name: wedding.couple.bride.fullName },
      { "@type": "Person", name: wedding.couple.groom.fullName },
    ],
  };
  return JSON.stringify(jsonLd);
}
