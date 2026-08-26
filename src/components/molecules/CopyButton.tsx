"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { copyToClipboard } from "@/lib/clipboard";
import { toast } from "@/store/useToastStore";

export interface CopyButtonProps {
  value: string;
  label?: string;
  successMessage?: string;
  variant?: "solid" | "outline" | "ghost" | "link";
}

/** Molecule: Teks/nilai + ikon salin (PRD §5.2) dengan umpan balik visual. */
export function CopyButton({
  value,
  label = "Salin",
  successMessage = "Berhasil disalin",
  variant = "outline",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleClick() {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      toast.success(successMessage);
    } else {
      toast.error("Gagal menyalin, silakan salin manual");
    }
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={handleClick}
      aria-live="polite"
      className="min-w-28"
    >
      <Icon name={copied ? "check" : "copy"} className="size-3.5" />
      {copied ? "Tersalin" : label}
    </Button>
  );
}
