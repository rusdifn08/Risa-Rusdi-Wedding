import { cn } from "@/lib/utils";

export interface DividerProps {
  className?: string;
}

/** Atom: Divider — garis pemisah minimalis 1px (PRD §5.1). */
export function Divider({ className }: DividerProps) {
  return <hr className={cn("border-t border-line", className)} />;
}
