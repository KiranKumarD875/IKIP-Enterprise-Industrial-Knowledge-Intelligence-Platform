"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, FileText, Activity, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const COMPLIANCE_FEATURES = [
  { icon: ShieldCheck, title: "Automated Evidence Mapping", desc: "AI automatically maps your documents and maintenance records to ISO 9001, ISO 45001, and OSHA frameworks." },
  { icon: AlertCircle, title: "Gap Detection", desc: "Identify missing procedures, expired certifications, or unaddressed safety risks before an audit." },
  { icon: FileText, title: "Audit-Ready Reports", desc: "Generate comprehensive compliance reports with one click, complete with source citations and evidence." },
  { icon: Activity, title: "Real-time Monitoring", desc: "Track your plant's compliance score continuously as new documents and records are ingested." },
];

export default function FeaturesCompliance() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-gray-50 border-t border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="badge-brand">
              Compliance Intelligence
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900">
              Turn compliance from a bottleneck into a <span className="text-gradient">competitive advantage</span>.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
              Preparing for audits shouldn&apos;t take weeks of manual document gathering. IKIP&apos;s Compliance Intelligence automatically maps your existing records to regulatory frameworks in real time.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {COMPLIANCE_FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + (i * 0.1) }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-gray-500 pl-11">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} className="card-base p-6 bg-white shadow-elevated border-emerald-100">
               <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                 <div>
                   <h3 className="font-bold text-gray-900">ISO 45001 Readiness</h3>
                   <p className="text-sm text-gray-500">Live compliance assessment</p>
                 </div>
                 <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                   <span className="font-bold text-lg text-emerald-700">92%</span>
                 </div>
               </div>
               
               <div className="space-y-4">
                 {[
                   { label: "Hazard identification", status: "Met", color: "text-emerald-600 bg-emerald-50" },
                   { label: "Worker participation", status: "Met", color: "text-emerald-600 bg-emerald-50" },
                   { label: "Emergency response plan", status: "Review needed", color: "text-amber-600 bg-amber-50" },
                   { label: "Incident investigation", status: "Met", color: "text-emerald-600 bg-emerald-50" },
                 ].map((item) => (
                   <div key={item.label} className="flex items-center justify-between">
                     <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                     <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", item.color)}>
                       {item.status}
                     </span>
                   </div>
                 ))}
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}