import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/app/blogs/blog.data";
import { CORE_FEATURES } from "@/app/data/features";
import { SITE_URL } from "@/app/constants/metadata";

/**
 * Sitemap generation for SEO page indexing.
 *
 * Guidelines:
 * - Use stable `lastModified` dates (not `new Date()`) to avoid
 *   false "constantly changing" signals that waste crawl budget.
 * - Include ALL publicly accessible pages so Google can discover them.
 * - Update the date constants below when pages are meaningfully changed.
 */

/** Last meaningful content update for each page group */
const LAST_UPDATED = {
  core: new Date("2026-02-13"),
  content: new Date("2026-02-05"),
  company: new Date("2026-01-30"),
  legal: new Date("2026-01-15"),
  features: new Date("2026-02-01"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || SITE_URL;

  // Core pages - High priority, frequent updates
  const coreRoutes: MetadataRoute.Sitemap = [
    "",
    "/product",
    "/pricing",
    "/how-it-works",
    "/integrations",
    "/case-studies",
    "/diagnosis",
    "/founder-mirror",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_UPDATED.core,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.9,
  }));

  // Content pages - Medium-High priority
  const contentRoutes: MetadataRoute.Sitemap = ["/blogs", "/docs"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: LAST_UPDATED.content,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  // Company pages - Medium priority
  const companyRoutes: MetadataRoute.Sitemap = ["/about", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: LAST_UPDATED.company,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // Legal pages - Low priority
  const legalRoutes: MetadataRoute.Sitemap = ["/privacy", "/terms"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: LAST_UPDATED.legal,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }),
  );

  // Feature detail pages - Medium-High priority
  const featureRoutes: MetadataRoute.Sitemap = CORE_FEATURES.map(
    (feature) => ({
      url: `${baseUrl}/product/features/${feature.slug}`,
      lastModified: LAST_UPDATED.features,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  // Blog posts - Dynamic content (use actual publish date)
  const posts: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...contentRoutes,
    ...companyRoutes,
    ...legalRoutes,
    ...featureRoutes,
    ...posts,
  ];
}
