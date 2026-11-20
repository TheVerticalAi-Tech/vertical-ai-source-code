import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | The Vertical AI",
  description:
    "Explore real results from our recent AI deployments across BFSI, BPO, and enterprise operations.",
  alternates: { canonical: sitePageUrl("case-studies") },
  openGraph: { url: sitePageUrl("case-studies") },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
