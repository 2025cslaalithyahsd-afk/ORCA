import React from 'react';
import { getScoreColor, getRiskBadge } from '../utils/formatters';

export default function ScoreGauge({ score = 0, riskLevel = 'Healthy', size = 240 }) {
  const radius = (size - 36) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;
  const strokeColor = getScoreColor(clampedScore);
  const badge = getRiskBadge(riskLevel);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        
        {/* Background Ambient Glow */}
        <div
          className="absolute inset-4 rounded-full blur-2xl opacity-25 transition-all duration-700"
          style={{ backgroundColor: strokeColor }}
        />

        {/* Circular SVG Gauge */}
        <svg width={size} height={size} className="rotate-[-90deg] transform">
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#10274c"
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset="0"
          />

          {/* Meter Circle with Dynamic Glow */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 10px ${strokeColor}88)`
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-1">
            Health Index
          </span>
          <div className="flex items-baseline justify-center font-extrabold tracking-tight">
            <span className="text-5xl font-extrabold text-white" style={{ textShadow: `0 0 20px ${strokeColor}66` }}>
              {Math.round(clampedScore)}
            </span>
            <span className="text-slate-400 text-lg font-medium ml-1">/100</span>
          </div>

          <span className="text-[10px] text-slate-400 font-mono mt-1">
            ORCA COMPOSITE
          </span>
        </div>
      </div>

      {/* Risk Badge Pill */}
      <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
        <span>{badge.label}</span>
      </div>
    </div>
  );
}
