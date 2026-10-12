"use client";

import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import banner from "@/assets/faq-banner.webp"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnifiedFAQItem {
  id: string;
  question: string;
  answer: string;
  type: string;
  category: string | null;
  scopeKey: string | null;
}

const platformNames: Record<string, string> = {
  maestro: "Maestro (Orchestration)",
  vocalis: "Vocalis (Voice Agents)",
  guardian: "Guardian (Compliance)",
  insights: "Insights (Analytics)",
  conversa: "Conversa (Chat Agents)"
};

const industryNames: Record<string, string> = {
  bfsi: "BFSI",
  healthcare: "Healthcare",
  telecom: "Telecom",
  ecommerce: "E-commerce",
  automotive: "Automotive",
  edtech: "EdTech",
  bpo: "BPO",
  microfinance: "Microfinance",
  travel: "Travel",
  "hr-services": "HR Services"
};

const platforms = ["maestro", "vocalis", "guardian", "insights", "conversa"];
const industries = ["bfsi", "healthcare", "telecom", "ecommerce", "automotive", "edtech", "bpo", "microfinance", "travel", "hr-services"];

export default function FaqClient() {
  const [allFaqs, setAllFaqs] = useState<UnifiedFAQItem[]>([]);
  const [faqType, setFaqType] = useState<"general" | "platform" | "industry">("general");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/faqs`)
      .then(res => res.json())
      .then(json => { if (Array.isArray(json?.faqs)) setAllFaqs(json.faqs.filter((f: any) => f.status === 'published')); })
      .catch(console.error);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(
      allFaqs.filter(f => f.type === 'general').map(f => f.category).filter(Boolean)
    )) as string[];
  }, [allFaqs]);

  useEffect(() => {
    setSelectedSubCategory("all");
    setOpenIndex(0);
    setVisibleItems([]);
  }, [faqType]);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter(faq => {
      if (faq.type !== faqType) return false;
      if (selectedSubCategory !== "all") {
        const matchField = faq.type === 'general' ? faq.category : faq.scopeKey;
        if (matchField !== selectedSubCategory) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allFaqs, faqType, selectedSubCategory, searchQuery]);

  useEffect(() => { setVisibleItems([]); }, [filteredFaqs]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!isMounted || filteredFaqs.length === 0) return;

    const observers: IntersectionObserver[] = [];
    accordionRefs.current = accordionRefs.current.slice(0, filteredFaqs.length);

    filteredFaqs.forEach((_, index) => {
      const ref = accordionRefs.current[index];
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) => prev.includes(index) ? prev : [...prev, index]);
              } else {
                setVisibleItems((prev) => prev.filter((i) => i !== index));
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => { observers.forEach((o) => o.disconnect()); };
  }, [filteredFaqs, isMounted]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAnimationStyle = (index: number) => {
    if (!isMounted) return { opacity: 0.1, transform: 'scale(0.75)', transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' };
    const isVisible = visibleItems.includes(index);
    return {
      opacity: isVisible ? 1 : 0.1,
      transform: isVisible ? 'scale(1)' : 'scale(0.75)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      <PageHero title="FAQ's" backgroundImage={banner.src} />

      <section className="relative px-4 md:px-[8%] block max-w-7xl mx-auto pt-12 md:pt-24 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              In case you missed anything, <br />
              <span className="text-primary font-bold">frequently asked questions</span>
            </h2>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-4 w-full max-w-5xl mx-auto bg-white p-2 md:p-3 rounded-2xl border border-gray-200 shadow-sm mb-10 md:mb-16">
            <div className="relative w-full lg:max-w-md py-2">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto shrink-0 lg:ml-auto">
              <div className="hidden lg:block w-px h-8 bg-gray-200"></div>
              <div className="flex flex-col sm:flex-row items-center gap-2 py-2 px-2 md:px-4 w-full lg:w-auto overflow-hidden shrink-0">
                <div className="relative group/filter w-full sm:w-auto min-w-[160px]">
                  <Select value={faqType} onValueChange={(val: any) => setFaqType(val)}>
                    <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                      <SelectValue placeholder="FAQ Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General FAQs</SelectItem>
                      <SelectItem value="platform">Platform OS FAQs</SelectItem>
                      <SelectItem value="industry">Industry FAQs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                <div className="relative group/filter w-full sm:w-auto min-w-[200px]">
                  <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                    <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                      <SelectValue placeholder={faqType === "general" ? "All Categories" : faqType === "platform" ? "All Platforms" : "All Industries"} />
                    </SelectTrigger>
                    <SelectContent>
                      {faqType === "general" && (
                        <>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </>
                      )}
                      {faqType === "platform" && (
                        <>
                          <SelectItem value="all">All Platforms</SelectItem>
                          {platforms.map((plat) => (
                            <SelectItem key={plat} value={plat}>{platformNames[plat] || plat}</SelectItem>
                          ))}
                        </>
                      )}
                      {faqType === "industry" && (
                        <>
                          <SelectItem value="all">All Industries</SelectItem>
                          {industries.map((ind) => (
                            <SelectItem key={ind} value={ind}>{industryNames[ind] || ind}</SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion List */}
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  ref={(el) => { accordionRefs.current[index] = el; }}
                  style={getAnimationStyle(index)}
                  className="rounded-lg bg-gray-100 border border-gray-200 shadow-sm transition-all duration-300 hover:bg-primary/10 origin-top"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-start justify-between p-5 md:p-6 text-left"
                  >
                    <h5 className={`text-base md:text-lg font-semibold pr-4 transition-colors duration-200 ${openIndex === index ? "text-primary" : "text-black/80"}`}>
                      {index + 1}. {faq.question}
                    </h5>
                    <ChevronDown className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180 text-primary" : "text-black/80"}`} />
                  </button>
                  {openIndex === index && (
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-black/80 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
}
