import { ImageResponse } from "next/og";
import { site } from "@content/site";
import { tr } from "@content/types";

// Image de partage (réseaux sociaux, WhatsApp…) générée automatiquement
export const alt = `${site.name} — ${site.title.fr}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0d12",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255,138,76,0.35), transparent 22%), radial-gradient(circle at 15% 85%, rgba(124,77,255,0.35), transparent 35%)",
          color: "#edebe6",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#5ce1e6" }}>
          {site.name}.<span style={{ color: "#7c4dff" }}>_</span>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 130, fontWeight: 800, letterSpacing: 8 }}>
          {site.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 34, letterSpacing: 6, color: "#a9a7b3" }}>
          {tr(site.title, locale).toUpperCase()}
        </div>
      </div>
    ),
    size,
  );
}
