import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Insights & Blog | The Vertical AI",
  description:
    "The Idea Lab: insights beyond the surface on AI-native enterprise architecture, orchestration, and automation from The Vertical AI.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogPage() {
  return <BlogClient />;
}
