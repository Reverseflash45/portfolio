"use client";

import { useLang } from "@/lib/i18n";
import { hero, profile } from "@/content/data";
import Typing from "./Typing";
import MusicCard from "./MusicCard";

const ICON: Record<string, string> = {
  GitHub:
    "M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.88 1.55 2.3 1.1 2.87.85.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.700 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.26C22 6.58 17.52 2 12 2z",
  LinkedIn:
    "M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0zM3.3 8.98h3.4V21H3.3V8.98zm5.7 0h3.26v1.64h.05c.45-.86 1.56-1.77 3.2-1.77 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.98c0-1.43-.03-3.26-1.99-3.26-1.99 0-2.29 1.55-2.29 3.15V21H9V8.98z",
  Instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.65.51.72.28 1.33.66 1.94 1.27.61.61.99 1.22 1.27 1.94.27.69.46 1.48.51 2.65.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.51 2.65a5.37 5.37 0 0 1-1.27 1.94c-.61.61-1.22.99-1.94 1.27-.69.27-1.48.46-2.65.51-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.65-.51a5.37 5.37 0 0 1-1.94-1.27 5.37 5.37 0 0 1-1.27-1.94c-.27-.69-.46-1.48-.51-2.65C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.24-1.96.51-2.65.28-.72.66-1.33 1.27-1.94A5.37 5.37 0 0 1 5.95 1.3c.69-.27 1.48-.46 2.65-.51C9.87 2.17 10.25 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-.95.04-1.5.2-1.86.34-.45.17-.78.38-1.12.72-.34.34-.55.67-.72 1.12-.14.36-.3.91-.34 1.86-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.4.95.2 1.5.34 1.86.17.45.38.78.72 1.12.34.34.67.55 1.12.72.36.14.91.3 1.86.34 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.95-.04 1.5-.2 1.86-.34.45-.17.78-.38 1.12-.72.34-.34.55-.67.72-1.12.14-.36.3-.91.34-1.86.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.95-.2-1.5-.34-1.86a3.02 3.02 0 0 0-.72-1.12 3.02 3.02 0 0 0-1.12-.72c-.36-.14-.91-.3-1.86-.34-1.24-.06-1.59-.07-4.74-.07zM12 6.87a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26zm0 8.46a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66zm6.54-8.66a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z",
};

export default function Hero() {
  const { lang, t } = useLang();
  const [l1, l2] = hero.headline[lang];

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-36 md:pb-28 md:pt-44">
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

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 py-1 pl-2 pr-3 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-muted">{t(hero.status)}</span>
          </div>

          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
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

          <div className="mt-10 flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {t(profile.location)}
            </span>
            <span aria-hidden className="h-px w-8 bg-border" />
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
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                    <path d={ICON[s.label] ?? ICON.GitHub} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <MusicCard />
        </div>
      </div>
    </section>
  );
}
