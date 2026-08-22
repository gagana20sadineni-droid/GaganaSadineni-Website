import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17161a",
          color: "#f6d4d9",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: "0.02em",
          borderRadius: 6,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}
