import sqlite3
from pathlib import Path
from contextlib import contextmanager

# Database file ka path
DB_PATH = Path(__file__).parent.parent / "data" / "phc.db"
DB_PATH.parent.mkdir(exist_ok=True)


def init_db():
    """Database tables banao agar nahi hain toh."""
    with sqlite3.connect(DB_PATH) as conn:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS sensor_readings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            heart_rate REAL,
            spo2 REAL,
            body_temp REAL,
            activity_level REAL,
            hrv REAL,
            eda REAL,
            accel_magnitude REAL,
            fall_detected INTEGER DEFAULT 0,
            data_quality REAL DEFAULT 1.0
        );

        CREATE TABLE IF NOT EXISTS risk_assessments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            overall_score REAL,
            risk_level TEXT,
            confidence REAL,
            data_quality REAL,
            factors_json TEXT,
            reasons_json TEXT,
            actions_json TEXT
        );

        CREATE TABLE IF NOT EXISTS emergency_events (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            event_type TEXT,
            confidence REAL,
            data_json TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            event_type TEXT,
            details TEXT
        );

        CREATE INDEX IF NOT EXISTS idx_sensor_ts ON sensor_readings(timestamp);
        CREATE INDEX IF NOT EXISTS idx_risk_ts ON risk_assessments(timestamp);
        """)


@contextmanager
def get_db():
    """Database connection nikalne ke liye."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def save_sensor_reading(reading: dict):
    """Ek sensor reading database mein save karo."""
    with get_db() as db:
        db.execute("""
            INSERT INTO sensor_readings
            (timestamp, heart_rate, spo2, body_temp, activity_level,
             hrv, eda, accel_magnitude, fall_detected, data_quality)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            reading.get("timestamp"),
            reading.get("heart_rate"),
            reading.get("spo2"),
            reading.get("body_temp"),
            reading.get("activity_level"),
            reading.get("hrv"),
            reading.get("eda"),
            reading.get("accel_magnitude"),
            1 if reading.get("fall_detected") else 0,
            reading.get("data_quality", 1.0),
        ))


def save_risk_assessment(risk: dict):
    """Ek risk assessment database mein save karo."""
    import json
    with get_db() as db:
        db.execute("""
            INSERT INTO risk_assessments
            (timestamp, overall_score, risk_level, confidence, data_quality,
             factors_json, reasons_json, actions_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            risk.get("timestamp"),
            risk.get("overall_score"),
            risk.get("risk_level"),
            risk.get("confidence"),
            risk.get("data_quality"),
            json.dumps(risk.get("factors", [])),
            json.dumps(risk.get("top_reasons", [])),
            json.dumps(risk.get("recommended_actions", [])),
        ))


def get_recent_readings(limit: int = 50):
    """Last N sensor readings nikalo."""
    with get_db() as db:
        rows = db.execute("""
            SELECT * FROM sensor_readings
            ORDER BY id DESC LIMIT ?
        """, (limit,)).fetchall()
        return [dict(r) for r in rows]