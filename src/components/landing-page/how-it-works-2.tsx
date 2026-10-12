"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Step {
    title: string;
    imageUrl: string;
    description: string;
}
const ScrollHighlightItem = ({ step, index, scrollYProgress, totalSteps }: { step: Step, index: number, scrollYProgress: any, totalSteps: number }) => {
    const safeTotal = Math.max(1, totalSteps);
    const stepSize = 1 / safeTotal;
    const start = index * stepSize;
    const end = (index + 1) * stepSize;
    const fade = stepSize * 0.25;

    const opacity = useTransform(
        scrollYProgress,
        [start, start + fade, end - fade, end],
        [0.2, 1, 1, 0.2]
    );

    return (
        <motion.div
            style={{ opacity }}
            className="py-4 px-6 rounded-2xl"
        >
            <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-semibold text-black mb-2">
                    {index + 1}. {step.title}
                </span>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
};

export default function HowItWorks2({ data }: { data?: any }) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const activeSteps = data?.steps || [];
    const title = data?.title || "Why Enterprise AI";
    const titleHighlight = data?.titleHighlight || "Still Breaks.";
    const description = data?.description || "Most AI systems can generate outputs. Very few can coordinate execution.";

    return (
        <section ref={containerRef} className="py-16 md:py-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-12 lg:px-0">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="max-w-5xl mb-16 md:mb-24 text-center mx-auto">
                        <h2 className="text-4xl md:text-5xl text-gray-700  mb-4">
                            {title} {""}
                            <span className="text-primary font-semibold ml-2">{titleHighlight}</span>
                        </h2>
                        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
                            {description}
                        </p>
                    </div>

                    {/* Methodology Content - Desktop */}
                    <div className="hidden lg:flex flex-row items-start relative gap-8">

                        {/* LEFT SIDE: STACKING IMAGES (COVERING PREVIOUS ONES) */}
                        <div className="w-full lg:w-[45%] relative flex flex-col gap-[30vh]">
                            {activeSteps.map((step: any, index: number) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95, y: 100 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ margin: "-10%" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="sticky top-25 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white"
                                    style={{
                                        zIndex: index + 1
                                    }}
                                >
                                    <div className="relative w-full h-full bg-gray-100">
                                        {step.imageUrl && (
                                            <img
                                                src={step.imageUrl}
                                                alt={step.title}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT SIDE: TEXT LIST (STICKY & HIGHLIGHTING) */}
                        <div className="w-full lg:w-[55%] sticky top-25">
                            <div className="flex flex-col gap-0 border-l border-slate-100 ml-4">
                                {activeSteps.map((step: any, index: number) => (
                                    <ScrollHighlightItem
                                        key={index}
                                        step={step}
                                        index={index}
                                        scrollYProgress={scrollYProgress}
                                        totalSteps={activeSteps.length}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Methodology Content - Mobile */}
                    <div className="flex lg:hidden flex-col gap-16">
                        {activeSteps.map((step: any, index: number) => (
                            <div key={index} className="flex flex-col gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-100"
                                >
                                    {step.imageUrl && (
                                        <img
                                            src={step.imageUrl}
                                            alt={step.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="flex flex-col px-2"
                                >
                                    <span className="text-xl font-semibold text-black mb-3">
                                        {index + 1}. {step.title}
                                    </span>
                                    <p className="text-gray-600 text-base leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
