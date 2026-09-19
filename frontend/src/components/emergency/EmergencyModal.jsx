import React from 'react'
import {
  AlertTriangle, Phone, MapPin, Clock,
  CheckCircle2, X, Heart,
} from 'lucide-react'

function EmergencyModal({ state, countdown, emergencyEvent, onCancel, onReset }) {
  if (state === 'idle') return null

  const isCountdown = state === 'countdown'
  const isTriggered = state === 'triggered'

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`card max-w-lg w-full border-2 ${
        isCountdown
          ? 'border-red-500/50 shadow-2xl shadow-red-500/20'
          : 'border-red-500 shadow-2xl shadow-red-500/40'
      }`}>
        {/* Header */}
        <div className="flex items-start gap-3 mb-5">
          <div className={`p-3 rounded-xl ${
            isCountdown ? 'bg-red-500/20' : 'bg-red-500/30 animate-pulse'
          }`}>
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-red-400">
              {isCountdown ? '🚨 Fall Detected' : '🚨 EMERGENCY TRIGGERED'}
            </h2>
            <p className="text-sm text-phc-muted mt-1">
              {isCountdown
                ? 'Sudden acceleration anomaly detected'
                : 'Emergency contact has been notified (simulated)'
              }
            </p>
          </div>
        </div>

        {/* Countdown Circle */}
        {isCountdown && (
          <div className="flex flex-col items-center my-6">
            <div className="relative">
              <svg width="160" height="160" className="transform -rotate-90">
                <circle
                  cx="80" cy="80" r="70"
                  stroke="#1e293b" strokeWidth="8" fill="transparent"
                />
                <circle
                  cx="80" cy="80" r="70"
                  stroke="#ef4444" strokeWidth="8" fill="transparent"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - countdown / 30)}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-extrabold text-red-400 animate-pulse">
                  {countdown}
                </div>
                <div className="text-xs text-phc-muted mt-1">seconds</div>
              </div>
            </div>

            <p className="text-sm text-phc-text font-medium mt-4 text-center">
              Are you OK? Emergency alert will be sent in
              <span className="text-red-400 font-bold"> {countdown} </span>
              seconds.
            </p>
          </div>
        )}

        {/* Triggered state */}
        {isTriggered && (
          <div className="space-y-4 my-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/20 border border-red-500/40">
              <CheckCircle2 className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-sm font-semibold text-red-400">
                  Emergency Alert Sent
                </p>
                <p className="text-xs text-phc-muted">
                  Simulated notification — prototype mode
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-phc-bg rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-phc-muted mb-1">
                  <Clock className="w-3 h-3" />
                  <span>Time</span>
                </div>
                <div className="font-mono text-phc-text">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
              <div className="bg-phc-bg rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-phc-muted mb-1">
                  <MapPin className="w-3 h-3" />
                  <span>Location</span>
                </div>
                <div className="text-phc-text">Lat: 28.61, Lon: 77.20</div>
              </div>
            </div>

            <div className="bg-phc-bg rounded-lg p-3 text-xs">
              <div className="flex items-center gap-1.5 text-phc-muted mb-2">
                <Phone className="w-3 h-3" />
                <span>Contacts Notified</span>
              </div>
              <ul className="space-y-1 text-phc-text">
                <li>• Caregiver 1 (Primary)</li>
                <li>• Caregiver 2 (Secondary)</li>
                <li>• Emergency 108</li>
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          {isCountdown && (
            <>
              <button
                onClick={onCancel}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                I'm OK — Cancel
              </button>
              <button
                onClick={onReset}
                className="px-4 py-3 rounded-xl bg-phc-bg border border-phc-border text-phc-muted hover:text-phc-text transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}

          {isTriggered && (
            <button
              onClick={onReset}
              className="flex-1 py-3 rounded-xl bg-phc-accent hover:bg-phc-accent-hover text-white font-semibold text-sm transition-colors"
            >
              Acknowledge & Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmergencyModal