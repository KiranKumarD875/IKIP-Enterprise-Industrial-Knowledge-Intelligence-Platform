"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Lightbulb, Users, Lock, Zap } from "lucide-react";

const VALUES = [
  { icon: Lightbulb, title: "Innovation", desc: "We push the boundaries of what AI can do for industrial operations." },
  { icon: Users, title: "Accessibility", desc: "Knowledge tools should be free and available to every team, everywhere." },
  { icon: Lock, title: "Security", desc: "Enterprise-grade security and compliance, even on the free tier." },
  { icon: Zap, title: "Speed", desc: "Every query answered in under 2 seconds. No compromise on performance." },
];

export default function AboutValues() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-label">Our Values</span>
          <h2 className="heading-lg text-gray-900">What drives us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}