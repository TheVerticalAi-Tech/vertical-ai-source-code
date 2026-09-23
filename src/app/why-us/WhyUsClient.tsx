"use client";

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import Image from "next/image";
import { Shield, ArrowRight, Target, Lightbulb, TrendingUpIcon } from "lucide-react";
import Link from "next/link";

interface WhyFrameworkCard {
  id: string;
  slug: string;
  categoryBadge: string;
  heroBannerText: string;
  mainHeading: string;
  introDescription: string;
  heroBannerImageUrl: string;
}

export default function WhyUsClient() {
  const [features, setFeatures] = useState<WhyFrameworkCard[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/why-framework`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.frameworks)) setFeatures(json.frameworks);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      {/* Hero Section */}
      <PageHero
        title="Why The Vertical AI"
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2940"
      />

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative">

        {/* Title Header */}
        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <Shield size={16} />
            The Vertical AI Advantage
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-4 tracking-tight leading-[1.1]">
            We Don't Just Build Tools, <br />
            <span className="text-primary font-bold">We Architect Results.</span>
          </h2>
        </div>


        {/* Features Grid Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const icons = [Shield, Target, Lightbulb, TrendingUpIcon];
            const Icon = icons[idx % icons.length];
            return (
              <Link
                key={feature.id}
                href={`/why-us/${feature.slug}`}
                className="group relative flex flex-col p-8 rounded-[2rem] bg-gray-50 border border-transparent hover:bg-white hover:border-gray-100 hover:shadow-[0_20px_50px_rgba(250,139,57,0.12)] transition-all duration-500 overflow-hidden"
              >
                {/* Visual Header */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8">
                  <Image
                    src={feature.heroBannerImageUrl}
                    alt={feature.heroBannerText}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shadow-lg">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {feature.heroBannerText}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-4">
                    {feature.mainHeading}
                  </p>
                  <p className="text-gray-500 line-clamp-3 leading-relaxed">
                    {feature.introDescription}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Block matching team/about */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 md:mt-24 py-12 md:py-16 rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/60 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">Ready to integrate?</h3>
            <p className="text-base md:text-lg text-gray-600 mb-8">Join the leading enterprises utilizing The Vertical AI to completely automate compliance-heavy operational workflows securely.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-demo" className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 rounded-xl bg-primary text-white font-medium text-sm md:text-base hover:bg-black transition-colors shadow-lg shadow-primary/20">
                Request Full Documentation
              </Link>
              <Link href="/" className="inline-flex items-center justify-center h-12 md:h-14 px-6 md:px-8 rounded-xl bg-white text-gray-900 font-medium text-sm md:text-base hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>

      </main>

      <LandingPageFooter />
    </div>
  );
}
