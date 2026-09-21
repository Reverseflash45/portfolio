"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Foto transparan. Saat kursor bergerak di atasnya — atau di layar sentuh,
 * jari mengetuk, atau menahan lalu menggeser — gambar alternatif tersingkap hanya di area
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

  /* Lingkaran tidak langsung ditempel ke pointer: posisi menyusul dengan
     sedikit lag, dan radius memakai pegas teredam sehingga mekar dengan
     pantulan kecil saat dibuka dan mengecil di tempat saat ditutup. */
  const anim = useRef({ x: 50, y: 50, r: 0, v: 0, tx: 50, ty: 50, tr: 0, raf: 0 });

  const jalan = useCallback(() => {
    const a = anim.current;
    if (a.raf) return;
    const langkah = () => {
      a.x += (a.tx - a.x) * 0.22;
      a.y += (a.ty - a.y) * 0.22;
      a.v = (a.v + (a.tr - a.r) * 0.16) * 0.6;
      a.r = Math.max(0, a.r + a.v);
      const diam =
        Math.abs(a.tx - a.x) < 0.05 &&
        Math.abs(a.ty - a.y) < 0.05 &&
        Math.abs(a.tr - a.r) < 0.05 &&
        Math.abs(a.v) < 0.05;
      if (diam) {
        a.x = a.tx;
        a.y = a.ty;
        a.r = a.tr;
        a.v = 0;
        a.raf = 0;
        setVars(a.x, a.y, a.r);
        return;
      }
      setVars(a.x, a.y, a.r);
      a.raf = requestAnimationFrame(langkah);
    };
    a.raf = requestAnimationFrame(langkah);
  }, [setVars]);

  useEffect(() => () => cancelAnimationFrame(anim.current.raf), []);

  const tuju = useCallback(
    (x: number, y: number, r: number) => {
      const a = anim.current;
      // baru dibuka: mekar dari titik pointer, bukan meluncur dari posisi lama
      if (a.tr === 0 && a.r < 0.5) {
        a.x = x;
        a.y = y;
      }
      a.tx = x;
      a.ty = y;
      a.tr = r;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        cancelAnimationFrame(a.raf);
        Object.assign(a, { x, y, r, v: 0, raf: 0 });
        setVars(x, y, r);
        return;
      }
      jalan();
    },
    [jalan, setVars]
  );

  const padam = useCallback(() => {
    setOn(false);
    const a = anim.current;
    tuju(a.tx, a.ty, 0);
  }, [tuju]);

  const ikuti = useCallback(
    (x: number, y: number, r: number) => {
      const el = wrap.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      tuju(((x - b.left) / b.width) * 100, ((y - b.top) / b.height) * 100, r);
    },
    [tuju]
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
    const LAMA_KETUK_MS = 1400; // ketukan singkat: tersingkap sebentar lalu menutup sendiri

    let timer: number | undefined;
    let timerKetuk: number | undefined;
    let aktif = false;
    let tergeser = false;
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
      if (timerKetuk !== undefined) window.clearTimeout(timerKetuk);
      timerKetuk = undefined;
      tergeser = false;
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
        tergeser = true;
        batalTimer();
      }
    };

    const selesai = (e: TouchEvent) => {
      const ketukan = timer !== undefined && !tergeser && e.type === "touchend";
      batalTimer();
      if (aktif) {
        aktif = false;
        padam();
      } else if (ketukan) {
        // Ketukan tanpa geser tidak pernah mencapai TAHAN_MS; tanpa ini foto
        // tidak bereaksi sama sekali dan fiturnya terasa rusak.
        ikuti(kiniX, kiniY, RADIUS_JARI);
        setOn(true);
        timerKetuk = window.setTimeout(() => {
          timerKetuk = undefined;
          padam();
        }, LAMA_KETUK_MS);
      }
    };

    el.addEventListener("touchstart", mulai, { passive: true });
    el.addEventListener("touchmove", gerak, { passive: false });
    el.addEventListener("touchend", selesai);
    el.addEventListener("touchcancel", selesai);
    return () => {
      batalTimer();
      if (timerKetuk !== undefined) window.clearTimeout(timerKetuk);
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
          className="figreveal absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
