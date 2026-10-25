"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contactForm, education, experience, gallery, profile, projects, type KategoriProyek, type Project, type T } from "@/content/data";
import { pembuka, ringkas, sertifikatRiwayat, teksObrolan, topik, type Pesan } from "@/content/obrolan";
import { cariKota, faktaKota, type FaktaKota, type Kota } from "@/lib/kota";
import { useLang } from "@/lib/i18n";

/* ---------- jenis entri di layar ---------- */
type Isi = Pesan | { jenis: "bebas"; isi: string } | { jenis: "fakta"; f: FaktaKota } | { jenis: "teksT"; isi: T };
type Entri = { kunci: number; dari: "aku" | "kamu"; isi: Isi };

const judul = (p: Project) => (typeof p.title === "string" ? p.title : p.title.id);
const URUTAN: KategoriProyek[] = ["data", "sains", "aplikasi", "web", "kuliah"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let nomor = 0;
// Data kota dimuat sekali per kunjungan, baru saat pertama kali ada yang bertanya.
let janjiKota: Promise<Kota[]> | null = null;
const muatKota = () =>
  (janjiKota ??= fetch("/data/atlas.json")
    .then((r) => r.json() as Promise<{ daerah: Kota[] }>)
    .then((d) => d.daerah));
const entri = (dari: Entri["dari"], isi: Isi): Entri => ({ kunci: ++nomor, dari, isi });

/** Lama "ngetik" sebelum satu balasan muncul: pendek untuk pesan pendek, tidak pernah lama. */
function jeda(isi: Isi, lang: "id" | "en"): number {
  if (typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  const panjang = isi.jenis === "teks" || isi.jenis === "teksT" ? isi.isi[lang].length : isi.jenis === "fakta" ? isi.f.teks.length : 40;
  return Math.min(1100, 350 + panjang * 9);
}

/* ---------- komponen ---------- */
export default function Obrolan() {
  const { lang, setLang, t } = useLang();
  const [log, setLog] = useState<Entri[]>(() => pembuka.map((p) => entri("aku", p)));
  const [terpakai, setTerpakai] = useState<string[]>([]);
  const [ngetik, setNgetik] = useState(false);
  const [draf, setDraf] = useState("");
  const [pesanTertunda, setPesanTertunda] = useState<string | null>(null);
  const [mengirim, setMengirim] = useState(false);
  const bawah = useRef<HTMLDivElement>(null);
  const antrean = useRef(Promise.resolve());

  // Setiap entri baru digulir ke pandangan, supaya obrolan terasa berjalan.
  useEffect(() => {
    if (log.length <= pembuka.length) return;
    const halus = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    bawah.current?.scrollIntoView({ behavior: halus ? "smooth" : "auto", block: "end" });
  }, [log.length, ngetik]);

  /** Balasan rafi muncul satu per satu dengan indikator ngetik; antrean menjaga urutan. */
  function balas(isi: Isi[]) {
    antrean.current = antrean.current.then(async () => {
      for (const x of isi) {
        setNgetik(true);
        await new Promise((r) => setTimeout(r, jeda(x, lang)));
        setNgetik(false);
        setLog((l) => [...l, entri("aku", x)]);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
  }

  function tanya(id: string) {
    const tp = topik.find((x) => x.id === id);
    if (!tp) return;
    setTerpakai((s) => [...s, id]);
    setLog((l) => [...l, entri("kamu", { jenis: "teksT", isi: tp.tanya })]);
    balas(tp.balas);
  }

  function ulang() {
    setTerpakai([]);
    setLog(pembuka.map((p) => entri("aku", p)));
    window.scrollTo({ top: 0 });
  }

  function pilihKota(k: Kota) {
    setLog((l) => [...l, entri("kamu", { jenis: "bebas", isi: k.nama })]);
    const kini = new Date().toISOString().slice(0, 10);
    balas([
      { jenis: "bebas", isi: lang === "id" ? `oke, ${k.nama} 📍` : `okay, ${k.nama} 📍` },
      ...faktaKota(k, lang, kini).map((f) => ({ jenis: "fakta" as const, f })),
      { jenis: "teksT", isi: teksObrolan.kotaPenutup },
    ]);
  }

  async function kirim(e: React.FormEvent) {
    e.preventDefault();
    const isi = draf.trim();
    if (!isi || mengirim) return;
    setDraf("");
    setLog((l) => [...l, entri("kamu", { jenis: "bebas", isi })]);
    if (pesanTertunda === null) {
      // Pesan pertama: simpan dulu, minta email supaya bisa dibalas.
      setPesanTertunda(isi);
      balas([{ jenis: "teksT", isi: teksObrolan.mintaEmail }]);
      return;
    }
    if (!EMAIL.test(isi)) {
      balas([{ jenis: "teksT", isi: teksObrolan.emailSalah }]);
      return;
    }
    setMengirim(true);
    try {
      const r = await fetch(contactForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: isi, message: pesanTertunda, _subject: "Pesan dari obrolan raffstw.my.id" }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setPesanTertunda(null);
      balas([{ jenis: "teksT", isi: teksObrolan.terkirim }]);
    } catch {
      balas([{ jenis: "teksT", isi: teksObrolan.gagalKirim }]);
    } finally {
      setMengirim(false);
    }
  }

  const sisa = topik.filter((x) => !terpakai.includes(x.id));
  const mintaEmail = pesanTertunda !== null;

  return (
    <div className="obrolan">
      <header className="atas">
        <Image className="avatar" src={profile.photo} alt="" width={96} height={115} priority />
        <div>
          <h1>rafi</h1>
          <p>{t(teksObrolan.status)}</p>
        </div>
        <button type="button" className="bahasa" onClick={() => setLang(lang === "id" ? "en" : "id")} aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}>
          {lang === "id" ? "EN" : "ID"}
        </button>
      </header>

      <main className="utas" role="log" aria-live="polite" aria-relevant="additions" aria-label={lang === "id" ? "Obrolan dengan Rafi" : "Chat with Rafi"}>
        {log.map((e, i) => (
          <Gelembung key={e.kunci} e={e} lanjutan={i > 0 && log[i - 1].dari === e.dari} pilihKota={pilihKota} />
        ))}
        {ngetik && (
          <div className="gelembung aku ngetik" aria-label={t(teksObrolan.ngetik)}>
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={bawah} />
      </main>

      <footer className="ketik">
        <div className="saran-tanya" role="group" aria-label={lang === "id" ? "Pertanyaan" : "Questions"}>
          {sisa.map((x) => (
            <button key={x.id} type="button" onClick={() => tanya(x.id)}>
              {t(x.tanya)}
            </button>
          ))}
          {sisa.length === 0 && (
            <button type="button" onClick={ulang}>
              {t(teksObrolan.ulang)}
            </button>
          )}
        </div>
        <form className="kotak-ketik" onSubmit={kirim} noValidate>
          <label htmlFor="ketik-pesan" className="tersembunyi">
            {mintaEmail ? t(teksObrolan.ketikEmail) : t(teksObrolan.ketik)}
          </label>
          <input
            id="ketik-pesan"
            type={mintaEmail ? "email" : "text"}
            autoComplete={mintaEmail ? "email" : "off"}
            maxLength={1000}
            placeholder={mintaEmail ? t(teksObrolan.ketikEmail) : t(teksObrolan.ketik)}
            value={draf}
            onChange={(e) => setDraf(e.target.value)}
          />
          <button type="submit" disabled={!draf.trim() || mengirim}>
            {t(teksObrolan.kirim)}
          </button>
        </form>
      </footer>
    </div>
  );
}

/* ---------- satu gelembung ---------- */
function Gelembung({ e, lanjutan, pilihKota }: { e: Entri; lanjutan: boolean; pilihKota: (k: Kota) => void }) {
  const { t } = useLang();
  const kelas = `gelembung ${e.dari}${lanjutan ? " lanjutan" : ""}`;
  const x = e.isi;
  switch (x.jenis) {
    case "teks":
    case "teksT":
      return <p className={kelas}>{t(x.isi)}</p>;
    case "bebas":
      return <p className={kelas}>{x.isi}</p>;
    case "fakta":
      return (
        <p className={kelas}>
          {x.f.teks}
          <a className="sumber" href={x.f.url} target="_blank" rel="noreferrer">
            {t(teksObrolan.bukaDi)} {x.f.proyek}
          </a>
        </p>
      );
    case "foto":
      return (
        <figure className={`${kelas} foto`}>
          <Image src={x.src} alt={t(x.alt)} width={x.lebar} height={x.tinggi} sizes="240px" />
        </figure>
      );
    case "proyek":
      return <KartuProyek kelas={kelas} kunci={x.kunci} komentar={x.komentar} />;
    case "semuaProyek":
      return <SemuaProyek kelas={kelas} />;
    case "riwayat":
      return <Riwayat kelas={kelas} />;
    case "galeri":
      return <Galeri kelas={kelas} />;
    case "kontak":
      return <Kontak kelas={kelas} />;
    case "cekKota":
      return <CekKota kelas={kelas} pilih={pilihKota} />;
  }
}

function Tautan({ p }: { p: Project }) {
  const { t } = useLang();
  return (
    <span className="tautan">
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noreferrer">
          {t(teksObrolan.buka)}
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer">
          {t(teksObrolan.kode)}
        </a>
      )}
      {p.apk && (
        <a href={p.apk} target="_blank" rel="noreferrer">
          {t(teksObrolan.apk)}
        </a>
      )}
    </span>
  );
}

function KartuProyek({ kelas, kunci, komentar }: { kelas: string; kunci: string; komentar: T }) {
  const { t } = useLang();
  const p = (projects.items as Project[]).find((x) => judul(x) === kunci);
  if (!p) return null;
  return (
    <article className={`${kelas} kartu`}>
      {p.image && <Image src={p.image} alt="" width={1200} height={750} sizes="(max-width: 640px) 80vw, 420px" />}
      <div className="kartu-isi">
        <h2>{t(p.title as T | string)}</h2>
        <p>{t(komentar)}</p>
        <Tautan p={p} />
      </div>
    </article>
  );
}

function SemuaProyek({ kelas }: { kelas: string }) {
  const { t } = useLang();
  const semua = projects.items as Project[];
  return (
    <div className={`${kelas} daftar`}>
      {URUTAN.map((k) => {
        const isi = semua.filter((p) => p.kategori === k);
        if (!isi.length) return null;
        return (
          <section key={k}>
            <h2>{t(projects.kategori[k])}</h2>
            <ul>
              {isi.map((p) => {
                const url = p.demo || p.repo;
                const nama = t(p.title as T | string);
                return (
                  <li key={judul(p)}>
                    {url ? (
                      <a href={url} target="_blank" rel="noreferrer">
                        {nama}
                      </a>
                    ) : (
                      nama
                    )}
                    <span>{ringkas[judul(p)] ? t(ringkas[judul(p)]) : ""}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function Riwayat({ kelas }: { kelas: string }) {
  const { t } = useLang();
  const tahun = (s: string) => Number(s.match(/\d{4}/)?.[0] ?? 0);
  const baris = [
    ...experience.items.map((e) => ({ periode: e.period, judul: t(e.role), tempat: e.org, bukti: sertifikatRiwayat[e.org] })),
    ...education.schools.map((s) => ({ periode: s.period, judul: s.school, tempat: s.degree.id === "—" ? "" : t(s.degree), bukti: undefined })),
  ].sort((a, b) => tahun(b.periode) - tahun(a.periode));
  return (
    <ol className={`${kelas} riwayat`}>
      {baris.map((b) => (
        <li key={`${b.periode}${b.judul}`}>
          <span className="tahun">{b.periode.replace(/\s*—\s*/, "–")}</span>
          <span>
            <strong>{b.judul}</strong>
            {b.tempat && <span className="tempat">{b.tempat}</span>}
            {b.bukti && (
              <a href={b.bukti} target="_blank" rel="noreferrer">
                {t(teksObrolan.lihatSertifikat)}
              </a>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Galeri({ kelas }: { kelas: string }) {
  const { t } = useLang();
  return (
    <div className={`${kelas} galeri`}>
      {gallery.items.map((g) => (
        <figure key={g.src}>
          <Image src={g.src} alt={t(g.caption)} width={600} height={450} sizes="(max-width: 640px) 40vw, 220px" />
          <figcaption>{t(g.caption)}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Kontak({ kelas }: { kelas: string }) {
  const { t } = useLang();
  return (
    <div className={`${kelas} kontak`}>
      <a className="surel" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <span className="tautan">
        {profile.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
        <a href={profile.cv} target="_blank" rel="noreferrer">
          {t(teksObrolan.unduhCv)}
        </a>
      </span>
    </div>
  );
}

function CekKota({ kelas, pilih }: { kelas: string; pilih: (k: Kota) => void }) {
  const { t } = useLang();
  const [semua, setSemua] = useState<Kota[] | null>(null);
  const [q, setQ] = useState("");
  const [aktif, setAktif] = useState(0);
  useEffect(() => {
    muatKota().then(setSemua);
  }, []);
  const saran = semua ? cariKota(semua, q) : [];
  const pilihIni = (k: Kota) => {
    setQ("");
    pilih(k);
  };
  return (
    <div className={`${kelas} cek-kota`}>
      <input
        type="search"
        autoComplete="off"
        placeholder={t(teksObrolan.cariKota)}
        value={q}
        disabled={!semua}
        role="combobox"
        aria-expanded={saran.length > 0}
        aria-controls="saran-kota"
        aria-activedescendant={saran.length ? `kota-${aktif}` : undefined}
        aria-label={t(teksObrolan.cariKota)}
        onChange={(e) => {
          setQ(e.target.value);
          setAktif(0);
        }}
        onKeyDown={(e) => {
          if (!saran.length) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            setAktif((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + saran.length) % saran.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            pilihIni(saran[aktif]);
          }
        }}
      />
      {saran.length > 0 && (
        <ul role="listbox" id="saran-kota">
          {saran.map((k, i) => (
            <li
              key={k.id}
              id={`kota-${i}`}
              role="option"
              aria-selected={i === aktif}
              onMouseDown={(ev) => {
                ev.preventDefault();
                pilihIni(k);
              }}
            >
              {k.nama} <span>{k.prov}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
