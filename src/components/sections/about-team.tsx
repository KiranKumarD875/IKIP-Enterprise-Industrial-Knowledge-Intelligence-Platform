"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TEAM = [
  { name: "Arjun Patel", role: "CEO & Co-founder", bio: "Ex-Siemens, 15 years in plant digitization", avatar: "AP" },
  { name: "Maria Chen", role: "CTO & Co-founder", bio: "Ex-Google AI, NLP & knowledge graphs expert", avatar: "MC" },
  { name: "David Okafor", role: "VP Engineering", bio: "Ex-AWS, scaled systems to 10M+ documents", avatar: "DO" },
  { name: "Sara Ahmed", role: "Head of Product", bio: "Ex-Honeywell, industrial UX specialist", avatar: "SA" },
];

export default function AboutTeam() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-pad bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="section-label">Our Team</span>
          <h2 className="heading-lg text-gray-900">Meet the people <span className="text-gradient">behind IKIP</span></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }} className="card-base p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4 text-lg font-bold text-indigo-600">
                {member.avatar}
              </div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-indigo-600 text-sm font-medium">{member.role}</p>
              <p className="text-gray-500 text-xs mt-2">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}