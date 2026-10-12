import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import WhyUsClient from "./WhyUsClient";

export const metadata: Metadata = {
  title: "Why The Vertical AI",
  description:
    "We don't just build tools, we architect results. Discover the six core pillars behind The Vertical AI's enterprise-trust architecture.",
  alternates: { canonical: `${SITE_URL}/why-us` },
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}
