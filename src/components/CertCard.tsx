"use client";

import { useLang } from "@/lib/i18n";
import { education } from "@/content/data";

const KIND_STYLE: Record<string, string> = {
  award: "#5eead4",
  course: "#93c5fd",
  committee: "#fcd34d",
};

type Cert = (typeof education.certificates)[number];

export default function CertCard({
  cert: c,
  onOpen,
}: {
  cert: Cert;
  onOpen: () => void;
}) {
  const { t } = useLang();
  const color = KIND_STYLE[c.kind] ?? KIND_STYLE.course;
  const design = "designCard" in c && (c as { designCard?: boolean }).designCard;
  const kindLabel = t(education.certKinds[c.kind as keyof typeof education.certKinds]);

  return (
    <button
      onClick={onOpen}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-surface/70 text-left backdrop-blur transition-colors hover:border-accent/45"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-px opacity-70"
        style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
      />

      {design ? (
        <div className="relative flex aspect-[4/3] w-full flex-col justify-center overflow-hidden border-b border-border bg-bg px-5">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e9eaec 1px, transparent 1px), linear-gradient(to bottom, #e9eaec 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-[0.16] blur-2xl"
            style={{ background: color }}
          />
          <p
            className="relative font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color }}
          >
            {kindLabel}
          </p>
          <p className="relative mt-2 text-base font-semibold leading-tight tracking-tight">
            {t(c.name)}
          </p>
          <p className="relative mt-2 text-[11px] leading-snug text-muted">{c.issuer}</p>
          <span
            aria-hidden
            className="relative mt-3 block h-px w-10"
            style={{ background: color, opacity: 0.55 }}
          />
        </div>
      ) : (
        <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            alt={t(c.name)}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color }}
            >
              {kindLabel}
            </span>
          </span>
          <span className="font-mono text-xs text-muted">{c.year}</span>
        </div>

        {!design && (
          <>
            <p className="text-sm font-medium leading-snug tracking-tight">{t(c.name)}</p>
            <p className="mt-1 text-xs leading-snug text-muted">{c.issuer}</p>
          </>
        )}
        <p className={`${design ? "" : "mt-2 "}text-[11px] leading-relaxed text-muted/80`}>
          {t(c.detail)}
        </p>

        <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
          {t(education.certProof)}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </button>
  );
}
