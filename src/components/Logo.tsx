"use client";

/** Logo instansi; kalau belum ada file, tampilkan inisial sebagai placeholder. */
export default function Logo({ src, name }: { src?: string; name: string }) {
  const initials = name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-bg">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="h-full w-full object-contain p-1.5" />
      ) : (
        <span className="font-mono text-[11px] tracking-wider text-muted">{initials}</span>
      )}
    </span>
  );
}
