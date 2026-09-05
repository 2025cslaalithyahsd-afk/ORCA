import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity,
  Compass,
  AlertTriangle,
  History,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Flame,
  Fish,
  Trash2,
  CloudSun,
  Layers
} from 'lucide-react';
import api from '../services/api';
import ScoreGauge from '../components/ScoreGauge';
import EnvironmentalCharts from '../components/EnvironmentalCharts';
import { getRiskBadge, formatDate } from '../utils/formatters';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState([]);
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [sampleScenarios, setSampleScenarios] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [histData, scenData] = await Promise.all([
        api.getAnalyses(6),
        api.getSampleScenarios()
      ]);
      setAnalyses(histData || []);
      setSampleScenarios(scenData?.scenarios || []);

      if (histData && histData.length > 0) {
        // Fetch full payload for the most recent analysis
        const fullLatest = await api.getAnalysisById(histData[0].id);
        setLatestAnalysis(fullLatest);
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickRun = async (scenarioKey) => {
    try {
      setActionLoading(true);
      const result = await api.runSampleAnalysis(scenarioKey);
      navigate(`/analysis/${result.id}`, { state: { analysis: result } });
    } catch (err) {
      console.error('Failed to run scenario:', err);
      alert('Failed to run scenario. Ensure backend is running.');
    } finally {
      setActionLoading(false);
    }
  };

  const getAgentScore = (agentId) => {
    if (!latestAnalysis?.agent_results) return 75;
    const a = latestAnalysis.agent_results.find(x => x.agent_id === agentId);
    return a ? Math.round(a.score) : 75;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <Activity className="w-4 h-4" />
            <span>Ecological Intelligence Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Marine Monitoring Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time telemetry synthesis from active marine stations and autonomous ocean buoys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/input"
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-marine-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-glow-cyan transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>New Ingestion Assessment</span>
          </Link>

          <Link
            to="/map"
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 glass-card hover:bg-slate-800/60 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Ocean GIS Map</span>
          </Link>
        </div>
      </div>

      {/* Instant Hackathon Evaluation Sandbox */}
      <div className="mb-10 p-6 rounded-2xl glass-card border border-cyan-500/25 bg-gradient-to-br from-marine-900/80 via-marine-950/90 to-marine-900/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Hackathon Demonstration Presets
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Run Real Multi-Agent Collaborative Reasoning
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Click any scenario to trigger the 6-agent reasoning pipeline:
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sampleScenarios.map((scen) => (
            <button
              key={scen.key}
              onClick={() => handleQuickRun(scen.key)}
              disabled={actionLoading}
              className="p-4 rounded-xl text-left bg-marine-950/70 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-marine-900/50 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  scen.key === 'healthy'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : scen.key === 'moderate'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}>
                  {scen.key}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {scen.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {scen.tagline}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Statistics Cards */}
      {latestAnalysis ? (
        <div className="space-y-8">
          
          {/* Top 5 Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* 1. Composite Ecosystem Health */}
            <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 bg-marine-900/70 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Ecosystem Health</span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">
                  {Math.round(latestAnalysis.ecosystem_score)}
                  <span className="text-slate-400 text-sm font-normal ml-1">/100</span>
                </div>
                <span className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  getRiskBadge(latestAnalysis.risk_level).bg
                } ${getRiskBadge(latestAnalysis.risk_level).text} ${getRiskBadge(latestAnalysis.risk_level).border}`}>
                  {latestAnalysis.risk_level}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate">
                {latestAnalysis.location}
              </span>
            </div>

            {/* 2. Pollution Purity Index */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Pollution Status</span>
                <Trash2 className="w-4 h-4 text-rose-400" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">
                  {getAgentScore('pollution_detection')}
                  <span className="text-slate-400 text-sm font-normal ml-1">/100</span>
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  Plastics: {latestAnalysis.input_data.plastic_pollution}/100
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                Oil: {latestAnalysis.input_data.oil_pollution}/100
              </span>
            </div>

            {/* 3. Biodiversity Resilience */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Biodiversity Index</span>
                <Fish className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">
                  {getAgentScore('marine_biodiversity')}
                  <span className="text-slate-400 text-sm font-normal ml-1">/100</span>
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  Census: {latestAnalysis.input_data.species_population}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">
                Baseline: 1000 index
              </span>
            </div>

            {/* 4. Climate Stress */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Climate & Weather</span>
                <CloudSun className="w-4 h-4 text-amber-400" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">
                  {getAgentScore('climate_weather')}
                  <span className="text-slate-400 text-sm font-normal ml-1">/100</span>
                </div>
                <span className="text-[11px] text-slate-300 font-mono">
                  SST: {latestAnalysis.input_data.temperature}°C
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate">
                {latestAnalysis.input_data.weather}
              </span>
            </div>

            {/* 5. Compound Threats */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Compound Threats</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="my-3">
                <div className="text-3xl font-black text-white">
                  {latestAnalysis.compound_risks?.length || 0}
                </div>
                <span className="text-[11px] text-rose-300 font-medium">
                  {latestAnalysis.compound_risks?.length > 0 ? 'Active Synergies' : 'None Detected'}
                </span>
              </div>
              <Link
                to={`/analysis/${latestAnalysis.id}`}
                state={{ analysis: latestAnalysis }}
                className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>Inspect Full Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

          {/* Quick Chart Strip */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">
                Latest Station Telemetry: {latestAnalysis.location}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Logged {formatDate(latestAnalysis.timestamp)}
              </span>
            </div>
            <EnvironmentalCharts
              data={latestAnalysis.input_data}
              agentResults={latestAnalysis.agent_results}
            />
          </div>

          {/* Recent Evaluations Table */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                Recent Ocean Evaluations Archive
              </h3>
              <Link to="/history" className="text-xs text-cyan-400 hover:underline">
                View All History →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-marine-950 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Composite Score</th>
                    <th className="py-2.5 px-3">Risk Level</th>
                    <th className="py-2.5 px-3">DO</th>
                    <th className="py-2.5 px-3">Temp</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {analyses.map((item) => {
                    const badge = getRiskBadge(item.risk_level);
                    return (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">
                          {item.location}
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-mono">
                          {formatDate(item.timestamp)}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                          {Math.round(item.ecosystem_score)}/100
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300">
                          {item.dissolved_oxygen} mg/L
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300">
                          {item.temperature}°C
                        </td>
                        <td className="py-3 px-3 text-right">
                          <Link
                            to={`/analysis/${item.id}`}
                            className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-[11px] font-medium transition-colors"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-12 glass-card rounded-2xl text-center border border-slate-800">
          <p className="text-slate-400 text-sm">No analysis records loaded.</p>
        </div>
      )}

    </div>
  );
}
