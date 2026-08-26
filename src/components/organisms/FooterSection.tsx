import { OrnamentDivider } from "@/components/molecules/OrnamentDivider";
import { wedding } from "@/config/wedding";

/** Organism: Footer — penutup undangan. */
export function FooterSection() {
  const { bride, groom } = wedding.couple;

  return (
    <footer className="border-t border-line bg-surface-2/60 px-6 pb-32 pt-16 text-center sm:pt-20">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <OrnamentDivider withLeaves={false} />
        <p className="font-script text-5xl text-gold" aria-hidden="true">
          {bride.shortName} &amp; {groom.shortName}
        </p>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          {wedding.events.resepsi.dayLabel}, {wedding.events.resepsi.dateLabel}
        </p>
        <p className="text-sm text-muted">
          Merupakan suatu kebahagiaan bagi kami apabila Anda berkenan hadir dan
          memberikan doa restu.
        </p>
        <p className="text-sm font-medium tracking-wide text-gold">{wedding.site.hashtag}</p>
        <p className="mt-6 text-[11px] text-muted/80">
          Dibuat dengan penuh cinta · Undangan Digital Premium
        </p>
      </div>
    </footer>
  );
}
