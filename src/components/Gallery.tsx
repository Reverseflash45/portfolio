"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

/** Carousel coverflow 3D. Slot kosong tampil sebagai placeholder bergaya. */
export default function Gallery() {
  const { t } = useLang();
  const items = gallery.items.length
    ? gallery.items
    : Array.from({ length: 5 }, () => null);
  const [i, setI] = useState(Math.floor(items.length / 2));

  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <Section id="gallery" title={gallery.title} subtitle={gallery.subtitle} wide>
      <Reveal>
        <div className="relative" style={{ perspective: "1400px" }}>
          <div className="relative mx-auto flex h-[clamp(15rem,34vw,25rem)] items-center justify-center">
            {items.map((it, idx) => {
              const off = idx - i;
              const abs = Math.abs(off);
              if (abs > 2) return null;
              return (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className="absolute h-full w-[clamp(13rem,28vw,22rem)] overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${off * 58}%) rotateY(${off * -26}deg) scale(${
                      1 - abs * 0.12
                    })`,
                    zIndex: 10 - abs,
                    opacity: 1 - abs * 0.25,
                    boxShadow: off === 0 ? "0 24px 60px rgba(0,0,0,0.55)" : "none",
                  }}
                >
                  {it ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.src}
                        alt={t(it.caption)}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      {off === 0 && (
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 text-left text-xs text-fg">
                          {t(it.caption)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="grid h-full w-full place-items-center border border-dashed border-border bg-bg">
                      <span className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-border">
                        {t(misc.slotImage)}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <div className="flex gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              →
            </button>
          </div>

          {!gallery.items.length && (
            <p className="mt-5 text-center text-xs text-muted">{t(gallery.empty)}</p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
