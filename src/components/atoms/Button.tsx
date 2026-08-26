"use client";

import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  solid: "bg-blue text-on-blue hover:bg-blue-strong border border-transparent",
  outline:
    "border border-line text-foreground hover:border-blue hover:text-blue bg-transparent",
  ghost: "border border-transparent text-foreground hover:bg-surface-2",
  link: "border border-transparent text-blue underline-offset-4 hover:underline p-0 h-auto",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs tracking-widest",
  md: "h-11 px-6 text-xs tracking-[0.2em]",
  lg: "h-13 px-8 text-sm tracking-[0.2em]",
};

const BASE_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function classes({ variant = "solid", size = "md", className }: CommonProps) {
  const sizeClass = variant === "link" ? "" : SIZE_CLASS[size];
  return cn(BASE_CLASS, VARIANT_CLASS[variant], sizeClass, className);
}

/** Atom: Button — transisi hover tajam (opacity/border), tanpa glow (PRD §5.1). */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, className, type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={classes({ variant, size, className })}
      {...rest}
    />
  );
});

/** Varian anchor untuk tautan eksternal (mis. Google Maps). */
export function ButtonLink({
  variant,
  size,
  className,
  href,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes({ variant, size, className })}
      {...rest}
    />
  );
}
