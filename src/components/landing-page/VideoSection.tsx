"use client";

import React from "react";
import { Play, Pause } from "lucide-react";
import thumbnile from "@/assets/Landing-page/thumbnail.jpg"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Path corrected to include basePath as per next.config.ts
  const videoPath = "/vertical-ai/platform-detail.mp4";

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);

    // Hide controls after 2.5 seconds of inactivity
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isPaused) setShowControls(false);
    }, 2500);
  };

  React.useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <section
      className="relative z-10 overflow-hidden bg-white group/video-container"
      onMouseMove={handleMouseMove}
    >
      {/* Container with specific original library offsets */}
      <div className="xl:ml-[calc((100%-1100px)/2)] lg:ml-[calc((100%-900px)/2)]">
        <div className="relative py-[200px] md:py-[240px] lg:py-[260px] overflow-hidden min-h-[400px]">
          {/* Background Image with Overlay */}
          {!isPlaying ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
                style={{ backgroundImage: `url(${thumbnile.src})` }}
              >
                {/* Dark Overlay (RGBA 0.6 as per CSS) */}
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Video Button Center */}
              <div className="relative z-10 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="group relative flex items-center justify-center w-[93px] h-[93px] bg-white text-primary rounded-full transition-all duration-500 hover:bg-primary hover:text-white"
                >
                  {/* Lucide Play Icon */}
                  <Play size={35} fill="currentColor" stroke="none" className="relative z-10" />

                  {/* Ripple Animations (Matching the original 'pulse' animation) */}
                  <span className="absolute inset-0 rounded-full animate-[pulse_3s_infinite_0.6s] shadow-[0_0_0_0_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_0_0_rgba(245,200,53,0.7)]" />
                  <span className="absolute inset-0 rounded-full animate-[pulse_3s_infinite_0.9s] shadow-[0_0_0_0_rgba(255,255,255,0.7)] group-hover:shadow-[0_0_0_0_rgba(245,200,53,0.7)]" />
                </button>
              </div>

              {/* WATCH - Right-aligned outline text */}
              <h3 className="absolute top-[38px] left-[60px] max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[46px] text-[100px] md:text-[80px] sm:text-[65px] text-[50px] font-bold uppercase leading-tight text-transparent outline-title pointer-events-none font-sora">
                WATCH
              </h3>
              {/* VIDEO - Left-aligned outline text */}
              <h3 className="absolute bottom-[32px] right-[60px] max-md:right-auto max-md:left-1/2 max-md:-translate-x-1/2 max-md:bottom-[42px] text-[100px] md:text-[80px] sm:text-[65px] text-[50px] font-bold uppercase leading-tight text-transparent outline-title pointer-events-none font-sora">
                VIDEO
              </h3>
            </>
          ) : (
            <div
              className="absolute inset-0 bg-black"
              onClick={togglePause}
            >
              <video
                ref={videoRef}
                src={videoPath}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                onPlay={() => setIsPaused(false)}
                onPause={() => setIsPaused(true)}
              />

              {/* Overlay Play/Pause Button - shows on hover or action */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${showControls || isPaused ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-[80px] h-[80px] bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center border border-white/30">
                  {isPaused ? (
                    <Play size={32} fill="currentColor" stroke="none" />
                  ) : (
                    <Pause size={32} fill="currentColor" stroke="none" />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Corner Shape (visible only on desktop >= 1200px) */}
      <div className="hidden xl:block absolute top-0 left-0 w-[calc((100%-1100px)/2)] h-[275px] pointer-events-none">
        <div className="absolute inset-0 bg-primary" style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }} />
        <div className="absolute inset-0 bg-accent" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
      </div>

      <style jsx>{`
        .outline-title {
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: #ffffff;
        }
        @media (max-width: 767px) {
          .outline-title {
            -webkit-text-stroke-width: 1px;
          }
        }
        @keyframes pulse {
          70% {
            box-shadow: 0 0 0 50px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </section>
  );
}
