"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Zap, Brain, BarChart3 } from "lucide-react";

const TRUST_BADGES = [
  { icon: Shield, label: "SOC2 Compliant" },
  { icon: Zap, label: "< 2s Search Latency" },
  { icon: Brain, label: "Grounded AI Answers" },
  { icon: BarChart3, label: "99.9% Uptime SLA" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-mesh" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none animate-glow-pulse" />
      <div className="absolute top-40 right-[8%] w-24 h-24 bg-accent-400/10 rounded-full blur-2xl pointer-events-none animate-float" />
      <div className="absolute top-64 left-[10%] w-20 h-20 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container-custom">
        <div className="w-full text-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-200 bg-indigo-50">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-indigo-700 tracking-wide">
                Enterprise-Grade Industrial Knowledge Platform
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tight"
          >
            Your Industrial Knowledge,{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">Finally Intelligent</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            IKIP unifies your plant documents, asset history, maintenance records,
            and compliance evidence into one AI-powered platform — with actionable answers,
            not just search results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link href="/features" className="btn-primary text-lg px-10 py-5 rounded-xl shadow-glow">
              Explore Features
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24 text-base text-gray-500 font-medium"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Enterprise Ready</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>SOC2 Compliant Architecture</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span>Custom Deployment Options</span>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12"
          >
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-400">
                <Icon className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}