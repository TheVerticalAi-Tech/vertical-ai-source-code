"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Legacy URL (?slug=) redirected to the new path-based route.
function LegacyIndustryDetailRedirect() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    window.location.replace(slug ? `/industry/${slug}` : "/");
  }, [slug]);

  return null;
}

export default function IndustryDetailPage() {
  return (
    <Suspense>
      <LegacyIndustryDetailRedirect />
    </Suspense>
  );
}
