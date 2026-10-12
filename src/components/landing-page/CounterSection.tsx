'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CounterItem {
    number?: number;
    prefix?: string;
    suffix: string;
    title: string;
    decimals?: number;
    staticLabel?: string;
}

export const CounterSection: React.FC = () => {
    const [animatedValues, setAnimatedValues] = useState<number[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const counterItems: CounterItem[] = [
        { number: 50, suffix: "K+", title: "Conversations Per Day" },
        { number: 7, suffix: " Days", title: "Go-Live Time" },
        { number: 99.9, suffix: "%", title: "Uptime Reliability", decimals: 1 },
        { number: 40, suffix: "%", title: "Token Cost Reduction" },
        { prefix: "<", number: 10, suffix: "B", title: "Parameter Models" }
    ];

    useEffect(() => {
        setAnimatedValues(counterItems.map(() => 0));
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const animationDuration = 2000;
        const frameRate = 60;
        const totalFrames = Math.ceil(animationDuration / (1000 / frameRate));

        const intervals = counterItems.map((item, index) => {
            if (item.staticLabel) return null;
            let currentFrame = 0;

            const interval = setInterval(() => {
                const progress = currentFrame / totalFrames;
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentValue = easedProgress * (item.number || 0);

                setAnimatedValues(prev => {
                    const newValues = [...prev];
                    newValues[index] = currentValue;
                    return newValues;
                });

                currentFrame++;
                if (currentFrame > totalFrames) {
                    setAnimatedValues(prev => {
                        const newValues = [...prev];
                        newValues[index] = item.number || 0;
                        return newValues;
                    });
                    clearInterval(interval);
                }
            }, 1000 / frameRate);

            return interval;
        });

        return () => {
            intervals.forEach(interval => interval && clearInterval(interval));
        };
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className="pb-16 md:pb-24 2xl:pb-32 bg-white"
        >
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl 2xl:max-w-[1600px]">
                <div className="max-w-5xl 2xl:max-w-7xl mx-auto text-center mb-16 sm:mb-20 2xl:mb-28">
                    <motion.h3
                        initial={{ opacity: 0, y: 48 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="text-2xl sm:text-4xl 2xl:text-5xl text-gray-700 tracking-tight px-4 text-center"
                    >
                        Engineered for Enterprise Scale and Impact, <br className="hidden md:block" />
                        <span className="text-primary font-semibold">Delivering High-Performance Results and Absolute Trust.</span>
                    </motion.h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-12 xl:gap-0 2xl:gap-4">
                    {counterItems.map((item, index) => (
                        <div
                            key={index}
                            className={`relative text-center group px-3 sm:px-4 2xl:px-6 ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}
                        >
                            {/* Vertical Divider for Desktop */}
                            {index < counterItems.length - 1 && (
                                <div className="hidden xl:block absolute top-1/2 -right-px w-px h-14 2xl:h-18 bg-slate-200 transform -translate-y-1/2" />
                            )}

                            <div className="relative z-10">
                                <div className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-bold text-primary leading-none mb-2 sm:mb-3 tabular-nums drop-shadow-sm">
                                    {item.staticLabel ? (
                                        item.staticLabel
                                    ) : (
                                        <>
                                            {item.prefix}
                                            {item.decimals
                                                ? (animatedValues[index] || 0).toFixed(item.decimals)
                                                : Math.ceil(animatedValues[index] || 0)}
                                        </>
                                    )}
                                    <span className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl ml-0.5">{item.suffix}</span>
                                </div>
                                <div className="text-slate-600 font-medium text-xs sm:text-base lg:text-lg 2xl:text-xl">
                                    {item.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CounterSection;
