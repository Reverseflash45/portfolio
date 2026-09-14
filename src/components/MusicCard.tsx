"use client";

import { useLang } from "@/lib/i18n";
import { music } from "@/content/data";

export default function MusicCard() {
  const { t } = useLang();
  if (!music.playlistId) return null;

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface/70 backdrop-blur">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <div>
            <p className="text-sm font-medium leading-tight">{t(music.title)}</p>
            <p className="text-[11px] leading-tight text-muted">{t(music.note)}</p>
          </div>
        </div>
        <a
          href={`https://music.youtube.com/playlist?list=${music.playlistId}`}
          target="_blank"
          rel="noreferrer"
          aria-label={t(music.openLabel)}
          title={t(music.openLabel)}
          className="shrink-0 font-mono text-[11px] text-muted transition-colors hover:text-accent"
        >
          ↗
        </a>
      </div>

      <iframe
        title={t(music.title)}
        src={`https://www.youtube.com/embed/videoseries?list=${music.playlistId}`}
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="aspect-video w-full border-0"
      />
    </div>
  );
}
