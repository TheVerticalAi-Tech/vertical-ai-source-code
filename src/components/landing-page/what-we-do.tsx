"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Mic, MessageSquare, ShieldCheck, BarChart3, AlertTriangle, Plug2, TrendingUp, Network, Zap, Layers, Rocket, Search, Terminal, Activity } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const menuItems = [
    {
        id: "discover",
        label: "Discover & Build",
        icon: Terminal,
        tag: "Adaptive Intelligence OS",
        heroImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
        content: {
            title: "Discover & Build - Accelerated Deployment",
            problem: "10-20x faster model deployment cycles with pre-trained, domain-adaptive intelligence",
            integration: "<500ms real-time decision latency across voice, workflows, and system actions",
            outcome: "90%+ workflow alignment accuracy through enterprise-specific model training",
            stats: [
                { label: "Deployment", value: "20x Faster" },
                { label: "Latency", value: "<500ms" },
                { label: "Accuracy", value: "90%+" },
            ],
        }
    },
    {
        id: "unify",
        label: "Unify & Orchestrate",
        icon: Network,
        tag: "Enterprise Decision Layer",
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        content: {
            title: "Unify & Orchestrate - Seamless Connectivity",
            problem: "100+ system integrations across CRM, ERP, data lakes, and communication channels",
            integration: "Real-time orchestration across 1M+ of events/day with zero data fragmentation",
            outcome: "Single decision layer governing AI, humans, and workflows with full auditability",
            stats: [
                { label: "Integrations", value: "100+" },
                { label: "Events/Day", value: "1M+ " },
                { label: "Governance", value: "Audit-Ready" },
            ],
        }
    },
    {
        id: "scale",
        label: "Deploy & Scale Outcomes",
        icon: Rocket,
        tag: "Operational Efficiency OS",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        content: {
            title: "Deploy & Scale - Measured Business Impact",
            problem: "Zero-disruption deployment across legacy systems (API, on-prem, hybrid-ready)",
            integration: "3-5x operational efficiency improvement across sales, support, and recovery workflows",
            outcome: "Continuous learning loops improve outcomes by 20-30% over time",
            stats: [
                { label: "Efficiency", value: "3-5x" },
                { label: "Outcomes", value: "20-30%" },
                { label: "Deployment", value: "Zero-Risk" },
            ],
        }
    }
];

function MobileWhatWeDo() {
    return (
        <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 md:px-8 block lg:hidden overflow-hidden">

            <div className="max-w-7xl mx-auto box-border">
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-5xl mb-10 sm:mb-12 text-center mx-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl text-gray-700">
                            From Fragmented AI to Production<br />
                            <span className="text-primary font-bold">Powered by Velo<span className="text-4xl sm:text-5xl md:text-7xl">x</span>Core</span>
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium mt-4 max-w-2xl mx-auto">
                            Seamlessly unify and activate enterprise data into real-time, intelligence-ready execution.
                        </p>
                    </div>

                    <div className="w-full space-y-8">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-5 sm:p-6 md:p-8 space-y-6 sm:space-y-8"
                            >
                                <div className="w-full h-[180px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                                    <img
                                        src={item.heroImage}
                                        alt={item.label}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D6F5FF] flex items-center justify-center shadow-lg shrink-0">
                                        <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#00b4ff]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight">{item.label}</h3>
                                        <p className="text-primary font-bold text-xs sm:text-sm mt-0.5">{item.tag}</p>
                                    </div>
                                </div>

                                <div className="space-y-5 sm:space-y-6">
                                    {[
                                        { label: "Objective", icon: Terminal, val: item.content.problem, color: "text-accent" },
                                        { label: "Performance", icon: Activity, val: item.content.integration, color: "text-accent" },
                                        { label: "Impact", icon: TrendingUp, val: item.content.outcome, color: "text-accent" }
                                    ].map((subItem, idx) => (
                                        <div key={idx} className="flex gap-3 sm:gap-4">
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                                <subItem.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${subItem.color}`} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{subItem.label}</p>
                                                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-semibold">{subItem.val}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 border-t border-gray-100">
                                    {item.content.stats.map((stat: { value: string; label: string }, i: number) => (
                                        <div key={i} className="bg-accent/5 rounded-2xl p-2.5 sm:p-3 border border-accent/10 flex flex-col items-center text-center">
                                            <div className="text-accent text-sm sm:text-base md:text-lg font-bold leading-none">{stat.value}</div>
                                            <div className="text-gray-500 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mt-1.5">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function DetailCard({ item }: { item: typeof menuItems[0] }) {
    return (
        <div id={item.id} className="w-full rounded-2xl 2xl:rounded-3xl bg-white border border-gray-100 shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-6 2xl:p-10 flex flex-col relative mb-8 scroll-mt-28">

            <div className="px-2">
                <div className="flex items-center gap-6 mb-6">
                    <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-primary flex items-center justify-center text-white shrink-0">
                        <item.icon className="w-6 h-6 2xl:w-7 2xl:h-7" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-2xl 2xl:text-3xl font-bold text-black">{item.label}</h3>
                        <p className="text-primary font-bold text-base 2xl:text-lg flex items-center gap-2 mt-1">
                            {item.tag}
                        </p>
                    </div>
                </div>

                <div className="space-y-6 2xl:space-y-8 mb-4">
                    {[
                        { label: "Strategic Objective", icon: Terminal, val: item.content.problem },
                        { label: "Technical Performance", icon: Activity, val: item.content.integration },
                        { label: "Business Impact", icon: TrendingUp, val: item.content.outcome }
                    ].map((row, idx) => (
                        <div key={idx} className="flex gap-6 2xl:gap-8">
                            <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm shrink-0">
                                <row.icon className="w-6 h-6 2xl:w-7 2xl:h-7 text-primary" />
                            </div>
                            <div className="flex flex-col pt-1">
                                <span className="text-base 2xl:text-lg font-semibold text-gray-700 mb-1.5">{row.label}</span>
                                <p className="text-gray-700 text-sm 2xl:text-base max-w-2xl 2xl:max-w-3xl leading-relaxed">
                                    {row.val}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                    {item.content.stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-accent/10 border border-accent/20 rounded-2xl p-4 2xl:p-5 flex flex-col items-start"
                        >
                            <span className="text-2xl 2xl:text-3xl font-bold text-accent mb-2">{stat.value}</span>
                            <span className="text-sm 2xl:text-base text-accent">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function WhatWeDo() {
    const [activeId, setActiveId] = useState("discover");
    const activeItem = menuItems.find(i => i.id === activeId)!;

    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        const total = menuItems.length;
        let newIndex = Math.floor(latest * total);
        if (newIndex >= total) newIndex = total - 1;
        if (newIndex < 0) newIndex = 0;

        const newActiveId = menuItems[newIndex].id;
        if (activeId !== newActiveId) {
            setActiveId(newActiveId);
        }
    });

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={containerRef} className="bg-white relative">
            <div className="hidden lg:block py-24 2xl:py-32 pb-14 2xl:pb-20 relative z-10">
                <div className="max-w-5xl 2xl:max-w-7xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-5xl 2xl:text-6xl text-gray-800 tracking-tight">
                        From Fragmented AI to Production<br />
                        <span className="text-primary font-bold">Powered by Velo<span className="text-6xl md:text-7xl 2xl:text-8xl">x</span>Core</span>
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg 2xl:text-xl font-medium mt-4 max-w-3xl 2xl:max-w-4xl mx-auto">
                        Seamlessly unify and activate enterprise data into real-time, intelligence-ready execution.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 sm:px-8 md:px-12 2xl:px-16 hidden lg:block pb-32">
                <div className="flex w-full items-start justify-center gap-12 xl:gap-16 2xl:gap-24">
                    {/* Left SIDEBAR: Sticky */}
                    <div className="w-[340px] xl:w-[380px] 2xl:w-[440px] shrink-0 sticky top-32 self-start filter drop-shadow-sm">
                        <div className="flex flex-col w-full gap-4 2xl:gap-6">
                            {menuItems.map((item, index) => {
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full text-left flex items-center gap-4 2xl:gap-6 border overflow-hidden relative group p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl shadow-sm transition-all duration-500 ease-out will-change-transform ${activeId === item.id
                                            ? "bg-primary text-white border-transparent scale-[1.03] opacity-100 shadow-[0_10px_30px_rgba(1,119,255,0.2)]"
                                            : "bg-white text-gray-400 border-gray-100 scale-95 opacity-80 hover:opacity-80"
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center shrink-0 w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl transition-colors duration-500 ${activeId === item.id
                                            ? "bg-white/20 text-white"
                                            : "bg-primary/10 text-primary"
                                            }`}>
                                            <item.icon className="w-6 h-6 2xl:w-7 2xl:h-7" />
                                        </div>
                                        <h3 className={`font-medium text-lg 2xl:text-2xl transition-colors duration-500 ${activeId === item.id ? "text-white" : "text-slate-700"
                                            }`}>
                                            {item.label}
                                        </h3>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right SIDEBAR: Vertical NORMAL scrolling cards */}
                    <div className="flex-1 max-w-[850px] 2xl:max-w-[1050px] space-y-8 2xl:space-y-12">
                        {menuItems.map(item => (
                            <DetailCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>

            <MobileWhatWeDo />
        </section>
    );
}
