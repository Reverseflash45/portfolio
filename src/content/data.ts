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
  photo: "/rafi-cutout.png",
  photoAlt: "/rafi-hero-alt.png", // tersingkap di sekitar kursor; kosongkan untuk menonaktifkan
  cv: "", // taruh /public/cv.pdf lalu isi: "/cv.pdf"
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
  ctaProjects: { id: "Lihat Portofolio", en: "View Portfolio" } as T,
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
  { name: "Flutter", color: "#54c5f8" },
  { name: "Dart", color: "#2bb7f6" },
  { name: "Laravel", color: "#ff2d20" },
  { name: "PHP", color: "#8892bf" },
  { name: "Python", color: "#ffd43b" },
  { name: "Go", color: "#00add8" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Next.js", color: "#e9eaec" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "Supabase", color: "#3ecf8e" },
  { name: "MySQL", color: "#00758f" },
  { name: "IndoBERT", color: "#ffb454" },
  { name: "Hugging Face", color: "#ffd21e" },
  { name: "ML Kit", color: "#4285f4" },
  { name: "Figma", color: "#f24e1e" },
  { name: "Git", color: "#f05032" },
  { name: "C++", color: "#649ad2" },
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

export type Project = {
  title: T | string;
  label: T;
  kind: "solo" | "course";
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
  items: [
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      title: "Tracking",
      desc: {
        id: "Aplikasi produktivitas pribadi yang menyatukan jadwal kuliah, tugas, workout, dan keuangan dalam satu app. Ada impor KRS/KHS lewat OCR, deteksi jadwal bentrok, penghitung repetisi latihan pakai kamera (ML Kit pose detection), pelacakan lari GPS, pembacaan struk otomatis, dan mode luring penuh. Saat ini 27 modul fitur, 31 tabel basis data, dan 950 test otomatis.",
        en: "A personal productivity app that unifies class schedules, assignments, workouts, and finances. Includes OCR import of academic records, schedule-clash detection, camera-based rep counting (ML Kit pose detection), GPS run tracking, automatic receipt reading, and full offline support. Currently 27 feature modules, 31 database tables, and 950 automated tests.",
      },
      tags: ["Flutter", "Dart", "Supabase", "ML Kit", "OCR", "Edge Functions"],
      repo: "https://github.com/Reverseflash45/Tracking",
      demo: "",
      apk: "https://github.com/Reverseflash45/Tracking/releases/latest",
    },
    {
      kind: "solo",
      label: { id: "Proyek Mandiri", en: "Personal Project" },
      title: "Superduperweb",
      desc: {
        id: "Web jasa pembuatan aplikasi: sisi publik berfungsi sebagai etalase dan alur closing (layanan, paket harga, portofolio, form brief) sementara panel admin dipakai untuk operasional — brief masuk, data klien, proyek, pembayaran, dan biaya. Tiap proyek mendapat tautan invoice bertoken sehingga klien bisa melihat status, membayar via QRIS atau transfer, dan mengunggah bukti tanpa perlu akun. Hanya pembayaran terverifikasi yang dihitung sebagai omzet, dan margin per proyek dihitung otomatis.",
        en: "A web-development services site: the public side works as a storefront and closing funnel (services, pricing, portfolio, brief form) while the admin panel runs operations — incoming briefs, clients, projects, payments, and costs. Each project gets a tokenised invoice link so clients can check status, pay by QRIS or transfer, and upload proof without an account. Only verified payments count towards revenue, and per-project margin is computed automatically.",
      },
      tags: ["Laravel", "PHP", "MySQL", "Midtrans/QRIS", "Blade"],
      repo: "https://github.com/Reverseflash45/Superduperweb",
      demo: "",
    },
    {
      kind: "course",
      label: { id: "Proyek Kuliah", en: "Coursework" },
      title: "WTOOLS",
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
      title: "RSHP — Rumah Sakit Hewan Pendidikan",
      desc: {
        id: "Aplikasi web manajemen rumah sakit hewan pendidikan: pendataan pasien, rekam medis, jadwal pemeriksaan, serta pencatatan transaksi dokter dan perawat.",
        en: "A web application for veterinary teaching hospital management: patient records, medical history, examination scheduling, and doctor/nurse transaction records.",
      },
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      repo: "https://github.com/Reverseflash45/RSHP",
      demo: "",
    },
    {
      kind: "course",
      label: { id: "Proyek Kuliah", en: "Coursework" },
      title: {
        id: "Analisis Sentimen Berita Saham",
        en: "Stock News Sentiment Analysis",
      },
      desc: {
        id: "Sistem klasifikasi sentimen berita emiten berbahasa Indonesia menggunakan model IndoBERT yang di-fine-tune.",
        en: "A sentiment classification system for Indonesian stock-issuer news using a fine-tuned IndoBERT model.",
      },
      tags: ["Python", "IndoBERT", "NLP", "Hugging Face"],
      repo: "",
      demo: "",
    },
  ] as Project[],
};

export type Experience = {
  role: T;
  org: string;
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
      degree: { id: "MIPA", en: "Natural Sciences" } as T,
      period: "2021 — 2024",
      note: {
        id: "Diterima melalui jalur prestasi dengan sertifikat KMNR tingkat nasional",
        en: "Admitted through the achievement track with a national-level KMNR certificate",
      } as T,
    },
    {
      school: "SMP Negeri 4 Kota Kediri",
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

export const nav = {
  about: { id: "Tentang", en: "About" } as T,
  projects: { id: "Proyek", en: "Projects" } as T,
  portfolio: { id: "Portofolio", en: "Portfolio" } as T,
  experience: { id: "Pengalaman", en: "Experience" } as T,
  education: { id: "Pendidikan", en: "Education" } as T,
  contact: { id: "Kontak", en: "Contact" } as T,
};

export const misc = {
  downloadCV: { id: "Unduh CV", en: "Download CV" } as T,
  scroll: { id: "Gulir", en: "Scroll" } as T,
  rights: { id: "Dibuat dengan Next.js", en: "Built with Next.js" } as T,
};
