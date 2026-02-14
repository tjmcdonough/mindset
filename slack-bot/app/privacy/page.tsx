import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { PrivacyClient } from "./PrivacyClient";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description:
    "Learn how Growthmind collects, uses, and protects your personal data. We are committed to transparency and GDPR compliance.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Privacy Policy", href: "/privacy" }]}
      />
      <PrivacyClient />
    </>
  );
}
