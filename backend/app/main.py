"""
PHC — Personal Health Companion
FastAPI Backend
"""
import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.websocket.manager import manager
from app.websocket import stream
from app.api import (
    routes_health, routes_risk, routes_environment,
    routes_scenario, routes_emergency, routes_privacy,
)
from app.services.risk_engine import assess_risk
from app.services.baseline_service import update_from_reading
from app.synthetic.generator import generator
from app.api.routes_risk import _baseline, current_env, current_alerts


# ---- Background sensor loop ----
async def sensor_loop():
    """Har 1.5 second pe naya reading generate karo aur sabko bhejo."""
    while True:
        try:
            reading = generator.tick()
            update_from_reading(_baseline, reading)
            env = current_env()
            alerts = current_alerts()
            risk = assess_risk(reading, _baseline, env, alerts)

            await manager.broadcast({
                "type": "tick",
                "reading": reading,
                "environment": env,
                "alerts": alerts,
                "risk": risk.model_dump(),
                "baseline_maturity": round(_baseline.maturity, 2),
            })
        except Exception as e:
            print(f"[sensor_loop] Error: {e}")
        await asyncio.sleep(1.5)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup aur shutdown events."""
    # Startup
    print("[PHC] Initializing database...")
    init_db()

    print("[PHC] Starting sensor loop...")
    task = asyncio.create_task(sensor_loop())

    yield

    # Shutdown
    print("[PHC] Shutting down...")
    task.cancel()


# ---- App ----
app = FastAPI(
    title="PHC — Personal Health Companion",
    version="0.1.0",
    description="Offline-first, privacy-preserving, edge-AI health risk detection",
    lifespan=lifespan,
)

# CORS (frontend ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Routes ----
app.include_router(routes_health.router, tags=["health"])
app.include_router(routes_risk.router, prefix="/api/risk", tags=["risk"])
app.include_router(routes_environment.router, prefix="/api/environment", tags=["environment"])
app.include_router(routes_scenario.router, prefix="/api/scenario", tags=["scenario"])
app.include_router(routes_emergency.router, prefix="/api/emergency", tags=["emergency"])
app.include_router(routes_privacy.router, prefix="/api/privacy", tags=["privacy"])
app.include_router(stream.router, tags=["websocket"])