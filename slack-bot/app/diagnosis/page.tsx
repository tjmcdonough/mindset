import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { DiagnosisClient } from "./DiagnosisClient";

export const metadata: Metadata = {
  title: `$10 Growth Diagnosis | 30 Mins | ${SITE_NAME}`,
  description:
    "Get a comprehensive growth diagnosis for your startup in 30 minutes. Market analysis, demand score, strategic assessment, and prioritized roadmap — just $10.",
  alternates: {
    canonical: `${SITE_URL}/diagnosis`,
  },
};

export default function DiagnosisPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Diagnosis", href: "/diagnosis" }]} />
      <DiagnosisClient />
    </>
  );
}
