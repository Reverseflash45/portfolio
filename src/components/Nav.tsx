"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { nav, profile } from "@/content/data";

const links = [
  { href: "#about", label: nav.about },
  { href: "#projects", label: nav.projects },
  { href: "#experience", label: nav.experience },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight">
          {profile.nickname.toLowerCase()}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors hover:text-fg ${
                active === l.href.slice(1) ? "text-fg" : "text-muted"
              }`}
            >
              {t(l.label)}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                  active === l.href.slice(1) ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            aria-label="Switch language"
          >
            {lang === "id" ? "ID" : "EN"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-bg px-6 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted hover:text-fg"
            >
              {t(l.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
