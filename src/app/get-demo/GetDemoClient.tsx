"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Header from "@/components/landing-page/header";
import PageHero from "@/components/landing-page/page-hero";
import LandingPageFooter from "@/components/landing-page/landing-page-footer";
import { CheckCircle2, ArrowRight, Building2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import banner from "@/assets/demo-page-banner.webp"
import Link from 'next/link';
import { div } from 'three/src/nodes/math/OperatorNode.js';

const benefits = [
  "See our autonomous AI agents in action",
  "Discuss your custom enterprise use-cases",
  "Get detailed pricing and implementation timelines",
  "Learn how we ensure enterprise-grade security & compliance"
];

export default function GetDemoClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    otherMessage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message || (formData.message === 'Other' && !formData.otherMessage)) {
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const finalMessage = formData.message === 'Other' ? formData.otherMessage : formData.message;
      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/get-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: countryCode.trim()
            ? `+${countryCode.replace(/\+/g, '').trim()} ${formData.phone}`.trim()
            : formData.phone.trim(),
          company: formData.company,
          message: finalMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || "Failed to submit your request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header visible={true} />

      <PageHero
        title="Get a Demo"
        backgroundImage={banner.src}
      />

      <main className="py-16 md:py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            
            {/* Left Column - Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-full justify-start"
            >
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Transform your workflows with <span className="text-primary">The Vertical AI</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
                Discover how our AI-native enterprise OS can automate your complex business processes, scale your operations, and drive unprecedented efficiency. Book a personalized demo with our team today.
              </p>
              
              <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 md:gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <span className="text-gray-700 text-base md:text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-2xl shadow-gray-200/50 border border-gray-100 relative">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">You're all set!</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Thank you for your interest in The Vertical AI. One of our Expert will be in touch shortly to schedule your demo.
                    </p>
                    <Button 
                      onClick={() => {
                        setSubmitted(false);
                        setCountryCode("");
                        setErrorMessage(null);
                        setFormData({ name: '', email: '', phone: '', company: '', message: '', otherMessage: '' });
                      }}
                      variant="outline"
                      className="px-8 py-6 rounded-xl border-gray-200 text-gray-700 font-semibold hover:bg-gray-50"
                    >
                      Submit Another Request
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Demo</h3>
                      <p className="text-gray-500">Fill out the form below and we'll get right back to you.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <User size={16} className="text-gray-400" /> Name <span className="text-primary">*</span>
                        </label>
                        <Input 
                          required 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name" 
                          className="h-12 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" /> Email <span className="text-primary">*</span>
                        </label>
                        <Input 
                          required 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter Your Email Address" 
                          className="h-12 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Phone size={16} className="text-gray-400" /> Phone Number <span className="text-primary">*</span>
                        </label>
                        <div className="flex gap-2">
                          <div className="w-[100px] shrink-0 relative flex items-center">
                            <span className="absolute left-3.5 text-gray-500 font-semibold select-none pointer-events-none">+</span>
                            <Input 
                              type="text" 
                              name="countryCode"
                              value={countryCode}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\+/g, '');
                                setCountryCode(val);
                              }}
                              placeholder="Country Code" 
                              className="h-12 pl-8 pr-2 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl w-full font-medium" 
                            />
                          </div>
                          <div className="flex-1">
                            <Input 
                              required 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter your phone number" 
                              className="h-12 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl w-full" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Building2 size={16} className="text-gray-400" /> Company Name
                        </label>
                        <Input 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter Company Name" 
                          className="h-12 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <MessageSquare size={16} className="text-gray-400" /> How can we help? <span className="text-primary">*</span>
                        </label>
                        <Select 
                          value={formData.message} 
                          onValueChange={(val) => setFormData(prev => ({ ...prev, message: val }))}
                          required
                        >
                          <SelectTrigger className="h-12 px-4 w-full bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl text-gray-700 text-left">
                            <SelectValue placeholder="Select an option..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-[200px] overflow-y-auto">
                            <SelectItem value="Sales Inquiry">Sales Inquiry</SelectItem>
                            <SelectItem value="Product Demo">Product Demo</SelectItem>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Integration Support">Integration Support</SelectItem>
                            <SelectItem value="Implementation Request">Implementation Request</SelectItem>
                            <SelectItem value="Custom AI Solution">Custom AI Solution</SelectItem>
                            <SelectItem value="Partnership Inquiry">Partnership Inquiry</SelectItem>
                            <SelectItem value="Pricing & Plans">Pricing & Plans</SelectItem>
                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.message === 'Other' && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            Please specify <span className="text-primary">*</span>
                          </label>
                          <Input 
                            required 
                            name="otherMessage"
                            value={formData.otherMessage}
                            onChange={handleChange}
                            placeholder="Enter your specific inquiry" 
                            className="h-12 bg-gray-50 border-gray-200 hover:border-gray-300 focus-visible:ring-primary rounded-xl" 
                          />
                        </div>
                      )}

                      {/* Captcha Placeholder */}
                      <div className="flex items-center gap-4 bg-gray-50/80 border border-gray-200 p-3 pt-4 pb-4 rounded-xl w-full sm:w-[340px] shadow-sm">
                        <div className="flex items-center h-6">
                          <input 
                            id="captcha" 
                            type="checkbox" 
                            required 
                            className="w-7 h-7 border-2 border-gray-300 rounded bg-white focus:ring-2 focus:ring-primary focus:ring-offset-1 text-primary cursor-pointer transition-all"
                          />
                        </div>
                        <label htmlFor="captcha" className="text-[15px] font-medium text-gray-800 flex-1 cursor-pointer select-none">
                          I'm not a robot
                        </label>
                        <div className="flex flex-col items-center justify-center pl-3 border-l border-gray-200">
                          <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8 opacity-80" />
                          <div className="flex gap-1 mt-1 text-[9px] text-gray-500">
                            <Link href="/privacy-policy" className="hover:underline cursor-pointer">Privacy</Link>
                            <span>-</span>
                            <Link href="/terms-conditions" className="hover:underline cursor-pointer">Terms</Link>
                          </div>
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-sm font-medium text-red-500 text-center">{errorMessage}</p>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-bold transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
                      >
                       {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                       ) : (
                         <span className="flex items-center gap-2">
                           Book Your Demo <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                         </span>
                       )}
                      </Button>
                      
                      <p className="text-center text-xs text-gray-500 mt-4">
                        By submitting this form, you agree to our <a href="/terms-conditions" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <LandingPageFooter />
    </div>
  );
}
