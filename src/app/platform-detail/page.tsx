"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Legacy URL (?slug=) redirected to the new path-based route.
function LegacyPlatformDetailRedirect() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    window.location.replace(slug ? `/platform/${slug}` : "/");
  }, [slug]);

  return null;
}

export default function PlatformDetailPage() {
  return (
    <Suspense>
      <LegacyPlatformDetailRedirect />
    </Suspense>
  );
}
