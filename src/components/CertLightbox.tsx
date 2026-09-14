"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { education } from "@/content/data";

type Cert = (typeof education.certificates)[number];

export default function CertLightbox({
  list,
  index,
  setIndex,
}: {
  list: Cert[];
  index: number | null;
  setIndex: (i: number | null) => void;
}) {
  const { t } = useLang();

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((index + 1) % list.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, list.length, setIndex]);

  if (index === null) return null;
  const c = list[index];
  if (!c) return null;

  return (
    <div
      onClick={() => setIndex(null)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm"
    >
      <button
        onClick={() => setIndex(null)}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted hover:border-accent hover:text-accent"
      >
        ✕
      </button>
      <div className="max-h-full w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            alt={t(c.name)}
            className="max-h-[72vh] w-full object-contain"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-sm font-medium">{t(c.name)}</p>
            <p className="text-xs text-muted">{c.issuer}</p>
          </div>
          <span className="font-mono text-xs text-accent">{c.year}</span>
        </div>
      </div>
    </div>
  );
}
