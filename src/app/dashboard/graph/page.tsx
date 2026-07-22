"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Network, Search, Filter, Check, Maximize2, Shrink, X, Plus } from "lucide-react";

import dynamic from "next/dynamic";

const DynamicGraph = dynamic(() => import("@/components/graph/DynamicGraph"), { ssr: false });

const generateMockData = (docId: string, docTitle: string, filters: any) => {
  const nodes: any[] = [];
  const links: any[] = [];

  // Define nodes based on the prompt's Industrial Knowledge Graph requirements
  const equip1 = { id: 'eq1', name: 'Compressor C-101', val: 25, color: '#f59e0b', group: 'equipment', desc: 'Main intake compressor for Unit 4.' };
  const equip2 = { id: 'eq2', name: 'Pump P-304', val: 25, color: '#f59e0b', group: 'equipment', desc: 'Centrifugal pump for coolant circulation.' };
  const equip3 = { id: 'eq3', name: 'Turbine T-900', val: 25, color: '#f59e0b', group: 'equipment', desc: 'Steam turbine.' };
  
  const maint1 = { id: 'm1', name: 'WO-1024: Seal Replacement', val: 15, color: '#8b5cf6', group: 'maintenance', desc: 'Replaced primary mechanical seal due to minor leak.' };
  const maint2 = { id: 'm2', name: 'WO-2911: Bearing Check', val: 15, color: '#8b5cf6', group: 'maintenance', desc: 'Routine inspection of thrust bearings.' };
  const maint3 = { id: 'm3', name: 'WO-3302: Valve Calibration', val: 15, color: '#8b5cf6', group: 'maintenance', desc: 'Calibrated discharge valve.' };
  
  const fail1 = { id: 'f1', name: 'Seal Leakage Event', val: 18, color: '#ef4444', group: 'failure', desc: 'Detected 5% drop in pressure due to seal failure.' };
  const fail2 = { id: 'f2', name: 'High Temp Alarm', val: 18, color: '#ef4444', group: 'failure', desc: 'Bearing temperature exceeded 85C threshold.' };
  const fail3 = { id: 'f3', name: 'Vibration Fault', val: 18, color: '#ef4444', group: 'failure', desc: 'High radial vibration detected.' };
  
  const insp1 = { id: 'i1', name: 'Q3 Safety Audit', val: 15, color: '#10b981', group: 'inspection', desc: 'Quarterly environmental and safety audit.' };
  const insp2 = { id: 'i2', name: 'Annual Pressure Test', val: 15, color: '#10b981', group: 'inspection', desc: 'Hydrostatic testing of pressure vessels.' };
  const insp3 = { id: 'i3', name: 'Emissions Check', val: 15, color: '#10b981', group: 'inspection', desc: 'Flue gas monitoring.' };
  
  const reg1 = { id: 'r1', name: 'ISO 45001 (Safety)', val: 22, color: '#3b82f6', group: 'regulation', desc: 'Occupational health and safety standard.' };
  const reg2 = { id: 'r2', name: 'OSHA 1910.119', val: 22, color: '#3b82f6', group: 'regulation', desc: 'Process safety management of highly hazardous chemicals.' };
  const reg3 = { id: 'r3', name: 'EPA Clean Air Act', val: 22, color: '#3b82f6', group: 'regulation', desc: 'Federal law regulating air emissions.' };
  
  const eng1 = { id: 'eng1', name: 'Sarah Smith (Reliability)', val: 18, color: '#ec4899', group: 'engineer', desc: 'Lead Reliability Engineer.' };
  const eng2 = { id: 'eng2', name: 'John Doe (Maintenance)', val: 18, color: '#ec4899', group: 'engineer', desc: 'Senior Mechanical Technician.' };
  const eng3 = { id: 'eng3', name: 'Mike Chen (Auditor)', val: 18, color: '#ec4899', group: 'engineer', desc: 'External HSE Auditor.' };
  
  const dept1 = { id: 'd1', name: 'Maintenance Dept', val: 30, color: '#14b8a6', group: 'department', desc: 'Responsible for plant upkeep.' };
  const dept2 = { id: 'd2', name: 'Safety & Quality Dept', val: 30, color: '#14b8a6', group: 'department', desc: 'Ensures compliance and safe operations.' };
  
  const proj1 = { id: 'p1', name: 'Plant Expansion 2024', val: 28, color: '#f97316', group: 'project', desc: 'Adding 30% capacity to Unit 4.' };
  const proj2 = { id: 'p2', name: 'Efficiency Upgrade', val: 28, color: '#f97316', group: 'project', desc: 'Retrofitted high-efficiency impellers.' };
  
  const doc1 = { id: 'doc1', name: 'OEM Manual C-101', val: 12, color: '#94a3b8', group: 'document', desc: 'Original equipment manufacturer guidelines.' };
  const doc2 = { id: 'doc2', name: 'Pump P-304 Specs', val: 12, color: '#94a3b8', group: 'document', desc: 'Datasheet and performance curves.' };
  const doc3 = { id: 'doc3', name: 'Incident Report #88', val: 12, color: '#94a3b8', group: 'document', desc: 'Root cause analysis of seal failure.' };
  
  const allNodes = [equip1, equip2, equip3, maint1, maint2, maint3, fail1, fail2, fail3, insp1, insp2, insp3, reg1, reg2, reg3, eng1, eng2, eng3, dept1, dept2, proj1, proj2, doc1, doc2, doc3];
  
  let documentSpecificNodes = allNodes;
  
  // Dynamic Document Node (if not 'all')
  const centerNode = { id: 'center', name: docId === 'all' ? "Enterprise Graph" : docTitle, val: 35, color: '#4f46e5', group: 'document', desc: 'The focal point of the current knowledge view.' };

  if (docId !== 'all') {
    const seed = parseInt(docId) || 1;
    documentSpecificNodes = allNodes.filter((_, i) => (i + seed) % 2 === 0 || (i + seed) % 3 === 0);
    if (documentSpecificNodes.length < 5) documentSpecificNodes = allNodes.slice(0, 8);
    documentSpecificNodes.push(centerNode);
  } else {
    documentSpecificNodes.push(centerNode);
  }

  // Filter nodes based on state
  documentSpecificNodes.forEach(n => {
    if (filters[n.group]) nodes.push(n);
  });

  const link = (s: string, t: string) => {
    if (nodes.find(n => n.id === s) && nodes.find(n => n.id === t)) {
      links.push({ source: s, target: t });
    }
  };

  link('eq1', 'm1');
  link('eq2', 'm2');
  link('eq3', 'm3');
  link('eq1', 'm2'); 
  link('m1', 'f1');
  link('m2', 'f2');
  link('m3', 'f3');
  link('f1', 'i1');
  link('f2', 'i2');
  link('f3', 'i3');
  link('f1', 'i2');
  link('i1', 'r1');
  link('i2', 'r2');
  link('i3', 'r3');
  link('i1', 'r2');
  link('eng1', 'm1');
  link('eng2', 'm2');
  link('eng1', 'm3');
  link('eng3', 'i1');
  link('eng3', 'i3');
  link('d1', 'eq1');
  link('d1', 'eq2');
  link('d1', 'eq3');
  link('d2', 'eq1'); 
  link('p1', 'doc1');
  link('p1', 'doc2');
  link('p2', 'doc3');
  link('doc1', 'eq1');
  link('doc2', 'eq2');
  link('doc3', 'f1'); 
  link('d1', 'eng1');
  link('d1', 'eng2');
  link('d2', 'eng3');

  if (docId !== 'all') {
    link('center', 'eq1');
    link('center', 'p1');
    link('center', 'r1');
    link('center', 'eng1');
  } else {
    // If "all", link center to departments
    link('center', 'd1');
    link('center', 'd2');
  }

  return { nodes, links, centerNode };
};

export default function GraphPage() {
  const [docs, setDocs] = useState<{id: number, title: string}[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedNode, setSelectedNode] = useState<any>(null);
  
  const [filters, setFilters] = useState({
    equipment: true,
    maintenance: true,
    failure: true,
    inspection: true,
    regulation: true,
    engineer: true,
    department: true,
    project: true,
    document: true,
  });
  
  const [graphData, setGraphData] = useState<{nodes: any[], links: any[]}>({ nodes: [], links: [] });

  useEffect(() => {
    fetch("/api/documents").then((r) => r.json()).then((d) => {
      setDocs(d.documents || []);
    }).catch(() => {});
  }, []);

  // Regenerate base graph when document or filters change
  useEffect(() => {
    const selectedDoc = docs.find(d => d.id.toString() === selectedDocId);
    const docTitle = selectedDoc ? selectedDoc.title : "Knowledge Base";
    const data = generateMockData(selectedDocId, docTitle, filters);
    setGraphData(data as any);
    
    // Set default selected node to the center node
    setSelectedNode(data.centerNode);
  }, [selectedDocId, docs, filters]);

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandRelationships = () => {
    if (!selectedNode) return;
    
    // Dynamically create new nodes attached to the selected node
    const newNodes = [];
    const newLinks = [];
    const count = graphData.nodes.length;
    
    const docContext = docs.find(d => d.id.toString() === selectedDocId)?.title || "Enterprise Base";
    
    let contextualExpansions = [];

    // Provide extremely realistic, professional contextual nodes based on what the user clicked
    switch (selectedNode.group) {
      case 'equipment':
        contextualExpansions = [
          { name: `Vibration Log: ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: `Extracted from ${docContext}.` },
          { name: `Stress Fracture in ${selectedNode.name}`, group: 'failure', color: '#ef4444', desc: 'Anomaly detected in predictive maintenance scan.' },
          { name: `WO-99${Math.floor(Math.random() * 10)}: Repair ${selectedNode.name}`, group: 'maintenance', color: '#8b5cf6', desc: 'Scheduled maintenance action.' }
        ];
        break;
      case 'maintenance':
        contextualExpansions = [
          { name: `Technician for ${selectedNode.name}`, group: 'engineer', color: '#ec4899', desc: 'Assigned specialist.' },
          { name: `Compliance Check for ${selectedNode.name}`, group: 'regulation', color: '#3b82f6', desc: `Verified against ${docContext}.` }
        ];
        break;
      case 'document':
        contextualExpansions = [
          { name: `Procedure Step extracted from ${selectedNode.name}`, group: 'inspection', color: '#10b981', desc: 'Auto-parsed from document text.' },
          { name: `Regulation applied in ${selectedNode.name}`, group: 'regulation', color: '#3b82f6', desc: 'Semantic match found.' }
        ];
        break;
      case 'failure':
        contextualExpansions = [
          { name: `RCA Report for ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: `Root cause analysis based on ${docContext}.` },
          { name: `Emergency Audit: ${selectedNode.name}`, group: 'inspection', color: '#10b981', desc: 'Triggered by failure event.' }
        ];
        break;
      case 'inspection':
        contextualExpansions = [
          { name: `Inspector notes on ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: `Findings from ${docContext}.` },
          { name: `Non-compliance in ${selectedNode.name}`, group: 'regulation', color: '#3b82f6', desc: 'Flagged by audit.' }
        ];
        break;
      case 'regulation':
        contextualExpansions = [
          { name: `Compliance Audit for ${selectedNode.name}`, group: 'inspection', color: '#10b981', desc: `Scheduled audit based on ${docContext}.` },
          { name: `Department impacted by ${selectedNode.name}`, group: 'department', color: '#14b8a6', desc: 'Policy enforcement.' }
        ];
        break;
      case 'engineer':
        contextualExpansions = [
          { name: `Assigned Tasks for ${selectedNode.name}`, group: 'maintenance', color: '#8b5cf6', desc: `Extracted from ${docContext}.` },
          { name: `Training Certs: ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: 'Personnel records.' }
        ];
        break;
      case 'department':
        contextualExpansions = [
          { name: `Budget Report: ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: `Financials from ${docContext}.` },
          { name: `Lead Engineer: ${selectedNode.name}`, group: 'engineer', color: '#ec4899', desc: 'Department head.' }
        ];
        break;
      case 'project':
        contextualExpansions = [
          { name: `Status Update: ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: `Extracted from ${docContext}.` },
          { name: `Affected Equipment by ${selectedNode.name}`, group: 'equipment', color: '#f59e0b', desc: 'Project dependencies.' }
        ];
        break;
      default:
        contextualExpansions = [
          { name: `Correlated Alert for ${selectedNode.name}`, group: 'failure', color: '#ef4444', desc: `Discovered anomaly in ${docContext}.` },
          { name: `Automated Impact Analysis on ${selectedNode.name}`, group: 'document', color: '#94a3b8', desc: 'AI generated risk assessment.' }
        ];
        break;
    }
    
    contextualExpansions.forEach((exp, i) => {
      const rId = `dyn_${count}_${i}`;
      newNodes.push({
        id: rId,
        name: exp.name,
        val: 15 + Math.random() * 5,
        color: exp.color,
        group: exp.group,
        desc: exp.desc
      });
      newLinks.push({ source: selectedNode.id, target: rId });
    });

    // Merge into existing graph data
    setGraphData(prev => ({
      nodes: [...prev.nodes, ...newNodes],
      links: [...prev.links, ...newLinks]
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    const found = graphData.nodes.find(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (found) {
      setSelectedNode(found);
      // We would ideally zoom here too, but passing selectedNode triggers the panel
    }
    setSearchQuery("");
    setShowSearch(false);
  };

  const getConfidence = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    return (85 + (Math.abs(hash) % 14) + (Math.abs(hash) % 10) / 10).toFixed(1);
  };
  const getStatus = (id: string) => {
    return (id.includes('f') || id.includes('m')) ? 'Warning' : 'Active';
  };
  const getSyncTime = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
    const num = Math.abs(hash) % 59 + 1;
    return `${num} mins ago`;
  };

  return (
    <DashboardLayout>
      <div className={`mx-auto flex flex-col transition-all duration-300 bg-white ${isFullscreen ? 'fixed inset-0 z-[100] p-6 w-full h-full max-w-none' : 'w-full h-[calc(100vh-90px)] rounded-2xl shadow-elevated border border-gray-200 overflow-hidden max-w-[1600px] -mt-2 -mb-2'}`}>
        <div className={`flex items-center justify-between mb-6 ${isFullscreen ? '' : 'p-6 pb-0'}`}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Network className="w-5 h-5 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Graph Explorer</h1>
            </div>
            <p className="text-gray-500">Uncover latent insights and map complex topological dependencies across your enterprise asset ecosystem in real-time.</p>
          </div>
          <div className="flex gap-3 relative z-50">
            <select value={selectedDocId} onChange={(e) => setSelectedDocId(e.target.value)} className="input-base w-64 text-sm bg-white">
              <option value="all">Enterprise Knowledge Base</option>
              {docs.map(doc => (
                <option key={doc.id} value={doc.id}>Graph: {doc.title}</option>
              ))}
            </select>
            
            <div className="relative">
              {showSearch ? (
                <form onSubmit={handleSearchSubmit} className="flex">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Search node..." 
                    className="input-base text-sm w-48 pr-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowSearch(false)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setShowSearch(true)} className="btn-secondary whitespace-nowrap">
                  <Search className="w-4 h-4" /> Search Graph
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Interactive Graph Visualizer Area */}
        <div className="relative flex flex-1 h-full">
          
          {/* Main Graph Panel */}
          <div className="card-base flex-1 relative overflow-hidden bg-gray-50 flex items-center justify-center border-gray-200 shadow-inner z-0 rounded-r-none border-r-0">
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0"></div>
            
            {/* Top Left Graph Controls */}
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Expand Graph"}
              >
                {isFullscreen ? <Shrink className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors ${showFilters ? 'ring-2 ring-indigo-500' : ''}`}
                  title="Filter Nodes"
                >
                  <Filter className="w-5 h-5" />
                </button>
                {showFilters && (
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-floating p-2 z-50">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Show Entities</h4>
                    {(Object.keys(filters) as Array<keyof typeof filters>).map(key => (
                      <button key={key} onClick={() => toggleFilter(key)} className="flex items-center justify-between w-full px-2 py-1.5 text-sm hover:bg-gray-50 rounded text-left capitalize">
                        {key} {filters[key as keyof typeof filters] && <Check className="w-4 h-4 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="absolute inset-0 z-10 cursor-move">
              <DynamicGraph data={graphData} onNodeSelect={setSelectedNode} />
            </div>
          </div>

          {/* Right Side Details Panel */}
          <div className={`bg-white border border-gray-200 shadow-md rounded-r-xl p-6 flex flex-col z-10 overflow-y-auto transition-all duration-300 ${isFullscreen ? 'w-96' : 'w-80'}`}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 border-b border-gray-100 pb-2">Node Details</h3>
            
            {selectedNode ? (
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedNode.color || '#4f46e5' }}></div>
                  <span className="text-xs font-semibold uppercase text-gray-500">{selectedNode.group}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedNode.name}</h2>
                <p className="text-sm text-gray-600 mb-6">
                  {selectedNode.desc || "Information and context extracted from the enterprise knowledge base."}
                </p>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-6">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Connections</span>
                    <span className="font-semibold text-gray-900">
                      {graphData.links.filter((l:any) => 
                        (typeof l.source === 'object' ? l.source.id : l.source) === selectedNode.id || 
                        (typeof l.target === 'object' ? l.target.id : l.target) === selectedNode.id
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Relevance Score</span>
                    <span className="font-semibold text-indigo-600">{Math.round((selectedNode.val / 35) * 100)}%</span>
                  </div>
                </div>

                {/* NEW INFO BLOCK */}
                <div className="mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Entity Metadata</h4>
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">System Status</span>
                    {getStatus(selectedNode.id) === 'Active' ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Warning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Data Confidence</span>
                    <span className="text-gray-900 font-medium">{getConfidence(selectedNode.id)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Last Synced</span>
                    <span className="text-gray-900 font-medium">{getSyncTime(selectedNode.id)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Knowledge Source</span>
                    <span className="text-indigo-600 font-medium cursor-pointer hover:underline">View Origin</span>
                  </div>
                </div>

                {/* Graph Legend placed directly above the Expand button */}
                <div className="mb-6 bg-white">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Graph Legend</h4>
                  <div className="space-y-2 text-sm font-medium grid grid-cols-2 gap-x-2">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div> Equipment</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8b5cf6]"></div> Maintenance</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> Failure</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> Inspection</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div> Regulation</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ec4899]"></div> Engineer</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#14b8a6]"></div> Department</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#f97316]"></div> Project</div>
                    <div className="flex items-center gap-2 col-span-2"><div className="w-3 h-3 rounded-full bg-[#94a3b8]"></div> Document</div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={handleExpandRelationships}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Expand Relationships
                  </button>
                  <p className="text-center text-[10px] text-gray-400 mt-2">
                    Querying AI engine for deeper connections...
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Network className="w-12 h-12 text-gray-200 mb-4" />
                <p className="text-sm text-gray-400">Click a node in the graph to view its intelligence details.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
