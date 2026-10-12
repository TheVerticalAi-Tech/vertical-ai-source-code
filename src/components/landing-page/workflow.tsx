"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import workflow1 from "@/assets/Landing-page/step-1.webp"
import workflow2 from "@/assets/Landing-page/step-2.webp"
import workflow3 from "@/assets/Landing-page/step-3.webp"
import MobileWorkflow1 from "@/assets/Landing-page/step-1.webp"
import MobileWorkflow2 from "@/assets/Landing-page/step-2.webp"
import MobileWorkflow3 from "@/assets/Landing-page/step-3.webp"
import { useEffect, useState } from "react"

const textVariants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

const imageVariants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1 },
}

const WorkflowSection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const steps = [
    {
      stepNumber: "AI Agents",
      title: "Vocalis - Voice AI Agents",
      description:
        "Human‑like voice agents that handle inbound and outbound calls with empathy and context. Features natural, multilingual speech, edge‑case handling with guardrails, and real‑time CRM updates.",
      image: workflow1,
      mobileImage: MobileWorkflow1,
      alt: "Vocalis Voice AI",
    },
    {
      stepNumber: "Chat Agents",
      title: "Conversa - Chat Agents",
      description:
        "Omnichannel messaging across WhatsApp, SMS and web that converts and supports customers. Includes secure OTP & eKYC flows, smart escalation routing, templates, and analytics.",
      image: workflow2,
      mobileImage: MobileWorkflow2,
      alt: "Conversa Chat Agents",
    },
    {
      stepNumber: "Compliance",
      title: "Guardian - Compliance Monitoring",
      description:
        "Automated QA and audit trails for regulated industries. Includes RBI / GDPR / PCI‑DSS checks, real-time violation alerts, and on-demand evidence packs.",
      image: workflow3,
      mobileImage: MobileWorkflow3,
      alt: "Guardian Compliance",
    },
    {
      stepNumber: "Orchestration",
      title: "Maestro - Orchestration Brain",
      description:
        "Connects agents, workflows and data for outcomes at scale. Supports event‑driven workflows, pluggable integrations, and built-in observability.",
      image: workflow1,
      mobileImage: MobileWorkflow1,
      alt: "Maestro Orchestration",
    },
    {
      stepNumber: "CPaaS",
      title: "OutcomeX - Unified CPaaS",
      description:
        "Voice, WhatsApp, SMS and Email delivery with analytics. Offers high‑throughput APIs, smart retries & routing, and cost controls.",
      image: workflow2,
      mobileImage: MobileWorkflow2,
      alt: "OutcomeX CPaaS",
    },
  ]

  return (
    <section id="workflow" className="relative py-8 sm:py-10 mt-4 sm:mt-6 mb-8 sm:mb-10">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center py-2 sm:py-3 "
        >
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-primary mb-1 sm:mb-2 px-1">
            PRODUCT SUITE
          </h2>
          <p className="text-slate-900 font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1">
            Build, Orchestrate, and Scale with AI
          </p>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl sm:max-w-2xl mx-auto px-1">
            AI Agents, Core Orchestration and Tools - unified to convert, support and recover at scale.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative mt-8 sm:mt-10">
          {steps.map((step, index) => {
            const reverse = index % 2 !== 0 // Generic alternating logic
            const textInitial = reverse ? "hiddenRight" : "hiddenLeft"
            const imageInitial = reverse ? "hiddenLeft" : "hiddenRight"

            return (
              <div
                key={index}
                className="sticky top-16 sm:top-24 gap-6 sm:gap-10 flex items-center justify-center"
                style={{ zIndex: index + 1 }}
              >
                {/* Non-sticky inner card: attach whileInView here */}
                <motion.div
                  className={`relative rounded-xl sm:rounded-2xl overflow-x-hidden overflow-y-visible mt-14 sm:mt-10 bg-gray-100 border border-slate-200 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-5xl mx-auto ${reverse ? "md:flex-row-reverse" : ""
                    }`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35, margin: "-15% 0% -15% 0%" }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                    {/* Mobile Image on top (animates like desktop) */}
                    <motion.div
                      className="flex-shrink-0 relative z-50 w-full md:hidden"
                      variants={imageVariants}
                      initial={imageInitial}
                      whileInView="show"
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      viewport={{
                        once: false,
                        amount: 0.35,
                        margin: "-15% 0% -15% 0%"
                      }}
                    >
                      <div className="relative w-full h-56 sm:h-64">
                        <Image
                          src={isMobile ? step.mobileImage : step.image}
                          alt={step.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 384px"
                          priority={index === 0}
                        />
                      </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                      className={`flex-1 text-slate-900 ${reverse ? "md:pl-6 lg:pl-8" : "md:pr-6 lg:pr-8"}`}
                      variants={textVariants}
                      initial={textInitial}
                      whileInView="show"
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      viewport={{ once: false, amount: 0.35, margin: "-15% 0% -15% 0%" }}
                    >
                      {/* Mobile Icon and Step Layout */}
                      <div className="flex items-center gap-4 md:hidden mb-4">
                        <h3 className="text-lg font-medium text-slate-500">{step.stepNumber}</h3>
                      </div>

                      {/* Desktop Step Layout */}
                      <h3 className="hidden md:block text-lg sm:text-xl font-medium text-slate-500 mb-6 sm:mb-8">
                        {step.stepNumber}
                      </h3>

                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent leading-tight">
                        {step.title}
                      </h2>
                      <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{step.description}</p>
                    </motion.div>

                    {/* Desktop Image */}
                    <motion.div
                      className="flex-shrink-0 relative z-50 hidden md:block"
                      variants={imageVariants}
                      initial={imageInitial}
                      whileInView="show"
                      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                      viewport={{ once: false, amount: 0.35, margin: "-15% 0% -15% 0%" }}
                    >
                      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 overflow-visible">
                        <Image
                          src={isMobile ? step.mobileImage : step.image}
                          alt={step.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      <motion.div
        className="max-w-screen-xl mx-auto border-t border-slate-200 mt-12 sm:mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </section>
  )
}

export default WorkflowSection
