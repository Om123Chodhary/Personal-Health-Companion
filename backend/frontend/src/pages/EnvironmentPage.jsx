import React from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import { Cloud, Droplets, Wind, Sun, Thermometer, AlertTriangle, MapPin } from 'lucide-react'

function EnvironmentPage() {
  const { data } = useWebSocket()
  const env = data?.environment || {}
  const alerts = data?.alerts || []

  const metrics = [
    { label: 'Temperature', value: env.temperature, unit: '°C', icon: Thermometer, color: 'text-orange-400' },
    { label: 'Humidity', value: env.humidity, unit: '%', icon: Droplets, color: 'text-blue-400' },
    { label: 'Heat Index', value: env.heat_index, unit: '°C', icon: Sun, color: 'text-red-400' },
    { label: 'AQI', value: env.aqi, unit: '', icon: Wind, color: 'text-yellow-400' },
    { label: 'PM2.5', value: env.pm25, unit: 'µg/m³', icon: Cloud, color: 'text-slate-400' },
    { label: 'UV Index', value: env.uv_index, unit: '', icon: Sun, color: 'text-yellow-400' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-phc-text">Environment</h1>
          <p className="text-sm text-phc-muted mt-1">
            Contextual data driving risk assessment
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>New Delhi, IN</span>
        </div>
      </div>

      {/* Simulated data notice */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 flex items-start gap-3">
        <div className="text-blue-400 mt-0.5">ℹ️</div>
        <div className="text-xs text-blue-300">
          <span className="font-semibold">Demo data notice:</span> Environment data is simulated in this prototype.
          Production adapters for OpenWeather, CPCB AQI, and NDMA alerts are interface-ready.
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="card">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-xs text-phc-muted uppercase tracking-wider">{m.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-phc-text">
                  {m.value !== undefined && m.value !== null ? Number(m.value).toFixed(1) : '--'}
                </span>
                <span className="text-sm text-phc-muted">{m.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Weather condition */}
      <div className="card">
        <div className="card-title">Weather Condition</div>
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {env.weather === 'heatwave' && '🌡️'}
            {env.weather === 'clear' && '☀️'}
            {env.weather === 'haze' && '🌫️'}
            {env.weather === 'rain' && '🌧️'}
          </div>
          <div>
            <div className="text-lg font-semibold text-phc-text capitalize">
              {env.weather || 'Unknown'}
            </div>
            <div className="text-xs text-phc-muted">
              {env.heatwave && '🔥 Heatwave condition active'}
              {!env.heatwave && 'No active weather alerts'}
            </div>
          </div>
        </div>
      </div>

      {/* Active alerts */}
      {alerts.length > 0 ? (
        <div className="card">
          <div className="card-title flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Active Alerts
          </div>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-orange-400 capitalize">
                    {alert.alert_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-phc-muted">
                    Severity {alert.severity}/5
                  </span>
                </div>
                <p className="text-xs text-phc-text">{alert.description}</p>
                <p className="text-[10px] text-phc-muted mt-1">
                  Source: {alert.source} {alert.is_simulated && '(simulated)'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">Active Alerts</div>
          <p className="text-sm text-emerald-400">
            ✅ No active disaster or environment alerts in your area.
          </p>
        </div>
      )}
    </div>
  )
}

export default EnvironmentPage