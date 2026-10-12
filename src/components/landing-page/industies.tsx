"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TechItem {
    id: number;
    label: string;
    counter: string;
    description: string;
    url: string;
    image: string;
}


// ─── TECH STACK LIST SECTION ─────────────────────────────────────────────────

function TechHeadingItem({
    item,
    isHovered,
    isAnyHovered,
    onEnter,
    onLeave,
    onClickLabel,
    visible,
    idx,
}: {
    item: TechItem;
    isHovered: boolean;
    isAnyHovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onClickLabel: () => void;
    visible: boolean;
    idx: number;
}) {
    const opacity = isAnyHovered ? (isHovered ? 0 : 0.07) : 1;

    return (
        <div className="relative overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 56 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.85,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
            >
                <div
                    aria-label={item.label}
                    className="flex items-center justify-center no-underline py-2 md:py-[clamp(12px,1.5vw,24px)] 2xl:py-6 px-2 sm:px-4 md:px-0"
                >
                    <h2
                        className="relative inline-flex items-baseline font-sans font-light text-base sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl m-0 cursor-pointer will-change-[opacity] transition-[opacity] duration-[350ms] ease-out text-center"
                        style={{ opacity, color: "#0f172a" }}
                        onMouseEnter={onEnter}
                        onMouseLeave={onLeave}
                        onClick={onClickLabel}
                    >
                        {/* Label - turns cyan on hover */}
                        <span className="relative transition-colors duration-[250ms] ease-out hover:text-primary">
                            {item.label}
                        </span>
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}

function TechHeadingsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-8%" });
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [techItems, setTechItems] = useState<TechItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/industries`)
            .then((res) => res.json())
            .then((json) => {
                if (Array.isArray(json?.industries)) {
                    const mapped: TechItem[] = json.industries.map((row: any, i: number) => ({
                        id: i + 1,
                        label: row.name,
                        counter: String(i + 1).padStart(2, "0"),
                        description: row.heroDescription,
                        url: `/industry/${row.slug}`,
                        image: row.heroImageUrl,
                    }));
                    setTechItems(mapped);
                }
            })
            .catch(console.error);
    }, []);

    const handleLabelClick = (item: TechItem) => {
        router.push(item.url);
    };

    return (
        <>
            <section
                id="tech-stack"
                aria-label="Technology Stack"
                className="bg-white max-w-7xl 2xl:max-w-[1600px] mx-auto pt-[clamp(40px,6vw,120px)] 2xl:pt-32 pb-8 sm:pb-10"
            >
                <div className="max-w-5xl 2xl:max-w-7xl mx-auto text-center mb-8 sm:mb-10 px-4 sm:px-6">
                    <motion.h3
                        initial={{ opacity: 0, y: 48 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="text-2xl sm:text-4xl 2xl:text-5xl text-gray-700 tracking-tight text-center"
                    >
                        Empowering Industries with The Vertical AI Agents, <br className="hidden md:block" />
                        <span className="text-primary font-semibold">Driving Innovation And Measurable Growth.</span>
                    </motion.h3>
                </div>
            </section>

            <section
                ref={sectionRef}
                aria-label="Technology stack list"
                className="bg-white pb-[clamp(40px,6vw,120px)] 2xl:pb-36 relative"
            >
                <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 2xl:px-12 flex flex-wrap justify-start md:justify-center gap-y-3 sm:gap-y-6 md:gap-y-10 relative z-10">
                    {techItems.map((item, idx) => (
                        <div
                            key={item.id}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="relative flex items-center justify-center h-14 sm:h-16 md:h-20 2xl:h-24 w-1/2 md:w-1/2 lg:w-1/3"
                        >
                            {/* Hover Card Overlay (centered over the title) */}
                            <AnimatePresence>
                                {hoveredId === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
                                        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                                        exit={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        className="absolute left-1/2 top-1/2 z-[100] pointer-events-auto"
                                    >
                                        <div className="w-56 h-38 md:w-72 md:h-48 2xl:w-80 2xl:h-52 relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white/90 bg-[#1b3d6c] cursor-pointer">
                                            {/* Background Image */}
                                            <Image
                                                src={item.image}
                                                alt={item.label}
                                                fill
                                                priority
                                                className="object-cover opacity-30"
                                            />

                                            {/* Card Content */}
                                            <div className="absolute inset-0 flex flex-col justify-between items-center text-center p-3 md:p-5 2xl:p-6 z-10">
                                                <div className="flex flex-col items-center gap-1 md:gap-2">
                                                    <h4 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-white">
                                                        {item.label}
                                                    </h4>

                                                    <p className="text-[11px] md:text-sm 2xl:text-base text-white/95 font-medium leading-relaxed max-w-[90%] md:max-w-none line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Solid Terracotta Orange Pill */}
                                                <div
                                                    onClick={() => handleLabelClick(item)}
                                                    className="w-4/5 py-2 px-4 bg-accent rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer">
                                                    <span className="text-sm md:text-xs 2xl:text-sm font-bold text-white">
                                                        Discover More
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative z-10 w-full">
                                <TechHeadingItem
                                    item={item}
                                    idx={idx}
                                    visible={isInView}
                                    isHovered={hoveredId === item.id}
                                    isAnyHovered={hoveredId !== null}
                                    onEnter={() => setHoveredId(item.id)}
                                    onLeave={() => setHoveredId(null)}
                                    onClickLabel={() => handleLabelClick(item)}
                                />
                            </div>
                        </div>
                    ))}
                    {/* Bottom divider */}
                    <div className="w-full h-px bg-[#0f172a]/10 mt-8 sm:mt-10" />
                </div>
            </section>
        </>
    );
}

// ─── ROOT EXPORT ─────────────────────────────────────────────────────────────

export default function Industries() {
    return (
        <>
            <TechHeadingsSection />
        </>
    );
}
