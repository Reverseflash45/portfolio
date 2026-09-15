"use client";

import { useLang } from "@/lib/i18n";
import { contact, contactForm, profile, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";
import BrandIcon from "./BrandIcon";

const SLUG: Record<string, string> = {
  GitHub: "github",
  LinkedIn: "linkedin",
  Instagram: "instagram",
};

const SUB: Record<string, string> = {
  GitHub: "Reverseflash45",
  LinkedIn: "rafi-fernandito-setiawan",
  Instagram: "@raffstw",
};

export default function Contact() {
  const { t } = useLang();
  const live = Boolean(contactForm.endpoint);

  return (
    <>
      <Section id="contact" title={contact.title} wide>
        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* form */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur md:p-7">
              <h3 className="text-xl font-semibold tracking-tight">{t(contactForm.formTitle)}</h3>
              <p className="mt-1.5 text-sm text-muted">{t(contact.body)}</p>

              <form
                action={contactForm.endpoint || undefined}
                method={live ? "POST" : undefined}
                onSubmit={live ? undefined : (e) => e.preventDefault()}
                className="mt-6 space-y-4"
              >
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t(contactForm.name)}
                  </label>
                  <input
                    name="name"
                    placeholder={t(contactForm.namePh)}
                    className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t(contactForm.email)}
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder={t(contactForm.emailPh)}
                    className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {t(contactForm.message)}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t(contactForm.messagePh)}
                    className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-muted/70 focus:border-accent/60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!live}
                  className={`w-full rounded-xl px-5 py-3 text-sm font-medium transition-opacity ${
                    live
                      ? "bg-accent text-bg hover:opacity-85"
                      : "cursor-not-allowed border border-dashed border-border text-muted"
                  }`}
                >
                  {t(contactForm.submit)}
                </button>

                {!live && (
                  <p className="text-[11px] leading-relaxed text-muted/80">
                    {t(contactForm.disabledNote)}
                  </p>
                )}
              </form>

              <a
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
              >
                {profile.email} ↗
              </a>
            </div>
          </Reveal>

          {/* find me */}
          <Reveal delay={70}>
            <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur md:p-7">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                {t(contactForm.findMe)}
              </h3>
              <div className="mt-5 space-y-3">
                {profile.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-border bg-bg px-4 py-3.5 transition-colors hover:border-accent/50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border transition-colors group-hover:border-accent">
                      <BrandIcon slug={SLUG[s.label]} name={s.label} color="#8b8f99" className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{s.label}</span>
                      <span className="block truncate text-xs text-muted">
                        {SUB[s.label] ?? ""}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>{t(misc.rights)}</span>
        </div>
      </footer>
    </>
  );
}
