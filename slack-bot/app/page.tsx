import { Metadata } from "next";
import { HomeClient } from "./components/HomeClient";
import { FaqJsonLd } from "./components/JsonLd";
import { SITE_URL, DEFAULT_TITLE, SITE_DESCRIPTION } from "./constants/metadata";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
};

export default function WebsitePage() {
  return (
    <>
      <FaqJsonLd />
      <HomeClient />
    </>
  );
}
