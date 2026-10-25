import type { Lang } from "@/content/data";

/** Satu baris public/data/atlas.json (dibuat oleh scripts/atlas.mjs). */
export type Kota = {
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

export type FaktaKota = { teks: string; proyek: string; url: string };

const tanggal = (iso: string, lang: Lang) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "id" ? "id-ID" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
const angka = (n: number, lang: Lang, d = 0) =>
  n.toLocaleString(lang === "id" ? "id-ID" : "en-GB", { maximumFractionDigits: d, minimumFractionDigits: d });

/** Balasan santai berisi satu fakta per proyek. `kini` = tanggal hari ini (YYYY-MM-DD). */
export function faktaKota(k: Kota, lang: Lang, kini: string): FaktaKota[] {
  const id = lang === "id";
  const f: FaktaKota[] = [];
  if (k.upah)
    f.push({
      teks: id ? `upah minimum 2026 di sana Rp${angka(k.upah[0], "id")} (${k.upah[1]})` : `the 2026 minimum wage there is Rp${angka(k.upah[0], "id")} (${k.upah[1]})`,
      proyek: "UMR",
      url: `https://umr.raffstw.my.id/?d=${k.id}`,
    });
  f.push({
    teks: k.gempa
      ? id
        ? `gempa paling gede dalam 100 km sejak 1900: M${angka(k.gempa[0], lang, 1)}, tahun ${k.gempa[1]} 😬`
        : `the strongest quake within 100 km since 1900: M${angka(k.gempa[0], lang, 1)}, in ${k.gempa[1]} 😬`
      : id
        ? "belum ada gempa M5+ yang tercatat dalam 100 km sejak 1900"
        : "no M5+ quake on record within 100 km since 1900",
    proyek: "Getar",
    url: `https://getar.raffstw.my.id/#daerah=${k.id}&r=100`,
  });
  const [gunung, km, tahun, aktif] = k.gunung;
  f.push({
    teks: id
      ? `gunung api terdekat ${gunung}, ${angka(km, lang)} km dari situ, ${aktif ? `masih aktif sejak ${tahun} 🌋` : `terakhir meletus ${tahun}`}`
      : `the nearest volcano is ${gunung}, ${angka(km, lang)} km away, ${aktif ? `still active since ${tahun} 🌋` : `last erupted in ${tahun}`}`,
    proyek: "Bara",
    url: `https://bara.raffstw.my.id/#daerah=${k.id}`,
  });
  const bayang = k.bayang.find((t) => t >= kini);
  if (bayang)
    f.push({
      teks: id
        ? `${tanggal(bayang, lang)} pas tengah hari, bayanganmu bakal hilang. coba berdiri di luar ☀️`
        : `on ${tanggal(bayang, lang)} at midday your shadow disappears. try standing outside ☀️`,
      proyek: "Bayang",
      url: `https://bayang.raffstw.my.id/#daerah=${k.id}`,
    });
  const g = k.gerhana.find(([t]) => t >= kini);
  if (g) {
    const [t, jenis, persen] = g;
    const bagian =
      jenis === 3 ? (id ? "TOTAL, gelap beneran" : "TOTAL, properly dark") : jenis === 2 ? (id ? "jadi cincin api" : "a ring of fire") : id ? `${persen < 1 ? "kurang dari 1" : persen}% ketutup` : `${persen < 1 ? "under 1" : persen}% covered`;
    f.push({
      teks: id ? `gerhana matahari berikutnya yang keliatan dari sana: ${tanggal(t, lang)}, ${bagian} 🌑` : `the next solar eclipse visible from there: ${tanggal(t, lang)}, ${bagian} 🌑`,
      proyek: "Gerhana",
      url: `https://gerhana.raffstw.my.id/#daerah=${k.id}&g=${t}`,
    });
  }
  return f;
}

export const normal = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/^(kabupaten|kab\.?|kota)\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export function cariKota(semua: Kota[], q: string, batas = 6): Kota[] {
  const k = normal(q);
  if (!k) return [];
  const nilai = (x: Kota) => {
    const n = normal(x.nama);
    return n === k ? 0 : n.startsWith(k) ? 1 : n.includes(k) ? 2 : normal(x.prov).includes(k) ? 3 : 9;
  };
  return semua
    .map((x) => [x, nilai(x)] as const)
    .filter(([, v]) => v < 9)
    .sort((a, b) => a[1] - b[1] || a[0].nama.localeCompare(b[0].nama))
    .slice(0, batas)
    .map(([x]) => x);
}
