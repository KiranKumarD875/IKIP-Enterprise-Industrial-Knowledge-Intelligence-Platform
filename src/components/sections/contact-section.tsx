"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="relative bg-white pt-32 pb-20">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label">
            Get in Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl text-gray-900 mt-3 mb-5">
            Let&apos;s talk about <span className="text-gradient">your plant</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="body-md text-gray-500">
            Whether you need a demo, have questions, or want to discuss your use case — our team is here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "hello@ikip.io", href: "mailto:hello@ikip.io" },
                { icon: Phone, label: "+91 80 4567 8900", href: "tel:+918045678900" },
                { icon: MapPin, label: "Bengaluru, India · Mumbai, India", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-3 text-gray-500 hover:text-indigo-600 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
            <div className="card-base p-5">
              <p className="text-gray-900 font-semibold text-sm mb-3">Response Times</p>
              {[
                { label: "General inquiries", time: "Within 24 hours" },
                { label: "Demo requests", time: "Within 4 hours" },
                { label: "Support", time: "Within 2 hours" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1.5">
                  <span className="text-gray-500 text-xs">{item.label}</span>
                  <span className="text-gray-900 text-xs font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="lg:col-span-3">
            <div className="card-base p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6">
                    <CheckCircle className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-2xl mb-3">Message received!</h3>
                  <p className="text-gray-500 max-w-sm">We&apos;ll get back to you within 24 hours. Thank you for reaching out.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-gray-900 font-bold text-xl mb-1">Send us a message</h2>
                  {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name *</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className="input-base text-base py-3" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Email *</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-base text-base py-3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Company</label>
                      <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company" className="input-base text-base py-3" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Role</label>
                      <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="input-base text-base py-3">
                        <option value="">Select your role</option>
                        <option>Plant Manager</option>
                        <option>Reliability Engineer</option>
                        <option>Maintenance Engineer</option>
                        <option>Compliance Auditor</option>
                        <option>Quality Engineer</option>
                        <option>Safety Officer</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Tell us about your requirements..." className="input-base text-base py-3 resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}