import React from 'react'
import { Heart, Droplet, Thermometer, Activity } from 'lucide-react'

const ICONS = {
  heart_rate: Heart,
  spo2: Droplet,
  body_temp: Thermometer,
  activity_level: Activity,
}

const LABELS = {
  heart_rate: 'Heart Rate',
  spo2: 'SpO2',
  body_temp: 'Body Temp',
  activity_level: 'Activity',
}

const UNITS = {
  heart_rate: 'bpm',
  spo2: '%',
  body_temp: '°C',
  activity_level: '/100',
}

const COLORS = {
  heart_rate: 'text-red-400',
  spo2: 'text-blue-400',
  body_temp: 'text-orange-400',
  activity_level: 'text-emerald-400',
}

function VitalCard({ vitalKey, value, baseline }) {
  const Icon = ICONS[vitalKey]
  const label = LABELS[vitalKey]
  const unit = UNITS[vitalKey]
  const color = COLORS[vitalKey]

  // Baseline se deviation
  let deviation = null
  if (baseline && value !== undefined && value !== null) {
    const percentChange = ((value - baseline) / baseline) * 100
    deviation = percentChange
  }

  const isAbnormal = deviation !== null && Math.abs(deviation) > 15

  return (
    <div className={`card transition-all duration-300 ${isAbnormal ? 'ring-1 ring-orange-500/50' : ''}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg bg-phc-bg ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs text-phc-muted uppercase tracking-wider font-medium">
            {label}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="stat-value text-phc-text">
          {value !== undefined && value !== null ? Number(value).toFixed(1) : '--'}
        </span>
        <span className="stat-unit">{unit}</span>
      </div>

      {/* Baseline deviation */}
      {deviation !== null && (
        <div className={`mt-2 text-xs font-medium ${
          isAbnormal ? 'text-orange-400' : 'text-phc-muted'
        }`}>
          {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}% from baseline
        </div>
      )}
    </div>
  )
}

export default VitalCard