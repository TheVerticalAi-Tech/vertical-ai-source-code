"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/landing-page/header";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { User2Icon, CalendarIcon, ClockIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Section =
  | { type: "text"; value: string }
  | { type: "heading"; value: string }
  | { type: "image"; url: string; alt: string }
  | { type: "list"; items: { label: string; value: string }[] }
  | { type: "cards"; items: { title: string; desc: string }[] };

function renderSection(section: Section, index: number) {
  switch (section.type) {
    case "text":
      return (
        <p key={index} className="mb-6 text-lg text-gray-700 leading-relaxed">
          {section.value}
        </p>
      );
    case "heading":
      return (
        <h3 key={index} className="text-3xl font-bold mt-12 mb-6 text-gray-900 tracking-tight">
          {section.value}
        </h3>
      );
    case "image":
      return (
        <div key={index} className="my-12 rounded-2xl overflow-hidden aspect-video relative shadow-xl">
          <img
            src={section.url}
            alt={section.alt}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
        </div>
      );
    case "list":
      return (
        <ul key={index} className="list-none pl-0 mb-10 space-y-4">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start text-lg text-gray-700 bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
              <span className="text-primary font-bold mr-3 mt-1">{item.label}:</span>
              {item.value}
            </li>
          ))}
        </ul>
      );
    case "cards":
      return (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          {section.items.map((card, i) => (
            <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-gray-900 mb-2">{card.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function BlogDetailContent() {
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/blogs`)
      .then((res) => res.json())
      .then((json) => {
        const blogs = Array.isArray(json?.blogs) ? json.blogs : [];
        const blog = blogs.find((b: any) => b.slug === slug) || null;
        if (blog) setData(blog);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!slug) return <div className="py-32 text-center text-xl text-gray-600">No blog post specified.</div>;
  if (loading) return <div className="py-32 text-center text-xl text-gray-600">Loading insight...</div>;
  if (!data) return <div className="py-32 text-center text-xl text-gray-600">Blog post not found.</div>;

  const articleSections: any[] = Array.isArray(data.articleSections) && data.articleSections.length > 0 ? data.articleSections : [];
  const sections: Section[] = Array.isArray(data.content) ? data.content : [];

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 overflow-hidden whitespace-nowrap">
        <Link href="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
        <ChevronRight size={14} className="shrink-0" />
        <Link href="/blog" className="hover:text-primary transition-colors shrink-0">Insights</Link>
        <ChevronRight size={14} className="shrink-0" />
        <span className="text-gray-900 font-medium truncate">{data.title}</span>
      </nav>

      {/* Post Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
        {data.title}
      </h1>

      {/* Hero Image */}
      <div className="w-full h-[400px] relative rounded-3xl overflow-hidden mb-12 shadow-xl group">
        <Image
          src={data.bannerUrl}
          alt="Blog Hero"
          fill
          className="object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-start gap-6 text-sm text-gray-500 mb-10 flex-wrap border-b border-gray-100 pb-8">
        <div className="flex items-center gap-2">
          <User2Icon size={18} className="text-primary" />
          <span className="font-medium">{data.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon size={18} className="text-primary" />
          <span>{formatDate(data.publishedAt || data.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon size={18} className="text-primary" />
          <span>{data.readingTime} read</span>
        </div>
      </div>

      {/* Article Sections (primary) */}
      {articleSections.length > 0 ? (
        <article className="max-w-none">
          {articleSections.map((section: any) => (
            <div key={section.id} className="mb-10">
              {section.title && (
                <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900 tracking-tight">
                  {section.title}
                </h3>
              )}
              {section.imageUrl && (
                <div className="my-8 rounded-2xl overflow-hidden aspect-video relative shadow-xl">
                  <img
                    src={section.imageUrl}
                    alt={section.imageAlt || section.title}
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
                <p className="text-lg text-gray-700 leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </article>
      ) : (
        <article className="max-w-none">
          {sections.map((section, index) => renderSection(section, index))}
        </article>
      )}

      {/* Author Bio Box */}
      <div className="mt-16 bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
        <h4 className="text-xl font-bold text-gray-900 leading-none mb-2">Written by {data.author}</h4>
        <p className="text-gray-500 mb-0">Head of AI Research at The Vertical AI. Passionate about autonomous agents, generative UI, and enterprise workflow orchestration.</p>
      </div>
    </main>
  );
}

export default function BlogDetailClient() {
  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
        <BlogDetailContent />
      </Suspense>
      <LandingPageFooter />
    </div>
  );
}
