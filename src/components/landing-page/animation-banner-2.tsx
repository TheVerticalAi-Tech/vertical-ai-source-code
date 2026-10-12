"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';

const AnimatedCounter = ({ from, to, suffix, duration = 2, className }: { from: number, to: number, suffix: string, duration?: number, className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { margin: "0px", once: false });
    
    useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    if (ref.current) {
                        ref.current.textContent = Math.floor(value) + suffix;
                    }
                }
            });
            return () => controls.stop();
        } else if (!isInView && ref.current) {
            ref.current.textContent = from + suffix;
        }
    }, [isInView, from, to, suffix, duration]);

    return <span ref={ref} className={className}>{from}{suffix}</span>;
};
import { useRouter } from 'next/navigation';
import Header from './header';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from "@/assets/logo.png"

import logo1 from "@/assets/client-logos/Kotak-Mahindra.png"
import logo2 from "@/assets/client-logos/Bajaj-Finserv.png"
import logo3 from "@/assets/client-logos/DRA-Homes.png"
import logo4 from "@/assets/client-logos/TVS-Credit.png"
import logo5 from "@/assets/client-logos/smk-mg.png"

// ── Intro Overlay ────────────────────────────────────────────────
function IntroOverlay({ onComplete }: { onComplete: () => void }) {
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        const exit = setTimeout(() => setAnimationStep(1), 700);
        const done = setTimeout(() => onComplete(), 1500);
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

    return (
        <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <motion.img
                src={logo.src}
                alt="The Vertical AI Logo"
                className="w-48 md:w-[480px] lg:w-[600px] h-auto"
                variants={letterVariants}
                initial="hidden"
                animate={animationStep === 0 ? "visible" : "exit"}
            />
        </motion.div>
    );
}

// ── Main Component ───────────────────────────────────────────────
const departments = ["Finance", "Operations", "Compliance", "Legal", "Sales", "HR", "Marketing", "Enterprise"];

export default function AnimationBanner2() {
    const router = useRouter();
    const [showIntro, setShowIntro] = useState(true);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [currentDeptIndex, setCurrentDeptIndex] = useState(0);

    // Lock scroll during intro overlay
    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showIntro]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDeptIndex((prev) => (prev + 1) % departments.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    const handleIntroComplete = () => {
        setShowIntro(false);
        setTimeout(() => setHeaderVisible(true), 200);
    };

    const videoRef = useRef<HTMLVideoElement>(null);

    const logos = [
        { src: logo1, name: "Logo 1" },
        { src: logo2, name: "Logo 2" },
        { src: logo3, name: "Logo 3" },
        { src: logo4, name: "Logo 4" },
        { src: logo5, name: "Logo 5" },
    ];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let isPlaying = false;

        const attemptPlay = () => {
            if (video && video.paused && !isPlaying) {
                isPlaying = true;
                video.play()
                    .then(() => {
                        isPlaying = false;
                    })
                    .catch(error => {
                        isPlaying = false;
                        // Silence benign AbortError / NotAllowedError from power saving or backgrounding
                        if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
                            console.warn("Video playback failed:", error);
                        }
                    });
            }
        };

        attemptPlay();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                attemptPlay();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // GSAP Scroll Physics
    const containerRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const contentWrapperRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = useRef<HTMLDivElement>(null);

    // Initialize ScrollTrigger Timeline
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !contentWrapperRef.current || !videoContainerRef.current) return;

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // Build the scroll sequence timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=360%",
                    pin: true,
                    scrub: 1.2,
                }
            });

            // 2. Expand video container to full screen bounds (leaving space for header)
            tl.fromTo(videoContainerRef.current,
                {
                    width: "clamp(360px, 30vw, 560px)",
                    height: "clamp(200px, 17vw, 340px)",
                    top: "18%",
                    right: "5%",
                    paddingTop: "0px",
                    borderRadius: "24px",
                },
                {
                    width: "100%",
                    height: "100%",
                    top: "0%",
                    right: "0%",
                    paddingTop: "72px",
                    borderRadius: "0px",
                    duration: 1,
                    ease: "power2.inOut"
                }, 0);

            // Scroll the background hero content upwards concurrently
            tl.to(contentWrapperRef.current, {
                y: "-100%",
                duration: 1,
                ease: "power2.inOut"
            }, 0);



            tl.to({}, { duration: 0.3 });
        });

        return () => mm.revert();
    }, []);

    return (
        <>
            {/* Header Layer */}
            <div ref={headerWrapperRef} className="relative z-[10000]">
                <Header visible={headerVisible} />
            </div>
            
            <div ref={containerRef} className="relative w-full min-h-screen lg:h-screen bg-white text-gray-900 overflow-hidden z-10 flex flex-col justify-center">

                {/* ── Intro Overlay ── */}
                <AnimatePresence mode="wait">
                    {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
                </AnimatePresence>

                {/* ── Main Hero Content ── */}
                <main
                    ref={heroContentRef}
                    className="relative lg:absolute top-0 left-0 w-full lg:h-full z-10 flex flex-col lg:justify-center pt-20 sm:pt-24 lg:pt-24 pb-10 sm:pb-12 lg:pb-12 px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-24"
                >
                    <div ref={contentWrapperRef} className="flex flex-col lg:justify-center gap-8 sm:gap-10 lg:gap-14 2xl:gap-20 h-auto w-full max-w-[1920px] 2xl:max-w-[2200px] mx-auto">
                        {/* TOP SECTION: TYPOGRAPHY & SUBTITLE */}
                        <div className="order-1 flex flex-col">
                            {/* MASSIVE TYPOGRAPHY (Top Left) */}
                            <div className="w-full relative z-20 pointer-events-none mt-2 sm:mt-6 lg:mt-8 xl:mt-12">
                                <h1 className="flex flex-col w-full text-black font-bold max-w-full text-left">
                                    <div className="flex w-full items-start justify-between">
                                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2vw] xl:text-[2.2vw] 2xl:text-[2.4rem] tracking-tight leading-tight lg:whitespace-nowrap whitespace-normal max-w-[90%] md:max-w-none inline-flex flex-wrap items-center">
                                            Transform Your&nbsp;
                                            <span className="inline-flex justify-start items-center relative h-[1.2em] overflow-hidden text-accent">
                                                <AnimatePresence mode="wait">
                                                    <motion.span
                                                        key={departments[currentDeptIndex]}
                                                        initial={{ y: "80%", opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: "-80%", opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: "easeInOut" }}
                                                        className="relative"
                                                    >
                                                        {departments[currentDeptIndex]}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </span>
                                            &nbsp;with Our
                                        </span>
                                        {/* Hidden spacer creates physical right-side buffer matching the GSAP absolute video bounds */}
                                        <span className="hidden lg:block w-[clamp(320px,30vw,560px)] shrink-0 h-4"></span>
                                    </div>
                                    <div className="mt-1 sm:mt-2 lg:mt-[0.5vw]">
                                        <span className="font-black text-primary text-5xl sm:text-7xl md:text-8xl lg:text-[10vw] xl:text-[9vw] 2xl:text-[9.5rem] tracking-tighter leading-[0.85] block whitespace-nowrap">
                                            AI-First OS
                                        </span>
                                    </div>
                                </h1>
                            </div>

                            <div className="w-full relative z-20 pointer-events-none mt-4 sm:mt-6 lg:mt-4 pl-0.5 sm:pl-1">
                                <p className="text-xs sm:text-base lg:text-[1.1vw] xl:text-[1.1vw] 2xl:text-xl font-medium text-gray-500 tracking-tight max-w-[95%] sm:max-w-[80%] lg:max-w-[65%] 2xl:max-w-[60%]">
                                    Powered by <span className="text-black font-bold">Velo<span className="text-lg lg:text-[1.6vw] xl:text-[1.8vw] 2xl:text-2xl">x</span>Core</span> - ultra-low latency, deterministic AI engine with sovereign deployment.
                                </p>
                            </div>

                            <div className="w-full lg:max-w-[65%] relative z-20 mt-6 sm:mt-8 pl-0.5 sm:pl-1 flex items-center gap-4">
                                <button
                                    onClick={() => router.push("/get-demo")}
                                    className="w-full sm:w-auto py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl bg-primary text-white font-bold text-xs sm:text-base 2xl:text-lg hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto whitespace-nowrap">
                                    Talk to an Expert <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                </button>
                            </div>
                        </div>

                        {/* BOTTOM ROW (Logos + Text + Buttons) */}
                        <div className="order-3 w-full flex flex-col lg:flex-row justify-between lg:items-end gap-8 sm:gap-12 lg:gap-8 mt-6 sm:mt-10 lg:mt-0">

                            {/* BOTTOM LEFT: LOGO SLIDER */}
                            <div className="w-full lg:flex-1 lg:max-w-[60%] 2xl:max-w-[65%] overflow-hidden order-2 lg:order-1">
                                <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg text-gray-400 mb-3 sm:mb-5 font-medium">
                                    Transformed legacy systems into AI-first operations across 50+ leading enterprises globally.
                                </p>
                                <div className="relative w-full overflow-hidden group">
                                    <div className="flex w-max gap-8 sm:gap-10 lg:gap-12 items-center animate-marquee whitespace-nowrap">
                                        {logos.map((logo, i) => (
                                            <img
                                                key={i}
                                                src={logo.src.src}
                                                alt={logo.name}
                                                className="h-6 sm:h-10 lg:h-12 2xl:h-14 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                            />
                                        ))}
                                        {logos.map((logo, i) => (
                                            <img
                                                key={"dup-" + i}
                                                src={logo.src.src}
                                                alt={logo.name}
                                                className="h-6 sm:h-10 lg:h-12 2xl:h-14 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM RIGHT: IMPACT STATS */}
                            <div className="w-full lg:w-auto flex flex-col lg:items-end lg:text-right gap-3 lg:gap-4 order-1 lg:order-2 shrink-0 lg:pr-10 xl:pr-14 2xl:pr-20 pb-1 lg:pb-3">
                                <p className="text-sm lg:text-base 2xl:text-lg font-medium text-gray-400">
                                    Built for Scale. Proven in Production.
                                </p>
                                <div className="flex items-center gap-6 sm:gap-10 2xl:gap-14">
                                    <div className="flex flex-col lg:items-end">
                                        <AnimatedCounter
                                            from={0}
                                            to={10}
                                            suffix="M+"
                                            className="text-4xl lg:text-5xl 2xl:text-6xl font-bold text-primary tracking-tight leading-none"
                                        />
                                        <span className="text-xs lg:text-sm 2xl:text-base font-bold text-accent mt-1 lg:mt-2 tracking-wide max-w-[140px] lg:max-w-[160px] 2xl:max-w-[180px]">
                                            AI governed conversations
                                        </span>
                                    </div>
                                    <div className="flex flex-col lg:items-end">
                                        <AnimatedCounter
                                            from={0}
                                            to={50}
                                            suffix="+"
                                            className="text-4xl lg:text-5xl 2xl:text-6xl font-black text-primary tracking-tight leading-none"
                                        />
                                        <span className="text-xs lg:text-sm 2xl:text-base font-bold text-accent mt-1 lg:mt-2 tracking-wide max-w-[140px] lg:max-w-[160px] 2xl:max-w-[180px]">
                                            Regulated enterprises transformed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* ── Dynamic Transforming Video Pane ── */}
                <div
                    ref={videoContainerRef}
                    className="video-pane z-30 overflow-hidden shadow-2xl shadow-black/10 order-2 lg:order-none"
                >
                    <video
                        ref={videoRef}
                        src="https://theverticalai.top/Assets/video/home-page.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover bg-white"
                    />
                </div>
            </div>

            <style jsx>{`
  .video-pane {
    position: relative;
    width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    background: white;
  }
  @media (min-width: 640px) {
    .video-pane {
        border-radius: 24px;
        margin-top: 2rem;
    }
  }
  @media (min-width: 1024px) {
    .video-pane {
        position: absolute;
        width: clamp(360px, 30vw, 560px);
        height: clamp(200px, 17vw, 340px);
        top: 18%;
        right: 5%;
        border-radius: 24px;
        margin: 0;
        aspect-ratio: auto;
    }
  }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
`}</style>
        </>
    );
}