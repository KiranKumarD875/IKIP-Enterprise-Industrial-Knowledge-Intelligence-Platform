"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ShieldCheck, AlertOctagon, CheckCircle2, ShieldAlert, Upload, RefreshCw, FileText, Activity, AlertTriangle, ArrowRight, BookOpen, Check } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

export default function CompliancePage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [docs, setDocs] = useState<{id: number, title: string}[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("all");
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [remediationStep, setRemediationStep] = useState(0);

  useEffect(() => {
    fetch("/api/documents").then((r) => r.json()).then((d) => {
      setDocs(d.documents || []);
    }).catch(() => {});
  }, []);

  const handleScan = () => {
    setScanning(true);
    setRemediationStep(0);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2000); // Simulated deep scan
  };

  const parsedId = selectedDocId === "all" ? 0 : parseInt(selectedDocId || "0");
  const overallScore = 86 - (parsedId % 12);
  const docsMapped = selectedDocId === "all" ? 142 : 1;
  const criticalGaps = (parsedId % 3) === 0 ? 2 : 1;
  const warnings = (parsedId % 4) + 1;

  const gapTarget = ["PESO Certification", "OISD-STD-114", "Factory Act 1948 - Safety"][(parsedId % 3)];
  const gapDesc = [
    "lacks the mandatory PESO Annexure II sign-off required for pressurized vessels above 5 bar.",
    "is missing the required Hot Work Permit signature block from the safety supervisor.",
    "fails to specify the maximum allowable occupational exposure limits for the handled chemicals."
  ][(parsedId % 3)];

  const handleGeneratePlan = () => {
    setGeneratingPlan(true);
    setTimeout(() => {
      setGeneratingPlan(false);
      setRemediationStep(1); // Start the workflow
    }, 1500);
  };

  const regulations = [
    { name: "Factory Act 1948 - Safety", status: scanned ? (gapTarget === "Factory Act 1948 - Safety" ? "fail" : "pass") : "unknown", score: gapTarget === "Factory Act 1948 - Safety" ? 45 : 98, lastCheck: "Just now", issues: gapTarget === "Factory Act 1948 - Safety" ? 1 : 0 },
    { name: "OISD-STD-114 (Hot Work)", status: scanned ? (gapTarget === "OISD-STD-114" ? "fail" : (parsedId % 2 === 0 ? "warn" : "pass")) : "unknown", score: gapTarget === "OISD-STD-114" ? 55 : 82, lastCheck: "Just now", issues: gapTarget === "OISD-STD-114" ? 2 : 0 },
    { name: "PESO Certification", status: scanned ? (gapTarget === "PESO Certification" ? "fail" : "pass") : "unknown", score: gapTarget === "PESO Certification" ? 65 : 100, lastCheck: "Just now", issues: gapTarget === "PESO Certification" ? 1 : 0 },
    { name: "ISO 9001:2015 QMS", status: scanned ? "pass" : "unknown", score: 100, lastCheck: "Just now", issues: 0 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto animate-fade-in pb-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg shadow-inner">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Compliance Command Center</h1>
            </div>
            <p className="text-gray-500 text-lg">Automatically map enterprise data against global regulatory requirements.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative z-50">
            <select value={selectedDocId} onChange={(e) => {setSelectedDocId(e.target.value); setScanned(false);}} className="input-base w-64 text-sm bg-gray-50 border-gray-200 focus:bg-white focus:ring-emerald-500 focus:border-emerald-500">
              <option value="all">Enterprise-Wide Audit (142 Docs)</option>
              {docs.map(doc => (
                <option key={doc.id} value={doc.id}>Target: {doc.title}</option>
              ))}
            </select>
            <button onClick={handleScan} disabled={scanning} className="btn-primary bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-500/20 shadow-lg min-w-[140px] justify-center">
              {scanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
              {scanning ? "Auditing..." : "Run AI Audit"}
            </button>
          </div>
        </div>

        {/* Executive KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card-base relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-50 pointer-events-none" />
            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-emerald-900 font-semibold text-sm uppercase tracking-wider">Overall Compliance</h3>
                <ShieldCheck className="w-5 h-5 text-emerald-500 opacity-50" />
              </div>
              <div>
                <div className="text-5xl font-bold text-emerald-600 tracking-tight mb-2">
                  {scanned ? `${overallScore}%` : <span className="text-gray-300">--%</span>}
                </div>
                {scanned && (
                  <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallScore}%` }} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="card-base p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-semibold text-sm uppercase tracking-wider">Documents Mapped</h3>
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-5xl font-bold text-gray-900 tracking-tight">
              {scanned ? docsMapped : <span className="text-gray-300">--</span>}
            </div>
          </div>

          <div className="card-base relative overflow-hidden group border-red-100">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50 pointer-events-none" />
            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-red-900 font-semibold text-sm uppercase tracking-wider">Critical Gaps</h3>
                <ShieldAlert className="w-5 h-5 text-red-500 opacity-50" />
              </div>
              <div className="text-5xl font-bold text-red-600 tracking-tight">
                {scanned ? criticalGaps : <span className="text-gray-300">--</span>}
              </div>
            </div>
          </div>

          <div className="card-base relative overflow-hidden group border-amber-100">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50 pointer-events-none" />
            <div className="p-6 relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-amber-900 font-semibold text-sm uppercase tracking-wider">Active Warnings</h3>
                <AlertOctagon className="w-5 h-5 text-amber-500 opacity-50" />
              </div>
              <div className="text-5xl font-bold text-amber-600 tracking-tight">
                {scanned ? warnings : <span className="text-gray-300">--</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Matrix */}
        <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Regulatory Standards Matrix</h2>
        <div className="card-base overflow-hidden mb-10 shadow-sm border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Standard / Regulation</th>
                <th className="p-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">AI Confidence / Match Score</th>
                <th className="p-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Last Audit</th>
                <th className="p-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Detected Issues</th>
              </tr>
            </thead>
            <tbody>
              {scanning ? (
                // Skeleton loading rows
                [1,2,3,4].map(i => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded-full animate-pulse w-24"></div></td>
                    <td className="p-4"><div className="h-2 bg-gray-200 rounded-full animate-pulse w-full"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div></td>
                    <td className="p-4"><div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div></td>
                  </tr>
                ))
              ) : (
                regulations.map((reg, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-semibold text-gray-900">{reg.name}</td>
                    <td className="p-4">
                      {reg.status === "pass" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3.5 h-3.5" /> COMPLIANT</span>}
                      {reg.status === "warn" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><AlertOctagon className="w-3.5 h-3.5" /> WARNING</span>}
                      {reg.status === "fail" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 animate-pulse"><ShieldAlert className="w-3.5 h-3.5" /> CRITICAL GAP</span>}
                      {reg.status === "unknown" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">PENDING SCAN</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-gray-900 w-10">{scanned ? `${reg.score}%` : "—"}</span>
                        {scanned && (
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${reg.score > 80 ? 'bg-emerald-500' : reg.score > 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${reg.score}%` }} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">{scanned ? reg.lastCheck : "Never"}</td>
                    <td className="p-4">
                      {scanned ? (
                        reg.issues > 0 ? (
                          <button 
                            onClick={() => {
                              document.getElementById('gap-details')?.scrollIntoView({ behavior: 'smooth' });
                              const el = document.getElementById('gap-details');
                              if (el) {
                                el.classList.add('ring-4', 'ring-red-200');
                                setTimeout(() => el.classList.remove('ring-4', 'ring-red-200'), 2000);
                              }
                            }} 
                            className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 focus:outline-none"
                          >
                            Review {reg.issues} findings <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400 font-medium">—</span>
                        )
                      ) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Gap Details & Remediation Engine */}
        {scanned && (
          <div id="gap-details" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Context Panel */}
            <div className="lg:col-span-1 card-base p-6 border-red-200 bg-red-50/20 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <ShieldAlert className="w-32 h-32 text-red-600" />
              </div>
              <h3 className="font-bold text-red-900 flex items-center gap-2 mb-2">
                <ShieldAlert className="w-5 h-5" /> Critical Gap: {gapTarget}
              </h3>
              <div className="text-red-800 text-sm mb-6 leading-relaxed relative z-10">
                <span className="font-semibold block mb-1">AI Finding:</span>
                The semantic scan detected that the <span className="font-semibold underline decoration-red-300">"{selectedDocId === "all" || !docs.find(d => d.id.toString() === selectedDocId) ? "Tank Farm Inspection Report 2024" : docs.find(d => d.id.toString() === selectedDocId)?.title}"</span> {gapDesc}
              </div>
              
              <div className="mt-auto relative z-10">
                <button 
                  onClick={handleGeneratePlan} 
                  disabled={generatingPlan || remediationStep > 0} 
                  className="w-full btn-primary bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-50 justify-center shadow-red-600/20 shadow-lg"
                >
                  {generatingPlan ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                  {generatingPlan ? "Synthesizing Plan..." : "Auto-Generate Remediation Plan"}
                </button>
              </div>
            </div>

            {/* Interactive Remediation Workflow */}
            <div className="lg:col-span-2 card-base p-0 overflow-hidden flex flex-col">
              <div className="bg-gray-50 border-b border-gray-100 p-4 px-6 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" /> AI Action Workflow
                </h4>
                {remediationStep > 0 && (
                  <span className="badge-success bg-indigo-50 text-indigo-700 border-indigo-200">Plan Generated</span>
                )}
              </div>
              
              <div className="p-6 flex-1 bg-white">
                {remediationStep === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-12">
                    <FileText className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm max-w-sm">Click the generate button to create an AI-guided step-by-step remediation workflow for this gap.</p>
                  </div>
                ) : (
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-indigo-100" />
                    
                    <div className="space-y-6 relative z-10">
                      
                      {/* Step 1 */}
                      <div className="flex gap-4 group">
                        <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-colors ${remediationStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {remediationStep > 1 ? <Check className="w-6 h-6" /> : "1"}
                        </div>
                        <div className={`pt-3 pb-4 flex-1 transition-opacity ${remediationStep === 1 ? 'opacity-100' : 'opacity-60'}`}>
                          <h5 className="font-bold text-gray-900 mb-1">Review Documentation</h5>
                          <p className="text-sm text-gray-600 mb-3">Identify the missing {gapTarget} components in the reported documentation.</p>
                          {remediationStep === 1 && (
                            <button 
                              onClick={() => {
                                toast.success("Document marked as reviewed by User.");
                                setRemediationStep(2);
                              }} 
                              className="btn-secondary text-xs px-3 py-1.5"
                            >
                              Mark Reviewed
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-4 group">
                        <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-colors ${remediationStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          {remediationStep > 2 ? <Check className="w-6 h-6" /> : "2"}
                        </div>
                        <div className={`pt-3 pb-4 flex-1 transition-opacity ${remediationStep === 2 ? 'opacity-100' : 'opacity-60'}`}>
                          <h5 className="font-bold text-gray-900 mb-1">Automated Escalation</h5>
                          <p className="text-sm text-gray-600 mb-3">Drafting automated alert to the Shift Safety Supervisor regarding the {gapTarget} violation.</p>
                          {remediationStep === 2 && (
                            <button 
                              onClick={() => {
                                toast.success("Alert email sent to Shift Safety Supervisor.");
                                setRemediationStep(3);
                              }} 
                              className="btn-primary bg-indigo-600 hover:bg-indigo-700 text-xs px-3 py-1.5"
                            >
                              Send Alert
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-4 group">
                        <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-colors ${remediationStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                          3
                        </div>
                        <div className={`pt-3 pb-0 flex-1 transition-opacity ${remediationStep === 3 ? 'opacity-100' : 'opacity-60'}`}>
                          <h5 className="font-bold text-gray-900 mb-1">Upload Rectified Evidence</h5>
                          <p className="text-sm text-gray-600 mb-4">Once the supervisor signs the document, upload the digitally signed addendum here to re-ingest into the Knowledge Graph.</p>
                          {remediationStep === 3 && (
                            <Link href="/dashboard/documents" className="inline-flex items-center gap-2 btn-primary bg-emerald-600 hover:bg-emerald-700 text-xs px-4 py-2 border-0 shadow-lg shadow-emerald-600/20">
                              <Upload className="w-4 h-4" /> Go to Uploads
                            </Link>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
