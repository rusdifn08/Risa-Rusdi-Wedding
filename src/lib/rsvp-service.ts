import type { RsvpEntry } from "@/types";
import { getSupabase, SUPABASE_ENABLED } from "@/lib/supabase";

const LOCAL_STORAGE_KEY = "rsvp-local-entries";
const TABLE = "rsvps";

export interface RsvpInput {
  name: string;
  attendance: RsvpEntry["attendance"];
  guestCount: number;
  message: string;
}

export interface RsvpPage {
  entries: RsvpEntry[];
  hasMore: boolean;
}

/** Data contoh yang tampil saat Supabase belum dikonfigurasi. */
export const SEED_ENTRIES: RsvpEntry[] = [
  {
    id: "seed-1",
    name: "Keluarga Budi Santoso",
    attendance: "hadir",
    guestCount: 4,
    message: "Selamat menempuh hidup baru Risa & Rusdi! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
    createdAt: "2026-08-20T09:15:00+07:00",
  },
  {
    id: "seed-2",
    name: "Sinta & Adit",
    attendance: "hadir",
    guestCount: 2,
    message: "Akhirnya ya kalian! Barakallahu lakuma. Sampai jumpa di hari bahagia.",
    createdAt: "2026-08-21T14:02:00+07:00",
  },
  {
    id: "seed-3",
    name: "Ibu Ratna",
    attendance: "hadir",
    guestCount: 1,
    message: "Turut berbahagia untuk kedua mempelai. Doa terbaik dari kami sekeluarga.",
    createdAt: "2026-08-22T08:47:00+07:00",
  },
  {
    id: "seed-4",
    name: "Panitia Reuni SMA",
    attendance: "ragu",
    guestCount: 1,
    message: "Insya Allah hadir, kami usahakan berangkat rombongan!",
    createdAt: "2026-08-23T19:30:00+07:00",
  },
  {
    id: "seed-5",
    name: "Hendra Wijaya",
    attendance: "hadir",
    guestCount: 2,
    message: "Mohon maaf belum bisa datang langsung, doa terbaik menyusul dari jauh.",
    createdAt: "2026-08-24T11:05:00+07:00",
  },
  {
    id: "seed-6",
    name: "Keluarga Besar Hj. Maryam",
    attendance: "hadir",
    guestCount: 5,
    message: "Semoga Allah memberkahi pernikahan kalian. Samawa selalu!",
    createdAt: "2026-08-25T16:22:00+07:00",
  },
];

function readLocalEntries(): RsvpEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RsvpEntry[]) : [];
  } catch {
    return [];
  }
}

function writeLocalEntries(entries: RsvpEntry[]): void {
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage penuh / private mode — abaikan dengan anggun
  }
}

function sortByNewest(entries: RsvpEntry[]): RsvpEntry[] {
  return [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function submitRsvp(input: RsvpInput): Promise<RsvpEntry> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        name: input.name,
        attendance: input.attendance,
        guest_count: input.guestCount,
        message: input.message || null,
      })
      .select("id, name, attendance, guest_count, message, created_at")
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      name: data.name,
      attendance: data.attendance,
      guestCount: data.guest_count,
      message: data.message,
      createdAt: data.created_at,
    };
  }

  // Mode lokal (tanpa backend): simpan di browser agar UX tetap utuh.
  const entry: RsvpEntry = {
    id: `local-${Date.now()}`,
    name: input.name,
    attendance: input.attendance,
    guestCount: input.guestCount,
    message: input.message || null,
    createdAt: new Date().toISOString(),
  };
  writeLocalEntries([entry, ...readLocalEntries()]);
  return entry;
}

export async function listRsvps(page: number, pageSize: number): Promise<RsvpPage> {
  const supabase = getSupabase();

  if (supabase) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from(TABLE)
      .select("id, name, attendance, guest_count, message, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    const rows = (data ?? []) as Array<{
      id: string;
      name: string;
      attendance: RsvpEntry["attendance"];
      guest_count: number;
      message: string | null;
      created_at: string;
    }>;

    const entries: RsvpEntry[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      attendance: row.attendance,
      guestCount: row.guest_count,
      message: row.message,
      createdAt: row.created_at,
    }));

    return { entries, hasMore: entries.length === pageSize };
  }

  const all = sortByNewest([...readLocalEntries(), ...SEED_ENTRIES]);
  const entries = all.slice((page - 1) * pageSize, page * pageSize);
  return { entries, hasMore: page * pageSize < all.length };
}

/** Jumlah tamu yang menyatakan hadir (null bila backend tidak tersedia). */
export async function fetchAttendingGuestCount(): Promise<number | null> {
  if (!SUPABASE_ENABLED) return null;
  const supabase = getSupabase();
  if (!supabase) return null;

  const { count, error } = await supabase
    .from(TABLE)
    .select("guest_count", { count: "exact", head: true })
    .eq("attendance", "hadir");

  if (error) return null;
  return count ?? 0;
}
