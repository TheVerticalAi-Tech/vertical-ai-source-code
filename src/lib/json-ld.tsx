import { SITE_URL, absoluteUrl } from "@/lib/site";

// Renders a JSON-LD <script> tag. `data` is a JSON string — either an admin's
// own schemaMarkup value taken verbatim, or JSON.stringify(buildDefaultSchema(...)).
// Re-parsing + re-stringifying guarantees well-formed output and lets us escape
// "<" so admin-entered text can never break out of the script tag.
export function JsonLd({ data }: { data: string | undefined | null }) {
  if (!data) return null;

  let safe: string;
  try {
    safe = JSON.stringify(JSON.parse(data)).replace(/</g, "\\u003c");
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
        url: record.ogUrl || SITE_URL,
        logo: absoluteUrl(record.ogImageUrl),
        description: record.metaDescription,
      });
  }
}
