// Canonical production URL for this site, used to build absolute URLs in
// sitemap.xml, robots.txt, canonical tags, and JSON-LD structured data.
export const SITE_URL = (process.env.SITE_URL || "https://thevertical.ai").replace(/\/$/, "");

// Resolves a CMS image field (which may be a root-relative path like
// "/why-us/security/banner.webp" instead of a full URL) against SITE_URL.
// JSON-LD is hand-built, so it doesn't benefit from Next's metadataBase
// resolution the way openGraph/twitter images do.
export function absoluteUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
