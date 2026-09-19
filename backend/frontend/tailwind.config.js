/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Risk level colors
        'risk-low': '#10b981',       // Green
        'risk-moderate': '#f59e0b',  // Amber
        'risk-high': '#f97316',      // Orange
        'risk-critical': '#ef4444',  // Red

        // PHC theme
        'phc-bg': '#0f172a',         // Dark navy background
        'phc-card': '#1e293b',       // Card background
        'phc-card-hover': '#253348', // Card hover
        'phc-border': '#334155',     // Border
        'phc-accent': '#3b82f6',     // Blue accent
        'phc-accent-hover': '#2563eb',
        'phc-text': '#e2e8f0',       // Main text
        'phc-muted': '#94a3b8',      // Muted text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-red': 'pulse-red 1.5s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-in': {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}