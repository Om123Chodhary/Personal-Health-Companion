"""
Emergency API — SOS button, fall detection triggers.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import uuid


router = APIRouter()


class SOSRequest(BaseModel):
    lat: float | None = None
    lon: float | None = None
    reason: str = "manual"


@router.post("/sos")
def sos(req: SOSRequest):
    """
    Manual SOS trigger.
    
    NOTE: Prototype mein notification SIMULATED hai.
    Real version: SMS + call + push notification.
    """
    event_id = str(uuid.uuid4())[:8]
    return {
        "event": {
            "event_id": event_id,
            "type": "manual_sos",
            "timestamp": datetime.utcnow().isoformat(),
            "confidence": 1.0,
            "location": {"lat": req.lat, "lon": req.lon} if req.lat else None,
            "reason": req.reason,
        },
        "contacts_notified": ["caregiver_1", "caregiver_2", "emergency_108"],
        "status": "notified",
        "note": "SIMULATED notification — real SMS/call not sent in prototype.",
    }