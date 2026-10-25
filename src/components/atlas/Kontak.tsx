"use client";

import { profile } from "@/content/data";
import { atlasTeks } from "@/content/atlas";
import { useLang } from "@/lib/i18n";

export default function Kontak() {
  const { t } = useLang();
  return (
    <section className="kontak" id="kontak" aria-labelledby="judul-kontak">
      <h2 id="judul-kontak">{t(atlasTeks.kontak)}</h2>
      <p className="pengantar">{t(atlasTeks.kontakIntro)}</p>
      <a className="surel" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <ul className="jejaring">
        {profile.socials.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          </li>
        ))}
        <li>
          <a href={profile.cv} target="_blank" rel="noreferrer">
            {t(atlasTeks.unduhCv)}
          </a>
        </li>
      </ul>
      <footer className="kaki">
        <p>{t(atlasTeks.kaki)}</p>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </section>
  );
}
