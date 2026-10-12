"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/landing-page/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  rating: number
  testimonial: string
  image: string
}

const staticTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "CTO",
    company: "TechFlow",
    rating: 5,
    testimonial: "The Vertical AI drastically reduced our operational costs. The autonomous agents handle 80% of our support tickets with human-like precision. It's a game changer.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Marketing Director",
    company: "GrowthHub",
    rating: 5,
    testimonial: "We automated our entire lead qualification process. The AI identifies high-intent prospects instantly, allowing our sales team to focus on closing deals.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Operations Manager",
    company: "LogistiX",
    rating: 5,
    testimonial: "Implementation was seamless. The Vertical AI integrated with our existing stack and started delivering value within days. Efficiency has improved by 40%.",
    image: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "CEO",
    company: "StartUp Inc",
    rating: 5,
    testimonial: "I was skeptical about AI agents, but The Vertical AI proved me wrong. It's like having an extra department working 24/7 without the overhead.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: "5",
    name: "David Kim",
    role: "VP of Sales",
    company: "ScaleUp",
    rating: 5,
    testimonial: "The ROI was immediate. We scale our outreach efforts effortlessly, and the personalization capabilities are unmatched in the market.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

function TestimonialsVariant() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const changeTestimonial = (newIndex: number) => {
    if (newIndex === currentIndex || isAnimating) return

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setTimeout(() => setIsAnimating(false), 100)
    }, 200)
  }

  const nextTestimonial = () => {
    const newIndex = (currentIndex + 1) % staticTestimonials.length
    changeTestimonial(newIndex)
  }

  const prevTestimonial = () => {
    const newIndex = (currentIndex - 1 + staticTestimonials.length) % staticTestimonials.length
    changeTestimonial(newIndex)
  }

  if (isMobile) {
    return (
      <section className="text-slate-900 px-4 py-8" id="testimonials">
        <div className="flex flex-col items-center mb-16 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Trusted By Enterprises
          </div>
          <h2 className="text-3xl md:text-5xl text-gray-900 ">
            Built For Massive Scale And Reliability, <br />
            <span className="text-primary font-semibold">Designed For Lightning Fast Execution.</span>
          </h2>
        </div>


        <div className="relative mx-auto max-w-sm mb-16">
          {/* Main testimonial card with zoom animation */}
          <div className={`bg-white rounded-xl p-6 border border-slate-200 min-h-[280px] flex flex-col justify-between transition-all duration-300 ease-in-out ${isAnimating
            ? 'opacity-0 transform scale-75 blur-sm'
            : 'opacity-100 transform scale-100 blur-0'
            }`}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <ReviewStars
                className="text-yellow-400"
                rating={staticTestimonials[currentIndex]?.rating || 5}
              />
              <div className="text-base text-slate-700">
                <blockquote cite="#">
                  "{staticTestimonials[currentIndex]?.testimonial || ''}"
                </blockquote>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Avatar className="!size-10 border border-slate-200 rounded-md">
                <AvatarImage
                  src={staticTestimonials[currentIndex]?.image}
                  alt={`Portrait of ${staticTestimonials[currentIndex]?.name}`}
                />
                <AvatarFallback className="bg-primary text-white">
                  {staticTestimonials[currentIndex]?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="block text-base font-semibold tracking-tight text-primary">
                  {staticTestimonials[currentIndex]?.name || ''}
                </span>
                <span className="block text-sm text-slate-500">
                  {staticTestimonials[currentIndex]?.role} - {staticTestimonials[currentIndex]?.company}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-0 right-0 translate-y-16 flex gap-3">
            <button
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Desktop view
  return (
    <section className="text-slate-900 px-8 py-12" id="testimonials">
      <div className="flex flex-col items-center mb-16 text-center max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Trusted By Enterprises
        </div>
        <h2 className="text-3xl md:text-5xl text-gray-900 ">
          Built For Massive Scale And Reliability, <br />
          <span className="text-primary font-semibold">Designed For Lightning Fast Execution.</span>
        </h2>
      </div>

      <ContainerScroll className="container h-[300vh]">
        <div className="sticky left-0 top-10 w-full py-12">
          <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
            {staticTestimonials.map((testimonial, index) => (
              <CardTransformed
                arrayLength={staticTestimonials.length}
                key={testimonial.id}
                index={index + 2}
                role="article"
                aria-labelledby={`card-${testimonial.id}-title`}
                aria-describedby={`card-${testimonial.id}-content`}
                className="border border-slate-200 bg-white shadow-xl"
              >
                <div className="flex flex-col items-center space-y-4 text-center">
                  <ReviewStars
                    className="text-yellow-400"
                    rating={testimonial.rating}
                  />
                  <div className="mx-auto w-4/5 text-lg text-slate-700">
                    <blockquote cite="#">{testimonial.testimonial}</blockquote>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="!size-12 border border-slate-200 rounded-md">
                    <AvatarImage
                      src={testimonial.image}
                      alt={`Portrait of ${testimonial.name}`}
                    />
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="block text-lg font-semibold tracking-tight text-accent md:text-xl">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-slate-500">
                      {testimonial.role} - {testimonial.company}
                    </span>
                  </div>
                </div>
              </CardTransformed>
            ))}
          </CardsContainer>
        </div>
      </ContainerScroll>
    </section>
  )
}

export default TestimonialsVariant