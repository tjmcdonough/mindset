import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_NAME}`,
  description:
    "Get in touch with the Growthmind team. We're here to help you automate your startup growth.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: "Questions? Feedback? Skepticism? Talk to us directly.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <ContactClient />
    </>
  );
}
