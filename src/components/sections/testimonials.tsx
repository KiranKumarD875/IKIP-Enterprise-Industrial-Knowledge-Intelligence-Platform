"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  { name: "Rajesh Menon", role: "Reliability Engineer", company: "Reliance Industries", avatar: "RM", rating: 5, text: "IKIP cut our root-cause analysis time from 3 days to under 4 hours. The AI Copilot surfaces relevant maintenance history I wouldn't have found manually.", highlight: "RCA time: 3 days → 4 hours" },
  { name: "Sarah Okonkwo", role: "Compliance Manager", company: "Shell Nigeria", avatar: "SO", rating: 5, text: "Audit preparation used to take 6 weeks. With IKIP's compliance intelligence, we now have a live gap report updated in real time. Last audit — 3 days prep.", highlight: "Audit prep: 6 weeks → 3 days" },
  { name: "Lars Hoffmann", role: "Plant Manager", company: "BASF", avatar: "LH", rating: 5, text: "The predictive maintenance module flagged a critical pump failure 18 days before our sensors would have caught it. Saved an estimated €2.4M in downtime.", highlight: "18-day early warning" },
  { name: "Priya Subramaniam", role: "Document Controller", company: "ONGC Mumbai", avatar: "PS", rating: 5, text: "120,000 scanned documents ingested in 72 hours, OCR'd and fully searchable. Our engineers call it a superpower.", highlight: "120K docs in 72 hours" },
  { name: "Ahmed Al-Rashidi", role: "Maintenance Director", company: "Saudi Aramco", avatar: "AA", rating: 5, text: "Being able to traverse from equipment failure to the regulation it violates to the compliance evidence — all in one click — changed how we operate.", highlight: "End-to-end traceability" },
  { name: "Chen Wei", role: "Quality Engineer", company: "Sinopec", avatar: "CW", rating: 5, text: "NCR management and CAPA tracking used to be a spreadsheet nightmare. IKIP's quality module with AI-suggested root causes made our team 3x faster.", highlight: "Quality team 3x faster" },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-pad bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="section-label">
            Customer Stories
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="heading-lg text-gray-900 mb-4">
            Trusted by industrial <span className="text-gradient">teams worldwide</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-hover p-6 flex flex-col gap-4"
            >
              <Quote className="w-7 h-7 text-indigo-200 flex-shrink-0" />
              <div className="badge-brand text-[10px] w-fit">{t.highlight}</div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}