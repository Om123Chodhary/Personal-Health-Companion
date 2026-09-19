"""
Personal Baseline Service.

Yeh service har user ke liye "normal range" maintain karti hai.
Real-world: har insaan ka normal alag hota hai.
  - 25 saal ka fit ladka: normal HR = 65
  - 70 saal ki dadi: normal HR = 78
  - Marathon runner: normal HR = 50

Generic thresholds (jaise "HR > 100 = risky") galat hain.
PHC personal baseline use karta hai.
"""
from datetime import datetime
from app.models.baseline import PersonalBaseline, VitalBaseline


def create_baseline(user_id: str) -> PersonalBaseline:
    """Naya baseline banao default values ke saath."""
    def v(mean, std):
        return VitalBaseline(
            mean=mean,
            std=std,
            p10=mean - std,
            p90=mean + std,
            sample_count=0,
            last_updated=datetime.utcnow(),
        )

    return PersonalBaseline(
        user_id=user_id,
        hr=v(72, 5),
        spo2=v(98, 0.8),
        body_temp=v(36.7, 0.15),
        activity=v(35, 15),
        hrv=v(50, 12),
        maturity=0.0,
        time_of_day_adjustments={},
    )


def update_from_reading(baseline: PersonalBaseline, reading: dict, alpha: float = 0.005):
    """
    Ek naye reading se baseline ko thoda-thoda update karo.
    
    alpha = 0.005 matlab: har naya reading baseline ko sirf 0.5% badalta hai.
    Isse baseline bahut slowly adapt hota hai — sudden changes se disturb nahi hota.
    
    Welford's online algorithm ka simple version.
    """
    def update_vital(v: VitalBaseline, x: float):
        if x is None:
            return
        delta = x - v.mean
        v.mean += alpha * delta
        # Update std (running)
        v.std = max(0.1, (1 - alpha) * v.std ** 2 + alpha * delta ** 2) ** 0.5
        v.sample_count += 1
        v.last_updated = datetime.utcnow()
        v.p10 = v.mean - v.std
        v.p90 = v.mean + v.std

    update_vital(baseline.hr, reading.get("heart_rate"))
    update_vital(baseline.spo2, reading.get("spo2"))
    update_vital(baseline.body_temp, reading.get("body_temp"))
    update_vital(baseline.activity, reading.get("activity_level"))
    if reading.get("hrv"):
        update_vital(baseline.hrv, reading["hrv"])

    # Maturity: 300 readings ke baad 100% mature
    baseline.maturity = min(1.0, baseline.hr.sample_count / 300.0)