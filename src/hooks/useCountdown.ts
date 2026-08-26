"use client";

import { useEffect, useRef, useState } from "react";
import { splitSeconds, type CountdownParts } from "@/lib/date";

/**
 * Countdown yang aman terhadap hidrasi:
 * - Render awal (SSR + hidrasi pertama) memakai `initialSeconds` hasil hitung server.
 * - Setelah mount, deadline dihitung ulang dari jam klien agar akurat
 *   meskipun tab di-throttle.
 */
export function useCountdown(
  targetIso: string,
  initialSeconds: number
): CountdownParts & { isElapsed: boolean } {
  const [remaining, setRemaining] = useState(initialSeconds);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    if (deadlineRef.current === null) {
      deadlineRef.current = Date.now() + initialSeconds * 1000;
    }

    const tick = () => {
      const deadline = deadlineRef.current ?? Date.now();
      const target = new Date(targetIso).getTime();
      // Ambil nilai terkecil antara deadline-drift dan target sebenarnya
      const byDeadline = Math.floor((deadline - Date.now()) / 1000);
      const byTarget = Math.floor((target - Date.now()) / 1000);
      setRemaining(Math.max(0, Math.min(byDeadline, byTarget)));
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [targetIso, initialSeconds]);

  return { ...splitSeconds(remaining), isElapsed: remaining <= 0 };
}
