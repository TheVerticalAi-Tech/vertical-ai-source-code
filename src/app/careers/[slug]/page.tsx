import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import JobDetailClient from "./JobDetailClient";

async function getJob(slug: string) {
  try {
    const jobs = await fetchCmsResource("/api/public/careers", "jobs");
    return (jobs as any[]).find((j: any) => j.slug === slug && j.status === "published") || null;
  } catch { return null; }
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME", "part-time": "PART_TIME",
  contract: "CONTRACTOR", internship: "INTERN", temporary: "TEMPORARY",
};

export async function generateStaticParams() {
  try {
    const jobs = await fetchCmsResource("/api/public/careers", "jobs");
    return (jobs as any[])
      .filter((j: any) => j.status === "published" && j.slug)
      .map((j: any) => ({ slug: j.slug }));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};
  const title = `${job.title} | The Vertical AI`;
  const description = job.description || `Join The Vertical AI as a ${job.title} in ${job.category}. ${job.location} · ${job.type}.`;
  const canonical = `${SITE_URL}/careers/${slug}`;
  return {
    title, description,
    alternates: { canonical },
    openGraph: { title, description, siteName: "The Vertical AI", url: canonical, type: "website" },
    twitter: { title, description },
  };
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  const jsonLd = job ? {
    "@context": "https://schema.org", "@type": "JobPosting",
    title: job.title, description: job.description || job.title,
    datePosted: job.createdAt || undefined,
    employmentType: EMPLOYMENT_TYPE_MAP[String(job.type || "").toLowerCase()] || undefined,
    hiringOrganization: { "@type": "Organization", name: "The Vertical AI", sameAs: SITE_URL },
    jobLocation: job.location ? { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location } } : undefined,
  } : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <JobDetailClient />
    </>
  );
}
