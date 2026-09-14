"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { hero, profile, misc } from "@/content/data";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-32 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.13] blur-[120px]"
        style={{ background: "radial-gradient(circle, #5eead4 0%, transparent 70%)" }}
      />
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-2 pr-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] text-muted">{t(hero.status)}</span>
          </div>

          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {t(hero.greeting)}
          </p>
          <h1 className="bg-gradient-to-br from-fg via-fg to-muted bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tight text-transparent md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">{t(profile.role)}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
            {t(hero.tagline)}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
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
                className="rounded-full px-2 py-2.5 text-sm text-muted underline underline-offset-4 transition-colors hover:text-accent"
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

        <div className="relative shrink-0">
          <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface md:h-52 md:w-52">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="208px"
                className="object-cover"
                priority
              />
            ) : (
              <span className="font-mono text-5xl text-border select-none md:text-6xl">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
