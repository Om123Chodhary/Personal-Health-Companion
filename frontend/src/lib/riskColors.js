// Risk color helpers

export function getRiskColor(level) {
  switch (level?.toUpperCase()) {
    case 'LOW': return '#10b981';
    case 'MODERATE': return '#f59e0b';
    case 'HIGH': return '#f97316';
    case 'CRITICAL': return '#ef4444';
    default: return '#94a3b8';
  }
}

export function getRiskBadgeClass(level) {
  switch (level?.toUpperCase()) {
    case 'LOW': return 'badge-low';
    case 'MODERATE': return 'badge-moderate';
    case 'HIGH': return 'badge-high';
    case 'CRITICAL': return 'badge-critical';
    default: return 'badge-low';
  }
}

export function getRiskBgClass(level) {
  switch (level?.toUpperCase()) {
    case 'LOW': return 'bg-emerald-500/10 border-emerald-500/30';
    case 'MODERATE': return 'bg-amber-500/10 border-amber-500/30';
    case 'HIGH': return 'bg-orange-500/10 border-orange-500/30';
    case 'CRITICAL': return 'bg-red-500/10 border-red-500/30';
    default: return 'bg-slate-500/10 border-slate-500/30';
  }
}