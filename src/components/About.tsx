"use client";

import { useLang } from "@/lib/i18n";
import { about, skills, profile, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const { lang, t } = useLang();

  return (
    <Section id="about" title={about.title}>
      <div className="grid items-start gap-10 md:grid-cols-2">
        <Reveal>
          <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {about.body[lang].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              {t(about.ctaProjects)}
            </a>
            {profile.cv && (
              <a
                href={profile.cv}
                className="rounded-full border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent"
              >
                {t(misc.downloadCV)}
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-7">
            {skills.groups.map((g) => (
              <div key={g.label.en}>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-fg">
                  {t(g.label)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-border bg-surface/70 px-2.5 py-1 text-xs text-muted backdrop-blur"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
