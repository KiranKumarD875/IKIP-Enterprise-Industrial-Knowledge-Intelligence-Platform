"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link2, LayoutGrid, Zap } from "lucide-react";

export default function FeaturesIntegrations() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="badge-brand mb-4 mx-auto w-fit">
            Integrations
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900 mb-4">
            Plays nicely with <span className="text-gradient">your ecosystem</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
            IKIP ingests data from your existing tools and systems seamlessly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: LayoutGrid, title: "CMMS & EAM", desc: "Connect SAP PM, Maximo, or UpKeep to ingest work orders and asset hierarchies automatically." },
            { icon: Link2, title: "Document Storage", desc: "Sync continuously with SharePoint, Google Drive, or local on-premise file servers." },
            { icon: Zap, title: "Custom API", desc: "Build bespoke integrations with our REST and GraphQL APIs for specialized industrial systems." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="card-base p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}