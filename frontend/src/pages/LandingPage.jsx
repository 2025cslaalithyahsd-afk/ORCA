import React from 'react';
import { Link } from 'react-router-dom';
import {
  Waves,
  Compass,
  Activity,
  ShieldCheck,
  Cpu,
  ArrowRight,
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Layers,
  Network
} from 'lucide-react';

export default function LandingPage() {
  const agents = [
    {
      name: 'Ocean Chemistry Agent',
      icon: FlaskConical,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
      description: 'Monitors pH, dissolved oxygen, salinity, and nitrogen/phosphorus stoichiometry to detect acidification and hypoxia.'
    },
    {
      name: 'Marine Biodiversity Agent',
      icon: Fish,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Tracks census population variances against healthy baselines, trophic vulnerability, and species physiological stress.'
    },
    {
      name: 'Pollution Detection Agent',
      icon: Trash2,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/30',
      description: 'Quantifies microplastic density, petrochemical hydrocarbon slicks, and suspended sediment turbidity plumes.'
    },
    {
      name: 'Climate & Weather Agent',
      icon: CloudSun,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      description: 'Identifies sea surface thermal anomalies, Degree Heating Week marine heatwaves, and extreme storm runoff surges.'
    },
    {
      name: 'Ecosystem Risk Agent',
      icon: ShieldAlert,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      description: 'The collaborative synthesis core that models compound risks (e.g. heat + hypoxia = dead zone) and computes the ORCA health score.'
    },
    {
      name: 'Recommendation Agent',
      icon: Compass,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/30',
      description: 'Formulates pragmatic, staged environmental action plans stratified into Immediate (0-48h), Short-Term, and Long-Term horizons.'
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Ambient Oceanic Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-cyan-600/20 via-teal-600/15 to-blue-600/20 blur-[130px] -z-10 rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-glow-cyan/20">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Next-Generation Marine Ecological Intelligence</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            ORCA
            <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent mt-2">
              Marine Ecosystem Reasoning with Collaborative Agents
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed">
            Harnessing distributed multi-agent artificial intelligence to assess ocean health, discover compound ecological crises, and formulate staged restoration policies from multi-parameter environmental telemetry.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/input"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-marine-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-teal-200 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              <span>Analyze Marine Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-200 glass-card hover:bg-slate-800/60 border border-cyan-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Activity className="w-5 h-5 text-cyan-400" />
              <span>View Live Dashboard</span>
            </Link>
          </div>

          {/* Live Metrics Quick Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-marine-900/50 border border-slate-800 text-center">
              <span className="text-2xl font-black text-cyan-400">6</span>
              <span className="text-xs text-slate-400 block mt-0.5">Specialized Agents</span>
            </div>
            <div className="p-4 rounded-xl bg-marine-900/50 border border-slate-800 text-center">
              <span className="text-2xl font-black text-teal-400">13</span>
              <span className="text-xs text-slate-400 block mt-0.5">Telemetry Parameters</span>
            </div>
            <div className="p-4 rounded-xl bg-marine-900/50 border border-slate-800 text-center">
              <span className="text-2xl font-black text-emerald-400">3-Tier</span>
              <span className="text-xs text-slate-400 block mt-0.5">Action Horizons</span>
            </div>
            <div className="p-4 rounded-xl bg-marine-900/50 border border-slate-800 text-center">
              <span className="text-2xl font-black text-blue-400">100%</span>
              <span className="text-xs text-slate-400 block mt-0.5">Deterministic Guardrails</span>
            </div>
          </div>

        </div>
      </section>

      {/* Collaborative AI vs Single Model Section */}
      <section className="py-16 bg-marine-900/30 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              The Architectural Shift
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Collaborative Agents Outperform Single AI Models
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Complex oceanic systems cannot be reduced to a single black-box LLM prompt. ORCA models marine intelligence as an ensemble of peer specialists cross-examining observations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Compound Threat Discovery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When water temperature is high, dissolved oxygen drops, and chlorophyll spikes, the Risk Agent identifies an inferred <strong>Anoxic Dead Zone & Algal Bloom</strong> that no single variable alone reveals.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Zero-Hallucination Guardrails</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Built upon rigorous empirical marine biology thresholds and deterministic stoichiometry. The optional LLM provides narrative enrichment without distorting empirical calculations.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Multi-Horizon Staged Response</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Translates scientific diagnoses into pragmatic policy: emergency response within 48 hours, catchment drainage audits within weeks, and marine protected area designations over months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Specialized Agents Roster */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              The Agent Swarm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Meet the 6 Specialized Marine Agents
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Each agent operates autonomously within its domain before joining the cross-agent synthesis consensus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800/80 bg-marine-900/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${agent.bg}`}>
                        <Icon className={`w-6 h-6 ${agent.color}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          {agent.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          Agent #{idx + 1}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-cyan-400 font-mono">
                    <span>Active Domain Engine</span>
                    <span>Ready</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/input"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/25 transition-all text-sm font-semibold"
            >
              <span>Test All 6 Agents with Sample Ocean Telemetry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
