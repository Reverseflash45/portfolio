import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/lib/i18n";
import { profile } from "@/content/data";

/* Satu keluarga huruf yang punya karakter; ukuran optik (opsz) membuat judul besar dan teks chat
   kecil sama-sama enak dibaca. */
const huruf = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  variable: "--huruf",
});

const deskripsi = "Ngobrol sama Rafi: anak TI Unair dari Kediri yang bikin aplikasi dan alat-alat kecil soal Indonesia.";

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
    { media: "(prefers-color-scheme: light)", color: "#e9e5f8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1626" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={huruf.variable}>
      <body>
        <LangProvider>{children}</LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
