"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import iconLogo from '@/assets/icon-logo.png';
import Header from './header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



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
export default function AnimationBanner() {
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

    // GSAP Scroll Physics
    const containerRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    // Initialize ScrollTrigger Timeline
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !heroContentRef.current || !videoContainerRef.current) return;

        let ctx = gsap.context(() => {
            // Build the scroll sequence timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // When top of component hits top of viewport
                    end: "+=375%", // Extended proportionately to accommodate the new pause duration
                    pin: true, // Native GSAP pinning wrapper
                    scrub: 1.2, // Tuned down inertia slightly for responsiveness
                }
            });

            // 2. Expand video container to full screen bounds
            tl.fromTo(videoContainerRef.current,
                {
                    width: "clamp(240px, 20vw, 360px)",
                    height: "clamp(135px, 11.25vw, 200px)",
                    top: "12%",
                    right: "4%",
                    borderRadius: "24px",
                },
                {
                    width: "100%",
                    height: "100%",
                    top: "0%",
                    right: "0%",
                    borderRadius: "0px",
                    duration: 1,
                    ease: "none"
                }, 0);

            // 3. Hold Empty Screen (The "Leave some space" pause)
            // Stalls the timeline for 50% extra duration before unpinning the section natively
            tl.to({}, { duration: 0.5 });

        }, containerRef); // Scoped clean up

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={containerRef} className="relative w-full h-screen bg-white text-gray-900 overflow-hidden z-10">

                {/* ── Intro Overlay ── */}
                <AnimatePresence mode="wait">
                    {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
                </AnimatePresence>

                {/* Header Layer */}
                <div className="absolute top-0 w-full z-50">
                    <Header visible={headerVisible} />
                </div>

                {/* ── Main Hero Content Left & Right Panes ── */}
                <main
                    ref={heroContentRef}
                    className="absolute top-0 left-0 w-full h-full z-10 pt-24 pb-12"
                >
                    <div className="max-w-7xl mx-auto px-6 h-full grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className="space-y-8 max-w-2xl relative z-10 w-full">
                            <h1 className="text-3xl lg:text-4xl leading-tight text-gray-600">
                                Transform Your Enterprise into an <span className='font-bold text-black'>AI-First</span> <span className='font-bold text-primary'>Operating Model</span>
                            </h1>

                            <p className="text-gray-600 text-lg max-w-xl">
                                Orchestrate voice, governance, workflows, and outcomes across your enterprise using an AI Operating System built for real-time execution, compliance, and scale - from prototype to production in days.                        </p>

                            <div className="flex flex-wrap gap-4 items-center">
                                <button className="relative overflow-hidden inline-flex items-center gap-2 px-10 py-5 bg-primary text-white font-semibold rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 group">
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get a Demo
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
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
                                <div className="relative overflow-hidden w-full max-w-xl group">
                                    <div className="flex w-max gap-8 items-center animate-marquee whitespace-nowrap">
                                        {logos.map((logo, i) => (
                                            <img
                                                key={i}
                                                src={logo.src}
                                                alt={logo.name}
                                                className="h-10 lg:h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                            />
                                        ))}
                                        {logos.map((logo, i) => (
                                            <img
                                                key={"dup-" + i}
                                                src={logo.src}
                                                alt={logo.name}
                                                className="h-10 lg:h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - AI Diagram */}
                        <div className="relative hidden lg:flex items-center justify-center h-full w-full max-h-[700px]">

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

                {/* ── Dynamic Transforming Video Pane ── */}
                <div
                    ref={videoContainerRef}
                    className="absolute z-20 overflow-hidden"
                    style={{
                        width: "clamp(240px, 20vw, 360px)",
                        height: "clamp(135px, 11.25vw, 200px)",
                        top: "12%",
                        right: "4%",
                        borderRadius: "24px",
                    }}
                >
                    <video
                        ref={videoRef}
                        src="/vertical-ai/platform-detail.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover bg-black"
                    />
                </div>

            </div>



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
        </>
    );
}