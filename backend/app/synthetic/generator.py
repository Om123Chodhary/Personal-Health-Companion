"""
Synthetic Sensor Data Generator.

Yeh file realistic-looking sensor data banati hai.
Demo ke liye — asli wearable nahi hai.
Har tick pe naya data milta hai.
"""
import random
from datetime import datetime
from app.synthetic.profiles import PROFILES


class SyntheticGenerator:
    def __init__(self, profile_name="urban_adult"):
        self.p = PROFILES[profile_name]
        self.t = 0
        self.state = {
            "hr": self.p["hr_mean"],
            "spo2": self.p["spo2_mean"],
            "temp": self.p["temp_mean"],
            "activity": self.p["activity_mean"],
            "hrv": self.p["hrv_mean"],
        }
        self.scenario = "normal"
        self.fall_triggered = False
        self.fall_counter = 0

    def set_scenario(self, name: str):
        """Scenario change karo: normal, heatwave, pollution, fall, offline"""
        self.scenario = name
        if name != "fall":
            self.fall_triggered = False
            self.fall_counter = 0
        # ⭐ Fall scenario activate karte hi TURANT trigger karo
        if name == "fall":
            self.fall_triggered = True   # ← Turant TRUE
            self.fall_counter = 0
            self.state["activity"] = 0    # Activity turant 0
            print(f"[GENERATOR] 🚨 FALL TRIGGERED IMMEDIATELY")

    def tick(self) -> dict:
        """Ek naya reading banao."""
        self.t += 1
        p = self.p
        s = self.state

        # --- Base random walk (natural variation) ---
        s["hr"] += random.gauss(0, p["hr_std"] * 0.15)
        s["spo2"] += random.gauss(0, p["spo2_std"] * 0.1)
        s["temp"] += random.gauss(0, p["temp_std"] * 0.08)
        s["activity"] += random.gauss(0, p["activity_std"] * 0.2)
        s["hrv"] += random.gauss(0, p["hrv_std"] * 0.1)

        # --- Mean reversion (baseline ki taraf wapas) ---
        for k, key in [("hr", "hr_mean"), ("spo2", "spo2_mean"),
                       ("temp", "temp_mean"), ("activity", "activity_mean"),
                       ("hrv", "hrv_mean")]:
            s[k] += 0.05 * (p[key] - s[k])

        # --- Scenario perturbations ---
        if self.scenario == "heatwave":
            s["hr"] += 0.8
            s["temp"] += 0.06
            s["activity"] += 0.5
            s["spo2"] -= 0.05
        elif self.scenario == "pollution":
            s["spo2"] -= 0.08
            s["hr"] += 0.3
        elif self.scenario == "fall":
            # ⭐ FALL — already triggered in set_scenario
            if self.fall_triggered:
                self.fall_counter += 1
                s["activity"] = 0  # Activity stays 0 during fall

        # --- Clamp (realistic bounds) ---
        s["hr"] = max(40, min(180, s["hr"]))
        s["spo2"] = max(85, min(100, s["spo2"]))
        s["temp"] = max(35.5, min(41, s["temp"]))
        s["activity"] = max(0, min(100, s["activity"]))
        s["hrv"] = max(10, min(120, s["hrv"]))

        # --- Fall detection ---
        # Fall flag true rehta hai for 15 ticks (22.5 sec) after trigger
        fall_now = (
            self.scenario == "fall"
            and self.fall_triggered
            and self.fall_counter < 90
        )
        accel = 3.5 if fall_now else 1.0 + abs(random.gauss(0, 0.15))

        return {
            "timestamp": datetime.utcnow().isoformat(),
            "heart_rate": round(s["hr"], 1),
            "spo2": round(s["spo2"], 1),
            "body_temp": round(s["temp"], 2),
            "activity_level": round(s["activity"], 1),
            "hrv": round(s["hrv"], 1),
            "eda": round(random.uniform(2, 8), 2),
            "accel_magnitude": round(accel, 2),
            "fall_detected": fall_now,
            "data_quality": 1.0,
        }


# Global generator instance
generator = SyntheticGenerator()