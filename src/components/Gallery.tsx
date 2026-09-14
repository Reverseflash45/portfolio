"use client";

import { useCallback, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { gallery, misc } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

/** Carousel coverflow 3D: digeser dengan kursor/sentuhan, melingkar tanpa ujung. */
export default function Gallery() {
  const { t } = useLang();
  const items = gallery.items.length ? gallery.items : Array.from({ length: 5 }, () => null);
  const n = items.length;

  const [i, setI] = useState(0);
  const [drag, setDrag] = useState(0); // dalam satuan slot, bukan piksel
  const [grabbing, setGrabbing] = useState(false);
  const start = useRef<{ x: number; slot: number } | null>(null);
  const moved = useRef(false);
  const track = useRef<HTMLDivElement>(null);

  const norm = useCallback((v: number) => ((v % n) + n) % n, [n]);
  const go = useCallback((d: number) => setI((v) => norm(v + d)), [norm]);

  // jarak melingkar terpendek, dihitung SETELAH geseran ikut ditambahkan —
  // kalau di-wrap sebelum drag, kartu yang masuk dari sisi berlawanan ikut terpotong
  const wrapOff = (idx: number, extra: number) => {
    let d = idx - i + extra;
    while (d > n / 2) d -= n;
    while (d < -n / 2) d += n;
    return d;
  };

  // lebar satu slot = jarak antar kartu di layar (persen translate x lebar kartu)
  const slotPx = () => {
    const card = track.current?.querySelector("button");
    const w = card?.clientWidth ?? 320;
    return w * 0.56;
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    start.current = { x: e.clientX, slot: slotPx() };
    moved.current = false;
    setGrabbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > 5) moved.current = true;
    setDrag(dx / start.current.slot);
  };

  const onUp = () => {
    if (!start.current) return;
    // kartu yang terlihat di tengah saat ini adalah (i - drag) — pakai itu
    // supaya lepasan mendarat tepat di foto yang sedang dilihat
    let slots = Math.round(drag);
    if (slots === 0 && Math.abs(drag) > 0.22) slots = Math.sign(drag);
    if (slots !== 0) setI((v) => norm(v - slots));
    start.current = null;
    setGrabbing(false);
    setDrag(0);
  };

  return (
    <Section id="gallery" title={gallery.title} subtitle={gallery.subtitle} wide>
      <Reveal>
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative touch-pan-y select-none ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
          style={{ perspective: "1500px" }}
        >
          <div
            ref={track}
            className="relative mx-auto flex h-[clamp(16rem,38vw,28rem)] items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((it, idx) => {
              const off = wrapOff(idx, drag);
              const abs = Math.abs(off);
              if (abs > 2.4) return null;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!moved.current) setI(idx);
                  }}
                  aria-label={`Slide ${idx + 1}`}
                  className="absolute h-full w-[clamp(13rem,29vw,24rem)] overflow-hidden rounded-2xl border border-border bg-surface"
                  style={{
                    transform: `translateX(${off * 56}%) rotateY(${off * -22}deg) scale(${Math.max(
                      0.7,
                      1 - abs * 0.1
                    )})`,
                    zIndex: 20 - Math.round(abs * 4),
                    opacity: Math.max(0, 1 - abs * 0.3),
                    boxShadow: abs < 0.4 ? "0 30px 70px rgba(0,0,0,0.6)" : "none",
                    transition: grabbing
                      ? "none"
                      : "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease-out",
                  }}
                >
                  {it ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.src}
                      alt={t(it.caption)}
                      loading="lazy"
                      draggable={false}
                      className="pointer-events-none h-full w-full object-cover"
                    />
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
