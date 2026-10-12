import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Support | The Vertical AI",
  description:
    "Get help from The Vertical AI's support team: technical implementation, billing, and account questions answered.",
  alternates: { canonical: `${SITE_URL}/support` },
};

export default function SupportPage() {
  return <SupportClient />;
}
