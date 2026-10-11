"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import type { Lang, T } from "@/content/data";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: T | string) => string };

const LangContext = createContext<Ctx>({
  lang: "id",
  setLang: () => {},
  t: (v) => (typeof v === "string" ? v : v.id),
});

// Bahasa disimpan di localStorage. Render server dan hidrasi selalu memakai
// "id", lalu berpindah ke pilihan tersimpan begitu berjalan di peramban.
const KUNCI = "lang";
const pendengar = new Set<() => void>();
// Cadangan bila localStorage tidak bisa dipakai (mode privat, diblokir).
let pilihan: Lang | null = null;

function bacaLang(): Lang {
  if (pilihan) return pilihan;
  try {
    const v = localStorage.getItem(KUNCI);
    if (v === "id" || v === "en") return v;
  } catch {}
  return "id";
}

function langganan(cb: () => void) {
  pendengar.add(cb);
  const dariTabLain = (e: StorageEvent) => {
    if (e.key !== KUNCI) return;
    pilihan = null;
    cb();
  };
  window.addEventListener("storage", dariTabLain);
  return () => {
    pendengar.delete(cb);
    window.removeEventListener("storage", dariTabLain);
  };
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(langganan, bacaLang, () => "id" as Lang);

  const setLang = useCallback((l: Lang) => {
    pilihan = l;
    try {
      localStorage.setItem(KUNCI, l);
    } catch {}
    pendengar.forEach((cb) => cb());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (v: T | string) => (typeof v === "string" ? v : v[lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
