"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import { Orbitron, Ubuntu } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});



// Dynamically import all components
const AnimationBanner2 = dynamic(() => import("@/components/landing-page/animation-banner-2"), { ssr: true });
const WhatWeDo = dynamic(() => import("@/components/landing-page/what-we-do"), { ssr: true });
const CardScanner = dynamic(() => import("@/components/landing-page/CardScanner"), { ssr: true });
const ServicesHorizontalScroll = dynamic(() => import("@/components/landing-page/use-cases"), { ssr: true });
const Industries = dynamic(() => import("@/components/landing-page/industies"), { ssr: true });
const CounterSection = dynamic(() => import("@/components/landing-page/CounterSection"), { ssr: true });
const PartnerInGrowth = dynamic(() => import("@/components/landing-page/partner-in-growth"), { ssr: true });
const ProductsOS = dynamic(() => import("@/components/landing-page/products-os"), { ssr: true });
const TestimonialV3 = dynamic(() => import("@/components/landing-page/testimonial-v3"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/landing-page/faq-section"), { ssr: true });
const LandingPageFooter = dynamic(() => import("@/components/landing-page/landing-page-footer"), { ssr: true });




const LandingPageClient = () => {
  // UI state
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after hydration to prevent hydration mismatches
  // Use requestAnimationFrame to defer non-critical state updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        setIsMounted(true);
      });
    }
  }, []);

  // Smooth hash scrolling
  useEffect(() => {
    if (!isMounted || typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash, { passive: true });
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [isMounted]);

  return (
    <div
      className={`${orbitron.variable} ${ubuntu.variable} relative min-h-screen w-full overflow-x-clip`}
      style={{
        fontFamily: 'var(--font-ubuntu), sans-serif',
        '--font-outfit': 'var(--font-orbitron)',
        '--font-sans': 'var(--font-ubuntu)',
      } as React.CSSProperties}
    >
      <AnimationBanner2 />
      <WhatWeDo />
      <CardScanner />
      <ServicesHorizontalScroll />
      <Industries />
      <CounterSection />
      <PartnerInGrowth />
      <ProductsOS />
      <TestimonialV3 />
      <FAQSection />
      <LandingPageFooter />
    </div>
  );
};

export default LandingPageClient;
