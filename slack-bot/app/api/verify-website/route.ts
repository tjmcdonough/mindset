import { NextResponse } from "next/server";
import { isStagingDomain } from "@/lib/url-utils";
import { DOMAIN_REGEX, normalizeDomain } from "@/lib/domain-validation";

interface VerifyWebsiteResponse {
  exists: boolean;
  domain: string;
  error?: string;
}

interface VerificationResult {
  exists: boolean;
  error?: string;
}

const TIMEOUT_MS = 3000;
const USER_AGENT = "Mozilla/5.0 (compatible; WebsiteVerifier/1.0)";

/**
 * Makes a fetch request with timeout and returns whether the site exists.
 */
async function tryFetch(
  url: string,
  method: "HEAD" | "GET"
): Promise<{ responded: boolean; shouldFallback: boolean; error?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const _response = await fetch(url, {
      method,
      signal: controller.signal,
      redirect: "follow",
      headers: { "User-Agent": USER_AGENT },
    });

    clearTimeout(timeoutId);
    return { responded: true, shouldFallback: false };
  } catch (error) {
    clearTimeout(timeoutId);

    const errorMessage = error instanceof Error ? error.message.toLowerCase() : "";

    // Timeout = does not exist
    if (error instanceof Error && error.name === "AbortError") {
      return { responded: false, shouldFallback: false, error: "timeout" };
    }

    // TLS/certificate errors = site exists but has SSL issues
    if (
      errorMessage.includes("certificate") ||
      errorMessage.includes("ssl") ||
      errorMessage.includes("tls")
    ) {
      return { responded: true, shouldFallback: false };
    }

    // Connection errors that indicate server exists but rejected connection
    if (
      errorMessage.includes("econnrefused") ||
      errorMessage.includes("econnreset") ||
      errorMessage.includes("socket hang up") ||
      errorMessage.includes("network") ||
      errorMessage.includes("fetch failed")
    ) {
      if (method === "HEAD") {
        return { responded: false, shouldFallback: true, error: errorMessage };
      }
      return { responded: true, shouldFallback: false };
    }

    // Any other HEAD error → try GET
    if (method === "HEAD") {
      return { responded: false, shouldFallback: true, error: errorMessage };
    }

    return { responded: false, shouldFallback: false, error: errorMessage };
  }
}

/**
 * Verifies a website exists by checking if it responds to HTTP requests.
 */
async function verifyWebsiteExists(domain: string): Promise<VerificationResult> {
  const httpsUrl = `https://${domain}`;
  const httpUrl = `http://${domain}`;

  // Try HTTPS HEAD first
  const headResult = await tryFetch(httpsUrl, "HEAD");
  if (headResult.responded) {
    return { exists: true };
  }

  // Fallback to HTTPS GET if HEAD failed
  if (headResult.shouldFallback) {
    const getResult = await tryFetch(httpsUrl, "GET");
    if (getResult.responded) {
      return { exists: true };
    }

    // Last resort: try HTTP
    if (getResult.error !== "timeout") {
      const httpResult = await tryFetch(httpUrl, "GET");
      if (httpResult.responded) {
        return { exists: true };
      }
    }
  }

  // If HEAD didn't suggest fallback but also didn't timeout, try GET anyway
  if (headResult.error !== "timeout") {
    const getResult = await tryFetch(httpsUrl, "GET");
    if (getResult.responded) {
      return { exists: true };
    }
  }

  return { exists: false, error: "Could not reach website" };
}

/**
 * GET /api/verify-website?domain=example.com
 *
 * Verifies a website exists by making HTTP requests.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const domainParam = searchParams.get("domain");

  if (!domainParam) {
    return NextResponse.json(
      { error: "Domain parameter is required" },
      { status: 400 }
    );
  }

  const domain = normalizeDomain(domainParam);

  // Validate format before making network request
  if (!DOMAIN_REGEX.test(domain)) {
    return NextResponse.json<VerifyWebsiteResponse>({
      exists: false,
      domain,
      error: "Invalid domain format",
    });
  }

  // Reject staging domains
  if (isStagingDomain(domain)) {
    return NextResponse.json<VerifyWebsiteResponse>({
      exists: false,
      domain,
      error: "Staging/preview URLs are not supported. Please use your production domain.",
    });
  }

  // Check if website exists
  const result = await verifyWebsiteExists(domain);

  return NextResponse.json<VerifyWebsiteResponse>({
    exists: result.exists,
    domain,
    ...(result.error && !result.exists ? { error: result.error } : {}),
  });
}
