"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const POSTS = [
  { title: "How AI is Transforming Industrial Maintenance", category: "AI & ML", date: "Jul 15, 2026", readTime: "5 min", excerpt: "Explore how modern AI models are revolutionizing predictive maintenance in heavy industry." },
  { title: "Building Knowledge Graphs for Industrial Operations", category: "Engineering", date: "Jul 10, 2026", readTime: "8 min", excerpt: "A deep dive into how IKIP builds and maintains knowledge graphs from unstructured industrial data." },
  { title: "ISO 45001 Compliance Made Simple", category: "Compliance", date: "Jul 5, 2026", readTime: "4 min", excerpt: "How AI-powered compliance intelligence can reduce audit preparation time by 80%." },
  { title: "The Future of Document Intelligence in Plants", category: "Product", date: "Jun 28, 2026", readTime: "6 min", excerpt: "From OCR to entity extraction — how IKIP transforms scanned documents into structured knowledge." },
  { title: "Why We Made IKIP Free", category: "Company", date: "Jun 20, 2026", readTime: "3 min", excerpt: "Our belief that industrial knowledge tools should be accessible to every team, everywhere." },
  { title: "5 Signs Your Plant Needs a Knowledge Platform", category: "Industry", date: "Jun 15, 2026", readTime: "4 min", excerpt: "How to recognize when tribal knowledge and siloed documents are costing your operations." },
];

export default function BlogList() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Blog</span>
          <h1 className="heading-xl text-gray-900 mt-3 mb-5">Insights & <span className="text-gradient">Updates</span></h1>
          <p className="body-md text-gray-500">Industrial AI insights, product updates, and engineering deep-dives.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="card-hover p-6 flex flex-col group cursor-pointer"
            >
              <div className="badge-brand text-[10px] w-fit mb-4">{post.category}</div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-indigo-600 opacity-0 group-hover:opacity-100" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}