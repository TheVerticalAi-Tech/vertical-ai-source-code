"use client"

import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Link from "next/link";
import banner from "@/assets/casestudy/banner.webp"

export default function CaseStudiesClient() {
  const router = useRouter()
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/case-studies`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.caseStudies)) {
          const mapped = json.caseStudies.filter((cs: any) => cs.status === "published").map((cs: any) => ({
            slug: cs.slug,
            banner_image_url: cs.headerImageUrl,
            title: cs.storyTitle,
            industry: cs.categoryBadge,
            client_name: cs.breadcrumbTitle,
            kpi_primary_value: cs.keyResults?.[0]
              ? `${cs.keyResults[0].value} ${cs.keyResults[0].label}`
              : "",
            outcome: cs.testimonialQuote,
          }));
          setCaseStudies(mapped);
        } else {
          setError("Failed to load case studies");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || "Failed to load case studies");
        setLoading(false);
      });
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }

    updateScrollState()

    api.on("reInit", updateScrollState)
    api.on("select", updateScrollState)

    return () => {
      api.off("reInit", updateScrollState)
      api.off("select", updateScrollState)
    }
  }, [api])

  if (loading) return null
  if (error || caseStudies.length === 0) return null

  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      {/* Hero Header with Breadcrumb */}
      <PageHero
        title="Case Studies"
        backgroundImage={banner.src}
      />

      <section className="px-4 max-w-7xl mx-auto w-full pt-12 md:pt-16 pb-16 md:pb-24 overflow-hidden">

        {/* Header Title section */}
        <div className="max-w-5xl mb-10 md:mb-16 text-center mx-auto">
          <h2 className="text-2xl md:text-5xl text-gray-900 leading-tight mb-6">
            Explore the real results from <br />
            <span className="text-primary font-bold">our recent AI deployments.</span>
          </h2>
        </div>

        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            {/* Navigation Buttons - Below Title */}
            <div className="flex justify-end items-center mb-6 gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                className="relative top-0 right-0 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-900 hover:bg-gray-50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-all"
                aria-label="Previous case study"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                className="relative top-0 right-0 bg-white border border-gray-200 shadow-sm rounded-lg text-gray-900 hover:bg-gray-50 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed p-2 transition-all"
                aria-label="Next case study"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>


            <CarouselContent className="-ml-2 md:-ml-4 items-stretch">
              {caseStudies.map((caseStudy) => (
                <CarouselItem key={caseStudy.slug} className="pl-2 md:pl-4 basis-[90%] sm:basis-[90%] flex">
                  <motion.div
                    className="flex flex-col cursor-pointer w-full h-full group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="relative w-full h-full pb-4">
                      {/* Image Banner */}
                      <div className="h-56 md:h-64 relative overflow-hidden rounded-2xl shadow-sm">
                        {caseStudy.banner_image_url_mobile || caseStudy.banner_image_url ? (
                          <Image
                            src={caseStudy.banner_image_url_mobile || caseStudy.banner_image_url}
                            alt={caseStudy.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <p className="font-bold text-primary text-2xl px-4">{caseStudy.industry}</p>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm border border-white/20 scale-100 transition-transform duration-300 group-hover:scale-105">
                          {caseStudy.banner_title || caseStudy.kpi_primary_value}
                        </div>
                      </div>

                      {/* Overlapping Content Card */}
                      <div className="relative bg-white -mt-12 md:-mt-16 mx-3 md:mx-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-5 md:p-6 z-10 flex flex-col transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgb(0,204,255,0.15)] h-auto min-h-[180px]">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{caseStudy.industry}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                          <span className="text-sm font-medium text-gray-500">{caseStudy.client_name}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{caseStudy.title}</h3>
                        <p className="text-gray-600 mb-5 text-sm leading-relaxed">{caseStudy.outcome}</p>

                        <Link
                          href={`/case-study/${caseStudy.slug}`}
                          className="mt-auto inline-flex items-center text-primary font-semibold hover:text-primary/70 transition-colors"
                        >
                          {caseStudy.banner_cta_label || "Read case study"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
        </div>

        {/* Desktop Grid with Stagger */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.slug}
              className="flex flex-col cursor-pointer group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={() => router.push(`/case-study/${caseStudy.slug}`)}
            >
              <div className="relative w-full h-full pb-4 flex flex-col">
                {/* Image Banner */}
                <div className="h-64 relative overflow-hidden rounded-2xl shadow-sm">
                  {caseStudy.banner_image_url ? (
                    <Image
                      src={caseStudy.banner_image_url}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <p className="font-bold text-primary text-2xl px-4">{caseStudy.industry}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm border border-white/20 scale-100 transition-transform duration-300 group-hover:scale-105">
                    {caseStudy.banner_title || caseStudy.kpi_primary_value}
                  </div>
                </div>

                {/* Overlapping Content Card */}
                <div className="relative bg-white -mt-16 mx-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 z-10 flex flex-col transition-all duration-300 group-hover:-translate-y-2 flex-1 min-h-[220px]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{caseStudy.industry}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                    <span className="text-sm font-medium text-gray-500">{caseStudy.client_name}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">{caseStudy.title}</h3>
                  <p className="text-gray-600 mb-5 text-sm leading-relaxed line-clamp-3">{caseStudy.outcome}</p>

                  <Link
                    href={`/case-study/${caseStudy.slug}`}
                    className="mt-auto inline-flex items-center text-primary font-semibold hover:text-primary/70 transition-colors"
                  >
                    {caseStudy.banner_cta_label || "Read case study"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <LandingPageFooter />
    </div>
  );
}
