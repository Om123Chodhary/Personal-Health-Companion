import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff, Clock, RefreshCw } from 'lucide-react'

function TopBar({ isOnline = true, lastUpdate, onRefresh }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-16 bg-phc-card border-b border-phc-border flex items-center justify-between px-6 sticky top-0 z-20 backdrop-blur">
      {/* Left: Page title area */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-sm font-semibold text-phc-text">Personal Health Companion</h2>
          <p className="text-xs text-phc-muted">
            "Detect the risk before the emergency"
          </p>
        </div>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-4">
        {/* Network status */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
          isOnline
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5" />
              <span>ONLINE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5" />
              <span>OFFLINE — Edge AI Active</span>
            </>
          )}
        </div>

        {/* Last update */}
        {lastUpdate && (
          <div className="flex items-center gap-2 text-xs text-phc-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>{time.toLocaleTimeString()}</span>
          </div>
        )}

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          className="p-2 rounded-lg hover:bg-phc-card-hover text-phc-muted hover:text-phc-text transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}

export default TopBar