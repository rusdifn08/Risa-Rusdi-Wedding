"use client";

import { Icon } from "@/components/atoms/Icon";
import { Button } from "@/components/atoms/Button";
import { BodyText } from "@/components/atoms/Typography";
import type { RsvpEntry } from "@/types";

export interface GuestBookFeedProps {
  entries: RsvpEntry[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

const ATTENDANCE_BADGE: Record<RsvpEntry["attendance"], { label: string; className: string }> = {
  hadir: { label: "Hadir", className: "border-gold/50 text-gold" },
  berhalangan: { label: "Berhalangan", className: "border-line text-muted" },
  ragu: { label: "Masih Ragu", className: "border-dashed border-gold/50 text-gold/80" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Organism: Buku Tamu — feed pesan tamu dengan pagination (PRD §3.5). */
export function GuestBookFeed({ entries, hasMore, isLoading, onLoadMore }: GuestBookFeedProps) {
  return (
    <div className="flex flex-col gap-4" aria-live="polite">
      {entries.length === 0 && !isLoading && (
        <p className="py-8 text-center text-sm text-muted">
          Belum ada ucapan — jadilah yang pertama mengirim doa.
        </p>
      )}

      {entries.map((entry) => {
        const badge = ATTENDANCE_BADGE[entry.attendance];
        return (
          <article
            key={entry.id}
            className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-4 sm:p-5"
          >
            <header className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-surface-2 font-display text-sm text-gold">
                  {entry.name.charAt(0).toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{entry.name}</span>
                  <span className="text-[11px] text-muted">{formatDate(entry.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {entry.attendance === "hadir" && entry.guestCount > 1 && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted">
                    <Icon name="users" className="size-3" />
                    {entry.guestCount} tamu
                  </span>
                )}
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            </header>
            {entry.message && <BodyText muted className="text-sm">{entry.message}</BodyText>}
          </article>
        );
      })}

      {isLoading && (
        <div className="flex flex-col gap-3" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-line bg-surface-2" />
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
        <Button variant="ghost" size="sm" onClick={onLoadMore} className="mx-auto mt-1">
          Muat Ucapan Lainnya
          <Icon name="chevron-down" className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
