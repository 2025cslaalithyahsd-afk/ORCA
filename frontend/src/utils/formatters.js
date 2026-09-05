export function getScoreColor(score) {
  if (score >= 88) return '#10b981'; // Emerald
  if (score >= 75) return '#06b6d4'; // Cyan
  if (score >= 58) return '#f59e0b'; // Amber
  if (score >= 38) return '#f97316'; // Orange
  return '#ef4444'; // Red
}

export function getRiskBadge(riskLevel) {
  switch (riskLevel?.toLowerCase()) {
    case 'excellent':
      return {
        label: 'Excellent',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400',
      };
    case 'healthy':
      return {
        label: 'Healthy',
        bg: 'bg-cyan-500/15',
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        dot: 'bg-cyan-400',
      };
    case 'moderate risk':
    case 'moderate':
      return {
        label: 'Moderate Risk',
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400',
      };
    case 'high risk':
      return {
        label: 'High Risk',
        bg: 'bg-orange-500/15',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
        dot: 'bg-orange-400',
      };
    case 'critical':
      return {
        label: 'Critical Alert',
        bg: 'bg-rose-500/20',
        text: 'text-rose-400',
        border: 'border-rose-500/40',
        dot: 'bg-rose-400 animate-ping',
      };
    default:
      return {
        label: riskLevel || 'Unknown',
        bg: 'bg-slate-500/15',
        text: 'text-slate-400',
        border: 'border-slate-500/30',
        dot: 'bg-slate-400',
      };
  }
}

export function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
