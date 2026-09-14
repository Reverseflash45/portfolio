"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { loader } from "@/content/data";

export default function Loader() {
  const { t } = useLang();
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let skip = false;
    try {
      skip = sessionStorage.getItem("seen-intro") === "1";
    } catch {}
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DUR = 1600;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1);
      // ease-out supaya terasa cepat di awal
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem("seen-intro", "1");
        } catch {}
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 260);
      }
    };
    const raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (!mounted || done) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg transition-opacity duration-300 ${
        pct >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, #5eead4 0%, transparent 70%)" }}
      />

      <p className="relative text-center text-2xl font-semibold tracking-tight md:text-4xl">
        {t(loader.line1)}
      </p>
      <p className="relative mt-1 bg-gradient-to-r from-accent to-fg bg-clip-text text-center text-2xl font-semibold tracking-tight text-transparent md:text-4xl">
        {t(loader.line2)}
      </p>

      <div className="relative mt-10 w-[min(78vw,420px)]">
        <div className="mb-2 flex items-baseline justify-between font-mono text-[11px] text-muted">
          <span className="uppercase tracking-[0.2em]">{t(loader.loading)}</span>
          <span className="text-accent">{pct}%</span>
        </div>
        <div className="h-px w-full bg-border">
          <div
            className="h-full bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
