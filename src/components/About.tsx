"use client";

import { useLang } from "@/lib/i18n";
import { about, skills } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const { lang, t } = useLang();

  return (
    <Section id="about" title={about.title}>
      <Reveal>
        <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
          {about.body[lang].map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {skills.groups.map((g) => (
            <div key={g.label.en}>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-fg">
                {t(g.label)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
