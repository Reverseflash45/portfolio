"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

/* Bintang proyek dari pengunjung. Tabel & fungsinya ada di supabase-bintang.sql.
   Tanpa akun: tiap peramban punya UUID acak sendiri, disimpan di localStorage.
   Kalau Supabase belum dikonfigurasi atau SQL-nya belum dijalankan, `aktif`
   tetap false dan semua tombol bintang disembunyikan. */

const KUNCI_PENGUNJUNG = "porto:pengunjung";

/** Judul proyek → kunci di basis data, mis. "Dulu Segini" → "dulu-segini". */
export const slugProyek = (judul: string) =>
  judul
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

function idPengunjung() {
  try {
    let id = localStorage.getItem(KUNCI_PENGUNJUNG);
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
      id = crypto.randomUUID();
      localStorage.setItem(KUNCI_PENGUNJUNG, id);
    }
    return id;
  } catch {
    // mode privat tanpa penyimpanan: tetap bisa memberi bintang di sesi ini
    return crypto.randomUUID();
  }
}

export type Bintang = {
  aktif: boolean;
  jumlah: (slug: string) => number;
  punyaku: (slug: string) => boolean;
  sibuk: (slug: string) => boolean;
  galat: string | null;
  ganti: (slug: string) => Promise<void>;
};

export function useBintang(): Bintang {
  const [aktif, setAktif] = useState(false);
  const [jumlah, setJumlah] = useState<Record<string, number>>({});
  const [punyaku, setPunyaku] = useState<Set<string>>(new Set());
  const [sibuk, setSibuk] = useState<Set<string>>(new Set());
  const [galat, setGalat] = useState<string | null>(null);
  const [pengunjung, setPengunjung] = useState("");

  useEffect(() => {
    if (!supabase) return;
    const id = idPengunjung();
    let batal = false;
    Promise.all([supabase.rpc("jumlah_bintang"), supabase.rpc("bintang_saya", { p_pengunjung: id })]).then(([a, b]) => {
      if (batal || a.error || b.error) return;
      const j: Record<string, number> = {};
      for (const r of (a.data ?? []) as { proyek: string; jumlah: number }[]) j[r.proyek] = Number(r.jumlah);
      setJumlah(j);
      setPunyaku(new Set((b.data ?? []) as string[]));
      setPengunjung(id);
      setAktif(true);
    });
    return () => {
      batal = true;
    };
  }, []);

  const ganti = useCallback(
    async (slug: string) => {
      if (!supabase || !aktif || sibuk.has(slug)) return;
      const sudah = punyaku.has(slug);
      const ubahSet = (s: Set<string>, tambah: boolean) => {
        const n = new Set(s);
        if (tambah) n.add(slug);
        else n.delete(slug);
        return n;
      };
      // langsung tampil, lalu disamakan dengan hitungan server
      setGalat(null);
      setSibuk((s) => ubahSet(s, true));
      setPunyaku((s) => ubahSet(s, !sudah));
      setJumlah((j) => ({ ...j, [slug]: Math.max(0, (j[slug] ?? 0) + (sudah ? -1 : 1)) }));
      const { data, error } = await supabase.rpc(sudah ? "cabut_bintang" : "beri_bintang", { p_proyek: slug, p_pengunjung: pengunjung });
      if (error) {
        setPunyaku((s) => ubahSet(s, sudah));
        setJumlah((j) => ({ ...j, [slug]: Math.max(0, (j[slug] ?? 0) + (sudah ? 1 : -1)) }));
        setGalat(error.message.includes("kebanyakan") ? "kebanyakan" : "gagal");
      } else if (typeof data === "number" || typeof data === "string") {
        setJumlah((j) => ({ ...j, [slug]: Number(data) }));
      }
      setSibuk((s) => ubahSet(s, false));
    },
    [aktif, sibuk, punyaku, pengunjung],
  );

  return {
    aktif,
    jumlah: (s) => jumlah[s] ?? 0,
    punyaku: (s) => punyaku.has(s),
    sibuk: (s) => sibuk.has(s),
    galat,
    ganti,
  };
}
