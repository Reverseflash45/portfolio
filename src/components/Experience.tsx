"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { experience } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

type Filter = "all" | "org" | "award";

export default function Experience() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const items = experience.items.filter((e) => filter === "all" || e.kind === filter);
  const tabs: Filter[] = ["all", "org", "award"];

  return (
    <Section id="experience" title={experience.title}>
      <Reveal>
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                filter === k
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-fg"
              }`}
            >
              {t(experience.filters[k])}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="relative border-l border-border pl-6">
        {items.map((e, i) => (
          <Reveal key={`${e.org}-${i}`} delay={i * 70}>
            <div className="relative pb-9 last:pb-0">
              <span className="absolute -left-[1.9rem] top-1.5 h-2 w-2 rounded-full bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-medium tracking-tight">{t(e.role)}</h3>
                <span className="font-mono text-xs text-muted">{e.period}</span>
              </div>
              <p className="mt-0.5 text-sm text-accent">{e.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(e.desc)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
