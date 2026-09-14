"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { nav, profile } from "@/content/data";

const links = [
  { href: "#about", label: nav.about },
  { href: "#portfolio", label: nav.portfolio },
  { href: "#education", label: nav.education },
  { href: "#contact", label: nav.contact },
];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* brand + kontrol, pojok atas */}
      <div className="fixed inset-x-0 top-0 z-50 px-6 py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <a
            href="#top"
            className="font-mono text-sm font-medium tracking-tight text-fg mix-blend-difference"
          >
            {profile.nickname.toLowerCase()}
            <span className="text-accent">.</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur transition-colors hover:border-accent hover:text-accent"
              aria-label="Switch language"
            >
              {lang === "id" ? "ID" : "EN"}
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur md:hidden"
              aria-label="Menu"
            >
              {open ? "\u2715" : "\u2630"}
            </button>
          </div>
        </div>
      </div>

      {/* pill nav mengapung di tengah atas */}
      <nav
        className={`fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border p-1 backdrop-blur-xl transition-all duration-300 md:flex ${
          scrolled
            ? "border-border bg-surface/80 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            : "border-border/60 bg-surface/50"
        }`}
      >
        {links.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
                isActive ? "text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-accent transition-all duration-300"
                />
              )}
              <span className="relative">{t(l.label)}</span>
            </a>
          );
        })}
      </nav>

      {open && (
        <nav className="fixed inset-x-0 top-14 z-40 mx-6 rounded-xl border border-border bg-surface/95 p-3 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                active === l.href.slice(1) ? "bg-accent/10 text-accent" : "text-muted"
              }`}
            >
              {t(l.label)}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}