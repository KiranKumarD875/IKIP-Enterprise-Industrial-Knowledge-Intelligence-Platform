"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { FileText, MessageSquare, Search, BarChart3, ArrowRight, Activity, Server, Cpu, Database, Network, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [metrics, setMetrics] = useState<{
    totalDocuments: number;
    totalQueries: number;
    avgConfidence: string;
    processingDocuments: number;
    recentDocuments: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => {});
    fetch("/api/metrics").then((r) => r.json()).then((d) => setMetrics(d)).catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
              <span className="text-sm font-bold tracking-widest text-emerald-600 uppercase">System Online</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Enterprise Command Center</h1>
            <p className="text-lg text-gray-500 mt-2 max-w-2xl">
              Welcome{metrics && metrics.totalQueries > 0 ? " back" : ""}{user ? `, ${user.name.split(" ")[0]}` : ""}. Here is the real-time operational overview of your Industrial Knowledge Platform.
            </p>
          </div>
          <Link href="/dashboard/graph" className="btn-primary bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 px-6 py-3 whitespace-nowrap">
            <Network className="w-5 h-5 mr-2" /> Launch Knowledge Graph
          </Link>
        </motion.div>

        {/* Global Platform Overview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Corpus Volume", value: metrics?.totalDocuments ?? "—", icon: Database, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", suffix: "Docs" },
            { label: "AI Inferences (24h)", value: metrics?.totalQueries ?? "—", icon: Cpu, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", suffix: "Queries" },
            { label: "Avg. AI Confidence", value: metrics?.avgConfidence || "—", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", suffix: "" },
            { label: "Processing Queue", value: metrics?.processingDocuments ?? "—", icon: Server, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", suffix: "Active" },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${stat.border} bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group`}>
              <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} rounded-full blur-2xl opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out`} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wide">{stat.label}</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</span>
                  <span className="text-sm font-semibold text-gray-400">{stat.suffix}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Modular Access Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Main feature 1 */}
          <Link href="/dashboard/assets" className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-900 to-indigo-950 p-10 shadow-2xl hover:shadow-indigo-900/30 transition-all duration-500">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 uppercase tracking-wider mb-6 border border-indigo-500/30">
                  <Activity className="w-3.5 h-3.5" /> Real-time telemetry
                </span>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Digital Twin Fleet Management</h2>
                <p className="text-indigo-200 text-lg max-w-lg leading-relaxed">
                  Monitor asset health, predict Remaining Useful Life (RUL), and run root cause analysis on your physical equipment using live IoT telemetry mapped to the Knowledge Graph.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-3 text-indigo-300 font-bold group-hover:text-white transition-colors">
                Access Fleet Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Side features */}
          <div className="flex flex-col gap-6">
            <Link href="/dashboard/compliance" className="flex-1 group relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Compliance Command</h3>
              <p className="text-gray-500 text-sm">Automated regulatory audits, gap detection, and AI remediation workflows.</p>
            </Link>

            <Link href="/dashboard/documents" className="flex-1 group relative overflow-hidden rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-8 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Intelligence Pipeline</h3>
              <p className="text-gray-500 text-sm">Ingest new PDFs, Manuals, and Logs directly into the AI Knowledge Graph.</p>
            </Link>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div variants={itemVariants} className="card-base p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">System Activity Log</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { time: "2 mins ago", text: "Knowledge Graph mapped 42 new semantic relationships from 'Turbine Diagnostics.pdf'", type: "graph" },
              { time: "15 mins ago", text: "AI Copilot resolved maintenance query regarding 'Pump P-304' with 98% confidence", type: "ai" },
              { time: "1 hour ago", text: "Compliance Scan completed. 1 Critical Gap identified in OSHA Sector 7", type: "compliance" },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                <div>
                  <p className="text-gray-900 font-medium">{log.text}</p>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
