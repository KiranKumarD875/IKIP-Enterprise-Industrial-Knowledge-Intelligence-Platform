"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { STATS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="section-pad bg-indigo-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {inView ? (
                  <CountUp
                    start={0}
                    end={parseFloat(stat.value.toString())}
                    duration={2.5}
                    delay={i * 0.15}
                    decimals={stat.suffix === "%" && stat.value % 1 !== 0 ? 1 : 0}
                  />
                ) : (
                  "0"
                )}
                <span className="text-indigo-200">{stat.suffix}</span>
              </div>
              <p className="text-indigo-100 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}