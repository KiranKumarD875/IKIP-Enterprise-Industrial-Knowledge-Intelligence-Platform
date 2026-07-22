"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";

const POSTS = [
  {
    slug: "rag-for-industrial-maintenance",
    category: "AI & Engineering",
    title: "Why RAG is the right architecture for industrial maintenance knowledge",
    excerpt: "Retrieval-Augmented Generation solves the hallucination problem that makes generic LLMs unsafe for plant operations. Here's how IKIP's implementation differs from standard RAG.",
    date: "July 15, 2024",
    readTime: "8 min",
    featured: true,
    color: "brand",
  },
  {
    slug: "knowledge-graph-vs-vector-search",
    category: "Technical",
    title: "Knowledge graphs vs vector search: why industrial AI needs both",
    excerpt: "Vector search finds semantically similar content. Knowledge graphs find causally connected content. In plant operations, you need the failure that caused today's problem — not just text that sounds similar.",
    date: "July 8, 2024",
    readTime: "6 min",
    featured: false,
    color: "violet",
  },
  {
    slug: "ocr-for-industrial-documents",
    category: "Product",
    title: "Solving OCR for the hardest industrial documents — P&IDs, handwriting, and 40-year-old scans",
    excerpt: "Generic OCR tools fail on engineering drawings, maintenance handwriting, and degraded scans. Here's the multi-model ensemble we built to handle them.",
    date: "June 30, 2024",
    readTime: "10 min",
    featured: false,
    color: "cyan",
  },
  {
    slug: "predictive-maintenance-shap",
    category: "AI & Engineering",
    title: "Explainable predictive maintenance: why SHAP values matter more than accuracy",
    excerpt: "A 92% accurate black-box model is useless if your engineers won't act on it. SHAP explainability isn't a nice-to-have in safety-critical systems — it's a prerequisite.",
    date: "June 22, 2024",
    readTime: "7 min",
    featured: false,
    color: "amber",
  },
  {
    slug: "compliance-automation-iso-45001",
    category: "Compliance",
    title: "Automating ISO 45001 evidence mapping: from 6-week audit prep to 3 days",
    excerpt: "How IKIP's compliance intelligence module automatically maps organizational evidence against ISO 45001 clauses and detects gaps before auditors do.",
    date: "June 15, 2024",
    readTime: "9 min",
    featured: false,
    color: "emerald",
  },
  {
    slug: "tribal-knowledge-problem",
    category: "Industry",
    title: "The $50B tribal knowledge problem in heavy industry — and how AI is finally solving it",
    excerpt: "When an experienced engineer retires, they take decades of undocumented knowledge with them. The industry has known this for 30 years. Here's why it's finally fixable.",
    date: "June 7, 2024",
    readTime: "5 min",
    featured: false,
    color: "rose",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Engineering": "text-brand-400 bg-brand-500/10 border-brand-500/20",
  "Technical":        "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Product":          "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  "Compliance":       "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  "Industry":         "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

export default function BlogList() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <section ref={ref} className="relative bg-[#020617] pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-xl text-white mt-3 mb-4"
          >
            Industrial AI{" "}
            <span className="text-gradient">insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 body-md"
          >
            Engineering deep-dives, product updates, and industry perspectives
            from the IKIP team.
          </motion.p>
        </div>

        {/* Featured post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <Link
              href={`/blog/${featured.slug}`}
              className="group block card-base p-8 md:p-10 hover:border-brand-400/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`badge border text-xs ${CATEGORY_COLORS[featured.category]}`}>
                      {featured.category}
                    </span>
                    <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs">
                      ⭐ Featured
                    </span>
                  </div>
                  <h2 className="heading-md text-white mb-4 group-hover:text-gradient transition-all duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime} read
                    </span>
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-glow-md group-hover:shadow-glow-lg transition-all duration-300">
                    <ArrowRight className="w-7 h-7 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block card-hover p-6 h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className={`badge border text-[10px] ${CATEGORY_COLORS[post.category]}`}>
                    <Tag className="w-2.5 h-2.5" />
                    {post.category}
                  </span>
                  <span className="text-[10px] text-slate-600 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-gradient transition-all duration-300 flex-1">
                  {post.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-slate-600 text-xs">{post.date}</span>
                  <span className="text-brand-400 text-xs font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}