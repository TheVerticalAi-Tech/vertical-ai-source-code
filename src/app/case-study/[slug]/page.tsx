import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import CaseStudyDetailClient from "./CaseStudyDetailClient";

async function getCaseStudy(slug: string) {
  try {
    const caseStudies = await fetchCmsResource("/api/public/case-studies", "caseStudies");
    return (caseStudies as any[]).find((c: any) => c.slug === slug && c.status === "published") || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const caseStudies = await fetchCmsResource("/api/public/case-studies", "caseStudies");
    return (caseStudies as any[])
      .filter((c: any) => c.status === "published" && c.slug)
      .map((c: any) => ({ slug: c.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  const title = cs.metaTitle || cs.storyTitle;
  const description = cs.metaDescription || undefined;
  const canonical = `${SITE_URL}/case-study/${slug}`;
  const ogImage = cs.ogImageUrl || cs.headerImageUrl;
  return {
    title, description,
    keywords: cs.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: { title: cs.ogTitle || title, description: cs.ogDescription || description, siteName: "The Vertical AI", url: canonical, type: "website", images: ogImage ? [{ url: ogImage, alt: cs.ogImageAlt || title }] : undefined },
    twitter: { title: cs.ogTitle || title, description: cs.ogDescription || description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  return (
    <>
      {cs && <JsonLd data={cs.schemaMarkup || JSON.stringify(buildDefaultSchema("caseStudy", cs))} />}
      <CaseStudyDetailClient />
    </>
  );
}
