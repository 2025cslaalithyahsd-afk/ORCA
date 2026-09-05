import React, { useState, useEffect } from 'react';
import { Waves, FlaskConical, Fish, Trash2, CloudSun, ShieldAlert, Compass, CheckCircle2 } from 'lucide-react';

const PIPELINE_STEPS = [
  { label: 'Collecting & Validating Marine Sensor Telemetry...', icon: Waves, color: 'text-cyan-400' },
  { label: 'Ocean Chemistry Agent inspecting pH, DO & Nutrients...', icon: FlaskConical, color: 'text-blue-400' },
  { label: 'Pollution Detection Agent analyzing Plastics & Hydrocarbons...', icon: Trash2, color: 'text-rose-400' },
  { label: 'Marine Biodiversity & Climate Agents estimating stress...', icon: Fish, color: 'text-emerald-400' },
  { label: 'Agents exchanging observations & discovering compound threats...', icon: CloudSun, color: 'text-amber-400' },
  { label: 'Ecosystem Risk Agent synthesizing composite health index...', icon: ShieldAlert, color: 'text-cyan-300' },
  { label: 'Recommendation Agent formulating prioritized interventions...', icon: Compass, color: 'text-teal-300' },
];

export default function PipelineLiveSimulation({ onComplete, durationMs = 3200 }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInterval = durationMs / PIPELINE_STEPS.length;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PIPELINE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 400);
          }
          return prev;
        }
      });
    }, stepInterval);

    return () => clearInterval(timer);
  }, [durationMs, onComplete]);

  const progressPct = Math.round(((currentStep + 1) / PIPELINE_STEPS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 glass-card rounded-2xl max-w-xl mx-auto my-12 border border-cyan-500/30 text-center relative overflow-hidden">
      
      {/* Background Animated Gradient Aura */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-600/20 via-blue-600/10 to-teal-500/20 blur-3xl -z-10 animate-pulse" />

      {/* Pulsing Core Spinner */}
      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-spin" />
        <div className="w-14 h-14 rounded-full bg-marine-950 border border-cyan-500/40 flex items-center justify-center shadow-glow-cyan">
          <Waves className="w-7 h-7 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <span className="text-[11px] uppercase tracking-widest font-mono text-cyan-400 font-bold mb-2">
        Multi-Agent Reasoning Pipeline Active
      </span>

      <h3 className="text-xl font-bold text-white mb-2 min-h-[3.5rem] flex items-center justify-center">
        {PIPELINE_STEPS[currentStep].label}
      </h3>

      {/* Stepped Checklist */}
      <div className="w-full max-w-md space-y-2 mt-4 text-left">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2 rounded-lg text-xs transition-all ${
                isCurrent
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-white shadow-sm'
                  : isDone
                  ? 'text-slate-400 opacity-80'
                  : 'text-slate-600 opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <Icon className={`w-4 h-4 ${isCurrent ? step.color : 'text-slate-500'} flex-shrink-0 ${isCurrent ? 'animate-bounce' : ''}`} />
              )}
              <span className="truncate">{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-marine-950 rounded-full h-2 mt-6 overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all duration-300 shadow-glow-cyan"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <span className="text-[10px] font-mono text-slate-400 mt-2">
        {progressPct}% Complete • Orchestrating 6 Autonomous Domain Agents
      </span>
    </div>
  );
}
