import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { ProductClient } from "./ProductClient";

export const metadata: Metadata = {
  title: `Product Features | ${SITE_NAME}`,
  description:
    "Interrogation-first AI that diagnoses your stage, challenges your assumptions, and designs focused weekly experiments to find product-market fit.",
  alternates: {
    canonical: `${SITE_URL}/product`,
  },
};

export default function ProductPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Product", href: "/product" }]} />
      <ProductClient />
    </>
  );
}
