import { absoluteUrl, sitePageUrl } from "@/lib/site";

// Renders a JSON-LD <script> tag. `data` is a JSON string — either an admin's
// own schemaMarkup value taken verbatim, or JSON.stringify(buildDefaultSchema(...)).
// Re-parsing + re-stringifying guarantees well-formed output and lets us escape
// "<" so admin-entered text can never break out of the script tag.
function setWebPageUrls(
  value: unknown,
  canonicalUrl: string,
  siteRootUrl = `${new URL(canonicalUrl).origin}/`,
): void {
  if (Array.isArray(value)) {
    value.forEach((item) => setWebPageUrls(item, canonicalUrl, siteRootUrl));
    return;
  }
  if (!value || typeof value !== "object") return;

  const schema = value as Record<string, unknown>;
  const types = Array.isArray(schema["@type"]) ? schema["@type"] : [schema["@type"]];
  for (const key of ["url", "@id", "sameAs", "mainEntityOfPage"]) {
    const field = schema[key];
    if (field === siteRootUrl.slice(0, -1)) schema[key] = siteRootUrl;
    else if (Array.isArray(field)) {
      schema[key] = field.map((item) => item === siteRootUrl.slice(0, -1) ? siteRootUrl : item);
    }
  }
  if (types.includes("WebPage")) schema.url = canonicalUrl;

  Object.values(schema).forEach((item) => setWebPageUrls(item, canonicalUrl, siteRootUrl));
}

export function JsonLd({ data, canonicalUrl }: { data: string | undefined | null; canonicalUrl: string }) {
  if (!data) return null;

  let safe: string;
  try {
    const schema = JSON.parse(data);
    setWebPageUrls(schema, canonicalUrl);
    safe = JSON.stringify(schema).replace(/</g, "\\u003c");
  } catch {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}

export type SchemaPageType =
  | "blog"
  | "caseStudy"
  | "industry"
  | "platform"
  | "whyFramework"
  | "legal"
  | "home";

// Recursively strips undefined/null/"" so optional-but-blank CMS fields don't
// show up as empty-string properties in the generated JSON-LD (Google's Rich
// Results Test flags those). Drops now-empty nested objects too.
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(prune).filter((v) => v !== undefined) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    for (const [key, v] of Object.entries(value as Record<string, any>)) {
      const pruned = prune(v);
      if (pruned !== undefined && pruned !== null && pruned !== "") {
        out[key] = pruned;
      }
    }
    return (Object.keys(out).length ? out : undefined) as unknown as T;
  }
  return value;
}

export function buildDefaultSchema(type: SchemaPageType, record: any): Record<string, any> {
  switch (type) {
    case "blog":
      return prune({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: record.metaTitle || record.title,
        description: record.metaDescription || record.excerpt,
        image: absoluteUrl(record.ogImageUrl || record.bannerUrl),
        author: { "@type": "Person", name: record.author },
        datePublished: record.publishedAt ?? record.createdAt,
        dateModified: record.updatedAt,
        publisher: { "@type": "Organization", name: "The Vertical AI" },
      });

    case "caseStudy":
      return prune({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: record.metaTitle || record.storyTitle,
        description: record.metaDescription || record.testimonialQuote,
        image: absoluteUrl(record.ogImageUrl || record.headerImageUrl),
        datePublished: record.createdAt,
        dateModified: record.updatedAt,
        publisher: { "@type": "Organization", name: "The Vertical AI" },
      });

    case "industry":
    case "platform":
      return prune({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: record.metaTitle || record.name,
        description: record.metaDescription,
        url: record.ogUrl,
        image: absoluteUrl(record.ogImageUrl),
      });

    case "whyFramework":
      return prune({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: record.metaTitle || record.mainHeading || record.categoryBadge,
        description: record.metaDescription,
        url: record.ogUrl,
        image: absoluteUrl(record.ogImageUrl),
      });

    case "legal":
      return prune({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: record.metaTitle || record.title,
        description: record.metaDescription,
        dateModified: record.lastUpdated ?? record.updatedAt,
      });

    case "home":
      return prune({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: record.metaTitle || "The Vertical AI",
        url: sitePageUrl(""),
        logo: absoluteUrl(record.ogImageUrl),
        description: record.metaDescription,
      });
  }
}
