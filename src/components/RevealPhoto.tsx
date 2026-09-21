"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Foto transparan. Saat kursor bergerak di atasnya — atau jari menahan lalu
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

  const padam = useCallback(() => {
    setOn(false);
    setVars(50, 50, 0);
  }, [setVars]);

  const ikuti = useCallback(
    (x: number, y: number, r: number) => {
      const el = wrap.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      setVars(((x - b.left) / b.width) * 100, ((y - b.top) / b.height) * 100, r);
    },
    [setVars]
  );

  /* Layar sentuh. Menggeser foto dan menggulir halaman memakai gerakan yang
     sama, jadi keduanya dibedakan lewat waktu: jari yang ditahan sebentar
     sebelum bergerak menyingkap foto dan mengunci gulir; sapuan cepat tetap
     menggulir halaman. Listener dipasang manual karena React memasang
     touchmove sebagai passive, sehingga preventDefault diabaikan. */
  useEffect(() => {
    const el = wrap.current;
    if (!el || !altSrc) return;

    const TAHAN_MS = 150;
    const AMBANG_GESER = 10; // px; bergerak lebih jauh sebelum TAHAN_MS = menggulir
    const RADIUS_JARI = 32; // jari menutupi titiknya sendiri, jadi lingkarannya lebih besar

    let timer: number | undefined;
    let aktif = false;
    let awalX = 0;
    let awalY = 0;
    let kiniX = 0;
    let kiniY = 0;

    const batalTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
    };

    const mulai = (e: TouchEvent) => {
      batalTimer();
      if (e.touches.length !== 1) return;
      awalX = kiniX = e.touches[0].clientX;
      awalY = kiniY = e.touches[0].clientY;
      timer = window.setTimeout(() => {
        timer = undefined;
        aktif = true;
        ikuti(kiniX, kiniY, RADIUS_JARI);
        setOn(true);
      }, TAHAN_MS);
    };

    const gerak = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      kiniX = t.clientX;
      kiniY = t.clientY;
      if (aktif) {
        if (e.cancelable) e.preventDefault();
        ikuti(kiniX, kiniY, RADIUS_JARI);
      } else if (Math.hypot(kiniX - awalX, kiniY - awalY) > AMBANG_GESER) {
        batalTimer();
      }
    };

    const selesai = () => {
      batalTimer();
      if (aktif) {
        aktif = false;
        padam();
      }
    };

    el.addEventListener("touchstart", mulai, { passive: true });
    el.addEventListener("touchmove", gerak, { passive: false });
    el.addEventListener("touchend", selesai);
    el.addEventListener("touchcancel", selesai);
    return () => {
      batalTimer();
      el.removeEventListener("touchstart", mulai);
      el.removeEventListener("touchmove", gerak);
      el.removeEventListener("touchend", selesai);
      el.removeEventListener("touchcancel", selesai);
    };
  }, [altSrc, ikuti, padam]);

  return (
    <div
      ref={wrap}
      data-cursor="hot"
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setOn(true);
      }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") ikuti(e.clientX, e.clientY, 24);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") padam();
      }}
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
