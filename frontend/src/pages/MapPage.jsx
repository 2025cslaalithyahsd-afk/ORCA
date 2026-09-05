import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Activity, Compass, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import api from '../services/api';
import { getScoreColor, getRiskBadge } from '../utils/formatters';

// Custom Map Panner component
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Generate custom SVG Buoy Icon for Leaflet
function createCustomBuoyIcon(score, riskLevel) {
  const color = getScoreColor(score);
  const html = `
    <div style="
      position: relative;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        position: absolute;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${color}33;
        border: 2px solid ${color};
        box-shadow: 0 0 15px ${color};
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      <div style="
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${color};
        border: 2px solid #ffffff;
      "></div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-buoy-marker',
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export default function MapPage() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [mapCenter, setMapCenter] = useState([15.0, 75.0]);
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    fetchStationData();
  }, []);

  const fetchStationData = async () => {
    try {
      setLoading(true);
      const data = await api.getAnalyses(20);
      setStations(data || []);
      if (data && data.length > 0) {
        setSelectedStation(data[0]);
        setMapCenter([data[0].latitude, data[0].longitude]);
      }
    } catch (err) {
      console.error('Failed to load map stations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStation = (st) => {
    setSelectedStation(st);
    setMapCenter([st.latitude, st.longitude]);
    setZoomLevel(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
            <MapPin className="w-4 h-4" />
            <span>Geospatial Marine Telemetry GIS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Global Marine Observation Stations
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interactive GIS map of active ocean monitoring nodes, coastal buoys, and assessed marine ecosystems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-300 px-3 py-1.5 rounded-lg bg-marine-900 border border-slate-800">
            {stations.length} Active Marine Buoys
          </span>
        </div>
      </div>

      {/* Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Map (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-card border border-cyan-500/25 h-[560px] relative shadow-2xl">
          <MapContainer
            center={mapCenter}
            zoom={zoomLevel}
            scrollWheelZoom={true}
            className="w-full h-full dark-map"
          >
            <ChangeView center={mapCenter} zoom={zoomLevel} />
            
            {/* OpenStreetMap CartoDB Dark Matter / Standard Layer */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Station Markers */}
            {stations.map((st) => {
              const badge = getRiskBadge(st.risk_level);
              return (
                <Marker
                  key={st.id}
                  position={[st.latitude, st.longitude]}
                  icon={createCustomBuoyIcon(st.ecosystem_score, st.risk_level)}
                  eventHandlers={{
                    click: () => setSelectedStation(st)
                  }}
                >
                  <Popup>
                    <div className="p-2 space-y-2 min-w-[200px]">
                      <div>
                        <h4 className="font-bold text-white text-sm">
                          {st.location}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {st.latitude.toFixed(2)}°N, {st.longitude.toFixed(2)}°E
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-y border-slate-800">
                        <span className="text-xs text-slate-300">Composite Health:</span>
                        <span className="text-sm font-bold text-cyan-400 font-mono">
                          {Math.round(st.ecosystem_score)}/100
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                        <div>DO: <span className="font-mono text-cyan-300">{st.dissolved_oxygen} mg/L</span></div>
                        <div>Temp: <span className="font-mono text-cyan-300">{st.temperature}°C</span></div>
                      </div>

                      <div className="pt-2">
                        <Link
                          to={`/analysis/${st.id}`}
                          className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-marine-950 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Inspect Report</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Sidebar Station Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-marine-900/60 max-h-[560px] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Monitoring Stations Roster
            </h3>

            <div className="space-y-2.5">
              {stations.map((st) => {
                const isSelected = selectedStation?.id === st.id;
                const badge = getRiskBadge(st.risk_level);
                return (
                  <div
                    key={st.id}
                    onClick={() => handleSelectStation(st)}
                    className={`p-3.5 rounded-xl cursor-pointer transition-all border text-xs ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-500/50 shadow-glow-cyan/20'
                        : 'bg-marine-950/70 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-white text-xs leading-snug">
                        {st.location}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300 flex-shrink-0">
                        {Math.round(st.ecosystem_score)}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>{st.latitude.toFixed(1)}°N, {st.longitude.toFixed(1)}°E</span>
                      <span className={`px-2 py-0.5 rounded-full border font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
