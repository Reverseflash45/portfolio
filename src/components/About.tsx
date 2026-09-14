"use client";

import { useLang } from "@/lib/i18n";
import { about, profile } from "@/content/data";
import RevealPhoto from "./RevealPhoto";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const { lang, t } = useLang();

  return (
    <Section id="about" title={about.title} wide>
      <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr_0.9fr] md:gap-4">
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
              {profile.cv && (
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
                >
                  {t(about.ctaResume)}
                </a>
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
          <RevealPhoto
            base={profile.photo}
            alt={profile.photoAlt}
            name={profile.name}
            className="mx-auto w-[min(86vw,420px)] md:w-[460px]"
          />
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

    </Section>
  );
}
