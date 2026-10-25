"use client";

import { useEffect, useMemo, useState } from "react";
import type { Feature, FeatureCollection, Geometry, MultiLineString } from "geojson";
import { geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { profile, type Lang } from "@/content/data";
import { atlasTeks } from "@/content/atlas";
import { useLang } from "@/lib/i18n";

/* ---------- data ---------- */
type Daerah = {
  id: string;
  nama: string;
  prov: string;
  titik: [number, number];
  upah: [number, string] | null;
  gempa: [number, number, number] | null;
  gunung: [string, number, number, number];
  bayang: string[];
  gerhana: [string, number, number][];
  gerhanaBesar: [string, number] | null;
};
type Prop = { id: string };
type Peta = { darat: FeatureCollection<Geometry, Prop>; batas: MultiLineString };

const ASAL = "kota-kediri";
const LEBAR = 1000;

/* Nama perairan ditulis miring seperti di atlas sekolah. Posisi dalam bujur/lintang. */
const PERAIRAN: { nama: string; en: string; titik: [number, number] }[] = [
  { nama: "Samudra Hindia", en: "Indian Ocean", titik: [101, -9.5] },
  { nama: "Laut Jawa", en: "Java Sea", titik: [111.2, -5.1] },
  { nama: "Laut Banda", en: "Banda Sea", titik: [127.5, -6] },
  { nama: "Laut Sulawesi", en: "Celebes Sea", titik: [122.2, 4.2] },
  { nama: "Samudra Pasifik", en: "Pacific Ocean", titik: [134, 3.2] },
  { nama: "Laut Cina Selatan", en: "South China Sea", titik: [109.4, 6.4] },
];

/* ---------- format ---------- */
const tanggal = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
const angka = (n: number, lang: Lang, d = 0) => n.toLocaleString(lang === "id" ? "id-ID" : "en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });
const hariIni = () => new Date().toISOString().slice(0, 10);

const normal = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(kabupaten|kab\.?|kota)\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

type Fakta = { kunci: keyof typeof atlasTeks.fakta; nilai: string; proyek: string; url: string };

function faktaDaerah(d: Daerah, lang: Lang): Fakta[] {
  const id = lang === "id";
  const kini = hariIni();
  const f: Fakta[] = [];
  if (d.upah)
    f.push({ kunci: "upah", nilai: `Rp${angka(d.upah[0], "id")} (${d.upah[1]})`, proyek: "UMR", url: `https://umr.raffstw.my.id/?d=${d.id}` });
  f.push({
    kunci: "gempa",
    nilai: d.gempa
      ? id
        ? `M${angka(d.gempa[0], lang, 1)} pada ${d.gempa[1]}, ${d.gempa[2]} km`
        : `M${angka(d.gempa[0], lang, 1)} in ${d.gempa[1]}, ${d.gempa[2]} km away`
      : id
        ? atlasTeks.tanpaGempa.id
        : atlasTeks.tanpaGempa.en,
    proyek: "Getar",
    url: `https://getar.raffstw.my.id/#daerah=${d.id}&r=100`,
  });
  const [gNama, gKm, gTahun, gLanjut] = d.gunung;
  f.push({
    kunci: "gunung",
    nilai: id
      ? `${gNama}, ${angka(gKm, lang)} km, ${gLanjut ? `masih aktif sejak ${gTahun}` : `terakhir meletus ${gTahun}`}`
      : `${gNama}, ${angka(gKm, lang)} km, ${gLanjut ? `active since ${gTahun}` : `last erupted ${gTahun}`}`,
    proyek: "Bara",
    url: `https://bara.raffstw.my.id/#daerah=${d.id}`,
  });
  const bayang = d.bayang.find((t) => t >= kini) ?? d.bayang.at(-1);
  if (bayang) f.push({ kunci: "bayang", nilai: tanggal(bayang, lang), proyek: "Bayang", url: `https://bayang.raffstw.my.id/#daerah=${d.id}` });
  const g = d.gerhana.find(([t]) => t >= kini);
  if (g) {
    const [t, jenis, persen] = g;
    const bagian = jenis === 3 ? (id ? "total" : "total") : jenis === 2 ? (id ? "cincin" : "annular") : `${persen < 1 ? "<1" : persen}% ${id ? "tertutup" : "covered"}`;
    f.push({ kunci: "gerhana", nilai: `${tanggal(t, lang)}, ${bagian}`, proyek: "Gerhana", url: `https://gerhana.raffstw.my.id/#daerah=${d.id}&g=${t}` });
  }
  return f;
}

/* ---------- komponen ---------- */
export default function Atlas() {
  const { lang, t } = useLang();
  const [daerah, setDaerah] = useState<Daerah[] | null>(null);
  const [peta, setPeta] = useState<Peta | null>(null);
  const [gagal, setGagal] = useState(false);
  const [terpilih, setTerpilih] = useState(ASAL);
  const [cari, setCari] = useState("");
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch("/data/atlas.json").then((r) => r.json() as Promise<{ daerah: Daerah[] }>),
      fetch("/data/peta.json").then((r) => r.json() as Promise<Topology<{ daerah: GeometryCollection<Prop> }>>),
    ])
      .then(([a, topo]) => {
        // Tautan berbagi bisa membawa daerah lain lewat #daerah=…; dibaca setelah datanya siap.
        const dariHash = new URLSearchParams(location.hash.slice(1)).get("daerah");
        if (dariHash && a.daerah.some((x) => x.id === dariHash)) setTerpilih(dariHash);
        setDaerah(a.daerah);
        setPeta({
          darat: feature(topo, topo.objects.daerah) as FeatureCollection<Geometry, Prop>,
          batas: mesh(topo, topo.objects.daerah, (x, y) => x !== y) as MultiLineString,
        });
      })
      .catch(() => setGagal(true));
  }, []);

  const indeks = useMemo(() => new Map((daerah ?? []).map((d) => [d.id, d])), [daerah]);
  const d = indeks.get(terpilih) ?? indeks.get(ASAL);
  const asal = indeks.get(ASAL);

  // Proyeksi dihitung sekali; ukuran SVG mengikuti lebar lewat viewBox.
  const gambar = useMemo(() => {
    if (!peta) return null;
    // Ada jarak di setiap sisi: perbatasan Papua di 141°BT lurus, dan tanpa jarak terlihat seperti terpotong bingkai.
    const tepi = 24;
    const proyeksi = geoMercator().fitWidth(LEBAR - 2 * tepi, peta.darat);
    const jalur = geoPath(proyeksi);
    const [[x0, y0], [, y1]] = jalur.bounds(peta.darat);
    const [tx, ty] = proyeksi.translate();
    proyeksi.translate([tx - x0 + tepi, ty - y0 + tepi]);
    return {
      tinggi: Math.ceil(y1 - y0 + 2 * tepi),
      wilayah: peta.darat.features.map((f: Feature<Geometry, Prop>) => ({ id: f.properties.id, d: jalur(f) ?? "" })),
      batas: jalur(peta.batas) ?? "",
      titik: (xy: [number, number]) => proyeksi(xy) as [number, number],
    };
  }, [peta]);

  function pilih(id: string) {
    setTerpilih(id);
    setCari("");
    history.replaceState(null, "", id === ASAL ? location.pathname : `#daerah=${id}`);
  }

  const saran = useMemo(() => {
    const k = normal(cari);
    if (!k || !daerah) return [];
    const nilai = (x: Daerah) => {
      const n = normal(x.nama);
      return n === k ? 0 : n.startsWith(k) ? 1 : n.includes(k) ? 2 : normal(x.prov).includes(k) ? 3 : 9;
    };
    return daerah
      .map((x) => [x, nilai(x)] as const)
      .filter(([, v]) => v < 9)
      .sort((a, b) => a[1] - b[1] || a[0].nama.localeCompare(b[0].nama))
      .slice(0, 6)
      .map(([x]) => x);
  }, [cari, daerah]);

  const fakta = d ? faktaDaerah(d, lang) : [];
  const pusat = gambar && d ? gambar.titik(d.titik) : null;
  const rumah = gambar && asal ? gambar.titik(asal.titik) : null;

  return (
    <section className="atlas" aria-labelledby="judul-atlas">
      <div className="atlas-pembuka">
        <h1 id="judul-atlas">{profile.name}</h1>
        <p className="atlas-intro">{t(atlasTeks.intro)}</p>
        <p className="atlas-status">{t(atlasTeks.status)}</p>
      </div>

      <div className="lembar">
        <figure className="peta" aria-label={lang === "id" ? "Peta kabupaten/kota di Indonesia" : "Map of Indonesian regencies and cities"}>
          {gambar ? (
            <svg viewBox={`0 0 ${LEBAR} ${gambar.tinggi}`} role="presentation">
              {PERAIRAN.map((p) => {
                const [x, y] = gambar.titik(p.titik);
                return (
                  <text key={p.nama} className="perairan" x={x} y={y} textAnchor="middle">
                    {lang === "id" ? p.nama : p.en}
                  </text>
                );
              })}
              <g>
                {gambar.wilayah.map((w) => (
                  <path key={w.id} d={w.d} className={w.id === d?.id ? "wilayah terpilih" : "wilayah"} onClick={() => pilih(w.id)}>
                    <title>{indeks.get(w.id)?.nama}</title>
                  </path>
                ))}
              </g>
              <path className="batas" d={gambar.batas} />
              {rumah && (
                <g className="rumah" transform={`translate(${rumah[0]} ${rumah[1]})`}>
                  <rect x={-4} y={-4} width={8} height={8} />
                  <text x={0} y={22} textAnchor="middle">
                    Kediri, {t(atlasTeks.asal)}
                  </text>
                </g>
              )}
              {pusat && d?.id !== ASAL && <circle className="penanda" cx={pusat[0]} cy={pusat[1]} r={7} />}
            </svg>
          ) : (
            <p className="peta-status">{gagal ? t(atlasTeks.gagal) : t(atlasTeks.memuat)}</p>
          )}
        </figure>

        <aside className="legenda" aria-live="polite" aria-labelledby="nama-daerah">
          {d && (
            <>
              <h2 id="nama-daerah">{d.nama}</h2>
              <p className="legenda-prov">{d.prov}</p>
              <dl>
                {fakta.map((f) => (
                  <div key={f.kunci} className="baris-fakta">
                    <dt>{t(atlasTeks.fakta[f.kunci])}</dt>
                    <dd>
                      <span className="nilai">{f.nilai}</span>
                      <a href={f.url} target="_blank" rel="noreferrer">
                        {f.proyek}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <div className="cari">
            <label htmlFor="cari-daerah" className="tersembunyi">
              {t(atlasTeks.cari)}
            </label>
            <input
              id="cari-daerah"
              type="search"
              autoComplete="off"
              placeholder={t(atlasTeks.cari)}
              value={cari}
              disabled={!daerah}
              role="combobox"
              aria-expanded={saran.length > 0}
              aria-controls="saran-daerah"
              aria-activedescendant={saran.length ? `saran-${aktif}` : undefined}
              onChange={(e) => {
                setCari(e.target.value);
                setAktif(0);
              }}
              onKeyDown={(e) => {
                if (!saran.length) return;
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setAktif((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + saran.length) % saran.length);
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  pilih(saran[aktif].id);
                } else if (e.key === "Escape") setCari("");
              }}
            />
            {saran.length > 0 && (
              <ul id="saran-daerah" role="listbox" className="saran">
                {saran.map((x, i) => (
                  <li
                    key={x.id}
                    id={`saran-${i}`}
                    role="option"
                    aria-selected={i === aktif}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pilih(x.id);
                    }}
                  >
                    {x.nama} <span>{x.prov}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {d && d.id !== ASAL && (
            <button type="button" className="ke-asal" onClick={() => pilih(ASAL)}>
              {t(atlasTeks.kembali)}
            </button>
          )}
          <p className="legenda-catatan">{t(atlasTeks.catatanLegenda)}</p>
        </aside>
      </div>
    </section>
  );
}
