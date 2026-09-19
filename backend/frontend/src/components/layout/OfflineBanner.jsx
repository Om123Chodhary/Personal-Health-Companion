import React from 'react'
import { WifiOff, CheckCircle2, Clock } from 'lucide-react'

function OfflineBanner({ isOnline }) {
  if (isOnline) return null

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 animate-slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <WifiOff className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-400">
            Network OFFLINE — Core risk detection continues locally
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Edge AI ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Local Alerts ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-phc-muted">
            <Clock className="w-3.5 h-3.5" />
            <span>Cloud Sync WAITING</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfflineBanner