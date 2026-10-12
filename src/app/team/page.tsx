import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Leadership Team | The Vertical AI",
  description:
    "Meet the leadership team building The Vertical AI's AI-native enterprise operating system.",
  alternates: { canonical: `${SITE_URL}/team` },
};

export default function TeamPage() {
  return <TeamClient />;
}
