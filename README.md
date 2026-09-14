# Portfolio — Flash

Next.js 16 + Tailwind CSS v4. Dark minimalis, bilingual (ID/EN) dengan toggle di navbar.

## Jalanin lokal
```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit konten
**Semua teks ada di `src/content/data.ts`.** Gak usah sentuh file lain.
Setiap teks punya dua versi: `{ id: "bahasa indonesia", en: "english" }`.

- Foto profil → taruh file di `public/profile.jpg`, lalu isi `photo: "/profile.jpg"` di data.ts
- CV → taruh `public/cv.pdf`, isi `cv: "/cv.pdf"` → tombol "Unduh CV" muncul otomatis
- Screenshot project → taruh di `public/projects/nama.png`, isi `image: "/projects/nama.png"`
- Ganti warna aksen → `--color-accent` di `src/app/globals.css`

## Deploy ke Vercel
Paling gampang lewat GitHub:
1. Push folder ini ke repo GitHub baru
2. Buka vercel.com → Add New → Project → import repo-nya
3. Framework auto-detect Next.js, tinggal Deploy

Atau tanpa GitHub:
```bash
npm i -g vercel
vercel          # ikutin promptnya
vercel --prod   # kalau udah oke
```

## Struktur
```
src/
  content/data.ts     ← SEMUA KONTEN DI SINI
  lib/i18n.tsx        ← logic toggle bahasa
  components/         ← Nav, Hero, About, Projects, Experience, Education, Contact
  app/                ← layout, page, globals.css
```
