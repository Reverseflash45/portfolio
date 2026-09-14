"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { portfolioSection, projects, education, techStack } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";
import CertCard from "./CertCard";
import CertLightbox from "./CertLightbox";

type Tab = "projects" | "certificates" | "awards" | "stack";

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
    <Section id="portfolio" title={portfolioSection.title}>
      <Reveal>
        <div className="mb-10 grid grid-cols-2 gap-1 rounded-2xl border border-border bg-surface/60 p-1.5 backdrop-blur sm:grid-cols-4">
          {TABS.map((tb) => {
            const on = tab === tb.key;
            return (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl px-3 py-3.5 transition-colors ${
                  on ? "bg-accent/10 text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <span className="font-mono text-sm">{tb.icon}</span>
                <span className="text-xs font-medium">
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
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.items.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent/40">
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
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(p.desc)}</p>

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
              </article>
            </Reveal>
          ))}
        </div>
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
                <span
                  aria-hidden
                  className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${s.color} 0%, transparent 72%)`,
                    boxShadow: `inset 0 0 0 1px ${s.color}55`,
                  }}
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
