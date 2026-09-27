import { ImageResponse } from "next/og";
import { profile } from "@/content/data";

/* Gambar pratinjau saat tautan porto dibagikan (WhatsApp, LinkedIn, dll).
   Dibuat saat build dari data profil, jadi ikut berubah kalau data diubah. */
export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 78% 22%, rgba(94,234,212,0.18), transparent 55%), #08090b",
          color: "#e9eaec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 1, background: "#5eead4" }} />
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#5eead4", textTransform: "uppercase" }}>
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ marginTop: 20, fontSize: 34, color: "#8b8f99" }}>{profile.role.id}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8b8f99" }}>
          <span>Web · Mobile · Machine Learning</span>
          <span style={{ color: "#5eead4" }}>raffstw.my.id</span>
        </div>
      </div>
    ),
    size,
  );
}
