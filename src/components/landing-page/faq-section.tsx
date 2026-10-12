import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  status: string;
  createdAt: string;
}

const FAQSection: React.FC = () => {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/faqs`)
      .then((res) => res.json())
      .then((json) => { if (Array.isArray(json?.faqs)) setFaqs(json.faqs.filter((f: FAQItem) => !f.category || f.category === 'landing')); })
      .catch(console.error);
  }, []);

  // Intersection Observer for scroll animations (both directions)
  useEffect(() => {
    if (!isMounted || faqs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          let next = [...prev];
          entries.forEach((entry) => {
            const index = Number((entry.target as HTMLElement).dataset.index);
            if (entry.isIntersecting) {
              if (!next.includes(index)) {
                next.push(index);
              }
            } else {
              next = next.filter((i) => i !== index);
            }
          });
          return next;
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    accordionRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index.toString();
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [faqs, isMounted]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAnimationStyle = (index: number) => {
    // During SSR and initial render, use default styles to prevent hydration mismatch
    if (!isMounted) {
      return {
        opacity: 0.1,
        transform: 'scale(0.75)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }

    const isVisible = visibleItems.includes(index);

    return {
      opacity: isVisible ? 1 : 0.1,
      transform: isVisible ? 'scale(1)' : 'scale(0.75)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDelay: isVisible ? `${(index % 10) * 100}ms` : '0ms'
    };
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 2xl:py-32 px-4 sm:px-6 md:px-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl 2xl:max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 2xl:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left lg:sticky lg:top-32">
            <div className="mb-4 lg:mb-8">
              {/* Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-gray-700 mb-6 tracking-tight leading-tight">
                Find Answers To Your <br className="hidden sm:block" />
                <span className="text-primary font-semibold">Frequently Asked Questions</span>
              </h2>

              <p className="text-gray-500 text-sm sm:text-base 2xl:text-lg mb-8 max-w-lg">
                Everything you need to know about our sovereign AI operating system, enterprise integrations, and deployment options.
              </p>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/get-demo')}
                className="inline-flex items-center justify-center gap-2 py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl bg-primary text-white font-bold text-xs sm:text-base 2xl:text-lg hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto"
              >
                Talk to an Expert <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Right Column - Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 2xl:gap-5 w-full">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                ref={(el) => { accordionRefs.current[index] = el; }}
                style={getAnimationStyle(index)}
                className="rounded-xl 2xl:rounded-2xl bg-gray-50/80 border border-gray-200 shadow-sm transition-all duration-300 hover:bg-primary/5 origin-top overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-start justify-between p-4 sm:p-6 2xl:p-7 text-left cursor-pointer"
                >
                  <h5
                    className={`text-sm sm:text-base lg:text-lg 2xl:text-xl font-semibold pr-4 transition-colors duration-200 ${openIndex === index ? "text-primary" : "text-gray-800"
                      }`}
                  >
                    {index + 1}. {faq.question}
                  </h5>
                  <ChevronDown
                    className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 transition-transform duration-300 mt-0.5 ${openIndex === index ? "rotate-180 text-primary" : "text-gray-400"
                      }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 sm:px-6 2xl:px-7 pb-5 sm:pb-6 2xl:pb-7 text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;