"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  headings: {
    fontFamily: "Clash Display, Space Grotesk, Inter, sans-serif",
    sizes: {
      h1: { fontSize: "clamp(1.5rem, 4vw + 0.5rem, 2rem)", lineHeight: "1.25", fontWeight: "700" },
      h2: { fontSize: "clamp(1.25rem, 3vw + 0.5rem, 1.5rem)", lineHeight: "1.3", fontWeight: "600" },
      h3: { fontSize: "clamp(1.1rem, 2vw + 0.5rem, 1.25rem)", lineHeight: "1.35", fontWeight: "600" },
      h4: { fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.125rem)", lineHeight: "1.4", fontWeight: "600" },
      h5: { fontSize: "clamp(0.9rem, 1vw + 0.5rem, 1rem)", lineHeight: "1.4", fontWeight: "600" },
      h6: { fontSize: "clamp(0.85rem, 0.5vw + 0.5rem, 0.875rem)", lineHeight: "1.4", fontWeight: "600" },
    },
  },
  colors: {
    dark: [
      "#C1C2C5", "#A6A7AB", "#909296", "#4A4D52", "#25282D",
      "#1E2024", "#1A1B1E", "#141517", "#101113", "#0A0B0C",
    ],
    primary: [
      "#E6FBF8", "#C0F6ED", "#9AF0E1", "#6BE8D5", "#3DE0C8",
      "#00C6AE", "#00B39E", "#009F8E", "#008C7E", "#00776C",
    ],
  },
  primaryColor: "primary",
  primaryShade: 5,
  defaultRadius: "md",
  cursorType: "pointer",
  components: {
    Button: { defaultProps: { radius: "md", size: "sm", fw: 500 } },
    Card: { defaultProps: { radius: "md", shadow: "sm", padding: "lg", withBorder: true } },
    Text: { defaultProps: { lh: 1.5 } },
  },
});
