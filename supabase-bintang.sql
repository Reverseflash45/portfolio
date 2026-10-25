-- ============================================================
-- Bintang untuk proyek di portofolio
-- Jalankan sekali di Supabase → SQL Editor → New query → Run
-- ============================================================

-- Satu baris = satu bintang dari satu pengunjung untuk satu proyek.
-- "pengunjung" adalah UUID acak yang dibuat di peramban pengunjung (bukan akun),
-- "jaringan" adalah md5 dari alamat IP + garam: dipakai hanya untuk membatasi
-- spam, alamat IP aslinya tidak pernah disimpan.
create table if not exists public.bintang (
  proyek      text        not null,
  pengunjung  uuid        not null,
  jaringan    text        not null,
  dibuat_pada timestamptz not null default now(),
  primary key (proyek, pengunjung),
  constraint proyek_wajar check (proyek ~ '^[a-z0-9-]{1,60}$')
);

create index if not exists bintang_jaringan_idx
  on public.bintang (jaringan, proyek, dibuat_pada);

-- RLS aktif TANPA policy: pengunjung tidak bisa membaca atau menulis tabel ini
-- secara langsung. Semua akses lewat fungsi di bawah, yang hanya membuka
-- jumlah bintang per proyek dan bintang milik pengunjung itu sendiri.
alter table public.bintang enable row level security;
revoke all on public.bintang from anon, authenticated;

-- Sidik jaringan dari header permintaan (PostgREST menaruhnya di request.headers).
create or replace function public._jaringan_bintang()
returns text
language sql stable
set search_path = public
as $$
  with h as (
    select coalesce(nullif(current_setting('request.headers', true), ''), '{}')::json as j
  )
  select md5('porto-bintang:' || coalesce(
    nullif(h.j ->> 'cf-connecting-ip', ''),
    nullif(btrim(split_part(coalesce(h.j ->> 'x-forwarded-for', ''), ',', 1)), ''),
    nullif(h.j ->> 'x-real-ip', ''),
    'tanpa-ip'
  ))
  from h
$$;

create or replace function public.jumlah_bintang()
returns table (proyek text, jumlah bigint)
language sql stable security definer
set search_path = public
as $$
  select b.proyek, count(*) from public.bintang b group by b.proyek
$$;

create or replace function public.bintang_saya(p_pengunjung uuid)
returns setof text
language sql stable security definer
set search_path = public
as $$
  select b.proyek from public.bintang b where b.pengunjung = p_pengunjung
$$;

create or replace function public.beri_bintang(p_proyek text, p_pengunjung uuid)
returns bigint
language plpgsql volatile security definer
set search_path = public
as $$
declare
  j text := public._jaringan_bintang();
begin
  -- Satu jaringan (wifi kampus, rumah, kos) paling banyak 30 bintang baru per
  -- proyek per hari. Cukup longgar untuk satu kelas yang memakai wifi yang sama,
  -- tapi menahan orang yang mengulang-ulang dengan membersihkan peramban.
  if (
    select count(*) from public.bintang b
    where b.jaringan = j and b.proyek = p_proyek and b.dibuat_pada > now() - interval '1 day'
  ) >= 30 then
    raise exception 'kebanyakan bintang dari jaringan ini' using errcode = 'P0001';
  end if;

  insert into public.bintang (proyek, pengunjung, jaringan)
  values (p_proyek, p_pengunjung, j)
  on conflict (proyek, pengunjung) do nothing;

  return (select count(*) from public.bintang b where b.proyek = p_proyek);
end
$$;

create or replace function public.cabut_bintang(p_proyek text, p_pengunjung uuid)
returns bigint
language plpgsql volatile security definer
set search_path = public
as $$
begin
  delete from public.bintang b where b.proyek = p_proyek and b.pengunjung = p_pengunjung;
  return (select count(*) from public.bintang b where b.proyek = p_proyek);
end
$$;

-- Fungsi pembantu tidak perlu dipanggil dari luar.
revoke execute on function public._jaringan_bintang() from public, anon, authenticated;
grant execute on function public.jumlah_bintang() to anon, authenticated;
grant execute on function public.bintang_saya(uuid) to anon, authenticated;
grant execute on function public.beri_bintang(text, uuid) to anon, authenticated;
grant execute on function public.cabut_bintang(text, uuid) to anon, authenticated;
