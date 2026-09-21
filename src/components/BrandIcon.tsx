"use client";

import { useState } from "react";

/**
 * Logo merek dari simple-icons CDN (dimuat oleh browser pengunjung).
 * Kalau gagal dimuat, jatuh ke inisial supaya tidak ada kotak kosong.
 */

// Merek yang tidak tersedia di simple-icons — pakai file lokal, warna aslinya.
const LOKAL: Record<string, string> = {
  LinkedIn: "/logos/linkedin.png",
};
export default function BrandIcon({
  slug,
  name,
  color,
  className = "h-6 w-6",
}: {
  slug?: string;
  name: string;
  color?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (LOKAL[name]) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={LOKAL[name]} alt="" aria-hidden className={`${className} rounded-[3px] object-contain`} />
    );
  }

  if (!slug || failed) {
    return (
      <span
        aria-hidden
        className={`${className} grid place-items-center rounded-md font-mono text-[10px]`}
        style={{
          color: color ?? "var(--color-muted)",
          background: color
            ? `radial-gradient(circle at 35% 30%, ${color}55 0%, transparent 72%)`
            : undefined,
          boxShadow: color ? `inset 0 0 0 1px ${color}40` : undefined,
        }}
      >
        {name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/${(color ?? "#e9eaec").replace("#", "")}`}
      alt=""
      aria-hidden
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${className} object-contain`}
    />
  );
}
