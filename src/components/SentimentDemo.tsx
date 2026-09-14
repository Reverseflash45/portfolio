"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { sentimentDemo } from "@/content/data";
import Section from "./Section";
import Reveal from "./Reveal";

// Lexicon ringan untuk demo di browser. Model IndoBERT yang sebenarnya
// berjalan di sisi server pada proyek aslinya — ini hanya ilustrasi cepat.
const POS: Record<string, number> = {
  naik: 2, melonjak: 3, untung: 3, laba: 3, tumbuh: 2, positif: 2, kuat: 2,
  cetak: 1, rekor: 2, ekspansi: 2, dividen: 2, surplus: 2, optimis: 2,
  akuisisi: 1, meningkat: 2, menguat: 2, cuan: 2, target: 1, efisiensi: 1,
};
const NEG: Record<string, number> = {
  turun: 2, anjlok: 3, rugi: 3, merugi: 3, negatif: 2, lemah: 2, melemah: 2,
  tekanan: 2, gagal: 3, utang: 1, defisit: 2, phk: 3, suspensi: 3, denda: 2,
  koreksi: 2, ambruk: 3, sepi: 1, tertekan: 2, pesimis: 2, turunkan: 2,
};
const NEGATORS = ["tidak", "tak", "bukan", "belum", "gagal"];

function analyze(text: string) {
  const tokens = text.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter(Boolean);
  let score = 0;
  const hits: { word: string; weight: number }[] = [];

  tokens.forEach((tok, i) => {
    const w = POS[tok] ?? -(NEG[tok] ?? 0);
    if (!w) return;
    const flipped = i > 0 && NEGATORS.includes(tokens[i - 1]) ? -1 : 1;
    const final = w * flipped;
    score += final;
    hits.push({ word: tok, weight: final });
  });

  const label = score > 1 ? "positive" : score < -1 ? "negative" : "neutral";
  const magnitude = Math.min(Math.abs(score) / 6, 1);
  const confidence = Math.round((0.5 + magnitude * 0.45) * 100);
  return { label, score, hits, confidence, tokens: tokens.length };
}

const COLORS: Record<string, string> = {
  positive: "#5eead4",
  negative: "#f87171",
  neutral: "#8b8f99",
};

export default function SentimentDemo() {
  const { t } = useLang();
  const [text, setText] = useState(sentimentDemo.examples[0]);
  const result = useMemo(() => analyze(text), [text]);
  const color = COLORS[result.label];

  return (
    <Section id="playground" title={sentimentDemo.title} subtitle={sentimentDemo.subtitle}>
      <Reveal>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="ml-2 font-mono text-[11px] text-muted">sentiment.analyze()</span>
          </div>

          <div className="p-4 md:p-5">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              spellCheck={false}
              placeholder={t(sentimentDemo.placeholder)}
              className="w-full resize-none rounded-lg border border-border bg-bg p-3 font-mono text-sm text-fg outline-none transition-colors placeholder:text-muted focus:border-accent/60"
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {sentimentDemo.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setText(ex)}
                  className="max-w-full truncate rounded-full border border-border px-3 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {ex.length > 42 ? ex.slice(0, 42) + "…" : ex}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 font-mono text-xl font-semibold transition-colors"
                  style={{ borderColor: color, color }}
                >
                  {result.score > 0 ? `+${result.score}` : result.score}
                </div>
                <div>
                  <p
                    className="font-mono text-sm font-medium uppercase tracking-[0.15em] transition-colors"
                    style={{ color }}
                  >
                    {t(sentimentDemo.labels[result.label as keyof typeof sentimentDemo.labels])}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    confidence ≈ {result.confidence}% · {result.tokens} token
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                  {t(sentimentDemo.tokensLabel)}
                </p>
                {result.hits.length ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {result.hits.map((h, i) => (
                      <li
                        key={i}
                        className="rounded-md border px-2 py-0.5 font-mono text-[11px]"
                        style={{
                          borderColor: h.weight > 0 ? "#5eead455" : "#f8717155",
                          color: h.weight > 0 ? "#5eead4" : "#f87171",
                        }}
                      >
                        {h.word} {h.weight > 0 ? `+${h.weight}` : h.weight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-mono text-[11px] text-muted">—</p>
                )}
              </div>
            </div>
          </div>

          <p className="border-t border-border px-4 py-3 text-[11px] leading-relaxed text-muted md:px-5">
            {t(sentimentDemo.note)}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
