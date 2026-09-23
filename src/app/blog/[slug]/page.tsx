import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import BlogDetailClient from "./BlogDetailClient";

async function getPost(slug: string) {
  try {
    const blogs = await fetchCmsResource("/api/public/blogs", "blogs");
    return (blogs as any[]).find((b: any) => b.slug === slug && b.status === "published") || null;
  } catch { return null; }
}

export async function generateStaticParams() {
  try {
    const blogs = await fetchCmsResource("/api/public/blogs", "blogs");
    return (blogs as any[])
      .filter((b: any) => b.status === "published" && b.slug)
      .map((b: any) => ({ slug: b.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  const canonical = `${SITE_URL}/blog/${slug}`;
  const ogImage = post.ogImageUrl || post.bannerUrl;
  return {
    title, description,
    keywords: post.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: { title: post.ogTitle || title, description: post.ogDescription || description, siteName: "The Vertical AI", url: canonical, type: "website", images: ogImage ? [{ url: ogImage, alt: post.ogImageAlt || title }] : undefined },
    twitter: { title: post.ogTitle || title, description: post.ogDescription || description, images: ogImage ? [ogImage] : undefined },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return (
    <>
      {post && <JsonLd data={post.schemaMarkup || JSON.stringify(buildDefaultSchema("blog", post))} />}
      <BlogDetailClient />
    </>
  );
}
