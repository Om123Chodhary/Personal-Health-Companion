"""
PHC Risk Engine — The Brain.
"""
from datetime import datetime
from app.models.risk import RiskAssessment, RiskFactor
from app.utils.math_utils import z_score, severity_from_z
from app.utils.math_utils import clamp, percent_change


# ---- RISK FACTOR WEIGHTS ----
# Updated: Fall weight 0.15 → 0.28 (fall is a critical event)
WEIGHTS = {
    "heat_stress": 0.26,
    "respiratory": 0.18,
    "cardiac": 0.11,
    "fall": 0.25,
    "disaster": 0.10,
    "physiological": 0.10,
}


def assess_risk(reading: dict, baseline, env: dict, alerts: list) -> RiskAssessment:
    factors = []

    # ============================================================
    # FACTOR 1: HEAT STRESS
    # ============================================================
    temp_dev = reading["body_temp"] - baseline.body_temp.mean
    hr_dev_z = z_score(reading["heart_rate"], baseline.hr.mean, baseline.hr.std)
    heat_index = env.get("heat_index", env.get("temperature", 30))
    humidity = env.get("humidity", 50)
    activity = reading["activity_level"]

    temp_score = clamp(temp_dev * 200, 0, 100)
    hr_score = severity_from_z(hr_dev_z)
    activity_score = clamp((activity - 40) * 1.5, 0, 100)
    heat_env_score = clamp((heat_index - 32) * 8, 0, 100)
    humidity_score = clamp((humidity - 60) * 2.5, 0, 100)

    heat = (
        0.30 * temp_score +
        0.25 * hr_score +
        0.15 * activity_score +
        0.20 * heat_env_score +
        0.10 * humidity_score
    )

    heat_reasons = []
    if temp_dev > 0.5:
        heat_reasons.append(f"Body temperature {temp_dev:+.1f}°C above personal baseline")
    if hr_dev_z > 2:
        pct = percent_change(reading["heart_rate"], baseline.hr.mean)
        heat_reasons.append(f"Heart rate {pct:+.0f}% above baseline")
    if activity > 60:
        heat_reasons.append(f"High physical activity ({activity:.0f}/100)")
    if humidity > 70:
        heat_reasons.append(f"High humidity ({humidity:.0f}%) impairs cooling")
    if env.get("heatwave"):
        heat_reasons.append("Heatwave condition active in your area")

    factors.append(RiskFactor(
        name="heat_stress",
        score=round(heat, 1),
        weight=WEIGHTS["heat_stress"],
        contribution=round(heat * WEIGHTS["heat_stress"], 2),
        reason_codes=heat_reasons,
    ))

    # ============================================================
    # FACTOR 2: RESPIRATORY
    # ============================================================
    spo2_drop = max(0, baseline.spo2.mean - reading["spo2"])
    aqi = env.get("aqi", 50)
    pm25 = env.get("pm25", 20)

    spo2_score = clamp(spo2_drop * 25, 0, 100)
    aqi_score = clamp((aqi - 50) / 2.5, 0, 100)
    pm_score = clamp((pm25 - 30) / 2.2, 0, 100)

    resp = 0.45 * spo2_score + 0.35 * aqi_score + 0.20 * pm_score

    resp_reasons = []
    if spo2_drop > 1.5:
        resp_reasons.append(f"SpO₂ dropped {spo2_drop:.1f}% below your baseline")
    if aqi > 100:
        resp_reasons.append(f"AQI {aqi} — unhealthy air quality")
    if pm25 > 60:
        resp_reasons.append(f"PM2.5 elevated ({pm25:.0f} µg/m³)")

    factors.append(RiskFactor(
        name="respiratory",
        score=round(resp, 1),
        weight=WEIGHTS["respiratory"],
        contribution=round(resp * WEIGHTS["respiratory"], 2),
        reason_codes=resp_reasons,
    ))

    # ============================================================
    # FACTOR 3: CARDIAC
    # ============================================================
    hr_z_abs = abs(hr_dev_z)
    hr_abs = reading["heart_rate"]

    cardiac = clamp(
        severity_from_z(hr_z_abs) * 0.8 +
        max(0, (hr_abs - 100)) * 0.8,
        0, 100
    )

    card_reasons = []
    if hr_z_abs > 2.5:
        card_reasons.append("Heart rate significantly deviates from your normal range")
    if hr_abs > 110:
        card_reasons.append(f"Tachycardia-range HR ({hr_abs:.0f} bpm)")

    factors.append(RiskFactor(
        name="cardiac",
        score=round(cardiac, 1),
        weight=WEIGHTS["cardiac"],
        contribution=round(cardiac * WEIGHTS["cardiac"], 2),
        reason_codes=card_reasons,
    ))

    # ============================================================
    # FACTOR 4: FALL — STRONGER IMPACT
    # ============================================================
    fall = 0.0
    fall_reasons = []

    if reading.get("fall_detected"):
        fall = 100.0
        fall_reasons.append("Sudden acceleration anomaly — fall detected")
        fall_reasons.append("No movement detected after impact")
    elif reading.get("accel_magnitude", 1.0) > 2.5:
        fall = 60.0
        fall_reasons.append("Abnormal acceleration spike detected")

    factors.append(RiskFactor(
        name="fall",
        score=round(fall, 1),
        weight=WEIGHTS["fall"],
        contribution=round(fall * WEIGHTS["fall"], 2),
        reason_codes=fall_reasons,
    ))

    # ============================================================
    # FACTOR 5: DISASTER CONTEXT
    # ============================================================
    disaster = 0.0
    disaster_reasons = []
    for a in alerts:
        if a.get("active"):
            severity = a.get("severity", 3)
            disaster = max(disaster, severity * 20)
            disaster_reasons.append(
                f"{a['alert_type'].title()} alert (severity {severity}/5)"
            )

    factors.append(RiskFactor(
        name="disaster",
        score=round(disaster, 1),
        weight=WEIGHTS["disaster"],
        contribution=round(disaster * WEIGHTS["disaster"], 2),
        reason_codes=disaster_reasons,
    ))

    # ============================================================
    # FACTOR 6: PHYSIOLOGICAL
    # ============================================================
    z_hr = abs(z_score(reading["heart_rate"], baseline.hr.mean, baseline.hr.std))
    z_spo2 = abs(z_score(reading["spo2"], baseline.spo2.mean, baseline.spo2.std))
    z_temp = abs(z_score(reading["body_temp"], baseline.body_temp.mean, baseline.body_temp.std))
    combined_z = (z_hr + z_spo2 + z_temp) / 3.0

    physio = clamp(severity_from_z(combined_z), 0, 100)
    physio_reasons = []
    if combined_z > 1.5:
        physio_reasons.append(
            "Multiple vitals deviating from personal baseline simultaneously"
        )

    factors.append(RiskFactor(
        name="physiological",
        score=round(physio, 1),
        weight=WEIGHTS["physiological"],
        contribution=round(physio * WEIGHTS["physiological"], 2),
        reason_codes=physio_reasons,
    ))

    # ============================================================
    # FUSION
    # ============================================================
    overall = sum(f.contribution for f in factors)
    overall = clamp(overall, 0, 100)

    # FALL OVERRIDE — critical event
    if reading.get("fall_detected"):
        overall = max(overall, 75.0)

    # Risk level
    if overall < 25:
        level = "LOW"
    elif overall < 50:
        level = "MODERATE"
    elif overall < 75:
        level = "HIGH"
    else:
        level = "CRITICAL"

    # Confidence
    confidence = clamp(
        0.5 * baseline.maturity +
        0.3 * reading.get("data_quality", 1.0) +
        0.2 * 0.8,
        0.3, 0.99
    )

    # Top reasons
    all_reasons = []
    for f in sorted(factors, key=lambda x: -x.contribution):
        all_reasons.extend(f.reason_codes)
    top_reasons = all_reasons[:5]

    return RiskAssessment(
        timestamp=datetime.utcnow(),
        overall_score=round(overall, 1),
        risk_level=level,
        confidence=round(confidence, 2),
        data_quality=reading.get("data_quality", 1.0),
        factors=factors,
        top_reasons=top_reasons,
        recommended_actions=recommend_actions(level, top_reasons),
        emergency=(level == "CRITICAL" or reading.get("fall_detected", False)),
    )


def recommend_actions(level: str, reasons: list) -> list:
    actions = []
    text = " ".join(reasons).lower()

    if "heat" in text or "temperature" in text or "humidity" in text:
        actions += [
            "Stop strenuous activity",
            "Drink water now (250–500 ml)",
            "Move to a cooler, shaded or air-conditioned location",
        ]
    if "spo2" in text or "aqi" in text or "pm2.5" in text:
        actions += [
            "Reduce outdoor exposure",
            "Use N95 mask if outdoors",
            "Move indoors with air purification if available",
        ]
    if "heart rate" in text or "tachycardia" in text:
        actions += ["Sit down and rest", "Practice slow breathing"]
    if "fall" in text or "movement" in text:
        actions = [
            "Stay still — do not attempt to stand immediately",
            "Emergency contact will be notified",
            "Call for help if conscious",
        ]

    if level in ("HIGH", "CRITICAL"):
        actions.append("Recheck in 15 minutes")
    if level == "CRITICAL":
        actions.append("Contact caregiver immediately")

    if not actions:
        actions = ["Continue normal activity", "Stay hydrated"]

    return list(dict.fromkeys(actions))[:6]