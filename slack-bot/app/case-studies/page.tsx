import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { CaseStudiesClient } from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: `Case Studies | ${SITE_NAME}`,
  description:
    "See real companies diagnosed by 18 AI agents. Real demand scores, real verdicts, and real strategic recommendations from the GrowthMind cascade.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Case Studies", href: "/case-studies" }]} />
      <CaseStudiesClient />
    </>
  );
}
