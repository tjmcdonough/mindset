/**
 * URL Utilities
 *
 * Common utilities for cleaning and normalizing URLs/domains.
 */

/**
 * Common staging/preview domain patterns
 * These are hosting platform subdomains that indicate staging/preview sites
 */
export const STAGING_DOMAINS = [
  "webflow.io",
  "vercel.app",
  "netlify.app",
  "github.io",
  "wordpress.com",
  "wixsite.com",
  "squarespace.com",
  "herokuapp.com",
  "surge.sh",
] as const;

/**
 * Check if a domain is a staging/preview URL
 */
export function isStagingDomain(domain: string): boolean {
  const cleaned = domain.toLowerCase().trim();
  return STAGING_DOMAINS.some((stagingDomain) => cleaned.endsWith(stagingDomain));
}

export interface CleanDomainOptions {
  removeProtocol?: boolean;
  removeWww?: boolean;
  toLowerCase?: boolean;
  trimSlashes?: boolean;
}

/**
 * Clean and normalize a domain/URL string
 */
export function cleanDomain(url: string, options: CleanDomainOptions = {}): string {
  const {
    removeProtocol = true,
    removeWww = true,
    toLowerCase = true,
    trimSlashes = true,
  } = options;

  let cleaned = url.trim();

  if (toLowerCase) {
    cleaned = cleaned.toLowerCase();
  }

  if (removeProtocol) {
    cleaned = cleaned.replace(/^https?:\/\//, "");
  }

  if (removeWww) {
    cleaned = cleaned.replace(/^www\./, "");
  }

  if (trimSlashes) {
    cleaned = cleaned.replace(/\/+$/, "");
  }

  return cleaned;
}

/**
 * Convert a domain to a full HTTPS URL
 */
export function toHttpsUrl(domain: string): string {
  const cleaned = domain.trim();
  if (cleaned.startsWith("https://")) {
    return cleaned;
  }
  if (cleaned.startsWith("http://")) {
    return cleaned.replace("http://", "https://");
  }
  return `https://${cleaned}`;
}

/**
 * Extract hostname from a URL or domain string
 */
export function extractHostname(input: string): string {
  try {
    const url = new URL(toHttpsUrl(input));
    return url.hostname;
  } catch {
    return cleanDomain(input);
  }
}

/**
 * Extract clean domain from a URL or domain string
 */
export function extractDomain(input: string): string {
  const hostname = extractHostname(input);
  return hostname.replace(/^www\./i, "").toLowerCase();
}
