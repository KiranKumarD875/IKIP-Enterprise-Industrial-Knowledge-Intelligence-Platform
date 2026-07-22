"use client";
import { motion } from "framer-motion";
export default function SolutionsHero() {
  return (
    <section className="pt-32 pb-16 bg-white">
      <div className="container-custom text-center max-w-3xl mx-auto">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label">Solutions</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl text-gray-900 mt-3 mb-5">
          Built for every <span className="text-gradient">industrial role</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="body-lg text-gray-500">
          From Reliability Engineers to Compliance Auditors — IKIP adapts to your workflow.
        </motion.p>
      </div>
    </section>
  );
}