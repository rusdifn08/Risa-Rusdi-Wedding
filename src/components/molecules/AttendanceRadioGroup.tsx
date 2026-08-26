"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/atoms/Icon";
import type { AttendanceStatus } from "@/types";
import type { FieldError } from "react-hook-form";

const OPTIONS: { value: AttendanceStatus; label: string; icon: "check" | "x" | "sparkles" }[] = [
  { value: "hadir", label: "Hadir", icon: "check" },
  { value: "berhalangan", label: "Berhalangan", icon: "x" },
  { value: "ragu", label: "Masih Ragu", icon: "sparkles" },
];

export interface AttendanceRadioGroupProps {
  name: string;
  value: AttendanceStatus;
  onChange: (value: AttendanceStatus) => void;
  error?: FieldError;
}

/** Molecule: pemilih status kehadiran berbentuk kartu (radio aksesibel). */
export function AttendanceRadioGroup({ name, value, onChange, error }: AttendanceRadioGroupProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-widest text-muted">
        Konfirmasi Kehadiran
      </span>
      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Konfirmasi kehadiran">
        {OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-colors duration-200",
                selected
                  ? "border-gold bg-surface-2 text-gold"
                  : "border-line text-muted hover:border-gold/50"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <Icon name={option.icon} className="size-4" />
              <span className="text-[11px] font-medium tracking-wide">{option.label}</span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
