"use client";

import { useEffect } from "react";

// This route is retired. Apache issues the 301 before this page is ever
// served in production (see .htaccess). The client-side redirect below is
// a fallback for non-Apache environments (e.g. next dev).
export default function PlatformDetailPage() {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("slug");
    window.location.replace(slug ? `/platform/${slug}` : "/platform");
  }, []);

  return null;
}
