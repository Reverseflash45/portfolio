// ============================================================
//  SEMUA KONTEN WEBSITE ADA DI FILE INI.
//  Edit di sini aja, gak usah sentuh file lain.
//  Setiap teks punya versi { id: "...", en: "..." }
// ============================================================

export type Lang = "id" | "en";
export type T = { id: string; en: string };

export const profile = {
  name: "Rafi Fernandito Setiawan",
  shortName: "Rafi",
  nickname: "rafi",
  role: {
    id: "ML Enthusiast · D4 Teknik Informatika",
    en: "ML Enthusiast · D4 Informatics Engineering",
  } as T,
  location: { id: "Kediri, Jawa Timur", en: "Kediri, East Java" } as T,
  email: "rffernanditoo@gmail.com",
  photo: "/rafi-cutout.webp",
  photoAlt: "/rafi-hero-alt.webp", // tersingkap di sekitar kursor; kosongkan untuk menonaktifkan
  cv: "/cv-rafi-fernandito-setiawan.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/Reverseflash45" },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/rafi-fernandito-setiawan-683b30307",
    },
    { label: "Instagram", url: "https://instagram.com/raffstw" },
  ],
};

export const loader = {
  line1: { id: "Selamat datang di", en: "Welcome to my" } as T,
  line2: { id: "Portofolio Saya", en: "Portfolio Website" } as T,
  loading: { id: "Memuat", en: "Loading" } as T,
};

export const hero = {
  greeting: { id: "Halo, saya", en: "Hi, I'm" } as T,
  headline: {
    id: ["Mengubah Ide", "Jadi Aplikasi"],
    en: ["Turning Ideas", "Into Applications"],
  },
  status: {
    id: "Terbuka untuk magang & proyek freelance",
    en: "Open to internships & freelance work",
  } as T,
  tagline: {
    id: "Mahasiswa Teknik Informatika Universitas Airlangga. Membangun aplikasi web dan mobile, sambil ngoprek machine learning untuk bahasa Indonesia.",
    en: "Informatics Engineering student at Universitas Airlangga. I build web and mobile applications, and tinker with machine learning for the Indonesian language.",
  } as T,
  roles: {
    id: ["ML Enthusiast", "Mobile Developer", "Web Developer", "Mahasiswa D4 Teknik Informatika"],
    en: ["ML Enthusiast", "Mobile Developer", "Web Developer", "Informatics Engineering Student"],
  },
  ctaPrimary: { id: "Lihat Proyek", en: "View Projects" } as T,
  ctaSecondary: { id: "Hubungi Saya", en: "Get in Touch" } as T,
};

export const about = {
  title: { id: "Tentang", en: "About" } as T,
  heading: { id: "Halo, saya", en: "Hi, I'm" } as T,
  ctaProjects: { id: "Lihat Portofolio", en: "View Portfolio" } as T,
  ctaResume: { id: "Lihat CV", en: "View Resume" } as T,
  body: {
    id: [
      "Saya Rafi, mahasiswa D4 Teknik Informatika Fakultas Vokasi Universitas Airlangga angkatan 2024. Saya terbiasa bekerja dengan PHP, Python, Dart, dan Go, serta framework seperti Laravel dan Flutter.",
      "Ketertarikan saya berpusat pada machine learning — terutama pemrosesan bahasa Indonesia — dan pengembangan aplikasi yang hasilnya bisa langsung dipakai orang. Sejak sekolah saya aktif di kompetisi akademik dan organisasi, mulai dari OSIS sampai Himpunan Mahasiswa.",
      "Di luar itu saya suka jalan-jalan, olahraga, film, musik, game, dan menghabiskan waktu bereksperimen dengan AI.",
    ],
    en: [
      "I'm Rafi, a D4 Informatics Engineering student at the Vocational Faculty of Universitas Airlangga, class of 2024. I work with PHP, Python, Dart, and Go, along with frameworks such as Laravel and Flutter.",
      "My interest centers on machine learning — particularly Indonesian language processing — and building applications people can actually use. Since school I've been active in academic competitions and student organizations, from the student council to the department's student association.",
      "Outside of that I enjoy travelling, sports, films, music, games, and spending time experimenting with AI.",
    ],
  },
};

export const skills = {
  title: { id: "Keahlian", en: "Skills" } as T,
  groups: [
    {
      label: { id: "Bahasa Pemrograman", en: "Languages" } as T,
      items: ["PHP", "Python", "Dart", "Go", "JavaScript", "C++", "SQL"],
    },
    {
      label: { id: "Framework & Tools", en: "Frameworks & Tools" } as T,
      items: ["Laravel", "Flutter", "Supabase", "MySQL", "Git", "Figma", "Tailwind CSS"],
    },
    {
      label: { id: "Machine Learning", en: "Machine Learning" } as T,
      items: ["IndoBERT", "Hugging Face", "scikit-learn", "Pandas", "NLP"],
    },
  ],
};

export const techStack = [
  { name: "Flutter", slug: "flutter", color: "#54c5f8" },
  { name: "Dart", slug: "dart", color: "#2bb7f6" },
  { name: "Laravel", slug: "laravel", color: "#ff2d20" },
  { name: "PHP", slug: "php", color: "#8892bf" },
  { name: "Python", slug: "python", color: "#ffd43b" },
  { name: "Go", slug: "go", color: "#00add8" },
  { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
  { name: "TypeScript", slug: "typescript", color: "#3178c6" },
  { name: "Next.js", slug: "nextdotjs", color: "#e9eaec" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#38bdf8" },
  { name: "Supabase", slug: "supabase", color: "#3ecf8e" },
  { name: "MySQL", slug: "mysql", color: "#00758f" },
  { name: "IndoBERT", color: "#ffb454" },
  { name: "Hugging Face", slug: "huggingface", color: "#ffd21e" },
  { name: "ML Kit", color: "#4285f4" },
  { name: "Figma", slug: "figma", color: "#f24e1e" },
  { name: "Git", slug: "git", color: "#f05032" },
  { name: "C++", slug: "cplusplus", color: "#649ad2" },
];

export const portfolioSection = {
  title: { id: "Portofolio", en: "Portfolio" } as T,
  tabs: {
    projects: { id: "Proyek", en: "Projects" } as T,
    certificates: { id: "Sertifikat", en: "Certificates" } as T,
    awards: { id: "Prestasi", en: "Awards" } as T,
    stack: { id: "Tech Stack", en: "Tech Stack" } as T,
  },
};

export const stats = {
  projects: { id: "Proyek", en: "Projects" } as T,
  projectsNote: { id: "Dibangun sendiri & tugas kuliah", en: "Built solo & for coursework" } as T,
  certificates: { id: "Sertifikat", en: "Certificates" } as T,
  certificatesNote: { id: "Kursus & kepanitiaan", en: "Courses & committees" } as T,
  awards: { id: "Prestasi", en: "Awards" } as T,
  awardsNote: { id: "Kompetisi tingkat nasional", en: "National-level competitions" } as T,
};

export type KategoriProyek = "aplikasi" | "data" | "sains" | "web" | "kuliah";

export type Project = {
  title: T | string;
  label: T;
  kind: "solo" | "course";
  kategori: KategoriProyek;
  desc: T;
  tags: string[];
  repo?: string;
  demo?: string;
  apk?: string;
  image?: string; // contoh: "/projects/rshp.png"
};

export const projects = {
  title: { id: "Proyek", en: "Projects" } as T,
  subtitle: {
    id: "Beberapa hal yang pernah saya bangun.",
    en: "A few things I've built.",
  } as T,
  labels: {
    solo: { id: "Proyek Mandiri", en: "Personal Project" } as T,
    course: { id: "Proyek Kuliah", en: "Coursework" } as T,
  },
  apkLabel: { id: "Unduh APK", en: "Download APK" } as T,
  showAll: { id: "Lihat semua proyek", en: "View all projects" } as T,
  showLess: { id: "Tampilkan lebih sedikit", en: "Show fewer" } as T,
  scrollHint: { id: "Gulir di dalam kotak", en: "Scroll inside the box" } as T,
  readMore: { id: "Selengkapnya", en: "Read more" } as T,
  readLess: { id: "Ringkas", en: "Show less" } as T,
  semua: { id: "Semua", en: "All" } as T,
  kategori: {
    aplikasi: { id: "Aplikasi", en: "Apps" } as T,
    data: { id: "Data & peta", en: "Data & maps" } as T,
    sains: { id: "Sains & interaktif", en: "Science & interactive" } as T,
    web: { id: "Web", en: "Web" } as T,
    kuliah: { id: "Kuliah", en: "Coursework" } as T,
  },
  filterLabel: { id: "Saring berdasarkan kategori", en: "Filter by category" } as T,
  items: [
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "aplikasi",
      title: "Tracking",
      image: "/projects/tracking.webp",
      desc: {
        id: "Aplikasi produktivitas pribadi yang menyatukan jadwal kuliah, tugas, workout, dan keuangan dalam satu app. Ada impor KRS/KHS lewat OCR, deteksi jadwal bentrok, penghitung repetisi latihan pakai kamera (ML Kit pose detection), pelacakan lari GPS, pembacaan struk otomatis, dan mode luring penuh. Saat ini 29 modul fitur, 34 tabel basis data, dan 1.059 test otomatis.",
        en: "A personal productivity app that unifies class schedules, assignments, workouts, and finances. Includes OCR import of academic records, schedule-clash detection, camera-based rep counting (ML Kit pose detection), GPS run tracking, automatic receipt reading, and full offline support. Currently 29 feature modules, 34 database tables, and 1,059 automated tests.",
      },
      tags: ["Flutter", "Dart", "Supabase", "ML Kit", "OCR", "Edge Functions"],
      repo: "https://github.com/Reverseflash45/Tracking",
      demo: "",
      apk: "https://github.com/Reverseflash45/Tracking/releases/latest",
    },
    {
      kind: "course",
      label: { id: "Skripsi", en: "Undergraduate Thesis" },
      kategori: "aplikasi",
      title: "Postur",
      image: "/projects/postur.webp",
      desc: {
        id: "Aplikasi Android yang menghitung repetisi squat dan push-up lewat kamera sekaligus menilai bentuk gerakannya per repetisi: kurang dalam, lutut masuk ke dalam, pinggul turun, dan sebagainya. Pose 33 titik dari ML Kit diolah menjadi deret waktu sudut sendi, lalu diklasifikasi di perangkat oleh empat pendekatan yang dibandingkan di skripsi: aturan ambang, Random Forest, 1D-CNN, dan LSTM (TFLite). Pipeline Python-nya mencakup ekstraksi fitur yang identik dengan versi Dart (diuji sampai 1e-8), evaluasi GroupKFold per subjek, uji McNemar, dan kurva belajar. Aplikasinya juga punya mode rekam dataset, tinjau dan label ulang di HP, putar ulang repetisi, serta umpan balik suara. Versi webnya menjalankan pipeline yang sama dari webcam: MediaPipe di browser dan berkas TFLite yang sama lewat TensorFlow.js, dengan selisih keluaran terhadap Python sekitar 5×10⁻⁷.",
        en: "An Android app that counts squat and push-up reps through the camera and grades the form of each rep: not deep enough, knees caving in, hips sagging, and so on. ML Kit's 33-point pose is turned into a time series of joint angles, then classified on-device by the four approaches the thesis compares: threshold rules, Random Forest, 1D-CNN, and LSTM (TFLite). The Python pipeline covers feature extraction identical to the Dart version (tested to 1e-8), per-subject GroupKFold evaluation, McNemar tests, and learning curves. The app also has a dataset-recording mode, on-device review and relabelling, rep replay, and spoken feedback. A web version runs the same pipeline from a webcam: MediaPipe in the browser and the very same TFLite files through TensorFlow.js, matching the Python outputs to about 5×10⁻⁷.",
      },
      tags: ["Flutter", "Python", "TensorFlow Lite", "ML Kit", "MediaPipe", "scikit-learn", "Pose Estimation"],
      repo: "https://github.com/Reverseflash45/postur",
      demo: "https://postur.raffstw.my.id",
      apk: "https://github.com/Reverseflash45/postur/releases/latest",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "UMR",
      image: "/projects/umr.webp",
      desc: {
        id: "Peta 514 kabupaten/kota yang membandingkan upah minimum 2026 dengan estimasi biaya hidup setempat. Bisa memakai UMK tiap daerah, gaji sendiri, atau upah kota asal yang dibawa ke daerah lain, dengan profil lajang, berdua, atau keluarga, dan gaji bersih setelah BPJS dan PPh 21. Ketuk satu daerah untuk melihat struk bulanannya, yang bisa dibagikan sebagai gambar. Datanya dikumpulkan sendiri: UMK dari SK gubernur 38 provinsi dan garis kemiskinan BPS yang diekstrak dari PDF sebagai indeks harga. Semua asumsinya dibuka di halaman metode, termasuk uji sensitivitasnya.",
        en: "A map of Indonesia's 514 regencies and cities comparing the 2026 minimum wage with an estimated local cost of living. You can use each region's wage, your own salary, or carry your home city's wage elsewhere, with single, couple, or family profiles and take-home pay after social security and income tax. Tap a region to see its monthly receipt, which can be shared as an image. The data was compiled from scratch: minimum wages from 38 governors' decrees and BPS poverty lines extracted from PDF as a price index. Every assumption, including a sensitivity analysis, is laid out on the methodology page.",
      },
      tags: ["TypeScript", "D3", "Vite", "Python", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/UMR",
      demo: "https://umr.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "Dulu Segini",
      image: "/projects/dulu-segini.webp",
      desc: {
        id: "Kalkulator daya beli rupiah 1967–2025: uang saku Rp1.000 tahun 1995 itu setara berapa sekarang? Dihitung dari Indeks Harga Konsumen, dua arah (dulu ke sekarang dan sebaliknya), lalu dibandingkan dengan tiga skenario kalau uang itu dulu disimpan tunai, ditukar dolar, atau dibelikan emas, semuanya dalam rupiah yang sudah disesuaikan inflasi. Data ditarik langsung dari API World Bank dan Pink Sheet lewat skrip Python, warna grafik divalidasi untuk buta warna, dan hasilnya bisa dibagikan sebagai kartu bergaya uang kertas lama dengan pola guilloche yang digambar sendiri.",
        en: "A rupiah purchasing-power calculator for 1967–2025: what is a Rp1,000 allowance from 1995 worth today? It works both ways using the consumer price index, then compares three what-ifs (keeping the money as cash, swapping it for dollars, or buying gold), all in inflation-adjusted rupiah. Data is pulled straight from the World Bank API and Pink Sheet by a Python script, chart colors are validated for color blindness, and results can be shared as a card styled like an old banknote with a hand-generated guilloche pattern.",
      },
      tags: ["TypeScript", "D3", "Vite", "Python", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/dulu-segini",
      demo: "https://dulu.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Tebak Daerah",
      image: "/projects/tebak-daerah.webp",
      desc: {
        id: "Game tebak satu dari 514 kabupaten dan kota di Indonesia dari bentuk wilayahnya, ala Worldle. Setiap tebakan salah memberi jarak, arah, dan persentase kedekatan; petunjuk provinsi terbuka setelah tiga tebakan. Ada soal harian yang sama untuk semua orang (diacak sekali dengan benih tetap supaya tidak berulang), mode bebas per pulau, hasil emoji untuk dibagikan, serta statistik dan streak. Batas wilayah geoBoundaries disederhanakan per daerah, bukan global, supaya kota kecil tidak jadi segitiga, dan pengujian otomatis memastikan luas tiap bentuk tetap cocok dengan aslinya.",
        en: "A Worldle-style game: guess one of Indonesia's 514 regencies and cities from its outline. Every wrong guess shows the distance, direction, and a proximity percentage, and a province hint unlocks after three guesses. There's a daily puzzle shared by everyone (shuffled once with a fixed seed so nothing repeats), a free-play mode filtered by island, a shareable emoji result, and stats with streaks. geoBoundaries outlines are simplified per region rather than globally so small cities don't collapse into triangles, and automated tests check every shape's area still matches the original.",
      },
      tags: ["TypeScript", "D3", "Vite", "GIS", "Game"],
      repo: "https://github.com/Reverseflash45/tebak-daerah",
      demo: "https://tebak.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "Getar",
      image: "/projects/getar.webp",
      desc: {
        id: "Peta 13 ribu lebih gempa M5+ di Indonesia sejak 1900 dari katalog USGS. Pilih kabupaten/kota dan radius untuk melihat berapa kali daerahmu diguncang, gempa terkuat dan terakhirnya, serta peta kecil lima gempa terbesar di sekitarnya. Seluruh katalog digambar sebagai pita seismogram dan peta kanvas yang memperlihatkan batas lempeng, berwarna sesuai kedalaman. Ada juga hukum Gutenberg–Richter dengan nilai b yang dihitung dari data dan penjelasan kenapa jumlah gempa tercatat naik. Skrip Node mengunduh katalog, membuang gempa negara tetangga, dan mencocokkan tiap episentrum dengan daerah terdekat.",
        en: "A map of 13,000+ magnitude 5+ earthquakes in Indonesia since 1900 from the USGS catalog. Pick a regency or city and a radius to see how often it has been shaken, its strongest and most recent quakes, and a small map of the five largest nearby. The whole catalog is drawn as a seismograph strip and a canvas map that traces the plate boundaries, colored by depth. It also covers the Gutenberg–Richter law with a b-value computed from the data and explains why recorded quake counts keep rising. A Node script downloads the catalog, drops quakes in neighboring countries, and matches every epicenter to its nearest region.",
      },
      tags: ["TypeScript", "D3", "Vite", "GIS", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/getar",
      demo: "https://getar.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "Bara",
      image: "/projects/bara.webp",
      desc: {
        id: "Semua letusan gunung api Indonesia sejak 1500 dari basis data Smithsonian Global Volcanism Program: 1.273 letusan dari 73 gunung, digambar sebagai garis waktu satu baris per gunung menyusuri busur vulkanik dari Aceh sampai Halmahera, dengan letusan panjang seperti Dukono (sejak 1933) sebagai garis durasi. Pilih kabupaten/kota untuk melihat gunung api terdekat beserta jarak, arah, dan riwayatnya; setiap gunung punya kartu dan peta sendiri, termasuk penanda gunung yang masih erupsi. Ada juga skala VEI dengan contoh nyata dan tiga letusan raksasa: Samalas, Tambora, dan Krakatau.",
        en: "Every recorded eruption of an Indonesian volcano since 1500 from the Smithsonian Global Volcanism Program: 1,273 eruptions from 73 volcanoes, drawn as a timeline with one row per volcano following the arc from Aceh to Halmahera, and long eruptions such as Dukono's (ongoing since 1933) shown as duration lines. Pick a regency or city to see the nearest volcanoes with their distance, direction, and history; every volcano has its own card and map, with ongoing eruptions marked. It also explains the VEI scale with real examples and the three giants: Samalas, Tambora, and Krakatau.",
      },
      tags: ["TypeScript", "D3", "Vite", "GIS", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/bara",
      demo: "https://bara.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Bayang",
      image: "/projects/bayang.webp",
      desc: {
        id: "Kapan matahari tepat di atas kepalamu? Bayang menghitung hari tanpa bayangan, dua kali setahun, untuk 514 kabupaten/kota langsung di peramban dengan algoritma posisi matahari NOAA/Meeus, tanpa data dari luar. Ada hitung mundur ke kejadian berikutnya, grafik panjang bayangan tengah hari sepanjang tahun, simulasi jam matahari tampak atas yang bisa diputar sehari penuh, peta tanggal dan jam terbit untuk seluruh Indonesia, serta penjelasan kenapa terjadi dua kali. Seluruh peta dihitung dalam sekitar 20 ms, dan hasilnya diuji terhadap nilai rujukan seperti kulminasi Pontianak di khatulistiwa.",
        en: "When is the sun directly overhead where you live? Bayang computes the two shadowless days each year for 514 regencies and cities right in the browser, using the NOAA/Meeus solar position algorithm with no external data. It shows a countdown to the next one, a year-long chart of noon shadow length, a top-down sundial simulation you can play through a full day, maps of the dates and today's sunrise across Indonesia, and an explanation of why it happens twice. The whole map is computed in about 20 ms, and results are tested against reference values such as Pontianak's equatorial culmination.",
      },
      tags: ["TypeScript", "D3", "Vite", "Astronomy", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/bayang",
      demo: "https://bayang.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Hilal",
      image: "/projects/hilal.webp",
      desc: {
        id: "Hisab awal bulan hijriah untuk 514 kabupaten/kota: setelah setiap ijtimak, posisi bulan dan matahari saat magrib dihitung di peramban dengan Astronomy Engine, lalu dibandingkan dengan kriteria MABIMS (tinggi 3°, elongasi 6,4°) dan wujudul hilal. Ada perkiraan awal Ramadan, Idulfitri, dan Iduladha, peta tinggi hilal, diagram langit barat saat magrib di daerahmu, serta tabel dua belas bulan yang menunjukkan kapan kedua kriteria berbeda. Hitungannya diuji terhadap penetapan yang sudah terjadi, termasuk perbedaan Idulfitri 2023 dan awal puasa 2024.",
        en: "Islamic month-start calculations for 514 Indonesian regencies and cities: after every new moon, the moon's and sun's positions at sunset are computed in the browser with Astronomy Engine and compared against the MABIMS criterion (3° altitude, 6.4° elongation) and the wujudul hilal criterion. It estimates the start of Ramadan, Eid al-Fitr, and Eid al-Adha, maps crescent altitude, draws the western sky at sunset for any region, and lists twelve months ahead showing when the two criteria disagree. The calculations are tested against past decisions, including the split Eid al-Fitr of 2023 and the split start of Ramadan in 2024.",
      },
      tags: ["TypeScript", "D3", "Vite", "Astronomy", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/hilal",
      demo: "https://hilal.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Gending",
      image: "/projects/gending.webp",
      desc: {
        id: "Gamelan Jawa yang bisa dimainkan di peramban, tanpa satu pun rekaman: saron, demung, peking, kenong, kempul, kethuk, dan gong disintesis dengan Web Audio dari parsial bilah logam dan denyut \"ombak\". Tulis balungan dalam notasi kepatihan, pilih lancaran, ketawang, atau ladrang, dan ricikan kolotomik otomatis jatuh di ketukan yang benar sementara lingkaran siklus gongan berputar. Ada juga perbandingan laras slendro dan pelog dengan nada piano yang bisa diketuk, dan setiap susunan bisa dibagikan lewat tautan.",
        en: "A playable Javanese gamelan in the browser with no recordings: saron, demung, peking, kenong, kempul, kethuk, and gong are synthesized in Web Audio from metal-bar partials and slow \"ombak\" beating. Write a balungan in kepatihan notation, choose lancaran, ketawang, or ladrang, and the colotomic instruments land on the right beats while a gongan cycle wheel turns. It also compares the slendro and pelog tunings with piano notes you can tap, and every arrangement can be shared as a link.",
      },
      tags: ["TypeScript", "Web Audio", "Vite", "Music", "Interactive"],
      repo: "https://github.com/Reverseflash45/gending",
      demo: "https://gending.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Aksara",
      image: "/projects/aksara.webp",
      desc: {
        id: "Alih aksara Latin ⇄ aksara Jawa (hanacaraka) yang menjelaskan dirinya sendiri: setiap suku kata diberi catatan, misalnya \"ka + layar (r mati)\" atau \"k mati, aksara berikutnya jadi pasangan\". Mesinnya menangani sandhangan, panyigeg, pasangan, cakra, keret, pengkal, pa cêrêk, aksara rekan, dan pilihan bacaan e, dengan kode Unicode yang diperiksa terhadap basis data Unicode dan diuji pada ejaan baku seperti Ngayogyakarta. Ada juga pembaca balik, tabel carakan beserta pasangannya menurut kisah Aji Saka, kuis, dan unduhan gambar.",
        en: "A self-explaining Latin ⇄ Javanese script (hanacaraka) transliterator: every syllable comes with a note such as \"ka + layar (final r)\" or \"dead k, the next letter becomes a pasangan\". The engine handles vowel signs, final consonant signs, pasangan conjuncts, cakra, keret, pengkal, pa cêrêk, loan letters, and a choice of how to read e, with code points checked against the Unicode database and tests on standard spellings such as Ngayogyakarta. It also reads Javanese back into Latin, shows the carakan with their pasangan along the Aji Saka legend, and includes a quiz and image download.",
      },
      tags: ["TypeScript", "Unicode", "Vite", "Javanese Script", "Interactive"],
      repo: "https://github.com/Reverseflash45/aksara",
      demo: "https://aksara.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "Lidah",
      image: "/projects/lidah.webp",
      desc: {
        id: "Peta 727 bahasa ibu yang dituturkan di Indonesia dari Glottolog 5.2.1: hanya 132 yang aman, sisanya rentan, terancam, atau sudah punah. Setiap bahasa diwarnai menurut status keterancaman atau rumpun (Austronesia lawan puluhan rumpun Papua), dengan komposisi per wilayah, delapan bahasa terdekat dari kabupaten/kotamu, dan kartu silsilah lengkap untuk tiap bahasa. Skrip Node mengunduh rilis CLDF Glottolog, menyaring bahasa ibu lisan di Indonesia, dan mencocokkannya dengan wilayah terdekat; palet warnanya divalidasi untuk buta warna.",
        en: "A map of the 727 mother tongues spoken in Indonesia from Glottolog 5.2.1: only 132 are safe, the rest are vulnerable, endangered, or already extinct. Each language is colored by endangerment status or family (Austronesian versus dozens of Papuan families), with a breakdown by region, the eight nearest languages to any regency or city, and a full family-tree card for every language. A Node script downloads Glottolog's CLDF release, filters spoken L1 languages in Indonesia, and matches each to its nearest region; the palettes are validated for color blindness.",
      },
      tags: ["TypeScript", "D3", "Vite", "Linguistics", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/lidah",
      demo: "https://lidah.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Lintas",
      image: "/projects/lintas.webp",
      desc: {
        id: "Teka-teki geografi harian ala Travle untuk 514 kabupaten/kota: diberi dua daerah di satu pulau, tebak wilayah di antaranya sampai jalurnya tersambung lewat perbatasan darat. Graf ketetanggaan dibangun langsung dari topologi peta, rute terpendek dihitung dengan BFS dari kedua ujung, dan tiap tebakan dinilai menurut penyimpangannya dari rute. Teka-teki harian dibuat dari benih nomor hari sehingga sama untuk semua orang, lengkap dengan petunjuk, hasil emoji untuk dibagikan, mode latihan, dan statistik di peramban.",
        en: "A Travle-style daily geography puzzle for Indonesia's 514 regencies and cities: given two regions on the same island, guess the ones in between until the land-border path connects. The adjacency graph is built straight from the map topology, shortest routes come from a BFS from both ends, and each guess is scored by how far it detours from a shortest route. Daily puzzles are generated from a day-number seed so everyone gets the same one, with hints, a shareable emoji result, a practice mode, and in-browser stats.",
      },
      tags: ["TypeScript", "Graph", "Vite", "GIS", "Game"],
      repo: "https://github.com/Reverseflash45/lintas",
      demo: "https://lintas.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: "Gerah",
      image: "/projects/gerah.webp",
      desc: {
        id: "Garis hangat Indonesia 1950–2024 dari reanalisis ERA5 lewat API World Bank Climate Change Knowledge Portal: satu garis per tahun, biru lebih sejuk dan merah lebih panas daripada rata-rata 1961–1990. Isi tahun lahir untuk melihat berapa derajat Indonesia memanas sejak itu, lengkap dengan hari di atas 30 °C dan malam tropis. Ada grafik anomali tahunan dengan garis tren (+0,23 °C per dekade) dan kalender panas 900 bulan yang dibandingkan dengan bulan yang sama, jadi musim tidak ikut terhitung. Semua angka di halaman dihitung langsung dari data.",
        en: "Warming stripes for Indonesia, 1950–2024, from ERA5 reanalysis via the World Bank Climate Change Knowledge Portal API: one stripe per year, blue cooler and red warmer than the 1961–1990 average. Enter your birth year to see how much Indonesia has warmed since, along with days above 30 °C and tropical nights. It also has an annual anomaly chart with a trend line (+0.23 °C per decade) and a 900-month heat calendar where each month is compared with the same month in the baseline, so seasons don't skew it. Every number on the page is computed from the data.",
      },
      tags: ["TypeScript", "D3", "Vite", "Climate", "Data Visualization"],
      repo: "https://github.com/Reverseflash45/gerah",
      demo: "https://gerah.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "sains",
      title: "Gerhana",
      image: "/projects/gerhana.webp",
      desc: {
        id: "Semua gerhana matahari yang terlihat dari Indonesia dari 1900 sampai 2100, dihitung untuk 514 kabupaten/kota dengan Astronomy Engine: 121 gerhana, 17 di antaranya melintaskan jalur total. Pilih daerah untuk melihat jam mulai, puncak, dan selesai dalam WIB/WITA/WIT, lama fase total atau cincin, serta gambar Matahari dan Bulan dari sudut pandang pengamat yang bisa diputar. Peta per gerhana memakai ketertutupan terbesar yang benar-benar terlihat, jadi gerhana yang puncaknya terjadi setelah Matahari terbenam tidak dilebih-lebihkan. Data peta dihitung paralel dengan worker thread memakai modul TypeScript yang sama dengan halaman, dan diuji terhadap gerhana 1983, 2016, dan 2019.",
        en: "Every solar eclipse visible from Indonesia between 1900 and 2100, computed for 514 regencies and cities with Astronomy Engine: 121 eclipses, 17 of them with a path of totality crossing the country. Pick a region to see local start, maximum, and end times, the length of totality or annularity, and a playable view of the Sun and Moon from the observer's point of view. Each eclipse map uses the largest obscuration that is actually visible, so eclipses that peak after sunset aren't overstated. Map data is computed in parallel with worker threads using the same TypeScript module as the page, and is tested against the 1983, 2016, and 2019 eclipses.",
      },
      tags: ["TypeScript", "Astronomy", "D3", "Vite", "GIS"],
      repo: "https://github.com/Reverseflash45/gerhana",
      demo: "https://gerhana.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: "Cicil",
      image: "/projects/cicil.webp",
      desc: {
        id: "Kalkulator bunga sebenarnya: masukkan uang yang diterima dan cicilan yang harus dibayar, lalu Cicil menghitung bunga efektifnya (IRR) per periode, per bulan, dan per tahun. Mendukung cicilan harian, mingguan, dan bulanan, bunga flat, potongan biaya di awal, serta pinjaman harian yang dibandingkan dengan batas manfaat ekonomi OJK. Hasilnya tampil sebagai struk rincian, grafik pokok dan bunga per cicilan, dan tabel konversi bunga flat ke efektif. Semua hitungan berjalan di peramban, diuji terhadap fungsi RATE spreadsheet, dan isian tersimpan di alamat halaman supaya bisa dibagikan.",
        en: "A true-interest calculator: enter the money you receive and the installments you pay, and Cicil works out the effective rate (IRR) per period, per month, and per year. It handles daily, weekly, and monthly installments, flat-rate loans, upfront fees, and daily loans checked against Indonesia's OJK cap on lending costs. Results show as an itemized receipt, a principal-versus-interest chart per installment, and a flat-to-effective conversion table. Everything runs in the browser, is tested against the spreadsheet RATE function, and keeps its inputs in the URL so results can be shared.",
      },
      tags: ["TypeScript", "Finance", "D3", "Vite"],
      repo: "https://github.com/Reverseflash45/cicil",
      demo: "https://cicil.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: "Cekrek",
      image: "/projects/cekrek.webp",
      desc: {
        id: "Photobooth di peramban: nyalakan kamera, tekan jepret, dan ikuti hitung mundur 3, 2, 1 untuk tiap foto. Setelah itu strip fotonya keluar dari slot dan warnanya muncul pelan-pelan seperti cetakan. Tersedia enam susunan hingga delapan foto (strip 4, strip 3, 4, 6, dan 8 kotak, polaroid), lima filter, dan empat belas bingkai: warna polos, motif seperti kain piknik, polkadot, dan langit malam berbintang, serta struk belanja dan karcis. Foto yang kurang pas bisa diulang satu per satu, dan foto dari galeri juga bisa dipakai. Filter pratinjau dan hasil cetak memakai definisi matriks warna yang sama. Semua diproses di perangkat tanpa unggahan, dengan hasil 1200×3600 piksel yang siap dicetak.",
        en: "A photobooth in the browser: turn on the camera, hit the shutter, and follow the 3, 2, 1 countdown for each shot. The strip then slides out of a slot and its colors develop like a fresh print. It offers six layouts of up to eight photos (4-strip, 3-strip, 4-, 6-, and 8-photo grids, polaroid), five filters, and fourteen frames: plain colors, patterns such as picnic gingham, polka dots, and a starry night sky, plus a shop receipt and a ticket stub. Any shot can be retaken on its own, and gallery photos work too. The live preview and the print share one color-matrix definition for each filter. Everything is processed on the device with no uploads, and the output is a print-ready 1200×3600 image.",
      },
      tags: ["TypeScript", "Canvas", "WebRTC", "Vite"],
      repo: "https://github.com/Reverseflash45/cekrek",
      demo: "https://cekrek.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: "Tembus",
      image: "/projects/tembus.webp",
      desc: {
        id: "Tempat latihan TOEFL ITP dengan pembahasan bahasa Indonesia, bertampilan lembar jawaban komputer: jawaban diarsir seperti pensil 2B lalu dikoreksi dengan coretan pulpen merah. Isinya materi 13 pola grammar dan 117 soal Structure & Written Expression, empat bacaan Reading dengan paragraf bukti yang disorot setelah menjawab, dialog Listening yang dibacakan suara bahasa Inggris dari browser (Web Speech API), kartu kosakata sinonim dengan sistem Leitner, serta simulasi mini 35 menit dengan perkiraan skor 310–677. Soal yang dulu salah lebih sering muncul. Semua soal ditulis sendiri, dan keutuhan bank soalnya diperiksa tes otomatis.",
        en: "A TOEFL ITP practice site with explanations in Indonesian, styled like a scannable answer sheet: answers are shaded like a 2B pencil and marked with red-pen ticks and crosses. It covers 13 grammar patterns with 117 Structure & Written Expression questions, four Reading passages that highlight the supporting paragraph after each answer, Listening dialogues read aloud by the browser's English voices (Web Speech API), synonym flashcards on a Leitner schedule, and a 35-minute mini test with an estimated 310–677 score. Questions answered wrongly come back more often. Every question is original, and automated tests check the integrity of the question bank.",
      },
      tags: ["TypeScript", "Web Speech API", "Edtech", "Vite"],
      repo: "https://github.com/Reverseflash45/tembus",
      demo: "https://tembus-five.vercel.app",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: "Pendekin",
      image: "/projects/pendekin.webp",
      desc: {
        id: "Pemendek URL massal: tempel hingga 20 tautan sekaligus (atau impor CSV) dan dapatkan tautan pendek, QR code, serta statistik klik per tautan — grafik harian, negara, perujuk, dan perangkat, tanpa menghitung bot pratinjau WhatsApp. Semua penulisan lewat fungsi Postgres yang memvalidasi di basis data, redirect memakai 302 supaya setiap klik tercatat dan tautan bisa kedaluwarsa, dan alamat IP tidak pernah disimpan.",
        en: "A bulk URL shortener: paste up to 20 links at once (or import a CSV) and get a short link, QR code, and click statistics for each — daily chart, country, referrer, and device, with link-preview bots excluded. All writes go through Postgres functions that validate in the database, redirects use 302 so every click is counted and links can expire, and IP addresses are never stored.",
      },
      tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      repo: "https://github.com/Reverseflash45/pendekin",
      demo: "https://pendek.raffstw.my.id",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: "Superduperweb",
      image: "/projects/superduperweb.webp",
      desc: {
        id: "Web jasa pembuatan aplikasi: sisi publik berfungsi sebagai etalase dan alur closing (layanan, paket harga, portofolio, form brief) sementara panel admin dipakai untuk operasional — brief masuk, data klien, proyek, pembayaran, dan biaya. Tiap proyek mendapat tautan invoice bertoken sehingga klien bisa melihat status, membayar via QRIS atau transfer, dan mengunggah bukti tanpa perlu akun. Hanya pembayaran terverifikasi yang dihitung sebagai omzet, dan margin per proyek dihitung otomatis.",
        en: "A web-development services site: the public side works as a storefront and closing funnel (services, pricing, portfolio, brief form) while the admin panel runs operations — incoming briefs, clients, projects, payments, and costs. Each project gets a tokenised invoice link so clients can check status, pay by QRIS or transfer, and upload proof without an account. Only verified payments count towards revenue, and per-project margin is computed automatically.",
      },
      tags: ["Laravel", "PHP", "MySQL", "Midtrans/QRIS", "Blade"],
      repo: "https://github.com/Reverseflash45/Superduperweb",
      demo: "",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "web",
      title: { id: "Portofolio Pribadi", en: "Personal Portfolio" },
      image: "/projects/portfolio.webp",
      desc: {
        id: "Situs yang sedang kamu buka: portofolio dwibahasa (ID/EN) dengan buku tamu publik lewat Supabase (RLS: publik hanya bisa membaca dan menulis, tidak bisa mengubah atau menghapus), form kontak privat, galeri sertifikat dengan lightbox, pemutar Spotify, dan foto interaktif yang tersingkap mengikuti kursor atau jari. Semua konten diatur dari satu file data, di-deploy ke Vercel dengan domain sendiri.",
        en: "The site you're on: a bilingual (ID/EN) portfolio with a public guestbook on Supabase (RLS: the public can only read and post, never edit or delete), a private contact form, a certificate gallery with a lightbox, a Spotify player, and an interactive photo revealed under the cursor or finger. All content lives in a single data file, deployed on Vercel with a custom domain.",
      },
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
      repo: "https://github.com/Reverseflash45/portfolio",
      demo: "https://www.raffstw.my.id",
    },
    {
      kind: "course",
      label: { id: "Proyek Kuliah", en: "Coursework" },
      kategori: "kuliah",
      title: "WTOOLS",
      image: "/projects/wtools.webp",
      desc: {
        id: "Proyek akhir Workshop UI: situs kebugaran berisi katalog produk, artikel, panduan gerakan latihan, dan panel admin. Dibangun dari desain Figma sendiri lalu diimplementasikan penuh menjadi antarmuka web.",
        en: "Final project for a UI Workshop course: a fitness site with a product catalogue, articles, exercise guides, and an admin panel. Designed in Figma and then implemented as a full web interface.",
      },
      tags: ["HTML", "CSS", "JavaScript", "Figma", "UI/UX"],
      repo: "https://github.com/Reverseflash45/wtools-ui-workshop",
      demo: "https://wtools-lovat.vercel.app",
    },
    {
      kind: "course",
      label: { id: "Proyek Kuliah", en: "Coursework" },
      kategori: "kuliah",
      title: "RSHP — Rumah Sakit Hewan Pendidikan",
      image: "/projects/rshp.webp",
      desc: {
        id: "Aplikasi web manajemen rumah sakit hewan pendidikan: pendataan pasien, rekam medis, jadwal pemeriksaan, serta pencatatan transaksi dokter dan perawat.",
        en: "A web application for veterinary teaching hospital management: patient records, medical history, examination scheduling, and doctor/nurse transaction records.",
      },
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      repo: "https://github.com/Reverseflash45/RSHP",
      demo: "",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      kategori: "data",
      title: {
        id: "Analisis Sentimen Berita Emiten",
        en: "Stock News Sentiment Analysis",
      },
      image: "/projects/sentimen.webp",
      desc: {
        id: "Sistem pemantauan sentimen berita 45 emiten LQ45: pengumpulan RSS yang patuh robots.txt dari 7 portal, pemetaan berita ke emiten, verifikasi ke keterbukaan informasi BEI, lalu penyandingan skor sentimen harian dengan harga saham lewat korelasi Pearson/Spearman dan uji Granger. Pengklasifikasi dirancang sebagai antarmuka yang bisa ditukar: baseline leksikon berjalan sekarang, IndoBERT hasil fine-tuning tinggal dipasang. Dasbor web + REST API, lebih dari 7.000 berita terkumpul, 261 uji otomatis.",
        en: "A news sentiment monitor for the 45 LQ45 stocks: robots.txt-compliant RSS collection from 7 portals, news-to-issuer mapping, verification against official IDX disclosures, then daily sentiment scores set against share prices with Pearson/Spearman correlation and Granger tests. The classifier is a swappable interface: a lexicon baseline runs today, and a fine-tuned IndoBERT model drops in without other changes. Web dashboard + REST API, over 7,000 articles collected, 261 automated tests.",
      },
      tags: ["Python", "FastAPI", "SQLAlchemy", "NLP", "IndoBERT"],
      repo: "https://github.com/Reverseflash45/sentimen-emiten",
      demo: "https://sentimen.raffstw.my.id",
    },
  ] as Project[],
};

export type Experience = {
  role: T;
  org: string;
  logo?: string;
  period: string;
  kind: "org" | "award";
  desc: T;
};

export const experience = {
  title: { id: "Pengalaman", en: "Experience" } as T,
  filters: {
    all: { id: "Semua", en: "All" } as T,
    org: { id: "Organisasi", en: "Organization" } as T,
    award: { id: "Prestasi", en: "Achievements" } as T,
  },
  items: [
    {
      kind: "org",
      role: { id: "Anggota", en: "Member" },
      org: "HIMA Sarjana Terapan Teknik Informatika — Kabinet Selaras, Fakultas Vokasi UNAIR",
      logo: "/logos/hima.png",
      period: "2025",
      desc: {
        id: "Anggota pengurus Himpunan Mahasiswa Sarjana Terapan Teknik Informatika periode 2025.",
        en: "Committee member of the Applied Bachelor Informatics Engineering student association, 2025 term.",
      },
    },
    {
      kind: "org",
      role: { id: "Panitia", en: "Committee Member" },
      org: "PIMNAS x Airlangga Esports Championship — UKM E-Sports UNAIR",
      logo: "/logos/ukm-esports.png",
      period: "Okt 2024",
      desc: {
        id: "Panitia turnamen esports tingkat universitas yang diselenggarakan di WTC War Arena Surabaya.",
        en: "Committee member for a university-level esports tournament held at WTC War Arena Surabaya.",
      },
    },
    {
      kind: "org",
      role: { id: "Pengurus OSIS — Sie Kesegaran Jasmani", en: "Student Council — Physical Fitness Division" },
      org: "SMA Negeri 1 Kota Kediri",
      logo: "/logos/sman1.png",
      period: "2021 — 2022",
      desc: {
        id: "Merencanakan dan menjalankan program kerja divisi serta kepanitiaan acara sekolah.",
        en: "Planned and ran divisional work programs and school event committees.",
      },
    },
    {
      kind: "award",
      role: {
        id: "Medali Perunggu Bidang Matematika — Tingkat Nasional",
        en: "Bronze Medal in Mathematics — National Level",
      },
      org: "Advanced Pateron Olympiad, Pateron Indonesia",
      logo: "/logos/pateron.png",
      period: "2022",
      desc: {
        id: "Peringkat 7 dari 246 peserta jenjang SMA/SMK/MA dalam Kompetisi Sains Tingkat Nasional.",
        en: "Ranked 7th out of 246 high-school participants in a national science competition.",
      },
    },
    {
      kind: "award",
      role: {
        id: "Finalis — Kompetisi Matematika Nalaria Realistik (KMNR) ke-14 Se-Indonesia",
        en: "Finalist — 14th Indonesian Realistic Reasoning Mathematics Competition (KMNR)",
      },
      org: "Klinik Pendidikan MIPA",
      logo: "/logos/kpm.png",
      period: "2019",
      desc: {
        id: "Lolos babak semifinal hingga final tingkat nasional; sertifikat digunakan sebagai jalur prestasi masuk SMA Negeri 1 Kota Kediri.",
        en: "Advanced through the semifinals to the national finals; the certificate was used for achievement-based admission to SMA Negeri 1 Kota Kediri.",
      },
    },
  ] as Experience[],
};

export const education = {
  title: { id: "Pendidikan & Pengalaman", en: "Education & Experience" } as T,
  eduLabel: { id: "Pendidikan", en: "Education" } as T,
  schools: [
    {
      school: "Universitas Airlangga",
      logo: "/logos/unair.png",
      degree: {
        id: "D4 Teknik Informatika — Fakultas Vokasi",
        en: "D4 Informatics Engineering — Vocational Faculty",
      } as T,
      period: "2024 — sekarang",
      note: {
        id: "Masuk tahun 2024, angkatan 2024 — saat ini menempuh semester aktif",
        en: "Enrolled in 2024 (class of 2024) — currently an active student",
      } as T,
    },
    {
      school: "SMA Negeri 1 Kota Kediri",
      logo: "/logos/sman1.png",
      degree: { id: "MIPA", en: "Natural Sciences" } as T,
      period: "2021 — 2024",
      note: {
        id: "Diterima melalui jalur prestasi dengan sertifikat KMNR tingkat nasional",
        en: "Admitted through the achievement track with a national-level KMNR certificate",
      } as T,
    },
    {
      school: "SMP Negeri 4 Kota Kediri",
      logo: "/logos/smpn4.png",
      degree: { id: "—", en: "—" } as T,
      period: "2018 — 2021",
      note: {
        id: "Diterima melalui jalur tes PPDB mandiri, sebelum nilai ujian nasional diumumkan",
        en: "Admitted through the independent entrance-test track, before national exam results were released",
      } as T,
    },
  ],
  certLabel: { id: "Sertifikat & Penghargaan", en: "Certificates & Awards" } as T,
  certProof: { id: "Lihat bukti sertifikat", en: "View certificate" } as T,
  certKinds: {
    award: { id: "Prestasi", en: "Award" } as T,
    course: { id: "Kursus", en: "Course" } as T,
    committee: { id: "Kepanitiaan", en: "Committee" } as T,
  },
  certificates: [
    {
      kind: "committee",
      name: {
        id: "Anggota Pengurus HIMA Teknik Informatika — Kabinet Selaras",
        en: "Committee Member, Informatics Engineering Student Association — Kabinet Selaras",
      } as T,
      issuer: "Fakultas Vokasi, Universitas Airlangga",
      detail: {
        id: "Kepengurusan Himpunan Mahasiswa Sarjana Terapan Teknik Informatika periode 2025",
        en: "Applied Bachelor Informatics Engineering student association, 2025 term",
      } as T,
      year: "2025",
      image: "/certs/hima-kepengurusan.jpg",
      date: "2025-12",
    },
    {
      kind: "committee",
      name: {
        id: "Panitia Teknik Informatika Sports League (TISL)",
        en: "Committee, Informatics Engineering Sports League (TISL)",
      } as T,
      issuer: "HIMA D4 Teknik Informatika, Universitas Airlangga",
      detail: {
        id: "Liga olahraga Teknik Informatika · 27 April, 3, 4, dan 11 Mei 2025",
        en: "Informatics Engineering sports league · 27 April and 3, 4, 11 May 2025",
      } as T,
      year: "2025",
      image: "/certs/panitia-tisl.jpg",
      date: "2025-05",
    },
    {
      kind: "award",
      name: { id: "Medali Perunggu Bidang Matematika", en: "Bronze Medal in Mathematics" } as T,
      issuer: "Advanced Pateron Olympiad — Pateron Indonesia",
      detail: {
        id: "Peringkat 7 dari 246 siswa · Kompetisi Sains Tingkat Nasional · 29–30 November 2022",
        en: "Ranked 7th of 246 students · National science competition · 29–30 November 2022",
      } as T,
      year: "2022",
      image: "/certs/pateron-olympiad-asli.jpg",
      date: "2022-11",
    },
    {
      kind: "award",
      name: {
        id: "Finalis KMNR ke-14 Se-Indonesia",
        en: "Finalist, 14th Indonesian KMNR",
      } as T,
      issuer: "Klinik Pendidikan MIPA — READ1 Institute",
      detail: {
        id: "Kompetisi Matematika Nalaria Realistik Se-Indonesia ke-14",
        en: "14th Indonesian Realistic Reasoning Mathematics Competition",
      } as T,
      year: "2019",
      image: "/certs/kmnr-finalis-v3.jpg",
      date: "2019-02",
      designCard: true,
    },
    {
      kind: "course",
      name: { id: "Website Development: Back End", en: "Website Development: Back End" } as T,
      issuer: "MySkill Short Class",
      detail: {
        id: "Short class Software Engineering · 14 April 2025",
        en: "Software Engineering short class · 14 April 2025",
      } as T,
      year: "2025",
      image: "/certs/myskill-backend.jpg",
      date: "2025-04-14",
    },
    {
      kind: "course",
      name: { id: "UX Writing", en: "UX Writing" } as T,
      issuer: "MySkill x Lion Parcel",
      detail: {
        id: "Short class UI/UX Research and Design · 21 April 2025",
        en: "UI/UX Research and Design short class · 21 April 2025",
      } as T,
      year: "2025",
      image: "/certs/myskill-uxwriting.jpg",
      date: "2025-04-21",
    },
    {
      kind: "course",
      name: {
        id: "Microsoft Office Untuk Pekerja — Grade A",
        en: "Microsoft Office for Professionals — Grade A",
      } as T,
      issuer: "Digitalskillsarea",
      detail: {
        id: "Mencakup Excel Data Analyst: uji hipotesis, khi-kuadrat, korelasi, regresi linear · 25 Mei – 1 Juni 2024",
        en: "Includes Excel Data Analyst: hypothesis testing, chi-square, correlation, linear regression · 25 May – 1 June 2024",
      } as T,
      year: "2024",
      image: "/certs/microsoft-office-digital.jpg",
      date: "2024-05",
    },
    {
      kind: "committee",
      name: {
        id: "Panitia PIMNAS x Airlangga Esports Championship",
        en: "Committee, PIMNAS x Airlangga Esports Championship",
      } as T,
      issuer: "UKM E-Sports Universitas Airlangga",
      detail: {
        id: "WTC War Arena Surabaya · 14–16 Oktober 2024",
        en: "WTC War Arena Surabaya · 14–16 October 2024",
      } as T,
      year: "2024",
      image: "/certs/panitia-esports.jpg",
      date: "2024-10",
    },
    {
      kind: "committee",
      name: {
        id: "Pengurus OSIS — Sie Kesegaran Jasmani",
        en: "Student Council — Physical Fitness Division",
      } as T,
      issuer: "SMA Negeri 1 Kediri",
      detail: {
        id: "Piagam penghargaan pengurus OSIS periode 2021/2022",
        en: "Certificate of appreciation, student council 2021/2022",
      } as T,
      year: "2022",
      image: "/certs/osis-sman1-v3.jpg",
      date: "2022-06",
      designCard: true,
    },
    {
      kind: "course",
      name: { id: "IE Games 19th Edition — Participant", en: "IE Games 19th Edition — Participant" } as T,
      issuer: "HMTI Institut Teknologi Sepuluh Nopember",
      detail: { id: "28 Januari 2024", en: "28 January 2024" } as T,
      year: "2024",
      image: "/certs/ie-games-its.jpg",
      date: "2024-01",
    },
  ],
};

export const contact = {
  title: { id: "Kontak", en: "Contact" } as T,
  body: {
    id: "Terbuka untuk peluang magang, proyek freelance, atau sekadar ngobrol soal teknologi.",
    en: "Open to internship opportunities, freelance projects, or just a chat about tech.",
  } as T,
  cta: { id: "Kirim Email", en: "Send an Email" } as T,
};

export const gallery = {
  title: { id: "Galeri", en: "Gallery" } as T,
  subtitle: {
    id: "Kegiatan, kompetisi, dan kepanitiaan.",
    en: "Activities, competitions, and committee work.",
  } as T,
  empty: {
    id: "Foto kegiatan akan tampil di sini",
    en: "Activity photos will appear here",
  } as T,
  // taruh file di /public/gallery/ lalu isi: { src: "/gallery/1.jpg", caption: {...} }
  items: [
    { src: "/gallery/lapangan.jpg", caption: { id: "Angkatan Teknik Informatika, Fakultas Vokasi UNAIR", en: "Informatics Engineering cohort, UNAIR Vocational Faculty" } },
    { src: "/gallery/tifl-basket.jpg", caption: { id: "TIFL — Teknik Informatika League", en: "TIFL — Informatics Engineering League" } },
    { src: "/gallery/ftmm.jpg", caption: { id: "Kunjungan ke FTMM Universitas Airlangga", en: "Visit to UNAIR Faculty of Advanced Technology" } },
    { src: "/gallery/haram-manja.jpg", caption: { id: "Kaderisasi Himpunan Mahasiswa Teknik Informatika", en: "Informatics Engineering student association training" } },
    { src: "/gallery/joglo.jpg", caption: { id: "Kegiatan angkatan di pendopo", en: "Cohort activity at the pavilion" } },
    { src: "/gallery/malam-pink.jpg", caption: { id: "Malam keakraban angkatan", en: "Cohort get-together night" } },
    { src: "/gallery/gedung-putih.jpg", caption: { id: "Kegiatan kampus bersama teman seangkatan", en: "Campus activity with coursemates" } },
    { src: "/gallery/kampus-kecil.jpg", caption: { id: "Kegiatan kelompok di kampus", en: "Group activity on campus" } },
  ] as { src: string; caption: T }[],
};

export const contactForm = {
  formTitle: { id: "Kirim Pesan", en: "Send a Message" } as T,
  labelPrivat: { id: "Privat", en: "Private" } as T,
  privateNote: {
    id: "Pesan masuk langsung ke email saya dan tidak tampil di halaman ini.",
    en: "Messages go straight to my inbox and never appear on this page.",
  } as T,
  name: { id: "Nama", en: "Name" } as T,
  namePh: { id: "Nama kamu", en: "Your name" } as T,
  email: { id: "Email", en: "Email" } as T,
  emailPh: { id: "email@kamu.com", en: "you@email.com" } as T,
  message: { id: "Pesan", en: "Message" } as T,
  messagePh: { id: "Tulis pesan di sini…", en: "Write your message here…" } as T,
  submit: { id: "Kirim", en: "Send" } as T,

  // Endpoint penerima form. Isi salah satu, lalu deploy ulang:
  //   Formspree   https://formspree.io/f/xxxxxxxx
  //   Web3Forms   https://api.web3forms.com/submit   (+ isi accessKey di bawah)
  // Dikosongkan = form dinonaktifkan, pengunjung diarahkan ke tombol email.
  endpoint: "https://formspree.io/f/mgavvrqo",
  // Hanya untuk Web3Forms. Formspree tidak memerlukannya.
  accessKey: "",

  sending: { id: "Mengirim…", en: "Sending…" } as T,
  sent: {
    id: "Pesan terkirim. Terima kasih — saya balas lewat email.",
    en: "Message sent. Thank you — I will reply by email.",
  } as T,
  failed: {
    id: "Gagal mengirim. Coba lagi, atau pakai tombol email di bawah.",
    en: "Failed to send. Please try again, or use the email button below.",
  } as T,
  required: {
    id: "Nama, email, dan pesan wajib diisi.",
    en: "Name, email, and message are required.",
  } as T,
  disabledNote: {
    id: "Form belum aktif — hubungkan endpoint di data.ts. Sementara pakai tombol email di bawah.",
    en: "Form not active yet — connect an endpoint in data.ts. Use the email button below for now.",
  } as T,
  findMe: { id: "Temukan Saya", en: "Find Me" } as T,
};

export const komentarTeks = {
  judul: { id: "Buku Tamu", en: "Guestbook" } as T,
  labelPublik: { id: "Publik", en: "Public" } as T,
  catatan: {
    id: "Sapaan singkat yang langsung tampil di halaman ini dan bisa dibaca siapa saja. Untuk pesan pribadi, pakai Kirim Pesan di atas.",
    en: "A short note that appears on this page right away for anyone to read. For a private message, use Send a Message above.",
  } as T,
  nama: { id: "Nama", en: "Name" } as T,
  namaPh: { id: "Nama kamu", en: "Your name" } as T,
  isi: { id: "Komentar", en: "Comment" } as T,
  isiPh: { id: "Tulis komentar di sini…", en: "Write your comment here…" } as T,
  kirim: { id: "Tulis di Buku Tamu", en: "Sign the Guestbook" } as T,
  mengirim: { id: "Mengirim…", en: "Posting…" } as T,
  memuat: { id: "Memuat komentar…", en: "Loading comments…" } as T,
  kosong: {
    id: "Buku tamu masih kosong. Jadi yang pertama.",
    en: "The guestbook is empty. Be the first to sign it.",
  } as T,
  terkirim: { id: "Komentar terkirim.", en: "Comment posted." } as T,
  gagal: {
    id: "Gagal mengirim komentar. Coba lagi sebentar lagi.",
    en: "Failed to post. Please try again shortly.",
  } as T,
  kurang: {
    id: "Nama dan komentar wajib diisi.",
    en: "Name and comment are required.",
  } as T,
  terlaluCepat: {
    id: "Tunggu sebentar sebelum mengirim komentar lagi.",
    en: "Please wait a moment before posting again.",
  } as T,
};

export const music = {
  title: { id: "Sedang Diputar", en: "On Repeat" } as T,
  note: { id: "Playlist yang nemenin ngoding", en: "The playlist I code to" } as T,
  // ID playlist Spotify — kosongkan untuk menyembunyikan kartu
  playlistId: "7kEKyigwb24IphyH9ZN2MV",
  openLabel: { id: "Buka di Spotify", en: "Open in Spotify" } as T,
};

export const nav = {
  about: { id: "Tentang", en: "About" } as T,
  projects: { id: "Proyek", en: "Projects" } as T,
  portfolio: { id: "Portofolio", en: "Portfolio" } as T,
  gallery: { id: "Galeri", en: "Gallery" } as T,
  experience: { id: "Pengalaman", en: "Experience" } as T,
  education: { id: "Pendidikan", en: "Education" } as T,
  contact: { id: "Kontak", en: "Contact" } as T,
};

export const misc = {
  slotCv: { id: "belum ada", en: "not added" } as T,
  slotImage: { id: "slot gambar", en: "image slot" } as T,
  downloadCV: { id: "Unduh CV", en: "Download CV" } as T,
  scroll: { id: "Gulir", en: "Scroll" } as T,
  rights: { id: "Dibuat dengan Next.js", en: "Built with Next.js" } as T,
};
