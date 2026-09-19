import React from 'react'
import { FACTOR_LABELS } from '../../lib/constants'

function getFactorColor(score) {
  if (score < 25) return 'bg-emerald-500'
  if (score < 50) return 'bg-amber-500'
  if (score < 75) return 'bg-orange-500'
  return 'bg-red-500'
}

function RiskBreakdown({ factors }) {
  if (!factors || factors.length === 0) {
    return (
      <div className="card">
        <div className="card-title">Risk Factor Breakdown</div>
        <div className="text-sm text-phc-muted text-center py-8">
          Waiting for data...
        </div>
      </div>
    )
  }

  const sorted = [...factors].sort((a, b) => b.contribution - a.contribution)

  return (
    <div className="card">
      <div className="card-title">Risk Factor Breakdown</div>
      <div className="space-y-3">
        {sorted.map((factor) => (
          <div key={factor.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-phc-text">
                {FACTOR_LABELS[factor.name] || factor.name}
              </span>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-phc-muted">
                  {(factor.weight * 100).toFixed(0)}% weight
                </span>
                <span className="font-bold text-phc-text">
                  {factor.score.toFixed(0)}
                </span>
              </div>
            </div>
            <div className="h-2 bg-phc-bg rounded-full overflow-hidden">
              <div
                className={`h-full ${getFactorColor(factor.score)} rounded-full transition-all duration-1000`}
                style={{ width: `${factor.score}%` }}
              />
            </div>
            {factor.reason_codes && factor.reason_codes.length > 0 && (
              <div className="mt-1.5 ml-1 text-[11px] text-phc-muted">
                {factor.reason_codes[0]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiskBreakdown