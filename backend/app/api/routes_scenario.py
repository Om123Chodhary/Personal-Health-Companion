"""
Scenario API — demo scenarios switch karne ke liye.
"""
from fastapi import APIRouter
from app.synthetic.generator import generator


router = APIRouter()


SCENARIOS = {
    "normal": {
        "label": "Normal Day",
        "description": "All vitals normal, clean air, pleasant weather",
        "icon": "sun",
        "expected_level": "LOW",
    },
    "heatwave": {
        "label": "Heatwave",
        "description": "Extreme heat + high humidity — heat stress risk",
        "icon": "thermometer",
        "expected_level": "HIGH",
    },
    "pollution": {
        "label": "Pollution Event",
        "description": "Severe air quality — respiratory risk",
        "icon": "wind",
        "expected_level": "HIGH",
    },
    "fall": {
        "label": "Fall Emergency",
        "description": "Sudden fall + no movement — emergency",
        "icon": "alert-triangle",
        "expected_level": "CRITICAL",
    },
    "offline": {
        "label": "Offline Mode",
        "description": "No internet — edge AI continues working",
        "icon": "wifi-off",
        "expected_level": "LOW",
    },
}


@router.get("/list")
def list_scenarios():
    """Saare scenarios ki list."""
    return SCENARIOS


@router.post("/activate/{name}")
def activate(name: str):
    """Scenario switch karo."""
    if name not in SCENARIOS:
        return {"error": f"Unknown scenario: {name}", "available": list(SCENARIOS.keys())}

    generator.set_scenario(name)

    return {
        "active": name,
        "label": SCENARIOS[name]["label"],
        "description": SCENARIOS[name]["description"],
        "expected_level": SCENARIOS[name]["expected_level"],
    }


@router.get("/current")
def current():
    """Kaunsa scenario abhi active hai."""
    return {
        "active": generator.scenario,
        "label": SCENARIOS.get(generator.scenario, {}).get("label", "Unknown"),
    }