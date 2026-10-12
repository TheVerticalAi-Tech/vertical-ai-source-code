"use client";

import React, { useEffect, useState } from 'react';
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import Image from "next/image";
import Link from "next/link";
import { Target, Lightbulb, TrendingUpIcon, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface WhyFrameworkPillar {
  heroBannerText: string;
  mainHeading: string;
  introDescription: string;
  heroBannerImageUrl: string;
  featuredContentImageUrl: string;
  sec1Tag: string;
  sec1Heading: string;
  sec1Text: string;
  sec2Tag: string;
  sec2Heading: string;
  sec2Text: string;
  componentsHeading: string;
  componentsSubheading: string;
  capabilities: string[];
  sec3Tag: string;
  sec3Heading: string;
  sec3Text: string;
  results: { label: string; value: string }[];
}

export default function FeatureClientPage({ slug }: { slug: string }) {
  const [feature, setFeature] = useState<WhyFrameworkPillar | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/why-framework`)
      .then((res) => res.json())
      .then((json) => {
        const frameworks = Array.isArray(json?.frameworks) ? json.frameworks : [];
        const found = frameworks.find((f: any) => f.slug === slug) || null;
        if (found) {
          setFeature(found);
        } else {
          setNotFoundState(true);
        }
      })
      .catch(() => setNotFoundState(true));
  }, [slug]);

  if (notFoundState) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">Pillar not found.</div>;
  }

  if (!feature) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20">
      <Header visible={true} />

      <PageHero
        title={feature.heroBannerText}
        backgroundImage={feature.heroBannerImageUrl}
      />

      <main className="max-w-5xl mx-auto px-6 pt-16 md:pt-24">
        <div className="flex flex-col gap-10 md:gap-14">

          {/* Main Editorial Content */}
          <div className="w-full">

            {/* Header Section */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {feature.mainHeading}
              </h2>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                {feature.introDescription}
              </p>
            </motion.header>

            {/* Featured Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 md:mb-20 shadow-2xl shadow-gray-900/5 border border-gray-100"
            >
              <Image
                src={feature.featuredContentImageUrl}
                alt={feature.heroBannerText}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            {/* Metrics Grid - Dense & Authoritative */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
              {feature.results.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 md:p-8 rounded-3xl bg-gray-100 border border-gray-100 hover:border-primary/20 hover:bg-white transition-all duration-500 group"
                >
                  <span className="block text-4xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{metric.value}</span>
                  <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                </motion.div>
              ))}
            </section>

            {/* Detailed Analysis - Strategic & Technical */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12 mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-base ">
                  <Target size={14} />
                  <span>{feature.sec1Tag}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{feature.sec1Heading}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.sec1Text}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-base ">
                  <Lightbulb size={14} />
                  <span>{feature.sec2Tag}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{feature.sec2Heading}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.sec2Text}
                </p>
              </motion.div>
            </div>

            {/* Capabilities Row */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 md:mb-24 p-6 md:p-12 rounded-2xl bg-primary text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-4">{feature.componentsHeading}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.componentsSubheading}
                  </p>
                </div>
                <div className="md:w-2/3 flex flex-wrap justify-center md:justify-start gap-4">
                  {feature.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <CheckCircle2 size={18} className="text-accent" />
                      <span className="font-semibold text-sm whitespace-nowrap">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Impact Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 md:mb-24"
            >
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-base mb-6">
                <TrendingUpIcon size={14} />
                <span>{feature.sec3Tag}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {feature.sec3Heading}
              </h3>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
                {feature.sec3Text}
              </p>
            </motion.section>


          </div>
        </div>
      </main>
            {/* Bottom CTA Block - Modern Cinematic */}
            <section className="bg-white mt-16">
                <div className="bg-primary rounded-t-[40px] px-6 py-12 md:p-18 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            Ready to integrate?
                        </h2>
                        
                        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                            Join the leading enterprises utilizing The Vertical AI to completely automate compliance-heavy operational workflows securely.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-6">
                            <Link 
                                href="/get-demo"
                                className="w-full sm:w-auto py-3 md:py-3 px-5 md:px-5 bg-accent text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-4 transition-all shadow-xl hover:-translate-y-1 active:scale-95 duration-300 pointer-events-auto"
                            >
                                Request Full Documentation
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                            </Link>
                            <Link 
                                href="/why-us"
                                className="w-full sm:w-auto py-3 md:py-3 px-5 md:px-5 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-white border border-white/20 rounded-2xl font-bold text-sm sm:text-base transition-all backdrop-blur-md flex items-center justify-center active:scale-95 duration-300"
                            >
                                View All Pillars
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
      <LandingPageFooter />
    </div>
  );
}
