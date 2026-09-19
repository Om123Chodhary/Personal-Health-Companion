import React from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { Lightbulb, ChevronRight, ListChecks, AlertCircle } from 'lucide-react'
import { getRiskColor } from '../lib/riskColors'

function ExplainabilityPage() {
  const { data } = useWebSocket()
  const risk = data?.risk
  const reading = data?.reading || {}

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-phc-text flex items-center gap-3">
          <Lightbulb className="w-7 h-7 text-yellow-400" />
          Explainability
        </h1>
        <p className="text-sm text-phc-muted mt-1">
          Exactly why this risk score was generated — no black box
        </p>
      </div>

      {/* Current score context */}
      {risk && (
        <div className="card">
          <div className="card-title">Current Assessment</div>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-xs text-phc-muted">Score: </span>
              <span className="text-xl font-bold" style={{ color: getRiskColor(risk.risk_level) }}>
                {Math.round(risk.overall_score)}/100
              </span>
            </div>
            <div>
              <span className="text-xs text-phc-muted">Level: </span>
              <span className="text-xl font-bold" style={{ color: getRiskColor(risk.risk_level) }}>
                {risk.risk_level}
              </span>
            </div>
            <div>
              <span className="text-xs text-phc-muted">Confidence: </span>
              <span className="text-xl font-bold text-phc-accent">
                {Math.round((risk.confidence || 0) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top reasons */}
      <div className="card">
        <div className="card-title flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-400" />
          Top Contributing Factors
        </div>

        {risk?.top_reasons && risk.top_reasons.length > 0 ? (
          <ol className="space-y-3">
            {risk.top_reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-phc-bg border border-phc-border">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-phc-text">{reason}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-sm text-emerald-400 py-4">
            ✅ No anomalous factors detected. All vitals within personal baseline.
          </div>
        )}
      </div>

      {/* Factor contributions bar */}
      {risk?.factors && risk.factors.length > 0 && (
        <div className="card">
          <div className="card-title">Factor Contributions to Final Score</div>
          <div className="space-y-3">
            {[...risk.factors].sort((a, b) => b.contribution - a.contribution).map((f) => {
              const maxContrib = Math.max(...risk.factors.map(x => x.contribution), 1)
              const width = (f.contribution / maxContrib) * 100
              return (
                <div key={f.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-phc-text capitalize font-medium">
                      {f.name.replace('_', ' ')}
                    </span>
                    <span className="text-phc-muted font-mono">
                      +{f.contribution.toFixed(2)} pts
                    </span>
                  </div>
                  <div className="h-2 bg-phc-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-phc-accent rounded-full transition-all duration-1000"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="card">
        <div className="card-title flex items-center gap-2">
          <ListChecks className="w-4 h-4 text-emerald-400" />
          Recommended Actions
        </div>
        {risk?.recommended_actions && risk.recommended_actions.length > 0 ? (
          <ul className="space-y-2">
            {risk.recommended_actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-phc-text">
                <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-phc-muted">No specific actions required.</p>
        )}
      </div>

      {/* Raw reading */}
      <div className="card">
        <div className="card-title">Raw Sensor Reading (Transparency)</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          {Object.entries(reading).map(([key, value]) => (
            <div key={key} className="bg-phc-bg rounded-lg p-2">
              <div className="text-phc-muted mb-1">{key}</div>
              <div className="text-phc-text">
                {typeof value === 'number' ? value.toFixed(2) : String(value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplainabilityPage