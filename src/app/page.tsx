import type { Metadata } from "next";
import { fetchCmsResource } from "@/lib/cms-api";
import { sitePageUrl } from "@/lib/site";
import { JsonLd, buildDefaultSchema } from "@/lib/json-ld";
import LandingPageClient from "./LandingPageClient";

async function getHomeSeo() {
  const pages = await fetchCmsResource("/api/public/site-seo", "pages");
  const home: any = pages.find((p: any) => p.page === "home");
  return home || {};
}

export const metadata: Metadata = {
  alternates: {
    canonical: sitePageUrl(""),
  },
  openGraph: { url: sitePageUrl("") },
};

export default async function Home() {
  const home = await getHomeSeo();

  return (
    <>
      <JsonLd data={home.schemaMarkup || JSON.stringify(buildDefaultSchema("home", home))} canonicalUrl={sitePageUrl("")} />
      <LandingPageClient />
    </>
  );
}
