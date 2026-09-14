"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { education, experience } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

const DOT: Record<string, string> = { org: "#fcd34d", award: "#5eead4" };

export default function EduExp() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | "org" | "award">("all");
  const items = experience.items.filter((e) => filter === "all" || e.kind === filter);
  const tabs: ("all" | "org" | "award")[] = ["all", "org", "award"];

  return (
    <Section id="education" title={education.title}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {/* Pendidikan */}
        <div>
          <Reveal>
            <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {t(education.eduLabel)}
            </h3>
          </Reveal>
          <div className="space-y-3">
            {education.schools.map((s, i) => (
              <Reveal key={s.school} delay={i * 60}>
                <div className="rounded-xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent/35">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-base font-medium tracking-tight">{s.school}</h4>
                    <span className="font-mono text-xs text-accent">{s.period}</span>
                  </div>
                  {t(s.degree) !== "—" && (
                    <p className="mt-1 text-sm text-muted">{t(s.degree)}</p>
                  )}
                  {t(s.note) && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {t(s.note)}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Pengalaman */}
        <div>
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {t(experience.title)}
              </h3>
              <div className="flex gap-1.5">
                {tabs.map((k) => (
                  <button
                    key={k}
                    onClick={() => setFilter(k)}
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                      filter === k
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted hover:text-fg"
                    }`}
                  >
                    {t(experience.filters[k])}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-3">
            {items.map((e, i) => (
              <Reveal key={`${e.org}-${i}`} delay={i * 55}>
                <div className="rounded-xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent/35">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="flex items-center gap-2 text-sm font-medium tracking-tight">
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: DOT[e.kind] }}
                      />
                      {t(e.role)}
                    </h4>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="mt-1 pl-3.5 text-xs text-accent">{e.org}</p>
                  <p className="mt-2 pl-3.5 text-xs leading-relaxed text-muted">{t(e.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
