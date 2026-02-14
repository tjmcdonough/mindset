import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { HowItWorksClient } from "./HowItWorksClient";

export const metadata: Metadata = {
  title: `How It Works | ${SITE_NAME}`,
  description:
    "Discover how Growthmind helps founders, marketers, and small teams diagnose their stage, challenge assumptions, and run focused weekly experiments.",
  alternates: {
    canonical: `${SITE_URL}/how-it-works`,
  },
};

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "How It Works", href: "/how-it-works" }]}
      />
      <HowItWorksClient />
    </>
  );
}
