import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import TestimonialsClient from "./TestimonialsClient";

export const metadata: Metadata = {
  title: "Testimonials | The Vertical AI",
  description:
    "See what our partners and enterprise clients are saying about deploying The Vertical AI across their operations.",
  alternates: { canonical: `${SITE_URL}/testimonials` },
};

export default function TestimonialsPage() {
  return <TestimonialsClient />;
}
