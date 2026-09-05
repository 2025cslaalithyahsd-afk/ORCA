import React from 'react';
import { Table, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { getRiskBadge } from '../utils/formatters';

export default function RiskHeatmap({ parameterMatrix = [] }) {
  if (!parameterMatrix || parameterMatrix.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-cyan-400" />
            Environmental Risk Matrix & Baseline Variance
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-referencing observed sensor telemetry against standard oceanic biological thresholds.
          </p>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-marine-950 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Parameter</th>
              <th className="py-3 px-4">Observed Value</th>
              <th className="py-3 px-4">Healthy Baseline</th>
              <th className="py-3 px-4">Status & Severity</th>
              <th className="py-3 px-4 hidden md:table-cell">Contributed Risk Factor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {parameterMatrix.map((item, idx) => {
              const badge = getRiskBadge(item.status);
              const isDanger = item.status.toLowerCase().includes('critical') || item.status.toLowerCase().includes('high');
              const isWarning = item.status.toLowerCase().includes('moderate');

              return (
                <tr
                  key={idx}
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-white">
                    {item.label}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-cyan-300">
                    {item.value} {item.unit}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {item.normal_range} {item.unit}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                      {isDanger ? (
                        <AlertOctagon className="w-3 h-3 text-rose-400 flex-shrink-0" />
                      ) : isWarning ? (
                        <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 hidden md:table-cell text-[11px]">
                    {item.contributed_risk !== 'None' ? (
                      <span className="text-amber-300/90">{item.contributed_risk}</span>
                    ) : (
                      <span className="text-emerald-400/80">Optimal Physiological Range</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
