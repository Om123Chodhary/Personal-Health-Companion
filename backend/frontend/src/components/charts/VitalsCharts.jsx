import React from 'react'
import { Heart, Droplet, Thermometer, Activity } from 'lucide-react'
import LiveLineChart from './LiveLineChart'

function ChartCard({ icon: Icon, title, color, children }) {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-3">
        <div className={`p-1.5 rounded-lg bg-phc-bg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs text-phc-muted uppercase tracking-wider font-medium">
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function VitalsCharts({ history }) {
  if (!history || history.length < 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Heart Rate', 'SpO2', 'Temperature', 'Activity'].map((title) => (
          <div key={title} className="card">
            <div className="card-title">{title}</div>
            <div className="h-40 flex items-center justify-center text-phc-muted text-sm">
              Waiting for data... ({history?.length || 0} readings)
            </div>
          </div>
        ))}
      </div>
    )
  }

  // ⭐ IMPORTANT: History se reading extract karo
  const chartData = history.map((h) => h.reading).filter(Boolean)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChartCard icon={Heart} title="Heart Rate (bpm)" color="text-red-400">
        <LiveLineChart
          data={chartData}
          dataKey="heart_rate"
          color="#ef4444"
          label="HR"
          unit=" bpm"
          domain={['dataMin - 10', 'dataMax + 10']}
          baseline={72}
        />
      </ChartCard>

      <ChartCard icon={Droplet} title="SpO2 (%)" color="text-blue-400">
        <LiveLineChart
          data={chartData}
          dataKey="spo2"
          color="#3b82f6"
          label="SpO2"
          unit="%"
          domain={[92, 100]}
          baseline={98}
        />
      </ChartCard>

      <ChartCard icon={Thermometer} title="Body Temperature (°C)" color="text-orange-400">
        <LiveLineChart
          data={chartData}
          dataKey="body_temp"
          color="#f97316"
          label="Temp"
          unit="°C"
          domain={[36, 40]}
          baseline={36.7}
        />
      </ChartCard>

      <ChartCard icon={Activity} title="Activity Level" color="text-emerald-400">
        <LiveLineChart
          data={chartData}
          dataKey="activity_level"
          color="#10b981"
          label="Activity"
          unit="/100"
          domain={[0, 100]}
          baseline={35}
        />
      </ChartCard>
    </div>
  )
}

export default VitalsCharts