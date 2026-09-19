import React, { useState } from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import RiskScoreCard from '../components/cards/RiskScoreCard'
import VitalCard from '../components/cards/VitalCard'
import VitalsCharts from '../components/charts/VitalsCharts'
import ScenarioSelector from '../components/simulator/ScenarioSelector'
import RiskBreakdown from '../components/risk/RiskBreakdown'
import { WifiOff, AlertTriangle, Droplets, Wind } from 'lucide-react'

function OverviewPage() {
  const { data, history, isConnected, error } = useWebSocket()
  const [activeScenario, setActiveScenario] = useState('normal')

  const reading = data?.reading || {}
  const risk = data?.risk
  const env = data?.environment || {}
  const alerts = data?.alerts || []
  const baselineMaturity = data?.baseline_maturity || 0

  const baseline = {
    heart_rate: 72,
    spo2: 98,
    body_temp: 36.7,
    activity_level: 35,
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <WifiOff className="w-5 h-5 text-red-400" />
          <div>
            <p className="text-sm font-semibold text-red-400">Backend disconnected</p>
            <p className="text-xs text-phc-muted">
              Backend chal raha hai? Run: <code className="bg-phc-bg px-1.5 py-0.5 rounded">uvicorn app.main:app --reload</code>
            </p>
          </div>
        </div>
      )}

      {!isConnected && !error && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-sm text-amber-400">Connecting to backend...</p>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 space-y-2">
          {alerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-sm font-semibold text-orange-400">
                  {alert.alert_type.toUpperCase()} ALERT — Severity {alert.severity}/5
                </p>
                <p className="text-xs text-phc-muted">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ SCENARIO SELECTOR — YEH AB DIKHEGA */}
      <ScenarioSelector
        activeScenario={activeScenario}
        onScenarioChange={setActiveScenario}
      />

      {/* Risk + Environment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskScoreCard risk={risk} confidence={risk?.confidence} />
        </div>

        <div className="card">
          <div className="card-title">Environment</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-phc-muted">
                <Droplets className="w-4 h-4" />
                <span>Heat Index</span>
              </div>
              <span className="font-semibold text-phc-text">
                {env.heat_index?.toFixed(1) || '--'}°C
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-phc-muted">
                <Wind className="w-4 h-4" />
                <span>AQI</span>
              </div>
              <span className="font-semibold text-phc-text">
                {env.aqi || '--'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-phc-muted">Humidity</span>
              <span className="font-semibold text-phc-text">
                {env.humidity || '--'}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-phc-muted">Outside Temp</span>
              <span className="font-semibold text-phc-text">
                {env.temperature?.toFixed(1) || '--'}°C
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div>
        <h2 className="text-sm font-semibold text-phc-muted uppercase tracking-wider mb-3">
          Live Vitals
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <VitalCard vitalKey="heart_rate" value={reading.heart_rate} baseline={baseline.heart_rate} />
          <VitalCard vitalKey="spo2" value={reading.spo2} baseline={baseline.spo2} />
          <VitalCard vitalKey="body_temp" value={reading.body_temp} baseline={baseline.body_temp} />
          <VitalCard vitalKey="activity_level" value={reading.activity_level} baseline={baseline.activity_level} />
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-sm font-semibold text-phc-muted uppercase tracking-wider mb-3">
          Live Monitoring
        </h2>
        <VitalsCharts history={history} />
      </div>

      {/* Risk + Reasons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RiskBreakdown factors={risk?.factors} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {risk && risk.top_reasons && risk.top_reasons.length > 0 && (
            <div className="card">
              <div className="card-title">Why This Score?</div>
              <ul className="space-y-2">
                {risk.top_reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-phc-text">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {risk && risk.recommended_actions && risk.recommended_actions.length > 0 && (
            <div className="card">
              <div className="card-title">Recommended Actions</div>
              <ul className="space-y-2">
                {risk.recommended_actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-phc-text">
                    <span className="text-emerald-400 mt-0.5">→</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-phc-muted text-center pt-2">
        {baselineMaturity > 0 && (
          <span>Baseline maturity: {Math.round(baselineMaturity * 100)}% · </span>
        )}
        Data refreshes every 1.5s · All processing on-device
      </div>
    </div>
  )
}

export default OverviewPage