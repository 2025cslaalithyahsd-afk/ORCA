import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  Legend
} from 'recharts';

// Custom dark tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-marine-950/95 border border-cyan-500/40 text-xs shadow-xl backdrop-blur-md">
        <p className="font-bold text-slate-200 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color || '#22d3ee' }} className="font-mono">
            {entry.name}: {entry.value} {entry.unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function EnvironmentalCharts({ data, agentResults = [] }) {
  if (!data) return null;

  // 1. Water Quality Data
  const waterQualityData = [
    { parameter: 'Temp (°C)', value: data.temperature, optimal: 26.0, unit: '°C' },
    { parameter: 'pH Level', value: data.ph, optimal: 8.1, unit: 'pH' },
    { parameter: 'DO (mg/L)', value: data.dissolved_oxygen, optimal: 7.0, unit: 'mg/L' },
    { parameter: 'Salinity (PSU)', value: data.salinity, optimal: 35.0, unit: 'PSU' },
  ];

  // 2. Pollution & Turbidity Data
  const pollutionData = [
    { metric: 'Plastics', value: data.plastic_pollution, unit: '/100', color: '#f43f5e' },
    { metric: 'Hydrocarbons', value: data.oil_pollution, unit: '/100', color: '#fb7185' },
    { metric: 'Turbidity', value: data.turbidity, unit: 'NTU', color: '#f59e0b' },
  ];

  // 3. Marine Biodiversity vs Baseline (1000)
  const bioScore = agentResults.find(a => a.agent_id === 'marine_biodiversity')?.score || 75;
  const biodiversityData = [
    { name: 'Observed Biomass', count: data.species_population, fill: '#10b981' },
    { name: 'Reference Baseline', count: 1000, fill: '#334155' },
  ];

  // 4. Multi-Domain Risk / Health Radar
  const radarData = [
    {
      domain: 'Chemistry',
      score: agentResults.find(a => a.agent_id === 'ocean_chemistry')?.score || 70,
      fullMark: 100,
    },
    {
      domain: 'Biodiversity',
      score: agentResults.find(a => a.agent_id === 'marine_biodiversity')?.score || 70,
      fullMark: 100,
    },
    {
      domain: 'Purity/Pollution',
      score: agentResults.find(a => a.agent_id === 'pollution_detection')?.score || 70,
      fullMark: 100,
    },
    {
      domain: 'Climate Health',
      score: agentResults.find(a => a.agent_id === 'climate_weather')?.score || 70,
      fullMark: 100,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Chart 1: Water Quality Telemetry */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-marine-900/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Water Quality Parameters vs Baseline
          </h3>
          <span className="text-[11px] font-mono text-cyan-400">Physicochemical</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterQualityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="parameter" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Observed" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              <Bar dataKey="optimal" name="Healthy Benchmark" fill="#1e293b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Pollution & Turbidity Load */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-marine-900/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Anthropogenic Contaminant Burden
          </h3>
          <span className="text-[11px] font-mono text-rose-400">Pollutant Index</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pollutionData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis type="category" dataKey="metric" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Measured Burden" radius={[0, 6, 6, 0]}>
                {pollutionData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Marine Biodiversity Abundance */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-marine-900/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Biomass Index vs Pristine Standard
          </h3>
          <span className="text-[11px] font-mono text-emerald-400">Score: {Math.round(bioScore)}/100</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={biodiversityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Population Index" radius={[6, 6, 0, 0]}>
                {biodiversityData.map((entry, idx) => (
                  <Cell key={`bio-cell-${idx}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 4: Multi-Domain Health Radar */}
      <div className="glass-card rounded-2xl p-5 border border-cyan-500/20 bg-marine-900/60">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white tracking-wide">
            Multi-Domain Ecosystem Equilibrium
          </h3>
          <span className="text-[11px] font-mono text-teal-400">0 - 100 Scale</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
              <Radar name="Agent Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
