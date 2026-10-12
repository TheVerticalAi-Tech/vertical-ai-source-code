"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
}

// ─── Data (fetched from /api/platforms) ──────────────────────────────────────

function usePlatformServices(): ServiceItem[] {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/api/public/platform-os`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.platforms)) {
          const mapped: ServiceItem[] = json.platforms
            .filter((p: any) => p.status === "published")
            .map((p: any, i: number) => {
            const subtitle = (p.heroTitle || "").replace(/^The\s+/i, "").replace(/\s+OS$/i, "");
            return {
              id: i + 1,
              title: subtitle ? `${p.name} OS - ${subtitle}` : `${p.name} OS`,
              description: p.heroDescription || "",
              imageSrc: p.heroImageUrl,
              imageAlt: `${p.name} OS`,
              url: `/platform/${p.slug}`,
            };
          });
          setServices(mapped);
        }
      })
      .catch(console.error);
  }, []);

  return services;
}

// ─── Service Card ────────────────────────────────────────────────────────────

function ServiceCard({
  item,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave
}: {
  item: ServiceItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <Link
      href={item.url || "#"}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`
        group relative flex-shrink-0 overflow-hidden cursor-pointer
        w-screen md:[width:clamp(300px,30vw,480px)] 2xl:[width:clamp(420px,26vw,620px)] h-[80vh] md:h-screen
        text-center no-underline text-inherit bg-[#0a0a0a]
      `}
    >
      <div
        className={`
          absolute inset-0 w-full h-full transition-all duration-700
          ${isAnyHovered && !isHovered ? 'md:blur-[10px] md:scale-[1.05] md:opacity-70 blur-0 scale-100 opacity-100' : 'blur-0 scale-100 opacity-100'}
        `}
      >
        {/* Background image with zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1536px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 transition-colors duration-700 z-10" />
        </div>

        {/* Title + description at bottom */}
        <div
          className="
            absolute bottom-0 left-0 right-0 z-20
            px-5 sm:px-6 md:px-[clamp(16px,2vw,26px)] 2xl:px-8 pb-[clamp(36px,6vh,72px)] 2xl:pb-24 pt-24 sm:pt-32
            flex flex-col items-center text-center
            bg-gradient-to-t from-transparent to-transparent
            group-hover:from-primary group-hover:to-transparent
            transition-all duration-700
          "
        >
          {/* Title: visible initially, moves up slightly on hover */}
          {(() => {
            const [mainTitle, subTitle] = item.title.split(" - ");
            return (
              <div className="w-full flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                <h2 className="font-bold text-xl sm:text-2xl md:text-[clamp(22px,2.2vw,30px)] 2xl:text-3xl leading-tight text-white m-0 tracking-tight">
                  {mainTitle}
                </h2>
                {subTitle && (
                  <span className="text-xs sm:text-sm md:text-[clamp(13px,1vw,16px)] 2xl:text-lg text-white/90 mt-1">
                    {subTitle}
                  </span>
                )}
              </div>
            );
          })()}

          {/* Description: expands and fades in on hover */}
          <div className="max-h-0 sm:max-h-0 opacity-0 group-hover:max-h-[220px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden mt-2">
            <p className="font-sans text-xs sm:text-sm md:text-[clamp(13px,1vw,16px)] 2xl:text-base text-white/90 leading-relaxed m-0 tracking-tight max-w-sm 2xl:max-w-md">
              {item.description}
            </p>
          </div>
        </div>

        {/* Subtle border on hover */}
        <div className="absolute inset-0 z-30 border border-transparent group-hover:border-white/30 transition-colors duration-400 pointer-events-none" />
      </div>
    </Link>
  );
}


// ─── Horizontal Scroll Header Panel ─────────────────────────────────────────

function HorizontalScrollHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 50 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <div
      ref={ref}
      className="
        flex-shrink-0 flex flex-col justify-center items-start text-start gap-6 2xl:gap-8
        w-screen md:[width:clamp(320px,36vw,560px)] 2xl:[width:clamp(460px,30vw,680px)] h-auto py-16 md:h-screen md:py-[clamp(24px,4vw,80px)]
        px-6 md:px-[clamp(24px,4vw,64px)] 2xl:px-16
        bg-white
      "
      aria-label="Services header"
    >

      {/* Middle: big headline */}
      <motion.div {...fadeUp(0.15)}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl leading-[1.15] tracking-tight text-gray-700 m-0">
          AI{" "}in{" "}
          <span className="text-primary font-semibold">Action</span>
        </h2>
      </motion.div>

      {/* Bottom: subtitle */}
      <motion.div {...fadeUp(0.3)}>
        <p className="font-sans font-normal text-sm sm:text-base md:text-[clamp(14px,1.2vw,18px)] 2xl:text-xl leading-relaxed text-gray-500 m-0 max-w-lg 2xl:max-w-xl">
          Real AI deployments across BFSI, Healthcare, Real Estate, Telecom, and EdTech - each use case battle-tested to drive measurable outcomes from day one.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ServicesHorizontalScroll() {
  const services = usePlatformServices();
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const calcScroll = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxScroll(Math.max(0, totalWidth - viewportWidth));
      }
    };

    calcScroll();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      resizeObserver = new ResizeObserver(() => calcScroll());
      resizeObserver.observe(trackRef.current);
    }

    window.addEventListener("resize", calcScroll);
    const t1 = setTimeout(calcScroll, 150);
    const t2 = setTimeout(calcScroll, 600);

    return () => {
      window.removeEventListener("resize", calcScroll);
      resizeObserver?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Inertia spring physics for buttery smooth continuous horizontal glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
    restDelta: 0.0001
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -maxScroll]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white w-full h-auto md:h-[350vh]"
      aria-label="Our Services"
      id="services"
    >
      {/* Sticky screen container */}
      <div className="relative md:sticky top-0 h-auto md:h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Horizontally translated track on desktop/tablet */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex flex-col md:flex-row flex-nowrap w-full md:w-max min-h-screen md:h-screen will-change-transform"
        >
          {/* Left header panel */}
          <HorizontalScrollHeader />

          {/* Service cards */}
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              isHovered={hoveredId === item.id}
              isAnyHovered={hoveredId !== null}
              onHover={() => setHoveredId(item.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
