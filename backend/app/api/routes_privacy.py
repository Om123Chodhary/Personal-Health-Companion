"""
Privacy API — transparency ke liye.
"""
from fastapi import APIRouter


router = APIRouter()


@router.get("/status")
def status():
    return {
        "processing_location": "on_device",
        "encryption_at_rest": "AES-256-GCM (production)",
        "encryption_in_transit": "TLS 1.3",
        "cloud_sync": "optional, opt-in",
        "data_shared_with_third_parties": False,
        "consent_required": True,
        "pii_minimization": True,
        "audit_logging": True,
        "offline_capable": True,
        "note": "Prototype mein SQLite local storage. Production mein encrypted storage.",
    }