"use client";

import { forwardRef, type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { FieldError } from "react-hook-form";

const FIELD_CLASS =
  "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors duration-200 focus:border-gold";

function errorId(name: string) {
  return `${name}-error`;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: FieldError;
}

/** Molecule: Label + Input + pesan error (PRD §5.2). */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, name, error, className, ...rest },
  ref
) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId(name) : undefined}
        className={cn(FIELD_CLASS, error ? "border-red-500" : "border-line")}
        {...rest}
      />
      {error && (
        <p id={errorId(name)} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = "FormInput";

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: FieldError;
}

/** Molecule: Label + Textarea + pesan error. */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  function FormTextarea({ label, name, error, className, rows = 4, ...rest }, ref) {
    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <label htmlFor={name} className="text-xs font-medium uppercase tracking-widest text-muted">
          {label}
        </label>
        <textarea
          ref={ref}
          id={name}
          name={name}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId(name) : undefined}
          className={cn(FIELD_CLASS, "resize-none", error ? "border-red-500" : "border-line")}
          {...rest}
        />
        {error && (
          <p id={errorId(name)} role="alert" className="text-xs text-red-600 dark:text-red-400">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
