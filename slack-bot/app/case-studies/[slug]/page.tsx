import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { getAllCaseStudies, getCaseStudyBySlug } from "../../data/case-studies";
import { CaseStudyDetailClient } from "./CaseStudyDetailClient";
import { BreadcrumbJsonLd } from "../../components/JsonLd";
import { SITE_URL } from "../../constants/metadata";

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const studies = getAllCaseStudies();
  return studies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Growthmind",
    };
  }

  return {
    title: `${study.company} Case Study — ${study.title} | Growthmind`,
    description: study.summary,
    alternates: {
      canonical: `${SITE_URL}/case-studies/${slug}`,
    },
    openGraph: {
      title: `${study.company}: ${study.title}`,
      description: study.summary,
      type: "article",
      url: `${SITE_URL}/case-studies/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.company}: ${study.title}`,
      description: study.summary,
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  let content = "";
  try {
    const filePath = path.join(process.cwd(), "case-studies", study.contentPath);
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    console.error(`Failed to load case study content for ${slug}`);
    notFound();
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Case Studies", href: "/case-studies" },
          { name: study.company, href: `/case-studies/${slug}` },
        ]}
      />
      <CaseStudyDetailClient study={study} content={content} />
    </>
  );
}
