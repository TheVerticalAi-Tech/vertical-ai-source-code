"use client";


import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useSpring, useTransform, useScroll, AnimatePresence, useMotionValue } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/landing-page/header";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import OtherFeatures from "@/components/landing-page/other-features";
import { ArrowRight, ArrowLeft, Cloud, Mic, ShieldCheck, BarChart3, Headset, Settings, Shield, Lock, FileText, Users, TrendingDown, TrendingUp, CheckCircle2, Clock, UserCheck, Database, Zap, Sparkles, Search, Layers, Server, Activity, PhoneCall, ShieldAlert, Play, Pause, ArrowUpRight } from "lucide-react";
import iconLogo from "@/assets/icon-logo.png"
import PlatformIndustryFAQ from "@/components/landing-page/platform-industry-faq";
import TestimonialV3 from "@/components/landing-page/testimonial-v3";
import IndustryUseCases from "@/components/landing-page/industry-use-cases";
import IndustryVerticalProduct from "@/components/landing-page/industry-vertical-product";




function TransformationFunnel({ data }: { data?: any }) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const progress = scrollYProgress;

    const funnelScale = useTransform(progress, [0, 0.2], [0.9, 1]);
    const funnelOpacity = useTransform(progress, [0, 0.1, 1], [0, 1, 1]);

    const itemIcons = [Users, ShieldAlert, Clock, Layers, TrendingDown];
    const agentIcons = [Mic, ShieldCheck, BarChart3, Headset];
    const outcomeIcons = [Zap, ShieldCheck, Sparkles, Database, TrendingUp];

    const items = data?.items || [];
    const outcomes = data?.outcomes || [];

    return (
        <section ref={sectionRef} className="hidden md:block h-[400vh] relative bg-white text-black overflow-clip">

            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center container mx-auto max-w-7xl">

                {/* --- 2. THE CORE ARCHITECTURE VISUAL --- */}
                <motion.div
                    style={{ scale: funnelScale, opacity: funnelOpacity }}
                    className="relative w-full h-[650px] flex items-center justify-between pointer-events-none mt-20"
                >

                    {/* LEFT: Legacy Sources (Light Glass Cards) */}
                    <div className="hidden lg:flex flex-col gap-4 relative z-10 w-72">
                        <div className="text-center mb-2">
                            <span className="text-lg font-bold  text-gray-400">Before Vertical</span>
                        </div>
                        {items.map((item: string, i: number) => {
                            const yTranslate = useTransform(progress, [0.1 + i * 0.04, 0.2 + i * 0.04], [30, 0]);
                            const op = useTransform(progress, [0.1 + i * 0.04, 0.2 + i * 0.04], [0, 1]);
                            const Icon = itemIcons[i % itemIcons.length];

                            return (
                                <motion.div
                                    key={i}
                                    style={{ y: yTranslate, opacity: op }}
                                    className="flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center border border-slate-100 relative z-10">
                                        <Icon className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="font-bold text-gray-700 tracking-tight text-lg">{item}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CENTER: The Intelligent Hub (Advanced Orbital Engine) */}
                    <div className="relative flex-1 flex items-center justify-center scale-[0.65] md:scale-125">

                        {/* Complex SVG Overlays */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[500px] h-[500px] border border-primary/10 rounded-full opacity-40"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[400px] h-[400px] border border-dashed border-primary/20 rounded-full opacity-60"
                            />
                        </div>

                        {/* The Heart of the AI (Light Core) */}
                        <div className="relative z-10 w-40 h-60 rounded-[3rem] bg-white border border-slate-100 flex items-center justify-center shadow-[0_20px_60px_rgba(114,93,232,0.15)] overflow-hidden group">
                            <motion.div
                                animate={{ opacity: [0.05, 0.1, 0.05] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-primary/30 p-20 blur-3xl animate-pulse"
                            />

                            <div className="relative z-20 flex flex-col items-center">
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-[0_10px_30px_rgba(114,93,232,0.4)] border-2 border-white/20">
                                        <img src={iconLogo.src} alt="The Vertical AI" className="w-12 h-12 object-contain" />
                                    </div>
                                </motion.div>
                                <span className="mt-4 text-base font-bold text-gray-900 leading-none">THE VERTICAL AI</span>
                                <div className="mt-2 flex gap-1">
                                    <div className="w-1 h-1 bg-primary rounded-full animate-ping" />
                                    <div className="w-1 h-1 bg-primary rounded-full animate-ping delay-150" />
                                    <div className="w-1 h-1 bg-primary rounded-full animate-ping delay-300" />
                                </div>
                            </div>

                            {/* Scanning Interface */}
                            <motion.div
                                animate={{ left: ["-10%", "110%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-0 bottom-0 w-8 bg-primary/5 blur-xl z-10"
                            />
                        </div>

                        {/* Floating Agents Layer */}
                        <AnimatePresence>
                            {["Vocalis", "Guardian", "Insights", "Conversa"].map((agent: string, i: number) => {
                                const angle = (i * 90) * (Math.PI / 180);
                                const radius = 180;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;

                                const op = useTransform(progress, [0.4, 0.55], [0, 1]);
                                const sc = useTransform(progress, [0.4, 0.55], [0.6, 1]);
                                const Icon = agentIcons[i % agentIcons.length];

                                return (
                                    <motion.div
                                        key={agent}
                                        style={{ x, y, opacity: op, scale: sc, left: '50%', top: '50%', marginLeft: -45, marginTop: -20 }}
                                        className="absolute px-4 py-2 bg-white border border-primary/20 rounded-full shadow-[0_5px_15px_rgba(114,93,232,0.1)] flex items-center gap-2"
                                    >
                                        <Icon size={14} className="text-primary" />
                                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-tighter">{agent}</span>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Data Streams (SVG) - Precise Wired Aesthetic */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 800 600">
                            <defs>
                                <linearGradient id="stream-primary-left" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#725de8" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="#725de8" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#725de8" stopOpacity="0" />
                                </linearGradient>
                                <linearGradient id="stream-primary" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#725de8" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#725de8" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#725de8" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>

                            {/* Left to Center Data Packets */}
                            {[80, 190, 300, 410, 520].map((y, i) => (
                                <motion.path
                                    key={`flow-l-${i}`}
                                    d={`M 0 ${y} C 200 ${y}, 350 300, 400 300`}
                                    fill="none"
                                    stroke="url(#stream-primary-left)"
                                    strokeWidth="2"
                                    strokeDasharray="10 5"
                                    style={{
                                        pathLength: useTransform(progress, [0.15, 0.4], [0, 1]),
                                        opacity: useTransform(progress, [0.15, 0.3], [0, 0.8])
                                    }}
                                />
                            ))}

                            {/* Center to Right Outbound Streams */}
                            {[80, 190, 300, 410, 520].map((y, i) => (
                                <motion.path
                                    key={`flow-r-${i}`}
                                    d={`M 400 300 C 450 300, 600 ${y}, 800 ${y}`}
                                    fill="none"
                                    stroke="url(#stream-primary)"
                                    strokeWidth="2"
                                    strokeDasharray="10 5"
                                    style={{
                                        pathLength: useTransform(progress, [0.55, 0.8], [0, 1]),
                                        opacity: useTransform(progress, [0.55, 0.65], [0, 0.8])
                                    }}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* RIGHT: Outcomes (Light Glass Cards) */}
                    <div className="hidden lg:flex flex-col gap-4 relative z-10 w-72">
                        <div className="text-center mb-2">
                            <span className="text-lg font-bold  text-primary">After The Vertical AI</span>
                        </div>
                        {outcomes.map((item: string, i: number) => {
                            const xTranslate = useTransform(progress, [0.6 + i * 0.04, 0.75 + i * 0.04], [30, 0]);
                            const op = useTransform(progress, [0.6 + i * 0.04, 0.75 + i * 0.04], [0, 1]);
                            const Icon = outcomeIcons[i % outcomeIcons.length];

                            return (
                                <motion.div
                                    key={i}
                                    style={{ x: xTranslate, opacity: op }}
                                    className="flex items-center gap-4 bg-white border-2 border-primary/10 p-4 rounded-3xl shadow-[0_15px_40px_rgba(114,93,232,0.1)] relative overflow-hidden group"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg relative z-10">
                                        <Icon className="text-white" size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="font-bold text-primary tracking-tight text-lg leading-tight">{item}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

export default function IndustryDetailClient() {
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    const [pageData, setPageData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIndustryData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/industries`);
                const json = await response.json();
                const industries = Array.isArray(json?.industries) ? json.industries : [];
                const row = industries.find((i: any) => i.slug === slug) || null;

                if (row) {
                    setPageData({
                        industry_name: row.name,
                        hero: {
                            title: row.heroTitle,
                            titleHighlight: row.heroTitleHighlight,
                            description: row.heroDescription,
                            descriptionHighlight: row.heroDescriptionHighlight,
                            image: row.heroImageUrl,
                        },
                        trustedLogos: row.trustedLogos || [],
                        otherFeatures: {
                            title: row.featuresTitle,
                            titleHighlight: row.featuresTitleHighlight,
                            description: row.featuresDescription,
                            features: row.featureCards || [],
                        },
                        transformationFunnel: {
                            items: row.transformationLegacy || [],
                            outcomes: row.transformationOutcomes || [],
                        },
                        caseStudy: {
                            title: row.caseStudy?.title,
                            titleHighlight: row.caseStudy?.titleHighlight,
                            challenge: row.caseStudy?.challenge,
                            solution: row.caseStudy?.solution,
                            image: row.caseStudy?.image || row.caseStudy?.imageUrl,
                            results: row.caseStudy?.results || row.caseStudy?.bulletResults || [],
                        },
                        verticalProduct: {
                            title: row.pillarsTitle,
                            titleHighlight: row.pillarsTitleHighlight,
                            subtitle: row.pillarsSubtitle,
                            pillars: row.productPillars || [],
                        },
                        agentMapping: {
                            title: row.agentsTitle,
                            titleHighlight: row.agentsTitleHighlight,
                            agents: (row.agentCards || []).map((a: any) => ({
                                title: a.title || a.name,
                                subtitle: a.subtitle || a.tagline,
                                bullets: a.bullets || a.bulletPoints || [],
                                imageUrl: a.imageUrl || a.image,
                            })),
                        },
                        compliance: {
                            title: row.complianceTitle,
                            titleHighlight: row.complianceTitleHighlight,
                            items: (row.complianceCards || []).map((c: any) => ({
                                title: c.title || c.name,
                                desc: c.desc || c.description,
                                tags: c.tags || [c.tag1, c.tag2].filter(Boolean),
                                imageUrl: c.imageUrl || c.image,
                            })),
                        },
                        useCases: (row.useCases || []).map((u: any) => ({
                            id: u.id || u.slug,
                            label: u.label || u.title,
                            tag: u.tag || u.badge,
                            content: u.content || {
                                title: u.content?.title || u.subtitle || u.title,
                                desc: u.content?.desc || u.description,
                                capabilities: u.content?.capabilities || u.capabilities || [],
                                outcomes: u.content?.outcomes || u.outcomes || [],
                            },
                        })),
                        metrics: {
                            title: row.metricsTitle,
                            titleHighlight: row.metricsTitleHighlight,
                            items: (row.metrics || []).map((m: any) => ({
                                prefix: m.prefix,
                                num: m.num ?? m.value,
                                sym: m.sym || m.suffix,
                                label: m.label,
                                desc: m.desc || m.description,
                            })),
                        },
                        finalCta: {
                            title: row.ctaTitle,
                            titleHighlight: row.ctaTitleHighlight,
                        },
                    });
                }
            } catch (error) {
                console.error("Failed to fetch industry data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIndustryData();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-500">Failed to load industry details.</p>
            </div>
        );
    }

    return (
        <div className="bg-white text-black">
            <Header />

            {/* ================= 1️⃣ HERO ================= */}
            <section className="relative overflow-hidden min-h-screen w-full flex flex-col justify-between pt-34 pb-4">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
                        backgroundSize: "120px 120px",
                    }}
                />

                <div className="relative container mx-auto px-6 md:px-12 lg:px-0 max-w-7xl flex-1 flex items-center shrink-0">
                    <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-8 w-full -mt-10">
                        {/* Left Content */}
                        <div className="text-left">

                            {pageData.industry_name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-accent font-bold text-2xl sm:text-3xl mb-2 block"
                                >
                                    {pageData.industry_name}
                                </motion.div>
                            )}

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-2 text-2xl md:text-3xl text-gray-700"
                            >
                                {pageData.hero.title} {""}
                                <span className="text-primary font-semibold">
                                    {pageData.hero.titleHighlight}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 text-lg text-gray-500 max-w-xl"
                            >
                                {pageData.hero.description}
                                <span className="block mt-4 text-gray-900 font-medium">
                                    {pageData.hero.descriptionHighlight}
                                </span>
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 flex flex-wrap gap-4"
                            >
                                <button
                                    onClick={() => router.push("/get-demo")}
                                    className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer">
                                    <span>Talk to an Expert</span>
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Right Video / Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-gray-100 group/video"
                        >
                            {pageData.hero.image && (
                                <Image src={pageData.hero.image} alt="Industry Transformation" fill className="object-cover" />
                            )}
                        </motion.div>
                    </div>
                </div>
                {/* TrustedBy moved inside the Hero section */}
                <div className="relative w-full px-4 md:px-0 z-10 overflow-hidden">
                    <div className="w-full pb-6 pt-8 border-t border-slate-100">
                        <div className="max-w-7xl mx-auto text-left">

                            <p className="text-gray-500 font-medium text-sm lg:text-base mb-6  text-left">
                                Trusted by 50+ Leading Enterprises Globally
                            </p>

                            <div className="relative overflow-hidden max-w-2xl" style={{ maskImage: "linear-gradient(to right, white 80%, transparent)" }}>
                                <div className="flex w-max gap-8 lg:gap-12 items-center justify-start animate-marquee">

                                    {/* Static logos array */}
                                    {(pageData.trustedLogos || []).slice(0, 6).map((logoPath: string, i: number) => (
                                        <img
                                            key={i}
                                            src={logoPath}
                                            alt={`Trusted Client ${i}`}
                                            className="h-8 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        />
                                    ))}

                                    {/* Duplicate logos array for infinite loop */}
                                    {(pageData.trustedLogos || []).slice(0, 6).map((logoPath: string, i: number) => (
                                        <img
                                            key={"dup-" + i}
                                            src={logoPath}
                                            alt={`Trusted Client ${i}`}
                                            className="h-8 md:h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Other Features */}
            <OtherFeatures data={pageData.otherFeatures} />

            {/* Transformation Funnel */}
            <TransformationFunnel data={pageData.transformationFunnel} />

            {/* ================= 4️⃣ USE CASE DEEP DIVE (SUCCESS STORY) ================= */}
            <section className="py-16 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-0 max-w-7xl">

                    {/* Restored Main Header */}
                    <div className="max-w-5xl mb-12 md:mb-20 text-center mx-auto">
                        <h2 className="text-3xl md:text-5xl text-gray-700 ">
                            {pageData.caseStudy.title} <br />
                            <span className="text-primary font-semibold">{pageData.caseStudy.titleHighlight}</span>
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-10 items-stretch">

                        {/* Left Image Display */}
                        <div className="relative w-full h-full min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 bg-gray-100">
                            {pageData.caseStudy.image && (
                                <Image src={pageData.caseStudy.image} className="object-cover hover:scale-105 transition-transform duration-700" alt="Finance Office" fill sizes="(max-width: 1024px) 100vw, 50vw" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />

                            {/* Floating bottom badge */}
                            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 flex items-center justify-between shadow-xl">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm font-bold  mb-1 sm:mb-2 text-left">Case Study Implementation</p>
                                    <p className="text-gray-900 font-bold text-lg sm:text-xl text-left leading-tight">Scale-Ready AI Transformation</p>
                                </div>
                                <div className="w-12 h-12 bg-primary rounded-full hidden sm:flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/30">
                                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="flex flex-col justify-center py-6 lg:py-10 lg:pl-6">

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <TrendingDown className="text-primary w-4 h-4" />
                                        </div>
                                        <span className="text-primary font-bold text-base">The Challenge</span>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed font-medium">
                                        {pageData.caseStudy.challenge}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <Zap className="text-accent w-4 h-4" />
                                        </div>
                                        <span className="text-accent font-bold text-base">The Solution</span>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed font-medium">
                                        {pageData.caseStudy.solution}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                            <CheckCircle2 className="text-green-500 w-4 h-4" />
                                        </div>
                                        <span className="text-green-600 font-bold text-base">Measurable Results</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                        {(pageData.caseStudy.results || []).map((result: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 group">
                                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-slate-100 mt-0.5 group-hover:border-green-200 group-hover:bg-green-50 transition-colors">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-green-500 transition-colors" />
                                                </div>
                                                <span className="text-gray-600 font-medium text-lg leading-tight group-hover:text-gray-900 transition-colors">{result}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => router.push("/get-demo")}
                                className="mt-14 inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black w-max cursor-pointer">
                                <span>Talk to an Expert</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <IndustryVerticalProduct data={pageData.verticalProduct} />

            {/* ================= 5️⃣ AGENT MAPPING ================= */}
            <section className="py-16 md:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-7xl text-center">
                    <div className="max-w-5xl mb-12 md:mb-24 text-center mx-auto">
                        <h2 className="text-3xl md:text-5xl text-gray-700  mb-6">
                            {pageData.agentMapping.title} <br />
                            <span className="text-primary font-semibold">{pageData.agentMapping.titleHighlight}</span>
                        </h2>
                    </div>

                    {(() => {
                        const agents = pageData.agentMapping.agents;
                        if (!agents || agents.length === 0) return null;

                        const agentIcons = [Mic, Settings, BarChart3, ShieldCheck, Headset];
                        const iconBgs = ["bg-primary", "bg-primary", "bg-accent", "bg-accent", "bg-primary"];
                        const cardBgs = ["bg-gray-100", "bg-primary/5", "bg-accent/5", "bg-accent/5", "bg-primary/5"];
                        const heights = ["h-auto md:h-[450px]", "h-auto md:h-[750px]", "h-auto md:h-[600px]", "h-auto md:h-[600px]", "h-auto md:h-[750px]"];

                        const firstAgent = agents[0];
                        const restAgents = agents.slice(1);
                        const col1 = restAgents.filter((_: any, i: number) => i % 2 === 0);
                        const col2 = restAgents.filter((_: any, i: number) => i % 2 === 1);

                        return (
                            <>
                                <div className="mb-12">
                                    <AgentCard
                                        title={firstAgent.title}
                                        subtitle={firstAgent.subtitle}
                                        desc={
                                            <ul className="space-y-4 text-left">
                                                {(firstAgent.bullets || []).map((bullet: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        icon={agentIcons[0]}
                                        iconBg={iconBgs[0]}
                                        cardBg={cardBgs[0]}
                                        imageUrl={firstAgent.imageUrl}
                                        className={heights[0]}
                                        layout="horizontal-reverse"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                    {/* Column 1 */}
                                    <div className="flex flex-col gap-8">
                                        {col1.map((agent: any, idx: number) => {
                                            const originalIdx = 1 + (idx * 2);
                                            return (
                                                <AgentCard
                                                    key={originalIdx}
                                                    title={agent.title}
                                                    subtitle={agent.subtitle}
                                                    desc={
                                                        <ul className="space-y-2 text-left">
                                                            {(agent.bullets || []).map((bullet: string, bIdx: number) => (
                                                                <li key={bIdx} className="flex items-start gap-3">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${iconBgs[originalIdx % iconBgs.length]} mt-2.5 shrink-0`} />
                                                                    <span>{bullet}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                    icon={agentIcons[originalIdx % agentIcons.length]}
                                                    iconBg={iconBgs[originalIdx % iconBgs.length]}
                                                    cardBg={cardBgs[originalIdx % cardBgs.length]}
                                                    imageUrl={agent.imageUrl}
                                                    className={heights[originalIdx % heights.length]}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Column 2 */}
                                    <div className="flex flex-col gap-8">
                                        {col2.map((agent: any, idx: number) => {
                                            const originalIdx = 2 + (idx * 2);
                                            return (
                                                <AgentCard
                                                    key={originalIdx}
                                                    title={agent.title}
                                                    subtitle={agent.subtitle}
                                                    desc={
                                                        <ul className="space-y-2 text-left">
                                                            {(agent.bullets || []).map((bullet: string, bIdx: number) => (
                                                                <li key={bIdx} className="flex items-start gap-3">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${iconBgs[originalIdx % iconBgs.length]} mt-2.5 shrink-0`} />
                                                                    <span>{bullet}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                    icon={agentIcons[originalIdx % agentIcons.length]}
                                                    iconBg={iconBgs[originalIdx % iconBgs.length]}
                                                    cardBg={cardBgs[originalIdx % cardBgs.length]}
                                                    imageUrl={agent.imageUrl}
                                                    className={heights[originalIdx % heights.length]}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        );
                    })()}

                    <div className="flex justify-center mt-16">
                        <motion.button
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onClick={() => router.push('/get-demo')}
                            className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer"
                        >
                            <span>Talk to an Expert</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>



            {/* ================= 6️⃣ COMPLIANCE (Full Width Showcase) ================= */}
            <section className="bg-white overflow-hidden">
                <div className="w-full">
                    <div className="max-w-5xl mx-auto text-center py-16 md:py-20 px-6">
                        <h2 className="text-3xl md:text-5xl text-gray-700 ">
                            {pageData.compliance.title} <br />
                            <span className="text-primary font-semibold">{pageData.compliance.titleHighlight}</span>
                        </h2>
                    </div>

                    <GovernanceShowcase data={pageData.compliance.items} />

                    <div className="flex justify-center mt-16 mb-24">
                        <motion.button
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onClick={() => router.push('/get-demo')}
                            className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer"
                        >
                            <span>Talk to an Expert</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>

            <IndustryUseCases data={pageData.useCases} />

            {/* ================= 7️⃣ METRICS - REDESIGNED ================= */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center max-w-5xl mb-12 md:mb-16 flex flex-col items-center mx-auto">

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl text-gray-700 "
                        >
                            {pageData.metrics.title} <br />
                            <span className="text-primary font-semibold">{pageData.metrics.titleHighlight}</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {(pageData.metrics.items || []).map((stat: any, i: number) => {
                            const statIcons = [TrendingDown, Activity, ShieldAlert, ShieldCheck];
                            const Icon = statIcons[i % statIcons.length];

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative group p-6 rounded-2xl bg-primary/10 border border-slate-100 hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
                                >
                                    <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center shadow-sm transition-all duration-500 bg-white border border-slate-100 text-gray-400 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-accent/20">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-4xl font-semibold text-primary flex items-baseline gap-1 tabular-nums flex-wrap">
                                            {stat.prefix && <span className="text-lg font-bold text-accent">{stat.prefix}</span>}
                                            {typeof stat.num === 'string' && isNaN(Number(stat.num)) ? (
                                                <span className="text-2xl font-bold">{stat.num}</span>
                                            ) : (
                                                <AnimatedNumber value={stat.num} />
                                            )}
                                            {stat.sym && <span className="text-lg font-bold text-accent">{stat.sym}</span>}
                                        </div>
                                        <div className="font-bold text-gray-600 text-base group-hover:text-primary transition-colors leading-tight">{stat.label}</div>
                                        <p className="text-gray-400 text-xs leading-relaxed">{stat.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center mt-16">
                        <motion.button
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            onClick={() => router.push('/get-demo')}
                            className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black"
                        >
                            <span>Talk to an Expert</span>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <TestimonialV3 />

            {/* FAQ */}
            <PlatformIndustryFAQ scopeKey={slug} />

            {/* ================= 8️⃣ FINAL CTA - MODERN CINEMATIC ================= */}
            <section className="bg-white">
                <div className="bg-primary rounded-3xl rounded-t-[40px] px-6 py-12 md:p-18 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8 md:space-y-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                            {pageData.finalCta.title} <br />
                            {pageData.finalCta.titleHighlight}
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 md:pt-6">
                            <button
                                onClick={() => router.push('/get-demo')}
                                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-accent text-white rounded-2xl font-bold text-base md:text-xl flex items-center justify-center gap-4 transition-all shadow-xl hover:-translate-y-1">
                                Talk to our Experts
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <button
                                onClick={() => router.push('/get-demo')}
                                className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-white border border-white/20 rounded-2xl font-bold text-base md:text-xl transition-all backdrop-blur-md">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <LandingPageFooter />
        </div>
    );
}


function AgentCard({ title, subtitle, desc, icon: Icon, iconBg, cardBg, imageUrl, className = "", layout = "vertical" }: any) {
    const isReverse = layout === 'horizontal-reverse';

    return (
        <div className={`relative ${cardBg} rounded-[32px] border border-transparent hover:border-slate-100 flex transition-all duration-300 group overflow-hidden ${layout === 'vertical' ? 'flex-col' : `flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'}`} ${className}`}>
            {/* Card Content Area */}
            <div className={`p-6 md:p-8 text-left ${layout === 'vertical' ? 'w-full' : 'w-full md:w-1/2'} flex flex-col justify-center`}>
                <div className="flex flex-col mb-4">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-lg shadow-primary/10 shrink-0`}>
                            <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 tracking-tight leading-tight">{title}</h3>
                            {subtitle && (
                                <p className="text-primary font-bold text-xs md:text-sm  mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-gray-500 leading-relaxed max-w-[420px] text-lg">
                    {desc}
                </div>
            </div>

            {/* Card Visual Area */}
            <div className={`relative flex-grow px-4 sm:px-6 pb-6 ${layout === 'vertical' ? 'w-full' : 'w-full md:w-1/2 flex items-center justify-center p-8'}`}>
                <div className="relative w-full h-full sm:min-h-[300px] rounded-2xl overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100">
                    {/* Mobile: standard img tag to dynamically fit container height to image height */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-auto object-contain sm:hidden"
                    />
                    {/* Desktop: Next.js Image with fill */}
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="hidden sm:block object-contain sm:object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 800px"
                    />
                </div>
            </div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity group-hover:opacity-[0.05]" />
        </div>
    );
}

function GovernanceShowcase({ data }: { data?: any }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const governanceItems = data || [];

    return (
        <div className="relative w-full h-auto md:h-[500px] overflow-hidden flex flex-col md:flex-row group bg-black">
            {/* Background Images Layer */}
            {governanceItems.map((item: any, idx: number) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover scale-105"
                        priority={idx === 0}
                    />
                    {/* Dark Unified Overlay with slight global wash */}
                    <div className="absolute inset-0 bg-black/60 md:bg-black/40 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
            ))}

            {/* Content Panels Container */}
            <div className="relative z-10 flex flex-col md:flex-row w-full h-full divide-y md:divide-y-0 md:divide-x divide-white/10">
                {governanceItems.map((item: any, idx: number) => (
                    <div
                        key={idx}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => setActiveIndex(idx)}
                        className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-start md:justify-end cursor-pointer group/panel relative overflow-hidden`}
                    >
                        {/* Content Box with Dynamic BG Height */}
                        <div className={`p-8 md:p-10 transition-all duration-500 relative z-10 h-full flex flex-col justify-center md:justify-end ${activeIndex === idx ? 'bg-white/10 backdrop-blur-md' : 'bg-black/40 md:bg-transparent hover:bg-white/5'}`}>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {(item.tags || []).map((tag: string) => (
                                    <span key={tag} className="px-3 py-1 md:px-4 md:py-1 rounded-full border border-white/30 text-[10px] font-bold text-white backdrop-blur-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                                {item.title}
                            </h3>

                            {/* Animated Separator Line */}
                            <div className="w-16 h-[1px] bg-white/40 mb-4 transition-all duration-500 group-hover/panel:w-full" />

                            {/* Description - Always visible on mobile, toggle on desktop */}
                            <div className={`overflow-hidden transition-all duration-500 h-auto opacity-100 ${activeIndex === idx ? 'md:h-auto md:opacity-100 mb-0' : 'md:h-0 md:opacity-0 mb-0'}`}>
                                <p className="text-white/80 md:text-white/70 text-sm md:text-base leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>

                        {/* Subtle Panel Hover Overlay for inactive states */}
                        <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover/panel:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block ${activeIndex === idx ? 'md:hidden' : ''}`} />
                    </div>
                ))}
            </div>

            {/* Grainy Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
}

function AnimatedNumber({ value }: { value: string | number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const stringValue = String(value);

    // Extract numeric part and symbols (e.g., "↓40%" -> "40")
    const numericMatch = stringValue.match(/[\d.]+/);
    const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;

    // Extract prefix and suffix
    const prefix = stringValue.split(numericMatch?.[0] || "")[0] || "";
    const suffix = stringValue.split(numericMatch?.[0] || "")[1] || "";

    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { stiffness: 45, damping: 20 });
    const [displayValue, setDisplayValue] = useState(prefix + "0" + suffix);

    useEffect(() => {
        if (isInView) {
            motionValue.set(targetNumber);
        }
    }, [isInView, targetNumber, motionValue]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            const decimalPlaces = targetNumber % 1 !== 0 ? (targetNumber.toString().split('.')[1]?.length || 0) : 0;
            setDisplayValue(prefix + latest.toFixed(decimalPlaces) + suffix);
        });
    }, [spring, prefix, suffix, targetNumber]);

    return <motion.span ref={ref}>{displayValue}</motion.span>;
}
