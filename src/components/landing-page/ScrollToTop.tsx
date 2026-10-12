"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollToTop() {
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const scrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // UI state
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const tickingRef = useRef(false);

    // Set mounted state after hydration to prevent hydration mismatches
    useEffect(() => {
        if (typeof window !== 'undefined') {
            requestAnimationFrame(() => {
                setIsMounted(true);
            });
        }
    }, []);

    // Scroll handling (back to top)
    useEffect(() => {
        if (!isMounted) return;

        const onScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;

            requestAnimationFrame(() => {
                const currentY = window.scrollY || 0;
                setShowScrollToTop(currentY > window.innerHeight);
                tickingRef.current = false;
            });
        };

        const timeoutId = setTimeout(() => {
            window.addEventListener("scroll", onScroll, { passive: true });
        }, 200);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", onScroll);
        };
    }, [isMounted]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isMounted) return null;

    return (
        <div className="fixed right-3 sm:right-4 z-50">
            <AnimatePresence>
                {showScrollToTop && (
                    <motion.button
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group focus:outline-none"
                        aria-label="Scroll to top"
                    >
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-black rotate-45 flex items-center justify-center shadow-lg transition-transform duration-300">
                            {/* SVG Progress Border */}
                            <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none transition-opacity duration-300 overflow-visible">
                                <motion.rect
                                    x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                                    fill="none"
                                    stroke="#00CCFF"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    rx="1" ry="1"
                                    initial={{ pathLength: 0 }}
                                    style={{ pathLength: scrollProgress }}
                                />
                            </svg>

                            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-45" strokeWidth={1.5} />
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
