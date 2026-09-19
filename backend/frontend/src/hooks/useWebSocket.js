import { useEffect, useRef, useState } from 'react'
import { WS_LIVE } from '../lib/constants'

export function useWebSocket() {
  const [data, setData] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState([])
  const wsRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    let reconnectTimeout = null

    const connect = () => {
      // Agar pehle se open hai toh skip
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log('[WS] Already connected, skipping')
        return
      }

      console.log('[WS] Attempting connection to', WS_LIVE)

      try {
        const ws = new WebSocket(WS_LIVE)
        wsRef.current = ws

        ws.onopen = () => {
          if (!mountedRef.current) return
          console.log('[WS] ✅ Connected')
          setIsConnected(true)
          setError(null)
        }

        ws.onmessage = (event) => {
          if (!mountedRef.current) return
          try {
            const message = JSON.parse(event.data)
            console.log('[WS] 📨 Message received:', message.type)

            // TICK messages process karo
            if (message.type === 'tick') {
              // Latest data set karo
              setData(message)

              // History mein add karo
              setHistory((prev) => {
                const updated = [...prev, message]
                const trimmed = updated.slice(-60)
                console.log('[WS] History length:', trimmed.length)
                return trimmed
              })
            }
          } catch (e) {
            console.error('[WS] Parse error:', e)
          }
        }

        ws.onerror = (e) => {
          if (!mountedRef.current) return
          console.error('[WS] ❌ Error:', e)
          setError('Connection error')
        }

        ws.onclose = () => {
          if (!mountedRef.current) return
          console.log('[WS] 🔌 Disconnected')
          setIsConnected(false)

          // Reconnect
          reconnectTimeout = setTimeout(() => {
            if (mountedRef.current) {
              console.log('[WS] 🔄 Reconnecting...')
              connect()
            }
          }, 3000)
        }
      } catch (e) {
        if (!mountedRef.current) return
        console.error('[WS] Exception:', e)
        setError(e.message)
      }
    }

    connect()

    return () => {
      mountedRef.current = false
      if (reconnectTimeout) clearTimeout(reconnectTimeout)
      if (wsRef.current) {
        wsRef.current.onclose = null
        wsRef.current.close()
      }
    }
  }, [])

  return { data, history, isConnected, error }
}