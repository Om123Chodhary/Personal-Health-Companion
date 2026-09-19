import React, { useState } from 'react'
import { AlertCircle, Shield } from 'lucide-react'

function SOSButton({ onSOS }) {
  const [confirming, setConfirming] = useState(false)

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    onSOS()
    setConfirming(false)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-40
        w-20 h-20 rounded-full
        flex flex-col items-center justify-center
        font-bold text-white text-xs
        transition-all duration-300
        shadow-2xl
        ${confirming
          ? 'bg-red-600 animate-pulse-red scale-110 shadow-red-500/50'
          : 'bg-red-500 hover:bg-red-600 shadow-red-500/30 hover:scale-105'
        }
      `}
      title="Emergency SOS"
    >
      {confirming ? (
        <>
          <AlertCircle className="w-6 h-6 mb-1" />
          <span>CONFIRM</span>
        </>
      ) : (
        <>
          <Shield className="w-6 h-6 mb-1" />
          <span>SOS</span>
        </>
      )}
    </button>
  )
}

export default SOSButton