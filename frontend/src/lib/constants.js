// PHC — Constants

// API endpoints
export const API_BASE = 'http://localhost:8000';
export const API_RISK = `${API_BASE}/api/risk/current`;
export const API_ENV = `${API_BASE}/api/environment/current`;
export const API_SCENARIO_LIST = `${API_BASE}/api/scenario/list`;
export const API_SCENARIO_ACTIVATE = `${API_BASE}/api/scenario/activate`;
export const API_EMERGENCY_SOS = `${API_BASE}/api/emergency/sos`;
export const API_PRIVACY = `${API_BASE}/api/privacy/status`;
export const WS_LIVE = 'ws://localhost:8000/ws/live';

// Risk levels
export const RISK_LEVELS = {
  LOW: { label: 'LOW', color: 'risk-low', min: 0, max: 25 },
  MODERATE: { label: 'MODERATE', color: 'risk-moderate', min: 25, max: 50 },
  HIGH: { label: 'HIGH', color: 'risk-high', min: 50, max: 75 },
  CRITICAL: { label: 'CRITICAL', color: 'risk-critical', min: 75, max: 100 },
};

// Risk factor display names
export const FACTOR_LABELS = {
  heat_stress: 'Heat Stress',
  respiratory: 'Respiratory',
  cardiac: 'Cardiac',
  fall: 'Fall',
  disaster: 'Disaster',
  physiological: 'Physiological',
};

// Scenario info
export const SCENARIOS = {
  normal: {
    label: 'Normal Day',
    icon: 'sun',
    color: 'emerald',
  },
  heatwave: {
    label: 'Heatwave',
    icon: 'thermometer',
    color: 'orange',
  },
  pollution: {
    label: 'Pollution',
    icon: 'wind',
    color: 'yellow',
  },
  fall: {
    label: 'Fall Emergency',
    icon: 'alert-triangle',
    color: 'red',
  },
  offline: {
    label: 'Offline Mode',
    icon: 'wifi-off',
    color: 'gray',
  },
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
  { id: 'live', label: 'Live Monitoring', icon: 'Activity' },
  { id: 'risk', label: 'AI Risk Engine', icon: 'Brain' },
  { id: 'environment', label: 'Environment', icon: 'Cloud' },
  { id: 'explainability', label: 'Explainability', icon: 'Lightbulb' },
  { id: 'emergency', label: 'Emergency', icon: 'AlertTriangle' },
  { id: 'privacy', label: 'Privacy', icon: 'Shield' },
];