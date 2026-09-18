"use client";

import { useState } from "react";

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

type Status = "diam" | "mengirim" | "terkirim" | "gagal" | "kurang";

export default function Contact() {
  const { t } = useLang();
  const live = Boolean(contactForm.endpoint);
  const [status, setStatus] = useState<Status>("diam");

  /* Dikirim lewat fetch, bukan POST biasa: POST biasa melempar pengunjung ke
     halaman terima kasih milik penyedia form dan mereka harus menekan tombol
     kembali. Di sini mereka tetap di halaman ini dan langsung melihat hasilnya. */
  async function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!live || status === "mengirim") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // perangkap spam: kolom tersembunyi yang hanya diisi robot
    if ((data.get("_gotcha") as string)?.trim()) {
      setStatus("terkirim");
      form.reset();
      return;
    }
    if (!["name", "email", "message"].every((k) => (data.get(k) as string)?.trim())) {
      setStatus("kurang");
      return;
    }
    if (contactForm.accessKey) data.set("access_key", contactForm.accessKey);

    setStatus("mengirim");
    try {
      const r = await fetch(contactForm.endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("terkirim");
      form.reset();
    } catch {
      setStatus("gagal");
    }
  }

  return (
    <>
      <Section id="contact" title={contact.title} wide>
        <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          {/* form */}
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur md:p-7">
              <h3 className="text-xl font-semibold tracking-tight">{t(contactForm.formTitle)}</h3>
              <p className="mt-1.5 text-sm text-muted">{t(contact.body)}</p>

              <form onSubmit={kirim} noValidate className="mt-6 space-y-4">
                {/* perangkap spam — disembunyikan dari mata dan pembaca layar */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
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
                  disabled={!live || status === "mengirim"}
                  className={`w-full rounded-xl px-5 py-3 text-sm font-medium transition-opacity ${
                    live
                      ? "bg-accent text-bg hover:opacity-85"
                      : "cursor-not-allowed border border-dashed border-border text-muted"
                  }`}
                >
                  {status === "mengirim" ? t(contactForm.sending) : t(contactForm.submit)}
                </button>

                {/* satu tempat untuk semua pesan, dengan peran ARIA yang benar
                    supaya pembaca layar ikut mengumumkannya */}
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-[11px] leading-relaxed ${
                    status === "terkirim"
                      ? "text-accent"
                      : status === "gagal" || status === "kurang"
                        ? "text-red-400"
                        : "text-muted/80"
                  }`}
                >
                  {!live
                    ? t(contactForm.disabledNote)
                    : status === "terkirim"
                      ? t(contactForm.sent)
                      : status === "gagal"
                        ? t(contactForm.failed)
                        : status === "kurang"
                          ? t(contactForm.required)
                          : ""}
                </p>
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
