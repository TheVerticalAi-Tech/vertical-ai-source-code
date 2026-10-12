import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import PlatformDetailClient from "./PlatformDetailClient";

async function getPlatform(slug: string) {
  try {
    const platforms = await fetchCmsResource("/api/public/platform-os", "platforms");
    return (platforms as any[]).find((p: any) => p.slug === slug && p.status === "published") || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const platforms = await fetchCmsResource("/api/public/platform-os", "platforms");
    return (platforms as any[])
      .filter((p: any) => p.status === "published" && p.slug)
      .map((p: any) => ({ slug: p.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const row = await getPlatform(slug);
  if (!row) return {};
  const title = row.metaTitle || row.name;
  const description = row.metaDescription || row.heroDescription;
  const canonical = `${SITE_URL}/platform/${slug}`;
  const ogImage = row.ogImageUrl || row.heroImageUrl;
  return {
    title, description,
    keywords: row.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: { title: row.ogTitle || title, description: row.ogDescription || description, siteName: "The Vertical AI", url: canonical, type: "website", images: ogImage ? [{ url: ogImage, alt: row.ogImageAlt || title }] : undefined },
    twitter: { title: row.ogTitle || title, description: row.ogDescription || description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function PlatformDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const row = await getPlatform(slug);
  return (
    <>
      {row && <JsonLd data={row.schemaMarkup || JSON.stringify(buildDefaultSchema("platform", row))} />}
      <PlatformDetailClient />
    </>
  );
}
