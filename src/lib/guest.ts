export const DEFAULT_GUEST = "Tamu Undangan";

/**
 * Mengubah slug URL menjadi nama tamu berformat Title Case.
 * Contoh: "firman-ardiansyah" → "Firman Ardiansyah"
 * Separator yang didukung: spasi, "-", "_", "+", "."
 */
export function slugToGuestName(slug: string): string {
  let decoded = slug.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // slug mengandung encoding tidak valid — pakai nilai mentah
  }
  const words = decoded.split(/[\s\-_+.]+/).filter(Boolean);
  if (words.length === 0) return DEFAULT_GUEST;
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/** Normalisasi nilai query `?to=` (root route). */
export function resolveGuestName(raw: string | string[] | undefined): string {
  if (typeof raw !== "string") return DEFAULT_GUEST;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : DEFAULT_GUEST;
}
