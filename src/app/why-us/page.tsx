import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import WhyUsClient from "./WhyUsClient";

export const metadata: Metadata = {
  title: "Why The Vertical AI",
  description:
    "We don't just build tools, we architect results. Discover the six core pillars behind The Vertical AI's enterprise-trust architecture.",
  alternates: { canonical: sitePageUrl("why-us") },
  openGraph: { url: sitePageUrl("why-us") },
};

export default function WhyUsPage() {
  return <WhyUsClient />;
}
