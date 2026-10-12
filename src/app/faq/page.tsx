import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQs | The Vertical AI",
  description:
    "Answers to common questions about The Vertical AI's AI-native enterprise operating system, platforms, and services.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FAQPage() {
  return <FaqClient />;
}
