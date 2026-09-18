"use client";

import { useCallback, useEffect, useState } from "react";

import { komentarTeks } from "@/content/data";
import { useLang } from "@/lib/i18n";
import { supabase, type Komentar as Baris } from "@/lib/supabase";
import Reveal from "./Reveal";

const MAKS_NAMA = 40;
const MAKS_ISI = 500;
const JEDA_MS = 30_000; // jeda minimum antar kiriman dari satu peramban

/* Warna avatar diturunkan dari nama, bukan diacak: orang yang sama selalu
   mendapat warna yang sama, jadi daftarnya terasa punya identitas. */
const RONA = [168, 190, 45, 12, 275, 210, 320, 95];
function warnaDari(nama: string) {
  let h = 0;
  for (const c of nama) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return RONA[h % RONA.length];
}

function inisial(nama: string) {
  const bagian = nama.trim().split(/\s+/).filter(Boolean);
  if (!bagian.length) return "?";
  return (bagian[0][0] + (bagian[1]?.[0] ?? "")).toUpperCase();
}

function jarakWaktu(iso: string, lang: "id" | "en") {
  const detik = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (detik < 60) return lang === "id" ? "baru saja" : "just now";
  if (detik < 3600) {
    const m = Math.floor(detik / 60);
    return lang === "id" ? `${m} menit lalu` : `${m}m ago`;
  }
  if (detik < 86400) {
    const j = Math.floor(detik / 3600);
    return lang === "id" ? `${j} jam lalu` : `${j}h ago`;
  }
  const h = Math.floor(detik / 86400);
  if (h < 30) return lang === "id" ? `${h} hari lalu` : `${h}d ago`;
  return new Date(iso).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type Status = "diam" | "mengirim" | "terkirim" | "gagal" | "kurang" | "terlalu-cepat";

export default function Komentar() {
  const { lang, t } = useLang();
  const [daftar, setDaftar] = useState<Baris[] | null>(null);
  const [status, setStatus] = useState<Status>("diam");
  const [nama, setNama] = useState("");
  const [isi, setIsi] = useState("");

  const muat = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("komentar")
      .select("id,nama,isi,dibuat_pada")
      .order("dibuat_pada", { ascending: false })
      .limit(50);
    setDaftar(data ?? []);
  }, []);

  useEffect(() => {
    void muat();
  }, [muat]);

  if (!supabase) return null;

  async function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "mengirim") return;

    if (!nama.trim() || !isi.trim()) {
      setStatus("kurang");
      return;
    }

    /* Jeda antar kiriman. Ini hanya penghalang di sisi peramban dan mudah
       dilewati oleh yang benar-benar berniat — gunanya mencegah kiriman ganda
       karena tombol diklik berkali-kali, bukan mencegah penyalahgunaan. */
    try {
      const akhir = Number(localStorage.getItem("komentar-terakhir") ?? 0);
      if (Date.now() - akhir < JEDA_MS) {
        setStatus("terlalu-cepat");
        return;
      }
    } catch {
      /* penyimpanan diblokir — lanjutkan saja */
    }

    setStatus("mengirim");
    const { error } = await supabase!
      .from("komentar")
      .insert({ nama: nama.trim().slice(0, MAKS_NAMA), isi: isi.trim().slice(0, MAKS_ISI) });

    if (error) {
      setStatus("gagal");
      return;
    }
    try {
      localStorage.setItem("komentar-terakhir", String(Date.now()));
    } catch {
      /* diabaikan */
    }
    setNama("");
    setIsi("");
    setStatus("terkirim");
    void muat();
  }

  const pesan =
    status === "terkirim"
      ? t(komentarTeks.terkirim)
      : status === "gagal"
        ? t(komentarTeks.gagal)
        : status === "kurang"
          ? t(komentarTeks.kurang)
          : status === "terlalu-cepat"
            ? t(komentarTeks.terlaluCepat)
            : "";

  return (
    <Reveal>
      <div className="mt-6 rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur md:p-7">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-semibold tracking-tight">{t(komentarTeks.judul)}</h3>
          {daftar && (
            <span className="font-mono text-sm text-muted">({daftar.length})</span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-muted">{t(komentarTeks.catatan)}</p>

        <form onSubmit={kirim} noValidate className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="k-nama"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
            >
              {t(komentarTeks.nama)}
            </label>
            <input
              id="k-nama"
              value={nama}
              maxLength={MAKS_NAMA}
              onChange={(e) => setNama(e.target.value)}
              placeholder={t(komentarTeks.namaPh)}
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
          </div>
          <div>
            <label
              htmlFor="k-isi"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
            >
              {t(komentarTeks.isi)}
            </label>
            <textarea
              id="k-isi"
              value={isi}
              rows={3}
              maxLength={MAKS_ISI}
              onChange={(e) => setIsi(e.target.value)}
              placeholder={t(komentarTeks.isiPh)}
              className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
            />
            <p className="mt-1 text-right font-mono text-[11px] text-muted/70">
              {isi.length}/{MAKS_ISI}
            </p>
          </div>

          <button
            type="submit"
            disabled={status === "mengirim"}
            className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
          >
            {status === "mengirim" ? t(komentarTeks.mengirim) : t(komentarTeks.kirim)}
          </button>

          <p
            role="status"
            aria-live="polite"
            className={`text-[11px] leading-relaxed ${
              status === "terkirim" ? "text-accent" : "text-red-400"
            }`}
          >
            {pesan}
          </p>
        </form>

        <div className="mt-7 space-y-5 border-t border-border/60 pt-6">
          {daftar === null && (
            <p className="text-sm text-muted">{t(komentarTeks.memuat)}</p>
          )}
          {daftar?.length === 0 && (
            <p className="text-sm text-muted">{t(komentarTeks.kosong)}</p>
          )}
          {daftar?.map((k) => {
            const rona = warnaDari(k.nama);
            return (
              <div key={k.id} className="flex gap-3.5">
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-semibold"
                  style={{
                    background: `hsl(${rona} 45% 22%)`,
                    color: `hsl(${rona} 75% 72%)`,
                  }}
                >
                  {inisial(k.nama)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-medium">{k.nama}</span>
                    <time
                      dateTime={k.dibuat_pada}
                      className="shrink-0 font-mono text-[11px] text-muted"
                    >
                      {jarakWaktu(k.dibuat_pada, lang)}
                    </time>
                  </div>
                  {/* whitespace-pre-line menjaga baris baru; isinya tetap
                      dirender sebagai teks, tidak pernah sebagai HTML. */}
                  <p className="mt-0.5 whitespace-pre-line break-words text-sm text-muted">
                    {k.isi}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
