"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const USE_CASES = [
  { title: "Predictive Maintenance", desc: "Predict equipment failures before they happen using ML models trained on your maintenance history." },
  { title: "Compliance Automation", desc: "Auto-map evidence to regulatory frameworks and detect gaps before auditors do." },
  { title: "Root Cause Analysis", desc: "Connect incidents to root causes through the knowledge graph with AI-suggested fixes." },
  { title: "Document Intelligence", desc: "Transform 100,000+ scanned documents into a searchable, structured knowledge base." },
];

export default function SolutionsUseCases() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <span className="section-label">Use Cases</span>
          <h2 className="heading-lg text-gray-900">Real-world <span className="text-gradient">applications</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map((uc, i) => (
            <motion.div key={uc.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="card-base p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{uc.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{uc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}