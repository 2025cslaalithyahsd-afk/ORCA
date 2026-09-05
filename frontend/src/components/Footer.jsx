import React from 'react';
import { Waves, Heart, Shield, Terminal, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cyan-500/15 bg-marine-950/90 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Waves className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">
              ORCA – Marine Ecosystem Reasoning with Collaborative Agents
            </p>
            <p className="text-slate-400">
              Multi-Agent AI for Ocean Telemetry & Ecological Decision-Support
            </p>
          </div>
        </div>

        {/* Center Disclaimers */}
        <div className="text-center md:text-left text-[11px] text-slate-400 max-w-md">
          <p className="flex items-center justify-center md:justify-start gap-1">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            Algorithmic ecological synthesis intended for decision-support and academic demonstration.
          </p>
        </div>

        {/* Right Credits */}
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span>6 Specialized Domain Agents</span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">National Hackathon Project</span>
        </div>
      </div>
    </footer>
  );
}
