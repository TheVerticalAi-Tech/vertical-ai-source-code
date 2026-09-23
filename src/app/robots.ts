import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// This site's own robots.txt — served at thevertical.ai/robots.txt. Separate
// from the admin CMS project's robots.txt, which blocks everything because
// the CMS is an internal admin tool, not public content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
