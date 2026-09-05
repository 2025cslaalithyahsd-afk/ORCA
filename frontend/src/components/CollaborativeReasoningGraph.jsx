import React, { useState } from 'react';
import {
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  ShieldAlert,
  Compass,
  ArrowRight,
  Sparkles,
  Layers,
  AlertOctagon,
  Network
} from 'lucide-react';

export default function CollaborativeReasoningGraph({
  agentResults = [],
  crossObservations = [],
  compoundRisks = [],
  compositeScore = 75,
  riskLevel = 'Healthy'
}) {
  const [selectedObs, setSelectedObs] = useState(null);

  // Helper to find specific agent score
  const getScore = (id) => {
    const a = agentResults.find((x) => x.agent_id === id);
    return a ? Math.round(a.score) : '--';
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/25 bg-marine-900/70 overflow-hidden relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Network className="w-4 h-4" />
            <span>Multi-Agent Neural Topology</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Collaborative Cross-Agent Reasoning Engine
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Visualizing distributed multi-agent consensus, inter-agent data exchanges, and compounding ecological stress discovery.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono">
            {crossObservations.length} Cross-Agent Links
          </span>
          <span className="text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 font-mono">
            {compoundRisks.length} Compound Threats
          </span>
        </div>
      </div>

      {/* SVG Canvas & Node Topology Layout */}
      <div className="relative w-full min-h-[440px] max-w-4xl mx-auto flex flex-col items-center justify-center py-4 select-none">
        
        {/* Animated Connecting Lines (Desktop/Tablet) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
          <defs>
            <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Top Chemistry -> Center Risk (X: 50% Y: 18% to X: 50% Y: 50%) */}
          <line x1="50%" y1="20%" x2="50%" y2="45%" stroke="url(#cyan-glow)" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" filter="url(#glow)" />
          {/* Left Bio -> Center Risk (X: 18% Y: 50% to X: 45% Y: 50%) */}
          <line x1="22%" y1="50%" x2="45%" y2="50%" stroke="url(#cyan-glow)" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" filter="url(#glow)" />
          {/* Right Poll -> Center Risk (X: 82% Y: 50% to X: 55% Y: 50%) */}
          <line x1="78%" y1="50%" x2="55%" y2="50%" stroke="url(#cyan-glow)" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" filter="url(#glow)" />
          {/* Bottom Climate -> Center Risk (X: 50% Y: 82% to X: 50% Y: 55%) */}
          <line x1="50%" y1="80%" x2="50%" y2="55%" stroke="url(#cyan-glow)" strokeWidth="2.5" strokeDasharray="5 5" className="animate-pulse" filter="url(#glow)" />
        </svg>

        {/* TOP NODE: Ocean Chemistry Agent */}
        <div className="md:absolute md:top-2 md:left-1/2 md:-translate-x-1/2 z-10 mb-4 md:mb-0">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-marine-950/90 border border-cyan-500/40 shadow-glow-cyan">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Ocean Chemistry Agent</div>
              <div className="text-[10px] text-cyan-400 font-mono">DO, pH, Salinity, Nutrients • {getScore('ocean_chemistry')}/100</div>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: Left Bio - Center Risk Engine - Right Pollution */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0 z-10 my-4 md:my-0">
          
          {/* LEFT NODE: Marine Biodiversity */}
          <div className="md:w-1/3 flex justify-start md:pl-2">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-marine-950/90 border border-emerald-500/40 shadow-glow-emerald">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Fish className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Marine Biodiversity Agent</div>
                <div className="text-[10px] text-emerald-400 font-mono">Population & Trophic • {getScore('marine_biodiversity')}/100</div>
              </div>
            </div>
          </div>

          {/* CENTER CORE: Ecosystem Risk Agent (Reasoning Nexus) */}
          <div className="relative group">
            {/* Outer Pulsing Aura */}
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 opacity-30 blur-xl group-hover:opacity-60 transition duration-500 animate-pulse" />
            
            <div className="relative px-6 py-5 rounded-2xl bg-marine-950 border-2 border-cyan-400 shadow-2xl flex flex-col items-center text-center max-w-[240px]">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center mb-2 shadow-glow-cyan">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-cyan-400 font-mono font-bold">
                Synthesis Hub
              </span>
              <span className="text-sm font-extrabold text-white">
                Ecosystem Risk Engine
              </span>
              <span className="text-[11px] text-slate-300 mt-1 font-mono">
                Composite: {compositeScore}/100
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                Cross-domain correlation matrix
              </span>
            </div>
          </div>

          {/* RIGHT NODE: Pollution Detection */}
          <div className="md:w-1/3 flex justify-end md:pr-2">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-marine-950/90 border border-rose-500/40 shadow-glow-coral">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Pollution Detection Agent</div>
                <div className="text-[10px] text-rose-400 font-mono">Plastics, Oil, Silt • {getScore('pollution_detection')}/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NODE: Climate & Weather Agent */}
        <div className="md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2 z-10 mt-4 md:mt-0">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-marine-950/90 border border-amber-500/40 shadow-lg">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <CloudSun className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Climate & Weather Agent</div>
              <div className="text-[10px] text-amber-400 font-mono">Heatwave, Storms, Runoff • {getScore('climate_weather')}/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Pathway to Recommendation Agent */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-3">
          <ArrowRight className="w-4 h-4 rotate-90" />
          <span>Synthesized Verdict Fed to Decision-Support Horizon</span>
        </div>
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-medium text-slate-200">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span><strong>Recommendation Agent</strong> converts compound risks into 3-tier action plans (Immediate, Short-Term, Long-Term).</span>
        </div>
      </div>

      {/* Cross-Agent Reasoning Dialogue / Feed */}
      <div className="mt-8 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Real-Time Cross-Agent Observations & Compound Stressors
        </h3>

        {crossObservations && crossObservations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {crossObservations.map((obs) => {
              const isCompounding = obs.relationship_type.toLowerCase().includes('compound');
              const isConsensus = obs.relationship_type.toLowerCase().includes('consensus');
              const isDiscrepancy = obs.relationship_type.toLowerCase().includes('discrepancy');

              const badgeColor = isCompounding
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                : isConsensus
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : isDiscrepancy
                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';

              return (
                <div
                  key={obs.id}
                  className="p-3.5 rounded-xl bg-marine-950/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all text-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
                        {obs.relationship_type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {obs.severity} Severity
                      </span>
                    </div>

                    <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1.5 font-medium">
                      <span className="text-slate-200">{obs.source_agent}</span>
                      <ArrowRight className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-200">{obs.target_agent}</span>
                    </div>

                    <h4 className="font-semibold text-white text-xs mb-1.5">
                      {obs.summary}
                    </h4>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {obs.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-marine-950/60 border border-slate-800 text-center text-slate-400 text-xs">
            No critical cross-agent compound anomalies identified in this telemetry snapshot.
          </div>
        )}
      </div>

      {/* Compound Threats List Callout */}
      {compoundRisks && compoundRisks.length > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs">
          <div className="flex items-center gap-2 text-rose-300 font-bold mb-2">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Active Compound Multi-Stressor Warnings</span>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-[11px]">
            {compoundRisks.map((cr, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 flex-shrink-0" />
                <span>{cr}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
