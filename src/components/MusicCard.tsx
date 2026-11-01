"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { music } from "@/content/data";

export default function MusicCard() {
  const { t } = useLang();
  const [putar, setPutar] = useState(false);
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
          href={`https://open.spotify.com/playlist/${music.playlistId}`}
          target="_blank"
          rel="noreferrer"
          aria-label={t(music.openLabel)}
          title={t(music.openLabel)}
          className="shrink-0 font-mono text-[11px] text-muted transition-colors hover:text-accent"
        >
          ↗
        </a>
      </div>

      {putar ? (
        <iframe
          title={t(music.title)}
          src={`https://open.spotify.com/embed/playlist/${music.playlistId}?theme=0&autoplay=1`}
          style={{ colorScheme: "normal" }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="h-[152px] w-full border-0 sm:h-[352px]"
        />
      ) : (
        // Tinggi sama dengan pemutarnya supaya tata letak tidak bergeser saat dimuat.
        <div className="flex h-[152px] w-full flex-col items-center justify-center gap-2 px-5 text-center sm:h-[352px]">
          <button
            type="button"
            onClick={() => setPutar(true)}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 fill-current">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
            {t(music.muat)}
          </button>
          <p className="text-[11px] leading-snug text-muted">{t(music.muatNote)}</p>
        </div>
      )}
    </div>
  );
}
