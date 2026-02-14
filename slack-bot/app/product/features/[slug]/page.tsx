import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CORE_FEATURES } from "../../../data/features";
import { SITE_URL, SITE_NAME } from "../../../constants/metadata";
import { BreadcrumbJsonLd } from "../../../components/JsonLd";
import { FeatureClient } from "./FeatureClient";

interface FeaturePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Get feature by slug from CORE_FEATURES array
 */
function getFeatureBySlug(slug: string) {
  return CORE_FEATURES.find((f) => f.slug === slug);
}

/**
 * Generate static params for all feature pages
 */
export function generateStaticParams() {
  return CORE_FEATURES.map((feature) => ({
    slug: feature.slug,
  }));
}

/**
 * Generate metadata for each feature page
 */
export async function generateMetadata({
  params,
}: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    return {
      title: `Feature Not Found | ${SITE_NAME}`,
    };
  }

  const pageUrl = `${SITE_URL}/product/features/${slug}`;

  return {
    title: `${feature.title} | ${SITE_NAME}`,
    description: feature.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${feature.title} | ${SITE_NAME}`,
      description: feature.description,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${feature.title} | ${SITE_NAME}`,
      description: feature.description,
    },
  };
}

/**
 * Feature page - displays detailed information about a single feature
 */
export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const feature = getFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Product", href: "/product" },
          { name: feature.title, href: `/product/features/${slug}` },
        ]}
      />
      <FeatureClient slug={slug} />
    </>
  );
}
