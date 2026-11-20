// Canonical production URL for this site, used to build absolute URLs in
// sitemap.xml, robots.txt, canonical tags, and JSON-LD structured data.
export const SITE_URL = (process.env.SITE_URL || "https://thevertical.ai").replace(/\/$/, "");

export function sitePageUrl(path: string): string {
  const pathname = path.replace(/^\/+|\/+$/g, "");
  return `${SITE_URL}/${pathname ? `${pathname}/` : ""}`;
}

export function sitePagePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex < 0 ? path : path.slice(0, suffixIndex);
  if (pathname === "/" || pathname.endsWith("/")) return path;
  return `${pathname}/${suffixIndex < 0 ? "" : path.slice(suffixIndex)}`;
}

// Resolves a CMS image field (which may be a root-relative path like
// "/why-us/security/banner.webp" instead of a full URL) against SITE_URL.
// JSON-LD is hand-built, so it doesn't benefit from Next's metadataBase
// resolution the way openGraph/twitter images do.
export function absoluteUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}
