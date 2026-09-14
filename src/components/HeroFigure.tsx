"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Foto transparan yang berganti ke figur alternatif saat kursor mendekat,
 * dengan kilat + glow. Kedua gambar disediakan sebagai aset di /public.
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
  const [hot, setHot] = useState(false);
  const swap = Boolean(altSrc) && hot;

  return (
    <div
      data-cursor="hot"
      tabIndex={0}
      aria-label={name}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      className={`figwrap relative aspect-square w-[min(78vw,420px)] shrink-0 outline-none md:w-[440px] ${
        hot ? "is-hot" : ""
      }`}
    >
      <span aria-hidden className="figglow" />

      <Image
        src={base}
        alt={name}
        fill
        sizes="440px"
        priority
        className={`figimg object-contain transition-opacity duration-300 ${
          swap ? "opacity-0" : "opacity-100"
        }`}
      />

      {altSrc && (
        <Image
          src={altSrc}
          alt=""
          aria-hidden
          fill
          sizes="440px"
          className={`figimg object-contain transition-opacity duration-300 ${
            swap ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <span aria-hidden className="figspeed" />

      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="figbolts">
        {[
          "M14 -6 L22 18 L10 25 L26 48 L13 57 L28 80 L18 106",
          "M86 -6 L75 16 L88 24 L70 45 L84 55 L66 78 L78 106",
          "M50 -6 L40 20 L54 28 L38 52 L52 62 L40 84 L50 106",
        ].map((d, i) => (
          <g key={i} className={`boltg g${i + 1}`}>
            <path d={d} className="bolt glow" />
            <path d={d} className="bolt core" />
          </g>
        ))}
      </svg>
    </div>
  );
}
