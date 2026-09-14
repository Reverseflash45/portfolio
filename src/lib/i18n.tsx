"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang, T } from "@/content/data";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (v: T | string) => string };

const LangContext = createContext<Ctx>({
  lang: "id",
  setLang: () => {},
  t: (v) => (typeof v === "string" ? v : v.id),
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "id" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (v: T | string) => (typeof v === "string" ? v : v[lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
