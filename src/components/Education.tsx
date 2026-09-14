"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { education } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

const KIND_STYLE: Record<string, { dot: string; text: string }> = {
  award: { dot: "#5eead4", text: "#5eead4" },
  course: { dot: "#93c5fd", text: "#93c5fd" },
  committee: { dot: "#fcd34d", text: "#fcd34d" },
};

export default function Education() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const certs = [...education.certificates].sort((a, b) =>
    String((b as { date?: string }).date ?? b.year).localeCompare(
      String((a as { date?: string }).date ?? a.year)
    )
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (open === null) return;
      if (e.key === "ArrowRight") setOpen((i) => ((i ?? 0) + 1) % certs.length);
      if (e.key === "ArrowLeft") setOpen((i) => ((i ?? 0) - 1 + certs.length) % certs.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, certs.length]);

  const current = open === null ? null : certs[open];

  return (
    <Section id="education" title={education.title}>
      <Reveal>
        <div className="mb-14 space-y-6">
          {education.schools.map((s) => (
            <div key={s.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-medium tracking-tight">{s.school}</h3>
                <span className="font-mono text-xs text-muted">{s.period}</span>
              </div>
              {t(s.degree) !== "—" && (
                <p className="mt-1 text-sm text-muted">{t(s.degree)}</p>
              )}
              {t(s.note) && (
                <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-accent">
                  <span aria-hidden className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {t(s.note)}
                </p>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {t(education.certLabel)}
        </h3>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => {
          const st = KIND_STYLE[c.kind] ?? KIND_STYLE.course;
          const kindLabel = t(
            education.certKinds[c.kind as keyof typeof education.certKinds]
          );
          const design = "designCard" in c && (c as { designCard?: boolean }).designCard;

          return (
            <Reveal key={i} delay={(i % 3) * 60}>
              <button
                onClick={() => setOpen(i)}
                className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors hover:border-accent/45"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-px opacity-70"
                  style={{ background: `linear-gradient(to right, ${st.dot}, transparent)` }}
                />

                {design ? (
                  /* kartu desain: hanya teks dari sertifikat, tanpa lambang penerbit */
                  <div className="relative flex aspect-[4/3] w-full flex-col justify-center overflow-hidden border-b border-border bg-bg px-5">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.16] blur-2xl"
                      style={{ background: st.dot }}
                    />
                    <p
                      className="relative font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: st.text }}
                    >
                      {kindLabel}
                    </p>
                    <p className="relative mt-2 text-base font-semibold leading-tight tracking-tight">
                      {t(c.name)}
                    </p>
                    <p className="relative mt-2 text-[11px] leading-snug text-muted">
                      {c.issuer}
                    </p>
                    <span
                      aria-hidden
                      className="relative mt-3 block h-px w-10"
                      style={{ background: st.dot, opacity: 0.55 }}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-bg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={t(c.name)}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: st.dot }}
                      />
                      <span
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: st.text }}
                      >
                        {kindLabel}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted">{c.year}</span>
                  </div>

                  {!design && (
                    <>
                      <p className="text-sm font-medium leading-snug tracking-tight">{t(c.name)}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{c.issuer}</p>
                    </>
                  )}
                  <p className={`${design ? "" : "mt-2 "}text-[11px] leading-relaxed text-muted/80`}>
                    {t(c.detail)}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
                    {t(education.certProof)}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>

      {current && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setOpen(null)}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent"
          >
            ✕
          </button>
          <div className="max-h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={t(current.name)}
                className="max-h-[72vh] w-full object-contain"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{t(current.name)}</p>
                <p className="text-xs text-muted">{current.issuer}</p>
              </div>
              <span className="font-mono text-xs text-accent">{current.year}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
