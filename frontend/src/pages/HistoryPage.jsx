import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  TrendingUp,
  Activity,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import api from '../services/api';
import { formatDate, getRiskBadge } from '../utils/formatters';

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalyses(50);
      setAnalyses(data || []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete analysis #${id}?`)) return;
    try {
      await api.deleteAnalysis(id);
      setAnalyses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert('Failed to delete analysis.');
    }
  };

  // Filtered dataset
  const filtered = analyses.filter((item) => {
    const matchesSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk =
      riskFilter === 'ALL' || item.risk_level.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  // Trend data formatted chronologically (oldest to newest)
  const trendData = [...analyses]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map((item) => ({
      date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: Math.round(item.ecosystem_score),
      location: item.location,
      pollution: Math.round(item.pollution_score),
      biodiversity: Math.round(item.biodiversity_score)
    }));

  const avgScore = analyses.length
    ? Math.round(analyses.reduce((acc, curr) => acc + curr.ecosystem_score, 0) / analyses.length)
    : 0;

  const criticalCount = analyses.filter(
    (a) => a.risk_level.toLowerCase() === 'critical' || a.risk_level.toLowerCase() === 'high risk'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <History className="w-4 h-4" />
            <span>Telemetry Records Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Historical Ecosystem Analyses
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past multi-agent assessments, longitudinal risk trajectories, and regional variances.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 glass-card hover:bg-slate-800/60 border border-slate-700 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Records</span>
        </button>
      </div>

      {/* Top Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60">
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-1">
            Total Evaluated Stations
          </span>
          <div className="text-3xl font-black text-white">
            {analyses.length}
          </div>
          <span className="text-[11px] text-cyan-400 mt-1 block">Persisted in SQLite database</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60">
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-1">
            Mean Ecosystem Health Score
          </span>
          <div className="text-3xl font-black text-cyan-300">
            {avgScore} <span className="text-slate-500 text-sm font-normal">/100</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Global stations average</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60">
          <span className="text-xs text-slate-400 font-mono uppercase tracking-wider block mb-1">
            Elevated / Critical Stations
          </span>
          <div className="text-3xl font-black text-rose-400">
            {criticalCount}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Requiring immediate response</span>
        </div>
      </div>

      {/* Historical Health Trend Chart */}
      {trendData.length > 1 && (
        <div className="glass-card rounded-2xl p-6 border border-cyan-500/20 bg-marine-900/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Ecosystem Health Score Over Time
              </h3>
              <p className="text-xs text-slate-400">
                Longitudinal trajectory of ORCA composite scores across recorded evaluation sessions.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">0 - 100 Health Scale</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="p-3 rounded-xl bg-marine-950/95 border border-cyan-500/40 text-xs shadow-xl backdrop-blur-md">
                          <p className="font-bold text-white mb-0.5">{item.location}</p>
                          <p className="text-slate-400 text-[10px] mb-2">{label}</p>
                          <p className="text-cyan-400 font-mono font-bold">Health Score: {item.score}/100</p>
                          <p className="text-rose-400 font-mono">Purity: {item.pollution}/100</p>
                          <p className="text-emerald-400 font-mono">Biodiversity: {item.biodiversity}/100</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#22d3ee' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-marine-900/60 border border-slate-800">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by location name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs text-white glass-input"
          />
        </div>

        {/* Risk Level Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Excellent', 'Healthy', 'Moderate Risk', 'High Risk', 'Critical'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                riskFilter.toLowerCase() === lvl.toLowerCase()
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white bg-marine-950 border border-slate-800'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Analyses */}
      <div className="glass-card rounded-2xl border border-slate-800 bg-marine-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-marine-950 text-slate-400 font-mono uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">ORCA Score</th>
                <th className="py-3.5 px-4">Risk Classification</th>
                <th className="py-3.5 px-4">DO (mg/L)</th>
                <th className="py-3.5 px-4">Temp (°C)</th>
                <th className="py-3.5 px-4">Pollution</th>
                <th className="py-3.5 px-4">Biodiversity</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const badge = getRiskBadge(item.risk_level);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <Link
                          to={`/analysis/${item.id}`}
                          className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                        >
                          <span>{item.location}</span>
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">
                        {formatDate(item.timestamp)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                        {Math.round(item.ecosystem_score)}/100
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {item.dissolved_oxygen}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {item.temperature}°
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {Math.round(item.pollution_score)}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {Math.round(item.biodiversity_score)}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          to={`/analysis/${item.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 text-[11px] font-medium transition-colors"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1 rounded-md hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-400">
                    No matching telemetry logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
