"""
Risk API — PHC ka main data endpoint.

Yeh API frontend ko deti hai:
  - Latest sensor reading
  - Risk assessment
  - Environment data
  - Disaster alerts
  - Baseline info
"""
from fastapi import APIRouter
from app.services.risk_engine import assess_risk
from app.services.baseline_service import create_baseline, update_from_reading
from app.synthetic.generator import generator


router = APIRouter()

# Global baseline (demo ke liye ek user)
_baseline = create_baseline("demo_user")


def current_env():
    """Current environment data — scenario ke hisaab se."""
    s = generator.scenario

    if s == "heatwave":
        e = {
            "temperature": 43.0, "humidity": 78, "aqi": 150, "pm25": 85,
            "uv_index": 10, "weather": "heatwave",
        }
    elif s == "pollution":
        e = {
            "temperature": 30.0, "humidity": 45, "aqi": 320, "pm25": 220,
            "uv_index": 6, "weather": "haze",
        }
    else:
        e = {
            "temperature": 29.0, "humidity": 55, "aqi": 50, "pm25": 22,
            "uv_index": 5, "weather": "clear",
        }

    # Heat index compute karo
    T = e["temperature"] * 9/5 + 32
    R = e["humidity"]
    HI_f = (-42.379 + 2.04901523*T + 10.14333127*R
            - 0.22475541*T*R - 6.83783e-3*T*T
            - 5.481717e-2*R*R + 1.22874e-3*T*T*R
            + 8.5282e-4*T*R*R - 1.99e-6*T*T*R*R)
    e["heat_index"] = round((HI_f - 32) * 5/9, 1)
    e["heatwave"] = s == "heatwave"

    return e


def current_alerts():
    """Disaster alerts — scenario ke hisaab se."""
    s = generator.scenario

    if s == "heatwave":
        return [{
            "alert_type": "heatwave",
            "severity": 4,
            "active": True,
            "started_at": "2026-09-16T10:00:00",
            "description": "IMD heatwave warning — severe conditions",
            "source": "simulated",
            "is_simulated": True,
        }]
    if s == "pollution":
        return [{
            "alert_type": "air_quality",
            "severity": 3,
            "active": True,
            "started_at": "2026-09-16T08:00:00",
            "description": "Severe AQI alert — hazardous air",
            "source": "simulated",
            "is_simulated": True,
        }]
    return []


@router.get("/current")
def current():
    """
    Latest risk assessment — frontend isko har 1.5 sec mein call karega.
    """
    reading = generator.tick()
    update_from_reading(_baseline, reading)
    env = current_env()
    alerts = current_alerts()
    risk = assess_risk(reading, _baseline, env, alerts)

    return {
        "reading": reading,
        "environment": env,
        "alerts": alerts,
        "risk": risk.model_dump(),
        "baseline_maturity": round(_baseline.maturity, 2),
    }


@router.get("/baseline")
def baseline_info():
    """Personal baseline info dikhao."""
    return _baseline.model_dump()