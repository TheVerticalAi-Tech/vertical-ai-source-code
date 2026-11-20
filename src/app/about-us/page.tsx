import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us | The Vertical AI",
  description:
    "We don't just add AI, we architect the future. Learn how The Vertical AI is building the operating system for the autonomous enterprise.",
  alternates: { canonical: sitePageUrl("about-us") },
  openGraph: { url: sitePageUrl("about-us") },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
