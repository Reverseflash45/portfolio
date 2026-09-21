import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LangProvider } from "@/lib/i18n";
import { profile } from "@/content/data";

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.role.en,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.role.en,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        <LangProvider>{children}</LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
