-- ============================================================
-- Tabel komentar publik untuk portofolio
-- Jalankan sekali di Supabase → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.komentar (
  id          bigint generated always as identity primary key,
  nama        text        not null,
  isi         text        not null,
  dibuat_pada timestamptz not null default now(),

  -- Disembunyikan, bukan dihapus. Menyembunyikan lebih baik daripada menghapus:
  -- komentarnya hilang dari halaman tapi jejaknya tetap ada kalau suatu saat
  -- perlu ditunjukkan ke siapa pun.
  disembunyikan boolean   not null default false,

  -- Batas panjang ditegakkan di basis data, bukan hanya di formulir. Siapa pun
  -- bisa memanggil API langsung tanpa lewat halaman ini; aturan yang hanya ada
  -- di sisi klien bukan aturan.
  constraint nama_wajar check (char_length(btrim(nama)) between 1 and 40),
  constraint isi_wajar  check (char_length(btrim(isi))  between 1 and 500)
);

create index if not exists komentar_tampil_idx
  on public.komentar (dibuat_pada desc)
  where disembunyikan = false;

alter table public.komentar enable row level security;

-- Siapa pun boleh MEMBACA komentar yang tidak disembunyikan.
drop policy if exists "baca komentar tampil" on public.komentar;
create policy "baca komentar tampil"
  on public.komentar for select
  to anon, authenticated
  using (disembunyikan = false);

-- Siapa pun boleh MENULIS, tapi tidak boleh menulis komentar yang langsung
-- tersembunyi (mencegah penyisipan baris siluman).
drop policy if exists "tulis komentar" on public.komentar;
create policy "tulis komentar"
  on public.komentar for insert
  to anon, authenticated
  with check (disembunyikan = false);

-- TIDAK ADA policy update maupun delete untuk anon.
-- Artinya pengunjung tidak bisa mengubah atau menghapus komentar siapa pun,
-- termasuk komentarnya sendiri. Penghapusan hanya lewat dasbor Supabase.
