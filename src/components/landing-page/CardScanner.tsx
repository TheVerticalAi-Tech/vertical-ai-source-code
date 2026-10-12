"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, useMotionTemplate } from "framer-motion";
import {
    Zap,
    BarChart3,
    ShieldCheck,
    LayoutGrid,
    Brain,
    Check,
} from "lucide-react";

// --- Types ---
interface StackLayer {
    id: string;
    title: string;
    label: string;
    description: string;
    color: string;
    bgLight: string;
    textColor: string;
    shadowColor: string;
    icon: any;
    bulletPoints: string[];
}

// --- Data ---
const STACK_LAYERS: StackLayer[] = [
    {
        id: "velox-core",
        title: "VeloxCore",
        label: "Low Latency Execution Engine",
        description: "High-performance inference engine running specialized low-latency LLMs with deterministic sub-500ms response times, deployable across secure private clouds and air-gapped on-premises systems.",
        color: "from-indigo-600 to-violet-700",
        bgLight: "from-indigo-50/90 to-violet-50/90 border-indigo-200/50 shadow-indigo-500/10",
        textColor: "text-indigo-600",
        shadowColor: "rgba(79, 70, 229, 0.15)",
        icon: Zap,
        bulletPoints: [
            "Sub-500ms deterministic inference",
            "Secure air-gapped deployment",
            "Advanced model routing & caching"
        ]
    },
    {
        id: "insight",
        title: "Insight",
        label: "Analysis & Tailored Intelligence",
        description: "Real-time cognitive analytics pipeline that digests unstructured calls, documents, and system logs into structured strategic intelligence and interactive dashboard feeds.",
        color: "from-pink-500 to-rose-600",
        bgLight: "from-pink-50/90 to-rose-50/90 border-pink-200/50 shadow-pink-500/10",
        textColor: "text-pink-600",
        shadowColor: "rgba(236, 72, 153, 0.15)",
        icon: BarChart3,
        bulletPoints: [
            "Real-time data ingestion & synthesis",
            "High-fidelity transcription & sentiment analysis",
            "Dynamic knowledge-graph mapping"
        ]
    },
    {
        id: "maestro",
        title: "Maestro",
        label: "Decision & Orchestration",
        description: "Autonomous multi-agent coordinator that manages complex workflows, choreographs cooperative AI workers, and handles contextual path routing.",
        color: "from-blue-500 to-cyan-600",
        bgLight: "from-blue-50/90 to-cyan-50/90 border-blue-200/50 shadow-blue-500/10",
        textColor: "text-blue-600",
        shadowColor: "rgba(59, 130, 246, 0.15)",
        icon: LayoutGrid,
        bulletPoints: [
            "Context-aware workflow routing",
            "Multi-agent scheduling & state locking",
            "Human-in-the-loop validation"
        ]
    },
    {
        id: "guardian",
        title: "Guardian",
        label: "System of Rules & Compliance",
        description: "Enterprise grade policy guardrail system running real-time compliance audits, privacy filtration, and strict security protocol validation.",
        color: "from-amber-500 to-orange-600",
        bgLight: "from-amber-50/90 to-orange-50/90 border-amber-200/50 shadow-amber-500/10",
        textColor: "text-amber-600",
        shadowColor: "rgba(245, 158, 11, 0.15)",
        icon: ShieldCheck,
        bulletPoints: [
            "Real-time PII scrubbing & threat detection",
            "Sovereign data policy enforcement",
            "Continuous compliance auditing (SOC2/HIPAA)"
        ]
    },
    {
        id: "ai-os",
        title: "AI Operating System",
        label: "AI OS Platform Execution",
        description: "The overarching sovereign console that unifies Maestro, Guardian, and VeloxCore under a single, highly auditable control plane for enterprise scale automation.",
        color: "from-purple-500 to-indigo-600",
        bgLight: "from-purple-50/90 to-indigo-50/90 border-purple-200/50 shadow-purple-500/10",
        textColor: "text-purple-600",
        shadowColor: "rgba(168, 85, 247, 0.15)",
        icon: Brain,
        bulletPoints: [
            "Unified sovereign console management",
            "End-to-end audit trails for all decisions",
            "Elastic vertical auto-scaling"
        ]
    }
];

// --- Sub-Components ---
const LayerContent = ({ layer, isActive }: { layer: StackLayer; isActive: boolean }) => {
    const Icon = layer.icon;
    return (
        <div className="w-full h-full rounded-[1.9rem] bg-white relative overflow-hidden flex flex-col items-center justify-center p-6 transition-all duration-300">
            {/* Tech blueprint grids */}
            <svg className={`absolute inset-0 w-full h-full p-4 pointer-events-none transition-all duration-500 ${isActive ? 'text-indigo-500/10' : 'text-gray-200'}`} viewBox="0 0 200 200">
                <rect x="10" y="10" width="180" height="180" rx="15" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                
                {/* Circuit paths */}
                <path d="M10,10 L40,40" stroke="currentColor" strokeWidth="0.75" />
                <path d="M190,10 L160,40" stroke="currentColor" strokeWidth="0.75" />
                <path d="M10,190 L40,160" stroke="currentColor" strokeWidth="0.75" />
                <path d="M190,190 L160,160" stroke="currentColor" strokeWidth="0.75" />
                
                {/* Corner accent squares */}
                <rect x="35" y="35" width="6" height="6" fill="currentColor" opacity="0.3" />
                <rect x="159" y="35" width="6" height="6" fill="currentColor" opacity="0.3" />
                <rect x="35" y="159" width="6" height="6" fill="currentColor" opacity="0.3" />
                <rect x="159" y="159" width="6" height="6" fill="currentColor" opacity="0.3" />
            </svg>

            {/* Glowing active ring */}
            {isActive && (
                <div 
                    className={`absolute inset-6 rounded-full border border-dashed bg-gradient-to-tr ${layer.bgLight} opacity-30 animate-spin`}
                    style={{ animationDuration: "12s" }}
                />
            )}

            {/* Central hub */}
            <div className="relative z-10 flex flex-col items-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} p-[1.5px] shadow-lg mb-3 flex items-center justify-center transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
                    <div className="w-full h-full rounded-[13px] bg-white flex items-center justify-center text-gray-800">
                        <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? layer.textColor : 'text-gray-500'}`} />
                    </div>
                </div>
                
                <h4 className={`text-sm font-bold tracking-tight text-center transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {layer.title}
                </h4>
                
                <div className="flex items-center gap-1 mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span className="text-[9px] font-bold text-gray-500  ">
                        {isActive ? 'Processing' : 'Standby'}
                    </span>
                </div>
            </div>

           
        </div>
    );
};

// --- Main App Component ---
export default function CardScanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scrollSmooth = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 28,
        restDelta: 0.001
    });

    const [activeIndex, setActiveIndex] = useState(0);

    useMotionValueEvent(scrollSmooth, "change", (latest) => {
        if (latest < 0.22) {
            setActiveIndex(0);
        } else if (latest < 0.42) {
            setActiveIndex(1);
        } else if (latest < 0.62) {
            setActiveIndex(2);
        } else if (latest < 0.80) {
            setActiveIndex(3);
        } else {
            setActiveIndex(4);
        }
    });

    // Z-spacing animations (Accordion spreading on scroll from the bottom baseline onwards)
    const z0 = useTransform(scrollSmooth, [0, 1], [0, 0]); // Always 0 (baseline)
    const z1 = useTransform(scrollSmooth, [0, 1], [85, 85]); // Always 85
    const z2 = useTransform(scrollSmooth, [0, 1], [170, 170]); // Always 170
    const z3 = useTransform(scrollSmooth, [0, 1], [255, 255]); // Always 255
    const z4 = useTransform(scrollSmooth, [0, 1], [340, 340]); // Always 340

    // Flat vertical entry transitions for each layer, sliding up one-by-one from the bottom of the viewport
    const y0 = useTransform(scrollSmooth, [0, 1], [0, 0]); // Always 0 (already settled at baseline)
    const y1 = useTransform(scrollSmooth, [0.05, 0.22], [600, 0]);
    const y2 = useTransform(scrollSmooth, [0.22, 0.42], [600, 0]);
    const y3 = useTransform(scrollSmooth, [0.42, 0.62], [600, 0]);
    const y4 = useTransform(scrollSmooth, [0.62, 0.80], [600, 0]);

    // Opacity transitions (Fade in elegantly as they arrive from the bottom)
    const op0 = useTransform(scrollSmooth, [0, 1], [1, 1]); // Always fully visible
    const op1 = useTransform(scrollSmooth, [0.05, 0.17], [0, 1]);
    const op2 = useTransform(scrollSmooth, [0.22, 0.34], [0, 1]);
    const op3 = useTransform(scrollSmooth, [0.42, 0.54], [0, 1]);
    const op4 = useTransform(scrollSmooth, [0.62, 0.74], [0, 1]);

    // Custom 3D Transform templates applying translateY *first* in flat screen space, then rotation, then Z
    const transform0 = useMotionTemplate`translateY(${y0}px) rotateX(60deg) rotateZ(-45deg) translateZ(${z0}px)`;
    const transform1 = useMotionTemplate`translateY(${y1}px) rotateX(60deg) rotateZ(-45deg) translateZ(${z1}px)`;
    const transform2 = useMotionTemplate`translateY(${y2}px) rotateX(60deg) rotateZ(-45deg) translateZ(${z2}px)`;
    const transform3 = useMotionTemplate`translateY(${y3}px) rotateX(60deg) rotateZ(-45deg) translateZ(${z3}px)`;
    const transform4 = useMotionTemplate`translateY(${y4}px) rotateX(60deg) rotateZ(-45deg) translateZ(${z4}px)`;

    const activeLayer = STACK_LAYERS[activeIndex];
    const ActiveIcon = activeLayer.icon;

    return (
        <div ref={containerRef} className="relative h-auto lg:h-[320vh] bg-white">
            {/* Sticky screen container */}
            <div className="relative lg:sticky top-0 h-auto lg:h-screen w-full flex items-start lg:items-center overflow-hidden">
                {/* Background high-tech styling */}
                <div className="absolute inset-0 opacity-[0.4] pointer-events-none z-0 overflow-hidden">
                    <div 
                        className="absolute inset-0 opacity-[0.02]" 
                        style={{ 
                            backgroundImage: "linear-gradient(to right, #1F3F74 1px, transparent 1px), linear-gradient(to bottom, #1F3F74 1px, transparent 1px)", 
                            backgroundSize: "32px 32px" 
                        }} 
                    />
                    <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-200/10 blur-[120px]" />
                    <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-purple-200/10 blur-[100px]" />
                </div>

                <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 py-4 lg:py-0 relative z-0 lg:z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center h-full">
                        
                        {/* LEFT COLUMN: Fixed Text */}
                        <div className="lg:col-span-4 flex flex-col justify-center py-6 lg:h-[70vh] text-left">
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl text-gray-900 tracking-tight leading-tight">
                                    Transforming
                                    Legacy Systems
                                    into <span className="font-bold text-primary">AI-Powered Business</span>
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base 2xl:text-lg leading-relaxed max-w-sm 2xl:max-w-md">
                                    Unify legacy data silos into a cohesive, high-performance orchestration layers that seamlessly scale operations.
                                </p>
                            </div>

                            {/* Founder Info Badge at bottom-left */}
                            <div className="mt-8 lg:mt-12 flex flex-col gap-2 border-t border-gray-100 pt-6 2xl:pt-8">
                                <span className="text-sm 2xl:text-base font-bold text-accent leading-none">From the Brains of</span>
                                <p className="text-gray-600 text-xs sm:text-sm 2xl:text-base font-medium leading-relaxed">
                                    IIM Calcutta & Kellogg
                                    <span className="text-gray-400 mx-2">+</span>
                                    18 yrs of Scaling Businesses
                                </p>
                            </div>
                        </div>

                        {/* CENTER COLUMN: Interactive 3D Stack View */}
                        <div className="hidden lg:flex lg:col-span-4 w-full items-center justify-center relative">
                                <div className="relative w-full h-[500px] 2xl:h-[580px] flex items-center justify-center" style={{ perspective: "1500px" }}>
                                    <motion.div 
                                        style={{ transformStyle: "preserve-3d" }}
                                        className="relative w-[260px] h-[260px] 2xl:w-[300px] 2xl:h-[300px] flex items-center justify-center top-[150px]"
                                    >
                                        {/* Layer 5 (AI OS) - Top */}
                                        <motion.div 
                                            style={{ 
                                                transform: transform4, 
                                                opacity: op4,
                                                transformStyle: "preserve-3d",
                                                boxShadow: activeIndex === 4 ? `0 20px 50px ${STACK_LAYERS[4].shadowColor}` : "0 8px 24px rgba(0,0,0,0.06)"
                                            }}
                                            className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${STACK_LAYERS[4].bgLight} border-2 ${activeIndex === 4 ? 'border-purple-500/80' : 'border-gray-200'} p-1 flex items-center justify-center`}
                                        >
                                            <LayerContent layer={STACK_LAYERS[4]} isActive={activeIndex === 4} />
                                        </motion.div>

                                        {/* Layer 4 (Guardian) */}
                                        <motion.div 
                                            style={{ 
                                                transform: transform3, 
                                                opacity: op3,
                                                transformStyle: "preserve-3d",
                                                boxShadow: activeIndex === 3 ? `0 20px 50px ${STACK_LAYERS[3].shadowColor}` : "0 8px 24px rgba(0,0,0,0.06)"
                                            }}
                                            className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${STACK_LAYERS[3].bgLight} border-2 ${activeIndex === 3 ? 'border-amber-500/80' : 'border-gray-200'} p-1 flex items-center justify-center`}
                                        >
                                            <LayerContent layer={STACK_LAYERS[3]} isActive={activeIndex === 3} />
                                        </motion.div>

                                        {/* Layer 3 (Maestro) */}
                                        <motion.div 
                                            style={{ 
                                                transform: transform2, 
                                                opacity: op2,
                                                transformStyle: "preserve-3d",
                                                boxShadow: activeIndex === 2 ? `0 20px 50px ${STACK_LAYERS[2].shadowColor}` : "0 8px 24px rgba(0,0,0,0.06)"
                                            }}
                                            className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${STACK_LAYERS[2].bgLight} border-2 ${activeIndex === 2 ? 'border-blue-500/80' : 'border-gray-200'} p-1 flex items-center justify-center`}
                                        >
                                            <LayerContent layer={STACK_LAYERS[2]} isActive={activeIndex === 2} />
                                        </motion.div>

                                        {/* Layer 2 (Insight) */}
                                        <motion.div 
                                            style={{ 
                                                transform: transform1, 
                                                opacity: op1,
                                                transformStyle: "preserve-3d",
                                                boxShadow: activeIndex === 1 ? `0 20px 50px ${STACK_LAYERS[1].shadowColor}` : "0 8px 24px rgba(0,0,0,0.06)"
                                            }}
                                            className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${STACK_LAYERS[1].bgLight} border-2 ${activeIndex === 1 ? 'border-pink-500/80' : 'border-gray-200'} p-1 flex items-center justify-center`}
                                        >
                                            <LayerContent layer={STACK_LAYERS[1]} isActive={activeIndex === 1} />
                                        </motion.div>

                                        {/* Layer 1 (VeloxCore) - Bottom */}
                                        <motion.div 
                                            style={{ 
                                                transform: transform0, 
                                                opacity: op0,
                                                transformStyle: "preserve-3d",
                                                boxShadow: activeIndex === 0 ? `0 20px 50px ${STACK_LAYERS[0].shadowColor}` : "0 8px 24px rgba(0,0,0,0.06)"
                                            }}
                                            className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${STACK_LAYERS[0].bgLight} border-2 ${activeIndex === 0 ? 'border-indigo-500/80' : 'border-gray-200'} p-1 flex items-center justify-center`}
                                        >
                                            <LayerContent layer={STACK_LAYERS[0]} isActive={activeIndex === 0} />
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>

                        {/* RIGHT COLUMN: Focused Info Card Column - Shows ACTIVE layer only */}
                        <div className="hidden lg:flex lg:col-span-4 w-full flex-col justify-center min-h-[480px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeLayer.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="bg-white backdrop-blur-md rounded-2xl 2xl:rounded-3xl border border-gray-100 p-6 2xl:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative overflow-hidden"
                                    >
                                        {/* Micro tech grid overlay */}
                                        <div 
                                            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                                            style={{ 
                                                backgroundImage: "linear-gradient(to right, #1F3F74 1px, transparent 1px), linear-gradient(to bottom, #1F3F74 1px, transparent 1px)", 
                                                backgroundSize: "20px 20px" 
                                            }} 
                                        />

                                        {/* Glowing visual accent */}
                                        <div className={`absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br ${activeLayer.color} opacity-[0.08] blur-2xl pointer-events-none`} />

                                        {/* Header Row */}
                                        <div className="flex items-center gap-4 border-b border-gray-100 pb-3 mb-3 relative z-10">
                                            <div className={`w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-gradient-to-br ${activeLayer.color} p-[1.5px] shadow-lg flex items-center justify-center shrink-0`}>
                                                <div className="w-full h-full rounded-[13px] bg-white flex items-center justify-center">
                                                    <ActiveIcon className={`w-5 h-5 2xl:w-6 2xl:h-6 ${activeLayer.textColor}`} />
                                                </div>
                                            </div>
                                            <div>
                                               
                                                <h3 className={`text-xl 2xl:text-2xl font-bold ${activeLayer.textColor} mt-0.5`}>
                                                    {activeLayer.title}
                                                </h3>
                                                 <span className={`text-sm 2xl:text-base font-medium text-gray-500`}>
                                                    {activeLayer.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="space-y-3 relative z-10">
                                            <p className="text-gray-500 text-sm 2xl:text-base leading-relaxed">
                                                {activeLayer.description}
                                            </p>

                                            <div className="border-t border-gray-100 pt-3">
                                                <span className="text-sm 2xl:text-base font-medium text-gray-400 block mb-2">Core Capabilities</span>
                                                <ul className="space-y-2 pl-0 list-none m-0">
                                                    {activeLayer.bulletPoints.map((point, pIndex) => (
                                                        <motion.li 
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: pIndex * 0.08 }}
                                                            key={pIndex} 
                                                            className="flex items-center gap-2.5 text-xs 2xl:text-sm font-medium text-gray-600"
                                                        >
                                                            <Check className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0 ${activeLayer.textColor}`} strokeWidth={3} />
                                                            {point}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                             </div>

                        {/* Mobile Grid View (Rendered only on mobile/tablet) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden w-full gap-4 sm:gap-6 mt-6 lg:col-span-12">
                                {STACK_LAYERS.map((layer) => {
                                    const Icon = layer.icon;
                                    return (
                                        <div 
                                            key={layer.id}
                                            className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4 border-b border-gray-50 pb-3 sm:pb-4 mb-3 sm:mb-4">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${layer.color} p-[1px] flex items-center justify-center shrink-0`}>
                                                    <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center">
                                                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${layer.textColor}`} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className={`text-[9px] sm:text-[10px] font-bold ${layer.textColor} block`}>
                                                        {layer.label}
                                                    </span>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 mt-0.5">
                                                        {layer.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            
                                            <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-2">
                                                {layer.description}
                                            </p>

                                            <ul className="space-y-1.5 pl-0 list-none">
                                                {layer.bulletPoints.map((point, pIndex) => (
                                                    <li key={pIndex} className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                        <Check className={`w-3.5 h-3.5 shrink-0 ${layer.textColor}`} strokeWidth={3} />
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
