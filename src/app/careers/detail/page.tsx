"use client";

import React, { useState } from 'react';
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MapPin, Clock, IndianRupee, UploadCloud, CheckCircle2, ArrowRight } from "lucide-react";

export default function JobDetailPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header visible={true} />

      <PageHero
        title="Job Detail"
        backgroundImage="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2940"
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        
        {/* Top Info Banner */}
        <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm mb-10 md:mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    Engineering Team
                 </div>
                 <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">Senior AI Solutions Architect</h1>
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4 shrink-0 w-full md:w-auto">
                <span className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100 text-sm md:text-base">
                <MapPin size={18} className="text-primary" /> Global / Remote
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100">
                <Clock size={18} className="text-primary" /> Full-time
                </span>
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 text-gray-700 font-semibold border border-gray-100">
                <IndianRupee size={18} className="text-primary" /> Competitive / Best in Industry
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6 md:gap-10">
                <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">About the Role</h3>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6">
                        We are building the world's first fully autonomous multi-agent orchestration layer. As a Senior AI Solutions Architect, you will lead the technical integrations and deployments of these enterprise workflows directly for our Fortune 500 clients.
                    </p>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        You'll bridge the gap between our state-of-the-art inference engines and complex legacy architectures, ensuring smooth transitions and demonstrating undeniably massive ROI through autonomous operations.
                    </p>
                </div>

                <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Key Responsibilities</h3>
                    <ul className="space-y-4">
                        {[
                            "Architect scalable deployment infrastructures for custom-trained AI workforce agents.",
                            "Work intimately with enterprise engineering teams to design seamless REST and GraphQL integrations.",
                            "Optimize AI latency down to absolute minimums (<500ms) over live voice and websocket pipelines.",
                            "Design comprehensive fallback structures to ensure flawless human-in-the-loop hand-offs.",
                            "Mentor junior technical deployers to scale out our onboarding capacity."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 md:gap-4">
                                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-primary" />
                                </div>
                                <span className="text-base md:text-lg text-gray-700 leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-12 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] relative overflow-hidden">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Requirements</h3>
                    <ul className="space-y-4">
                        {[
                            "6+ years of software engineering or robust solutions architecture experience.",
                            "Deep expertise with Python, Typescript, and building APIs spanning high volumes of data.",
                            "Significant prior exposure to working with LLMs (LangChain, LlamaIndex, OpenAI, Anthropic frameworks).",
                            "Outstanding client-facing communication skills.",
                            "Exceptional problem-solving skills under high-pressure enterprise SLAs."
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 md:gap-4">
                                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-primary" />
                                </div>
                                <span className="text-base md:text-lg text-gray-700 leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Apply Form Column */}
            <div className="lg:col-span-5 xl:col-span-4 relative mt-4 md:mt-0">
                <div className="sticky top-24 bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] w-full block">
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Apply for this Position</h3>
                    <p className="text-gray-500 mb-8 font-medium">Join the journey of automating enterprise workflows.</p>

                    {isSubmitted ? (
                        <div className="bg-green-50/50 border border-green-200 rounded-3xl p-8 text-center flex flex-col items-center shadow-inner">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50">
                                <CheckCircle2 size={32} className="text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold text-green-900 mb-2">Application Received!</h4>
                            <p className="text-green-700 text-sm font-medium">Thank you for your interest. Our talent team will review your profile and be in touch soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                <input required type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" placeholder="John Doe" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                <input required type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" placeholder="john@example.com" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Phone Number</label>
                                <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" placeholder="+91 98765 43210" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">LinkedIn Profile <span className="text-red-500">*</span></label>
                                <input required type="url" className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" placeholder="https://linkedin.com/in/..." />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Notice Period <span className="text-red-500">*</span></label>
                                <Select required>
                                    <SelectTrigger className="w-full px-5 py-4 h-auto rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="immediate">Immediate</SelectItem>
                                        <SelectItem value="15-30-days">15-30 Days</SelectItem>
                                        <SelectItem value="30-45-days">30-45 Days</SelectItem>
                                        <SelectItem value="45-60-days">45-60 Days</SelectItem>
                                        <SelectItem value="60+">60+ Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">How did you hear about this job?</label>
                                <Select required>
                                    <SelectTrigger className="w-full px-5 py-4 h-auto rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium">
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                        <SelectItem value="referral">Referral</SelectItem>
                                        <SelectItem value="job-board">Job Board</SelectItem>
                                        <SelectItem value="company-website">Company Website</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2 pt-2">
                                <label className="text-sm font-bold text-gray-700">Upload Resume <span className="text-red-500">*</span></label>
                                <div className="border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-2xl p-8 text-center hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer group">
                                    <UploadCloud size={32} className="text-gray-400 mx-auto mb-3 group-hover:text-primary transition-colors duration-300" />
                                    <p className="text-sm text-gray-600 font-bold mb-1">Click to upload or drag & drop</p>
                                    <p className="text-xs text-gray-400 font-medium">PDF, DOCX up to 5MB</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 pt-2">
                                <label className="text-sm font-bold text-gray-700">Cover Letter Notes</label>
                                <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none h-32 font-medium" placeholder="Tell us why you're a great fit..."></textarea>
                            </div>

                            <button 
                              type="submit" 
                              className="w-full inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-5 mt-6 rounded-2xl bg-primary text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 hover:scale-105 active:scale-95 hover:!bg-black"
                            >
                                <span>Submit Application</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
            
        </div>
      </main>

      <LandingPageFooter />
    </div>
  );
}
