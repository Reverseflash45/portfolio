"use client";

import { useLang } from "@/lib/i18n";
import { hero, profile } from "@/content/data";
import Typing from "./Typing";
import MusicCard from "./MusicCard";
import BrandIcon from "./BrandIcon";

const SLUG: Record<string, string> = {
  GitHub: "github",
  LinkedIn: "linkedin",
  Instagram: "instagram",
};

export default function Hero() {
  const { lang, t } = useLang();
  const [l1, l2] = hero.headline[lang];

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 75% 55% at 50% 10%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 55% at 50% 10%, #000 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1 pl-2 pr-3 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-muted">{t(hero.status)}</span>
          </div>

          <h1 className="text-[2.1rem] font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-7xl">
            <span className="block text-accent">{l1}</span>
            <span className="block">{l2}</span>
          </h1>

          <p className="mt-6 font-mono text-base text-fg md:text-lg">
            <Typing words={hero.roles[lang]} />
          </p>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {t(hero.tagline)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              {t(hero.ctaPrimary)}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t(hero.ctaSecondary)}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t(profile.location)}
            </span>
            <span aria-hidden className="hidden h-px w-8 bg-border sm:block" />
            <div className="flex gap-2.5">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface/60 text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
                >
                  <BrandIcon slug={SLUG[s.label]} name={s.label} color="#8b8f99" className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-center md:justify-end">
          <MusicCard />
        </div>
      </div>
    </section>
  );
}
