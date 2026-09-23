import type { MetadataRoute } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_PAGES = [
  "",
  "about-us",
  "careers",
  "blog",
  "case-studies",
  "team",
  "why-us",
  "faq",
  "testimonials",
  "support",
  "get-demo",
  "privacy-policy",
  "terms-conditions",
  "security",
  "cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: path ? `${SITE_URL}/${path}` : `${SITE_URL}/`,
    lastModified: new Date(),
  }));

  const [blogs, caseStudies, industries, careers, platforms, pillars] = await Promise.all([
    fetchCmsResource("/api/public/blogs", "blogs").catch(() => []),
    fetchCmsResource("/api/public/case-studies", "caseStudies").catch(() => []),
    fetchCmsResource("/api/public/industries", "industries").catch(() => []),
    fetchCmsResource("/api/public/careers", "jobs").catch(() => []),
    fetchCmsResource("/api/public/platform-os", "platforms").catch(() => []),
    fetchCmsResource("/api/public/why-framework", "frameworks").catch(() => []),
  ]);

  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((b: any) => b.status === "published")
    .map((b: any) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: b.publishedAt ? new Date(b.publishedAt) : b.updatedAt ? new Date(b.updatedAt) : new Date(),
    }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies
    .filter((c: any) => c.status === "published")
    .map((c: any) => ({
      url: `${SITE_URL}/case-study/${c.slug}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
    }));

  const industryEntries: MetadataRoute.Sitemap = industries
    .filter((i: any) => i.status === "published")
    .map((i: any) => ({
      url: `${SITE_URL}/industry/${i.slug}`,
      lastModified: i.updatedAt ? new Date(i.updatedAt) : new Date(),
    }));

  const careerEntries: MetadataRoute.Sitemap = careers
    .filter((j: any) => j.status === "published")
    .map((j: any) => ({
      url: `${SITE_URL}/careers/${j.slug}`,
      lastModified: j.updatedAt ? new Date(j.updatedAt) : new Date(),
    }));

  const platformEntries: MetadataRoute.Sitemap = platforms
    .filter((p: any) => p.status === "published")
    .map((p: any) => ({
      url: `${SITE_URL}/platform/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    }));

  const pillarEntries: MetadataRoute.Sitemap = pillars
    .filter((p: any) => p.status === "published")
    .map((p: any) => ({
      url: `${SITE_URL}/why-us/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    }));

  return [
    ...staticEntries,
    ...blogEntries,
    ...caseStudyEntries,
    ...industryEntries,
    ...careerEntries,
    ...platformEntries,
    ...pillarEntries,
  ];
}
