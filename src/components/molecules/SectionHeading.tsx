import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading, Subtitle } from "@/components/atoms/Typography";
import { OrnamentDivider } from "@/components/molecules/OrnamentDivider";

export interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

/** Molecule: kepala section yang konsisten (eyebrow + judul + ornamen). */
export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <Subtitle>{eyebrow}</Subtitle>
      <Heading level={2}>{title}</Heading>
      <OrnamentDivider />
      {description && (
        <p className="max-w-md text-sm leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
