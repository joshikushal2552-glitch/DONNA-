import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#080b11",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3b82f6",
          fontWeight: 800,
          borderRadius: "8px",
          border: "2px solid #1d4ed8",
          fontFamily: "sans-serif",
        }}
      >
        D
      </div>
    ),
    {
      ...size,
    }
  );
}