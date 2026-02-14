import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { IntegrationsClient } from "./IntegrationsClient";

export const metadata: Metadata = {
  title: `Integrations | ${SITE_NAME}`,
  description:
    "Connect Growthmind with 12+ tools including Google Analytics, Stripe, Slack, and more. Automate your growth stack.",
  alternates: {
    canonical: `${SITE_URL}/integrations`,
  },
};

export default function IntegrationsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Integrations", href: "/integrations" }]}
      />
      <IntegrationsClient />
    </>
  );
}
