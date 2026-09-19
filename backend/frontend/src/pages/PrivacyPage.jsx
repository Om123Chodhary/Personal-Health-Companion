import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Shield, Lock, Eye, Server, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react'
import { API_PRIVACY } from '../lib/constants'

function PrivacyPage() {
  const [privacy, setPrivacy] = useState(null)
  const [cloudSync, setCloudSync] = useState(false)

  useEffect(() => {
    axios.get(API_PRIVACY)
      .then((res) => setPrivacy(res.data))
      .catch((e) => console.error(e))
  }, [])

  const features = [
    { icon: Server, title: 'On-Device Processing', desc: 'All health data processed locally. Core risk detection never requires internet.' },
    { icon: Lock, title: 'Encryption', desc: 'AES-256-GCM at rest, TLS 1.3 in transit. Production-grade crypto.' },
    { icon: Eye, title: 'Minimal Data Sharing', desc: 'Only emergency events leave the device. Continuous health data stays local.' },
    { icon: Shield, title: 'Explicit Consent', desc: 'User controls every data-sharing decision. No hidden telemetry.' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-phc-text flex items-center gap-3">
          <Shield className="w-7 h-7 text-emerald-400" />
          Privacy & Security
        </h1>
        <p className="text-sm text-phc-muted mt-1">
          Privacy-preserving architecture — privacy is a design principle, not a feature
        </p>
      </div>

      {/* Principle */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
        <div className="text-sm font-semibold text-emerald-400 mb-1">
          🛡️ Core Principle
        </div>
        <p className="text-sm text-phc-text">
          "Internet failure must reduce intelligence, not safety."
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <div key={i} className="card">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Icon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-phc-text mb-1">{f.title}</div>
                  <div className="text-xs text-phc-muted">{f.desc}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Consent toggles */}
      <div className="card">
        <div className="card-title">Consent & Data Sharing</div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-phc-bg rounded-lg">
            <div>
              <div className="text-sm font-medium text-phc-text">Cloud Sync (Optional)</div>
              <div className="text-xs text-phc-muted">Sync anonymized events when online</div>
            </div>
            <button onClick={() => setCloudSync(!cloudSync)} className="text-phc-accent">
              {cloudSync
                ? <ToggleRight className="w-8 h-8" />
                : <ToggleLeft className="w-8 h-8 text-phc-muted" />
              }
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-phc-bg rounded-lg">
            <div>
              <div className="text-sm font-medium text-phc-text">Share with Healthcare Provider</div>
              <div className="text-xs text-phc-muted">Send risk reports to your doctor (future)</div>
            </div>
            <ToggleLeft className="w-8 h-8 text-phc-muted" />
          </div>

          <div className="flex items-center justify-between p-3 bg-phc-bg rounded-lg">
            <div>
              <div className="text-sm font-medium text-phc-text">Anonymous Research</div>
              <div className="text-xs text-phc-muted">Contribute anonymized data to research (opt-in)</div>
            </div>
            <ToggleLeft className="w-8 h-8 text-phc-muted" />
          </div>
        </div>
      </div>

      {/* Backend status */}
      {privacy && (
        <div className="card">
          <div className="card-title">Backend Status</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-phc-text">Processing: <span className="text-phc-muted">{privacy.processing_location}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-phc-text">Encryption: <span className="text-phc-muted">{privacy.encryption_at_rest}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-phc-text">Cloud Sync: <span className="text-phc-muted">{privacy.cloud_sync}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-phc-text">Offline Capable: <span className="text-phc-muted">{privacy.offline_capable ? 'YES' : 'NO'}</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Architecture note */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-xs text-blue-300">
        <span className="font-semibold">Architecture note:</span> In this prototype, encryption is simulated
        (SQLite local storage). Production deployment uses AES-256-GCM encrypted storage
        + TLS 1.3 + hardware-backed key storage.
      </div>
    </div>
  )
}

export default PrivacyPage