"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GitBranch, Box, Database, Combine } from "lucide-react";

export default function FeaturesDeep() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="badge-brand mb-4 mx-auto w-fit">
            Knowledge Graph
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900 mb-4">
            Connect the dots across your <span className="text-gradient">entire organization</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
            IKIP doesn&apos;t just store documents; it understands them. Our engine builds a dynamic Knowledge Graph that maps relationships between equipment, procedures, incidents, and regulations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Box, title: "Asset Hierarchy", desc: "Automatically link manuals and logs to specific functional locations." },
            { icon: Combine, title: "Failure Modes", desc: "Connect historical incidents to known failure codes and mitigation strategies." },
            { icon: Database, title: "Silo Integration", desc: "Unify data from ERPs, CMMS, and shared drives into one graph." },
            { icon: GitBranch, title: "Visual Traversal", desc: "Explore complex relationships intuitively through visual graph navigation." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="card-base p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}