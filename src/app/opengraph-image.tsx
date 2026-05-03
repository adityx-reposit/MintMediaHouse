import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mint Media House - UI Animation & Launch Video Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "radial-gradient(ellipse 80% 70% at 30% 40%, rgba(251,115,0,0.55) 0%, rgba(180,60,0,0.25) 45%, rgba(10,10,10,0) 75%), #0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo */}
        <img
          src="https://mintmediahouse.in/logo2.png"
          width={320}
          height={213}
          style={{ objectFit: "contain", filter: "invert(1)" }}
        />

        {/* Tagline */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 28,
            marginTop: 32,
            letterSpacing: "0.05em",
            opacity: 0.7,
          }}
        >
          UI Animation & Launch Video Agency for SaaS
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 40,
            color: "#22c55e",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          <span>10M+ Views</span>
          <span>·</span>
          <span>15+ Clients</span>
          <span>·</span>
          <span>mintmediahouse.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
