"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from 'lucide-react';

import logo1 from "@/assets/client-logos/Kotak-Mahindra.png"
import logo2 from "@/assets/client-logos/Bajaj-Finserv.png"
import logo3 from "@/assets/client-logos/DRA-Homes.png"
import logo4 from "@/assets/client-logos/TVS-Credit.png"
import logo5 from "@/assets/client-logos/smk-mg.png"

// --- Types ---
interface Testimonial {
  text: string;
  name: string;
  role: string;
  company: string;
  logo: any;
  rating: number;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "We truly appreciate the team’s ownership and execution. Their AI sales assistant helped us automate lead engagement, ensure consistent follow-ups, and improve conversion efficiency. The ability to handle interactions at scale without manual effort has made a clear impact on our sales process.",
    name: "Head of Sales",
    role: "Marketing & CRM",
    company: "DRA Homes",
    logo: logo3,
    rating: 5
  },
  {
    text: "Before this, we were missing leads due to slow follow-ups. With AI voice agents, every enquiry is now handled instantly, test drives are scheduled seamlessly, and service calls are proactive. This has improved conversions and ensured no opportunity is lost.",
    name: "MD & CEO",
    role: "Executive Leadership",
    company: "SMK MG",
    logo: logo5,
    rating: 4.0
  },
  {
    text: "Their AI voice agents for collections helped us significantly improve recovery rates and scaled the collection. Conversations are structured, empathetic, and fully compliant, ensuring a smooth and effective recovery process.",
    name: "National Collections Manager",
    role: "National Collections",
    company: "Kotak Mahindra Bank",
    logo: logo1,
    rating: 5
  },
  {
    text: "We saw a noticeable increase in on-time payments after partnering with them. Their AI voice agents handled follow-ups professionally and at scale, improving recovery efficiency while strengthening customer relationships.",
    name: "National Receivables Manager",
    role: "National Receivables",
    company: "Bajaj Finserv",
    logo: logo2,
    rating: 4.9
  },
  {
    text: "What we liked most was the balance between persistence and customer sensitivity. Their AI voice agents managed follow-ups intelligently, improving recoveries while significantly reducing customer complaints, truly wonderful service.",
    name: "Regional Head - Recoveries",
    role: "Regional Recoveries",
    company: "TVS Credits",
    logo: logo4,
    rating: 3.5
  },
];

// --- Sub-Components ---
const TestimonialsRow = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
  reverse?: boolean;
  onReadMore: (testimonial: Testimonial) => void;
}) => {
  return (
    <div className={`overflow-hidden ${props.className}`}>
      <style>
        {`
          @keyframes scroll-row-${props.reverse ? 'reverse' : 'normal'} {
            0% { transform: translateX(${props.reverse ? '-50%' : '0%'}); }
            100% { transform: translateX(${props.reverse ? '0%' : '-50%'}); }
          }
          .animate-scroll-row-${props.reverse ? 'reverse' : 'normal'} {
            animation: scroll-row-${props.reverse ? 'reverse' : 'normal'} ${props.duration || 10}s linear infinite;
          }
          .animate-scroll-row-${props.reverse ? 'reverse' : 'normal'}:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <ul
        className={`flex gap-6 pr-6 py-2 bg-white transition-colors duration-300 list-none m-0 p-0 w-max animate-scroll-row-${props.reverse ? 'reverse' : 'normal'}`}
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, name, role, company, logo, rating }, i) => (
                <motion.li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{
                    scale: 1.02,
                    y: -4,
                    boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-5 sm:p-6 md:p-8 2xl:p-10 pb-6 sm:pb-8 2xl:pb-10 rounded-2xl 2xl:rounded-3xl border border-neutral-100 shadow-sm w-[290px] sm:w-[380px] md:w-[480px] 2xl:w-[560px] bg-white transition-all duration-300 cursor-default select-none focus:outline-none focus:ring-2 focus:ring-primary/30 flex flex-col gap-4 sm:gap-5"
                >
                  {/* Logo and Rating Row */}
                  <div className="flex items-center justify-between gap-4 pb-4 sm:pb-6 mb-1 sm:mb-2 border-b border-gray-100">
                    <img
                      src={logo.src}
                      alt={company}
                      className="h-6 sm:h-8 md:h-10 2xl:h-12 max-w-[120px] md:max-w-none w-auto object-contain"
                    />

                    <div className="flex gap-0.5 md:gap-1 shrink-0">
                      {[...Array(5)].map((_, i) => {
                        const fillAmount = Math.max(0, Math.min(1, rating - i));
                        return (
                          <div key={i} className="relative">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 fill-transparent text-primary" />
                            <div
                              className="absolute inset-0 overflow-hidden"
                              style={{ width: `${fillAmount * 100}%` }}
                            >
                              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 fill-primary text-primary" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <blockquote className="m-0 p-0 flex flex-col gap-3 sm:gap-4">
                    <div className="relative">
                      <p className="text-gray-600 text-sm sm:text-base md:text-lg 2xl:text-xl font-medium leading-[1.6] m-0 line-clamp-4">
                        "{text}"
                      </p>
                      {text.length > 180 && (
                        <button
                          onClick={() => props.onReadMore({ text, name, role, company, logo, rating })}
                          className="text-primary font-bold text-xs sm:text-sm mt-2 hover:underline focus:outline-none cursor-pointer"
                        >
                          Read More
                        </button>
                      )}
                    </div>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </ul>
    </div>
  );
};

// --- Modal Component ---
const TestimonialModal = ({
  testimonial,
  onClose
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl sm:rounded-3xl 2xl:rounded-[2.5rem] p-5 sm:p-8 2xl:p-10 max-w-2xl 2xl:max-w-3xl w-full shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="flex flex-col gap-6 md:gap-8 overflow-y-auto pr-1">
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <img src={testimonial.logo.src} alt={testimonial.company} className="h-7 md:h-10 2xl:h-12 max-w-[140px] md:max-w-none w-auto object-contain" />
            <div className="flex gap-0.5 md:gap-1 shrink-0">
              {[...Array(5)].map((_, i) => {
                const fillAmount = Math.max(0, Math.min(1, testimonial.rating - i));
                return (
                  <div key={i} className="relative">
                    <Star className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 fill-transparent text-primary" />
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillAmount * 100}%` }}>
                      <Star className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 fill-primary text-primary" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-gray-700 text-base md:text-xl 2xl:text-2xl font-medium leading-relaxed">
            "{testimonial.text}"
          </p>

          <button
            onClick={onClose}
            className="w-fit self-end mt-4 py-2.5 px-7 2xl:px-9 rounded-xl border border-primary/20 bg-transparent text-primary font-bold text-sm 2xl:text-base hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TestimonialsSection = ({ onReadMore }: { onReadMore: (t: Testimonial) => void }) => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-16 md:py-24 2xl:py-32 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="w-full z-10"
      >
        <div className="max-w-5xl 2xl:max-w-7xl mb-10 md:mb-16 2xl:mb-20 text-center mx-auto px-4 sm:px-6 z-10 relative">
          <h2 className="text-2xl sm:text-4xl md:text-5xl 2xl:text-6xl text-gray-700 tracking-tight">
            See what our valued partners <br className="hidden sm:block" />
            <span className="text-primary font-semibold">are saying about us</span>
          </h2>
        </div>

        <div
          className="flex flex-col gap-6 mt-6 sm:mt-10 overflow-hidden py-4"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsRow testimonials={testimonials} duration={40} onReadMore={onReadMore} />
        </div>
      </motion.div>
    </section>
  );
};

// --- Main App Component ---
export default function TestimonialV3() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  return (
    <div className="w-full min-h-fit md:min-h-screen bg-white transition-colors duration-300 flex flex-col justify-center relative selection:bg-primary selection:text-white overflow-x-hidden">
      <TestimonialsSection onReadMore={setSelectedTestimonial} />

      <AnimatePresence>
        {selectedTestimonial && (
          <TestimonialModal
            testimonial={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}