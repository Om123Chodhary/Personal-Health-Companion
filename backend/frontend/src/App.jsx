import React, { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import OfflineBanner from './components/layout/OfflineBanner'
import OverviewPage from './pages/OverviewPage'
import LiveMonitoringPage from './pages/LiveMonitoringPage'
import RiskEnginePage from './pages/RiskEnginePage'
import EnvironmentPage from './pages/EnvironmentPage'
import ExplainabilityPage from './pages/ExplainabilityPage'
import EmergencyPage from './pages/EmergencyPage'
import PrivacyPage from './pages/PrivacyPage'
import EmergencyModal from './components/emergency/EmergencyModal'
import SOSButton from './components/emergency/SOSButton'
import { useWebSocket } from './hooks/useWebSocket'
import { useEmergency } from './hooks/useEmergency'

function App() {
  const [activePage, setActivePage] = useState('overview')
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  const { data } = useWebSocket()
  const emergency = useEmergency(data)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'overview':       return <OverviewPage />
      case 'live':           return <LiveMonitoringPage />
      case 'risk':           return <RiskEnginePage />
      case 'environment':    return <EnvironmentPage />
      case 'explainability': return <ExplainabilityPage />
      case 'emergency':      return <EmergencyPage />
      case 'privacy':        return <PrivacyPage />
      default:
        return (
          <div className="p-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-phc-text capitalize">{activePage}</h2>
              <p className="text-phc-muted mt-2">Page not found.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-phc-bg">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex-1 flex flex-col">
        <OfflineBanner isOnline={isOnline} />
        <TopBar isOnline={isOnline} />

        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <EmergencyModal
        state={emergency.state}
        countdown={emergency.countdown}
        emergencyEvent={emergency.emergencyEvent}
        onCancel={emergency.userCancel}
        onReset={emergency.reset}
      />

      <SOSButton onSOS={emergency.manualSOS} />
    </div>
  )
}

export default App