"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lerp helper
const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

// Color interpolation helper
const lerpColor = (c1: number[], c2: number[], f: number) => [
  Math.round(lerp(c1[0], c2[0], f)),
  Math.round(lerp(c1[1], c2[1], f)),
  Math.round(lerp(c1[2], c2[2], f))
];

// Rgba converter
const rgba = (rgb: number[], a: number) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

const W = 220, H = 220, cx = W / 2, cy = H / 2;
const OR = [255, 105, 0], BL = [0, 165, 255];
const HALF = 90, BASE_AMP = 30, TURNS = 1.5, NODES = 18, RUNGS = 10;
const SURGE_TURNS = 3.8;
const SINE_AMP = 36, SINE_FREQ = 2.0;

export default function ChatbotWidget() {
  const [mounted, setMounted] = useState(false);
  const [currentState, setCurrentState] = useState<'idle' | 'speaking' | 'thinking' | 'response'>('thinking');
  const [showControls, setShowControls] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation variables held in refs to achieve smooth 60fps frame rate without unnecessary state re-renders
  const stateRef = useRef<'idle' | 'speaking' | 'thinking' | 'response'>('thinking');
  const weavePhaseRef = useRef<string>('idle');
  const weaveTurnsRef = useRef<number>(TURNS);
  const phaseRef = useRef<number>(0);
  const settleTargetRef = useRef<number>(0);
  const speakTRef = useRef<number>(0);
  const morphAmtRef = useRef<number>(0);
  const waveTRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);

    // Find and hide Mozhi's launcher button (it has no id/class, identified by aria-label)
    const hideMozhiLauncher = () => {
      const btn = Array.from(document.querySelectorAll<HTMLElement>('button[style*="position:fixed"], button[style*="position: fixed"]'))
        .find(el => el.style.bottom && el.style.right && el.tagName === 'BUTTON' && !el.getAttribute('aria-label')?.includes('Close'));
      if (btn) {
        btn.style.setProperty('display', 'none', 'important');
      }
    };

    const observer = new MutationObserver(hideMozhiLauncher);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const handleOrbClick = () => {
    // Load Mozhi script on first click if not already loaded
    if (!document.querySelector('script[src*="mozhi.thevertical.ai/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://mozhi.thevertical.ai/embed.js';
      script.setAttribute('data-org', '07bc955d082f47fba62abe45200e340c');
      script.setAttribute('data-agent', '7268ff06c1f84938a420046111229f4c');
      script.setAttribute('data-accent', '#0f172a');
      script.async = true;
      script.onload = () => {
        // After script loads, find and click the launcher button
        setTimeout(() => {
          const btn = Array.from(document.querySelectorAll<HTMLElement>('button[style*="position:fixed"], button[style*="position: fixed"]'))
            .find(el => el.style.bottom && el.style.right && !el.getAttribute('aria-label')?.includes('Close'));
          if (btn) {
            btn.style.removeProperty('display');
            btn.click();
            btn.style.setProperty('display', 'none', 'important');
          }
        }, 500);
      };
      document.body.appendChild(script);
      return;
    }

    // Script already loaded — just open/close the chat
    const btn = Array.from(document.querySelectorAll<HTMLElement>('button[style*="position:fixed"], button[style*="position: fixed"]'))
      .find(el => el.style.bottom && el.style.right && !el.getAttribute('aria-label')?.includes('Close'));
    if (btn) {
      btn.style.removeProperty('display');
      btn.click();
      btn.style.setProperty('display', 'none', 'important');
    }
  };

  useEffect(() => {
    if (!mounted) return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const frame = () => {
      const state = stateRef.current;

      if (state === 'thinking') waveTRef.current += 0.009;
      morphAmtRef.current = lerp(morphAmtRef.current, state === 'speaking' ? 1 : 0, 0.055);
      if (state === 'speaking') speakTRef.current += 0.04;

      if (state === 'response') {
        if (weavePhaseRef.current === 'surge') {
          weaveTurnsRef.current = lerp(weaveTurnsRef.current, SURGE_TURNS, 0.035);
          phaseRef.current += 0.10;
          if (Math.abs(weaveTurnsRef.current - SURGE_TURNS) < 0.08) {
            weavePhaseRef.current = 'settle';
            settleTargetRef.current = Math.round(phaseRef.current / (Math.PI * 2)) * Math.PI * 2;
          }
        } else if (weavePhaseRef.current === 'settle') {
          weaveTurnsRef.current = lerp(weaveTurnsRef.current, TURNS, 0.04);
          phaseRef.current = lerp(phaseRef.current, settleTargetRef.current, 0.055);
          if (Math.abs(weaveTurnsRef.current - TURNS) < 0.01 && Math.abs(phaseRef.current - settleTargetRef.current) < 0.01) {
            phaseRef.current = settleTargetRef.current;
            weaveTurnsRef.current = TURNS;
            weavePhaseRef.current = 'idle';
          }
        }
      } else if (state !== 'speaking') {
        weaveTurnsRef.current = lerp(weaveTurnsRef.current, TURNS, 0.06);
        phaseRef.current += 0.022;
        weavePhaseRef.current = 'idle';
      } else {
        weaveTurnsRef.current = lerp(weaveTurnsRef.current, TURNS, 0.06);
      }

      const activeTurns = state === 'response' ? weaveTurnsRef.current : TURNS;
      ctx.clearRect(0, 0, W, H);

      const pt = (f: number, po: number, turns: number, polarity: number) => {
        const y = cy + (f - 0.5) * HALF * 2;
        const a = -(f * Math.PI * 2 * turns + po);
        const hx = cx + Math.sin(a) * BASE_AMP;
        const hz = Math.cos(a);
        const gap = 18;
        const wave = SINE_AMP * Math.sin(f * Math.PI * SINE_FREQ - speakTRef.current);
        const sx = cx + polarity * (gap + wave);
        const sz = 0.6;
        return {
          x: lerp(hx, sx, morphAmtRef.current),
          y,
          z: lerp(hz, sz, morphAmtRef.current)
        };
      };

      const nodeColor = (bc: number[], f: number) => {
        if (state !== 'thinking') return bc;
        const w = waveTRef.current % 1;
        const dist = Math.abs(f - w);
        const wrap = Math.min(dist, 1 - dist);
        const mix = Math.max(0, 1 - wrap / 0.18);
        return lerpColor(bc, [255, 255, 255], mix * 0.85);
      };

      const N = 80;
      const s1: { x: number; y: number; z: number }[] = [];
      const s2: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const f = i / N;
        s1.push(pt(f, phaseRef.current, activeTurns, +1));
        s2.push(pt(f, phaseRef.current + Math.PI, activeTurns, -1));
      }

      const nodes: { x: number; y: number; z: number; c: number[]; f: number }[] = [];
      for (let i = 0; i <= NODES; i++) {
        const f = i / NODES;
        nodes.push({ ...pt(f, phaseRef.current, activeTurns, +1), c: OR, f });
        nodes.push({ ...pt(f, phaseRef.current + Math.PI, activeTurns, -1), c: BL, f });
      }
      nodes.sort((a, b) => a.z - b.z);

      const rungs: {
        p1: { x: number; y: number; z: number };
        p2: { x: number; y: number; z: number };
        f: number;
      }[] = [];
      for (let i = 0; i <= RUNGS; i++) {
        const f = i / RUNGS;
        rungs.push({
          p1: pt(f, phaseRef.current, activeTurns, +1),
          p2: pt(f, phaseRef.current + Math.PI, activeTurns, -1),
          f
        });
      }

      const isSpeaking = morphAmtRef.current > 0.1;

      const drawStrand = (pts: any[], bc: number[], front: boolean) => {
        if (state === 'thinking') {
          for (let i = 0; i < pts.length - 1; i++) {
            const p = pts[i];
            const n = pts[i + 1];
            if ((p.z >= 0) !== front) continue;
            const col = nodeColor(bc, i / pts.length);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = rgba(col, front ? 1.0 : 0.35);
            ctx.lineWidth = front ? 7.0 : 3.5;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        } else {
          ctx.beginPath();
          let on = false;
          for (const p of pts) {
            if (!isSpeaking && (p.z >= 0) !== front) { on = false; continue; }
            if (isSpeaking && !front) continue;
            on ? ctx.lineTo(p.x, p.y) : (ctx.moveTo(p.x, p.y), on = true);
          }
          ctx.strokeStyle = front ? rgba(bc, 1.0) : rgba(bc, 0.35);
          ctx.lineWidth = front ? 7.0 : 3.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      };

      const drawRungs = (front: boolean) => {
        ctx.lineWidth = 3.0;
        for (const rg of rungs) {
          if (!isSpeaking && ((rg.p1.z + rg.p2.z) / 2 >= 0) !== front) continue;
          if (isSpeaking && !front) continue;
          ctx.strokeStyle = `rgba(255,255,255,${isSpeaking ? 0.28 : front ? 0.30 : 0.09})`;
          ctx.beginPath();
          ctx.moveTo(rg.p1.x, rg.p1.y);
          ctx.lineTo(rg.p2.x, rg.p2.y);
          ctx.stroke();
        }
      };

      drawRungs(false);
      drawStrand(s1, OR, false);
      drawStrand(s2, BL, false);
      drawRungs(true);
      drawStrand(s1, OR, true);
      drawStrand(s2, BL, true);

      for (const nd of nodes) {
        const front = isSpeaking ? true : nd.z >= 0;
        const r = front ? 7.5 + nd.z * 3.0 : 4.5;
        const col = nodeColor(nd.c, nd.f);
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, front ? 1.0 : 0.4);
        ctx.fill();
        if (front && nd.z > 0.2) {
          ctx.beginPath();
          ctx.arc(nd.x - r * 0.28, nd.y - r * 0.28, r * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.45 * nd.z})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[60]">
      {/* The DNA Orb Container */}
      <motion.div
        onClick={() => handleOrbClick()}
        className="orb-container group"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="orb">
          <div
            className="orb-inner"
            style={{
              animationDuration: currentState === 'idle' ? '6s' : currentState === 'speaking' ? '4s' : '3s'
            }}
          />
          <div
            className="orb-inner"
            style={{
              animationDuration: currentState === 'idle' ? '8s' : currentState === 'speaking' ? '5s' : '4s'
            }}
          />
        </div>
        <canvas
          ref={canvasRef}
          width="220"
          height="220"
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ transform: 'scale(0.7)' }}
        />
      </motion.div>

      <style jsx global>{`
        @keyframes orbRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes orbWobble {
          50% { transform: rotate(180deg); }
        }
        .orb-container {
          position: relative;
          width: 64px;
          height: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          border-radius: 50%;
          cursor: pointer;
          filter: drop-shadow(0 0 15px rgba(196, 82, 0, 0.2)) drop-shadow(0 0 15px rgba(28, 140, 255, 0.2));
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: radial-gradient(circle at center, rgba(15, 15, 20, 0.5) 0%, rgba(3, 3, 5, 0.85) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        @media (min-width: 640px) {
          .orb-container {
            width: 72px;
            height: 72px;
          }
        }
        .orb {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: transparent;
          filter: blur(8px);
          transition: all 0.3s ease;
          opacity: 0.8;
        }
        .orb-container:hover .orb {
          filter: blur(12px);
          opacity: 1;
        }
        .orb-inner {
          position: absolute;
          left: -120%;
          top: -25%;
          width: 160%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: #c45200;
          opacity: 0.6;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: orbRotate 6s linear infinite;
        }
        .orb-inner:nth-child(2) {
          left: auto;
          right: -120%;
          top: auto;
          bottom: -25%;
          background: #1c8cff;
          opacity: 0.6;
          animation-duration: 8s;
          clip-path: polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%);
        }
      `}</style>
    </div>
  );
}
