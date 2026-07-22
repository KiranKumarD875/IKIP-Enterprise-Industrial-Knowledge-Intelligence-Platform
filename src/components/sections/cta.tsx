"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-indigo-600 p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative z-10">
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 leading-tight">
              Ready to transform how<br />your plant thinks?
            </h2>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto mb-8">
              Join 200+ industrial teams who replaced siloed documents with AI intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                href={user ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-indigo-700 font-bold text-base hover:bg-gray-50 transition-all duration-200 shadow-elevated"
              >
                {user ? "Go to Dashboard" : "Sign Up"}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-indigo-500 border border-indigo-400 text-white font-semibold text-base hover:bg-indigo-400 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-indigo-200 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Enterprise Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>SOC2 Compliant Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Custom Deployment Options</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}