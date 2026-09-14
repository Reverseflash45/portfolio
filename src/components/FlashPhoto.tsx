"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Foto profil dengan efek "Flash" saat kursor mendekat:
 * duotone merah-emas, kilat listrik, speed line, dan glow.
 * Tidak mengganti gambar — semua efek dari CSS/SVG.
 */
const BOLTS = [
  "M20 -6 L27 16 L16 22 L30 42 L19 50 L33 72 L24 106",
  "M80 -6 L70 14 L82 21 L66 40 L79 49 L63 70 L73 106",
  "M52 -6 L43 18 L56 25 L41 47 L55 56 L44 78 L53 106",
];

export default function FlashPhoto({
  src,
  alt,
  fallbackChar,
}: {
  src: string;
  alt: string;
  fallbackChar: string;
}) {
  const [hot, setHot] = useState(false);

  return (
    <div
      data-cursor="hot"
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      tabIndex={0}
      aria-label={alt}
      className={`flashwrap group relative h-40 w-40 shrink-0 rounded-2xl outline-none md:h-52 md:w-52 ${
        hot ? "is-hot" : ""
      }`}
    >
      {/* glow di belakang */}
      <span aria-hidden className="flashglow" />

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface">
        {src ? (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="208px"
              priority
              className="flashimg object-cover"
            />
            {/* duotone merah-emas + vignette */}
            <span aria-hidden className="flashtone" />
            <span aria-hidden className="flashvig" />
            {/* speed lines */}
            <span aria-hidden className="speedlines" />
            {/* kilat */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="bolts"
            >
              {BOLTS.map((d, i) => (
                <g key={i} className={`boltg g${i + 1}`}>
                  <path d={d} className="bolt glow" />
                  <path d={d} className="bolt core" />
                </g>
              ))}
            </svg>
          </>
        ) : (
          <span className="select-none font-mono text-5xl text-border md:text-6xl">
            {fallbackChar}
          </span>
        )}
      </div>
    </div>
  );
}
