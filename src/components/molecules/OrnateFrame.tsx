import Image from "next/image";
import { cn } from "@/lib/utils";

export interface OrnateFrameProps {
  className?: string;
}

/**
 * Molecule: bingkai lengkung ornamen dua garis emas (gaya kartu vintage)
 * dengan hiasan sudut botanical dan mawar di puncak lengkung.
 */
export function OrnateFrame({ className }: OrnateFrameProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-3 z-[5] sm:inset-5", className)}>
      <div className="absolute inset-0 rounded-t-full rounded-b-3xl border border-gold/70" />
      <div className="absolute inset-2.5 rounded-t-full rounded-b-2xl border border-gold/40" />

      {/* Mawar di puncak lengkung */}
      <Image
        src="/images/ornaments/rose-mark.svg"
        alt=""
        width={40}
        height={40}
        unoptimized
        className="absolute -top-5 left-1/2 -translate-x-1/2"
      />

      {/* Hiasan sudut bawah (botanical) */}
      <Image
        src="/images/ornaments/corner.svg"
        alt=""
        width={72}
        height={72}
        unoptimized
        className="absolute -bottom-1 -left-1 size-14 rotate-[135deg] sm:size-20"
      />
      <Image
        src="/images/ornaments/corner.svg"
        alt=""
        width={72}
        height={72}
        unoptimized
        className="absolute -bottom-1 -right-1 size-14 -rotate-45 sm:size-20"
      />

      {/* Wajik emas */}
      <span className="absolute -top-px left-1/2 size-2 -translate-x-1/2 rotate-45 bg-gold" />
      <span className="absolute -bottom-px left-1/2 size-2 -translate-x-1/2 rotate-45 bg-gold" />
      <span className="absolute left-1/2 top-1/2 hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold/60 sm:block" />
    </div>
  );
}

