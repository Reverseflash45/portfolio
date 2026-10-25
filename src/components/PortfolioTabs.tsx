"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { portfolioSection, projects, education, techStack, misc, bintangTeks, type KategoriProyek, type Project, type T } from "@/content/data";
import { type Bintang, slugProyek, useBintang } from "@/lib/bintang";
import Section from "./Section";
import Reveal from "./Reveal";
import CertCard from "./CertCard";
import CertLightbox from "./CertLightbox";
import BrandIcon from "./BrandIcon";

type Tab = "projects" | "certificates" | "awards" | "stack" | "favorites";

/* Jumlah proyek yang tampil sebelum tombol "lihat semua". Tiga = satu baris
   di layar lebar, dan menahan section ini tetap pendek di ponsel. */
const BATAS_PROYEK = 3;
// deskripsi di atas panjang ini dipotong jadi 3 baris dengan tombol baca
const DESKRIPSI_PANJANG = 180;
// arah masuk kartu per kolom: kiri dari kiri, tengah dari bawah, kanan dari kanan
const ARAH = ["kiri", "bawah", "kanan"] as const;

const URUT_KATEGORI: KategoriProyek[] = ["aplikasi", "data", "sains", "web", "kuliah"];

const TABS: { key: Tab; icon: string }[] = [
  { key: "projects", icon: "</>" },
  { key: "certificates", icon: "✦" },
  { key: "awards", icon: "★" },
  { key: "stack", icon: "◈" },
  { key: "favorites", icon: "♥" },
];

const slugDari = (p: Project) => slugProyek(typeof p.title === "string" ? p.title : p.title.id);

function TombolBintang({ b, p, t }: { b: Bintang; p: Project; t: (v: T | string) => string }) {
  const slug = slugDari(p);
  const on = b.punyaku(slug);
  const n = b.jumlah(slug);
  return (
    <button
      type="button"
      onClick={() => void b.ganti(slug)}
      disabled={b.sibuk(slug)}
      aria-pressed={on}
      aria-label={`${t(on ? bintangTeks.cabut : bintangTeks.beri)} ${t(p.title)} (${n} ${t(bintangTeks.satuan)})`}
      className={`bintang-tombol inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors disabled:cursor-wait ${
        on
          ? "border-amber-300/60 bg-amber-300/10 text-amber-300"
          : "border-border text-muted hover:border-amber-300/50 hover:text-amber-200"
      }`}
    >
      <span aria-hidden>{on ? "★" : "☆"}</span>
      <span>{n}</span>
    </button>
  );
}

export default function PortfolioTabs() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("projects");
  const [open, setOpen] = useState<number | null>(null);
  const [semuaProyek, setSemuaProyek] = useState(false);
  // Kunci "baca selengkapnya" memakai judul, bukan indeks, supaya tidak tertukar saat filter berganti.
  const [terbuka, setTerbuka] = useState<Set<string>>(new Set());
  const [kategori, setKategori] = useState<KategoriProyek | "semua">("semua");
  const bintang = useBintang();
  const [urutBanyak, setUrutBanyak] = useState(true);
  const tabTampil = TABS.filter((tb) => tb.key !== "favorites" || bintang.aktif);
  // urutan favorit: jumlah bintang, lalu urutan aslinya di data supaya stabil
  const favorit = projects.items
    .map((p, i) => ({ p, i, n: bintang.jumlah(slugDari(p)) }))
    .sort((a, b) => (urutBanyak ? b.n - a.n : a.n - b.n) || a.i - b.i);

  // urutan kartu di tab Proyek & filter "favoritku"
  const [urutKartu, setUrutKartu] = useState<"bawaan" | "banyak" | "sedikit">("bawaan");
  const [hanyaFavorit, setHanyaFavorit] = useState(false);
  const jumlahFavoritku = projects.items.filter((p) => bintang.punyaku(slugDari(p))).length;

  /* Tanpa filter: tiga proyek pertama lalu tombol "lihat semua". Dengan filter,
     semua proyek di kategori itu langsung tampil karena jumlahnya sedikit. */
  const tersaring = projects.items
    .map((p, i) => ({ p, i, n: bintang.jumlah(slugDari(p)) }))
    .filter(({ p }) => (kategori === "semua" || p.kategori === kategori) && (!hanyaFavorit || bintang.punyaku(slugDari(p))))
    .sort((a, b) => (urutKartu === "banyak" ? b.n - a.n : urutKartu === "sedikit" ? a.n - b.n : 0) || a.i - b.i)
    .map(({ p }) => p);
  const pakaiBatas = kategori === "semua" && !hanyaFavorit;
  const proyekTampil = !pakaiBatas || semuaProyek ? tersaring : tersaring.slice(0, BATAS_PROYEK);
  const sisaProyek = pakaiBatas ? tersaring.length - BATAS_PROYEK : 0;
  const gulirAktif = pakaiBatas && semuaProyek;
  const jumlahKategori = (k: KategoriProyek) => projects.items.filter((p) => p.kategori === k).length;

  /* Saat semua proyek dibuka, daftarnya digulir di dalam kotak bertinggi
     terbatas supaya halaman tidak memanjang jauh ke bawah. Tepi atas/bawah
     kotak memudar hanya jika memang masih ada isi di arah itu. */
  const kotak = useRef<HTMLDivElement>(null);
  const [tepi, setTepi] = useState({ atas: false, bawah: false });

  function ukurTepi() {
    const el = kotak.current;
    if (!el) return;
    const atas = el.scrollTop > 4;
    const bawah = el.scrollTop + el.clientHeight < el.scrollHeight - 4;
    setTepi((l) => (l.atas === atas && l.bawah === bawah ? l : { atas, bawah }));
  }

  useEffect(() => {
    if (!semuaProyek || kategori !== "semua") return;
    const el = kotak.current;
    if (!el) return;
    el.scrollTo({ top: 0 });
    ukurTepi();
    // tinggi isi berubah saat gambar lazy selesai dimuat atau deskripsi dibuka
    const ro = new ResizeObserver(ukurTepi);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => ro.disconnect();
  }, [semuaProyek, kategori]);

  function aturDeskripsi(i: string) {
    setTerbuka((lama) => {
      const baru = new Set(lama);
      if (baru.has(i)) baru.delete(i);
      else baru.add(i);
      return baru;
    });
  }

  function aturSemuaProyek() {
    // Saat diciutkan, pengunjung bisa tertinggal jauh di bawah daftar yang
    // sudah hilang — kembalikan ke awal section.
    if (semuaProyek) {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSemuaProyek((v) => !v);
  }

  const sorted = useMemo(
    () =>
      [...education.certificates].sort((a, b) =>
        String((b as { date?: string }).date ?? b.year).localeCompare(
          String((a as { date?: string }).date ?? a.year)
        )
      ),
    []
  );
  const certs = sorted.filter((c) => c.kind !== "award");
  const awards = sorted.filter((c) => c.kind === "award");
  const shown = tab === "awards" ? awards : certs;

  return (
    <Section id="portfolio" title={portfolioSection.title} wide>
      <Reveal>
        <div
          className={`mb-10 grid gap-1 rounded-2xl border border-border bg-surface/60 p-1.5 backdrop-blur ${
            tabTampil.length > 4 ? "grid-cols-3 sm:grid-cols-5" : "grid-cols-2 sm:grid-cols-4"
          }`}
        >
          {tabTampil.map((tb) => {
            const on = tab === tb.key;
            return (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`relative flex flex-col items-center gap-2 rounded-xl px-3 py-5 transition-colors ${
                  on
                    ? "bg-accent/12 text-accent shadow-[inset_0_0_0_1px_rgba(94,234,212,0.35)]"
                    : "text-muted hover:bg-surface hover:text-fg"
                }`}
              >
                <span className="font-mono text-base">{tb.icon}</span>
                <span className="text-sm font-medium">
                  {t(portfolioSection.tabs[tb.key])}
                </span>
                {on && (
                  <span
                    aria-hidden
                    className="absolute inset-x-5 bottom-1 h-px bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {bintang.galat && (
        <p role="status" className="mb-6 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-2.5 text-sm text-amber-200">
          {t(bintang.galat === "kebanyakan" ? bintangTeks.kebanyakan : bintangTeks.gagal)}
        </p>
      )}

      {tab === "projects" && (
        <>
        <div role="group" aria-label={t(projects.filterLabel)} className="mb-6 flex flex-wrap gap-2">
          {(["semua", ...URUT_KATEGORI] as const).map((k) => {
            const aktif = kategori === k;
            const n = k === "semua" ? projects.items.length : jumlahKategori(k);
            return (
              <button
                key={k}
                type="button"
                aria-pressed={aktif}
                onClick={() => setKategori(k)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  aktif
                    ? "border-accent/60 bg-accent/12 text-accent"
                    : "border-border text-muted hover:border-accent/40 hover:text-fg"
                }`}
              >
                {k === "semua" ? t(projects.semua) : t(projects.kategori[k])}
                <span className={`font-mono text-[11px] ${aktif ? "text-accent" : "text-muted/80"}`}>{n}</span>
              </button>
            );
          })}
          {bintang.aktif && (
            <button
              type="button"
              aria-pressed={hanyaFavorit}
              onClick={() => setHanyaFavorit((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                hanyaFavorit
                  ? "border-amber-300/60 bg-amber-300/10 text-amber-300"
                  : "border-border text-muted hover:border-amber-300/40 hover:text-fg"
              }`}
            >
              <span aria-hidden>{hanyaFavorit ? "★" : "☆"}</span>
              {t(bintangTeks.favoritku)}
              <span className={`font-mono text-[11px] ${hanyaFavorit ? "text-amber-300" : "text-muted/80"}`}>{jumlahFavoritku}</span>
            </button>
          )}
        </div>
        {bintang.aktif && (
          <div role="group" aria-label={t(bintangTeks.urut)} className="-mt-2 mb-6 flex flex-wrap items-center gap-1 text-sm sm:gap-2">
            <span className="hidden text-muted sm:inline">{t(bintangTeks.urut)}:</span>
            {(["bawaan", "banyak", "sedikit"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={urutKartu === u}
                onClick={() => setUrutKartu(u)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  urutKartu === u ? "bg-amber-300/15 text-amber-300" : "text-muted hover:text-fg"
                }`}
              >
                {u === "bawaan"
                  ? t(bintangTeks.bawaan)
                  : u === "banyak"
                    ? `★ ${t(bintangTeks.terbanyak)}`
                    : `☆ ${t(bintangTeks.tersedikit)}`}
              </button>
            ))}
          </div>
        )}
        {hanyaFavorit && tersaring.length === 0 && (
          <div className="mb-6 rounded-2xl border border-dashed border-border px-5 py-8 text-center">
            <p className="text-sm text-muted">{t(bintangTeks.kosongFavorit)}</p>
            <button
              type="button"
              onClick={() => setHanyaFavorit(false)}
              className="mt-3 font-mono text-xs text-accent hover:underline"
            >
              {t(bintangTeks.tampilkanSemua)}
            </button>
          </div>
        )}
        <div className={gulirAktif ? "proyek-bingkai" : undefined}>
        {gulirAktif && (
          <div className="mb-3 flex items-center justify-between px-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span>
              <span className="text-accent">{projects.items.length}</span> {t(projects.title)}
            </span>
            <span className="flex items-center gap-1.5">
              {t(projects.scrollHint)}
              <span aria-hidden className="proyek-panah">↓</span>
            </span>
          </div>
        )}
        <div
          ref={kotak}
          onScroll={gulirAktif ? ukurTepi : undefined}
          data-atas={gulirAktif && tepi.atas ? "" : undefined}
          data-bawah={gulirAktif && tepi.bawah ? "" : undefined}
          className={gulirAktif ? "proyek-gulir" : undefined}
        >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proyekTampil.map((p, i) => {
            const kunci = t(p.title);
            return (
            <Reveal key={`${kategori}-${kunci}`} delay={(i % 3) * 70} from={ARAH[i % 3]}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur transition-colors hover:border-accent/40">
                {p.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-bg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={t(p.title)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden border-b border-dashed border-border bg-bg">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-border">
                      {t(misc.slotImage)}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    p.kind === "solo"
                      ? "border-accent/40 text-accent"
                      : "border-border text-muted"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`h-1 w-1 rounded-full ${
                      p.kind === "solo" ? "bg-accent" : "bg-muted"
                    }`}
                  />
                  {t(p.label)}
                </span>
                {bintang.aktif && <TombolBintang b={bintang} p={p} t={t} />}
                </div>

                <h3 className="text-base font-medium tracking-tight">{t(p.title)}</h3>
                <div className="mt-2 flex-1">
                  <p
                    className={`text-sm leading-relaxed text-muted ${
                      terbuka.has(kunci) ? "" : "line-clamp-3"
                    }`}
                  >
                    {t(p.desc)}
                  </p>
                  {t(p.desc).length > DESKRIPSI_PANJANG && (
                    <button
                      type="button"
                      onClick={() => aturDeskripsi(kunci)}
                      aria-expanded={terbuka.has(kunci)}
                      className="mt-1.5 font-mono text-[11px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {terbuka.has(kunci) ? t(projects.readLess) : t(projects.readMore)}
                    </button>
                  )}
                </div>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[11px] text-muted">
                      #{tag}
                    </li>
                  ))}
                </ul>

                {(p.repo || p.demo || p.apk) && (
                  <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        Repo ↗
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        Demo ↗
                      </a>
                    )}
                    {p.apk && (
                      <a href={p.apk} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        {t(projects.apkLabel)} ↓
                      </a>
                    )}
                  </div>
                )}
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>
        </div>
        </div>

        {sisaProyek > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={aturSemuaProyek}
              aria-expanded={semuaProyek}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/70 px-5 py-2.5 text-sm font-medium text-fg backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
            >
              {semuaProyek
                ? t(projects.showLess)
                : `${t(projects.showAll)} (+${sisaProyek})`}
              <span aria-hidden className={`transition-transform ${semuaProyek ? "rotate-180" : ""}`}>
                ↓
              </span>
            </button>
          </div>
        )}
        </>
      )}

      {tab === "favorites" && bintang.aktif && (
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-xl text-sm leading-relaxed text-muted">{t(bintangTeks.intro)}</p>
            <div role="group" aria-label={t(bintangTeks.urut)} className="flex gap-1 rounded-full border border-border bg-surface/60 p-1">
              {[true, false].map((banyak) => (
                <button
                  key={String(banyak)}
                  type="button"
                  aria-pressed={urutBanyak === banyak}
                  onClick={() => setUrutBanyak(banyak)}
                  className={`rounded-full px-3.5 py-1 text-sm transition-colors ${
                    urutBanyak === banyak ? "bg-amber-300/15 text-amber-300" : "text-muted hover:text-fg"
                  }`}
                >
                  {banyak ? "★ " : "☆ "}
                  {t(banyak ? bintangTeks.terbanyak : bintangTeks.tersedikit)}
                </button>
              ))}
            </div>
          </div>

          {favorit.every((f) => f.n === 0) && <p className="mb-4 text-sm text-amber-200">{t(bintangTeks.belumAda)}</p>}

          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur">
            {favorit.map(({ p, n }, i) => (
              <li key={t(p.title)} className="flex items-center gap-3 px-3 py-3 sm:gap-4 sm:px-4">
                <span
                  className={`w-7 shrink-0 text-right font-mono text-sm ${urutBanyak && i < 3 && n > 0 ? "text-amber-300" : "text-muted"}`}
                >
                  {i + 1}
                </span>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading="lazy" className="hidden h-11 w-[70px] shrink-0 rounded-md border border-border object-cover sm:block" />
                ) : (
                  <span aria-hidden className="hidden h-11 w-[70px] shrink-0 rounded-md border border-dashed border-border sm:block" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {p.demo ? (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="hover:text-accent hover:underline">
                        {t(p.title)}
                      </a>
                    ) : (
                      t(p.title)
                    )}
                  </p>
                  <p className="font-mono text-[11px] text-muted">{t(projects.kategori[p.kategori])}</p>
                </div>
                <TombolBintang b={bintang} p={p} t={t} />
              </li>
            ))}
          </ol>
        </div>
      )}

      {(tab === "certificates" || tab === "awards") && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Reveal key={`${tab}-${i}`} delay={(i % 3) * 60} from={ARAH[i % 3]}>
              <CertCard cert={c} onOpen={() => setOpen(sorted.indexOf(c))} />
            </Reveal>
          ))}
        </div>
      )}

      {tab === "stack" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {techStack.map((s, i) => (
            <Reveal key={s.name} delay={(i % 6) * 45}>
              <div
                className="group flex h-full flex-col items-center justify-center gap-2.5 rounded-xl border border-border bg-surface/70 px-3 py-5 text-center backdrop-blur transition-colors hover:border-accent/40"
                style={{ ["--tc" as string]: s.color }}
              >
                <BrandIcon
                  slug={(s as { slug?: string }).slug}
                  name={s.name}
                  color={s.color}
                  className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="text-xs font-medium leading-snug">{s.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <CertLightbox
        list={sorted}
        index={open}
        setIndex={setOpen}
      />
    </Section>
  );
}
