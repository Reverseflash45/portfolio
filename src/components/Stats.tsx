"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { stats, projects, education } from "@/content/data";

function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 900, 1);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{n}</span>;
}

export default function Stats() {
  const { t } = useLang();
  const certs = education.certificates;
  const items = [
    {
      n: projects.items.length,
      label: t(stats.projects),
      note: t(stats.projectsNote),
      icon: "</>",
      color: "#5eead4",
    },
    {
      n: certs.filter((c) => c.kind !== "award").length,
      label: t(stats.certificates),
      note: t(stats.certificatesNote),
      icon: "✦",
      color: "#93c5fd",
    },
    {
      n: certs.filter((c) => c.kind === "award").length,
      label: t(stats.awards),
      note: t(stats.awardsNote),
      icon: "★",
      color: "#fcd34d",
    },
  ];

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4 px-6 sm:grid-cols-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="group relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur transition-colors hover:border-accent/40"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px opacity-70"
            style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)` }}
          />
          <div className="flex items-start justify-between">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl border border-border font-mono text-sm"
              style={{ color: s.color }}
            >
              {s.icon}
            </span>
            <span className="text-4xl font-semibold tracking-tight md:text-5xl">
              <Counter to={s.n} />
            </span>
          </div>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-fg">{s.label}</p>
          <p className="mt-1 text-xs text-muted">{s.note}</p>
        </div>
      ))}
    </div>
  );
}
