import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_CLASS: Record<HeadingLevel, string> = {
  1: "font-display text-4xl leading-tight sm:text-5xl",
  2: "font-display text-3xl leading-tight sm:text-4xl",
  3: "font-display text-2xl leading-snug sm:text-3xl",
  4: "font-display text-xl leading-snug",
  5: "font-display text-lg leading-snug",
  6: "font-display text-base leading-snug",
};

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  level?: HeadingLevel;
  children: ReactNode;
}

/** Atom: Heading — serif klasik Playfair Display (PRD §5.1). */
export function Heading({ level = 2, className, children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag className={cn(HEADING_CLASS[level], className)} {...rest}>
      {children}
    </Tag>
  );
}

export interface SubtitleProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/** Atom: Subtitle — pelengkap heading, ukuran kecil ber-tracking lebar. */
export function Subtitle({ className, children, ...rest }: SubtitleProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.25em] text-gold",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

export interface BodyTextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  muted?: boolean;
}

/** Atom: BodyText — teks paragraf sans-serif modern (Inter). */
export function BodyText({ muted = false, className, children, ...rest }: BodyTextProps) {
  return (
    <p className={cn("text-sm leading-relaxed sm:text-base", muted && "text-muted", className)} {...rest}>
      {children}
    </p>
  );
}
