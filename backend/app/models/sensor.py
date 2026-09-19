from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class SensorReading(BaseModel):
    """Ek single sensor reading ka data structure."""
    timestamp: str
    heart_rate: Optional[float] = Field(None, description="Beats per minute")
    spo2: Optional[float] = Field(None, description="Oxygen %")
    body_temp: Optional[float] = Field(None, description="Celsius")
    activity_level: Optional[float] = Field(None, description="0=rest, 100=max")
    hrv: Optional[float] = Field(None, description="Heart rate variability (ms)")
    eda: Optional[float] = Field(None, description="Skin conductance")
    accel_magnitude: Optional[float] = Field(None, description="Acceleration (g)")
    fall_detected: bool = False
    data_quality: float = Field(1.0, ge=0, le=1)

    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "2026-09-16T10:30:00",
                "heart_rate": 72.0,
                "spo2": 98.0,
                "body_temp": 36.7,
                "activity_level": 35.0,
                "hrv": 50.0,
                "eda": 5.2,
                "accel_magnitude": 1.02,
                "fall_detected": False,
                "data_quality": 1.0,
            }
        }