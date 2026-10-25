// Naskah halaman depan yang berbentuk obrolan. Fakta (proyek, riwayat, sertifikat) tetap diambil
// dari data.ts; di sini hanya cara Rafi menceritakannya.
import type { T } from "./data";

export type Pesan =
  | { jenis: "teks"; isi: T }
  | { jenis: "foto"; src: string; alt: T; lebar: number; tinggi: number }
  | { jenis: "proyek"; kunci: string; komentar: T }
  | { jenis: "semuaProyek" }
  | { jenis: "riwayat" }
  | { jenis: "galeri" }
  | { jenis: "kontak" }
  | { jenis: "cekKota" };

export type Topik = { id: string; tanya: T; balas: Pesan[] };

const teks = (id: string, en: string): Pesan => ({ jenis: "teks", isi: { id, en } });

export const pembuka: Pesan[] = [
  teks("halo! aku rafi 👋", "hi! i'm rafi 👋"),
  teks("anak D4 Teknik Informatika Unair angkatan 2024, asli Kediri", "informatics student at Universitas Airlangga (class of 2024), from Kediri"),
  teks(
    "kerjaanku bikin aplikasi, sama alat-alat kecil soal Indonesia. mau tau apa? pencet aja pertanyaannya di bawah 👇",
    "i build apps, plus small tools about Indonesia. what do you want to know? tap a question below 👇",
  ),
];

export const topik: Topik[] = [
  {
    id: "siapa",
    tanya: { id: "kamu siapa sih?", en: "who are you?" },
    balas: [
      { jenis: "foto", src: "/rafi-cutout.webp", alt: { id: "Foto Rafi", en: "Photo of Rafi" }, lebar: 1147, tinggi: 1371 },
      teks("ini aku 😄", "this is me 😄"),
      teks(
        "lagi kuliah D4 Teknik Informatika di Fakultas Vokasi Unair. sehari-hari ngoding pakai Flutter, Laravel, Python, sama TypeScript",
        "studying informatics at Unair's vocational faculty. day to day i code in Flutter, Laravel, Python, and TypeScript",
      ),
      teks(
        "paling seneng ngoprek machine learning, apalagi yang buat bahasa Indonesia",
        "my favourite thing to tinker with is machine learning, especially for Indonesian",
      ),
      teks(
        "di luar ngoding: jalan-jalan, olahraga, nonton film, dengerin musik, main game, sama iseng nyoba-nyoba AI",
        "outside of code: travelling, sports, films, music, games, and messing around with AI",
      ),
    ],
  },
  {
    id: "unggulan",
    tanya: { id: "proyek paling gede apa?", en: "what's your biggest project?" },
    balas: [
      teks("ada tiga yang paling makan waktu:", "three ate most of my time:"),
      {
        jenis: "proyek",
        kunci: "Postur",
        komentar: {
          id: "bakal jadi skripsiku. kamera HP ngitung squat sama push-up, terus ngasih tau kalau gerakannya salah, misal lutut masuk ke dalam",
          en: "this will be my thesis. the phone camera counts squats and push-ups and tells you when your form is off, like knees caving in",
        },
      },
      {
        jenis: "proyek",
        kunci: "Tracking",
        komentar: {
          id: "app yang aku pake sendiri tiap hari: jadwal kuliah, tugas, workout, duit. ada 1.059 tes otomatis, iya aku lebay 😅",
          en: "the app i use every day: classes, assignments, workouts, money. it has 1,059 automated tests, yes i overdid it 😅",
        },
      },
      {
        jenis: "proyek",
        kunci: "Analisis Sentimen Berita Emiten",
        komentar: {
          id: "tiap hari baca berita saham sendiri terus ngasih skor positif/negatif. udah 11 ribu berita lebih, aku bacanya 0 wkwk",
          en: "it reads stock news every day and scores it positive or negative. 11,000+ articles so far, and i've read zero of them",
        },
      },
    ],
  },
  {
    id: "kota",
    tanya: { id: "cek kotaku dong", en: "check my city" },
    balas: [
      teks(
        "boleh! alat-alat yang aku bikin bisa ngitung macem-macem buat 514 kabupaten/kota",
        "sure! the tools i built can work things out for all 514 regencies and cities",
      ),
      { jenis: "cekKota" },
    ],
  },
  {
    id: "semua",
    tanya: { id: "semua proyekmu apa aja?", en: "show me everything" },
    balas: [teks("nih semuanya, dikelompokin biar nggak pusing:", "here's everything, grouped so it's not a mess:"), { jenis: "semuaProyek" }],
  },
  {
    id: "riwayat",
    tanya: { id: "prestasi sama pengalaman?", en: "achievements and experience?" },
    balas: [
      teks("dari zaman sekolah sampai sekarang, yang ada sertifikatnya kamu bisa liat langsung:", "from school until now; where there's a certificate you can open it:"),
      { jenis: "riwayat" },
    ],
  },
  {
    id: "foto",
    tanya: { id: "foto-foto dong", en: "got any photos?" },
    balas: [teks("ini kegiatan bareng anak-anak TI 📸", "some moments with my informatics cohort 📸"), { jenis: "galeri" }],
  },
  {
    id: "kenapa",
    tanya: { id: "kok webnya kayak chat?", en: "why is this a chat?" },
    balas: [
      teks("biar nggak kaku aja sih", "so it doesn't feel stiff"),
      teks("kemarin ada yang komen webku 'masih ai slop bang' 😭", "someone commented that my old site was 'still ai slop' 😭"),
      teks("jadi ya udah, kita ngobrol aja", "so here we are, chatting instead"),
    ],
  },
  {
    id: "kontak",
    tanya: { id: "bisa dihubungi di mana?", en: "how do i reach you?" },
    balas: [
      teks(
        "paling cepet lewat email, atau ketik pesan langsung di kotak bawah, nanti nyampe ke emailku",
        "email is fastest, or type a message in the box below and it'll land in my inbox",
      ),
      { jenis: "kontak" },
      teks("lagi nyari magang sama proyek lepas juga btw 👀", "also looking for internships and freelance work btw 👀"),
    ],
  },
];

export const teksObrolan = {
  status: { id: "anak TI Unair, Kediri", en: "informatics student, Kediri" } as T,
  ulang: { id: "ulang dari awal", en: "start over" } as T,
  ngetik: { id: "rafi lagi ngetik…", en: "rafi is typing…" } as T,
  ketik: { id: "tulis pesan buat rafi…", en: "write rafi a message…" } as T,
  kirim: { id: "Kirim", en: "Send" } as T,
  mintaEmail: {
    id: "makasih! boleh minta emailmu? biar aku bisa bales 🙏",
    en: "thanks! can i have your email so i can reply? 🙏",
  } as T,
  ketikEmail: { id: "email kamu…", en: "your email…" } as T,
  emailSalah: {
    id: "kayaknya emailnya belum lengkap deh, contohnya nama@gmail.com",
    en: "that email doesn't look complete, something like name@gmail.com",
  } as T,
  terkirim: { id: "udah masuk ke emailku! nanti aku bales ya ✌️", en: "it's in my inbox! i'll reply soon ✌️" } as T,
  gagalKirim: {
    id: "yah, pesannya gagal kekirim. coba lagi, atau langsung email ke rffernanditoo@gmail.com",
    en: "the message didn't go through. try again, or email rffernanditoo@gmail.com directly",
  } as T,
  cariKota: { id: "ketik kabupaten/kotamu…", en: "type your regency or city…" } as T,
  bukaDi: { id: "buka di", en: "open in" } as T,
  buka: { id: "buka", en: "open" } as T,
  kode: { id: "kode", en: "code" } as T,
  apk: { id: "apk", en: "apk" } as T,
  lihatSertifikat: { id: "liat sertifikat", en: "see certificate" } as T,
  unduhCv: { id: "unduh CV", en: "download CV" } as T,
  kotaPenutup: {
    id: "semua itu dihitung sama alat-alat yang aku bikin, pencet aja linknya kalau penasaran",
    en: "all of that comes from tools i built, tap a link if you're curious",
  } as T,
};

/** Satu kalimat santai per proyek untuk daftar lengkap. Kunci = judul proyek di data.ts (versi id). */
export const ringkas: Record<string, T> = {
  Tracking: { id: "app jadwal, tugas, olahraga, sama duit", en: "classes, tasks, workouts, and money in one app" },
  Postur: { id: "kamera ngitung squat & push-up, sekalian nilai gerakannya", en: "camera counts squats and push-ups and grades them" },
  UMR: { id: "upah minimum vs biaya hidup di 514 daerah", en: "minimum wage vs cost of living in 514 regions" },
  "Dulu Segini": { id: "uang zaman dulu kalau sekarang jadi berapa", en: "what old money is worth today" },
  "Tebak Daerah": { id: "tebak kabupaten/kota dari bentuknya, tiap hari", en: "guess the region from its shape, daily" },
  Getar: { id: "gempa M5+ sejak 1900 di sekitar daerahmu", en: "M5+ quakes since 1900 around you" },
  Bara: { id: "letusan gunung api sejak 1500", en: "volcanic eruptions since 1500" },
  Bayang: { id: "kapan bayanganmu hilang pas tengah hari", en: "when your shadow disappears at noon" },
  Hilal: { id: "hilal awal bulan Hijriah di 514 daerah", en: "the new crescent for 514 regions" },
  Gending: { id: "main gamelan Jawa di browser", en: "play Javanese gamelan in the browser" },
  Aksara: { id: "tulisan Latin jadi aksara Jawa, dan sebaliknya", en: "Latin to Javanese script and back" },
  Lidah: { id: "727 bahasa daerah dan seberapa terancam", en: "727 local languages and how endangered they are" },
  Lintas: { id: "sambungin dua daerah lewat perbatasan, tiap hari", en: "connect two regions across borders, daily" },
  Gerah: { id: "Indonesia makin panas, sejak kamu lahir naik berapa", en: "how much hotter Indonesia got since you were born" },
  Gerhana: { id: "semua gerhana matahari 1900–2100 per daerah", en: "every solar eclipse 1900–2100, per region" },
  Cicil: { id: "bunga cicilan yang sebenernya", en: "the real interest behind installments" },
  Cekrek: { id: "photobooth di browser, 3 2 1 cekrek", en: "a photobooth in your browser, 3 2 1 snap" },
  Tembus: { id: "latihan TOEFL ITP, satu soal per layar, langsung dikoreksi", en: "TOEFL ITP practice, one question per screen, marked instantly" },
  Napas: { id: "seberapa kotor udara di daerahmu, 1998–2024", en: "how dirty the air is where you live, 1998–2024" },
  Pendekin: { id: "pemendek banyak link sekaligus + QR", en: "shorten many links at once, with QR codes" },
  Superduperweb: { id: "web jasa bikin aplikasi, bayar pakai QRIS", en: "an app-building service site with QRIS payments" },
  "Portofolio Pribadi": { id: "web yang lagi kamu buka ini", en: "the site you're on" },
  WTOOLS: { id: "web kebugaran, tugas Workshop UI", en: "a fitness site for a UI workshop course" },
  "RSHP — Rumah Sakit Hewan Pendidikan": { id: "sistem rumah sakit hewan, tugas kuliah", en: "an animal hospital system, for coursework" },
  "Analisis Sentimen Berita Emiten": { id: "sentimen berita saham LQ45 tiap hari", en: "daily news sentiment for LQ45 stocks" },
};

/** Sertifikat yang membuktikan baris riwayat tertentu, dikunci dengan nama organisasi di data.ts. */
export const sertifikatRiwayat: Record<string, string> = {
  "HIMA Sarjana Terapan Teknik Informatika — Kabinet Selaras, Fakultas Vokasi UNAIR": "/certs/hima-kepengurusan.jpg",
  "PIMNAS x Airlangga Esports Championship — UKM E-Sports UNAIR": "/certs/panitia-esports.jpg",
  "SMA Negeri 1 Kota Kediri": "/certs/osis-sman1-v3.jpg",
  "Advanced Pateron Olympiad, Pateron Indonesia": "/certs/pateron-olympiad-asli.jpg",
  "Klinik Pendidikan MIPA": "/certs/kmnr-finalis-v3.jpg",
};
