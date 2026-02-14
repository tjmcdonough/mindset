import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: `About Us | ${SITE_NAME}`,
  description:
    "Growthmind helps founders, solo marketers, and small teams stop guessing and start validating — with clarity on what to do next.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "About", href: "/about" }]} />
      <AboutClient />
    </>
  );
}
