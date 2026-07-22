"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BrainCircuit, MessageSquareText, FileSearch, Sparkles } from "lucide-react";

const COPILOT_FEATURES = [
  { icon: MessageSquareText, title: "Natural Language Queries", desc: "Ask complex technical questions just like you would to a senior engineer." },
  { icon: FileSearch, title: "Source Citations", desc: "Every answer is backed by verifiable citations linking directly to your source documents." },
  { icon: BrainCircuit, title: "Contextual Understanding", desc: "The Copilot understands industrial terminology, equipment codes, and plant-specific acronyms." },
];

export default function FeaturesCopilot() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="badge-brand">
              AI Copilot
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900">
              An expert engineer that <span className="text-gradient">never sleeps</span>.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
              Stop searching for documents. Start asking questions. The IKIP AI Copilot retrieves relevant context from across your entire organization and synthesizes grounded, accurate answers instantly.
            </motion.p>
            
            <div className="space-y-6 pt-6">
              {COPILOT_FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + (i * 0.1) }} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 }} className="card-base bg-white shadow-floating p-4 overflow-hidden border border-indigo-100">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                <p className="text-sm text-gray-800">What caused the frequent vibration alarms on Compressor C-302 last month?</p>
              </div>
              <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100 relative">
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-white px-2 py-1 rounded-md shadow-sm">
                  <Sparkles className="w-3 h-3" /> AI Generated
                </div>
                <p className="text-sm text-gray-800 leading-relaxed pr-24 mt-2">
                  Based on maintenance logs and vibration analysis reports, the root cause was identified as <span className="font-semibold text-indigo-700">misalignment coupling</span> combined with <span className="font-semibold text-indigo-700">bearing wear</span> on the non-drive end.
                </p>
                <div className="mt-4 pt-4 border-t border-indigo-200/50">
                  <p className="text-xs text-gray-500 font-medium mb-2">Sources:</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-white border border-indigo-100 text-indigo-700 px-2 py-1 rounded">Report_C302_Vib.pdf</span>
                    <span className="text-[10px] bg-white border border-indigo-100 text-indigo-700 px-2 py-1 rounded">WO-98842.csv</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}