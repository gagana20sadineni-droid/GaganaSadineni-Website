import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.eyebrow}`;
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
          justifyContent: "center",
          background: "#0a0a0b",
          color: "#f5f3ef",
          padding: "80px 88px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#e2929e",
            marginBottom: 28,
          }}
        >
          {site.eyebrow}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.02em" }}>
          {site.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#b9b5af",
            marginTop: 28,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          {site.lede}
        </div>
      </div>
    ),
    size,
  );
}
