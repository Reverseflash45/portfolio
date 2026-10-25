// Menyatukan satu fakta per proyek untuk setiap kabupaten/kota, untuk jawaban "cek kotaku dong"
// di halaman depan. Membaca data dari repo proyek di sebelah repo ini (../umr, ../getar, ...),
// lalu menulis public/data/atlas.json. Jalankan ulang tiap tahun: tanggal hari tanpa bayangan dan
// gerhana yang tersimpan dihitung dari tanggal saat skrip dijalankan.
//
//   node scripts/atlas.mjs
//
// Hari tanpa bayangan dihitung dengan modul astronomi Bayang yang sama (Node 22.18+ menjalankan
// TypeScript langsung), jadi tanggalnya identik dengan yang tampil di bayang.raffstw.my.id.
import { readFileSync, writeFileSync } from "node:fs";
import { hariTanpaBayangan } from "../../bayang/src/matahari.ts";

const AKAR = new URL("../../", import.meta.url);
const baca = (p) => JSON.parse(readFileSync(new URL(p, AKAR), "utf8"));

const daerah = baca("bayang/src/data/daerah.json").daerah;
const umr = new Map(baca("umr/public/data/daerah.json").daerah.map((d) => [d.id, d]));
const gempa = baca("getar/public/data/gempa.json");
const bara = baca("bara/src/data/bara.json");
const gerhana = baca("gerhana/public/data/gerhana.json");

const DIBANGUN = new Date();
const TAHUN = [DIBANGUN.getUTCFullYear(), DIBANGUN.getUTCFullYear() + 1];
const RADIUS_GEMPA = 100;

const WITA = new Set(["Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara"]);
const WIT = new Set(["Maluku", "Maluku Utara", "Papua", "Papua Barat", "Papua Barat Daya", "Papua Tengah", "Papua Pegunungan", "Papua Selatan"]);
const zona = (prov) => (WIT.has(prov) ? 9 : WITA.has(prov) ? 8 : 7);

const RAD = Math.PI / 180;
function jarakKm(lat1, lon1, lat2, lon2) {
  const a = Math.sin(((lat2 - lat1) * RAD) / 2) ** 2 + Math.cos(lat1 * RAD) * Math.cos(lat2 * RAD) * Math.sin(((lon2 - lon1) * RAD) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

// Letusan terakhir per gunung: [indeks gunung, tahun, bulan, hari, akhir, vei, ragu, berlanjut].
const terakhir = new Map();
for (const [g, tahun, , , , , , berlanjut] of bara.letusan) {
  const lama = terakhir.get(g);
  if (!lama || tahun >= lama.tahun) terakhir.set(g, { tahun, berlanjut: Boolean(berlanjut) });
}
const gunungAktif = bara.gunung.map((g, i) => ({ ...g, i })).filter((g) => terakhir.has(g.i));

const indeksGerhana = new Map(gerhana.daerah.map((id, i) => [id, i]));
const bukaGerhana = (n) => ({ jenis: Math.floor((n % 100000) / 10000), tertutup: (n % 10000) / 1000 });

const hasil = daerah.map((d) => {
  const [lon, lat] = d.titik;
  const u = umr.get(d.id);

  // Gempa terkuat dalam radius, yang terbaru bila magnitudonya sama.
  let kuat = null;
  for (let i = 0; i < gempa.n; i++) {
    if (Math.abs(gempa.lat[i] - lat) > 1 || Math.abs(gempa.lon[i] - lon) > 1.1) continue;
    const km = jarakKm(lat, lon, gempa.lat[i], gempa.lon[i]);
    if (km > RADIUS_GEMPA) continue;
    if (!kuat || gempa.mag[i] > kuat.m || (gempa.mag[i] === kuat.m && gempa.t[i] > kuat.t)) kuat = { m: gempa.mag[i], t: gempa.t[i], km };
  }

  let dekat = null;
  for (const g of gunungAktif) {
    const km = jarakKm(lat, lon, g.lat, g.lon);
    if (!dekat || km < dekat.km) dekat = { g, km };
  }
  const akhir = terakhir.get(dekat.g.i);

  const bayang = TAHUN.flatMap((th) => hariTanpaBayangan(th, lat, lon, zona(d.prov)).map((k) => `${k.tahun}-${String(k.bulan).padStart(2, "0")}-${String(k.hari).padStart(2, "0")}`));

  const ig = indeksGerhana.get(d.id);
  const datang = gerhana.gerhana.filter((g) => new Date(g.t) > DIBANGUN && g.v[ig] > 0);
  const berikut = datang.slice(0, 3).map((g) => {
    const k = bukaGerhana(g.v[ig]);
    return [g.t.slice(0, 10), k.jenis, Math.round(k.tertutup * 100)];
  });
  const besar = datang.find((g) => bukaGerhana(g.v[ig]).jenis >= 2);

  return {
    id: d.id,
    nama: d.nama,
    prov: d.prov,
    titik: d.titik,
    upah: u ? [u.upah, u.jenisUpah] : null,
    gempa: kuat ? [kuat.m, new Date(kuat.t * 1000).getUTCFullYear(), Math.round(kuat.km)] : null,
    gunung: [dekat.g.nama, Math.round(dekat.km), akhir.tahun, akhir.berlanjut ? 1 : 0],
    bayang,
    gerhana: berikut,
    gerhanaBesar: besar ? [besar.t.slice(0, 10), bukaGerhana(besar.v[ig]).jenis] : null,
  };
});

writeFileSync(
  new URL("../public/data/atlas.json", import.meta.url),
  JSON.stringify({ dibangun: DIBANGUN.toISOString().slice(0, 10), radiusGempa: RADIUS_GEMPA, daerah: hasil }),
);
console.log(`${hasil.length} daerah`);
const k = hasil.find((d) => d.id === "kota-kediri");
console.log(JSON.stringify(k));
