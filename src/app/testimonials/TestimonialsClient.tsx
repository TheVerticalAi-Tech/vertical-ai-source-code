"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { QuoteIcon, StarIcon } from "lucide-react";


interface Testimonial {
  id: string;
  content: string;
  companyName: string;
  rating: number;
  logoUrl: string;
  status: string;
}

export default function TestimonialsClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/testimonials`)
      .then((res) => res.json())
      .then((json) => { if (Array.isArray(json?.testimonials)) setTestimonials(json.testimonials); })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header visible={true} />

      <PageHero
        title="Testimonials"
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2938"
      />

      <main className="max-w-7xl mx-auto py-24 px-4 md:px-0">
        <div className="max-w-5xl mb-20 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl text-gray-700">
            See what our valued partners <br className="hidden sm:block" />
            <span className="text-primary font-semibold">are saying about us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {testimonials
                .filter((_, i) => i % 3 === colIndex)
                .map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-neutral-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 flex flex-col gap-6 group relative overflow-hidden"
                  >
                    <QuoteIcon className="absolute -top-6 -right-6 w-32 h-32 text-gray-50 transform rotate-12 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none fill-current" />

                    <div className="flex items-center justify-between pb-6 mb-2 border-b border-gray-100 relative z-10">
                      <div className="h-10 w-auto">
                        <img
                          src={testimonial.logoUrl}
                          alt={testimonial.companyName}
                          className="h-10 w-auto object-contain"
                        />
                      </div>

                      <div className="flex gap-1 text-primary">
                        {[...Array(5)].map((_, i) => {
                          const fillAmount = Math.max(0, Math.min(1, testimonial.rating - i));
                          return (
                            <div key={i} className="relative">
                              <StarIcon className="w-5 h-5 fill-transparent" />
                              <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: `${fillAmount * 100}%` }}
                              >
                                <StarIcon className="w-5 h-5 fill-primary" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="relative flex-1 z-10">
                      <p className="text-gray-600 text-base font-medium leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </main>

      <LandingPageFooter />
    </div>
  );
}
