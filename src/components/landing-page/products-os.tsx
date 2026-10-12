"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

// The 5 Vertical AI Products mapped to inner and outer rings
const baseProducts = [
  {
    name: "Maestro OS",
    role: "Decision & Orchestration",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
  },
  {
    name: "Conversa OS",
    role: "Conversational Execution",
    imageUrl: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Guardian OS",
    role: "Governance & Compliance",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Insight OS",
    role: "Performance & Intelligence",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "MarketingOS",
    role: "Growth Execution",
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
  },
  {
    name: "HRMS OS",
    role: "Workforce Intelligence",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
  },
];

const products = [
  ...Array.from({ length: 8 }).map((_, i) => ({
    id: `inner-${i}`,
    ring: "inner",
    angle: i * 45,
    ...baseProducts[i % baseProducts.length],
  })),
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `outer-${i}`,
    ring: "outer",
    angle: i * 30,
    ...baseProducts[i % baseProducts.length],
  })),
];

export default function ProductsOS() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [ringRadii, setRingRadii] = useState({ inner: 280, outer: 380 });
  const [offset, setOffset] = useState(32);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      let innerRadius = 280;
      let outerRadius = 380;
      let currentOffset = 32;

      if (w < 640) {
        innerRadius = 140;
        outerRadius = 185;
        currentOffset = 24;
      } else if (w < 768) {
        innerRadius = 190;
        outerRadius = 250;
        currentOffset = 24;
      } else if (w < 1024) {
        innerRadius = 230;
        outerRadius = 310;
        currentOffset = 28;
      } else if (w < 1536) {
        innerRadius = 280;
        outerRadius = 380;
        currentOffset = 32;
      } else {
        innerRadius = 340;
        outerRadius = 460;
        currentOffset = 36;
      }

      setRingRadii({ inner: innerRadius, outer: outerRadius });
      setOffset(currentOffset);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#051234] flex flex-col items-center justify-center font-sans border-b border-border min-h-[580px] sm:min-h-[720px] md:min-h-[850px] lg:min-h-[950px] 2xl:min-h-[1100px] py-20 sm:py-28 md:py-36 2xl:py-48 my-8 sm:my-14 md:my-20"
      onClick={() => setSelectedProduct(null)}
    >

      {/* RINGS & PRODUCT AVATARS CONTAINER */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] 2xl:max-w-[1300px] h-[1000px] 2xl:h-[1300px] pointer-events-none flex items-center justify-center z-0">

        {/* Outer Ring & Avatars */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[370px] h-[370px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] lg:w-[760px] lg:h-[760px] 2xl:w-[920px] 2xl:h-[920px] flex items-center justify-center rounded-full border border-primary/20"
        >
          {products.filter(p => p.ring === "outer").map((product, idx) => {
            const radius = ringRadii.outer;
            const radian = (product.angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const isSelected = selectedProduct === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 1.5 : 1,
                  rotate: -360
                }} // Counter-rotate so icons stay upright
                transition={{
                  opacity: { delay: idx * 0.1, duration: 0.8 },
                  scale: { duration: 0.3, type: "spring" },
                  rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(isSelected ? null : product.id);
                }}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] shadow-lg flex items-center justify-center pointer-events-auto cursor-pointer bg-slate-900 transition-colors ${isSelected ? 'border-accent shadow-accent/40 bg-accent/10' : 'border-primary shadow-primary/20 bg-primary/10'}`}
                style={{
                  top: `calc(50% + ${y}px - ${offset}px)`,
                  left: `calc(50% + ${x}px - ${offset}px)`,
                  zIndex: isSelected ? 1000 : 10,
                }}
              >
                <div className="w-full h-full relative rounded-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute top-[130%] left-1/2 -translate-x-1/2 w-48 bg-white border border-border shadow-2xl rounded-xl p-3 flex flex-col items-center pointer-events-auto cursor-default origin-top z-100000"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h4 className="text-sm font-bold text-slate-900 text-center">{product.name}</h4>
                      <p className="text-[11px] text-slate-500 text-center mt-1 leading-tight">{product.role}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Inner Ring & Avatars */}
        <motion.div
          animate={{ rotate: -360 }} // Spins the opposite way
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] lg:w-[560px] lg:h-[560px] 2xl:w-[680px] 2xl:h-[680px] flex items-center justify-center rounded-full border border-primary/20"
        >
          {products.filter(p => p.ring === "inner").map((product, idx) => {
            const radius = ringRadii.inner;
            const radian = (product.angle * Math.PI) / 180;
            const x = Math.cos(radian) * radius;
            const y = Math.sin(radian) * radius;
            const isSelected = selectedProduct === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 1.5 : 1,
                  rotate: 360
                }} // Counter-rotate opposite to parent
                transition={{
                  opacity: { delay: idx * 0.1, duration: 0.8 },
                  scale: { duration: 0.3, type: "spring" },
                  rotate: { duration: 90, repeat: Infinity, ease: "linear" }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(isSelected ? null : product.id);
                }}
                className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] shadow-lg flex items-center justify-center pointer-events-auto cursor-pointer bg-slate-900 transition-colors ${isSelected ? 'border-accent shadow-accent/40 bg-accent/10' : 'border-primary shadow-primary/20 bg-primary/10'}`}
                style={{
                  top: `calc(50% + ${y}px - ${offset}px)`,
                  left: `calc(50% + ${x}px - ${offset}px)`,
                  zIndex: isSelected ? 1000 : 10,
                }}
              >
                <div className="w-full h-full relative rounded-full overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute top-[130%] left-1/2 -translate-x-1/2 w-48 bg-white border border-border shadow-2xl rounded-xl p-3 flex flex-col items-center pointer-events-auto cursor-default origin-top"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h4 className="text-sm font-bold text-slate-900 text-center">{product.name}</h4>
                      <p className="text-[11px] text-slate-500 text-center mt-1 leading-tight">{product.role}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* VIGNETTE OVERLAY to darken edges over the avatars */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#03091e_100%)] z-20 opacity-90 hidden md:block" />

      {/* SOLID MASK & GLOW behind the text to hide passing avatars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[800px] 2xl:max-w-[1000px] h-[550px] 2xl:h-[650px] bg-[#051234] blur-[80px] rounded-full pointer-events-none z-5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[500px] 2xl:max-w-[700px] h-[300px] 2xl:h-[400px] bg-[#086C9E] opacity-50 blur-[100px] rounded-full pointer-events-none z-5" />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl 2xl:max-w-4xl px-4 sm:px-6 w-full mt-4 pointer-events-none">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight"
        >
          Transform Your Enterprise into an AI-First OS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl 2xl:text-2xl text-white/95 mb-6 sm:mb-8 font-light max-w-xl 2xl:max-w-2xl"
        >
          Orchestrate voice, workflows, and governance with a <br className="hidden sm:block" /> real-time, compliant AI OS.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03, translateY: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="w-fit sm:w-auto py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl bg-accent text-white font-bold text-xs sm:text-base 2xl:text-lg hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto"
          onClick={()=> router.push('/get-demo')}
        >
          Book a Demo
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </motion.button>
      </div>

    </section>
  );
}
