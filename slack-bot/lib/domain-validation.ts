import { cleanDomain, extractDomain, isStagingDomain } from "./url-utils";

export const DOMAIN_REGEX =
  /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?)*\.[a-zA-Z]{2,}$/;

export const MAX_DOMAIN_LENGTH = 253;

/**
 * Validates a domain/URL string and returns an error message if invalid.
 * Returns null if the domain is valid.
 */
export function validateDomain(input: string): string | null {
  if (!input.trim()) {
    return null; // Empty is allowed - let required validation handle it separately
  }

  const cleaned = cleanDomain(input);

  // Check if it matches domain format
  if (!DOMAIN_REGEX.test(cleaned)) {
    // Try to extract domain from URL
    try {
      const hostname = extractDomain(input);
      if (!DOMAIN_REGEX.test(hostname)) {
        return "Please enter a valid domain (e.g., example.com)";
      }
    } catch {
      return "Please enter a valid domain (e.g., example.com)";
    }
  }

  // Check for staging domains
  if (isStagingDomain(cleaned)) {
    return "Staging/preview URLs (webflow.io, vercel.app, etc.) are not supported. Please use your production domain.";
  }

  return null;
}

/**
 * Cleans and normalizes a domain input for storage/submission.
 */
export function normalizeDomain(input: string): string {
  return cleanDomain(input, {
    removeProtocol: true,
    removeWww: true,
    toLowerCase: true,
    trimSlashes: true,
  });
}

/**
 * Async Website Verification (Client-side)
 */
export interface VerifyWebsiteResult {
  exists: boolean;
  domain: string;
  error?: string;
}

/**
 * Verifies a website exists by calling the verification API.
 */
export async function verifyWebsiteExists(domain: string): Promise<VerifyWebsiteResult> {
  const normalized = normalizeDomain(domain);

  try {
    const response = await fetch(
      `/api/verify-website?domain=${encodeURIComponent(normalized)}`
    );

    if (!response.ok) {
      return { exists: false, domain: normalized, error: "Verification failed" };
    }

    const data = await response.json();
    return data as VerifyWebsiteResult;
  } catch {
    return { exists: false, domain: normalized, error: "Could not verify website" };
  }
}
