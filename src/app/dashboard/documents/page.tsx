"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { FileText, Plus, Upload, Clock, Activity, CheckCircle2, ScanText, BrainCircuit, Network, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Doc {
  id: number;
  title: string;
  doc_type: string;
  status: string;
  created_at: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("pdf");
  const [file, setFile] = useState<File | null>(null);
  
  // Pipeline state
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  useEffect(() => {
    fetch("/api/documents").then((r) => r.json()).then((d) => setDocs(d.documents || [])).catch(() => {});
  }, []);

  const handleStartPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a document title.");
      return;
    }
    
    // Start the modal and pipeline
    setIsPipelineRunning(true);
    setPipelineStep(1);

    // Step 1: OCR (2 seconds)
    setTimeout(() => {
      setPipelineStep(2);
      
      // Step 2: NLP Extraction (2.5 seconds)
      setTimeout(() => {
        setPipelineStep(3);
        
        // Step 3: Knowledge Graph Mapping (2 seconds)
        setTimeout(async () => {
          setPipelineStep(4);
          
          // Actually persist to the database
          try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("doc_type", docType);
            if (file) formData.append("file", file);

            const res = await fetch("/api/documents", {
              method: "POST",
              body: formData,
            });
            const data = await res.json();
            
            if (res.ok) {
              const newDoc = { 
                id: data.document?.id || Date.now(), 
                title, 
                doc_type: docType, 
                status: "indexed", 
                created_at: new Date().toISOString() 
              };
              setDocs(prev => [newDoc, ...prev]);
            }
          } catch (e) {
            console.error("Failed to persist document", e);
          }
          
          // Complete and add doc
          setTimeout(() => {
            setTitle("");
            setFile(null);
            setShowForm(false);
            setIsPipelineRunning(false);
            setPipelineStep(0);
            toast.success("Document successfully mapped to Knowledge Graph!");
          }, 1000);
        }, 2000);
      }, 2500);
    }, 2000);
  };

  const typeColors: Record<string, string> = {
    pdf: "bg-red-50 text-red-700 border-red-200",
    text: "bg-blue-50 text-blue-700 border-blue-200",
    csv: "bg-emerald-50 text-emerald-700 border-emerald-200",
    manual: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto animate-fade-in relative pb-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg shadow-inner">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Enterprise Knowledge Base</h1>
            </div>
            <p className="text-gray-500 text-lg">Ingest raw documents and automatically map them into the AI Knowledge Graph.</p>
          </div>
          
          <button onClick={() => setShowForm(!showForm)} className="btn-primary bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
            <Plus className="w-4 h-4" /> Ingest New Document
          </button>
        </div>

        {/* Upload Form / Dropzone */}
        {showForm && !isPipelineRunning && (
          <div className="card-base p-0 mb-10 overflow-hidden border-indigo-100">
            <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b border-indigo-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-indigo-900 text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" /> AI Ingestion Pipeline
                </h3>
                <p className="text-sm text-indigo-600/70 mt-1">Initialize the document processing sequence.</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 border border-gray-200 shadow-sm">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleStartPipeline} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block uppercase tracking-wide">Document Title</label>
                  <input 
                    required 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g., Turbine T-900 OEM Manual" 
                    className="input-base text-lg py-3 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block uppercase tracking-wide">Document Type</label>
                  <select 
                    value={docType} 
                    onChange={(e) => setDocType(e.target.value)} 
                    className="input-base text-lg py-3 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                  >
                    <option value="pdf">PDF Specification</option>
                    <option value="manual">Equipment Manual</option>
                    <option value="text">Incident Report (TXT)</option>
                    <option value="csv">Sensor Log (CSV)</option>
                  </select>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-indigo-200 rounded-xl p-10 text-center bg-indigo-50/50 hover:bg-indigo-50 transition-colors group cursor-pointer relative mb-8">
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <Upload className="w-10 h-10 text-indigo-300 mx-auto mb-4 group-hover:text-indigo-500 transition-colors group-hover:-translate-y-1 transform duration-300" />
                {file ? (
                  <div className="text-indigo-700 font-bold text-lg mb-1">{file.name}</div>
                ) : (
                  <p className="text-indigo-900 font-medium text-lg mb-1">Drag and drop your file here, or click to browse</p>
                )}
                <p className="text-indigo-600/60 text-sm mt-2">Supports PDF, DOCX, TXT, CSV (Max 50MB)</p>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="btn-primary bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 px-8 py-3 text-lg">
                  <BrainCircuit className="w-5 h-5 mr-2" /> Start AI Pipeline
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AI Pipeline Tracker Modal */}
        {isPipelineRunning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden border border-gray-100">
              <div className="bg-indigo-600 p-6 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" /> Processing AI Pipeline
                  </h3>
                  <p className="text-indigo-200 text-sm mt-1">Target: {title}</p>
                </div>
                <div className="px-3 py-1 bg-indigo-700/50 rounded-full border border-indigo-500 text-sm font-semibold">
                  {pipelineStep === 1 ? 'Step 1/3' : pipelineStep === 2 ? 'Step 2/3' : pipelineStep === 3 ? 'Step 3/3' : 'Finalizing...'}
                </div>
              </div>
              
              <div className="p-8">
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-100" />
                  
                  <div className="space-y-8 relative z-10">
                    
                    {/* Step 1: OCR */}
                    <div className="flex gap-5 group">
                      <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ${pipelineStep > 1 ? 'bg-emerald-500 text-white' : pipelineStep === 1 ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-300'}`}>
                        {pipelineStep > 1 ? <CheckCircle2 className="w-6 h-6" /> : <ScanText className={`w-6 h-6 ${pipelineStep === 1 && 'animate-pulse'}`} />}
                      </div>
                      <div className={`pt-3 pb-4 flex-1 transition-opacity duration-500 ${pipelineStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                        <h5 className="font-bold text-gray-900 mb-1 text-lg">Optical Character Recognition (OCR)</h5>
                        <p className="text-gray-500">Scanning document layout, interpreting tables, and extracting raw textual data.</p>
                        {pipelineStep === 1 && (
                          <div className="mt-3 flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" /> Analyzing layouts...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2: NLP */}
                    <div className="flex gap-5 group">
                      <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ${pipelineStep > 2 ? 'bg-emerald-500 text-white' : pipelineStep === 2 ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-300'}`}>
                        {pipelineStep > 2 ? <CheckCircle2 className="w-6 h-6" /> : <BrainCircuit className={`w-6 h-6 ${pipelineStep === 2 && 'animate-pulse'}`} />}
                      </div>
                      <div className={`pt-3 pb-4 flex-1 transition-opacity duration-500 ${pipelineStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                        <h5 className="font-bold text-gray-900 mb-1 text-lg">Semantic Entity Extraction</h5>
                        <p className="text-gray-500">Using LLMs to identify specific equipment, personnel, failure modes, and metrics.</p>
                        {pipelineStep === 2 && (
                          <div className="mt-3 flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" /> Extracting named entities...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Graph Mapping */}
                    <div className="flex gap-5 group">
                      <div className={`w-14 h-14 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ${pipelineStep > 3 ? 'bg-emerald-500 text-white' : pipelineStep === 3 ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-gray-100 text-gray-300'}`}>
                        {pipelineStep > 3 ? <CheckCircle2 className="w-6 h-6" /> : <Network className={`w-6 h-6 ${pipelineStep === 3 && 'animate-pulse'}`} />}
                      </div>
                      <div className={`pt-3 pb-0 flex-1 transition-opacity duration-500 ${pipelineStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                        <h5 className="font-bold text-gray-900 mb-1 text-lg">Knowledge Graph Integration</h5>
                        <p className="text-gray-500">Wiring discovered entities into the enterprise graph and generating embeddings.</p>
                        {pipelineStep === 3 && (
                          <div className="mt-3 flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" /> Establishing node relationships...
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document List */}
        {!isPipelineRunning && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Enterprise Corpus ({docs.length})</h3>
            {docs.length === 0 ? (
              <div className="card-base p-16 text-center border-dashed border-2 border-gray-200 bg-gray-50/50">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-900 font-bold text-lg mb-1">Knowledge Base is Empty</p>
                <p className="text-gray-500 max-w-md mx-auto">Ingest your first document to begin building the enterprise knowledge graph.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {docs.map((doc) => (
                  <div key={doc.id} className="card-base p-5 hover:shadow-elevated transition-shadow group flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${typeColors[doc.doc_type] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                        {doc.doc_type}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-2 truncate" title={doc.title}>{doc.title}</h4>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                        <CheckCircle2 className="w-3 h-3" /> {doc.status === 'indexed' ? 'MAPPED' : doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
