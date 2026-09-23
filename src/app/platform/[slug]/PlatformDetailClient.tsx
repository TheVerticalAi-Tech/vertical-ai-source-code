"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import {
    Activity,
    ShieldCheck,
    Zap,
    Lock,
    Server,
    CheckCircle2,
    TrendingDown,
    Clock,
    ArrowRight,
    Shield,
    Award,
    Globe,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import HowItWorks2 from "@/components/landing-page/how-it-works-2";
import IntelligenceLayer from "@/components/landing-page/intelligence-layer";
import PlatformIndustryFAQ from "@/components/landing-page/platform-industry-faq";
import TestimonialV3 from "@/components/landing-page/testimonial-v3";


function PlatformDetailContent() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/platform-os`)
            .then(res => res.json())
            .then(json => {
                const platforms = Array.isArray(json?.platforms) ? json.platforms : [];
                const row = platforms.find((p: any) => p.slug === slug) || null;
                if (row) {
                    setData({
                        hero: {
                            title: row.heroTitle,
                            titleHighlight: row.heroTitleHighlight,
                            description: row.heroDescription,
                            image: row.heroImageUrl,
                        },
                        trustedClients: {
                            description: row.clientsDescription,
                            logos: row.clientLogos || [],
                        },
                        howItWorks: {
                            title: row.whyTitle,
                            titleHighlight: row.whyTitleHighlight,
                            description: row.whyDescription,
                            steps: row.whySteps || [],
                        },
                        intelligenceLayer: {
                            title: row.intelTitle,
                            titleHighlight: row.intelTitleHighlight,
                            description: row.intelDescription,
                            steps: row.intelSteps || [],
                        },
                        useCases: {
                            sectionTitle: row.useCasesTitle,
                            sectionTitleHighlight: row.useCasesTitleHighlight,
                            cards: row.useCasesCards || [],
                        },
                        measurableImpact: {
                            sectionTitle: row.impactTitle,
                            sectionTitleHighlight: row.impactTitleHighlight,
                            stats: row.impactMetrics || [],
                        },
                        securityCompliance: {
                            sectionTitle: row.securityTitle,
                            sectionTitleHighlight: row.securityTitleHighlight,
                            description: row.securityDescription,
                            features: row.securityFeatures || [],
                            gridItems: (row.securityGridItems || []).map((title: string) => ({ title })),
                        },
                        cta: {
                            title: row.ctaTitle,
                            titleHighlight: row.ctaTitleHighlight,
                        },
                    });
                } else {
                    setData(null);
                }
            })
            .catch(err => console.error("Error fetching platform data:", err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <div className="flex-1 flex items-center justify-center min-h-[60vh] text-gray-500">
                    Failed to load platform data.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <Header />
            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-start bg-white overflow-hidden pt-20 pb-20">
                {/* Background Waveform/Lines Animation */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <motion.path
                                key={i}
                                d={`M 0 ${50 + Math.sin(i) * 20} Q 25 ${20 + i * 5} 50 ${50} T 100 ${50 - Math.cos(i) * 20}`}
                                fill="transparent"
                                stroke="#1F3F74"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity: [0.1, 0.5, 0.1],
                                    d: [
                                        `M 0 ${50 + Math.sin(i) * 20} Q 25 ${20 + i * 5} 50 ${50} T 100 ${50 - Math.cos(i) * 20}`,
                                        `M 0 ${40 + Math.cos(i) * 30} Q 50 ${60 - i * 5} 75 ${40} T 100 ${60 + Math.sin(i) * 10}`,
                                        `M 0 ${50 + Math.sin(i) * 20} Q 25 ${20 + i * 5} 50 ${50} T 100 ${50 - Math.cos(i) * 20}`,
                                    ],
                                }}
                                transition={{
                                    duration: 10 + i * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mt-15">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-6xl  text-gray-700 tracking-tight leading-tight mb-6"
                    >
                        {data.hero.title} <br />
                        <span className="text-primary font-semibold">
                            {data.hero.titleHighlight}
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
                    >
                        {data.hero.description}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
                    >
                        <button
                            onClick={() => router.push('/get-demo')}
                            className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer pointer-events-auto"
                        >
                            <span>Talk to an Expert</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </motion.div>

                    {/* PLATFORM IMAGE - Swapped from Video */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-black aspect-video max-w-6xl mx-auto group/video"
                    >
                        <img
                            src={data.hero.image}
                            alt="Hero Image"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Platform Industry Logos */}
            <section className="bg-white pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">

                    <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 md:mb-12">
                        {data.trustedClients?.description || "Transformed legacy systems into AI-first operations across 50+ leading enterprises globally."}
                    </p>

                    <div className="relative overflow-hidden">
                        <div className="flex w-max gap-8 sm:gap-12 md:gap-16 items-center animate-marquee">

                            {/* first set */}
                            {(data.trustedClients?.logos || []).map((logo: string, i: number) => (
                                <img
                                    key={i}
                                    src={logo}
                                    alt={`Client Logo ${i + 1}`}
                                    className="h-8 sm:h-12 md:h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                />
                            ))}

                            {/* duplicate set for infinite loop */}
                            {(data.trustedClients?.logos || []).map((logo: string, i: number) => (
                                <img
                                    key={"dup-" + i}
                                    src={logo}
                                    alt={`Client Logo ${i + 1}`}
                                    className="h-8 sm:h-12 md:h-16 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                />
                            ))}

                        </div>
                    </div>

                </div>
            </section>

            {/* How It Works */}
            <HowItWorks2 data={data.howItWorks} />

            {/* Intelligence Layer */}
            <IntelligenceLayer data={data.intelligenceLayer} />

            {/* 4. REAL WORLD USE CASES - REDESIGNED */}
            <section className="py-20 overflow-hidden bg-white">
                <div className="container mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center max-w-4xl mb-16 flex flex-col items-center mx-auto">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl text-gray-700 "
                        >
                            {data.useCases?.sectionTitle} <br />
                            <span className="text-primary font-semibold">{data.useCases?.sectionTitleHighlight}</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-12 gap-6">
                        {(data.useCases?.cards || []).map((card: any, idx: number) => {
                            const isWide = idx === 0 || idx === (data.useCases?.cards?.length || 0) - 1;
                            if (isWide) {
                                return (
                                    <div key={card.id || idx} className="col-span-12 group/card-img">
                                        <div className="bg-white h-full rounded-[40px] border border-gray-200 px-4 md:px-6 pt-4 grid grid-cols-12 md:gap-8 gap-y-6 md:gap-y-2 overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                                            <aside className={`py-6 col-span-12 flex flex-col justify-center space-y-5 md:col-span-5 lg:col-span-4 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                                <div className="space-y-4">
                                                    <div>
                                                        {card.title && (
                                                            <div className="inline-flex items-center bg-primary/10 text-primary font-medium text-sm px-3 py-1 rounded-full mb-3">
                                                                {card.title}
                                                            </div>
                                                        )}
                                                        <h3 className="text-2xl font-bold text-gray-600 leading-tight">{card.subtitle}</h3>
                                                    </div>
                                                    <p className="text-gray-500 leading-relaxed text-base">
                                                        {card.description}
                                                    </p>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <div className="text-lg font-bold text-accent">Outcome</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(card.outcomes || []).map((val: string, vIdx: number) => (
                                                                    <span key={vIdx} className="px-3 py-1 rounded-full bg-accent border-2 border-accent text-white font-semibold text-sm">
                                                                        {val}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </aside>
                                            <figure className={`max-w-[905px] w-full mx-auto col-span-12 rounded-t-[32px] overflow-hidden md:col-span-7 lg:col-span-8 bg-gray-100 group-hover/card-img:scale-105 transition-transform duration-700 ease-in-out ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                                {card.imageUrl && (
                                                    <img
                                                        src={card.imageUrl}
                                                        alt={card.title}
                                                        className="w-full h-full object-cover shadow-2xl"
                                                    />
                                                )}
                                            </figure>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={card.id || idx} className="col-span-12 lg:col-span-6 group/card-img">
                                        <div className="bg-white h-full rounded-[32px] border border-gray-200 p-4 md:p-6 grid grid-cols-12 md:gap-4 gap-y-6 md:gap-y-12 overflow-hidden hover:shadow-xl transition-all duration-500">
                                            <aside className={`py-4 col-span-12 flex flex-col justify-center space-y-4 md:col-span-6 ${idx % 2 !== 0 ? 'order-none md:order-1' : ''}`}>
                                                <div className="space-y-4">
                                                    <div>
                                                        {card.title && (
                                                            <div className="inline-flex items-center bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                                                                {card.title}
                                                            </div>
                                                        )}
                                                        <h3 className="text-2xl font-bold text-gray-600">{card.subtitle}</h3>
                                                    </div>
                                                    <p className="text-gray-500 leading-relaxed text-base">
                                                        {card.description}
                                                    </p>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <div className="text-lg font-bold text-accent">Outcome</div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {(card.outcomes || []).map((val: string, vIdx: number) => (
                                                                    <span key={vIdx} className="px-3 py-1 rounded-full bg-accent border-2 border-accent text-white font-semibold text-sm">
                                                                        {val}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </aside>
                                            <figure className={`h-[250px] md:h-[300px] lg:h-full w-full mx-auto col-span-12 rounded-2xl overflow-hidden md:col-span-6 bg-gray-100 group-hover/card-img:scale-105 transition-transform duration-700 ${idx % 2 !== 0 ? 'order-none md:order-2' : ''}`}>
                                                {card.imageUrl && (
                                                    <img
                                                        src={card.imageUrl}
                                                        alt={card.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </figure>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="flex justify-center mt-16">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            onClick={() => router.push('/get-demo')}
                            className="py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-xs sm:text-base hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto"
                        >
                            Talk to an Expert <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* 5. MEASURABLE IMPACT - REDESIGNED */}
            <section className="py-16 md:py-20 bg-white relative overflow-hidden">
                <div className="container max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <div className="text-center mb-12 md:mb-16 flex flex-col items-center">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl text-gray-900 "
                        >
                            {data.measurableImpact?.sectionTitle} <br />
                            <span className="text-primary font-semibold">{data.measurableImpact?.sectionTitleHighlight}</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(data.measurableImpact?.stats || []).map((stat: any, i: number) => {
                            const statIcons = [TrendingDown, Activity, Zap, Clock];
                            const Icon = statIcons[i % statIcons.length];
                            const match = String(stat.value).match(/[\d.]+/);
                            const hasNumber = !!match;
                            const num = match ? parseInt(match[0], 10) : 0;
                            const sym = match ? String(stat.value).slice((match.index || 0) + match[0].length) : "";

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative group p-8 rounded-[32px] bg-gray-100 border border-gray-100 hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                                >
                                    <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center shadow-sm transition-all duration-500 bg-white border border-gray-100 text-gray-400 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-accent/20">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="text-5xl font-semibold text-primary flex items-baseline gap-1">
                                            {hasNumber && <Counter target={num} />}
                                            <span className="text-2xl font-bold text-accent transition-transform duration-500 group-hover:-translate-y-1">{hasNumber ? sym : stat.value}</span>
                                        </div>
                                        <div className="font-bold text-gray-600 text-lg group-hover:text-primary transition-colors">{stat.label}</div>
                                        <p className="text-gray-500 text-sm leading-relaxed">{stat.description}</p>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6. SECURITY & COMPLIANCE - REDESIGNED */}
            <section className="py-16 md:py-24 overflow-hidden bg-white">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="flex-1 w-full">
                            <div className="text-left mb-12">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-3xl md:text-5xl text-gray-900  font-semibold mb-6"
                                >
                                    {data.securityCompliance?.sectionTitle} <br />
                                    <span className="text-primary font-semibold">{data.securityCompliance?.sectionTitleHighlight}</span>
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
                                >
                                    {data.securityCompliance?.description}
                                </motion.p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {(data.securityCompliance?.features || []).map((item: any, i: number) => {
                                    const featureIcons = [ShieldCheck, Lock, Award, Activity, Globe];
                                    const Icon = featureIcons[i % featureIcons.length];
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className="flex gap-5"
                                        >
                                            <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mt-1">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="font-bold text-gray-600">{item.title}</div>
                                                <div className="text-sm text-gray-500">{item.description}</div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex-1 relative w-full lg:max-w-lg">
                            <div className="absolute -inset-10 bg-primary/10 blur-3xl rounded-full opacity-50" />
                            <div className="relative grid grid-cols-2 gap-4 md:gap-6">
                                {(data.securityCompliance?.gridItems || []).map((gridItem: any, i: number) => {
                                    const gridVisuals = [
                                        { icon: ShieldCheck, color: "bg-primary", duration: 3, delay: 0 },
                                        { icon: Lock, color: "bg-accent", duration: 4, delay: 0.5 },
                                        { icon: Server, color: "bg-accent", duration: 3.5, delay: 0.2 },
                                        { icon: Shield, color: "bg-primary", duration: 4.5, delay: 1 },
                                    ];
                                    const visual = gridVisuals[i % gridVisuals.length];
                                    const Icon = visual.icon;

                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                                y: [0, -15, 0], // Floating motion
                                            }}
                                            viewport={{ once: true }}
                                            animate={{
                                                y: [0, -12, 0],
                                            }}
                                            transition={{
                                                delay: i * 0.1,
                                                y: {
                                                    duration: visual.duration,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: visual.delay
                                                }
                                            }}
                                            className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center gap-4 group hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-500"
                                        >
                                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform ${visual.color}`}>
                                                <Icon className="w-7 h-7 md:w-8 md:h-8" />
                                            </div>
                                            <span className="font-bold text-gray-900">{gridItem.title}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialV3 />

            {/* FAQ */}
            <PlatformIndustryFAQ scopeKey={slug} />

            {/* 7. CTA - MODERN CINEMATIC */}
            <section className="bg-white">
                <div className="bg-primary rounded-t-[40px] p-12 md:p-18 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            {data.cta?.title || "Ready to scale your"}{" "}{data.cta?.titleHighlight || "voice strategy?"}
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <button
                                onClick={() => router.push("/get-demo")}
                                className="w-full sm:w-auto py-2 sm:py-3 px-4 sm:px-5 bg-accent text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-4 transition-all shadow-xl hover:-translate-y-1 cursor-pointer">
                                Get Started Now
                                <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <LandingPageFooter />
        </div >
    );
}

export default function PlatformDetailClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <PlatformDetailContent />
        </Suspense>
    );
}

function Counter({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = target;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, isInView]);

    return <span ref={ref}>{count}</span>;
}
