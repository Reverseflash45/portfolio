"use client";

/**
 * Foto transparan di hero. Sengaja memakai <img> biasa, bukan next/image,
 * supaya tidak melewati image optimizer.
 */
export default function HeroFigure({
  base,
  name,
}: {
  base: string;
  name: string;
}) {
  return (
    <div className="relative aspect-square w-[min(78vw,420px)] shrink-0 md:w-[440px]">
      <span
        aria-hidden
        className="absolute inset-[10%_12%_8%_12%] rounded-full opacity-20 blur-[54px]"
        style={{
          background: "radial-gradient(circle at 50% 55%, #5eead4 0%, transparent 68%)",
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={base}
        alt={name}
        className="relative h-full w-full object-contain"
        style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))" }}
      />
    </div>
  );
}
