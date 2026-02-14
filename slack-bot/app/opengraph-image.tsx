import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Growthmind - Stop Guessing. Start Growing.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Helper to convert ArrayBuffer to base64 data URL
function arrayBufferToBase64(buffer: ArrayBuffer, mimeType: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mimeType};base64,${btoa(binary)}`;
}

// Image generation
export default async function Image() {
  // Fetch the logo from public folder and convert to base64 data URL
  const logoBuffer = await fetch(
    new URL("../public/logo.png", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const logoData = arrayBufferToBase64(logoBuffer, "image/png");

  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: "#0A0B0C",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontFamily: "sans-serif",
        padding: 80,
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/image not supported in OG ImageResponse */}
        <img
          src={logoData}
          alt="Growthmind Logo"
          width={350}
          height={108}
          style={{ marginBottom: 20 }}
        />
      </div>
      <p style={{ fontSize: 36, color: "#9ca3af", margin: 0, maxWidth: 900 }}>
        Stop Guessing. Start Growing.
      </p>
      <div
        style={{
          marginTop: 60,
          padding: "16px 40px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 50,
          fontSize: 24,
          color: "#60a5fa",
        }}
      >
        growthmind.ai
      </div>
    </div>,
    {
      ...size,
    },
  );
}
