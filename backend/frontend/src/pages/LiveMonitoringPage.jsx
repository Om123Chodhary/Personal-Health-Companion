import React from 'react'
import { useWebSocket } from '../hooks/useWebSocket'
import VitalsCharts from '../components/charts/VitalsCharts'
import { Heart, Droplet, Thermometer, Activity, Wifi, WifiOff } from 'lucide-react'

function LiveMonitoringPage() {
  const { data, history, isConnected } = useWebSocket()
  const reading = data?.reading || {}

  const metrics = [
    { key: 'heart_rate', label: 'Heart Rate', value: reading.heart_rate, unit: 'bpm', icon: Heart, color: 'text-red-400' },
    { key: 'spo2', label: 'SpO2', value: reading.spo2, unit: '%', icon: Droplet, color: 'text-blue-400' },
    { key: 'body_temp', label: 'Body Temp', value: reading.body_temp, unit: '°C', icon: Thermometer, color: 'text-orange-400' },
    { key: 'activity_level', label: 'Activity', value: reading.activity_level, unit: '/100', icon: Activity, color: 'text-emerald-400' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-phc-text">Live Monitoring</h1>
          <p className="text-sm text-phc-muted mt-1">
            Real-time vitals streaming from edge device
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
          isConnected
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
          {isConnected ? 'STREAMING' : 'DISCONNECTED'}
        </div>
      </div>

      {/* Big metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.key} className="card">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-xs text-phc-muted uppercase tracking-wider">{m.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-phc-text">
                  {m.value?.toFixed(1) || '--'}
                </span>
                <span className="text-sm text-phc-muted">{m.unit}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full charts */}
      <div>
        <h2 className="text-sm font-semibold text-phc-muted uppercase tracking-wider mb-3">
          Real-Time Charts (last 60 readings)
        </h2>
        <VitalsCharts history={history} />
      </div>

      {/* Sampling info */}
      <div className="card">
        <div className="card-title">Sampling Information</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-phc-muted text-xs mb-1">Sampling Rate</div>
            <div className="font-mono text-phc-text">1.5 sec</div>
          </div>
          <div>
            <div className="text-phc-muted text-xs mb-1">Buffer Size</div>
            <div className="font-mono text-phc-text">60 samples</div>
          </div>
          <div>
            <div className="text-phc-muted text-xs mb-1">Processing</div>
            <div className="font-mono text-emerald-400">On-Device</div>
          </div>
          <div>
            <div className="text-phc-muted text-xs mb-1">Protocol</div>
            <div className="font-mono text-phc-text">WebSocket</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveMonitoringPage