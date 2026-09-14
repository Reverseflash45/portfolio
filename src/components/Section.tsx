"use client";

import { useLang } from "@/lib/i18n";
import type { T } from "@/content/data";
import Reveal from "./Reveal";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: T;
  subtitle?: T;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  return (
    <section id={id} className="scroll-mt-24 border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto w-full max-w-4xl">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {id}
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t(title)}</h2>
            {subtitle && <p className="mt-2 text-sm text-muted">{t(subtitle)}</p>}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
