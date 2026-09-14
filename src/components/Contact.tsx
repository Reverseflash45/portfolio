"use client";

import { useLang } from "@/lib/i18n";
import { contact, profile, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useLang();

  return (
    <>
      <Section id="contact" title={contact.title}>
        <Reveal>
          <p className="max-w-lg text-sm leading-relaxed text-muted md:text-base">
            {t(contact.body)}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-7 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            {t(contact.cta)}
          </a>
          <div className="mt-8 flex flex-wrap gap-5 font-mono text-xs text-muted">
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </Section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{t(misc.rights)}</span>
        </div>
      </footer>
    </>
  );
}
