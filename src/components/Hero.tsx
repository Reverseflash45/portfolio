"use client";

import { useLang } from "@/lib/i18n";
import { hero, profile, misc } from "@/content/data";
import Typing from "./Typing";
import HeroFigure from "./HeroFigure";

export default function Hero() {
  const { lang, t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 10%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 50% 10%, #000 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="w-full max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1 pl-2 pr-3 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-muted">{t(hero.status)}</span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t(hero.greeting)}
          </p>

          <h1 className="bg-gradient-to-br from-fg via-fg to-muted bg-clip-text text-4xl font-semibold leading-[1.03] tracking-tight text-transparent md:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 text-lg md:text-2xl">
            <Typing words={hero.roles[lang]} className="text-accent" />
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {t(hero.tagline)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              {t(hero.ctaPrimary)}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t(hero.ctaSecondary)}
            </a>
            {profile.cv && (
              <a
                href={profile.cv}
                className="px-2 py-2.5 text-sm text-muted underline underline-offset-4 transition-colors hover:text-accent"
              >
                {t(misc.downloadCV)}
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-xs text-muted">
            <span>{t(profile.location)}</span>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-accent"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <HeroFigure base={profile.photo} alt={profile.photoAlt} name={profile.name} />
      </div>
    </section>
  );
}
