"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/atoms/Icon";

const STORAGE_KEY = "theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

/** Molecule: pengalih Light/Dark elegan (fitur opsional PRD §3.7). */
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // abaikan bila storage tidak tersedia
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="flex size-10 items-center justify-center rounded-full border border-line bg-surface/80 text-muted backdrop-blur transition-colors duration-200 hover:border-gold hover:text-gold"
    >
      <Icon name={isDark ? "sun" : "moon"} className="size-4" />
    </button>
  );
}
