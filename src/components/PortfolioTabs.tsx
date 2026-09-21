"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { portfolioSection, projects, education, techStack, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";
import CertCard from "./CertCard";
import CertLightbox from "./CertLightbox";
import BrandIcon from "./BrandIcon";

type Tab = "projects" | "certificates" | "awards" | "stack";

/* Jumlah proyek yang tampil sebelum tombol "lihat semua". Tiga = satu baris
   di layar lebar, dan menahan section ini tetap pendek di ponsel. */
const BATAS_PROYEK = 3;
// deskripsi di atas panjang ini dipotong jadi 3 baris dengan tombol baca
const DESKRIPSI_PANJANG = 180;

const TABS: { key: Tab; icon: string }[] = [
  { key: "projects", icon: "</>" },
  { key: "certificates", icon: "✦" },
  { key: "awards", icon: "★" },
  { key: "stack", icon: "◈" },
];

export default function PortfolioTabs() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("projects");
  const [open, setOpen] = useState<number | null>(null);
  const [semuaProyek, setSemuaProyek] = useState(false);
  const [terbuka, setTerbuka] = useState<Set<number>>(new Set());

  const proyekTampil = semuaProyek ? projects.items : projects.items.slice(0, BATAS_PROYEK);
  const sisaProyek = projects.items.length - BATAS_PROYEK;

  function aturDeskripsi(i: number) {
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
        <div className="mb-10 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-surface/60 p-1.5 backdrop-blur sm:grid-cols-4">
          {TABS.map((tb) => {
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

      {tab === "projects" && (
        <>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proyekTampil.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 70}>
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
                <span
                  className={`mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
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

                <h3 className="text-base font-medium tracking-tight">{t(p.title)}</h3>
                <div className="mt-2 flex-1">
                  <p
                    className={`text-sm leading-relaxed text-muted ${
                      terbuka.has(i) ? "" : "line-clamp-3"
                    }`}
                  >
                    {t(p.desc)}
                  </p>
                  {t(p.desc).length > DESKRIPSI_PANJANG && (
                    <button
                      type="button"
                      onClick={() => aturDeskripsi(i)}
                      aria-expanded={terbuka.has(i)}
                      className="mt-1.5 font-mono text-[11px] text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {terbuka.has(i) ? t(projects.readLess) : t(projects.readMore)}
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
          ))}
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

      {(tab === "certificates" || tab === "awards") && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Reveal key={`${tab}-${i}`} delay={(i % 3) * 60}>
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
