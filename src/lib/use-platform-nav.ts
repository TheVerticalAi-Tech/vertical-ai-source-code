"use client";

import { useEffect, useState } from "react";

export interface PlatformNavItem {
  name: string;
  desc: string;
  href: string;
}

const PLATFORM_ORDER = ["CLEO", "MOZHI", "INSIGHTS", "MAESTRO", "GUARDIAN", "CONVERSA"];

// Shared by the header dropdown, mobile menu, and footer links so "Platform OS"
// navigation always reflects whatever is published in the CMS.
export function usePlatformNavItems(): PlatformNavItem[] {
  const [items, setItems] = useState<PlatformNavItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/platform-os`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.platforms)) {
          const mapped: PlatformNavItem[] = json.platforms
            .filter((p: any) => p.status === "published")
            .map((p: any) => ({
            name: p.name,
            desc: p.heroTitle || "",
            href: `/platform/${p.slug}`,
          }));
          mapped.sort((a, b) => {
            const ai = PLATFORM_ORDER.indexOf(a.name.toUpperCase());
            const bi = PLATFORM_ORDER.indexOf(b.name.toUpperCase());
            const aIdx = ai === -1 ? PLATFORM_ORDER.length : ai;
            const bIdx = bi === -1 ? PLATFORM_ORDER.length : bi;
            return aIdx - bIdx;
          });
          setItems(mapped);
        }
      })
      .catch(console.error);
  }, []);

  return items;
}
