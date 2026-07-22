"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Send, Star, Clock, Brain, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Query {
  id: number;
  query_text: string;
  response_text: string;
  confidence: number;
  sources: string;
  created_at: string;
}

interface Doc {
  id: number;
  title: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [queryText, setQueryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedbackSent, setFeedbackSent] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/api/queries").then((r) => r.json()).then((d) => setQueries(d.queries || [])).catch(() => {});
    fetch("/api/documents").then((r) => r.json()).then((d) => setDocs(d.documents || [])).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          query_text: queryText,
          document_id: selectedDocId ? parseInt(selectedDocId) : null
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setQueries([data, ...queries]);
        setQueryText("");
      } else {
        setError(data.error);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (queryId: number, rating: number) => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query_id: queryId, rating }),
    });
    setFeedbackSent((prev) => new Set(prev).add(queryId));
  };

  const handleDelete = async (queryId: number) => {
    try {
      const res = await fetch(`/api/queries/${queryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setQueries((prev) => prev.filter((q) => q.id !== queryId));
      }
    } catch (err) {
      console.error("Failed to delete query", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Copilot</h1>
        <p className="text-gray-500 mb-8">Ask questions about your industrial knowledge base.</p>

        {/* Query input */}
        <form onSubmit={handleSubmit} className="card-base p-4 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">Ask anything about your assets, maintenance, or compliance</span>
          </div>
          <div className="mb-4">
            <select 
              value={selectedDocId} 
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="input-base py-2 text-sm bg-gray-50 max-w-xs"
            >
              <option value="">All Documents (General Knowledge)</option>
              {docs.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.title}</option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded-lg mb-3">{error}</p>}
          <div className="flex gap-3">
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="e.g., What caused the last pump failure in Unit 3?"
              className="input-base flex-1 text-lg py-3"
            />
            <button type="submit" disabled={loading} className="btn-primary px-8 text-lg">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </form>

        {/* Query history */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Query History</h2>
        {queries.length === 0 ? (
          <div className="card-base p-12 text-center">
            <Brain className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No queries yet. Ask your first question above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {queries.map((q) => (
              <div key={q.id} className="card-base p-6">
                <div className="flex items-start justify-between mb-4">
                  <p className="font-bold text-gray-900 text-lg pr-4">{q.query_text}</p>
                  <button 
                    onClick={() => handleDelete(q.id)}
                    className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                    title="Delete query"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-4 prose prose-indigo max-w-none text-base relative">
                  <div className="absolute top-3 right-4 text-[10px] text-indigo-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    {q.created_at ? new Date(q.created_at).toLocaleDateString("en-US") : "Just now"}
                  </div>
                  <div className="pt-2 text-gray-800 leading-relaxed">
                    <ReactMarkdown>{q.response_text}</ReactMarkdown>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs not-prose">
                    {q.sources && <span className="text-gray-400">Sources: {q.sources}</span>}
                  </div>
                </div>
                {/* Feedback */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Rate this answer:</span>
                  {feedbackSent.has(q.id) ? (
                    <span className="text-xs text-emerald-600 font-medium">Thanks for your feedback!</span>
                  ) : (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button key={r} onClick={() => handleFeedback(q.id, r)} className="text-gray-300 hover:text-amber-400 transition-colors">
                          <Star className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
