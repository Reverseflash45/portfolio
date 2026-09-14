"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { education, experience } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";
import Logo from "./Logo";

const DOT: Record<string, string> = { org: "#fcd34d", award: "#5eead4" };

export default function EduExp() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | "org" | "award">("all");
  const items = experience.items.filter((e) => filter === "all" || e.kind === filter);
  const tabs: ("all" | "org" | "award")[] = ["all", "org", "award"];

  return (
    <Section id="education" title={education.title} wide>
      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {/* Pendidikan */}
        <div>
          <Reveal>
            <h3 className="mb-6 text-2xl font-semibold tracking-tight">
              {t(education.eduLabel)}
            </h3>
          </Reveal>
          <div className="space-y-4">
            {education.schools.map((s, i) => (
              <Reveal key={s.school} delay={i * 60}>
                <div className="rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent/40">
                  <div className="flex items-start gap-4">
                    <Logo src={(s as { logo?: string }).logo} name={s.school} />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-medium tracking-tight">{s.school}</h4>
                      {t(s.degree) !== "—" && (
                        <p className="mt-0.5 text-sm text-muted">{t(s.degree)}</p>
                      )}
                      <p className="mt-1 font-mono text-xs text-accent">{s.period}</p>
                      {t(s.note) && (
                        <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-muted">
                          <span
                            aria-hidden
                            className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          {t(s.note)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Pengalaman */}
        <div>
          <Reveal>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold tracking-tight">{t(experience.title)}</h3>
              <div className="flex gap-1.5">
                {tabs.map((k) => (
                  <button
                    key={k}
                    onClick={() => setFilter(k)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition-colors ${
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

          <div className="max-h-[30rem] space-y-4 overflow-y-auto pr-1.5">
            {items.map((e, i) => (
              <Reveal key={`${e.org}-${i}`} delay={i * 55}>
                <div className="rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent/40">
                  <div className="flex items-start gap-4">
                    <Logo src={e.logo} name={e.org} />
                    <div className="min-w-0 flex-1">
                      <h4 className="flex items-center gap-2 text-sm font-medium tracking-tight">
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: DOT[e.kind] }}
                        />
                        {t(e.role)}
                      </h4>
                      <p className="mt-1 text-xs leading-snug text-accent">{e.org}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{e.period}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted">{t(e.desc)}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
