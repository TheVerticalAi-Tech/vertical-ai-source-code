"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/landing-page/header";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { CheckCircle2, TrendingUpIcon, Activity, ChevronRight, ArrowRight, Clock, Globe, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CaseStudySection {
  id?: number;
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  quote?: string;
}

function renderSection(section: CaseStudySection, index: number) {
  return (
    <div key={section.id ?? index} className="mb-2">
      {section.title && (
        <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900 tracking-tight">{section.title}</h3>
      )}
      {section.imageUrl && (
        <div className="my-12 rounded-2xl overflow-hidden aspect-[21/9] relative shadow-lg">
          <img
            src={section.imageUrl}
            alt={section.imageAlt || section.title || ""}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      {section.quote && (
        <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-600 text-lg">
          {section.quote}
        </blockquote>
      )}
      {section.content && (
        <p className="mb-8 text-lg text-gray-700 leading-relaxed">{section.content}</p>
      )}
    </div>
  );
}

function CaseStudyDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/case-studies`)
      .then((res) => res.json())
      .then((json) => {
        const list = Array.isArray(json?.caseStudies) ? json.caseStudies : [];
        const cs = list.find((c: any) => c.slug === slug && c.status === "published");
        if (cs) {
          setData({
            title: cs.storyTitle,
            client: cs.breadcrumbTitle,
            industry: cs.categoryBadge,
            banner: cs.headerImageUrl,
            mainHeading: cs.mainHeading,
            testimonialQuote: cs.testimonialQuote,
            metrics: cs.keyResults || [],
            implementationSteps: cs.implementationSteps || [],
            sections: cs.sections || [],
          });
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (!slug) return <div className="py-32 text-center text-xl text-gray-600">No case study specified.</div>;
  if (notFound) return <div className="py-32 text-center text-xl text-gray-600">Case study not found.</div>;
  if (!data) return <div className="py-32 text-center text-xl text-gray-600">Loading case study details...</div>;

  return (
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12">
        {/* Left Content */}
        <div className="lg:col-span-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/case-studies" className="hover:text-primary transition-colors shrink-0">Case Studies</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-gray-900 font-medium truncate">{data.client}</span>
          </nav>

          <div className="w-full h-[250px] md:h-[400px] relative rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-xl group">
            <img
              src={data.banner}
              alt={data.client}
              className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary bg-primary/5 text-primary text-sm font-bold  mb-4">
            {data.industry}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
            {data.mainHeading || `How ${data.client} Optimized Operations`}
          </h2>
          <article className="prose prose-base md:prose-lg max-w-none prose-p:text-gray-600 prose-headings:text-gray-900">
            {data.testimonialQuote && (
              <p className="text-xl text-gray-800 mb-10 border-l-4 border-primary pl-6 py-2">
                &quot;{data.testimonialQuote}&quot;
              </p>
            )}
            {data.sections.map((section: CaseStudySection, index: number) => renderSection(section, index))}
          </article>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-4 sticky top-16 md:top-24 self-start">
          {/* Key Metrics Card - Premium Gradient */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary rounded-full mix-blend-screen filter blur-[80px] opacity-40"></div>

            <h4 className="text-xl font-bold text-primary mb-6 md:mb-8 flex items-center gap-3 relative z-10">
              <TrendingUpIcon className="text-primary" />
              <span>Key Results</span>
            </h4>
            <div className="space-y-6 md:space-y-8 relative z-10">
              {data.metrics.map((metric: any, i: number) => (
                <div key={i} className="flex flex-col border-l-2 border-primary/30 pl-5 relative before:absolute before:content-[''] before:-left-[2px] before:top-1 before:w-[2px] before:h-4 before:bg-primary">
                  <span className="text-2xl md:text-3xl font-bold text-primary">{metric.value}</span>
                  <span className="text-sm  text-gray-500 mt-1 md:mt-2">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Value Prop Card */}
          <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="text-primary" /> Implementation
            </h4>
            <ul className="space-y-4">
              {data.implementationSteps.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={20} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
  );
}

export default function CaseStudyDetailClient() {
  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <CaseStudyDetailContent />
      </Suspense>

      <LandingPageFooter />
    </div>
  );
}
