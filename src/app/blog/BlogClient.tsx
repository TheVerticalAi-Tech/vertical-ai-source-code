"use client";

import { useEffect, useState } from "react";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  User2Icon,
  ArrowRightIcon,
  ClockIcon,
  ChevronRight,
  ChevronDown,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import blogBanner from "@/assets/blogs/banner.webp"


interface BlogPost {
  blogs_id: number;
  title: string;
  slug: string;
  banner: string;
  outline: string;
  content: string;
  reading_time: string;
  key_takeaways: string;
  status: number;
  created_at: string;
}


export default function BlogClient() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all-insights");
  const [selectedYear, setSelectedYear] = useState("all-years");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/blogs`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.blogs)) {
          setBlogPosts(
            json.blogs
              .filter((b: any) => b.status === "published")
              .map((b: any) => ({
                blogs_id: b.id,
                title: b.title,
                slug: b.slug,
                banner: b.bannerUrl,
                outline: b.outline,
                content: b.content,
                reading_time: b.readingTime,
                key_takeaways: Array.isArray(b.keyTakeaways) ? b.keyTakeaways.join(", ") : b.keyTakeaways,
                status: b.status === "published" ? 1 : 0,
                created_at: b.publishedAt || b.createdAt,
              }))
          );
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  // Format date to display in a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    // Year filter
    const postYear = new Date(post.created_at).getFullYear().toString();
    const matchesYear = selectedYear === "all-years" || postYear === selectedYear;

    // Category filter
    const matchesCategory = selectedCategory === "all-insights" ||
      (selectedCategory === "ai" && (post.key_takeaways.toLowerCase().includes("ai") || post.slug.includes("execution") || post.slug.includes("native"))) ||
      (selectedCategory === "product" && (post.slug.includes("compliance") || post.title.toLowerCase().includes("product")));

    // Search filter
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.outline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesYear && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* For dark theme header text */}
      <Header visible={true} />

      {/* Hero Header with Breadcrumb */}
      <PageHero
        title="Blog & Insights"
        backgroundImage={blogBanner.src}
      />

      <main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="container mx-auto px-0 md:px-4 max-w-7xl">

          {/* ✅ Loading State */}
          {loading && (
            <></>
          )}

          {/* ❌ Error State */}
          {error && (
            <div className="text-center py-10">
              <p className="text-red-500">Error loading blog posts: {error}</p>
              <p className="mt-2 text-gray-500">Please try again later.</p>
            </div>
          )}

          {/* ✅ Blog List */}
          {!loading && !error && blogPosts.length > 0 && (
            <>
              {/* Filter and Search Section */}
              <div className="mb-12 md:mb-16 px-0 md:px-10">


                {/* Title and Subtitle */}
                <div className="max-w-5xl text-center mx-auto mb-10 md:mb-16">
                  <h2 className="text-3xl md:text-5xl text-gray-900 ">
                    The Idea Lab: <br />
                    <span className="text-primary font-bold">Insights Beyond the Surface</span>
                  </h2>
                </div>

                {/* Unified Filter and Search Toolbar */}
                <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-4 w-full max-w-5xl mx-auto bg-white p-2 md:p-3 rounded-2xl border border-gray-200 shadow-sm mb-10 md:mb-16">
                  {/* Search Bar */}
                  <div className="relative w-full lg:max-w-md py-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search insights..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* Right: Separator + Dropdowns */}
                  <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto shrink-0 lg:ml-auto">
                    <div className="hidden lg:block w-px h-8 bg-gray-200"></div>

                    {/* Dropdown Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 py-2 px-2 md:px-4 w-full lg:w-auto overflow-hidden shrink-0">
                      <div className="relative group/filter w-full sm:w-auto min-w-[160px]">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                            <SelectValue placeholder="All Insights" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-insights">All Insights</SelectItem>
                            <SelectItem value="ai">AI Insights</SelectItem>
                            <SelectItem value="product">Product Updates</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 py-2 px-2 md:px-4 w-full lg:w-auto overflow-hidden shrink-0">
                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="w-full flex items-center justify-between border-0 shadow-none px-4 py-2.5 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-0">
                            <SelectValue placeholder="All Years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-years">All Years</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.slug}
                      className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100"
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        {/* Image Section */}
                        <div className="h-48 relative m-4 rounded-lg overflow-hidden shine-effect">
                          <Image
                            src={post.banner}
                            alt={post.title}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            fill
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="border border-primary bg-black/70 text-white font-medium px-3 py-1 text-sm rounded-full transition group-hover:bg-primary group-hover:text-white">
                              AI Insights
                            </Badge>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3 flex-wrap">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <User2Icon size={14} className="text-primary" />
                                <span>Admin</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <CalendarIcon size={14} className="text-primary" />
                                <span>{formatDate(post.created_at)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <ClockIcon size={14} className="text-primary" />
                              <span>{post.reading_time} read</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary mb-3 transition-colors leading-tight">
                            {post.title}
                          </h2>

                          {/* Outline */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.outline}
                          </p>

                          {/* Read More CTA */}
                          <div className="flex items-center text-primary group-hover:text-primary/70 transition-colors">
                            <span className="text-sm font-medium mr-2">
                              Read More
                            </span>
                            <ArrowRightIcon
                              size={16}
                              className="group-hover:translate-x-1 transition-transform duration-200"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
                </div>
              )}

            </>
          )}

          {/* ❌ Empty State */}
          {!loading && !error && blogPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          )}
        </div>
      </main>

      <LandingPageFooter />
    </div>
  );
}
