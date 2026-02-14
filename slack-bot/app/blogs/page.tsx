import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "../constants/metadata";
import { BreadcrumbJsonLd } from "../components/JsonLd";
import { getAllBlogPosts } from "./blog.data";
import { BlogsClient } from "./BlogsClient";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Insights on product validation, growth strategy, and running focused experiments. Learn from teams who've been there.",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: `${SITE_NAME} Blog`,
    description:
      "Insights on product validation, finding product-market fit, and running focused experiments for startups.",
    url: `${SITE_URL}/blogs`,
    type: "website",
  },
};

export default function BlogsPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blogs" }]} />
      <BlogsClient posts={posts} />
    </>
  );
}
