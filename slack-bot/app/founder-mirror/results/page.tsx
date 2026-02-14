import type { Metadata } from "next";
import { SITE_NAME } from "../../constants/metadata";
import { MirrorResultsClient } from "./MirrorResultsClient";

export const metadata: Metadata = {
  title: `Your Founder Mirror Results | ${SITE_NAME}`,
  description: "Your personalised startup mirror — uncomfortable truths delivered in 60 seconds.",
  robots: { index: false, follow: false },
};

export default function MirrorResultsPage() {
  return <MirrorResultsClient />;
}
