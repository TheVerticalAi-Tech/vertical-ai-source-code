import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import CaseStudiesClient from "./CaseStudiesClient";

export const metadata: Metadata = {
  title: "Case Studies | The Vertical AI",
  description:
    "Explore real results from our recent AI deployments across BFSI, BPO, and enterprise operations.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
