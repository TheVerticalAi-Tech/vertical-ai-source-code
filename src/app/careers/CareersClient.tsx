"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import {
  MapPin,
  Clock,
  ArrowRight,
  IndianRupee,
  Briefcase,
  Cpu,
  Rocket,
  Network,
  Send,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import banner from "@/assets/career-banner.webp";

const jobCategories = [
  "Engineering",
  "Product",
  "Sales",
  "Operations",
  "Design",
];

interface CareerItem {
  id: string;
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
  status: string;
}

const manifestoPoints = [
  {
    title: 'Solve for the "Hard" Problems',
    desc: "Work on sub-500ms VeloXcore latency, long-term cognitive memory, and air-gapped AI deployments.",
    icon: Cpu,
  },
  {
    title: "Radical Velocity",
    desc: "We move fast because legacy is heavy. We value code that is elegant, deterministic, and built for 10x scale.",
    icon: Rocket,
  },
  {
    title: "Systems Thinking",
    desc: "Every engineer is a product owner. We don't build features; we engineer the nervous system of global enterprises.",
    icon: Network,
  },
];

export default function CareersClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [missions, setMissions] = useState<(CareerItem & { link: string })[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/careers`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.jobs)) {
          setMissions(
            json.jobs
              .filter((c: CareerItem) => c.status === "published")
              .map((c: CareerItem) => ({ ...c, link: `/careers/${c.slug}` }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const validateCorporateEmail = (val: string) => {
    setEmail(val);
    const genericDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
    ];
    const domain = val.split("@")[1];
    if (domain && genericDomains.includes(domain.toLowerCase())) {
      setEmailError("Please use your corporate email address.");
    } else {
      setEmailError("");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header visible={true} />

      <PageHero title="Careers: Join the Forge" backgroundImage={banner.src} />

      <main>
        {/* Headline & Sub-headline */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 text-center">
          <div className="max-w-5xl mx-auto mb-16 md:mb-20">
            <h1 className="text-3xl md:text-5xl text-gray-900 font-bold mb-4 leading-tight">
              Architect the Autonomous Enterprise.
            </h1>
            <p className="text-xl md:text-xl text-gray-500 leading-relaxed max-w-3xl mx-auto mb-10">
              We don’t hire for roles; we recruit{" "}
              <span className="text-primary font-bold">Krafters</span>. If you
              are obsessed with solving the world’s hardest problems in
              multimodal intelligence, deterministic governance, and
              high-frequency decisioning, your seat is at the forge.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("missions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black"
            >
              <span>View Open Missions</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Manifesto */}
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Manifesto
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl">
              We are building the Operating System for the next century of
              commerce. This requires more than just "coding"-it requires{" "}
              <span className="font-bold text-gray-900">
                Architectural Defiance
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {manifestoPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div
                  key={i}
                  className="p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-gray-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 text-left"
                >
                  <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {point.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Open Missions */}
        <section id="missions" className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Open Missions
              </h2>
            </div>

            {missions.length > 0 ? (
              <>
                <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-4 mt-6 md:mt-8 w-full max-w-5xl mx-auto bg-white p-2 md:p-3 rounded-2xl border border-gray-200 shadow-sm mb-10 md:mb-12">
                  {/* Search Bar */}
                  <div className="relative flex-1 w-full lg:max-w-md py-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by mission, keyword, or skills..."
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
                    />
                  </div>

                  <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

                  {/* Dropdown Filters */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 py-2 px-2 md:px-4 w-full lg:w-auto overflow-hidden shrink-0">
                    <div className="relative group/filter w-full sm:w-auto min-w-[160px]">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {jobCategories.map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                    <div className="relative group/filter w-full sm:w-auto min-w-[150px]">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-4 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="london">London</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                    <div className="relative group/filter w-full sm:w-auto min-w-[150px]">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-4 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                          <SelectValue placeholder="All Job Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Job Types</SelectItem>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {missions.map((mission, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {mission.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                          {mission.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mb-6">
                          <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <MapPin size={16} className="text-gray-400" />{" "}
                            {mission.location}
                          </span>
                          <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <Clock size={16} className="text-gray-400" />{" "}
                            {mission.type}
                          </span>
                          {mission.experience && (
                            <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
                              <Briefcase size={16} className="text-gray-400" />{" "}
                              {mission.experience}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <IndianRupee size={16} className="text-gray-400" />{" "}
                            {mission.salary}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-6">
                        <button
                          onClick={() => router.push(mission.link)}
                          className="w-fit inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black"
                        >
                          <span>Apply Here</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 md:py-24 bg-gray-50 rounded-[2.5rem] border border-gray-100 max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No Open Missions Right Now
                </h3>
                <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed px-4">
                  We're not actively recruiting for any specific roles at the
                  moment, but we're always on the lookout for exceptional
                  talent. If you believe you belong at the forge, we want to
                  hear from you.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <LandingPageFooter />
    </div>
  );
}
