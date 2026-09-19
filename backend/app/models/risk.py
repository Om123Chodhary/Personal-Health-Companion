from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional


class RiskFactor(BaseModel):
    """
    Ek individual risk factor.
    
    Example:
        name = "heat_stress"
        score = 85.3
        weight = 0.22
        contribution = 18.77 (85.3 * 0.22)
        reason_codes = ["Body temp +2.4°C above baseline", "High humidity 78%"]
    """
    name: str
    score: float = Field(ge=0, le=100)
    weight: float = Field(ge=0, le=1)
    contribution: float
    reason_codes: List[str] = []


class RiskAssessment(BaseModel):
    """
    Complete risk assessment — ek risk check ka poora result.
    """
    timestamp: datetime
    overall_score: float = Field(ge=0, le=100)
    risk_level: str          # LOW / MODERATE / HIGH / CRITICAL
    confidence: float = Field(ge=0, le=1)
    data_quality: float = Field(ge=0, le=1)
    factors: List[RiskFactor] = []
    top_reasons: List[str] = []
    recommended_actions: List[str] = []
    emergency: bool = False

    class Config:
        json_schema_extra = {
            "example": {
                "timestamp": "2026-09-16T10:30:00",
                "overall_score": 87.3,
                "risk_level": "HIGH",
                "confidence": 0.82,
                "data_quality": 1.0,
                "factors": [],
                "top_reasons": ["HR 44% above baseline", "Heatwave active"],
                "recommended_actions": ["Stop activity", "Drink water"],
                "emergency": False,
            }
        }