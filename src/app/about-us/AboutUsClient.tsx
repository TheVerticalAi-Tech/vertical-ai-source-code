"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import Image from "next/image";
import {
  ArrowRight, Shield, Zap, Globe, MessageSquare,
  Cpu, Layers, Activity, Lock, Eye, Server, Wifi
} from "lucide-react";
import Link from "next/link";
import banner from "@/assets/company/about-us/banner.webp";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield, Zap, Globe, MessageSquare, Cpu, Layers,
  Activity, Lock, Eye, Server, Wifi, ArrowRight,
};

interface ArchitectureFeature { title: string; description: string; icon?: string; }
interface Pillar { title: string; description: string; imageUrl: string; imageAlt: string; }
interface EthosValue { title: string; description: string; }

interface AboutData {
  status: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroImageUrl: string;
  architectureTitle: string;
  architectureTitleHighlight: string;
  architectureDescription: string;
  architectureFeatures: ArchitectureFeature[];
  pillarsTitle: string;
  pillarsTitleHighlight: string;
  pillarsDescription: string;
  pillars: Pillar[];
  ethosTitle: string;
  ethosTitleHighlight: string;
  ethosDescription: string;
  ethosValues: EthosValue[];
  ctaTitle: string;
  ctaButtonText: string;
  ctaButtonUrl: string;
}

function LucideIcon({ name, size = 28, className = "" }: { name?: string; size?: number; className?: string }) {
  const Icon = name ? (ICON_MAP[name] ?? Zap) : Zap;
  return <Icon size={size} className={className} />;
}

function highlightText(full: string, highlight: string) {
  if (!highlight || !full) return full;
  const idx = full.indexOf(highlight);
  if (idx === -1) return full;
  return (
    <>
      {full.slice(0, idx)}
      <span className="text-primary font-bold">{highlight}</span>
      {full.slice(idx + highlight.length)}
    </>
  );
}

export default function AboutUsClient() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/about-us`)
      .then((r) => r.json())
      .then((json) => { if (json.about) setData(json.about); })
      .catch(() => {});
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      <PageHero
        title="About Us"
        backgroundImage={banner.src}
        backgroundText="About Us"
      />

      <main>
        {/* Intro Section */}
        {(data.heroTitle || data.heroDescription || data.heroImageUrl) && (
          <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {data.heroTitle && (
                  <h2 className="text-3xl md:text-5xl text-gray-900 mb-6 md:mb-8 leading-[1.1]">
                    {data.heroTitle.replace(data.heroTitleHighlight, "").trimEnd()}
                    {data.heroTitleHighlight && (
                      <><br /><span className="text-primary font-bold">{data.heroTitleHighlight}</span></>
                    )}
                  </h2>
                )}
                {data.heroDescription && (
                  <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                    {data.heroDescription}
                  </p>
                )}
              </motion.div>

              {data.heroImageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <Image src={data.heroImageUrl} alt="Architecture" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Architecture Section */}
        {data.architectureFeatures?.length > 0 && (
          <section className="py-16 md:py-20 px-4 md:px-12 lg:px-20 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                {data.architectureTitle && (
                  <h2 className="text-3xl md:text-5xl text-gray-900 leading-tight er">
                    {highlightText(data.architectureTitle, data.architectureTitleHighlight)}
                  </h2>
                )}
                {data.architectureDescription && (
                  <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-4">{data.architectureDescription}</p>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {data.architectureFeatures.map((feature, i) => (
                  <div key={i} className="group bg-white border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-primary/10 text-primary mb-4 md:mb-6">
                      <LucideIcon name={feature.icon} size={28} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{feature.title}</h3>
                    <p className="text-gray-500 text-base md:text-lg leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Core Pillars Section */}
        {data.pillars?.length > 0 && (
          <section className="bg-white py-16 md:py-20 overflow-hidden border-t border-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16 md:mb-32">
                {data.pillarsTitle && (
                  <h3 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight er">
                    {data.pillarsTitle}
                    {data.pillarsTitleHighlight && (
                      <><br /><span className="text-primary">{data.pillarsTitleHighlight}</span></>
                    )}
                  </h3>
                )}
                {data.pillarsDescription && (
                  <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mt-4 font-medium">{data.pillarsDescription}</p>
                )}
              </div>

              <div className="space-y-16 sm:space-y-18 lg:space-y-22">
                {data.pillars.map((pillar: any, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <div key={i} className="relative">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 items-center">
                        <motion.div
                          initial={{ x: isEven ? -100 : 100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`relative aspect-[16/10] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl ${isEven ? "lg:order-1" : "lg:order-2"}`}
                        >
                          {pillar.imageUrl && (
                            <Image
                              src={pillar.imageUrl}
                              alt={pillar.imageAlt || pillar.title}
                              fill
                              className="object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </motion.div>

                        <motion.div
                          initial={{ x: isEven ? 100 : -100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          viewport={{ once: true }}
                          className={`space-y-6 md:space-y-8 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                        >
                          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <LucideIcon name={pillar.icon} size={28} className="md:w-8 md:h-8" />
                          </div>
                          <h4 className="text-2xl md:text-4xl font-bold text-gray-900">{pillar.title}</h4>
                          <p className="text-base md:text-lg text-gray-500 leading-relaxed">{pillar.description}</p>
                          <div className="pt-2 md:pt-4">
                            <Link href="/get-demo" className="inline-flex items-center gap-3 text-primary font-bold text-lg md:text-xl group/link">
                              Explore Technical Docs
                              <ArrowRight className="w-6 h-6 transition-transform group-hover/link:translate-x-2" />
                            </Link>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Ethos Section */}
        {(data.ethosTitle || data.ethosValues?.length > 0) && (
          <section className="bg-white py-16 md:py-28 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <span className="text-primary font-semibold text-sm tracking-wide">Our Ethos</span>
              {data.ethosTitle && (
                <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-gray-900 leading-tight max-w-3xl">
                  {highlightText(data.ethosTitle, data.ethosTitleHighlight)}
                </h2>
              )}
              {data.ethosDescription && (
                <p className="mt-6 text-gray-600 text-lg max-w-2xl leading-relaxed">{data.ethosDescription}</p>
              )}
              <div className="my-12 h-px bg-gray-200" />
              <div className="grid md:grid-cols-3 gap-10">
                {data.ethosValues?.map((val, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-gray-900">{val.title}</h3>
                    <p className="mt-2 text-gray-600 text-sm leading-relaxed">{val.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {data.ctaTitle && (
          <section className="bg-white">
            <div className="bg-primary rounded-t-[40px] px-6 py-12 md:p-18 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 max-w-3xl mx-auto space-y-8 md:space-y-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  {data.ctaTitle.split("\n").map((line, i, arr) => (
                    <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                  ))}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                  <Link
                    href={data.ctaButtonUrl || "/get-demo"}
                    className="w-full sm:w-auto px-10 py-5 bg-accent text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-4 transition-all shadow-xl hover:-translate-y-1"
                  >
                    {data.ctaButtonText}
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                  <Link href="/careers" className="w-full sm:w-auto px-10 py-5 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-white border border-white/20 rounded-2xl font-bold text-xl transition-all backdrop-blur-md flex items-center justify-center">
                    Join the Mission
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <LandingPageFooter />
    </div>
  );
}
