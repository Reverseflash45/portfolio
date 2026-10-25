"use client";

import Image from "next/image";
import { about, education, experience, profile, type T } from "@/content/data";
import { atlasTeks, sertifikatRiwayat } from "@/content/atlas";
import { useLang } from "@/lib/i18n";

type Riwayat = { periode: string; mulai: number; judul: T | string; tempat: string; catatan?: T; bukti?: string };

const tahunAwal = (s: string) => Number(s.match(/\d{4}/)?.[0] ?? 0);
/** "2024 — sekarang" → "2024–sekarang": tanda pisah rentang, tanpa spasi. */
const rentang = (s: string, lang: "id" | "en") => s.replace(/\s*—\s*/, "–").replace("sekarang", lang === "id" ? "sekarang" : "now");

export default function Tentang() {
  const { lang, t } = useLang();

  // Pendidikan dan pengalaman digabung jadi satu urutan waktu, terbaru di atas.
  const riwayat: Riwayat[] = [
    ...education.schools.map((s) => ({
      periode: s.period,
      mulai: tahunAwal(s.period),
      judul: s.degree.id === "—" ? s.school : `${s.school}, ${t(s.degree)}`,
      tempat: "",
      catatan: s.note,
    })),
    ...experience.items.map((e) => ({
      periode: e.period,
      mulai: tahunAwal(e.period),
      judul: e.role,
      tempat: e.org,
      catatan: e.desc,
      bukti: sertifikatRiwayat[e.org],
    })),
  ].sort((a, b) => b.mulai - a.mulai);

  // Sertifikat yang sudah jadi bukti di riwayat tidak diulang.
  const dipakai = new Set(Object.values(sertifikatRiwayat));
  const sertifikat = education.certificates.filter((c) => !dipakai.has(c.image)).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="tentang" id="tentang" aria-labelledby="judul-tentang">
      <h2 id="judul-tentang">{t(atlasTeks.tentang)}</h2>
      <div className="tentang-isi">
        <Image className="foto" src={profile.photo} alt={profile.name} width={600} height={717} sizes="280px" />
        <div className="tentang-teks">
          {(lang === "id" ? about.body.id : about.body.en).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>

      <h3>{t(atlasTeks.riwayat)}</h3>
      <ol className="riwayat">
        {riwayat.map((r) => (
          <li key={`${r.periode}-${typeof r.judul === "string" ? r.judul : r.judul.id}`}>
            <span className="periode">{rentang(r.periode, lang)}</span>
            <div>
              <p className="riwayat-judul">{t(r.judul)}</p>
              {r.tempat && <p className="riwayat-tempat">{r.tempat}</p>}
              {r.catatan && <p className="riwayat-catatan">{t(r.catatan)}</p>}
              {r.bukti && (
                <a className="bukti" href={r.bukti} target="_blank" rel="noreferrer">
                  {t(atlasTeks.lihatSertifikat)}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>

      <h3>{t(atlasTeks.sertifikat)}</h3>
      <ul className="sertifikat">
        {sertifikat.map((c) => (
          <li key={c.image}>
            <span className="periode">{c.year}</span>
            <span>
              {t(c.name)}
              <span className="penerbit">{c.issuer}</span>
            </span>
            <a href={c.image} target="_blank" rel="noreferrer" aria-label={`${t(atlasTeks.lihat)}: ${t(c.name)}`}>
              {t(atlasTeks.lihat)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
