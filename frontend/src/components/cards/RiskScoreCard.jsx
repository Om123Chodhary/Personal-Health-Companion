import React from 'react'
import { Activity, TrendingUp, TrendingDown, Shield } from 'lucide-react'
import { getRiskColor, getRiskBadgeClass } from '../../lib/riskColors'

function RiskScoreCard({ risk, confidence }) {
  if (!risk) {
    return (
      <div className="card animate-pulse">
        <div className="card-title">Overall Risk Score</div>
        <div className="h-32 bg-phc-bg rounded-lg"></div>
      </div>
    )
  }

  const score = risk.overall_score || 0
  const level = risk.risk_level || 'LOW'
  const color = getRiskColor(level)

  // Circular progress calculation
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="card relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"
        style={{ backgroundColor: color }}
      />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="card-title mb-0">Overall Risk Score</div>
          <span className={`badge ${getRiskBadgeClass(level)}`}>
            {level}
          </span>
        </div>

        <div className="flex items-center gap-6">
          {/* Circular gauge */}
          <div className="relative">
            <svg width="160" height="160" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#1e293b"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={color}
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-extrabold" style={{ color }}>
                {Math.round(score)}
              </div>
              <div className="text-xs text-phc-muted mt-1">/ 100</div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            {/* Confidence */}
            <div>
              <div className="flex justify-between text-xs text-phc-muted mb-1">
                <span>Confidence</span>
                <span className="font-semibold text-phc-text">
                  {Math.round((confidence || 0) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-phc-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-phc-accent rounded-full transition-all duration-1000"
                  style={{ width: `${(confidence || 0) * 100}%` }}
                />
              </div>
            </div>

            {/* Data Quality */}
            <div>
              <div className="flex justify-between text-xs text-phc-muted mb-1">
                <span>Data Quality</span>
                <span className="font-semibold text-phc-text">
                  {Math.round((risk.data_quality || 0) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-phc-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(risk.data_quality || 0) * 100}%` }}
                />
              </div>
            </div>

            {/* Emergency flag */}
            {risk.emergency && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 border border-red-500/40 animate-pulse-red">
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-red-400">
                  EMERGENCY ESCALATION ACTIVE
                </span>
              </div>
            )}

            {/* Quick status */}
            {!risk.emergency && (
              <div className="flex items-center gap-2 text-xs text-phc-muted">
                <Activity className="w-3.5 h-3.5" />
                <span>
                  {score < 25 && 'All vitals within personal range'}
                  {score >= 25 && score < 50 && 'Monitor and hydrate'}
                  {score >= 50 && 'Take action now'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskScoreCard