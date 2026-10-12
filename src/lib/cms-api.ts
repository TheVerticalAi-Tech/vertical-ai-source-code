// Shared helper for reading published content from the admin CMS's public API
// instead of querying the database directly. See CMS_API_URL in .env.
export const CMS_API_URL = process.env.CMS_API_URL || "http://localhost:3000";

// Fetches a public CMS endpoint and returns the array under the given response key.
// The CMS wraps each resource's list under its own key (e.g. { jobs: [...] },
// { blogs: [...] }) rather than a common { success, data } shape, and ignores
// query params like ?slug= — filtering by slug/id is done locally after fetching.
export async function fetchCmsResource<T = Record<string, unknown>>(path: string, key: string): Promise<T[]> {
  try {
    const res = await fetch(`${CMS_API_URL}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) {
      throw new Error(`CMS request failed: ${path} (${res.status})`);
    }
    const json = await res.json();
    return Array.isArray(json?.[key]) ? json[key] : [];
  } catch {
    return [];
  }
}
