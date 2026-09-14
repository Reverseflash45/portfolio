"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Foto transparan di hero. Saat kursor bergerak di atas foto, gambar
 * alternatif tersingkap hanya di area sekitar kursor (mask radial yang
 * mengikuti pointer). Memakai <img> biasa, bukan next/image, supaya
 * tidak melewati image optimizer.
 */
export default function HeroFigure({
  base,
  alt: altSrc,
  name,
}: {
  base: string;
  alt?: string;
  name: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  const setVars = useCallback((x: number, y: number, r: number) => {
    const el = wrap.current;
    if (!el) return;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    el.style.setProperty("--mr", `${r}%`);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrap.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      setVars(((e.clientX - b.left) / b.width) * 100, ((e.clientY - b.top) / b.height) * 100, 24);
    },
    [setVars]
  );

  const onEnter = useCallback(() => setOn(true), []);
  const onLeave = useCallback(() => {
    setOn(false);
    setVars(50, 50, 0);
  }, [setVars]);

  return (
    <div
      ref={wrap}
      data-cursor="hot"
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={name}
      className="revealwrap relative aspect-square w-[min(78vw,420px)] shrink-0 md:w-[440px]"
    >
      <span
        aria-hidden
        className="absolute inset-[10%_12%_8%_12%] rounded-full opacity-20 blur-[54px]"
        style={{ background: "radial-gradient(circle at 50% 55%, #5eead4 0%, transparent 68%)" }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt={name} className="figbase relative h-full w-full object-contain" />

      {altSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={altSrc}
          alt=""
          aria-hidden
          className={`figreveal absolute inset-0 h-full w-full object-contain ${
            on ? "is-on" : ""
          }`}
        />
      )}
    </div>
  );
}
