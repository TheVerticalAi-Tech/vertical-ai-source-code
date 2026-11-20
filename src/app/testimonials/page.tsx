import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials | The Vertical AI",
  description:
    "See what our partners and enterprise clients are saying about deploying The Vertical AI across their operations.",
  alternates: { canonical: sitePageUrl("testimonials") },
  openGraph: { url: sitePageUrl("testimonials") },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
