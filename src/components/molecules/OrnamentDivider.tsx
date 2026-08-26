import Image from "next/image";
import { cn } from "@/lib/utils";

export interface OrnamentDividerProps {
  className?: string;
  /** false â†’ versi minimalis garis + wajik (untuk footer). */
  withLeaves?: boolean;
}

/** Molecule: pembatas section â€” flourish botanical (mawar + sulur sage + garis emas). */
export function OrnamentDivider({ className, withLeaves = true }: OrnamentDividerProps) {
  if (!withLeaves) {
    return (
      <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
        <span className="h-px w-16 bg-gold/50 sm:w-24" />
        <span className="size-1.5 rotate-45 bg-gold" />
        <span className="h-px w-16 bg-gold/50 sm:w-24" />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", className)} aria-hidden="true">
      <Image
        src="/images/ornaments/flourish.svg"
        alt=""
        width={260}
        height={28}
        unoptimized
        className="h-6 w-auto sm:h-7"
      />
    </div>
  );
}

