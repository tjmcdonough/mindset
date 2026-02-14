import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { FounderMirrorClient } from "./FounderMirrorClient";

export const metadata: Metadata = {
  title: `Founder Mirror — Free Startup Reality Check | ${SITE_NAME}`,
  description:
    "The uncomfortable truths about your startup that nobody else will tell you. Enter your URL and get instant, brutally honest insights. Free, 60 seconds, no signup required.",
  alternates: {
    canonical: `${SITE_URL}/founder-mirror`,
  },
};

export default function FounderMirrorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Founder Mirror", href: "/founder-mirror" }]}
      />
      <FounderMirrorClient />
    </>
  );
}
