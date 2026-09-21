"use client";

import { useEffect, useState } from "react";

export default function OrbDNALoader({ onComplete }: { onComplete?: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(() => onComplete?.(), 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  // Generate DNA strand dots
  const strandCount = 18;
  const dots = Array.from({ length: strandCount });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050d1a]"
      style={{
        transition: "opacity 0.5s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Orb glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            background: "radial-gradient(circle at 38% 38%, #4f8ef7 0%, #1F3F74 55%, #0a1a3a 100%)",
            boxShadow: "0 0 60px 20px rgba(79,142,247,0.35), 0 0 120px 40px rgba(31,63,116,0.2)",
            animation: "orbPulse 2s ease-in-out infinite",
          }}
        />

        {/* DNA helix strands */}
        <svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          className="absolute"
          style={{ animation: "dnaRotate 3s linear infinite" }}
        >
          {dots.map((_, i) => {
            const angle = (i / strandCount) * Math.PI * 4; // two full helices
            const progress = i / strandCount;
            const cx1 = 96 + Math.cos(angle) * 72;
            const cy1 = 16 + progress * 160;
            const cx2 = 96 + Math.cos(angle + Math.PI) * 72;
            const cy2 = cy1;
            const r = 4 + Math.abs(Math.cos(angle)) * 2;
            const opacity = 0.5 + Math.abs(Math.cos(angle)) * 0.5;
            return (
              <g key={i}>
                <circle cx={cx1} cy={cy1} r={r} fill="#4f8ef7" opacity={opacity} />
                <circle cx={cx2} cy={cy2} r={r} fill="#e2612d" opacity={opacity} />
                {/* connector */}
                <line
                  x1={cx1} y1={cy1} x2={cx2} y2={cy2}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 60px 20px rgba(79,142,247,0.35); }
          50% { transform: scale(1.08); box-shadow: 0 0 90px 35px rgba(79,142,247,0.5); }
        }
        @keyframes dnaRotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
