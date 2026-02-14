import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = {
  title: `Pricing | ${SITE_NAME}`,
  description:
    "Transparent pricing for startups. Start with a free assessment, upgrade when it's earning its keep. No hidden fees.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
};

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Pricing", href: "/pricing" }]} />
      <PricingClient />
    </>
  );
}
