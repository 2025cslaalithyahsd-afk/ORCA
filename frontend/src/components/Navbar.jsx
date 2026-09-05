import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, Activity, BarChart3, History, MapPin, Compass, ShieldCheck, Info } from 'lucide-react';
import api from '../services/api';

export default function Navbar() {
  const location = useLocation();
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await api.getHealth();
        setBackendOnline(res.status === 'healthy');
      } catch (err) {
        setBackendOnline(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: '/', label: 'Overview', icon: Waves },
    { to: '/dashboard', label: 'Dashboard', icon: Activity },
    { to: '/input', label: 'Analyze Ecosystem', icon: Compass },
    { to: '/history', label: 'Historical Logs', icon: History },
    { to: '/map', label: 'Ocean Map', icon: MapPin },
    { to: '/about', label: 'About ORCA', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-cyan-500/20 backdrop-blur-xl bg-marine-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-blue-500 flex items-center justify-center shadow-glow-cyan transition-transform group-hover:scale-105">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                ORCA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Multi-Agent AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight hidden sm:block">
              Marine Ecosystem Collaborative Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action & Status Badges */}
        <div className="flex items-center gap-3">
          {/* Backend Status Ping */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                backendOnline ? 'bg-emerald-400 shadow-glow-emerald animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="text-slate-300 hidden lg:inline">
              {backendOnline ? 'AI Pipeline Online' : 'Engine Connecting...'}
            </span>
          </div>

          <Link
            to="/input"
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-marine-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">New Assessment</span>
            <span className="sm:hidden">Analyze</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
