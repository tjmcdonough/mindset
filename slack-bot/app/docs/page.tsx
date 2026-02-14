import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { DocsClient } from "./DocsClient";

export const metadata: Metadata = {
  title: `Documentation | ${SITE_NAME}`,
  description:
    "Learn how Growthmind works. Discover the interrogation-first methodology, weekly experiment framework, and integrations.",
  alternates: {
    canonical: `${SITE_URL}/docs`,
  },
};

export default function DocsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Documentation", href: "/docs" }]} />
      <DocsClient />
    </>
  );
}
