from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class VitalBaseline(BaseModel):
    """Ek vital sign ka baseline (jaise HR ka)."""
    mean: float
    std: float
    p10: float
    p90: float
    sample_count: int
    last_updated: datetime


class PersonalBaseline(BaseModel):
    """Poora personal baseline — saare vitals ka."""
    user_id: str
    hr: VitalBaseline
    spo2: VitalBaseline
    body_temp: VitalBaseline
    activity: VitalBaseline
    hrv: Optional[VitalBaseline] = None
    maturity: float = 0.0
    time_of_day_adjustments: dict = {}