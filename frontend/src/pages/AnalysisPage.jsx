import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  Compass,
  ArrowLeft,
  Share2,
  Download,
  AlertTriangle,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Activity
} from 'lucide-react';
import api from '../services/api';
import ScoreGauge from '../components/ScoreGauge';
import AgentCard from '../components/AgentCard';
import CollaborativeReasoningGraph from '../components/CollaborativeReasoningGraph';
import EnvironmentalCharts from '../components/EnvironmentalCharts';
import RiskHeatmap from '../components/RiskHeatmap';
import RecommendationsSection from '../components/RecommendationsSection';
import PipelineLiveSimulation from '../components/PipelineLiveSimulation';
import { formatDate, getRiskBadge } from '../utils/formatters';

export default function AnalysisPage() {
  const { id } = useParams();
  const location = useLocation();
  const [analysis, setAnalysis] = useState(location.state?.analysis || null);
  const [loading, setLoading] = useState(!analysis);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!analysis && id && id !== 'live') {
      loadAnalysisById(id);
    }
  }, [id]);

  const loadAnalysisById = async (analysisId) => {
    try {
      setLoading(true);
      const data = await api.getAnalysisById(analysisId);
      setAnalysis(data);
    } catch (err) {
      console.error('Failed to fetch analysis:', err);
      setErrorMsg('Could not load analysis details. The record may have expired or backend is offline.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <PipelineLiveSimulation />
      </div>
    );
  }

  if (errorMsg || !analysis) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center glass-card rounded-2xl border border-rose-500/30">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Analysis Unavailable</h2>
        <p className="text-xs text-slate-300 mb-6">{errorMsg || 'No analysis data found.'}</p>
        <Link
          to="/input"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-marine-950 font-bold text-xs shadow-glow-cyan"
        >
          Run New Assessment
        </Link>
      </div>
    );
  }

  const badge = getRiskBadge(analysis.risk_level);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Navigation Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="p-2 rounded-lg bg-marine-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{analysis.location}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{formatDate(analysis.timestamp)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ecosystem Assessment Report
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 glass-card hover:bg-slate-800/60 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Brief</span>
          </button>

          <Link
            to="/input"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-marine-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-glow-cyan transition-all flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Assess Another Region</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: Master Score & Executive Summary Verdict */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/25 bg-gradient-to-br from-marine-900/80 via-marine-950 to-marine-900/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Circular Score Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-6">
            <ScoreGauge
              score={analysis.ecosystem_score}
              riskLevel={analysis.risk_level}
              size={230}
            />
          </div>

          {/* Executive Collaborative Verdict */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Collaborative Multi-Agent Executive Verdict
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                {analysis.reasoning_mode}
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
              "{analysis.summary_verdict}"
            </p>

            {/* Key Compound Risks Tagging */}
            {analysis.compound_risks && analysis.compound_risks.length > 0 ? (
              <div className="pt-2">
                <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider block mb-2">
                  Identified Compound Stressors ({analysis.compound_risks.length}):
                </span>
                <div className="space-y-1.5">
                  {analysis.compound_risks.map((cr, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300 flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{cr}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No acute synergistic compound threats discovered. All domain agents report harmonious stability.</span>
              </div>
            )}

            {/* Influential Environmental Drivers */}
            {analysis.influential_factors && analysis.influential_factors.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-400 font-mono">Dominant Drivers:</span>
                {analysis.influential_factors.map((factor, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 2: Collaborative Reasoning Visualization (Neural Topology) */}
      <CollaborativeReasoningGraph
        agentResults={analysis.agent_results}
        crossObservations={analysis.cross_agent_reasoning}
        compoundRisks={analysis.compound_risks}
        compositeScore={analysis.ecosystem_score}
        riskLevel={analysis.risk_level}
      />

      {/* SECTION 3: 6 Individual Agent Analysis Cards */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Individual Agent Intelligence Reports
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous domain analyses across chemical, biological, anthropogenic, and atmospheric vectors.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
            6 Active Agents
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysis.agent_results?.map((agent, idx) => (
            <AgentCard key={idx} agent={agent} />
          ))}
        </div>
      </div>

      {/* SECTION 4: Environmental Visual Charts */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Environmental Charts & Telemetry Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparative charts benchmarking observed parameters against established marine baselines.
          </p>
        </div>

        <EnvironmentalCharts
          data={analysis.input_data}
          agentResults={analysis.agent_results}
        />
      </div>

      {/* SECTION 5: Risk Heatmap Matrix */}
      <RiskHeatmap parameterMatrix={analysis.parameter_matrix} />

      {/* SECTION 6: Categorized Prioritized Recommendations */}
      <RecommendationsSection recommendations={analysis.recommendations} />

      {/* Pipeline Trace Log (Hackathon Inspection) */}
      {analysis.pipeline_trace && analysis.pipeline_trace.length > 0 && (
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-950/60">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Reasoning Execution Trace Log
            </h3>
            <span className="text-[10px] font-mono text-slate-500">
              Deterministic Multi-Agent Dispatch Log
            </span>
          </div>

          <div className="space-y-2">
            {analysis.pipeline_trace.map((tr, tIdx) => (
              <div
                key={tIdx}
                className="flex items-start gap-3 text-xs font-mono text-slate-300"
              >
                <span className="text-cyan-400 w-12 flex-shrink-0">[{tr.timestamp}]</span>
                <span className="font-semibold text-white w-48 flex-shrink-0">{tr.step}</span>
                <span className="text-slate-400">{tr.detail}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
