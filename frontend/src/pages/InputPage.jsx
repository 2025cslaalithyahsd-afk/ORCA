import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  RotateCcw,
  Sparkles,
  Info,
  Send,
  FlaskConical,
  Fish,
  Trash2,
  CloudSun,
  MapPin,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import api from '../services/api';
import PipelineLiveSimulation from '../components/PipelineLiveSimulation';

// Default initial state
const INITIAL_FORM = {
  location: 'Arabian Sea - Coastal Zone Alpha',
  latitude: 18.9220,
  longitude: 72.8347,
  temperature: 28.4,
  ph: 8.12,
  dissolved_oxygen: 6.2,
  salinity: 35.2,
  turbidity: 4.5,
  nitrate: 0.85,
  phosphate: 0.05,
  chlorophyll: 2.3,
  species_population: 850,
  plastic_pollution: 14.0,
  oil_pollution: 2.0,
  weather: 'Clear Skies with Moderate Sea Breeze'
};

const PRESETS = {
  healthy: {
    location: 'Great Barrier Reef - Outer Marine Sanctuary',
    latitude: -16.2580,
    longitude: 145.8920,
    temperature: 26.4,
    ph: 8.18,
    dissolved_oxygen: 6.8,
    salinity: 35.1,
    turbidity: 1.8,
    nitrate: 0.42,
    phosphate: 0.03,
    chlorophyll: 1.9,
    species_population: 960,
    plastic_pollution: 6.0,
    oil_pollution: 0.5,
    weather: 'Clear Skies with Gentle Easterly Trade Winds'
  },
  moderate: {
    location: 'Arabian Sea - Coastal Zone Alpha',
    latitude: 18.9220,
    longitude: 72.8347,
    temperature: 29.2,
    ph: 7.92,
    dissolved_oxygen: 4.8,
    salinity: 34.6,
    turbidity: 9.4,
    nitrate: 2.65,
    phosphate: 0.12,
    chlorophyll: 6.8,
    species_population: 710,
    plastic_pollution: 32.0,
    oil_pollution: 8.5,
    weather: 'Pre-Monsoon Thermal Inversion with Stagnant Sea Breeze'
  },
  high_risk: {
    location: 'Gulf of Mexico - Delta Anoxic Station B',
    latitude: 28.8500,
    longitude: -89.4000,
    temperature: 31.8,
    ph: 7.54,
    dissolved_oxygen: 2.2,
    salinity: 31.2,
    turbidity: 24.5,
    nitrate: 7.80,
    phosphate: 0.38,
    chlorophyll: 16.4,
    species_population: 320,
    plastic_pollution: 68.0,
    oil_pollution: 42.0,
    weather: 'Heatwave Dome with Agricultural Runoff Plume'
  }
};

export default function InputPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'location' || field === 'weather' ? value : parseFloat(value) || 0
    }));
  };

  const applyPreset = (key) => {
    if (PRESETS[key]) {
      setFormData(PRESETS[key]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);
    setSimulationComplete(false);

    try {
      // 1. Kick off API call in background
      const res = await api.analyzeEcosystem(formData);
      setAnalysisResult(res);
    } catch (err) {
      console.error('Analysis submission failed:', err);
      setErrorMsg('Failed to process ecosystem telemetry. Please check backend status.');
      setIsSubmitting(false);
    }
  };

  const handleSimulationFinish = () => {
    if (analysisResult) {
      navigate(`/analysis/${analysisResult.id || 'live'}`, { state: { analysis: analysisResult } });
    }
  };

  if (isSubmitting) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <PipelineLiveSimulation
          onComplete={handleSimulationFinish}
          durationMs={2800}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
          <Compass className="w-4 h-4" />
          <span>Multi-Agent Telemetry Ingestion</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Ecosystem Observation Form
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Enter regional marine observations. Six specialized AI agents will collaboratively evaluate chemical, biological, and climatic indicators.
        </p>
      </div>

      {/* Preset Scenarios Strip */}
      <div className="mb-8 p-4 rounded-2xl glass-card border border-cyan-500/20 bg-marine-900/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Load Presets for Evaluation:
          </span>
          <span className="text-[11px] text-slate-400">
            One-click populate judges' test scenarios
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => applyPreset('healthy')}
            className="px-3.5 py-2.5 rounded-xl text-left bg-marine-950/70 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/20 transition-all"
          >
            <div className="text-[10px] uppercase font-mono font-bold text-emerald-400">Scenario 1</div>
            <div className="text-xs font-bold text-white mt-0.5">Healthy Coral Sanctuary</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('moderate')}
            className="px-3.5 py-2.5 rounded-xl text-left bg-marine-950/70 border border-amber-500/30 hover:border-amber-400 hover:bg-amber-950/20 transition-all"
          >
            <div className="text-[10px] uppercase font-mono font-bold text-amber-400">Scenario 2</div>
            <div className="text-xs font-bold text-white mt-0.5">Moderate Coastal Stress</div>
          </button>

          <button
            type="button"
            onClick={() => applyPreset('high_risk')}
            className="px-3.5 py-2.5 rounded-xl text-left bg-marine-950/70 border border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/20 transition-all"
          >
            <div className="text-[10px] uppercase font-mono font-bold text-rose-400">Scenario 3</div>
            <div className="text-xs font-bold text-white mt-0.5">Critical Hypoxia & Spill</div>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* GROUP 1: Geospatial & Regional Context */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            1. Geospatial & Regional Environment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Location / Station Identifier
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs text-white glass-input font-medium"
                placeholder="e.g. Arabian Sea - Coastal Zone Alpha"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Latitude (°N/S)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs text-white glass-input font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Longitude (°E/W)
              </label>
              <input
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs text-white glass-input font-mono"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Atmospheric Weather Condition
              </label>
              <input
                type="text"
                required
                value={formData.weather}
                onChange={(e) => handleChange('weather', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs text-white glass-input"
                placeholder="e.g. Heatwave Dome with Stagnant Sea Breeze"
              />
            </div>
          </div>
        </div>

        {/* GROUP 2: Water Physicochemicals */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            2. Ocean Water Chemistry (Ocean Chemistry Agent)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Temperature */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Water Temperature</span>
                <span className="text-[10px] font-mono text-cyan-400">24–28.5 °C Norm</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="-2"
                max="45"
                required
                value={formData.temperature}
                onChange={(e) => handleChange('temperature', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Unit: °Celsius</span>
            </div>

            {/* pH */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>pH Level</span>
                <span className="text-[10px] font-mono text-cyan-400">8.0–8.3 Norm</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="4"
                max="11"
                required
                value={formData.ph}
                onChange={(e) => handleChange('ph', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Acid-base buffer equilibrium</span>
            </div>

            {/* Dissolved Oxygen */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Dissolved Oxygen</span>
                <span className="text-[10px] font-mono text-cyan-400">&gt;6.0 mg/L Norm</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                required
                value={formData.dissolved_oxygen}
                onChange={(e) => handleChange('dissolved_oxygen', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">&lt;2.0 mg/L = Dead Zone</span>
            </div>

            {/* Salinity */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Salinity</span>
                <span className="text-[10px] font-mono text-cyan-400">32–37 PSU Norm</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="60"
                required
                value={formData.salinity}
                onChange={(e) => handleChange('salinity', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Practical Salinity Units</span>
            </div>

          </div>
        </div>

        {/* GROUP 3: Nutrients & Water Clarity */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 flex items-center gap-2">
            <CloudSun className="w-4 h-4" />
            3. Nutrients, Plankton & Water Clarity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Turbidity */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Turbidity</span>
                <span className="text-[10px] font-mono text-cyan-400">0.5–5.0 NTU</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                required
                value={formData.turbidity}
                onChange={(e) => handleChange('turbidity', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Light attenuation & silt</span>
            </div>

            {/* Nitrate */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Nitrate (NO3)</span>
                <span className="text-[10px] font-mono text-cyan-400">0.1–1.0 mg/L</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                max="50"
                required
                value={formData.nitrate}
                onChange={(e) => handleChange('nitrate', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Runoff nutrient enrichment</span>
            </div>

            {/* Phosphate */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Phosphate (PO4)</span>
                <span className="text-[10px] font-mono text-cyan-400">0.01–0.05 mg/L</span>
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                max="20"
                required
                value={formData.phosphate}
                onChange={(e) => handleChange('phosphate', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Agricultural fertilizer tracer</span>
            </div>

            {/* Chlorophyll */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Chlorophyll-a</span>
                <span className="text-[10px] font-mono text-cyan-400">0.8–4.0 µg/L</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                required
                value={formData.chlorophyll}
                onChange={(e) => handleChange('chlorophyll', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Algal bloom & primary biomass</span>
            </div>

          </div>
        </div>

        {/* GROUP 4: Biological & Anthropogenic Stress */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 bg-marine-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-rose-400 mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            4. Biological Population & Anthropogenic Contaminants
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Species Population */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Species Population</span>
                <span className="text-[10px] font-mono text-emerald-400">1000 Baseline</span>
              </div>
              <input
                type="number"
                step="1"
                min="0"
                max="5000"
                required
                value={formData.species_population}
                onChange={(e) => handleChange('species_population', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Census abundance index</span>
            </div>

            {/* Plastic Pollution */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Plastic Pollution</span>
                <span className="text-[10px] font-mono text-rose-400">&lt;15 Index Norm</span>
              </div>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                required
                value={formData.plastic_pollution}
                onChange={(e) => handleChange('plastic_pollution', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Debris & microplastic score (0–100)</span>
            </div>

            {/* Oil Pollution */}
            <div className="p-3.5 rounded-xl bg-marine-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Oil / Hydrocarbon</span>
                <span className="text-[10px] font-mono text-rose-400">&lt;5 Index Norm</span>
              </div>
              <input
                type="number"
                step="0.5"
                min="0"
                max="100"
                required
                value={formData.oil_pollution}
                onChange={(e) => handleChange('oil_pollution', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg text-sm text-white glass-input font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Petrochemical slick index (0–100)</span>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => setFormData(INITIAL_FORM)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white glass-card border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Baseline</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-marine-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 hover:from-cyan-300 hover:to-teal-200 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Launch Collaborative Multi-Agent Analysis</span>
          </button>
        </div>

      </form>

    </div>
  );
}
