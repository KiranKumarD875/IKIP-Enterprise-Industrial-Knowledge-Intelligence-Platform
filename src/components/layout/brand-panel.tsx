"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Zap, Brain, BarChart3, Activity } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

// 4. Matrix-Style Text Glitch Component
function GlitchText({ text, delayOffset }: { text: string; delayOffset: number }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    // Start with a small offset to prevent all lines glitching at once
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        let iterations = 0;
        const glitchInterval = setInterval(() => {
          setDisplayText((prev) =>
            text
              .split("")
              .map((char, index) => {
                if (char === " ") return " ";
                if (index < iterations) return char;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );
          iterations += 1 / 2; // Decryption speed
          if (iterations >= text.length) {
            clearInterval(glitchInterval);
            setDisplayText(text);
          }
        }, 30);
      }, 4000 + delayOffset * 1000); // Glitch every 4-8 seconds depending on offset

      return () => clearInterval(interval);
    }, delayOffset * 500);

    return () => clearTimeout(initialDelay);
  }, [text, delayOffset]);

  return <>{displayText}</>;
}

export default function BrandPanel() {
  const [mounted, setMounted] = useState(false);

  // 1. Cursor Parallax Hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Depth Layers (Parallax multipliers)
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [15, -15]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  
  const midX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const midY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
  
  const fgX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const fgY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize coordinates between -0.5 and 0.5
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <div 
      className="hidden lg:flex flex-col justify-between w-full h-full p-10 xl:p-14 bg-[#030712] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      
      {/* 1. Holographic Topography Grid (Base Layer) - Moves opposite to cursor */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 [perspective:1000px] overflow-hidden pointer-events-none opacity-25"
      >
        <motion.div 
          animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute inset-x-0 bottom-[-20%] h-[80%] origin-bottom"
          style={{ 
            backgroundImage: `linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(75deg)',
            maskImage: 'linear-gradient(to top, black 10%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 90%)'
          }}
        />
      </motion.div>

      {/* 2. Radar Sweep (Middle Layer) */}
      <motion.div 
        style={{ x: midX, y: midY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-40"
      >
        <div className="absolute inset-0 rounded-full border border-indigo-500/10" />
        <div className="absolute inset-[100px] rounded-full border border-cyan-500/10" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        
        {mounted && (
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ 
              background: 'conic-gradient(from 0deg, transparent 70%, rgba(99,102,241,0.3) 100%)',
              maskImage: 'radial-gradient(circle, transparent 30%, black 70%)',
              WebkitMaskImage: 'radial-gradient(circle, transparent 30%, black 70%)'
            }}
          />
        )}
      </motion.div>

      {/* 3. The "IKIP Core" 3D Wireframe (Background Element) */}
      {mounted && (
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute top-[20%] right-[15%] w-24 h-24 pointer-events-none opacity-30 [transform-style:preserve-3d]"
        >
          <motion.div 
            animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 border border-indigo-400/50 [transform:translateZ(48px)] shadow-[0_0_15px_rgba(99,102,241,0.3)]" />
            <div className="absolute inset-0 border border-cyan-400/50 [transform:translateZ(-48px)]" />
            <div className="absolute inset-0 border border-indigo-400/50 [transform:rotateY(90deg)translateZ(48px)]" />
            <div className="absolute inset-0 border border-cyan-400/50 [transform:rotateY(90deg)translateZ(-48px)]" />
            <div className="absolute inset-0 border border-indigo-400/50 [transform:rotateX(90deg)translateZ(48px)]" />
            <div className="absolute inset-0 border border-cyan-400/50 [transform:rotateX(90deg)translateZ(-48px)]" />
          </motion.div>
        </motion.div>
      )}

      {/* 4. Liquid Code / Data Streams with Glitch Effect */}
      <div className="absolute top-0 right-20 bottom-0 w-64 overflow-hidden pointer-events-none opacity-30">
        {[
          { text: "PARSING ISO_45001...", delay: 0, color: "text-indigo-400" },
          { text: "ANOMALY_DETECTED: FALSE", delay: 3, color: "text-cyan-400" },
          { text: "ASSET_HEALTH: OPTIMAL", delay: 6, color: "text-emerald-400" },
          { text: "MODEL_CONFIDENCE: 99.8%", delay: 1.5, color: "text-indigo-400" },
          { text: "SYNCING_MAINTENANCE_LOGS...", delay: 4.5, color: "text-gray-400" },
          { text: "INDEXING_DOCUMENTS: 48,230", delay: 7.5, color: "text-cyan-400" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: ['-10vh', '110vh'], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 15, delay: item.delay, ease: "linear" }}
            className={`text-[10px] font-mono ${item.color} absolute whitespace-nowrap tracking-widest uppercase font-bold`}
            style={{ left: `${(i % 3) * 30}%` }}
          >
            {mounted ? <GlitchText text={item.text} delayOffset={i} /> : item.text}
          </motion.div>
        ))}
      </div>

      {/* 5. Glassmorphic Tooltip / Telemetry (Foreground Parallax) */}
      {mounted && (
        <motion.div
          style={{ x: fgX, y: fgY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute right-10 top-[45%] w-60 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)] z-20"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-mono text-gray-300 font-semibold uppercase tracking-wider">Live Telemetry</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] text-gray-500 font-mono">System Load</span>
                <span className="text-[10px] text-cyan-400 font-mono">14%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['10%', '30%', '14%'] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="h-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] text-gray-500 font-mono">Ingestion Rate</span>
                <span className="text-[10px] text-indigo-400 font-mono">4.2k/s</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: ['40%', '80%', '60%'] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="h-full bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.8)]" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- UI Content (Header, Hero, Features, Footer) --- */}
      <div className="relative z-30 flex items-center gap-4">
        <Logo iconClassName="w-14 h-14" textClassName="text-4xl text-white" highlightClassName="text-cyan-400" />
        <div className="flex flex-col justify-center border-l border-white/20 pl-4 h-10">
          <p className="text-[10px] text-indigo-200/60 uppercase tracking-widest font-semibold">
            Enterprise
          </p>
          <p className="text-[10px] text-indigo-200/60 uppercase tracking-widest font-semibold">
            Intelligence
          </p>
        </div>
      </div>

      <div className="relative z-30 space-y-10 my-auto py-12 max-w-lg pointer-events-none">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-950/60 border border-indigo-500/30 backdrop-blur-md shadow-lg"
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-semibold text-indigo-300 tracking-wider uppercase">
              Core Systems Online
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl xl:text-5xl font-bold text-white leading-[1.15] tracking-tight"
          >
            Turn fragmented plant knowledge into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400 bg-300% animate-gradient">
              intelligent insight
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            Unify documents, maintenance records, and compliance evidence — then query it all with AI.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-6 pointer-events-auto">
          {[
            { icon: Brain, label: "AI Copilot with cited answers" },
            { icon: Shield, label: "ISO & OSHA compliance" },
            { icon: Zap, label: "< 2s semantic latency" },
            { icon: BarChart3, label: "Predictive ML engine" },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all flex items-center justify-center shrink-0 shadow-lg">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="text-sm text-gray-300 font-medium leading-tight max-w-[150px]">{f.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="relative z-30 flex items-center justify-between border-t border-white/10 pt-8 mt-8">
        <div>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-semibold">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap gap-2">
            {["Siemens", "ABB", "Honeywell", "Emerson", "Schneider"].map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs text-gray-400 font-medium tracking-wide shadow-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
