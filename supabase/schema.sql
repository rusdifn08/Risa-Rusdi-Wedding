-- ============================================================
-- Schema RSVP — Undangan Digital Risa & Rusdi
-- Cara pakai:
--   1. Buat project gratis di https://supabase.com
--   2. Buka SQL Editor → paste seluruh file ini → Run
--   3. Salin Project URL & anon public key ke .env.local
-- ============================================================

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  attendance text not null check (attendance in ('hadir', 'berhalangan', 'ragu')),
  guest_count integer not null default 1 check (guest_count between 1 and 5),
  message text check (message is null or char_length(message) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

-- Row Level Security: publik hanya boleh baca & insert
alter table public.rsvps enable row level security;

drop policy if exists "Public read access" on public.rsvps;
create policy "Public read access"
  on public.rsvps for select
  using (true);

drop policy if exists "Public insert access" on public.rsvps;
create policy "Public insert access"
  on public.rsvps for insert
  with check (
    char_length(name) between 1 and 100
    and attendance in ('hadir', 'berhalangan', 'ragu')
    and guest_count between 1 and 5
  );
