import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { TermsClient } from "./TermsClient";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${SITE_NAME}`,
  description:
    "Read the terms and conditions governing your use of the Growthmind platform and services.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Terms and Conditions", href: "/terms" }]}
      />
      <TermsClient />
    </>
  );
}
