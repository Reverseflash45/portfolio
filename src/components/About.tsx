"use client";

import { useLang } from "@/lib/i18n";
import { about, skills, profile, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const { lang, t } = useLang();

  return (
    <Section id="about" title={about.title} wide>
      <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        {/* kiri: nama besar + tombol */}
        <Reveal>
          <div className="text-center md:text-left">
            <p className="text-3xl font-semibold leading-tight tracking-tight text-accent md:text-4xl">
              {t(about.heading)}
            </p>
            <p className="mt-1 text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {profile.name}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
              {profile.cv ? (
                <a
                  href={profile.cv}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  {t(about.ctaResume)}
                </a>
              ) : (
                <span
                  title="Taruh CV di /public/cv.pdf lalu isi profile.cv di data.ts"
                  className="cursor-default rounded-full border border-dashed border-border px-5 py-2.5 text-sm text-muted"
                >
                  {t(about.ctaResume)} — {t(misc.slotCv)}
                </span>
              )}
              <a
                href="#portfolio"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
              >
                {t(about.ctaProjects)}
              </a>
            </div>
          </div>
        </Reveal>

        {/* tengah: foto */}
        <Reveal delay={60}>
          <div className="relative mx-auto w-[min(70vw,300px)] md:w-[320px]">
            <span
              aria-hidden
              className="absolute inset-[8%_10%_6%_10%] rounded-full opacity-20 blur-[48px]"
              style={{
                background: "radial-gradient(circle at 50% 55%, #5eead4 0%, transparent 68%)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative w-full object-contain"
              style={{ filter: "drop-shadow(0 20px 34px rgba(0,0,0,0.55))" }}
            />
          </div>
        </Reveal>

        {/* kanan: paragraf */}
        <Reveal delay={120}>
          <div className="space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {about.body[lang].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* skills sebagai baris di bawah */}
      <Reveal delay={80}>
        <div className="mt-16 grid gap-8 border-t border-border/60 pt-12 sm:grid-cols-3">
          {skills.groups.map((g) => (
            <div key={g.label.en}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
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
    </Section>
  );
}
