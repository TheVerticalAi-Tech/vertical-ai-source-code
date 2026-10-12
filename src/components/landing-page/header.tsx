"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Brain,
  Mic2,
  ShieldCheck,
  BarChart3,
  MessagesSquare,
  Cpu,
  FileText,
  MessageCircle,
  Shield,
  CheckCircle2,
  Lock,
  Landmark,
  Box,
  Video,
  PenTool,
  HelpCircle,
  Info,
  Users,
  Briefcase,
  LifeBuoy,
  Activity,
  PhoneCall,
  ShoppingBag,
  Home,
  Car,
  BookOpen,
  Headset,
  Coins,
  Plane,
  UserPlus,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { usePlatformNavItems } from "@/lib/use-platform-nav";
import { useIndustryNavItems } from "@/lib/use-industry-nav";

const platformIcons = [Brain, Mic2, ShieldCheck, BarChart3, MessagesSquare, Cpu];
const industryIcons = [Landmark, Activity, PhoneCall, ShoppingBag, Car, BookOpen, Headset, Coins, Plane, UserPlus];

export const navWhyTheVerticalAI = [
  {
    name: "Framework",
    desc: "Our core AI methodology",
    href: "/why-us/framework",
    icon: Cpu,
  },
  {
    name: "Case Studies",
    desc: "Success stories from partners",
    href: "/case-studies",
    icon: FileText,
  },
  {
    name: "Testimonials",
    desc: "What our clients say",
    href: "/testimonials",
    icon: MessageCircle,
  },
  {
    name: "Security",
    desc: "Enterprise-grade protection",
    href: "/why-us/security",
    icon: Shield,
  },
  {
    name: "Compliance",
    desc: "Meeting global standards",
    href: "/why-us/compliance",
    icon: CheckCircle2,
  },
  {
    name: "Data Privacy",
    desc: "Your data stays yours",
    href: "/privacy-policy",
    icon: Lock,
  },
  {
    name: "Philosophy",
    desc: "Engineering the 10x Future",
    href: "/why-us/philosophy",
    icon: Zap,
  },
  {
    name: "Architecture",
    desc: "Scalable system design",
    href: "/why-us/architecture",
    icon: Box,
  },
];

export const navResources = [
  // { name: "Whitepapers", desc: "In-depth technical guides", href: "#", icon: FileText },
  // { name: "Webinars", desc: "Watch platform deep dives", href: "#", icon: Video },
  {
    name: "Blog",
    desc: "Latest AI news & insights",
    href: "/blog",
    icon: PenTool,
  },
  {
    name: "Faq",
    desc: "Common questions answered",
    href: "/faq",
    icon: HelpCircle,
  },
];

export const navCompany = [
  {
    name: "About us",
    desc: "Our mission and story",
    href: "/about-us",
    icon: Info,
  },
  {
    name: "Leadership Team",
    desc: "The minds behind The Vertical AI",
    href: "/team",
    icon: Users,
  },
  {
    name: "Careers",
    desc: "Join our growing team",
    href: "/careers",
    icon: Briefcase,
  },
  {
    name: "Support",
    desc: "24/7 technical assistance",
    href: "/support",
    icon: LifeBuoy,
  },
];

interface HeaderProps {
  visible?: boolean;
}

export default function Header({ visible = true }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const navPlatformOs = usePlatformNavItems();
  const navIndustries = useIndustryNavItems();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(
    "platform",
  );
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);

  const handleNavClick = (href: string) => {
    setNavigating(true);
    setHoveredDropdown(null);
    router.push(href);
    setTimeout(() => setNavigating(false), 300);
  };

  const toggleAccordion = (accordionName: string) => {
    setActiveAccordion(
      activeAccordion === accordionName ? null : accordionName,
    );
  };

  const getDefaultAccordion = (path: string) => {
    if (path.includes("/platform/")) {
      return "platform";
    }
    if (path.includes("/industry/")) {
      return "industries";
    }
    if (
      path.includes("/why-us") ||
      path.includes("/case-studies") ||
      path.includes("/testimonials") ||
      path.includes("/privacy-policy")
    ) {
      return "why-us";
    }
    if (path.includes("/blog") || path.includes("/faq")) {
      return "resources";
    }
    if (
      path.includes("/about-us") ||
      path.includes("/team") ||
      path.includes("/careers") ||
      path.includes("/support")
    ) {
      return "company";
    }
    return "platform"; // Default fallback
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredDropdown(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open, and open the active accordion based on path
  useEffect(() => {
    if (mobileMenuOpen) {
      setActiveAccordion(getDefaultAccordion(pathname || ""));
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-[999999] px-6 py-3 flex items-center gap-4 pointer-events-none transition-all duration-300 ${
            scrolled && !mobileMenuOpen
              ? "bg-white backdrop-blur-md shadow-sm"
              : "bg-transparent"
          }`}
        >
          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-0 bg-white pointer-events-auto flex flex-col pt-24 pb-12 overflow-hidden"
              >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40"></div>

                <div className="relative flex-1 overflow-y-auto px-6">
                  <div className="max-w-xl mx-auto divide-y divide-gray-100">
                    {/* Platform OS Accordion */}
                    <div className="py-2">
                      <button
                        onClick={() => toggleAccordion("platform")}
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-base font-bold text-primary">
                          Platform OS
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-300 ${activeAccordion === "platform" ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === "platform" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 pb-6 pt-2">
                              {navPlatformOs.map((item, idx) => {
                                const Icon = platformIcons[idx % platformIcons.length];
                                return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="group flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                    <Icon
                                      size={16}
                                      className="text-gray-400 group-hover:text-primary transition-colors"
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                                    {item.name}
                                  </span>
                                </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Industries Accordion */}
                    <div className="py-2">
                      <button
                        onClick={() => toggleAccordion("industries")}
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-base font-bold text-primary">
                          Industries
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-300 ${activeAccordion === "industries" ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === "industries" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 pb-6 pt-2">
                              {navIndustries.map((item, idx) => {
                                const Icon = industryIcons[idx % industryIcons.length];
                                return (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="group flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                    <Icon
                                      size={16}
                                      className="text-gray-400 group-hover:text-primary transition-colors"
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors truncate">
                                    {item.name}
                                  </span>
                                </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Why Us Accordion */}
                    <div className="py-2">
                      <button
                        onClick={() => toggleAccordion("why-us")}
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-base font-bold text-primary">
                          Why The Vertical AI
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-300 ${activeAccordion === "why-us" ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === "why-us" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-2 gap-y-4 gap-x-6 pb-6 pt-2">
                              {navWhyTheVerticalAI.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="group flex items-center gap-3"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                    <item.icon
                                      size={16}
                                      className="text-gray-400 group-hover:text-primary transition-colors"
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                                    {item.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Resources Accordion */}
                    <div className="py-2">
                      <button
                        onClick={() => toggleAccordion("resources")}
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-base font-bold text-primary">
                          Resources
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-300 ${activeAccordion === "resources" ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === "resources" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pb-6 pt-2 pl-2">
                              {navResources.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-sm font-semibold text-gray-600 hover:text-primary py-1"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Company Accordion */}
                    <div className="py-2">
                      <button
                        onClick={() => toggleAccordion("company")}
                        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      >
                        <span className="text-base font-bold text-primary">
                          Company
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-500 transition-transform duration-300 ${activeAccordion === "company" ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeAccordion === "company" && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pb-6 pt-2 pl-2">
                              {navCompany.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-sm font-semibold text-gray-600 hover:text-primary py-1"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Footer */}
                <div className="px-8 mt-auto pt-8 border-t border-gray-100">
                  <div className="max-w-xl mx-auto flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-primary font-bold mb-1">
                          Get in Touch
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          info@thevertical.ai
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        router.push("/get-demo");
                      }}
                      className="w-full py-2 sm:py-3 px-4 sm:px-5 rounded-2xl bg-primary text-white font-bold text-xs sm:text-base hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-primary/20 cursor-pointer whitespace-nowrap"
                    >
                      Talk to an Expert{" "}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Left: Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="relative z-50 pointer-events-auto flex items-center text-white rounded-full h-[48px] mr-auto"
          >
            <img
              src={logo.src}
              alt="Vertical AI"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Right: Navigation Menu */}
          <nav className="pointer-events-auto hidden lg:flex items-center px-2 xl:px-8 py-2 h-[48px]">
            <ul className="flex items-center space-x-3 xl:space-x-8 text-sm font-medium text-gray-900">
              {/* Platform OS Dropdown */}
              <li
                className="relative group px-2 py-3"
                onMouseEnter={() => setHoveredDropdown("platform")}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <div className="flex items-center gap-1 text-base cursor-pointer hover:text-primary transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em]">
                  <span
                    className={`flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredDropdown === "platform" ? "-translate-y-full" : ""}`}
                  >
                    Platform OS{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "platform" ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-primary ${hoveredDropdown === "platform" ? "-translate-y-full" : ""}`}
                  >
                    Platform OS{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "platform" ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-in-out w-[280px] ${hoveredDropdown === "platform" && !navigating ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-1 relative overflow-hidden">
                    {navPlatformOs.map((item, idx) => {
                      const Icon = platformIcons[idx % platformIcons.length];
                      return (
                      <div
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                          <Icon
                            size={20}
                            className="text-gray-600 group-hover/item:text-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="relative overflow-hidden flex flex-col">
                            <span className="text-base font-semibold text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                            <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </li>

              {/* Industries Mega Menu */}
              <li
                className="relative group px-2 py-3"
                onMouseEnter={() => setHoveredDropdown("industries")}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <div className="flex items-center gap-1 text-base cursor-pointer hover:text-primary transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em]">
                  <span
                    className={`flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredDropdown === "industries" ? "-translate-y-full" : ""}`}
                  >
                    Industries{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "industries" ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-primary ${hoveredDropdown === "industries" ? "-translate-y-full" : ""}`}
                  >
                    Industries{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "industries" ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-in-out w-[800px] ${hoveredDropdown === "industries" && !navigating ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative overflow-hidden">
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                      {navIndustries.map((item, idx) => {
                        const Icon = industryIcons[idx % industryIcons.length];
                        return (
                        <div
                          key={item.name}
                          onClick={() => handleNavClick(item.href)}
                          className="group/item flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors shrink-0">
                            <Icon
                              size={20}
                              className="text-gray-600 group-hover/item:text-primary transition-colors"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="relative overflow-hidden flex flex-col">
                              <span className="text-base font-semibold text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full truncate">
                                {item.name}
                              </span>
                              <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full truncate">
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                              {item.desc}
                            </span>
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </li>

              {/* Why Vertical AI Dropdown */}
              <li
                className="relative group px-2 py-3"
                onMouseEnter={() => setHoveredDropdown("why")}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <div className="flex items-center gap-1 text-base cursor-pointer hover:text-primary transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em]">
                  <span
                    className={`flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredDropdown === "why" ? "-translate-y-full" : ""}`}
                  >
                    Why The Vertical AI{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "why" ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-primary ${hoveredDropdown === "why" ? "-translate-y-full" : ""}`}
                  >
                    Why The Vertical AI{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "why" ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-in-out w-[600px] ${hoveredDropdown === "why" && !navigating ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-2">
                    {navWhyTheVerticalAI.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors shrink-0">
                          <item.icon
                            size={20}
                            className="text-gray-600 group-hover/item:text-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="relative overflow-hidden flex flex-col">
                            <span className="text-base font-semibold text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                            <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li
                className="relative group px-2 py-3"
                onMouseEnter={() => setHoveredDropdown("resources")}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <div className="flex items-center gap-1 text-base cursor-pointer hover:text-primary transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em]">
                  <span
                    className={`flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredDropdown === "resources" ? "-translate-y-full" : ""}`}
                  >
                    Resources{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "resources" ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-primary ${hoveredDropdown === "resources" ? "-translate-y-full" : ""}`}
                  >
                    Resources{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "resources" ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-in-out w-[280px] ${hoveredDropdown === "resources" && !navigating ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1">
                    {navResources.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                          <item.icon
                            size={20}
                            className="text-gray-600 group-hover/item:text-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="relative overflow-hidden flex flex-col">
                            <span className="text-base font-semibold text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                            <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              {/* Company Dropdown */}
              <li
                className="relative group px-2 py-3"
                onMouseEnter={() => setHoveredDropdown("company")}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <div className="flex items-center gap-1 text-base cursor-pointer hover:text-primary transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em]">
                  <span
                    className={`flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${hoveredDropdown === "company" ? "-translate-y-full" : ""}`}
                  >
                    Company{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "company" ? "rotate-180" : ""}`}
                    />
                  </span>
                  <span
                    className={`absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] text-primary ${hoveredDropdown === "company" ? "-translate-y-full" : ""}`}
                  >
                    Company{" "}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${hoveredDropdown === "company" ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-in-out w-[280px] ${hoveredDropdown === "company" && !navigating ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col gap-1">
                    {navCompany.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                          <item.icon
                            size={20}
                            className="text-gray-600 group-hover/item:text-primary transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="relative overflow-hidden flex flex-col">
                            <span className="text-base font-semibold text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                            <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 mt-0.5">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          {/* Right: CTA & Mobile Toggle */}
          <div className="relative z-50 flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => router.push("/get-demo")}
              className="hidden sm:flex items-center gap-2 bg-primary text-white rounded-2xl px-5 py-2.5 text-base font-bold hover:!bg-none hover:!bg-black hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-primary/20 cursor-pointer pointer-events-auto h-[44px] whitespace-nowrap"
            >
              Talk to an Expert <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden items-center justify-center w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 text-gray-900 hover:bg-white transition-all shadow-sm"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
