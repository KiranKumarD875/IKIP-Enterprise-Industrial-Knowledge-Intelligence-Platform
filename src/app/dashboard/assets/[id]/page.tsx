"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { ArrowLeft, Activity, Settings, Cpu, Thermometer, Gauge, Wind, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock telemetry simulation hook
function useLiveTelemetry(baseValue: number, variance: number, intervalMs: number = 2000) {
  const [value, setValue] = useState(baseValue);
  const [history, setHistory] = useState<number[]>(Array(20).fill(baseValue));

  useEffect(() => {
    const timer = setInterval(() => {
      const change = (Math.random() - 0.5) * variance;
      setValue(prev => {
        const next = Number((prev + change).toFixed(1));
        setHistory(h => [...h.slice(1), next]);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [baseValue, variance, intervalMs]);

  return { value, history };
}

export default function AssetDigitalTwinPage() {
  const params = useParams();
  const id = params.id as string;

  // Derive initial states based on ID
  const isCritical = id === 'eq3';
  const assetName = isCritical ? 'Turbine T-900' : id === 'eq1' ? 'Compressor C-101' : 'Pump P-304';
  
  // Live telemetry hooks
  const temp = useLiveTelemetry(isCritical ? 85.4 : 65.2, 2.5); // Temp C
  const pressure = useLiveTelemetry(isCritical ? 14.2 : 12.5, 0.8, 1500); // Pressure bar
  const vibration = useLiveTelemetry(isCritical ? 9.8 : 2.4, 1.2, 1000); // Vibration mm/s

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto animate-fade-in">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <Link href="/dashboard/assets" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Fleet
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${isCritical ? 'bg-red-100' : 'bg-indigo-100'}`}>
                  <Settings className={`w-6 h-6 ${isCritical ? 'text-red-600 animate-spin-slow' : 'text-indigo-600'}`} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{assetName}</h1>
                <div className={`px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wide ml-2 ${
                  isCritical ? 'bg-red-50 text-red-700 border border-red-200 animate-pulse' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {isCritical ? 'CRITICAL' : 'ACTIVE'}
                </div>
              </div>
              <p className="text-gray-500">Live Digital Twin & AI Predictive Diagnostics</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col items-end pr-4 border-r border-gray-100">
                <span className="text-xs text-gray-500 font-semibold uppercase mb-1">Health Index</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${isCritical ? 'text-red-600' : 'text-emerald-600'}`}>
                    {isCritical ? '45%' : '92%'}
                  </span>
                  {!isCritical && <Activity className="w-5 h-5 text-emerald-500" />}
                </div>
              </div>
              <div className="flex flex-col items-start pl-2">
                <span className="text-xs text-gray-500 font-semibold uppercase mb-1">Last Sync</span>
                <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Just now
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Telemetry & Twin (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Telemetry Stream */}
            <div className="card-base p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Live Sensor Telemetry
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Temperature */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Thermometer className="w-5 h-5" /> Temperature
                    </div>
                    <span className={`text-xl font-bold ${temp.value > 80 ? 'text-red-600' : 'text-gray-900'}`}>{temp.value}°C</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {temp.history.map((val, i) => (
                      <div key={i} className={`flex-1 rounded-t-sm opacity-50 ${val > 80 ? 'bg-red-400' : 'bg-indigo-400'}`} style={{ height: `${(val / 100) * 100}%` }} />
                    ))}
                  </div>
                </div>

                {/* Pressure */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Gauge className="w-5 h-5" /> Pressure
                    </div>
                    <span className="text-xl font-bold text-gray-900">{pressure.value} bar</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {pressure.history.map((val, i) => (
                      <div key={i} className="flex-1 bg-cyan-400 rounded-t-sm opacity-50" style={{ height: `${(val / 20) * 100}%` }} />
                    ))}
                  </div>
                </div>

                {/* Vibration */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                      <Wind className="w-5 h-5" /> Vibration
                    </div>
                    <span className={`text-xl font-bold ${vibration.value > 7 ? 'text-red-600' : 'text-gray-900'}`}>{vibration.value} mm/s</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {vibration.history.map((val, i) => (
                      <div key={i} className={`flex-1 rounded-t-sm opacity-50 ${val > 7 ? 'bg-red-400' : 'bg-amber-400'}`} style={{ height: `${(val / 15) * 100}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Asset Diagram Mock */}
            <div className="card-base p-6 relative overflow-hidden bg-[#030712] min-h-[400px] flex items-center justify-center border-gray-900">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.2) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
              
              <div className="relative z-10 w-full max-w-lg">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-indigo-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
                  <Cpu className={`w-20 h-20 mb-4 ${isCritical ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`} />
                  <div className="text-center mb-6">
                    <p className="text-gray-400 font-mono text-sm mb-1">UNIT_ID: {id.toUpperCase()}</p>
                    <p className="text-white font-bold tracking-wider">3D SCAN: OPTIMAL</p>
                  </div>
                  
                  {isCritical && (
                    <div className="absolute -right-4 -top-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                      <AlertTriangle className="w-3 h-3" /> FRACTURE DETECTED
                    </div>
                  )}
                  
                  <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-800 pt-4">
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Bearing Alpha</p>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${isCritical ? 'bg-red-500 w-[90%]' : 'bg-emerald-500 w-[30%]'}`} />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">Coolant Flux</p>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 w-[70%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: RUL & SHAP */}
          <div className="space-y-6">
            
            {/* RUL Meter */}
            <div className="card-base p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Remaining Useful Life (RUL)</h3>
              
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-4">
                  {/* Gauge Arc Background */}
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path d="M 20 80 A 40 40 0 1 1 80 80" fill="none" stroke="#f3f4f6" strokeWidth="8" strokeLinecap="round" />
                    {/* Gauge Arc Value */}
                    <path 
                      d="M 20 80 A 40 40 0 1 1 80 80" 
                      fill="none" 
                      stroke={isCritical ? "#ef4444" : "#10b981"} 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      strokeDasharray="188.5" 
                      strokeDashoffset={isCritical ? "160" : "40"} 
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
                    <span className={`text-4xl font-bold ${isCritical ? 'text-red-600' : 'text-gray-900'}`}>
                      {isCritical ? '48' : '180+'}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {isCritical ? 'Hours' : 'Days'}
                    </span>
                  </div>
                </div>
                
                {isCritical ? (
                  <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>Asset is rapidly approaching failure threshold. Immediate intervention required.</p>
                  </div>
                ) : (
                  <div className="w-full bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-700 flex items-start gap-2">
                    <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>Asset is operating within normal parameters. No immediate action required.</p>
                  </div>
                )}
              </div>
            </div>

            {/* SHAP Explainability */}
            <div className="card-base p-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">AI Explainability (SHAP)</h3>
              <p className="text-xs text-gray-400 mb-6">Feature importance driving the current RUL prediction model.</p>
              
              <div className="space-y-4 relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
                
                {/* Feature 1 */}
                <div className="flex items-center justify-between relative z-10 text-sm">
                  <div className="w-[45%] text-right pr-2 text-gray-600 font-medium truncate">Vibration (Radial)</div>
                  <div className="w-[10%]"></div>
                  <div className="w-[45%] pl-2">
                    <div className={`h-4 rounded-sm ${isCritical ? 'bg-red-500 w-[80%]' : 'bg-emerald-500 w-[10%]'}`}></div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center justify-between relative z-10 text-sm">
                  <div className="w-[45%] text-right pr-2">
                    <div className="flex justify-end">
                      <div className={`h-4 rounded-sm ${isCritical ? 'bg-red-400 w-[60%]' : 'bg-emerald-400 w-[20%]'}`}></div>
                    </div>
                  </div>
                  <div className="w-[10%]"></div>
                  <div className="w-[45%] pl-2 text-gray-600 font-medium truncate">Bearing Temp</div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center justify-between relative z-10 text-sm">
                  <div className="w-[45%] text-right pr-2 text-gray-600 font-medium truncate">Operating Hours</div>
                  <div className="w-[10%]"></div>
                  <div className="w-[45%] pl-2">
                    <div className="h-4 bg-red-300 w-[40%] rounded-sm"></div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center justify-between relative z-10 text-sm">
                  <div className="w-[45%] text-right pr-2">
                    <div className="flex justify-end">
                      <div className="h-4 bg-emerald-300 w-[30%] rounded-sm"></div>
                    </div>
                  </div>
                  <div className="w-[10%]"></div>
                  <div className="w-[45%] pl-2 text-gray-600 font-medium truncate">Coolant Pressure</div>
                </div>

              </div>

              <div className="mt-6 flex items-center justify-between text-xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-emerald-500" /> Increases RUL</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-500" /> Decreases RUL</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
