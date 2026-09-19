import React from 'react'
import {
  LayoutDashboard, Activity, Brain, Cloud,
  Lightbulb, AlertTriangle, Shield, Heart
} from 'lucide-react'
import { NAV_ITEMS } from '../../lib/constants'

const iconMap = {
  LayoutDashboard, Activity, Brain, Cloud,
  Lightbulb, AlertTriangle, Shield,
}

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-64 bg-phc-card border-r border-phc-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-5 border-b border-phc-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-phc-accent/20 flex items-center justify-center">
            <Heart className="w-6 h-6 text-phc-accent" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-phc-text">PHC</h1>
            <p className="text-[10px] text-phc-muted uppercase tracking-wider">
              Health Companion
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = activePage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1
                transition-all duration-150 text-sm font-medium
                ${isActive
                  ? 'bg-phc-accent text-white shadow-lg shadow-phc-accent/20'
                  : 'text-phc-muted hover:bg-phc-card-hover hover:text-phc-text'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-phc-border">
        <div className="text-[10px] text-phc-muted text-center">
          <div>v0.1.0 · Prototype</div>
          <div className="mt-1">Edge AI · Offline-First</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar