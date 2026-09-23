"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Legacy URL (?slug=) redirected to the new path-based route.
function LegacyCaseStudyDetailRedirect() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    window.location.replace(slug ? `/case-study/${slug}` : "/");
  }, [slug]);

  return null;
}

export default function CaseStudyDetailPage() {
  return (
    <Suspense>
      <LegacyCaseStudyDetailRedirect />
    </Suspense>
  );
}
