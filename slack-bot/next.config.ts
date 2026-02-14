import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for pure marketing site (optional - remove if using server features)
  // output: "export",

  // Explicitly set turbopack root to this directory
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
