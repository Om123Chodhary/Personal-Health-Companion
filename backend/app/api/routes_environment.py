"""
Environment API — bahar ka mausam, AQI, alerts.
"""
from fastapi import APIRouter
from app.api.routes_risk import current_env, current_alerts


router = APIRouter()


@router.get("/current")
def current():
    """
    Current environment data.
    
    NOTE: Demo mein simulated hai. Real adapters bhi ready hain
    (OpenWeather, CPCB, NDMA) par prototype mein disabled hain.
    """
    env = current_env()
    alerts = current_alerts()

    return {
        "environment": env,
        "alerts": alerts,
        "source": "simulated",
        "note": "Demo data. Real adapters interface-ready but disabled in prototype.",
        "is_simulated": True,
    }