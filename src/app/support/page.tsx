import type { Metadata } from "next";
import { sitePageUrl } from "@/lib/site";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support | The Vertical AI",
  description:
    "Get help from The Vertical AI's support team: technical implementation, billing, and account questions answered.",
  alternates: { canonical: sitePageUrl("support") },
  openGraph: { url: sitePageUrl("support") },
};

export default function SupportPage() {
  return <SupportClient />;
}
