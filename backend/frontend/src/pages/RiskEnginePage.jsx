import React from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import RiskBreakdown from '../components/risk/RiskBreakdown'
import { Brain, TrendingUp, Shield, Zap } from 'lucide-react'
import { getRiskColor } from '../lib/riskColors'

function RiskEnginePage() {
  const { data } = useWebSocket()
  const risk = data?.risk

  const factorIcons = {
    heat_stress: '🌡️',
    respiratory: '🫁',
    cardiac: '❤️',
    fall: '🚨',
    disaster: '⚠️',
    physiological: '📊',
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-phc-text flex items-center gap-3">
          <Brain className="w-7 h-7 text-phc-accent" />
          AI Risk Engine
        </h1>
        <p className="text-sm text-phc-muted mt-1">
          Transparent, explainable multi-modal risk assessment
        </p>
      </div>

      {/* Current score summary */}
      {risk && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="card-title">Current Score</div>
            <div className="text-4xl font-extrabold" style={{ color: getRiskColor(risk.risk_level) }}>
              {Math.round(risk.overall_score)}
            </div>
            <div className="text-sm text-phc-muted mt-1">/ 100</div>
          </div>
          <div className="card">
            <div className="card-title">Risk Level</div>
            <div className="text-2xl font-bold" style={{ color: getRiskColor(risk.risk_level) }}>
              {risk.risk_level}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Confidence</div>
            <div className="text-4xl font-extrabold text-phc-accent">
              {Math.round((risk.confidence || 0) * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* Factor breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <RiskBreakdown factors={risk?.factors} />
        </div>
      </div>

      {/* Factor details */}
      {risk?.factors && risk.factors.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-phc-muted uppercase tracking-wider mb-3">
            Factor Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {risk.factors.map((factor) => (
              <div key={factor.name} className="card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{factorIcons[factor.name] || '📊'}</span>
                    <span className="text-sm font-semibold text-phc-text capitalize">
                      {factor.name.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: getRiskColor(
                    factor.score < 25 ? 'LOW' : factor.score < 50 ? 'MODERATE' : factor.score < 75 ? 'HIGH' : 'CRITICAL'
                  )}}>
                    {factor.score.toFixed(0)}
                  </span>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-phc-muted">Weight</span>
                    <span className="font-mono text-phc-text">{(factor.weight * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-phc-muted">Contribution</span>
                    <span className="font-mono text-phc-text">{factor.contribution.toFixed(2)}</span>
                  </div>
                </div>

                {factor.reason_codes.length > 0 && (
                  <ul className="mt-3 space-y-1 text-[11px] text-phc-muted border-t border-phc-border pt-2">
                    {factor.reason_codes.slice(0, 2).map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Info */}
      <div className="card">
        <div className="card-title flex items-center gap-2">
          <Zap className="w-4 h-4 text-phc-accent" />
          Engine Architecture
        </div>
        <div className="text-sm text-phc-muted space-y-2">
          <p>
            PHC uses a <span className="text-phc-text font-medium">transparent, rule-based multi-factor risk engine</span> with
            personal baselines — not a black-box deep learning model.
          </p>
          <p>
            Each factor contributes a weighted score. The final risk score is the sum of all contributions.
            Weights are configurable and can be clinically calibrated.
          </p>
          <p className="text-xs text-phc-accent">
            🔬 Future: transition to a validated edge ML model using clinically labeled datasets.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RiskEnginePage