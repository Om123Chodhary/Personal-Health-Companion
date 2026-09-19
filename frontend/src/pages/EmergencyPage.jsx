import React, { useState } from 'react'
import { AlertTriangle, Phone, User, CheckCircle2, Clock } from 'lucide-react'
import axios from 'axios'
import { API_EMERGENCY_SOS } from '../lib/constants'

function EmergencyPage() {
  const [testing, setTesting] = useState(false)
  const [lastEvent, setLastEvent] = useState(null)

  const testSOS = async () => {
    setTesting(true)
    try {
      const res = await axios.post(API_EMERGENCY_SOS, {
        reason: 'test_from_emergency_page',
      })
      setLastEvent(res.data)
    } catch (e) {
      console.error(e)
    } finally {
      setTesting(false)
    }
  }

  const contacts = [
    { name: 'Caregiver 1 (Primary)', relation: 'Daughter', phone: '+91-XXXX-XXX-001', status: 'verified' },
    { name: 'Caregiver 2 (Secondary)', relation: 'Son', phone: '+91-XXXX-XXX-002', status: 'verified' },
    { name: 'Emergency Services', relation: 'National', phone: '108', status: 'verified' },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-phc-text flex items-center gap-3">
          <AlertTriangle className="w-7 h-7 text-red-400" />
          Emergency Module
        </h1>
        <p className="text-sm text-phc-muted mt-1">
          Fall detection, SOS, and emergency escalation
        </p>
      </div>

      {/* Workflow explainer */}
      <div className="card">
        <div className="card-title">How Emergency Escalation Works</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {[
            { step: '1', title: 'Fall Detected', desc: 'Accel anomaly detected', color: 'text-red-400' },
            { step: '2', title: '30s Countdown', desc: 'User confirmation window', color: 'text-orange-400' },
            { step: '3', title: 'Auto Trigger', desc: 'If no response', color: 'text-yellow-400' },
            { step: '4', title: 'Notify Contacts', desc: 'SMS + location sent', color: 'text-emerald-400' },
          ].map((s) => (
            <div key={s.step} className="bg-phc-bg rounded-xl p-4 border border-phc-border">
              <div className={`text-2xl font-bold ${s.color} mb-2`}>{s.step}</div>
              <div className="text-sm font-semibold text-phc-text mb-1">{s.title}</div>
              <div className="text-xs text-phc-muted">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency contacts */}
      <div className="card">
        <div className="card-title flex items-center gap-2">
          <Phone className="w-4 h-4 text-phc-accent" />
          Emergency Contacts
        </div>
        <div className="space-y-3">
          {contacts.map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-phc-bg rounded-lg border border-phc-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-phc-accent/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-phc-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-phc-text">{c.name}</div>
                  <div className="text-xs text-phc-muted">{c.relation} · {c.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test SOS */}
      <div className="card">
        <div className="card-title">Test SOS Trigger</div>
        <p className="text-xs text-phc-muted mb-4">
          Simulation only. Real SMS/call is disabled in prototype.
        </p>
        <button
          onClick={testSOS}
          disabled={testing}
          className="btn btn-danger"
        >
          {testing ? 'Sending...' : '🧪 Test SOS Alert'}
        </button>

        {lastEvent && (
          <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <div className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Test alert sent (simulated)
            </div>
            <div className="text-xs text-phc-muted space-y-1 font-mono">
              <div>Event ID: {lastEvent.event?.event_id}</div>
              <div>Time: {new Date(lastEvent.event?.timestamp).toLocaleString()}</div>
              <div>Contacts: {lastEvent.contacts_notified?.join(', ')}</div>
              <div>Status: {lastEvent.status}</div>
            </div>
          </div>
        )}
      </div>

      {/* Privacy note */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-xs text-blue-300">
        <span className="font-semibold">Privacy note:</span> Emergency data is minimized.
        Only location, timestamp, and event type are shared with contacts.
        Continuous health data is never transmitted.
      </div>
    </div>
  )
}

export default EmergencyPage