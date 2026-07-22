"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Activity, AlertTriangle, Search, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function RcaPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [docs, setDocs] = useState<{id: number, title: string}[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("");

  useEffect(() => {
    fetch("/api/documents").then((r) => r.json()).then((d) => {
      setDocs(d.documents || []);
      if (d.documents?.length > 0) setSelectedDocId(d.documents[0].id.toString());
    }).catch(() => {});
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);
    const selectedDoc = docs.find(d => d.id.toString() === selectedDocId);
    const docTitle = selectedDoc ? selectedDoc.title : "Compressor_K101_Maintenance_History.pdf";

    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        asset: "Analysis Report",
        symptom: "Based on selected document patterns",
        confidence: 94,
        causes: [
          { prob: "High", title: "Pattern Matched", desc: `Matches failure signature found in ${docTitle}. Correlated with increased temperature trends.` },
          { prob: "Medium", title: "Shaft Misalignment", desc: "Detected 0.15mm parallel misalignment during last laser alignment check." },
          { prob: "Low", title: "Baseplate Resonance", desc: "Unlikely given current operating RPM, but historical data shows similar harmonics." }
        ],
        actions: [
          "Schedule immediate thermography scan of housing.",
          "Prepare spare parts from warehouse based on OEM specs.",
          "Review alignment report and schedule re-alignment during next planned shutdown."
        ],
        docs: [docTitle, "Vibration_Analysis_Q2.csv", "OEM_Manual_Centrifugal.pdf"]
      });
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Activity className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Failure Analysis (RCA)</h1>
        </div>
        <p className="text-gray-500 mb-8">AI-powered Root Cause Analysis connecting maintenance logs, telemetry, and OEM manuals.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input form */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card-base p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600" />
                New Analysis
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Target Document for Analysis</label>
                  <select value={selectedDocId} onChange={(e) => setSelectedDocId(e.target.value)} className="input-base">
                    {docs.length === 0 && <option value="">No documents uploaded yet</option>}
                    {docs.map(doc => (
                      <option key={doc.id} value={doc.id}>{doc.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Reported Symptom / Failure</label>
                  <textarea rows={3} className="input-base resize-none" defaultValue="High vibration detected on outboard bearing during morning rounds." />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Time of Incident</label>
                  <input type="datetime-local" className="input-base" defaultValue="2024-03-15T08:30" />
                </div>
                <button 
                  onClick={handleAnalyze} 
                  disabled={analyzing} 
                  className="btn-primary w-full justify-center mt-2"
                >
                  {analyzing ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing Knowledge Base...</>
                  ) : (
                    "Generate RCA Report"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-2">
            {!analyzing && !result && (
              <div className="card-base h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
                <Activity className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Ready to Analyze</h3>
                <p className="text-gray-500 max-w-sm mt-2">Select an asset and describe the symptom. The AI will scan your entire document corpus to find historical patterns and OEM guidelines.</p>
              </div>
            )}

            {analyzing && (
              <div className="card-base h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 animate-pulse">Fusing Heterogeneous Data...</h3>
                <div className="text-sm text-gray-500 mt-3 space-y-1">
                  <p>Scanning 4,200 maintenance work orders...</p>
                  <p>Extracting parameters from OEM P&IDs...</p>
                  <p>Correlating with previous failure modes...</p>
                </div>
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="card-base p-6 border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="badge-brand mb-2">AI Generated Report</span>
                      <h2 className="text-xl font-bold text-gray-900">{result.asset} Failure Analysis</h2>
                      <p className="text-sm text-gray-600 mt-1">Symptom: {result.symptom}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-600">{result.confidence}%</div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Confidence</div>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Probable Root Causes</h3>
                  <div className="space-y-3 mb-6">
                    {result.causes.map((cause: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex gap-4">
                        <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${cause.prob === 'High' ? 'bg-red-500' : cause.prob === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">{cause.title}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cause.prob === 'High' ? 'bg-red-50 text-red-700' : cause.prob === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                              {cause.prob} Probability
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{cause.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommended Actions
                      </h3>
                      <ul className="space-y-2">
                        {result.actions.map((action: string, idx: number) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" /> Source Documents Cited
                      </h3>
                      <ul className="space-y-2">
                        {result.docs.map((doc: string, idx: number) => (
                          <li key={idx} className="text-sm text-indigo-600 hover:underline cursor-pointer flex items-center gap-2 bg-white/50 p-1.5 rounded">
                            <FileText className="w-3 h-3 text-indigo-400" />
                            <span className="truncate">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
