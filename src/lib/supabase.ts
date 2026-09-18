import { createClient } from "@supabase/supabase-js";

/* Kunci "publishable" memang dirancang untuk dipasang di kode klien — ia hanya
   bisa melakukan apa yang diizinkan Row Level Security. Yang TIDAK boleh ada di
   sini adalah service_role / secret key: kunci itu melewati seluruh RLS.

   Nilainya tetap diletakkan di environment variable, bukan ditulis langsung,
   supaya proyek Supabase bisa diganti tanpa menyunting kode. */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

/** null bila belum dikonfigurasi — bagian komentar menyembunyikan diri. */
export const supabase =
  url && key
    ? createClient(url, key, { auth: { persistSession: false } })
    : null;

export type Komentar = {
  id: number;
  nama: string;
  isi: string;
  dibuat_pada: string;
};
