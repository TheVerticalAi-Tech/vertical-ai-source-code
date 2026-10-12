export interface JobListing {
  slug: string;
  title: string;
  category: string;
  location: string;
  type: string;
  experience?: string;
  salary: string;
  description: string;
  about: string[];
  responsibilities: string[];
  requirements: string[];
}

export const jobListings: JobListing[] = [
  {
    slug: "business-development-executive-sdr",
    title: "Business Development Executive / SDR",
    category: "Sales",
    location: "On-site + Field",
    type: "Full-time",
    experience: "2 - 4 Years",
    salary: "Competitive / Best in Industry",
    description:
      "Drive enterprise pipeline generation, consultative problem discovery, and high-impact deal shaping for AI-first enterprise infrastructure platforms.",
    about: [
      "At TheVertical.ai / Lendkraft.ai, you are selling AI-first enterprise infrastructure, not tools, licenses, or point solutions. Our platform replaces fragmented operations with an AI Operating Model that orchestrates voice, workflows, compliance, and outcomes.",
      "Your buyers are senior stakeholders — CXOs, Heads of Operations, Risk, Compliance, and Technology — in regulated, high-stakes environments such as banks, NBFCs, fintechs, and large enterprises. This role requires consultative selling, deep problem discovery, and business-context depth rather than transactional pitch-led sales.",
      "You will typically enter accounts through one high-impact use case (e.g., voice or collections) and expand relationships over time.",
    ],
    responsibilities: [
      "Enterprise Prospecting & Qualification: Identify and prospect mid-to-large B2B accounts in BFSI and regulated sectors via outbound, inbound, referrals, and field visits.",
      "Field Sales & Solution Discovery: Conduct on-site meetings with CXOs and functional leaders to understand operational bottlenecks and position TheVertical.ai as enterprise infrastructure.",
      "POCs & Deal Shaping: Set up high-quality demos, pilots, and proof-of-concepts closely aligned with customer operational workflows.",
      "Internal Collaboration: Work closely with Account Executives, Pre-Sales, and Solution Architects to ensure clean handovers and support proposal preparation.",
      "Pipeline & CRM Discipline: Rigorously maintain CRM records of leads, field meetings, objections, and deal stages with structured reporting.",
    ],
    requirements: [
      "2–4 years of experience in B2B IT / SaaS / Enterprise technology sales.",
      "Proven exposure to field sales and on-site enterprise stakeholder engagements.",
      "Strong communication, presentation, and business articulation skills with ability to speak to ROI and operational impact.",
      "Mindset to navigate longer, consultative sales cycles and multiple enterprise stakeholders.",
      "Experience selling to banks, NBFCs, fintechs, or regulated enterprises is a strong plus.",
      "Exposure to AI, automation, CPaaS, CCaaS, CRM, or workflow platforms is a strong plus.",
    ],
  },
];
