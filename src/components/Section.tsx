"use client";

import { useLang } from "@/lib/i18n";
import type { T } from "@/content/data";
import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  subtitle,
  children,
  wide = false,
}: {
  id: string;
  title: T;
  subtitle?: T;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const { t } = useLang();
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border/60 px-6 pb-16 pt-20 md:scroll-mt-28 md:pb-28 md:pt-28"
    >
      <div className={`mx-auto w-full ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
        <Reveal>
          <div className="mb-9 text-center md:mb-16">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {id}
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight sm:text-3xl md:text-5xl">{t(title)}</h2>
            {subtitle && (
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted">{t(subtitle)}</p>
            )}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
