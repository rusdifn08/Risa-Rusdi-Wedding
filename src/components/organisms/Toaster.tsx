"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/atoms/Icon";
import { useToastStore, type ToastType } from "@/store/useToastStore";

const ICON_BY_TYPE: Record<ToastType, { name: "check" | "x" | "sparkles"; className: string }> = {
  success: { name: "check", className: "text-gold" },
  error: { name: "x", className: "text-red-600 dark:text-red-400" },
  info: { name: "sparkles", className: "text-muted" },
};

/** Organism: Toaster — notifikasi ringan di tengah atas (feedback RSVP/salin). */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed left-1/2 top-4 z-[80] flex w-[min(92vw,380px)] -translate-x-1/2 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => {
          const icon = ICON_BY_TYPE[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-xl shadow-black/10"
              role="status"
            >
              <Icon name={icon.name} className={`mt-0.5 size-4 shrink-0 ${icon.className}`} strokeWidth={2} />
              <p className="flex-1 text-sm leading-snug">{t.message}</p>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Tutup notifikasi"
                className="text-muted transition-colors hover:text-foreground"
              >
                <Icon name="x" className="size-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
