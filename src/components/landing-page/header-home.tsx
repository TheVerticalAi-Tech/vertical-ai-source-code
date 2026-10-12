"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    Menu,
    X,
    Phone,
    Mail,
    MapPin,
    Globe,
    ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.png';
import menuIcon from '@/assets/menu-icon.png';

export const navAIAgents = [
    { name: "Maestro", desc: "Orchestration Brain", href: "/platform-detail", icon: Brain },
    { name: "Vocalis", desc: "Human-like Voice Agents", href: "/platform-detail", icon: Mic2 },
    { name: "Guardian", desc: "Compliance & Audit Agents", href: "/platform-detail", icon: ShieldCheck },
    { name: "Insights", desc: "Analytics & Intelligence Agents", href: "/platform-detail", icon: BarChart3 },
    { name: "Conversa", desc: "Intelligent Chat Agents", href: "/platform-detail", icon: MessagesSquare }
];

export const navIndustries = [
    { name: "BFSI", desc: "Banking, Financial Services & Insurance", icon: Landmark, href: "/industry-detail" },
    { name: "Healthcare", desc: "Patient care & medical automation", icon: Activity, href: "/industry-detail" },
    { name: "Telecom", desc: "Customer support & network insights", icon: PhoneCall, href: "/industry-detail" },
    { name: "E-commerce", desc: "Personalized shopping experiences", icon: ShoppingBag, href: "/industry-detail" },
    { name: "Real Estate", desc: "Property management & lead gen", icon: Home, href: "/industry-detail" },
    { name: "Automotive", desc: "Smart dealership & service agents", icon: Car, href: "/industry-detail" },
    { name: "EdTech", desc: "Adaptive learning & student support", icon: BookOpen, href: "/industry-detail" },
    { name: "BPO", desc: "Scaled operational efficiency", icon: Headset, href: "/industry-detail" },
    { name: "Microfinance", desc: "Inclusive financial technology", icon: Coins, href: "/industry-detail" },
    { name: "Travel", desc: "Itinerary planning & booking bots", icon: Plane, href: "/industry-detail" },
    { name: "HR Services", desc: "Automated recruitment & onboarding", icon: UserPlus, href: "/industry-detail" },
];

export const navWhyVerticalAI = [
    { name: "Framework", desc: "Our core AI methodology", href: "#", icon: Cpu },
    { name: "Case Studies", desc: "Success stories from partners", href: "#", icon: FileText },
    { name: "Testimonials", desc: "What our clients say", href: "#", icon: MessageCircle },
    { name: "Security", desc: "Enterprise-grade protection", href: "#", icon: Shield },
    { name: "Compliance", desc: "Meeting global standards", href: "#", icon: CheckCircle2 },
    { name: "Data Privacy", desc: "Your data stays yours", href: "#", icon: Lock },
    { name: "Governance", desc: "Full control & transparency", href: "#", icon: Landmark },
    { name: "Architecture", desc: "Scalable system design", href: "#", icon: Box },
];

export const navResources = [
    { name: "Whitepapers", desc: "In-depth technical guides", href: "#", icon: FileText },
    { name: "Webinars", desc: "Watch platform deep dives", href: "#", icon: Video },
    { name: "Blog", desc: "Latest AI news & insights", href: "#", icon: PenTool },
    { name: "Faq", desc: "Common questions answered", href: "#", icon: HelpCircle }
];

export const navCompany = [
    { name: "About us", desc: "Our mission and story", href: "/about-us", icon: Info },
    { name: "Leadership Team", desc: "The minds behind Vertical AI", href: "/leadership", icon: Users },
    { name: "Careers", desc: "Join our growing team", href: "/careers", icon: Briefcase },
    { name: "Support", desc: "24/7 technical assistance", href: "/support", icon: LifeBuoy }
];

export const navClients = [
    { name: "Success Stories", desc: "Real transformation results", href: "/case-studies", icon: FileText },
    { name: "Testimonials", desc: "What our clients say", href: "/testimonials", icon: MessageCircle },
    { name: "Partner Program", desc: "Build with Vertical AI", href: "/partners", icon: Users },
    { name: "Request Access", desc: "Start your journey", href: "/get-demo", icon: ArrowRight }
];

export const navReachUs = [
    { name: "Chat with Sales", desc: "Available 24/7", href: "/get-demo", icon: MessagesSquare },
    { name: "Email Us", desc: "info@thevertical.ai", href: "mailto:info@thevertical.ai", icon: Mail },
    { name: "Office", desc: "San Francisco, CA", href: "#", icon: MapPin },
    { name: "Support Center", desc: "Documentation & help", href: "/support", icon: LifeBuoy }
];

export const navPolicies = [
    { name: "Privacy Policy", desc: "How we handle data", href: "/privacy-policy", icon: Shield },
    { name: "Terms of Service", desc: "Legal agreement", href: "/terms-conditions", icon: FileText },
    { name: "Security Policy", desc: "Enterprise protection", href: "/security", icon: Lock },
    { name: "Cookie Policy", desc: "Usage transparency", href: "/cookies", icon: ShieldCheck }
];

interface HeaderProps {
    visible?: boolean;
}

export default function HeaderHome({ visible = true }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredOverlayMenu, setHoveredOverlayMenu] = useState<string>("Resources");
    const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const burgerMenuItems = [
        { key: "Resources", items: navResources },
        { key: "Company", items: navCompany },
        { key: "Clients", items: navClients },
        { key: "Reach Us", items: navReachUs },
        { key: "Policies", items: navPolicies }
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm border-b border-black/5' : 'bg-transparent'
                        }`}
                >
                    <div className="mx-auto px-16 py-2 flex justify-between items-center pointer-events-none">
                        {/* Left: Logo */}
                        <Link href="/" className="pointer-events-auto flex items-center h-full">
                            <img src={logo.src} alt="Vertical AI" className="h-16 w-auto object-contain" />
                        </Link>

                        {/* Right Container: Nav + Burger */}
                        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
                            {/* Navigation Menu */}
                            <nav className="hidden md:flex items-center gap-8 h-[58px]">
                                <div
                                    className="relative group h-full flex items-center"
                                    onMouseEnter={() => setIsSolutionsHovered(true)}
                                    onMouseLeave={() => setIsSolutionsHovered(false)}
                                >
                                    <button className={`text-xl font-medium transition-colors ${isSolutionsHovered ? 'text-[#007eff]' : 'text-gray-900'} relative overflow-hidden h-[1.5em] flex flex-col`}>
                                        <span className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                                            Solutions
                                        </span>
                                        <span className="absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-[#007eff]">
                                            Solutions
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {isSolutionsHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                                                className="absolute top-full right-[-300px] pt-4 z-[60]"
                                            >
                                                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-4 flex gap-4 w-[1100px]">
                                                    {/* Left Column: Solutions Blue Box */}
                                                    <div className="w-[35%] bg-gradient-to-b from-[#00b4ff] to-[#0177ff] rounded-[1.5rem] p-8 text-white relative overflow-hidden">
                                                        <div className="relative z-10">
                                                            <h3 className="text-3xl font-bold mb-8">Solutions</h3>
                                                            <div className="space-y-6">
                                                                {navAIAgents.map((item) => (
                                                                    <Link key={item.name} href={item.href} className="flex items-center gap-4 group/item">
                                                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover/item:bg-[#ff8a00] transition-all duration-300">
                                                                            <item.icon size={20} className="text-white" />
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <div className="relative overflow-hidden h-[1.3em] flex flex-col">
                                                                                <span className="text-base font-semibold transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                                                                                    {item.name}
                                                                                </span>
                                                                                <span className="absolute top-full text-base font-semibold transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                                                                                    {item.name}
                                                                                </span>
                                                                            </div>
                                                                            <span className="text-[10px] text-white/70">{item.desc}</span>
                                                                        </div>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                                    </div>

                                                    {/* Right Column: Industries */}
                                                    <div className="flex-1 p-6">
                                                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Industries</h3>
                                                        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                                                            {navIndustries.map((item) => (
                                                                <Link key={item.name} href={item.href} className="flex items-start gap-4 group/ind">
                                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/ind:text-[#007eff] group-hover/ind:bg-blue-50 transition-all">
                                                                        <item.icon size={20} />
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <div className="relative overflow-hidden h-[1.3em] flex flex-col">
                                                                            <span className="text-base font-semibold text-gray-900 group-hover/ind:text-[#007eff] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/ind:-translate-y-full">
                                                                                {item.name}
                                                                            </span>
                                                                            <span className="absolute top-full text-base font-semibold text-[#007eff] transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/ind:-translate-y-full">
                                                                                {item.name}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-[10px] text-gray-400 line-clamp-1">{item.desc}</span>
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Why Vertical AI Dropdown */}
                                <div className="relative group h-full flex items-center">
                                    <div className="flex text-xl items-center gap-1 text-base font-medium cursor-pointer transition-colors whitespace-nowrap relative overflow-hidden h-[1.5em] flex flex-col group">
                                        <span className="flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-gray-900">
                                            Why Vertical AI <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </span>
                                        <span className="absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-[#007eff]">
                                            Why Vertical AI <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                                        </span>
                                    </div>
                                    <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out w-[600px]">
                                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-2">
                                            {navWhyVerticalAI.map(item => (
                                                <Link key={item.name} href={item.href} className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                    <div className="mt-1 w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors shrink-0">
                                                        <item.icon size={20} className="text-gray-600 group-hover/item:text-primary transition-colors" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="relative overflow-hidden h-[1.3em] flex flex-col">
                                                            <span className="text-base font-semibold text-gray-900 group-hover/item:text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                                                                {item.name}
                                                            </span>
                                                            <span className="absolute top-full text-base font-semibold text-primary transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/item:-translate-y-full">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs text-gray-500 mt-0.5">{item.desc}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Link href="/insights" className="text-xl font-medium text-gray-900 relative overflow-hidden h-[1.5em] flex flex-col group">
                                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                                        Insights
                                    </span>
                                    <span className="absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-[#007eff]">
                                        Insights
                                    </span>
                                </Link>
                            </nav>

                            {/* Burger Menu */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="h-16  flex items-center gap-2 text-black hover:scale-105 transition-transform hover:text-primary cursor-pointer px-4"
                            >
                                <img src={menuIcon.src} alt="Menu" className="w-10 h-10 object-contain invert" />
                                <span className="text-xl font-medium uppercase">Menu</span>
                            </button>
                        </div>
                    </div>

                    {/* Full Page Burger Overlay */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-white/50 backdrop-blur-xl z-[100] flex items-center justify-center pointer-events-auto overflow-hidden"
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="absolute top-8 right-8 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-all hover:bg-primary hover:text-white cursor-pointer z-[110]"
                                >
                                    <X size={24} />
                                </button>

                                <div className="w-full max-w-7xl mx-auto h-screen flex relative z-10 gap-12 md:gap-10 items-center overflow-hidden">

                                    {/* Column 1: Contact Info */}
                                    <div className="hidden lg:flex w-1/4 flex-col justify-center space-y-12 border-r border-black/5 pr-12 h-fit">
                                        <div>
                                            <h3 className="text-sm uppercase font-medium mb-4 text-black/40 font-outfit">Send a message</h3>
                                            <p className="text-lg text-black hover:text-primary cursor-pointer font-outfit font-medium transition-colors">info@thevertical.ai</p>
                                            <p className="text-lg text-black hover:text-primary cursor-pointer font-outfit font-medium transition-colors">info@thevertical.ai</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm uppercase font-medium mb-4 text-black/40 font-outfit">Call Us</h3>
                                            <p className="text-lg text-black font-outfit font-medium">+1 234 567 8910</p>
                                            <p className="text-lg text-black font-outfit font-medium">+1 987 654 3210</p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm uppercase font-medium mb-4 text-black/40 font-outfit">Visit Us</h3>
                                            <p className="text-lg text-black font-outfit font-medium leading-relaxed">
                                                Vertical AI HQ<br />
                                                123 Tech Park, Innovation Way<br />
                                                Silicon Valley, CA 94025
                                            </p>
                                        </div>
                                    </div>

                                    {/* Column 2: Categories */}
                                    <div className="w-full lg:w-[30%] flex flex-col border-r border-black/5 lg:pr-12 py-12 shrink-0 h-fit">
                                        <div className="flex items-center gap-3 mb-10">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                            <span className="text-base font-bold tracking-[0.2em] uppercase text-black/60">EXPLORE</span>
                                        </div>
                                        <div className="flex flex-col gap-6 md:gap-8">
                                            {burgerMenuItems.map((menu) => (
                                                <div
                                                    key={menu.key}
                                                    onMouseEnter={() => setHoveredOverlayMenu(menu.key)}
                                                    className="group flex items-center gap-6 cursor-pointer w-fit"
                                                >
                                                    <div className="relative overflow-hidden flex flex-col">
                                                        <span className={`text-3xl md:text-5xl font-medium tracking-tighter leading-[1.1] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full ${hoveredOverlayMenu === menu.key ? 'text-black' : 'text-black/40'}`}>
                                                            {menu.key.toUpperCase()}
                                                        </span>
                                                        <span className={`absolute top-full text-3xl md:text-5xl font-medium tracking-tighter leading-[1.1] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-primary`}>
                                                            {menu.key.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    {hoveredOverlayMenu === menu.key && (
                                                        <motion.div layoutId="arrow-nav" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                                            <ArrowRight size={32} className="rotate-[-45deg] text-primary" />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 3: Detailed Items */}
                                    <div className="flex-1 h-full py-20 overflow-y-auto hidden lg:block custom-scrollbar">
                                        <div className="min-h-full flex items-center">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={hoveredOverlayMenu}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                                                    className="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 w-full p-4"
                                                >
                                                    {burgerMenuItems.find(m => m.key === hoveredOverlayMenu)?.items.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="group flex flex-col gap-4 p-6 rounded-[2rem] bg-black/5 hover:bg-white transition-all duration-500 border border-black/5 hover:border-primary/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                                                    <item.icon size={22} className="text-primary group-hover:text-white transition-colors" />
                                                                </div>
                                                                <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 rotate-[-45deg] text-primary" />
                                                            </div>
                                                            <div className="mt-1">
                                                                <div className="relative overflow-hidden flex flex-col">
                                                                    <span className="text-xl font-semibold  transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-black">
                                                                        {item.name}
                                                                    </span>
                                                                    <span className="absolute top-full text-xl font-semibold  transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-primary">
                                                                        {item.name}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-black/50 mt-2 line-clamp-2 leading-relaxed">{item.desc}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
