"""
Health check API — server zinda hai ya nahi.
"""
from fastapi import APIRouter


router = APIRouter()


@router.get("/health")
def health():
    return {
        "status": "ok",
        "service": "PHC — Personal Health Companion",
        "version": "0.1.0",
        "edge_ai": "ACTIVE",
        "offline_capable": True,
    }