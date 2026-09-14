"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; a: number; tw: number; vx: number };
type Shot = { x: number; y: number; len: number; sp: number; life: number; ang: number };

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let shots: Shot[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.round((w * h) / 7000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.25 + 0.25,
        a: Math.random() * 0.55 + 0.15,
        tw: Math.random() * 0.02 + 0.004,
        vx: (Math.random() - 0.5) * 0.03,
      }));
    };

    const spawnShot = () => {
      const fromLeft = Math.random() > 0.5;
      shots.push({
        x: fromLeft ? Math.random() * w * 0.4 : w * (0.6 + Math.random() * 0.4),
        y: Math.random() * h * 0.5,
        len: 90 + Math.random() * 110,
        sp: 5 + Math.random() * 4,
        life: 1,
        ang: (fromLeft ? 0.55 : 2.6) + (Math.random() - 0.5) * 0.25,
      });
    };

    const frame = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.a += s.tw;
        if (s.a > 0.75 || s.a < 0.12) s.tw *= -1;
        s.x += s.vx;
        if (s.x < -2) s.x = w + 2;
        if (s.x > w + 2) s.x = -2;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${s.a})`;
        ctx.fill();
      }

      if (t % 150 === 0 && shots.length < 3 && Math.random() > 0.35) spawnShot();

      shots = shots.filter((sh) => {
        sh.x += Math.cos(sh.ang) * sh.sp;
        sh.y += Math.sin(sh.ang) * sh.sp;
        sh.life -= 0.012;
        if (sh.life <= 0) return false;

        const tx = sh.x - Math.cos(sh.ang) * sh.len;
        const ty = sh.y - Math.sin(sh.ang) * sh.len;
        const g = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${0.65 * sh.life})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        return sh.x > -200 && sh.x < w + 200 && sh.y < h + 200;
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const stop = () => cancelAnimationFrame(raf);
    const onVis = () => (document.hidden ? stop() : start());

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);

    if (reduce) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${s.a})`;
        ctx.fill();
      }
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 h-full w-full"
    />
  );
}
