"use client";

import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Subtitle } from "@/components/atoms/Typography";
import { AttendanceRadioGroup } from "@/components/molecules/AttendanceRadioGroup";
import { FormInput, FormTextarea } from "@/components/molecules/FormFields";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { GuestBookFeed } from "@/components/organisms/GuestBookFeed";
import { Reveal } from "@/components/motion/Reveal";
import {
  fetchAttendingGuestCount,
  listRsvps,
  submitRsvp,
} from "@/lib/rsvp-service";
import { toast } from "@/store/useToastStore";
import { SUPABASE_ENABLED } from "@/lib/supabase";
import type { AttendanceStatus, RsvpEntry } from "@/types";

const PAGE_SIZE = 5;

const rsvpSchema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter").max(100, "Nama terlalu panjang"),
  attendance: z.enum(["hadir", "berhalangan", "ragu"]),
  guestCount: z.number().int().min(1, "Minimal 1 tamu").max(5, "Maksimal 5 tamu"),
  message: z.string().trim().max(500, "Pesan maksimal 500 karakter"),
});

type RsvpFormValues = z.infer<typeof rsvpSchema>;

/** Organism: RSVP + Buku Tamu (PRD §3.5) — validasi real-time, feedback toast. */
export function RsvpSection() {
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [attendingCount, setAttendingCount] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),
    mode: "onTouched",
    defaultValues: { name: "", attendance: "hadir", guestCount: 1, message: "" },
  });

  const attendance = watch("attendance");

  const loadPage = useCallback(async (pageToLoad: number, append: boolean) => {
    setIsLoading(true);
    try {
      const result = await listRsvps(pageToLoad, PAGE_SIZE);
      setEntries((prev) => (append ? [...prev, ...result.entries] : result.entries));
      setHasMore(result.hasMore);
      setPage(pageToLoad);
    } catch {
      toast.error("Gagal memuat ucapan. Coba muat ulang halaman.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1, false);
    fetchAttendingGuestCount().then(setAttendingCount).catch(() => setAttendingCount(null));
  }, [loadPage]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      const entry = await submitRsvp({
        name: values.name,
        attendance: values.attendance as AttendanceStatus,
        guestCount: values.attendance === "hadir" ? values.guestCount : 1,
        message: values.message,
      });
      setEntries((prev) => [entry, ...prev]);
      toast.success("Terima kasih! Konfirmasi & ucapan Anda telah tercatat.");
      reset({ name: "", attendance: "hadir", guestCount: 1, message: "" });
    } catch {
      toast.error("Maaf, terjadi kesalahan saat mengirim. Silakan coba lagi.");
    }
  });

  return (
    <section
      id="rsvp"
      className="bg-surface-2/60 px-6 py-20 sm:py-24"
      aria-labelledby="rsvp-title"
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="RSVP & Ucapan"
            title={<span id="rsvp-title">Konfirmasi Kehadiran</span>}
            description="Mohon konfirmasi kehadiran Anda dan tinggalkan doa terbaik untuk kedua mempelai."
          />
          <p className="mt-3 text-center text-xs text-muted">
            {SUPABASE_ENABLED
              ? attendingCount !== null
                ? `${attendingCount} konfirmasi hadir telah tercatat`
                : "Tersambung ke buku tamu daring"
              : "Mode pratinjau — pesan tersimpan di perangkat Anda"}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <FormInput
              label="Nama Lengkap"
              placeholder="Nama Anda (bisa disertai keluarga)"
              autoComplete="name"
              error={errors.name}
              {...register("name")}
            />

            <Controller
              control={control}
              name="attendance"
              render={({ field }) => (
                <AttendanceRadioGroup
                  name="attendance"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.attendance}
                />
              )}
            />

            <Controller
              control={control}
              name="guestCount"
              render={({ field }) => (
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="guestCount"
                    className="text-xs font-medium uppercase tracking-widest text-muted"
                  >
                    Jumlah Tamu
                  </label>
                  <select
                    id="guestCount"
                    disabled={attendance !== "hadir"}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value}
                    className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-gold disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} orang
                      </option>
                    ))}
                  </select>
                  {attendance !== "hadir" && (
                    <p className="text-[11px] text-muted">
                      Jumlah tamu hanya berlaku bila Anda hadir.
                    </p>
                  )}
                  {errors.guestCount && (
                    <p role="alert" className="text-xs text-red-600 dark:text-red-400">
                      {errors.guestCount.message}
                    </p>
                  )}
                </div>
              )}
            />

            <FormTextarea
              label="Ucapan & Doa"
              placeholder="Tuliskan doa dan ucapan terbaik Anda…"
              error={errors.message}
              {...register("message")}
            />

            <Button type="submit" size="lg" disabled={isSubmitting} className="mx-auto w-full sm:w-auto">
              {isSubmitting ? "Mengirim…" : "Kirim Konfirmasi"}
              {!isSubmitting && <Icon name="send" className="size-4" />}
            </Button>
          </form>
        </Reveal>

        <Reveal delay={0.15} className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <Subtitle>Ucapan & Doa Tamu</Subtitle>
            <span className="h-px flex-1 bg-line" />
          </div>
          <GuestBookFeed
            entries={entries}
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={() => loadPage(page + 1, true)}
          />
        </Reveal>
      </div>
    </section>
  );
}
