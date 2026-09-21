"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Foto transparan. Saat kursor bergerak di atasnya — atau jari menekan dan
 * menggeser di layar sentuh — gambar alternatif tersingkap hanya di area
 * sekitar titik itu (mask radial mengikuti pointer).
 * Bagian bawah foto dibuat memudar agar menyatu dengan latar.
 */
export default function RevealPhoto({
  base,
  alt: altSrc,
  name,
  className = "",
}: {
  base: string;
  alt?: string;
  name: string;
  className?: string;
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

  const ikuti = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = wrap.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      // jari menutupi titik sentuhnya sendiri, jadi lingkarannya dibuat lebih besar
      const r = e.pointerType === "mouse" ? 24 : 32;
      setVars(((e.clientX - b.left) / b.width) * 100, ((e.clientY - b.top) / b.height) * 100, r);
    },
    [setVars]
  );

  const padam = useCallback(() => {
    setOn(false);
    setVars(50, 50, 0);
  }, [setVars]);

  return (
    <div
      ref={wrap}
      data-cursor="hot"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOn(true);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        ikuti(e);
        setOn(true);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse" || on) ikuti(e);
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== "mouse") padam();
      }}
      // browser mengambil alih sentuhan untuk menggulir halaman
      onPointerCancel={padam}
      onPointerLeave={padam}
      onContextMenu={(e) => {
        // tahan lama di ponsel memunculkan menu "simpan gambar"
        if (on) e.preventDefault();
      }}
      aria-label={name}
      className={`revealwrap relative ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-[6%_8%_4%_8%] rounded-full opacity-25 blur-[60px]"
        style={{ background: "radial-gradient(circle at 50% 55%, #5eead4 0%, transparent 68%)" }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base} alt={name} draggable={false} className="figbase relative w-full object-contain" />

      {altSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={altSrc}
          alt=""
          aria-hidden
          draggable={false}
          className={`figreveal absolute inset-0 h-full w-full object-contain ${on ? "is-on" : ""}`}
        />
      )}
    </div>
  );
}
