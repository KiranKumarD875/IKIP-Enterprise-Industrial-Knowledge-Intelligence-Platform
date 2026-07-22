"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Wrench, Shield, BarChart3, FileText, AlertTriangle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const PERSONAS = [
  { icon: Wrench, title: "Reliability Engineers", desc: "Root cause analysis, failure prediction, and maintenance optimization powered by AI.", color: "indigo" },
  { icon: Shield, title: "Compliance Auditors", desc: "Automated gap detection, evidence mapping, and audit-ready reports for ISO, OSHA, and more.", color: "emerald" },
  { icon: BarChart3, title: "Plant Managers", desc: "Real-time KPI dashboards, asset health monitoring, and operational command center.", color: "violet" },
  { icon: FileText, title: "Document Controllers", desc: "Bulk document ingestion, OCR, version control, and intelligent indexing.", color: "cyan" },
  { icon: AlertTriangle, title: "Safety Officers", desc: "Incident pattern detection, safety trend analysis, and proactive risk identification.", color: "amber" },
  { icon: Users, title: "Maintenance Teams", desc: "Predictive alerts, work order intelligence, and knowledge-guided troubleshooting.", color: "rose" },
];

const COLORS: Record<string, { bg: string; text: string }> = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-600" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-600" },
};

export default function SolutionsPersonas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section ref={ref} className="section-pad bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PERSONAS.map((p, i) => {
            const Icon = p.icon;
            const c = COLORS[p.color];
            return (
              <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }} className="card-hover p-6">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", c.bg)}>
                  <Icon className={cn("w-5 h-5", c.text)} />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}