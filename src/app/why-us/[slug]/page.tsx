import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import FeatureClientPage from "./feature-client-page";

async function getPillar(slug: string) {
  try {
    const pillars = await fetchCmsResource("/api/public/why-framework", "frameworks");
    return (pillars as any[]).find((p: any) => p.slug === slug && p.status === "published") || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const pillars = await fetchCmsResource("/api/public/why-framework", "frameworks");
    return (pillars as any[])
      .filter((p: any) => p.status === "published" && p.slug)
      .map((p: any) => ({ slug: p.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pillar = await getPillar(slug);
  if (!pillar) return {};
  const title = pillar.metaTitle || pillar.heroBannerText || pillar.mainHeading;
  const description = pillar.metaDescription || pillar.introDescription;
  const canonical = `${SITE_URL}/why-us/${slug}`;
  const ogImage = pillar.ogImageUrl || pillar.heroBannerImageUrl;
  return {
    title, description,
    keywords: pillar.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: { title: pillar.ogTitle || title, description: pillar.ogDescription || description, siteName: "The Vertical AI", url: canonical, type: "website", images: ogImage ? [{ url: ogImage, alt: pillar.ogImageAlt || title }] : undefined },
    twitter: { title: pillar.ogTitle || title, description: pillar.ogDescription || description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = await getPillar(slug);
  return (
    <>
      {pillar && <JsonLd data={pillar.schemaMarkup || JSON.stringify(buildDefaultSchema("whyFramework", pillar))} />}
      <FeatureClientPage slug={slug} />
    </>
  );
}
