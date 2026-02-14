import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "./constants/metadata";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  description:
    "The page you are looking for does not exist. Browse our product, blog, or contact us.",
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Custom 404 page with proper SEO metadata.
 *
 * - `index: false` prevents wasting crawl budget on 404 URLs.
 * - `follow: true` ensures Google still follows internal links on this page,
 *   preserving link equity to valid pages.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>404</h1>
      <h2 style={{ marginBottom: "1rem", fontWeight: 400 }}>Page Not Found</h2>
      <p
        style={{
          color: "var(--mantine-color-dimmed)",
          maxWidth: "480px",
          marginBottom: "2rem",
        }}
      >
        The page you are looking for does not exist or has been moved. Try one of
        these instead:
      </p>
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <Link href="/">Home</Link>
        <Link href="/product">Product</Link>
        <Link href="/blogs">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
