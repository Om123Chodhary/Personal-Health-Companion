import React, { useState, useEffect } from 'react'
import {
  Sun, Thermometer, Wind, AlertTriangle,
  Loader2,
} from 'lucide-react'
import axios from 'axios'
import { API_SCENARIO_ACTIVATE, API_SCENARIO_LIST } from '../../lib/constants'

const ICONS = {
  normal: Sun,
  heatwave: Thermometer,
  pollution: Wind,
  fall: AlertTriangle,
}

const COLORS = {
  normal: 'text-emerald-400',
  heatwave: 'text-orange-400',
  pollution: 'text-yellow-400',
  fall: 'text-red-400',
}

const HOVER_BG = {
  normal: 'hover:bg-emerald-500/10 hover:border-emerald-500/50',
  heatwave: 'hover:bg-orange-500/10 hover:border-orange-500/50',
  pollution: 'hover:bg-yellow-500/10 hover:border-yellow-500/50',
  fall: 'hover:bg-red-500/10 hover:border-red-500/50',
}

function ScenarioSelector({ activeScenario, onScenarioChange }) {
  const [scenarios, setScenarios] = useState({})
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    axios.get(API_SCENARIO_LIST)
      .then((res) => setScenarios(res.data))
      .catch((err) => console.error('Scenario list fetch failed:', err))
  }, [])

  const activate = async (name) => {
    setLoading(name)
    try {
      await axios.post(`${API_SCENARIO_ACTIVATE}/${name}`)
      if (onScenarioChange) onScenarioChange(name)
    } catch (err) {
      console.error('Scenario activation failed:', err)
    } finally {
      setTimeout(() => setLoading(null), 500)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="card-title mb-0">Demo Scenarios</div>
        <span className="text-xs text-phc-muted">
          Click to simulate
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(scenarios).map(([key, info]) => {
          const Icon = ICONS[key] || Sun
          const isActive = activeScenario === key
          const isLoading = loading === key

          return (
            <button
              key={key}
              onClick={() => activate(key)}
              disabled={isLoading}
              className={`
                relative p-4 rounded-xl border transition-all duration-200
                text-left disabled:opacity-50
                ${isActive
                  ? 'bg-phc-accent/20 border-phc-accent shadow-lg shadow-phc-accent/20'
                  : `bg-phc-bg border-phc-border ${HOVER_BG[key]}`
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                {isLoading ? (
                  <Loader2 className={`w-5 h-5 animate-spin ${COLORS[key]}`} />
                ) : (
                  <Icon className={`w-5 h-5 ${COLORS[key]}`} />
                )}
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-phc-accent animate-pulse" />
                )}
              </div>

              <div className="text-sm font-semibold text-phc-text">
                {info.label}
              </div>
              <div className="text-[10px] text-phc-muted mt-1 line-clamp-2">
                {info.description}
              </div>
            </button>
          )
        })}
      </div>

      {Object.keys(scenarios).length === 0 && (
        <div className="text-center text-xs text-phc-muted py-4">
          Backend se scenarios load ho rahe hain...
        </div>
      )}
    </div>
  )
}

export default ScenarioSelector