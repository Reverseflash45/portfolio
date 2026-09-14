"use client";

import { useCallback, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

/** Carousel coverflow 3D: bisa digeser dengan kursor/sentuhan, dan looping. */
export default function Gallery() {
  const { t } = useLang();
  const items = gallery.items.length ? gallery.items : Array.from({ length: 5 }, () => null);
  const n = items.length;

  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0);
  const down = useRef<{ x: number; w: number } | null>(null);
  const moved = useRef(false);

  const go = useCallback((d: number) => setI((v) => (v + d + n * 10) % n), [n]);

  // jarak terpendek melingkar: -n/2 .. n/2, supaya kartu bisa muncul dari dua sisi
  const wrapOff = (idx: number) => {
    let d = idx - i;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    down.current = { x: e.clientX, w: e.currentTarget.clientWidth };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!down.current) return;
    const dx = e.clientX - down.current.x;
    if (Math.abs(dx) > 5) moved.current = true;
    setDrag(dx);
  };

  const onUp = () => {
    if (!down.current) return;
    const dx = drag;
    const threshold = Math.min(90, down.current.w * 0.08);
    if (dx <= -threshold) go(1);
    else if (dx >= threshold) go(-1);
    down.current = null;
    setDrag(0);
  };

  // geser 1 slot penuh kira-kira 260px
  const dragSlots = drag / 260;

  return (
    <Section id="gallery" title={gallery.title} subtitle={gallery.subtitle} wide>
      <Reveal>
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative touch-pan-y select-none ${down.current ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ perspective: "1400px" }}
        >
          <div className="relative mx-auto flex h-[clamp(15rem,34vw,25rem)] items-center justify-center overflow-hidden">
            {items.map((it, idx) => {
              const off = wrapOff(idx) + dragSlots;
              const abs = Math.abs(off);
              if (abs > 2.6) return null;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!moved.current) setI(idx);
                  }}
                  aria-label={`Slide ${idx + 1}`}
                  className="absolute h-full w-[clamp(13rem,28vw,22rem)] overflow-hidden rounded-2xl border border-border bg-surface"
                  style={{
                    transform: `translateX(${off * 58}%) rotateY(${off * -26}deg) scale(${Math.max(
                      0.6,
                      1 - abs * 0.12
                    )})`,
                    zIndex: 10 - Math.round(abs),
                    opacity: Math.max(0, 1 - abs * 0.3),
                    boxShadow: abs < 0.35 ? "0 24px 60px rgba(0,0,0,0.55)" : "none",
                    transition: down.current ? "none" : "transform 0.5s ease-out, opacity 0.5s ease-out",
                  }}
                >
                  {it ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.src}
                        alt={t(it.caption)}
                        loading="lazy"
                        draggable={false}
                        className="pointer-events-none h-full w-full object-cover"
                      />
                      {abs < 0.35 && (
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
