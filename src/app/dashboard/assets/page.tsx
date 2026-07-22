"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { Cpu, Activity, AlertTriangle, CheckCircle2, ChevronRight, BarChart3, Clock, AlertCircle } from "lucide-react";

const ASSETS = [
  {
    id: "eq1",
    name: "Compressor C-101",
    type: "Centrifugal Compressor",
    status: "Warning",
    health: 68,
    rul: "14 Days",
    lastMaintenance: "2024-05-12",
    location: "Unit 4, Sector A",
  },
  {
    id: "eq2",
    name: "Pump P-304",
    type: "Centrifugal Pump",
    status: "Active",
    health: 92,
    rul: "180+ Days",
    lastMaintenance: "2024-06-01",
    location: "Unit 2, Sector B",
  },
  {
    id: "eq3",
    name: "Turbine T-900",
    type: "Steam Turbine",
    status: "Critical",
    health: 45,
    rul: "48 Hours",
    lastMaintenance: "2023-11-15",
    location: "Power Generation",
  },
  {
    id: "eq4",
    name: "Conveyor V-10",
    type: "Belt Conveyor",
    status: "Active",
    health: 88,
    rul: "120 Days",
    lastMaintenance: "2024-05-28",
    location: "Material Handling",
  },
];

export default function AssetsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto animate-fade-in">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Predictive Maintenance Fleet</h1>
            </div>
            <p className="text-gray-500 text-lg">Monitor asset health, predict anomalies, and deploy AI-driven interventions.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase">Fleet Health Avg</span>
              <span className="text-xl font-bold text-indigo-600">73.2%</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase">Critical Assets</span>
              <span className="text-xl font-bold text-red-600">1</span>
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ASSETS.map((asset) => (
            <div key={asset.id} className="card-base p-6 hover:shadow-elevated transition-shadow group flex flex-col relative">
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    asset.status === 'Active' ? 'bg-emerald-100 text-emerald-600' :
                    asset.status === 'Warning' ? 'bg-amber-100 text-amber-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {asset.status === 'Active' ? <CheckCircle2 className="w-5 h-5" /> :
                     asset.status === 'Warning' ? <AlertTriangle className="w-5 h-5" /> :
                     <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-gray-500">{asset.type}</p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
                  asset.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  asset.status === 'Warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-red-50 text-red-700 border border-red-200 animate-pulse'
                }`}>
                  {asset.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 mt-2 relative z-10">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1 font-medium">
                    <Activity className="w-3.5 h-3.5" /> Health Index
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {asset.health}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div className={`h-1.5 rounded-full ${
                      asset.health > 80 ? 'bg-emerald-500' :
                      asset.health > 50 ? 'bg-amber-500' : 'bg-red-500'
                    }`} style={{ width: `${asset.health}%` }}></div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> Est. RUL
                  </div>
                  <div className={`text-xl font-bold ${
                    asset.rul.includes('Hours') ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {asset.rul}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Remaining Useful Life</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" /> {asset.location}
                </span>
                <Link href={`/dashboard/assets/${asset.id}`} className="text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center focus:outline-none after:absolute after:inset-0">
                  Digital Twin <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
