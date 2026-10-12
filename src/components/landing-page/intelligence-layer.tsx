"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, BrainCircuit, Headset, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Step {
    title: string;
    description: string;
    imageUrl: string;
}


const VerticalStep = ({ step, index }: { step: Step; index: number }) => {
    const router = useRouter();
    const defaultIcons = [Database, BrainCircuit, Headset];
    const StepIcon = defaultIcons[index % defaultIcons.length];
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%", once: false }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative md:sticky md:top-[22vh] w-full max-w-5xl mx-auto mb-16 md:mb-[25vh]"
            style={{
                zIndex: index + 1
            }}
        >
            <div className="bg-[#f7fafc] rounded-2xl border-[1px] border-slate-100 overflow-hidden shadow-sm flex flex-col md:flex-row items-stretch min-h-fit md:min-h-[450px]">
                {/* Visual side - The "Animated Gif / Video" area */}
                <div className="w-full md:w-[50%] relative min-h-[250px] md:min-h-[300px] lg:min-h-full bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200">
                    {step.imageUrl && (
                        <img
                            key={step.imageUrl}
                            src={step.imageUrl}
                            alt={step.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    {/* Subtle Overlay to blend with the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f7fafc]/20" />
                </div>

                {/* Content side */}
                <div className="w-full md:w-[50%] p-8 md:p-10 flex flex-col justify-center gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-lg shadow-black/5`}>
                                <StepIcon size={28} />
                            </div>
                            <span className="text-sm font-medium text-gray-400">Step {String(index + 1).padStart(2, '0')}</span>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-semibold text-gray-700 leading-[1.1] tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <div
                            onClick={() => {
                                router.push("/get-demo")
                            }}
                            className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer group/btn">
                            <span>Explore Integration</span>
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function IntelligenceLayer({ data }: { data?: any }) {
    const activeSteps = data?.steps || [];
    const title = data?.title || "How";
    const titleHighlight = data?.titleHighlight || "Maestro Works";
    const description = data?.description || "From enterprise signals to execution -coordinated, governed, and optimized in real time.";

    return (
        <section className="py-20 bg-white relative overflow-visible">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-5xl flex flex-col items-center mx-auto">
                    <h2 className="text-4xl md:text-5xl text-gray-700 leading-[1.1] tracking-tight mb-4">
                        {title} <span className="text-primary font-semibold">{titleHighlight}</span>
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Stacking Flow Area */}
                <div className="relative flex flex-col mt-20">
                    {activeSteps.map((step: any, index: number) => (
                        <VerticalStep key={index} step={step} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
}
