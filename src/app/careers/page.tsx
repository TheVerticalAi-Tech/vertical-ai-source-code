import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers: Join the Forge | The Vertical AI",
  description:
    "Explore open roles at The Vertical AI and help us architect the operating system for the autonomous enterprise.",
  alternates: { canonical: sitePageUrl("careers") },
  openGraph: { url: sitePageUrl("careers") },
};

export default function CareersPage() {
  return <CareersClient />;
}
