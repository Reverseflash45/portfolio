import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/lib/i18n";
import { profile } from "@/content/data";

/* Satu keluarga huruf untuk seluruh halaman. Sumbu lebar (wdth) dipakai sebagai
   suara: lebar untuk judul seperti judul lembar atlas, sempit untuk nama tempat. */
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  variable: "--huruf",
});

const deskripsi =
  "Mahasiswa Teknik Informatika Universitas Airlangga dari Kediri yang membuat aplikasi dan alat kecil tentang Indonesia.";

export const metadata: Metadata = {
  // dasar URL absolut untuk gambar pratinjau (opengraph-image) dan kanonik
  metadataBase: new URL("https://www.raffstw.my.id"),
  alternates: { canonical: "/" },
  title: profile.name,
  description: deskripsi,
  openGraph: {
    title: profile.name,
    description: deskripsi,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dce9ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e2130" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={archivo.variable}>
      <body>
        <LangProvider>{children}</LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
