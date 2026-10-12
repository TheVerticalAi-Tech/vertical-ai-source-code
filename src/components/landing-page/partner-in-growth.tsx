"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Lock, Users, RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const features = [
    {
        icon: ShieldCheck,
        title: "Data Encryption",
        description: "End-to-end AES-256 encryption protects all data at rest and in transit, ensuring every conversation and interaction remains secure and private.",
    },
    {
        icon: Lock,
        title: "Secure APIs",
        description: "All integrations use authenticated and rate-limited APIs with detailed audit logging and zero-trust security architecture.",
    },
    {
        icon: Users,
        title: "Controlled Access",
        description: "Role-based access controls ensure only authorized users can view, manage, or deploy AI agents within your organization.",
    },
    {
        icon: RefreshCw,
        title: "Compliance Adaptability",
        description: "Built to align with evolving regulations including RBI, GDPR, HIPAA, and other global compliance standards.",
    },
];

export default function PartnerInGrowth() {
    const router = useRouter();
    return (
        <section className="text-gray-900 py-16 sm:py-20 lg:py-24 2xl:py-32 px-4 sm:px-6 md:px-8 relative overflow-hidden">

            {/* Header Section */}
            <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto mb-10 md:mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">

                        {/* Left: pill + h2 */}
                        <div className="flex flex-col items-start">
                            <h2 className="text-2xl sm:text-4xl 2xl:text-5xl text-gray-700 tracking-tight">
                                Enterprise Grade Security You Can Trust, <br className="hidden md:block" />
                                <span className="text-primary font-semibold">Designed To Protect Your Data.</span>
                            </h2>
                        </div>

                        {/* Right: button */}
                        <button
                            onClick={() => router.push("/get-demo")}
                            className="w-fit sm:w-auto py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-2xl bg-primary text-white font-bold text-xs sm:text-base 2xl:text-lg hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto shrink-0"
                        >
                            Talk to an Expert <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </button>

                    </div>
                </motion.div>
            </div>

            {/* Grid Section - Contained Width */}
            <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto relative z-10">
                <div className="w-full border border-gray-200 rounded-2xl 2xl:rounded-3xl overflow-hidden bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`p-6 sm:p-8 2xl:p-10 border-gray-200 flex flex-col items-start group min-h-[260px] md:min-h-[300px] 2xl:min-h-[340px] justify-start
                                    ${index < 3 ? "border-b md:border-b-0" : ""} 
                                    ${index < 2 ? "md:border-b lg:border-b-0" : "md:border-b-0"} 
                                    ${index % 2 === 0 ? "md:border-r" : "md:border-r-0"} 
                                    ${index < 3 ? "lg:border-r" : "lg:border-r-0"}
                                `}
                            >
                                <div className="mb-5 sm:mb-6">
                                    <div className="w-14 h-14 2xl:w-16 2xl:h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-accent transition-all duration-300 border border-gray-200">
                                        <feature.icon className="w-6 h-6 2xl:w-7 2xl:h-7 text-accent group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold mb-2 sm:mb-3 text-gray-700">{feature.title}</h3>
                                <p className="text-gray-600 text-xs sm:text-sm 2xl:text-base leading-relaxed max-w-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
