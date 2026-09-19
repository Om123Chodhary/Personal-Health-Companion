<div align="center">

# 🏥 PHC — Personal Health Companion

### *"Don't wait for the emergency. Detect the risk before the emergency."*

**An offline-first, privacy-preserving, disaster-aware edge-AI early risk detection system**

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![SQLite](https://img.shields.io/badge/SQLite-3-003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)

**Status:** Prototype · **Version:** 0.1.0 · **License:** MIT

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Our Solution](#-our-solution)
- [Key Differentiators](#-key-differentiators)
- [System Architecture](#-system-architecture)
- [AI Risk Engine](#-ai-risk-engine)
- [Personal Baseline System](#-personal-baseline-system)
- [Data Flow](#-data-flow)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Demo Scenarios](#-demo-scenarios)
- [Frontend Dashboard](#-frontend-dashboard)
- [Privacy & Security](#-privacy--security)
- [Emergency Workflow](#-emergency-workflow)
- [Offline Mode](#-offline-mode)
- [Testing](#-testing)
- [Performance](#-performance)
- [Roadmap](#-roadmap)
- [Limitations & Disclaimers](#-limitations--disclaimers)
- [Author](#-author)
- [License](#-license)

---

## 🌟 Overview

**PHC (Personal Health Companion)** is an advanced edge-AI system that combines **physiological signals**, **personal health baselines**, **activity patterns**, **environmental conditions**, and **disaster context** to detect early health risks and recommend timely actions.

Unlike traditional fitness trackers that only answer *"What is happening?"*, PHC answers:

> **"What is happening? Why might it be happening? How serious could it become? What should the user do now?"**

### 🎯 Core Capabilities

| Capability | Description |
|-----------|-------------|
| 🔬 **Physiological Monitoring** | Heart Rate, SpO2, Body Temperature, Activity, HRV, EDA |
| 🧠 **Personal Baselines** | Learns each user's unique "normal" — not generic thresholds |
| 🌡️ **Environmental Context** | Temperature, Humidity, AQI, PM2.5, UV Index, Weather |
| 🚨 **Disaster Awareness** | Heatwave, Flood, Cyclone, Pollution alerts |
| 📊 **Explainable AI** | Reason codes — exactly why the risk score changed |
| 💡 **Actionable Insights** | Context-aware, prioritized recommendations |
| 🆘 **Emergency Escalation** | Fall detection, SOS, contact notification |
| 📴 **Offline-First** | Core detection continues without internet |
| 🔐 **Privacy-by-Design** | On-device processing, encrypted, minimal sharing |

---

## 🎯 The Problem

India faces recurring **heatwaves, floods, cyclones, pollution events**, and extreme weather. Vulnerable populations — the **elderly, rural communities, outdoor workers** — experience:

- 🔥 **Heat stress & dehydration** during extreme summers
- 🫁 **Respiratory distress** during pollution events
- ❤️ **Cardiovascular stress** from combined physiological-environmental strain
- 🚶 **Falls & delayed emergency response**
- ⏰ **Delayed access to healthcare** in rural areas

### Why Existing Solutions Fail

| Limitation | Impact |
|-----------|--------|
| ❌ Health **OR** environment, not both | No context — false positives/negatives |
| ❌ Cloud-dependent | Fails exactly when needed most (disasters) |
| ❌ Generic thresholds | Doesn't account for individual variation |
| ❌ Reactive | Alerts only after symptoms become severe |
| ❌ Black-box | Users don't understand the risk |
| ❌ Cloud-first privacy | Sensitive health data leaves device |

---

## ✨ Our Solution

PHC delivers **context-aware, personalized, offline-capable** early risk detection through a multi-modal fusion architecture.

### What PHC Does Differently

```
         Fitness Tracker              →         PHC
    ────────────────────────────         ────────────────────────
    "What is happening?"                 "What is happening?"
                                          "Why might it be happening?"
                                          "How serious could it become?"
                                          "What should the user do now?"
```

### Core Innovation

> **Personalized Baseline + Environmental Context + Disaster Awareness + Edge AI = Proactive Safety**

---

## 🏆 Key Differentiators

| Feature | Traditional Tracker | **PHC** |
|---------|---------------------|---------|
| **Baseline** | Generic clinical thresholds | ✅ **Personal, adaptive** |
| **Context** | Physiological only | ✅ **Multi-modal fusion** |
| **Disaster Aware** | ❌ No | ✅ **Heatwave/flood/pollution** |
| **Offline** | ❌ Cloud required | ✅ **Edge AI — works offline** |
| **Explainability** | ❌ Black box | ✅ **Reason codes for every score** |
| **Privacy** | Cloud-first | ✅ **Local-first, encrypted** |
| **Emergency** | Basic alerts | ✅ **Full escalation workflow** |
| **Actionability** | Just numbers | ✅ **Context-aware actions** |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                      PHC SYSTEM ARCHITECTURE                          │
│                                                                       │
│   ┌──────────────────┐                                                │
│   │ WEARABLE / SENSOR│  (BLE or simulated in prototype)               │
│   │ • Heart Rate     │                                                │
│   │ • SpO2           │                                                │
│   │ • Body Temp      │                                                │
│   │ • Activity       │                                                │
│   │ • Fall/IMU       │                                                │
│   │ • HRV / EDA      │                                                │
│   └────────┬─────────┘                                                │
│            ▼                                                          │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │              EDGE DEVICE (Smartphone)                       │     │
│   │                                                             │     │
│   │  ┌───────────────────────────────────────────────────────┐ │     │
│   │  │   DATA PROCESSING                                     │ │     │
│   │  │   • Ingestion (ring buffer, 5-min window)             │ │     │
│   │  │   • Cleaning (outlier rejection, interpolation)       │ │     │
│   │  │   • Feature extraction (rolling stats, trends)        │ │     │
│   │  └───────────────────────┬───────────────────────────────┘ │     │
│   │                          ▼                                 │     │
│   │  ┌───────────────────────────────────────────────────────┐ │     │
│   │  │   EDGE AI RISK ENGINE                                 │ │     │
│   │  │                                                       │ │     │
│   │  │   1. Personal Baseline Update                         │ │     │
│   │  │   2. Anomaly Detection (Z-score)                      │ │     │
│   │  │   3. Environmental Context Fusion                     │ │     │
│   │  │   4. Disaster Context Fusion                          │ │     │
│   │  │   5. Multi-Modal Risk Fusion                          │ │     │
│   │  │   6. Explainability Engine                            │ │     │
│   │  │   7. Action Recommendation                            │ │     │
│   │  └───────────────────────┬───────────────────────────────┘ │     │
│   │                          ▼                                 │     │
│   │  ┌───────────────────────────────────────────────────────┐ │     │
│   │  │   OUTPUT                                              │ │     │
│   │  │   • Risk Score (0-100)                                │ │     │
│   │  │   • Risk Level (LOW/MODERATE/HIGH/CRITICAL)           │ │     │
│   │  │   • Confidence                                        │ │     │
│   │  │   • Reason Codes                                      │ │     │
│   │  │   • Recommended Actions                               │ │     │
│   │  │   • Emergency Escalation                              │ │     │
│   │  └───────────────────────┬───────────────────────────────┘ │     │
│   │                          ▼                                 │     │
│   │  ┌──────────────┐ ┌────────────┐ ┌───────────────────┐    │     │
│   │  │ LOCAL ALERTS │ │ DASHBOARD  │ │ EMERGENCY         │    │     │
│   │  │ (haptic/son) │ │ (React UI) │ │ (SOS + contacts)  │    │     │
│   │  └──────────────┘ └────────────┘ └───────────────────┘    │     │
│   │                                                             │     │
│   │  ┌───────────────────────────────────────────────────────┐ │     │
│   │  │   LOCAL STORAGE (SQLite, encrypted)                   │ │     │
│   │  │   • Health records • Baseline • Audit log             │ │     │
│   │  └───────────────────────────────────────────────────────┘ │     │
│   └────────────────────────────────────────────────────────────┘     │
│                                                                       │
│            ▼ OPTIONAL (never required for core function)              │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │   CLOUD SYNC (Opt-in)                                       │     │
│   │   • Encrypted sync queue  • Healthcare provider API         │     │
│   └────────────────────────────────────────────────────────────┘     │
│                                                                       │
│   ┌────────────────────────────────────────────────────────────┐     │
│   │   EXTERNAL ADAPTERS (with caching fallback)                 │     │
│   │   [OpenWeather] [CPCB AQI] [NDMA Alerts] [OpenUV]           │     │
│   └────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
```

**Core Principle:**

> 🔒 **"Internet failure must reduce intelligence, not safety."**

---

## 🧠 AI Risk Engine

PHC uses a **transparent, rule-based multi-factor fusion engine** — not a black-box deep learning model. This makes every score **explainable** and **auditable**.

### Risk Fusion Formula

```
Risk Score = Σ (Factor_Score × Factor_Weight)

Factors:
  • Heat Stress        (20%)
  • Respiratory        (16%)
  • Cardiac            (16%)
  • Fall               (28%)   ← Critical event
  • Disaster Context   (10%)
  • Physiological      (10%)
```

### Risk Levels

| Score Range | Level | Color | Meaning |
|------------|-------|-------|---------|
| 0 – 25 | **LOW** | 🟢 Green | All vitals within baseline |
| 25 – 50 | **MODERATE** | 🟡 Amber | Monitor, take preventive action |
| 50 – 75 | **HIGH** | 🟠 Orange | Take immediate action |
| 75 – 100 | **CRITICAL** | 🔴 Red | Emergency escalation |

### Fall Override

If `fall_detected = true`:

```python
overall_score = max(overall_score, 75.0)   # Force minimum HIGH level
emergency = True                            # Trigger SOS workflow
```

### Example Risk Calculation

**Scenario: Heatwave + Physical Activity**

```
Physiological:
  • HR:        104 bpm (baseline: 72) → z-score 5.3 → score 88
  • Body Temp: 39.1°C (baseline: 36.7) → +2.4°C → score 100
  • SpO2:      94% (baseline: 98) → -4% → score 100

Environmental:
  • Heat Index: 58°C → score 100
  • Humidity:   78% → score 45
  • AQI:        150 → score 40

Activity:
  • Activity:   75/100 (high) → score 52

Disaster:
  • Heatwave Severity 4/5 → score 80

Fused Score:
  Heat Stress:    0.20 × 78.2 = 15.6
  Respiratory:    0.16 × 47.0 =  7.5
  Cardiac:        0.16 × 90.4 = 14.5
  Fall:           0.28 ×  0.0 =  0.0
  Disaster:       0.10 × 80.0 =  8.0
  Physiological:  0.10 × 65.3 =  6.5
  ─────────────────────────────────
  OVERALL SCORE:              = 52.1  → HIGH RISK 🟠

Top Reasons:
  • Body temperature +2.4°C above personal baseline
  • Heart rate +44% above baseline
  • High humidity (78%) impairs cooling
  • Heatwave condition active in your area
  • High physical activity (75/100)

Recommended Actions:
  → Stop strenuous activity
  → Drink water now (250–500 ml)
  → Move to a cooler, shaded or air-conditioned location
  → Recheck in 15 minutes
```

### Explainability

Every risk score comes with:
- ✅ **Top 5 reason codes** (human-readable)
- ✅ **Per-factor contribution** (transparent math)
- ✅ **Confidence score** (baseline maturity × data quality)
- ✅ **Raw sensor readings** (full transparency)

---

## 🔬 Personal Baseline System

### Why Personal Baselines Matter

```
Generic threshold:  "HR > 100 = risky"

Reality:
  • 25-year-old athlete:      HR 65 normal
  • 70-year-old grandmother:  HR 78 normal
  • Marathon runner:          HR 50 normal
  • Anxious teenager:         HR 95 normal
```

**PHC learns each user's unique "normal" and adapts over time.**

### Welford's Online Algorithm

```python
def update_baseline(mean, std, new_value, alpha=0.005):
    delta = new_value - mean
    mean += alpha * delta                    # Slow adaptation
    std = sqrt((1-alpha) * std² + alpha * delta²)
    return mean, std
```

**Why `alpha = 0.005`?**
- Each reading updates baseline by only **0.5%**
- Sudden spikes (exercise, illness) don't corrupt the baseline
- Over 200+ readings, baseline stabilizes

### Baseline Maturity

```
Maturity = min(1.0, sample_count / 300)

  0%  ──── No baseline yet (uses clinical defaults)
 50%  ──── Learning (gradual personalization)
100%  ──── Fully personalized (300+ readings)
```

### Confidence Calculation

```
Confidence = 0.5 × Baseline Maturity
           + 0.3 × Data Quality
           + 0.2 × Base Confidence (0.8)

Range: 0.30 – 0.99
```

---

## 🔄 Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                      SENSOR TICK (1.5 sec)                        │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  1. INGESTION                                                     │
│     Ring buffer (last 300 samples) · Outlier rejection            │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  2. DATA CLEANING                                                 │
│     • Reject HR < 30 or > 220                                     │
│     • Reject SpO2 < 70                                            │
│     • Interpolate gaps < 3 samples                                │
│     • Compute data_quality score                                  │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  3. FEATURE EXTRACTION                                            │
│     Rolling mean/std · Trend (slope) · Delta from baseline        │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  4. PERSONAL BASELINE UPDATE                                      │
│     Welford's online algorithm · Time-of-day adjustments          │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  5. ANOMALY DETECTION                                             │
│     Z-score per vital · Combined deviation · Severity mapping     │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  6. CONTEXT FUSION                                                │
│     Environment (Heat Index, AQI) + Disaster alerts               │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  7. MULTI-MODAL RISK FUSION                                       │
│     Weighted combination of 6 factors → Score 0-100               │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  8. EXPLAINABILITY + ACTIONS                                      │
│     Reason codes · Confidence · Recommended actions               │
└────────────────────────────┬─────────────────────────────────────┘
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│  9. OUTPUT                                                        │
│     WebSocket → Dashboard · Local alerts · Emergency if CRITICAL  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Python** | Core language | 3.10+ |
| **FastAPI** | REST APIs + WebSocket | 0.109+ |
| **Uvicorn** | ASGI server | 0.27+ |
| **Pydantic** | Data validation | 2.5+ |
| **SQLite** | Local storage | 3.x |
| **NumPy** | Numerical ops | 1.26+ |
| **WebSockets** | Real-time streaming | 12.0+ |
| **Cryptography** | AES-256-GCM | 42.0+ |

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework | 18.2 |
| **Vite** | Build tool | 5.0 |
| **Tailwind CSS** | Styling | 3.4 |
| **Recharts** | Live charts | 2.10 |
| **Lucide React** | Icon library | Latest |
| **Axios** | HTTP client | 1.6 |
| **Inter Font** | Typography | Variable |

### AI & Algorithms

| Technique | Purpose |
|-----------|---------|
| **Welford's Algorithm** | Online baseline update |
| **Z-Score Analysis** | Anomaly detection |
| **Rothfusz Equation** | Heat Index calculation |
| **Weighted Fusion** | Multi-modal risk scoring |
| **Rule-Based Reason Codes** | Explainability |

### DevOps & Tools

| Tool | Purpose |
|------|---------|
| **Git + GitHub** | Version control |
| **VS Code** | IDE |
| **PowerShell** | Terminal |
| **Swagger UI** | API documentation |

---

## 📁 Project Structure

```
phc-personal-health-companion/
│
├── README.md                          # This file
├── .gitignore                         # Git ignore rules
│
├── backend/                           # Python FastAPI backend
│   ├── requirements.txt
│   ├── run.py
│   ├── app/
│   │   ├── main.py                    # FastAPI entry point
│   │   ├── config.py
│   │   ├── database.py                # SQLite + models
│   │   │
│   │   ├── models/                    # Pydantic schemas
│   │   │   ├── sensor.py
│   │   │   ├── risk.py
│   │   │   ├── baseline.py
│   │   │   ├── environment.py
│   │   │   └── emergency.py
│   │   │
│   │   ├── api/                       # REST endpoints
│   │   │   ├── routes_health.py
│   │   │   ├── routes_risk.py
│   │   │   ├── routes_environment.py
│   │   │   ├── routes_scenario.py
│   │   │   ├── routes_emergency.py
│   │   │   └── routes_privacy.py
│   │   │
│   │   ├── services/                  # Business logic
│   │   │   ├── risk_engine.py         # ⭐ AI Brain
│   │   │   ├── baseline_service.py    # Personal baseline
│   │   │   ├── anomaly_service.py
│   │   │   ├── context_service.py
│   │   │   ├── emergency_service.py
│   │   │   └── storage_service.py
│   │   │
│   │   ├── synthetic/                 # Data generator
│   │   │   ├── generator.py           # Sensor simulation
│   │   │   ├── profiles.py            # User archetypes
│   │   │   └── scenarios.py           # Demo scenarios
│   │   │
│   │   ├── websocket/                 # Live streaming
│   │   │   ├── manager.py
│   │   │   └── stream.py
│   │   │
│   │   ├── utils/
│   │   │   ├── math_utils.py          # clamp, z_score, severity
│   │   │   └── logger.py
│   │   │
│   │   └── security/
│   │       └── encryption.py
│   │
│   ├── data/
│   │   └── phc.db                     # SQLite database
│   │
│   └── tests/
│       ├── test_risk_engine.py
│       ├── test_baseline.py
│       └── test_scenarios.py
│
├── frontend/                          # React dashboard
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── api/
│       │   ├── client.js
│       │   └── websocket.js
│       │
│       ├── hooks/
│       │   ├── useWebSocket.js        # Live data
│       │   └── useEmergency.js        # Fall detection
│       │
│       ├── lib/
│       │   ├── constants.js
│       │   └── riskColors.js
│       │
│       ├── components/
│       │   ├── layout/                # Sidebar, TopBar
│       │   ├── cards/                 # RiskScore, Vital
│       │   ├── charts/                # LiveLineChart
│       │   ├── risk/                  # RiskBreakdown
│       │   ├── environment/           # AQI, Weather
│       │   ├── emergency/             # SOS, Modal
│       │   ├── simulator/             # Scenario selector
│       │   └── ui/                    # Buttons, Badges
│       │
│       └── pages/
│           ├── OverviewPage.jsx
│           ├── LiveMonitoringPage.jsx
│           ├── RiskEnginePage.jsx
│           ├── EnvironmentPage.jsx
│           ├── ExplainabilityPage.jsx
│           ├── EmergencyPage.jsx
│           └── PrivacyPage.jsx
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_REFERENCE.md
│   ├── AI_ENGINE.md
│   └── PRIVACY_SECURITY.md
│
└── demo/                              # Demo scenarios
    ├── scenario_1_normal.json
    ├── scenario_2_heatwave.json
    ├── scenario_3_fall.json
    └── scenario_4_offline.json
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+**
- **Node.js 18+**
- **Git**

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --port 8000
```

**Backend running at:** `http://localhost:8000`
**Interactive docs:** `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Frontend running at:** `http://localhost:5173`

### One-Command Start (PowerShell)

```powershell
# Terminal 1
cd backend; venv\Scripts\activate; uvicorn app.main:app --reload --port 8000

# Terminal 2
cd frontend; npm run dev
```

---

## 📡 API Reference

### Health Check

```http
GET /health
```

```json
{
  "status": "ok",
  "service": "PHC — Personal Health Companion",
  "version": "0.1.0",
  "edge_ai": "ACTIVE",
  "offline_capable": true
}
```

### Risk Assessment

```http
GET /api/risk/current
```

```json
{
  "reading": {
    "timestamp": "2026-09-19T17:55:30.123456",
    "heart_rate": 104.3,
    "spo2": 94.2,
    "body_temp": 39.1,
    "activity_level": 75.0,
    "hrv": 32.5,
    "eda": 5.4,
    "accel_magnitude": 1.2,
    "fall_detected": false,
    "data_quality": 1.0
  },
  "environment": {
    "temperature": 43.0,
    "humidity": 78,
    "aqi": 150,
    "pm25": 85,
    "uv_index": 10,
    "heat_index": 58.2,
    "heatwave": true
  },
  "alerts": [{
    "alert_type": "heatwave",
    "severity": 4,
    "active": true
  }],
  "risk": {
    "overall_score": 52.1,
    "risk_level": "HIGH",
    "confidence": 0.82,
    "data_quality": 1.0,
    "factors": [...],
    "top_reasons": [
      "Body temperature +2.4°C above personal baseline",
      "Heart rate +44% above baseline",
      "High humidity (78%) impairs cooling",
      "Heatwave condition active in your area"
    ],
    "recommended_actions": [
      "Stop strenuous activity",
      "Drink water now (250–500 ml)",
      "Move to a cooler, shaded or air-conditioned location",
      "Recheck in 15 minutes"
    ],
    "emergency": false
  }
}
```

### Scenario Management

```http
GET /api/scenario/list
```

```json
{
  "normal": {
    "label": "Normal Day",
    "description": "All vitals normal, clean air, pleasant weather",
    "expected_level": "LOW"
  },
  "heatwave": {
    "label": "Heatwave",
    "description": "Extreme heat + high humidity — heat stress risk",
    "expected_level": "HIGH"
  },
  "pollution": {
    "label": "Pollution Event",
    "description": "Severe air quality — respiratory risk",
    "expected_level": "HIGH"
  },
  "fall": {
    "label": "Fall Emergency",
    "description": "Sudden fall + no movement — emergency",
    "expected_level": "CRITICAL"
  }
}
```

```http
POST /api/scenario/activate/heatwave
```

```json
{
  "active": "heatwave",
  "label": "Heatwave",
  "expected_level": "HIGH"
}
```

### Emergency SOS

```http
POST /api/emergency/sos
Content-Type: application/json

{
  "lat": 28.6139,
  "lon": 77.2090,
  "reason": "manual"
}
```

```json
{
  "event": {
    "event_id": "a3f9b21c",
    "type": "manual_sos",
    "timestamp": "2026-09-19T18:05:00.000Z",
    "confidence": 1.0,
    "location": {"lat": 28.6139, "lon": 77.2090}
  },
  "contacts_notified": ["caregiver_1", "caregiver_2", "emergency_108"],
  "status": "notified",
  "note": "SIMULATED notification — real SMS/call not sent in prototype"
}
```

### Privacy Status

```http
GET /api/privacy/status
```

```json
{
  "processing_location": "on_device",
  "encryption_at_rest": "AES-256-GCM",
  "encryption_in_transit": "TLS 1.3",
  "cloud_sync": "optional, opt-in",
  "data_shared_with_third_parties": false,
  "consent_required": true,
  "pii_minimization": true,
  "audit_logging": true
}
```

### WebSocket Stream

```
ws://localhost:8000/ws/live
```

**Message Format:**

```json
{
  "type": "tick",
  "reading": { ... },
  "environment": { ... },
  "alerts": [ ... ],
  "risk": { ... },
  "baseline_maturity": 0.85
}
```

**Broadcast frequency:** Every 1.5 seconds

---

## 🎬 Demo Scenarios

### Scenario 1: Normal Day ☀️

| Metric | Value |
|--------|-------|
| Heart Rate | 72 bpm |
| SpO2 | 98% |
| Body Temp | 36.7°C |
| AQI | 50 |
| Activity | Normal |

**Expected Result:**
- 🟢 Risk Score: **5–10** (LOW)
- ✅ Actions: *"Continue normal activity, Stay hydrated"*

---

### Scenario 2: Heatwave 🌡️

| Metric | Value |
|--------|-------|
| Heart Rate | 104 bpm (+44%) |
| SpO2 | 94% (-4%) |
| Body Temp | 39.1°C (+2.4°C) |
| Humidity | 78% |
| Heat Index | 58.2°C |
| AQI | 150 |
| Alert | Heatwave Severity 4/5 |

**Expected Result:**
- 🟠 Risk Score: **50–75** (HIGH)
- **Reasons:**
  - Body temperature +2.4°C above baseline
  - Heart rate +44% above baseline
  - High humidity impairs cooling
  - Heatwave condition active
- **Actions:**
  - Stop strenuous activity
  - Drink water now (250–500 ml)
  - Move to cooler location
  - Recheck in 15 minutes

---

### Scenario 3: Pollution Event 🌬️

| Metric | Value |
|--------|-------|
| SpO2 | 94% (-4%) |
| AQI | 320 (Hazardous) |
| PM2.5 | 220 µg/m³ |

**Expected Result:**
- 🟡 Risk Score: **15–30** (MODERATE)
- **Reasons:**
  - SpO₂ dropped below baseline
  - AQI 320 — hazardous air quality
- **Actions:**
  - Reduce outdoor exposure
  - Use N95 mask
  - Move indoors with air purification

---

### Scenario 4: Fall Emergency 🚨

| Metric | Value |
|--------|-------|
| Acceleration | 3.5g (spike) |
| Activity | 0 (no movement) |
| Fall Detected | TRUE |

**Expected Result:**
- 🔴 Risk Score: **75+** (CRITICAL)
- **Emergency Flag:** TRUE
- **Workflow:**
  1. Modal opens with 30-second countdown
  2. User confirms *"I'm OK"* → Cancel
  3. No response in 30s → Auto-escalate
  4. Emergency contacts notified
  5. Location + timestamp shared

---

### Scenario 5: Offline Mode 📴

| State | Behavior |
|-------|----------|
| Network | OFFLINE |
| Edge AI | ✅ ACTIVE |
| Local Alerts | ✅ ACTIVE |
| Sensor Processing | ✅ ACTIVE |
| Cloud Sync | ⏸ WAITING |

**Key Principle:** *Internet failure reduces intelligence, not safety.*

---

## 📊 Frontend Dashboard

### 7 Pages

| Page | Features |
|------|----------|
| **📊 Overview** | Risk score, vitals, environment, charts, scenarios |
| **📈 Live Monitoring** | Real-time charts (HR, SpO2, Temp, Activity, Accel) |
| **🧠 AI Risk Engine** | Factor breakdown + engine architecture |
| **☁️ Environment** | Temperature, humidity, AQI, PM2.5, UV, alerts |
| **💡 Explainability** | Reason codes + raw sensor data |
| **🚨 Emergency** | Contacts, SOS, workflow diagram |
| **🛡️ Privacy** | Data handling, consent, encryption |

### UI Design

- **Dark professional theme** (navy background)
- **Inter font** for clean typography
- **Color-coded risk levels** (green → amber → orange → red)
- **Responsive layout** (mobile-friendly)
- **Real-time updates** every 1.5 seconds
- **Smooth animations** and transitions

### Components

```
Layout:
  • Sidebar (7 navigation items)
  • TopBar (status + clock + refresh)
  • OfflineBanner (auto-triggered)

Cards:
  • RiskScoreCard (circular gauge)
  • VitalCard (with baseline deviation)
  • EnvironmentCard

Charts:
  • LiveLineChart (with time axis)
  • Vitals