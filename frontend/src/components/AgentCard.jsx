import React, { useState } from 'react';
import {
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  ShieldAlert,
  Compass,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { getScoreColor, getRiskBadge } from '../utils/formatters';

const iconMap = {
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  ShieldAlert,
  Compass,
};

export default function AgentCard({ agent }) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = iconMap[agent.icon] || Sparkles;
  const scoreColor = getScoreColor(agent.score);
  const badge = getRiskBadge(agent.status);

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 transition-all border border-cyan-500/20 bg-marine-900/60 flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border"
              style={{
                backgroundColor: `${scoreColor}18`,
                borderColor: `${scoreColor}44`,
                color: scoreColor
              }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base leading-snug">
                {agent.agent_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                  {badge.label}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {agent.confidence}% confidence
                </span>
              </div>
            </div>
          </div>

          {/* Score Value */}
          <div className="text-right">
            <div className="text-2xl font-black" style={{ color: scoreColor }}>
              {Math.round(agent.score)}
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-mono">
              Score
            </div>
          </div>
        </div>

        {/* Score Progress Bar */}
        <div className="w-full bg-marine-950 rounded-full h-2 mb-5 overflow-hidden border border-slate-800">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.max(4, agent.score)}%`,
              backgroundColor: scoreColor,
              boxShadow: `0 0 10px ${scoreColor}`
            }}
          />
        </div>

        {/* Key Findings */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Key Observations
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {agent.findings?.slice(0, 3).map((f, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-marine-950/40 p-2 rounded-lg border border-slate-800/60">
                <span className="text-cyan-400 text-xs font-mono">•</span>
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detected Risks */}
        {agent.risks && agent.risks.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              Detected Risk Factors
            </h4>
            <div className="space-y-1.5">
              {agent.risks.map((r, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-rose-500/10 text-rose-300 border border-rose-500/20 p-2 rounded-lg flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Reasoning Accordion */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs text-cyan-300 hover:text-cyan-200 py-1.5 font-medium transition-colors"
        >
          <span>{expanded ? 'Collapse Agent Reasoning' : 'Inspect Agent Reasoning'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="mt-3 p-3.5 rounded-xl bg-marine-950/80 border border-cyan-500/20 text-xs text-slate-300 space-y-3 animate-fadeIn">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
                Synthesized Domain Reasoning
              </span>
              <p className="leading-relaxed text-slate-300 font-sans">
                {agent.reasoning}
              </p>
            </div>

            {agent.recommendations && agent.recommendations.length > 0 && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-400 block mb-1">
                  Agent Proposed Interventions
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {agent.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
