"use client"

import Link from "next/link"
import { Facebook, Linkedin, Instagram } from "lucide-react"
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import Image from "next/image";
import AdLogo from "@/assets/white-logo.png";
import { usePlatformNavItems } from "@/lib/use-platform-nav";
import { useIndustryNavItems } from "@/lib/use-industry-nav";

const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LandingPageFooter = () => {
  const navPlatformOs = usePlatformNavItems();
  const navIndustries = useIndustryNavItems();

  return (
    // <footer className="bg-black relative overflow-hidden text-white pb-8 px- sm:px-6 md:px-12 border-t border-white/10">
    <footer className="bg-black relative overflow-hidden text-white pt-16 sm:pt-20 2xl:pt-28 pb-8 2xl:pb-12 px-6 md:px-12 2xl:px-16 border-t border-white/10">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10 2xl:gap-14 mb-12 2xl:mb-16">
        {/* Brand Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 space-y-5 2xl:space-y-7">
          <Link href="/" className="inline-block">
            <Image
              src={AdLogo}
              alt="The Vertical AI"
              width={180}
              height={50}
              className="w-auto h-10 sm:h-12 2xl:h-14"
            />
          </Link>
          <p className="text-gray-400 text-base sm:text-lg 2xl:text-xl leading-relaxed max-w-sm 2xl:max-w-md">
            AI-Native Enterprise OS built for transformation. 
          </p>
          <div className="flex gap-3 sm:gap-4">
            <Link href="https://www.linkedin.com/company/theverticalai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn" className="bg-white/5 p-2.5 2xl:p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
            </Link>
            <Link href="https://x.com/thevertical_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X" className="bg-white/5 p-2.5 2xl:p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <XIcon className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
            </Link>
            <Link href="https://www.instagram.com/theverticalai?igsh=MWF6Nmh5czd2Y2tiMQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram" className="bg-white/5 p-2.5 2xl:p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
            </Link>
            <Link href="https://www.facebook.com/share/18RtkBonFh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook" className="bg-white/5 p-2.5 2xl:p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-6 2xl:h-6" />
            </Link>
          </div>
        </div>

        {/* Links Column 1: Platform OS */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-bold text-base sm:text-lg 2xl:text-xl text-white">Platform OS</h3>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base 2xl:text-lg text-gray-400">
            {navPlatformOs.map((item) => (
              <li key={item.name}><Link href={item.href} className="hover:text-white transition-colors">{item.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Links Column 2: Industries */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-bold text-base sm:text-lg 2xl:text-xl text-white">Industries</h3>
          <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base 2xl:text-lg text-gray-400">
            {navIndustries.map((item) => (
              <li key={item.name}><Link href={item.href} className="hover:text-white transition-colors">{item.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Links Column 3: Company */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-bold text-base sm:text-lg 2xl:text-xl text-white">Company</h3>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base 2xl:text-lg text-gray-400">
            <li><Link href="/about-us" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/support" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Links Column 4: Legal */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="font-bold text-base sm:text-lg 2xl:text-xl text-white">Legal</h3>
          <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base 2xl:text-lg text-gray-400">
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
            <li><Link href="/terms-conditions" className="hover:text-white transition-colors">Terms</Link></li>
            <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm 2xl:text-base text-gray-500 pt-8 border-t border-white/10 relative z-10">
        © {new Date().getFullYear()} The Vertical AI. All rights reserved.
      </div>

      {/* Large Watermark Text */}
      <div className="h-[6rem] sm:h-[10rem] md:h-[16rem] 2xl:h-[22rem] flex items-center max-w-7xl 2xl:max-w-[1600px] mx-auto justify-center -mb-16 sm:-mb-20 md:-mb-28 2xl:-mb-36 pointer-events-none relative z-0">
        <TextHoverEffect text="The Vertical AI" />
      </div>
    </footer>
  )
}

export default LandingPageFooter;
