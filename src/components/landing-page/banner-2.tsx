"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import iconLogo from '@/assets/icon-logo.png';
import Header from './header';



// ── Intro Overlay ────────────────────────────────────────────────
function IntroOverlay({ onComplete }: { onComplete: () => void }) {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const exit = setTimeout(() => setAnimationStep(1), 1200);
        const done = setTimeout(() => onComplete(), 2200);
        return () => { clearTimeout(exit); clearTimeout(done); };
    }, [onComplete]);

    const letterVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: [0, 1, 0, 1, 0, 1],
            transition: { duration: 0.8, times: [0, 0.1, 0.2, 0.3, 0.5, 1], ease: "linear" as const },
        },
        exit: {
            y: -100,
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
        },
    };

    const containerVariants = {
        visible: { transition: { staggerChildren: 0.05 } },
        exit: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <motion.div
                className="text-5xl md:text-7xl font-bold tracking-widest text-black"
                variants={containerVariants}
                initial="hidden"
                animate={animationStep === 0 ? "visible" : "exit"}
            >
                {"THE VERTICAL AI".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariants}
                        className="inline-block"
                        style={{ textShadow: "0 0 10px rgba(0,0,0,0.1)" }}
                    >
                        {char === " " ? "\u00a0" : char}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}

// ── Main Component ───────────────────────────────────────────────
export default function Banner2() {
    const [showIntro, setShowIntro] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);

    const handleIntroComplete = () => {
        setShowIntro(false);
        setTimeout(() => setHeaderVisible(true), 200);
    };

    const videoRef = useRef<HTMLVideoElement>(null);

    const logos = [
        { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", name: "Logo 1" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", name: "Logo 2" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", name: "Logo 3" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg", name: "Logo 4" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", name: "Logo 5" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg", name: "Logo 6" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg", name: "Logo 7" },
        { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg", name: "Logo 8" },
    ];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Autoplay missed:", error);
            });
        }
    }, []);

    return (
        <div className="min-h-screen text-gray-900 overflow-hidden relative">

            {/* ── Intro Overlay ── */}
            <AnimatePresence mode="wait">
                {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
            </AnimatePresence>

            {/* ── Header 2 (Includes Intro Overlay) ── */}
            <Header visible={headerVisible} />

            {/* Spacer for pill header */}
            <div className="h-10" />

            {/* ── Main Hero Content ── */}
            <main className="relative z-10 pt-5 pb-18 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">

                        <h1 className="text-3xl lg:text-4xl  leading-tight text-gray-600">
                            We Add an <span className='font-bold text-black'>AI Brain</span> to Your <span className='font-bold text-primary'>Existing Business.</span>
                        </h1>

                        <p className="text-gray-600 text-lg max-w-xl">
                            Seamlessly integrate intelligent automation to orchestrate workflows, optimize decisions, and drive business growth.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <button className="relative overflow-hidden inline-flex items-center gap-2 px-10 py-5 bg-primary text-white font-semibold rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group">
                                <span className="relative z-10 flex items-center gap-2">
                                    Get a Demo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                {/* Shining Effect */}
                                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-45 animate-shine pointer-events-none" />
                            </button>

                            <button className="inline-flex items-center gap-6 px-8 py-3 border-2 border-accent text-accent font-bold rounded-2xl hover:bg-accent/5 transition-all group">
                                <span className="text-lg">View Insights</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        {/* Logo Slider */}
                        <div className="pt-8">
                            <p className="text-sm font-medium text-gray-400 mb-6">
                                Transformed legacy systems into AI-first operations across 50+ leading enterprises globally.
                            </p>
                            <div className="relative overflow-hidden w-full group">
                                <div className="flex w-max gap-8 items-center animate-marquee whitespace-nowrap">
                                    {/* first set */}
                                    {logos.map((logo, i) => (
                                        <img
                                            key={i}
                                            src={logo.src}
                                            alt={logo.name}
                                            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        />
                                    ))}
                                    {/* duplicate set for infinite loop */}
                                    {logos.map((logo, i) => (
                                        <img
                                            key={"dup-" + i}
                                            src={logo.src}
                                            alt={logo.name}
                                            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                        />
                                    ))}
                                </div>
                                {/* Gradient fade effect */}
                                <div className="absolute inset-y-0 -left-2 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
                                <div className="absolute inset-y-0 -right-2 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - AI Diagram */}
                    <div className="relative flex items-center justify-center min-h-[600px] w-full">

                        {/* SVG connection lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="lineGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
                                    <stop offset="0%" stopColor="#086C9E" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#086C9E" stopOpacity="0.2" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="1" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>
                            {/* Top */}
                            <path d="M 50 42 L 50 18" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 50 42 L 50 18" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                            {/* Top-left */}
                            <path d="M 42 46 L 36 46 Q 32 46 32 42 L 32 34 Q 32 30 28 30" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 42 46 L 36 46 Q 32 46 32 42 L 32 34 Q 32 30 28 30" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                            {/* Bottom-left */}
                            <path d="M 42 54 L 36 54 Q 32 54 32 58 L 32 66 Q 32 70 28 70" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 42 54 L 36 54 Q 32 54 32 58 L 32 66 Q 32 70 28 70" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                            {/* Top-right */}
                            <path d="M 58 46 L 64 46 Q 68 46 68 42 L 68 34 Q 68 30 72 30" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 58 46 L 64 46 Q 68 46 68 42 L 68 34 Q 68 30 72 30" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                            {/* Bottom-right */}
                            <path d="M 58 54 L 64 54 Q 68 54 68 58 L 68 66 Q 68 70 72 70" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 58 54 L 64 54 Q 68 54 68 58 L 68 66 Q 68 70 72 70" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                            {/* Bottom */}
                            <path d="M 50 58 L 50 82" stroke="#086C9E" strokeWidth="1" fill="none" className="opacity-20" />
                            <path d="M 50 58 L 50 82" stroke="#086C9E" strokeWidth="1" fill="none" strokeDasharray="10 30" className="opacity-80 animate-flow" />
                        </svg>

                        {/* Central AI Box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-primary/40 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(1,119,255,0.2)] z-20">
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                            <img src={iconLogo.src} alt="AI Icon" className="w-32 h-32 object-contain drop-shadow-[0_0_8px_rgba(1,119,255,0.3)]" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-2 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-2 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                            <div className="absolute left-0 top-[30%] -translate-x-1/2 w-2 h-6 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                            <div className="absolute left-0 bottom-[30%] -translate-x-1/2 w-2 h-6 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                            <div className="absolute right-0 top-[30%] translate-x-1/2 w-2 h-6 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                            <div className="absolute right-0 bottom-[30%] translate-x-1/2 w-2 h-6 bg-primary rounded-full shadow-[0_0_6px_rgba(1,119,255,0.8)]" />
                        </div>

                        {/* Surrounding pill nodes */}
                        {[
                            { label: "No Replacement", pos: "top-[10%] left-1/2 -translate-x-1/2", dot: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", delay: "0s" },
                            { label: "Layer Integration", pos: "top-[26%] left-[14%] -translate-x-1/2", dot: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", delay: "0.2s" },
                            { label: "Legacy Modernization", pos: "bottom-[26%] left-[12%] -translate-x-1/2", dot: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", delay: "0.4s" },
                            { label: "The Vertical AI Agents", pos: "top-[26%] right-[14%] translate-x-1/2", dot: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", delay: "0.6s" },
                            { label: "Measurable Impact", pos: "bottom-[26%] right-[14%] translate-x-1/2", dot: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", delay: "0.8s" },
                            { label: "Frictionless Scaling", pos: "bottom-[10%] left-1/2 -translate-x-1/2", dot: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", delay: "1s" },
                        ].map(({ label, pos, dot, delay }) => (
                            <div key={label} className={`absolute ${pos} z-20`}>
                                <div
                                    className="px-6 py-3 rounded-full bg-white/90 border border-primary/40 backdrop-blur-md shadow-[0_0_12px_-4px_rgba(1,119,255,0.2)] hover:scale-105 transition-transform cursor-default group animate-pill-pulse relative"
                                    style={{ animationDelay: delay }}
                                >
                                    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap group-hover:text-primary transition-colors">{label}</span>
                                    <div className={`absolute ${dot} w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_4px_rgba(1,119,255,0.6)]`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <style jsx>{`
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }

  @keyframes flow {
    to { stroke-dashoffset: -40; }
  }
  .animate-flow {
    animation: flow 1.5s linear infinite;
  }

  @keyframes pill-pulse {
    0%, 100% {
      box-shadow: 0 0 12px -4px rgba(11, 25, 155, 0.25);
      border-color: rgba(11, 25, 155, 0.35);
    }
    50% {
      box-shadow: 0 0 25px -2px rgba(11, 25, 155, 0.55);
      border-color: rgba(11, 25, 155, 0.7);
    }
  }

  .animate-pill-pulse {
    animation: pill-pulse 3s ease-in-out infinite;
  }

  @keyframes shine {
    0% { transform: translateX(-200%) skewX(-45deg); }
    100% { transform: translateX(300%) skewX(-45deg); }
  }

  .animate-shine {
    animation: shine 3s infinite;
  }
`}</style>
        </div>
    );
}