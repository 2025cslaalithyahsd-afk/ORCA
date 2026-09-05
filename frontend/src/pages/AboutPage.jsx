import React from 'react';
import {
  Waves,
  ShieldCheck,
  Cpu,
  Layers,
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  ShieldAlert,
  Compass,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
          <Info className="w-3.5 h-3.5" />
          <span>Scientific Foundation & Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About the ORCA Platform
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          ORCA (Oceanic Reasoning with Collaborative Agents) is an advanced decision-support architecture developed to demonstrate how cooperative specialized domain agents reason across multi-parameter oceanic telemetry without relying on fallible monolithic AI models.
        </p>
      </div>

      {/* Core Paradigm: Why Multi-Agent? */}
      <div className="glass-card rounded-2xl p-8 border border-cyan-500/25 bg-marine-900/60 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">
            The Multi-Agent Ecological Paradigm
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In traditional ecological monitoring, machine learning models treat environmental data as flat vectors, missing critical biochemical mechanisms. A single LLM or neural network prompt is prone to hallucinations and lacks transparent mathematical verification.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-marine-950/70 border border-slate-800">
            <h3 className="font-bold text-rose-400 mb-1">Traditional Single Model Limitations</h3>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Opaque black-box outputs with zero mathematical auditability.</li>
              <li>• Inability to resolve conflicting sensor inputs (e.g. pristine pH vs plunging biomass).</li>
              <li>• Total dependency on external closed-source cloud APIs.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-marine-950/70 border border-slate-800">
            <h3 className="font-bold text-cyan-400 mb-1">ORCA Collaborative Agent Advantage</h3>
            <ul className="space-y-1.5 text-slate-300">
              <li>• 6 specialized agents with distinct domain expertise.</li>
              <li>• Dynamic discovery of synergistic compounding risks (e.g. Hypoxic Dead Zones).</li>
              <li>• 100% offline deterministic execution with optional LLM narrative enrichment.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* The 6 Agents Specifications */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Domain Agent Responsibilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <FlaskConical className="w-6 h-6 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Agent 1: Ocean Chemistry</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyzes pH, dissolved oxygen, salinity, nitrate, phosphate, and water temperature. Evaluates carbonate saturation, nutrient stoichiometry, and thermodynamic gas solubility (Henry's Law).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <Fish className="w-6 h-6 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Agent 2: Marine Biodiversity</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assesses biological population indices against pristine 1000-point baselines. Detects trophic level collapse, species eviction due to hypoxic water wedges, and primary phytoplankton balance.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="w-6 h-6 text-rose-400" />
              <h3 className="font-bold text-white text-base">Agent 3: Pollution Detection</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quantifies microplastic and macro-debris density (0–100), hydrocarbon/oil slick toxicity, and photic zone light attenuation caused by suspended sediment turbidity (NTU).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <CloudSun className="w-6 h-6 text-amber-400" />
              <h3 className="font-bold text-white text-base">Agent 4: Climate & Weather</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tracks sea surface temperature anomalies relative to baseline, Degree Heating Weeks (DHW) coral bleaching risks, atmospheric heat domes, and storm surge runoff pulses.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="w-6 h-6 text-blue-400" />
              <h3 className="font-bold text-white text-base">Agent 5: Ecosystem Risk Agent</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The collaborative nexus. Compares outputs of all upstream agents, computes consensus and discrepancies, detects multi-stressor compounding synergies, and calculates the composite ORCA score.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center gap-3 mb-3">
              <Compass className="w-6 h-6 text-teal-400" />
              <h3 className="font-bold text-white text-base">Agent 6: Recommendation Agent</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Translates compound scientific risk findings into prioritized operational interventions across three response horizons: Immediate (0–48h), Short-Term (1–4w), and Long-Term (1–12m).
            </p>
          </div>

        </div>
      </div>

      {/* Transparent Scoring Formula */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60 space-y-4">
        <h2 className="text-xl font-bold text-white">
          Transparent Scoring & Weight Distribution
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          The ORCA Composite Ecosystem Score is computed as a weighted balance of the four primary domain agents, adjusted with an ecological non-linear synergy penalty when compound threats are discovered:
        </p>

        <div className="p-4 rounded-xl bg-marine-950 font-mono text-xs text-cyan-300 border border-slate-800">
          Composite Score = (Chemistry × 0.25) + (Biodiversity × 0.25) + (Pollution × 0.25) + (Climate × 0.25) - Synergy Penalty
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <strong>88 – 100</strong>
            <span className="block text-[10px] mt-0.5">Excellent</span>
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <strong>75 – 87</strong>
            <span className="block text-[10px] mt-0.5">Healthy</span>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <strong>58 – 74</strong>
            <span className="block text-[10px] mt-0.5">Moderate Risk</span>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <strong>38 – 57</strong>
            <span className="block text-[10px] mt-0.5">High Risk</span>
          </div>
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 col-span-2 sm:col-span-1">
            <strong>0 – 37</strong>
            <span className="block text-[10px] mt-0.5">Critical Alert</span>
          </div>
        </div>
      </div>

    </div>
  );
}
