"""
Yeh file alag-alag user profiles rakhti hai.
Har profile ka apna "normal" hota hai.
"""

PROFILES = {
    "elderly_rural": {
        "name": "Elderly Rural User",
        "description": "65+ age, rural area, lower activity",
        "hr_mean": 74, "hr_std": 6,
        "spo2_mean": 96, "spo2_std": 1.2,
        "temp_mean": 36.6, "temp_std": 0.2,
        "activity_mean": 20, "activity_std": 10,
        "hrv_mean": 35, "hrv_std": 8,
        "sensitivity": {"heat": 1.4, "respiratory": 1.3, "fall": 1.5},
    },
    "outdoor_worker": {
        "name": "Outdoor Worker",
        "description": "Construction/farmer, high sun exposure",
        "hr_mean": 78, "hr_std": 8,
        "spo2_mean": 97, "spo2_std": 1.0,
        "temp_mean": 36.7, "temp_std": 0.25,
        "activity_mean": 55, "activity_std": 20,
        "hrv_mean": 42, "hrv_std": 10,
        "sensitivity": {"heat": 1.6, "respiratory": 1.2, "fall": 1.0},
    },
    "urban_adult": {
        "name": "Urban Adult",
        "description": "25-45 age, office worker",
        "hr_mean": 72, "hr_std": 5,
        "spo2_mean": 98, "spo2_std": 0.8,
        "temp_mean": 36.7, "temp_std": 0.15,
        "activity_mean": 35, "activity_std": 15,
        "hrv_mean": 50, "hrv_std": 12,
        "sensitivity": {"heat": 1.0, "respiratory": 1.1, "fall": 1.0},
    },
}