"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Upload, Cpu, GitBranch, MessageSquare, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { step: "01", icon: Upload, title: "Upload Documents", desc: "Upload PDFs, scanned forms, P&IDs, maintenance logs — any format, any language.", color: "indigo" },
  { step: "02", icon: Cpu, title: "AI Extracts & Understands", desc: "OCR, layout analysis, and NER extract entities — asset IDs, fault codes, regulations — automatically.", color: "violet" },
  { step: "03", icon: GitBranch, title: "Knowledge Graph is Built", desc: "Entities are linked into a rich graph connecting equipment, failures, regulations, and documents.", color: "cyan" },
  { step: "04", icon: MessageSquare, title: "Ask Anything", desc: "Your team asks questions in natural language. The Copilot retrieves context and generates grounded answers.", color: "emerald" },
  { step: "05", icon: TrendingUp, title: "Predict & Prevent", desc: "ML models predict failures, flag compliance gaps, and surface lessons learned — before problems occur.", color: "amber" },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
};

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-gray-50 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label">
            How It Works
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900 mb-4">
            From raw documents to <span className="text-gradient">intelligent answers</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
            Five simple steps to transform siloed data into searchable, auditable knowledge.
          </motion.p>
        </div>

        <div className="w-full space-y-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const colors = COLOR_MAP[step.color];
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5 card-base p-6"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", colors.bg, "border", colors.border)}>
                  <Icon className={cn("w-6 h-6", colors.text)} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={cn("text-xs font-bold", colors.text)}>Step {step.step}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}