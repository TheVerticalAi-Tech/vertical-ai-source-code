"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Mic, ShieldCheck, AlertCircle, Database, Zap, Sparkles, ShieldAlert, CheckCircle2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function IndustryUseCases({ data }: { data?: any[] }) {
    const router = useRouter();
    const tabsData = data || [];
    const [activeIndex, setActiveIndex] = useState(0);
    const currentTab = tabsData[activeIndex];
    const tabsRef = useRef<HTMLDivElement>(null);

    if (!currentTab) return null;

    const tabIcons = [Mic, Database, ShieldAlert, ShieldCheck];
    const CurrentIcon = tabIcons[activeIndex % tabIcons.length] || Mic;

    const handleTabClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveIndex(index);
        e.currentTarget.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    return (
        <section className="bg-white flex items-center justify-center py-16 md:py-24 px-4 md:px-16 overflow-hidden border-t border-gray-50">
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="max-w-7xl mx-auto box-border w-full">
                <div className="flex flex-col gap-12">

                    {/* Tab Selection */}
                    <div 
                        ref={tabsRef}
                        className="flex overflow-x-auto no-scrollbar scroll-smooth items-center justify-start lg:justify-center gap-2 md:gap-3 pb-3 -mx-4 px-4 lg:mx-0 lg:px-0 select-none"
                    >
                        {tabsData.map((tab, index) => {
                            const TabIcon = tabIcons[index % tabIcons.length] || Mic;
                            return (
                                <button
                                    key={tab.id || index}
                                    onClick={(e) => handleTabClick(index, e)}
                                    className={`
                                        flex items-center gap-2 md:gap-3 px-4 md:px-6 h-12 md:h-14 rounded-xl md:rounded-2xl text-sm md:text-base font-bold transition-all duration-300 select-none shrink-0
                                        ${activeIndex === index
                                            ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02] md:scale-105'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    <TabIcon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full bg-white rounded-3xl md:rounded-[40px] border border-gray-100 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] overflow-hidden"
                        >
                            <div className="p-6 md:p-12">
                                {/* Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10 mb-10 md:mb-16">
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl shrink-0 bg-primary flex items-center justify-center shadow-xl shadow-primary/20">
                                            <CurrentIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">{currentTab.content.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-primary font-medium text-base">{currentTab.tag}</span>
                                            </div>
                                        </div>
                                    </div>


                                    <button
                                        onClick={() => router.push('/get-demo')}
                                        className="w-full lg:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer"
                                    >
                                        <span>Talk to an Expert</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
                                    {/* Description */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10">
                                                <Zap className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="text-accent font-bold text-base">Overview</span>
                                        </div>
                                        <p className="text-base text-gray-600 ">
                                            {currentTab.content.desc}
                                        </p>
                                    </div>

                                    {/* Capabilities */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10">
                                                <Sparkles className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="text-accent font-bold text-base">Capabilities</span>
                                        </div>
                                        <ul className="space-y-4">
                                            {currentTab.content.capabilities.map((cap: string, i: number) => (
                                                <li key={i} className="flex items-start gap-4 group">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                                        <ArrowRight className="w-3 h-3 text-accent group-hover:text-white transition-colors" />
                                                    </div>
                                                    <span className="text-gray-700">{cap}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Outcomes */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-accent/10">
                                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="text-accent font-bold text-base">Operational Outcomes</span>
                                        </div>
                                        <ul className="space-y-4">
                                            {currentTab.content.outcomes.map((outcome: string, i: number) => (
                                                <li key={i} className="flex items-start gap-4 group">
                                                    <div className="mt-1 w-5 h-5 rounded-lg bg-accent/10 border border-accent/10 flex items-center justify-center shrink-0">
                                                        <Search className="w-3 h-3 text-accent" />
                                                    </div>
                                                    <span className="text-gray-600">{outcome}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
