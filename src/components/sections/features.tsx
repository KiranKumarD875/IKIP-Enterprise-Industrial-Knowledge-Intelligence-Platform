"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Brain, Search, GitBranch, Shield, BarChart3, FileText, Wrench, AlertTriangle, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Brain, title: "AI Copilot & RAG Engine", desc: "Ask any question about your assets, maintenance history, or compliance. Get grounded answers with source citations.", color: "indigo", tags: ["LLM-powered", "Cited answers"] },
  { icon: Search, title: "Semantic Search", desc: "Hybrid vector + keyword search across all your industrial documents in under 2 seconds.", color: "violet", tags: ["< 2s latency"] },
  { icon: GitBranch, title: "Knowledge Graph", desc: "Visualize relationships between assets, failures, regulations, and documents.", color: "cyan", tags: ["Interactive"] },
  { icon: Shield, title: "Compliance Intelligence", desc: "Auto-map evidence to ISO 9001, 45001, OSHA and other frameworks. Detect gaps automatically.", color: "emerald", tags: ["ISO", "OSHA"] },
  { icon: Wrench, title: "Predictive Maintenance", desc: "ML models predict failure probability with SHAP explainability — not just alerts.", color: "amber", tags: ["XGBoost", "SHAP"] },
  { icon: FileText, title: "Document Ingestion & OCR", desc: "Upload PDFs, scanned forms, P&IDs. AI extracts entities and indexes everything automatically.", color: "rose", tags: ["OCR", "Auto-index"] },
  { icon: AlertTriangle, title: "Incident Intelligence", desc: "Connect incidents to root causes. Surface lessons learned for similar tasks.", color: "orange", tags: ["RCA"] },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time KPIs — asset health, MTBF, MTTR, compliance score — updated live.", color: "blue", tags: ["Real-time"] },
  { icon: Workflow, title: "Workflow Orchestrator", desc: "Document approvals and compliance reviews routed automatically by role and asset.", color: "teal", tags: ["Automated"] },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-200" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-200" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
  teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200" },
};

export default function Features() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label">
            Platform Capabilities
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold text-black mb-6">
            Enterprise capabilities, built for heavy industry
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="body-md text-gray-500">
            From raw documents to AI-powered answers — IKIP handles the entire knowledge lifecycle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const colors = COLOR_MAP[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-hover p-8 md:p-10"
              >
                <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", colors.bg)}>
                  <Icon className={cn("w-7 h-7", colors.text)} />
                </div>
                <h3 className="font-semibold text-gray-900 text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span key={tag} className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", colors.bg, colors.text)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}