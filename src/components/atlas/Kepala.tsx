"use client";

import { profile } from "@/content/data";
import { atlasTeks } from "@/content/atlas";
import { useLang } from "@/lib/i18n";

export default function Kepala() {
  const { lang, setLang, t } = useLang();
  return (
    <header className="kepala">
      <a className="kepala-nama" href="#">
        {profile.name}
      </a>
      <nav aria-label={lang === "id" ? "Bagian halaman" : "Page sections"}>
        <a href="#karya">{t(atlasTeks.karya)}</a>
        <a href="#tentang">{t(atlasTeks.tentang)}</a>
        <a href="#kontak">{t(atlasTeks.kontak)}</a>
        <button
          type="button"
          className="ganti-bahasa"
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
        >
          {lang === "id" ? "English" : "Indonesia"}
        </button>
      </nav>
    </header>
  );
}
