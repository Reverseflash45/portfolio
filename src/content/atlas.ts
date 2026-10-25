// Teks khusus halaman versi atlas. Detail proyek, pendidikan, dan sertifikat tetap di data.ts.
import type { T } from "./data";

export const atlasTeks = {
  intro: {
    id: "Mahasiswa Teknik Informatika Universitas Airlangga, dari Kediri. Saya membuat aplikasi dan alat kecil tentang Indonesia. Pilih daerahmu di peta untuk mencobanya.",
    en: "Informatics Engineering student at Universitas Airlangga, from Kediri. I build apps and small tools about Indonesia. Pick your region on the map to try them.",
  } as T,
  status: { id: "Terbuka untuk magang dan proyek lepas.", en: "Open to internships and freelance work." } as T,
  cari: { id: "Cari kabupaten/kota", en: "Search a regency or city" } as T,
  asal: { id: "asal saya", en: "my hometown" } as T,
  kembali: { id: "Kembali ke Kediri", en: "Back to Kediri" } as T,
  memuat: { id: "Memuat peta…", en: "Loading map…" } as T,
  gagal: {
    id: "Peta tidak bisa dimuat. Muat ulang halaman, atau lihat karyanya langsung di bawah.",
    en: "The map could not load. Reload the page, or browse the work below.",
  } as T,
  catatanLegenda: {
    id: "Setiap baris dihitung oleh salah satu proyek saya, di titik tengah daerah itu. Klik nama proyeknya untuk membuka.",
    en: "Each row comes from one of my projects, computed at the centre of the region. Click a project name to open it.",
  } as T,
  fakta: {
    upah: { id: "Upah minimum 2026", en: "2026 minimum wage" } as T,
    gempa: { id: "Gempa terkuat dalam 100 km sejak 1900", en: "Strongest quake within 100 km since 1900" } as T,
    gunung: { id: "Gunung api terdekat", en: "Nearest volcano" } as T,
    bayang: { id: "Hari tanpa bayangan berikutnya", en: "Next shadowless day" } as T,
    gerhana: { id: "Gerhana matahari berikutnya", en: "Next solar eclipse" } as T,
  },
  tanpaGempa: { id: "Tidak ada gempa M5+ tercatat", en: "No M5+ quake on record" } as T,
  karya: { id: "Karya", en: "Work" } as T,
  karyaIntro: {
    id: "Tiga proyek terbesar lebih dulu, lalu semua sisanya menurut jenisnya.",
    en: "The three biggest projects first, then everything else by kind.",
  } as T,
  semuaKarya: { id: "Semua karya", en: "Everything else" } as T,
  buka: { id: "Buka", en: "Open" } as T,
  kode: { id: "Kode", en: "Code" } as T,
  apk: { id: "APK", en: "APK" } as T,
  tentang: { id: "Tentang saya", en: "About me" } as T,
  riwayat: { id: "Riwayat", en: "Timeline" } as T,
  sertifikat: { id: "Kursus dan sertifikat lain", en: "Courses and other certificates" } as T,
  lihat: { id: "lihat", en: "view" } as T,
  lihatSertifikat: { id: "lihat sertifikat", en: "view certificate" } as T,
  kontak: { id: "Kontak", en: "Contact" } as T,
  kontakIntro: {
    id: "Untuk magang, proyek lepas, atau ngobrol soal salah satu alat di atas, kirim email.",
    en: "For internships, freelance work, or a chat about any of the tools above, send an email.",
  } as T,
  unduhCv: { id: "Unduh CV (PDF)", en: "Download CV (PDF)" } as T,
  kaki: {
    id: "Batas wilayah: geoBoundaries ADM2. Fakta per daerah diambil dari proyek-proyek di atas.",
    en: "Boundaries: geoBoundaries ADM2. Regional facts come from the projects above.",
  } as T,
};

/** Proyek yang dibahas panjang, urut. Kuncinya judul proyek di data.ts (versi id bila dwibahasa). */
export const unggulan = ["Postur", "Tracking", "Analisis Sentimen Berita Emiten"];

/** Satu kalimat per proyek untuk indeks. Kunci sama dengan di atas. */
export const ringkas: Record<string, T> = {
  Tracking: {
    id: "Aplikasi Android pribadi untuk jadwal kuliah, tugas, olahraga, dan keuangan.",
    en: "Personal Android app for classes, assignments, workouts, and money.",
  },
  Postur: {
    id: "Menghitung repetisi squat dan push-up lewat kamera, lalu menilai bentuk gerakannya.",
    en: "Counts squats and push-ups through the camera and grades the form of each rep.",
  },
  UMR: {
    id: "Upah minimum 2026 dibandingkan biaya hidup di 514 kabupaten/kota.",
    en: "2026 minimum wage against the local cost of living in 514 regions.",
  },
  "Dulu Segini": {
    id: "Uang tahun berapa pun sejak 1967 setara berapa sekarang, menurut inflasi.",
    en: "What money from any year since 1967 is worth today, by inflation.",
  },
  "Tebak Daerah": {
    id: "Game harian: tebak kabupaten/kota dari bentuk wilayahnya.",
    en: "Daily game: guess the regency or city from its outline.",
  },
  Getar: {
    id: "Gempa M5+ sejak 1900 di sekitar kabupaten/kotamu.",
    en: "M5+ earthquakes since 1900 around your region.",
  },
  Bara: {
    id: "Letusan gunung api sejak 1500 dan gunung terdekat dari daerahmu.",
    en: "Volcanic eruptions since 1500 and the volcanoes nearest you.",
  },
  Bayang: {
    id: "Tanggal dan jam saat bayangan benda tegak hilang di daerahmu.",
    en: "The dates and times when upright objects cast no shadow where you live.",
  },
  Hilal: {
    id: "Posisi hilal awal bulan Hijriah di 514 daerah, menurut MABIMS dan wujudul hilal.",
    en: "The new crescent at the start of each Hijri month, for 514 regions and two criteria.",
  },
  Gending: {
    id: "Gamelan Jawa yang bisa dimainkan di peramban, lengkap dengan struktur gendingnya.",
    en: "Javanese gamelan you can play in the browser, with real piece structures.",
  },
  Aksara: {
    id: "Alih aksara Latin ke aksara Jawa, dan sebaliknya.",
    en: "Transliterates Latin text into Javanese script and back.",
  },
  Lidah: {
    id: "727 bahasa ibu di Indonesia dan seberapa terancam masing-masing.",
    en: "Indonesia's 727 native languages and how endangered each one is.",
  },
  Lintas: {
    id: "Teka-teki harian: sambungkan dua daerah lewat perbatasan darat.",
    en: "Daily puzzle: connect two regions across land borders.",
  },
  Gerah: {
    id: "Suhu Indonesia 1950–2024, dan seberapa panas sejak kamu lahir.",
    en: "Indonesia's temperature from 1950 to 2024, and how much warmer since you were born.",
  },
  Gerhana: {
    id: "Semua gerhana matahari 1900–2100 yang terlihat dari tiap kabupaten/kota.",
    en: "Every solar eclipse from 1900 to 2100 visible from each region.",
  },
  Cicil: {
    id: "Bunga sebenarnya dari cicilan, bunga flat, paylater, dan pinjaman harian.",
    en: "The real interest rate behind installments, flat rates, and daily loans.",
  },
  Pendekin: {
    id: "Pemendek banyak tautan sekaligus, dengan kode QR dan statistik klik.",
    en: "Shortens many links at once, with QR codes and click statistics.",
  },
  Superduperweb: {
    id: "Situs jasa pembuatan aplikasi dengan panel admin dan invoice yang bisa dibayar lewat QRIS.",
    en: "A software agency site with an admin panel and invoices payable by QRIS.",
  },
  "Portofolio Pribadi": {
    id: "Situs ini.",
    en: "This site.",
  },
  WTOOLS: {
    id: "Situs kebugaran dari desain Figma sendiri, proyek akhir Workshop UI.",
    en: "A fitness site built from my own Figma design, for a UI workshop course.",
  },
  "RSHP — Rumah Sakit Hewan Pendidikan": {
    id: "Pendataan pasien, rekam medis, dan jadwal rumah sakit hewan pendidikan.",
    en: "Patient records, medical history, and schedules for a teaching animal hospital.",
  },
  "Analisis Sentimen Berita Emiten": {
    id: "Memantau sentimen berita 45 saham LQ45 dan menyandingkannya dengan harga.",
    en: "Tracks news sentiment for the 45 LQ45 stocks and sets it against share prices.",
  },
};

/** Uraian pendek untuk proyek unggulan; deskripsi lengkap di data.ts terlalu panjang untuk halaman depan. */
export const uraianUnggulan: Record<string, T> = {
  Postur: {
    id: "Aplikasi Android yang menghitung repetisi squat dan push-up lewat kamera dan menilai bentuk tiap repetisi, misalnya lutut masuk ke dalam atau pinggul turun. Empat cara klasifikasi dibandingkan: aturan ambang, Random Forest, 1D-CNN, dan LSTM, semuanya berjalan di HP. Versi webnya memakai model yang sama lewat webcam.",
    en: "An Android app that counts squats and push-ups through the camera and grades each rep, for example knees caving in or hips sagging. It compares four classifiers, threshold rules, Random Forest, 1D-CNN, and LSTM, all running on the phone. The web version runs the same models from a webcam.",
  },
  Tracking: {
    id: "Aplikasi yang saya pakai sendiri setiap hari untuk jadwal kuliah, tugas, olahraga, dan keuangan. Jadwal diimpor dari KRS lewat OCR, repetisi latihan dihitung kamera, dan lari dilacak dengan GPS. Ada 29 modul fitur dan 1.059 tes otomatis, dan semuanya tetap jalan tanpa internet.",
    en: "The app I use every day for classes, assignments, workouts, and money. Schedules are imported from enrolment records with OCR, reps are counted by the camera, and runs are tracked with GPS. It has 29 feature modules and 1,059 automated tests, and all of it works offline.",
  },
  "Analisis Sentimen Berita Emiten": {
    id: "Setiap hari sistem ini mengumpulkan berita dari tujuh portal, mencari saham LQ45 yang dibahas, memberi skor sentimen, lalu menyandingkannya dengan harga. Lebih dari 11 ribu berita sudah terkumpul. Pengklasifikasinya bisa ditukar ke IndoBERT tanpa mengubah bagian lain.",
    en: "Every day this system collects news from seven portals, finds which LQ45 stocks it covers, scores its sentiment, and sets that against share prices. Over 11,000 articles so far. The classifier can be swapped for IndoBERT without touching anything else.",
  },
};

/** Sertifikat yang membuktikan baris riwayat tertentu, dikunci dengan nama organisasi di data.ts. */
export const sertifikatRiwayat: Record<string, string> = {
  "HIMA Sarjana Terapan Teknik Informatika — Kabinet Selaras, Fakultas Vokasi UNAIR": "/certs/hima-kepengurusan.jpg",
  "PIMNAS x Airlangga Esports Championship — UKM E-Sports UNAIR": "/certs/panitia-esports.jpg",
  "SMA Negeri 1 Kota Kediri": "/certs/osis-sman1-v3.jpg",
  "Advanced Pateron Olympiad, Pateron Indonesia": "/certs/pateron-olympiad-asli.jpg",
  "Klinik Pendidikan MIPA": "/certs/kmnr-finalis-v3.jpg",
};
