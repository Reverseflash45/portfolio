"use client";

import Image from "next/image";
import { projects, type KategoriProyek, type Project, type T } from "@/content/data";
import { atlasTeks, ringkas, unggulan, uraianUnggulan } from "@/content/atlas";
import { useLang } from "@/lib/i18n";

const kunci = (p: Project) => (typeof p.title === "string" ? p.title : p.title.id);
const URUTAN: KategoriProyek[] = ["data", "sains", "aplikasi", "web", "kuliah"];

function Tautan({ p }: { p: Project }) {
  const { t } = useLang();
  return (
    <span className="tautan-karya">
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noreferrer">
          {t(atlasTeks.buka)}
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer">
          {t(atlasTeks.kode)}
        </a>
      )}
      {p.apk && (
        <a href={p.apk} target="_blank" rel="noreferrer">
          {t(atlasTeks.apk)}
        </a>
      )}
    </span>
  );
}

export default function Karya() {
  const { t } = useLang();
  const semua = projects.items as Project[];
  const besar = unggulan.map((k) => semua.find((p) => kunci(p) === k)).filter((p): p is Project => Boolean(p));
  const sisa = semua.filter((p) => !unggulan.includes(kunci(p)));

  return (
    <section className="karya" id="karya" aria-labelledby="judul-karya">
      <h2 id="judul-karya">{t(atlasTeks.karya)}</h2>
      <p className="pengantar">{t(atlasTeks.karyaIntro)}</p>

      <ol className="unggulan">
        {besar.map((p) => (
          <li key={kunci(p)} className="karya-besar">
            {p.image && <Image src={p.image} alt="" width={1200} height={750} sizes="(max-width: 980px) 100vw, 700px" />}
            <div className="karya-besar-teks">
              <h3>{t(p.title as T | string)}</h3>
              <p className="jenis-karya">{t(p.label)}</p>
              <p>{t(uraianUnggulan[kunci(p)] ?? p.desc)}</p>
              <p className="alat">{p.tags.join(", ")}</p>
              <Tautan p={p} />
            </div>
          </li>
        ))}
      </ol>

      <h3 className="judul-indeks">{t(atlasTeks.semuaKarya)}</h3>
      {URUTAN.map((k) => {
        const isi = sisa.filter((p) => p.kategori === k);
        if (!isi.length) return null;
        return (
          <div key={k} className="kelompok">
            <h4>{t(projects.kategori[k])}</h4>
            <ul className="indeks">
              {isi.map((p) => (
                <li key={kunci(p)}>
                  {p.image ? <Image src={p.image} alt="" width={1200} height={750} sizes="112px" /> : <span className="tanpa-gambar" />}
                  <div>
                    <p className="nama-karya">
                      {t(p.title as T | string)}
                      {p.kind === "course" && <span className="catatan-kuliah"> ({t(p.label)})</span>}
                    </p>
                    <p>{t(ringkas[kunci(p)] ?? p.desc)}</p>
                  </div>
                  <Tautan p={p} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}
