"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { NAV_ITEMS } from "@/config/wedding";
import { cn } from "@/lib/utils";

/**
 * Organism: BottomNav — navigasi sticky dengan scrollspy:
 * item aktif mengikuti section yang sedang terlihat.
 */
export function BottomNav() {
  const [active, setActive] = useState<string>("beranda");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Navigasi undangan"
      className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2"
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/90 px-2 py-1.5 shadow-lg shadow-black/5 backdrop-blur">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors duration-200 sm:px-3",
                  isActive
                    ? "bg-surface-2 text-blue"
                    : "text-muted hover:text-gold"
                )}
              >
                <Icon name={item.icon as IconName} className="size-4" />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
