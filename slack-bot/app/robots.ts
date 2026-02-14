import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://growthmind.ai";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/settings/",
        "/dashboard/",
        "/onboarding/",
        "/opengraph-image",
        "/favicon.ico",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
