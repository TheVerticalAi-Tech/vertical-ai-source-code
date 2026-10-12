"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Clock, Activity, ShieldAlert, Zap, MessageSquare, ChevronRight } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    description: string;
    image: string;
}

const defaultFeatures: Feature[] = [
    {
        id: "human-collections",
        title: "Human-Dependent Collections",
        description: "Collections rely heavily on human agents, leading to inconsistent outcomes and expensive operational overhead.",
        icon: Users,
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "reactive-compliance",
        title: "Reactive Compliance",
        description: "Compliance processes remain reactive, meaning critical risks are often identified too late to prevent regulatory impact or financial loss.",
        icon: ShieldAlert,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "delayed-fraud",
        title: "Delayed Fraud Detection",
        description: "Delays in fraud detection increase overall financial exposure and potential risk for the institution across the entire ecosystem.",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "manual-onboarding",
        title: "Manual Onboarding",
        description: "Burdensome manual workflows during onboarding directly slow down business growth and lead to lower customer conversion rates.",
        icon: Zap,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "siloed-interactions",
        title: "Siloed Interactions",
        description: "Valuable customer interactions often remain siloed and disconnected, failing to translate into immediate, policy-driven execution.",
        icon: MessageSquare,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    }
];

const staticIcons = [Users, ShieldAlert, Activity, Zap, MessageSquare, Clock];

const FeatureCard = ({ feature, index }: { feature: Feature, index: number }) => {
    const IconComponent = staticIcons[index % staticIcons.length];

    return (
        <div
            id={feature.id}
            className="feature-card py-5 first:pt-0"
        >
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/40 shadow-sm relative group/card overflow-hidden">
                {/* Text Content */}
                <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <IconComponent size={28} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg md:text-3xl font-bold text-gray-900">{feature.title}</h3>
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl">
                        {feature.description}
                    </p>
                </div>

                {/* Image Display */}
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 bg-white h-[250px] md:h-[350px] lg:h-[450px] w-full">
                    <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>

                {/* Subtle Glow Effect at Bottom Right */}
                <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover/card:opacity-100 transition-all duration-700 pointer-events-none" />
            </div>
        </div>
    );
};

export default function OtherFeatures({ data }: { data?: any }) {
    const features: Feature[] = (data?.features || defaultFeatures).map((f: any, i: number) => ({
        id: f.id || f.slug || `feature-${i}`,
        title: f.title,
        description: f.description,
        image: f.image || f.imageUrl,
    }));
    const title = data?.title || "Modernizing Operations -";
    const titleHighlight = data?.titleHighlight || "Beyond the Limits of Legacy Systems";
    const description = data?.description || "Operations today are fragmented across teams, tools, and channels:";

    const [activeTab, setActiveTab] = useState(features[0]?.id || "f1");

    // Intersection Observer logic to track active tab
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setActiveTab(entry.target.id);
                    }
                });
            },
            {
                threshold: [0.3],
                rootMargin: "-20% 0px -20% 0px"
            }
        );

        const cards = document.querySelectorAll('.feature-card');
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120; // Account for header offset
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-[#f8fafc] md:rounded-[24px] overflow-visible font-sans md:mx-6 my-0 md:my-12 md:shadow-sm md:border border-slate-100">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className="max-w-5xl mb-20 text-center mx-auto">
                    <h2 className="text-3xl md:text-4xl text-gray-700 mb-6 transition-all">
                        {title} <br />
                        <span className="text-primary font-semibold">{titleHighlight}</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 items-start relative">
                    <div className="hidden lg:flex w-full lg:w-1/3 flex-col gap-2 relative lg:sticky lg:top-[20vh] h-fit">
                        {/* Vertical line indicator */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />

                        {features.map((feature: Feature) => (
                            <button
                                key={feature.id}
                                onClick={() => scrollToSection(feature.id)}
                                className={`text-left py-4 pl-8 relative transition-all duration-300 group flex items-center gap-3 ${activeTab === feature.id ? 'text-accent font-bold' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                            >
                                {/* Active Indicator Dot */}
                                {activeTab === feature.id && (
                                    <motion.div
                                        layoutId="tab-dot"
                                        className="absolute left-[-5.5px] top-1/2 -translate-y-1/2 z-10"
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="11" height="11" rx="5.5" className="fill-accent"></rect>
                                        </svg>
                                    </motion.div>
                                )}

                                {/* Active Line - Sliding */}
                                {activeTab === feature.id && (
                                    <motion.div
                                        layoutId="tab-line"
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent z-0"
                                    />
                                )}

                                <span className="text-lg">{feature.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Tab Content - SCROLLABLE */}
                    <div className="flex-1 flex flex-col">
                        {features.map((feature: Feature, index: number) => (
                            <FeatureCard key={feature.id} feature={feature} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
