import { FAQS } from "../data/faq";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
  SUPPORT_EMAIL,
} from "../constants/metadata";

/**
 * Global JSON-LD structured data rendered in the root layout.
 * Includes WebSite, Organization, SoftwareApplication, and SiteNavigationElement schemas.
 */
export function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      `https://twitter.com/${TWITTER_HANDLE.replace("@", "")}`,
      "https://linkedin.com/company/growthmind",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      availableLanguage: "English",
    },
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "0",
      highPrice: "200.00",
      priceCurrency: "USD",
      offerCount: 3,
    },
    description: SITE_DESCRIPTION,
  };

  /**
   * SiteNavigationElement helps Google understand the primary navigation
   * structure, improving discoverability of all linked pages.
   */
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      { "@type": "SiteNavigationElement", name: "Product", url: `${SITE_URL}/product` },
      { "@type": "SiteNavigationElement", name: "Pricing", url: `${SITE_URL}/pricing` },
      { "@type": "SiteNavigationElement", name: "How It Works", url: `${SITE_URL}/how-it-works` },
      { "@type": "SiteNavigationElement", name: "Integrations", url: `${SITE_URL}/integrations` },
      { "@type": "SiteNavigationElement", name: "Blog", url: `${SITE_URL}/blogs` },
      { "@type": "SiteNavigationElement", name: "Docs", url: `${SITE_URL}/docs` },
      { "@type": "SiteNavigationElement", name: "About", url: `${SITE_URL}/about` },
      { "@type": "SiteNavigationElement", name: "Contact", url: `${SITE_URL}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
    </>
  );
}

/**
 * FAQ page JSON-LD structured data for rich snippets.
 */
export function FaqJsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

/**
 * Breadcrumb item definition for type-safe breadcrumb generation.
 */
export interface BreadcrumbItem {
  name: string;
  href: string;
}

/**
 * BreadcrumbList JSON-LD helps Google understand page hierarchy,
 * improving indexing and enabling breadcrumb rich results in SERPs.
 *
 * Usage: Add to any page with `<BreadcrumbJsonLd items={[...]} />`
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: `${SITE_URL}${item.href}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
