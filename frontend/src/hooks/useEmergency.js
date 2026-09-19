import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import { API_EMERGENCY_SOS } from '../lib/constants'

/**
 * Emergency state management hook.
 * 
 * 3 states:
 *   - idle: kuch nahi ho raha
 *   - countdown: fall detect hua, user confirmation ka wait
 *   - triggered: countdown khatam, alert sent
 */
export function useEmergency(riskData) {
  const [state, setState] = useState('idle')  // idle | countdown | triggered
  const [countdown, setCountdown] = useState(30)
  const [emergencyEvent, setEmergencyEvent] = useState(null)
  const timerRef = useRef(null)
  const lastFallRef = useRef(false)

  // Fall detection trigger
  useEffect(() => {
    if (!riskData) return

    const fallDetected = riskData?.reading?.fall_detected

    // New fall detected (edge trigger)
    if (fallDetected && !lastFallRef.current) {
      console.log('[Emergency] Fall detected!')
      startCountdown('fall')
    }

    lastFallRef.current = fallDetected
  }, [riskData])

  const startCountdown = useCallback((reason = 'fall') => {
    setState('countdown')
    setCountdown(30)
    setEmergencyEvent({
      type: reason,
      startedAt: new Date().toISOString(),
    })
  }, [])

  // Countdown timer
  useEffect(() => {
    if (state !== 'countdown') return

    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current)
          triggerEmergency()
          return 0
        }
        return c - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [state])

  const triggerEmergency = useCallback(async () => {
    setState('triggered')
    try {
      const res = await axios.post(API_EMERGENCY_SOS, {
        reason: emergencyEvent?.type || 'unknown',
      })
      console.log('[Emergency] Alert sent:', res.data)
    } catch (e) {
      console.error('[Emergency] Failed to send:', e)
    }
  }, [emergencyEvent])

  const userCancel = useCallback(() => {
    console.log('[Emergency] User cancelled — I am OK')
    if (timerRef.current) clearInterval(timerRef.current)
    setState('idle')
    setCountdown(30)
    setEmergencyEvent(null)
  }, [])

  const manualSOS = useCallback(() => {
    console.log('[Emergency] Manual SOS triggered')
    setEmergencyEvent({ type: 'manual', startedAt: new Date().toISOString() })
    triggerEmergency()
  }, [triggerEmergency])

  const reset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setState('idle')
    setCountdown(30)
    setEmergencyEvent(null)
  }, [])

  return {
    state,
    countdown,
    emergencyEvent,
    userCancel,
    manualSOS,
    reset,
    startCountdown,
  }
}