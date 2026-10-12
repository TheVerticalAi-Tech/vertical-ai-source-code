"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Repeat, Activity, Server, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PillarCard = ({ pillar, icon: Icon, i }: { pillar: any, icon: React.ElementType, i: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center text-center group"
        >
            {/* Icon Container */}
            <div className="w-20 h-20 rounded-full bg-white group-hover:bg-primary group-hover:text-white shadow-sm flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_12px_40px_rgba(var(--primary-rgb),0.3)] transition-all duration-300 border border-gray-50 shrink-0">
                <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            </div>

            {/* Title */}
            <h3 className="text-gray-900 text-lg font-bold mb-4 leading-tight">{pillar.title}</h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] md:max-w-[200px]">
                {pillar.description}
            </p>
        </motion.div>
    );
};

export default function IndustryVerticalProduct({ data }: { data?: any }) {
    const router = useRouter();

    if (!data) return null;

    const pillarIcons = [ShieldCheck, Zap, Repeat, Activity, Server];

    return (
        <section className="bg-white py-16 md:py-24 overflow-hidden relative border-t border-gray-50">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20 flex flex-col items-center">

                    {/* Heading */}
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl text-gray-700 mb-6"
                    >
                        {data.title} <br />
                        <span className="text-primary font-bold">{data.titleHighlight}</span>
                    </motion.h2>
                    
                    <p className="text-lg md:text-xl text-gray-500 px-4 md:px-0">
                        {data.subtitle}
                    </p>

                </div>

                {/* Process Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
                    {data.pillars.map((pillar: any, i: number) => {
                        const Icon = pillarIcons[i % pillarIcons.length];
                        return <PillarCard key={i} pillar={pillar} icon={Icon} i={i} />;
                    })}
                </div>

                {/* CTA Button */}
                <div className="mt-20 flex justify-center">
                    <motion.button 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        onClick={() => router.push('/get-demo')}
                        className="inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black cursor-pointer"
                    >
                        <span>Talk to an Expert</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
