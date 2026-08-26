# Undangan Digital Premium — Risa & Rusdi

Platform undangan pernikahan digital interaktif untuk **Risa Hanipah, A.Md.Ak & Rusdi Fadli Nuryuda, S.Pd** — tema **Premium Vintage Botanical Garden** (dusty blue · sage · blush · cream · antique gold), dibangun sesuai PRD: elegan, cepat (SSR), dan mudah dipersonalisasi.

## Palet Warna

| Token | HEX | Peran |
| --- | --- | --- |
| `background` | `#F2F0E9` | Off-white/cream — latar kartu klasik |
| `foreground` / `blue` | `#3B5964` | Dark slate blue — teks utama, tombol, banner |
| `dusty` | `#A9BCC6` | Dusty blue — ilustrasi pemandangan & pilar |
| `gold` | `#C7A252` | Antique gold — bingkai lengkung & detail |
| `blush` | `#D89BA4` | Dusty rose — mawar |
| `yellow` | `#EAD386` | Pale yellow — aksen kelopak |
| `sage` | `#8A9B79` | Muted sage — dedaunan vintage |

Semua token tersedia otomatis dalam mode gelap (*night garden*) dan bisa diubah sepenuhnya dari `src/app/globals.css`.

## Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, SSR) |
| Bahasa | TypeScript (strict) |
| State | Zustand |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| Form | React Hook Form + Zod |
| Backend RSVP | Supabase (opsional, graceful fallback) |
| OG Image | `next/og` (Edge Runtime) |
| QR | `qrcode.react` |

## Menjalankan Proyek

```bash
bun install       # atau: npm.cmd install
bun dev           # development → http://localhost:3000
```

Build produksi:

```bash
bun run build
bun run start
bun run lint
bun run typecheck
```

## Personalisasi (Semua di Satu File)

Seluruh data undangan terpusat di **`src/config/wedding.ts`**:

- Nama mempelai, gelar, nama orang tua, Instagram
- Detail Akad & Resepsi (tanggal, jam, venue, alamat, query Google Maps)
- Target countdown (`countdownTargetIso`, format ISO 8601 dengan zona `+07:00`)
- Daftar galeri, rekening bank, payload QRIS, dress code, hashtag

### Mengganti Aset Placeholder

| Aset | File | Ganti dengan |
| --- | --- | --- |
| Hero | `public/images/hero.jpg` | Foto pre-wedding portrait (1200×1600+) |
| Foto mempelai | `public/images/couple-*.jpg` | Foto potret masing-masing mempelai |
| Galeri | `public/images/gallery-*.jpg` | 6+ foto pre-wedding (perbarui juga `wedding.gallery`) |
| Musik latar | `public/audio/bgm.wav` | File MP3/audio lagu kalian (perbarui `wedding.audio.src`) |
| Favicon | `src/app/icon.svg` | Monogram/logo (opsional) |

## Setup Supabase (RSVP & Buku Tamu)

Tanpa Supabase, aplikasi **tetap berjalan** dalam mode pratinjau (pesan tersimpan di browser + data contoh). Untuk mengaktifkan database:

1. Buat project gratis di [supabase.com](https://supabase.com)
2. **SQL Editor** → jalankan seluruh isi [`supabase/schema.sql`](supabase/schema.sql)
3. Salin `.env.example` menjadi `.env.local`, isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. Restart `bun dev` — RSVP & buku tamu kini real-time tersimpan di database.

## Fitur

- **URL personal per tamu** — dua format:
  - Path slug (direkomendasikan, Title Case otomatis): `https://domain.com/firman-ardiansyah` → **Firman Ardiansyah**
  - Query param: `https://domain.com/?to=Nama+Tamu`
  - Separator yang dikenali: `-`, `_`, `+`, spasi (`%20`), `.`, bingkai lengkung ornamen emas, kelopak mawar jatuh, parallax mouse multi-layer
- **Efek vintage**: tekstur kertas halus di seluruh halaman, ilustrasi botanical (gunung berkabut, kolom klasik, mawar, burung layang-layang)
- **Buka Undangan** → transisi penuh + musik latar otomatis (dengan fallback bila autoplay diblokir)
- **Animasi 3D**: kartu tilt mengikuti kursor (profil & acara), depth-reveal per section, flip-in countdown, parallax mouse multi-layer di cover, ken-burns, bokeh ambient, pita marquee scroll-linked, progress bar scroll emas
- **Countdown** akurat (perhitungan awal di server, lanjut di klien)
- **Detail acara** + tombol Google Maps (intent aplikasi Maps di mobile)
- **Galeri** masonry, lazy-loading `next/image`, lightbox swipeable
- **RSVP** validasi real-time + toast, **buku tamu** dengan pagination
- **Amplop digital** accordion: salin no. rekening + QRIS
- **Bottom nav** sticky dengan **scrollspy** (item aktif mengikuti section), kontrol musik melayang, dark mode elegan
- **SEO**: metadata dinamis per tamu, **OG image dinamis** (`/api/og?guest=Nama`) untuk preview WhatsApp, **JSON-LD Event schema**
- **Aksesibilitas**: seluruh animasi 3D otomatis nonaktif saat `prefers-reduced-motion` dan pada perangkat sentuh

## Aset Gambar

Placeholder saat ini berupa **ilustrasi editorial premium** (bokeh, film grain, vignette, bingkai emas, tipografi Garamond) yang di-generate via Python/Pillow — teroptimasi ±40–85 KB per foto. Ganti dengan foto asli di `public/images/` dengan nama file yang sama:

| File | Ukuran ideal | Fungsi |
| --- | --- | --- |
| `hero.jpg` | 1200×1600 (3:4) | Cover fullscreen |
| `couple-risa.jpg` / `couple-rusdi.jpg` | 800×1060 (3:4) | Foto mempelai (masking arch) |
| `gallery-1..8.jpg` | campuran 3:4 / 1:1 / 4:3 | Galeri masonry (termasuk air mancur & gerbang mawar) |

## Struktur Proyek (Atomic Design)

```
src/
├── app/
│   ├── layout.tsx              # Font, metadata dasar, tema anti-FOUC
│   ├── page.tsx                # Pages: SSR data + metadata per tamu + JSON-LD
│   ├── globals.css             # Token warna Ivory & Gold (Tailwind v4)
│   └── api/og/route.tsx        # OG image dinamis
├── components/
│   ├── atoms/                  # Typography, Button, Icon, Divider
│   ├── molecules/              # FormInput, CopyButton, CountdownBlock (flip 3D), …
│   ├── organisms/              # HeroCover (parallax 3D), ScrollMarquee, ScrollProgress,
│   │                           # AmbientBokeh, EventDetails, Gallery, RSVP, Gift, Nav, …
│   ├── templates/              # InvitationTemplate
│   └── motion/                 # Reveal, DepthReveal (3D), TiltCard (hover 3D)
├── config/wedding.ts           # ★ SATU sumber data undangan
├── hooks/                      # useCountdown, useMediaQuery
├── lib/                        # supabase, rsvp-service, clipboard, date, utils
├── store/                      # useUIStore (Zustand), useToastStore
└── types/                      # Kontrak tipe domain
supabase/schema.sql             # Tabel RSVP + RLS
```

## Deployment

Cara termudah: [Vercel](https://vercel.com) — import repository, tambahkan env Supabase di dashboard, deploy. Pastikan `wedding.site.url` di `src/config/wedding.ts` diubah ke domain produksi agar metadata & OG image valid.

---

Dokumen kebutuhan: `PRD Undangan Digital Profesional Next.pdf` (v1.0, 26 Agustus 2026).
