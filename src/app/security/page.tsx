import type { Metadata } from "next";
import Header from "@/components/landing-page/header";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import PageHero from "@/components/landing-page/page-hero";
import { fetchCmsResource } from "@/lib/cms-api";
import { SITE_URL } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const documents = await fetchCmsResource("/api/public/legal", "documents");
  const doc: any = documents.find((d: any) => d.slug === "security" && d.status === "published");

  const title = doc?.metaTitle || doc?.title || "Security Policy";
  const description =
    doc?.metaDescription ||
    "Learn about The Vertical AI's security practices, compliance, and data protection standards.";
  const canonical = `${SITE_URL}/security`;
  const ogTitle = doc?.ogTitle || title;
  const ogDescription = doc?.ogDescription || description;
  const ogImage = doc?.ogImageUrl || doc?.bannerUrl;
  const ogImageAlt = doc?.ogImageAlt || title;

  return {
    title,
    description,
    keywords: doc?.metaKeywords || undefined,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      siteName: doc?.ogSiteName || "The Vertical AI",
      url: doc?.ogUrl || canonical,
      type: (doc?.ogType || "website") as any,
      images: ogImage ? [{ url: ogImage, alt: ogImageAlt }] : undefined,
    },
    twitter: {
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function SecurityPolicy() {
  const documents = await fetchCmsResource("/api/public/legal", "documents");
  const doc = documents.find((d: any) => d.slug === "security" && d.status === "published");

  const title = doc?.title || "Security Policy";
  const lastUpdated = doc?.lastUpdated
    ? new Date(doc.lastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
  const supportEmail = doc?.supportEmail || "info@thevertical.ai";

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={doc?.schemaMarkup || JSON.stringify(buildDefaultSchema("legal", doc || {}))} />
      <Header visible={true} />

      <PageHero
        title={title}
        backgroundImage={doc?.bannerUrl || "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2940&auto=format&fit=crop"}
      />

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        {lastUpdated && (
          <div className="mb-12 border-b border-gray-100 pb-8">
            <p className="text-gray-500 text-lg">
              Last updated: {lastUpdated}
            </p>
          </div>
        )}

        <div
          className="prose prose-lg prose-blue max-w-none text-gray-600 space-y-8"
          dangerouslySetInnerHTML={{ __html: doc?.content || "" }}
        />

        <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Report a Vulnerability</h3>
          <p className="text-blue-800">
            We welcome reports from security researchers. Please contact our security operations center at <a href={`mailto:${supportEmail}`} className="font-medium underline hover:text-blue-600 transition-colors">{supportEmail}</a>.
          </p>
        </div>
      </main>

      <LandingPageFooter />
    </div>
  );
}
