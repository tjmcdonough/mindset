import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { getAllBlogPosts, getBlogPostBySlug } from "../blog.data";
import { BlogDetailClient } from "./BlogDetailClient";
import { BreadcrumbJsonLd } from "../../components/JsonLd";

import { SITE_URL } from "../../constants/metadata";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Removed local BASE_URL definition since we imported SITE_URL

/**
 * Generate static params for all blog posts
 */
export function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Growthmind",
    };
  }

  const metadata: Metadata = {
    title: `${post.title} | Growthmind Blog`,
    description: post.summary,
    alternates: {
      canonical: `${SITE_URL}/blogs/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      url: `${SITE_URL}/blogs/${slug}`,
      images: post.image ? [`${SITE_URL}${post.image}`] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.image ? [`${SITE_URL}${post.image}`] : [],
    },
  };

  return metadata;
}

/**
 * Generate Article JSON-LD schema for blog posts
 */
function generateArticleSchema(
  post: NonNullable<ReturnType<typeof getBlogPostBySlug>>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Growthmind",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blogs/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Load markdown content at build time
  let content = "";
  try {
    const filePath = path.join(process.cwd(), "blogs", post.contentPath);
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    console.error(`Failed to load blog content for ${slug}`);
    notFound();
  }

  const articleSchema = generateArticleSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", href: "/blogs" },
          { name: post.title, href: `/blogs/${slug}` },
        ]}
      />
      <BlogDetailClient post={post} content={content} />
    </>
  );
}
