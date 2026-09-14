"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { projects } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Projects() {
  const { t } = useLang();

  return (
    <Section id="projects" title={projects.title} subtitle={projects.subtitle}>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.items.map((p, i) => (
          <Reveal key={i} delay={i * 70}>
            <article className="group h-full overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40">
              {p.image && (
                <div className="relative aspect-[16/9] w-full border-b border-border">
                  <Image src={p.image} alt={t(p.title)} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <span
                  className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
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
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(p.desc)}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li key={tag} className="font-mono text-[11px] text-muted">
                      #{tag}
                    </li>
                  ))}
                </ul>

                {(p.repo || p.demo) && (
                  <div className="mt-4 flex gap-4 font-mono text-xs">
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
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
