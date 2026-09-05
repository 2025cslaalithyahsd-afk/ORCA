import React, { useState } from 'react';
import {
  Compass,
  Clock,
  Calendar,
  Layers,
  CheckSquare,
  AlertOctagon,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export default function RecommendationsSection({ recommendations = {} }) {
  const [activeTab, setActiveTab] = useState('immediate');

  const immediate = recommendations.immediate || [];
  const shortTerm = recommendations.short_term || [];
  const longTerm = recommendations.long_term || [];

  const currentList =
    activeTab === 'immediate'
      ? immediate
      : activeTab === 'short_term'
      ? shortTerm
      : longTerm;

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Prioritized Ecosystem Recovery Actions
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Engineered by the Recommendation Agent across three operational response horizons.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-marine-950 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('immediate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'immediate'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Immediate (0-48h)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-marine-900 text-slate-300">
              {immediate.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('short_term')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'short_term'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Short-Term (1-4w)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-marine-900 text-slate-300">
              {shortTerm.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('long_term')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'long_term'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Long-Term (1-12m)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-marine-900 text-slate-300">
              {longTerm.length}
            </span>
          </button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {currentList.length > 0 ? (
        <div className="space-y-4">
          {currentList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-marine-950/70 border border-slate-800 hover:border-cyan-500/30 transition-all text-xs flex flex-col justify-between"
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getPriorityBadge(item.priority)}`}>
                    {item.priority} Priority
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    Source: {item.agent_source}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {item.id}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {item.title}
              </h4>

              {/* Scientific Reason & Expected Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-marine-900/60 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 block mb-1">
                    Ecological Rationale
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {item.reason}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-marine-900/60 border border-slate-800/80">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block mb-1">
                    Projected Ecosystem Impact
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {item.expected_impact}
                  </p>
                </div>
              </div>

              {/* Action Steps */}
              {item.steps && item.steps.length > 0 && (
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-300 block mb-1.5">
                    Execution Action Steps
                  </span>
                  <ul className="space-y-1.5">
                    {item.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-slate-300 text-[11px]">
                        <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-marine-950/60 border border-slate-800 text-center text-slate-400 text-xs">
          No active interventions scheduled for this horizon.
        </div>
      )}
    </div>
  );
}
