import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import GetDemoClient from "./GetDemoClient";

export const metadata: Metadata = {
  title: "Get a Demo | The Vertical AI",
  description:
    "Book a personalized demo and see how The Vertical AI can transform your enterprise workflows.",
  alternates: { canonical: sitePageUrl("get-demo") },
  openGraph: { url: sitePageUrl("get-demo") },
};

export default function GetDemoPage() {
  return <GetDemoClient />;
}
