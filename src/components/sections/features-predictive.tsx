"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LineChart, ArrowUpRight, Clock, AlertTriangle } from "lucide-react";

export default function FeaturesPredictive() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-gray-50 border-y border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 w-full order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="card-base bg-white shadow-elevated p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Failure Prediction Alert</h3>
                    <p className="text-xs text-gray-500">Pump P-201 · Cooling Water System</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md mb-1">High Risk</span>
                  <p className="text-xs font-medium text-gray-900">84% probability</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Predicted Time to Failure (MTTF)</p>
                  <p className="text-sm font-semibold text-gray-900">14 Days (± 2 days)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Key Contributing Factors (SHAP Values)</p>
                  <div className="space-y-2 mt-2">
                    {[
                      { factor: "Vibration amplitude trend", impact: 45 },
                      { factor: "Days since last seal replacement", impact: 30 },
                      { factor: "Operating temperature variance", impact: 15 },
                    ].map((f) => (
                      <div key={f.factor}>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-gray-700">{f.factor}</span>
                          <span className="font-medium">{f.impact}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-400 rounded-full" style={{ width: `${f.impact}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="flex-1 space-y-6 order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="badge-brand">
              Predictive Maintenance
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900">
              Stop reacting. <span className="text-gradient">Start anticipating.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-gray-500 body-md">
              Our machine learning models analyze historical work orders, failure codes, and operational data to predict failures before they happen. We don&apos;t just give you an alert — we give you the "why".
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: LineChart, title: "ML-Powered Forecasts", desc: "Train models on your specific historical maintenance data." },
                { icon: ArrowUpRight, title: "SHAP Explainability", desc: "Understand exactly which variables are driving the risk predictions." },
                { icon: Clock, title: "Optimize Intervals", desc: "Move from calendar-based to condition-based maintenance." },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + (i * 0.1) }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{feature.title}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}