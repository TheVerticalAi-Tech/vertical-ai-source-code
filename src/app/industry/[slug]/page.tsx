import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import IndustryDetailClient from "./IndustryDetailClient";

async function getIndustry(slug: string) {
  try {
    const industries = await fetchCmsResource("/api/public/industries", "industries");
    return (industries as any[]).find((i: any) => i.slug === slug && i.status === "published") || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const industries = await fetchCmsResource("/api/public/industries", "industries");
    return (industries as any[])
      .filter((i: any) => i.status === "published" && i.slug)
      .map((i: any) => ({ slug: i.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const row = await getIndustry(slug);
  if (!row) return {};
  const title = row.metaTitle || row.name;
  const description = row.metaDescription || row.heroDescription;
  const canonical = `${SITE_URL}/industry/${slug}`;
  const ogImage = row.ogImageUrl || row.heroImageUrl;
  return {
    title, description,
    keywords: row.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: { title: row.ogTitle || title, description: row.ogDescription || description, siteName: "The Vertical AI", url: canonical, type: "website", images: ogImage ? [{ url: ogImage, alt: row.ogImageAlt || title }] : undefined },
    twitter: { title: row.ogTitle || title, description: row.ogDescription || description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getIndustry(slug);
  return (
    <>
      {row && <JsonLd data={row.schemaMarkup || JSON.stringify(buildDefaultSchema("industry", row))} />}
      <IndustryDetailClient />
    </>
  );
}
