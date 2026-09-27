"use client";

import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  delay = 0,
  from = "bawah",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  /** arah elemen meluncur masuk saat digulir ke layar */
  from?: "bawah" | "kiri" | "kanan";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-from={from} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
