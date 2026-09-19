"""
WebSocket endpoint — /ws/live
Frontend isse connect karega for live updates.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.manager import manager


router = APIRouter()


@router.websocket("/ws/live")
async def websocket_endpoint(ws: WebSocket):
    await manager.connect(ws)
    try:
        while True:
            # Client se message ka intezaar (keepalive)
            await ws.receive_text()
    except WebSocketDisconnect:
        await manager.disconnect(ws)
    except Exception as e:
        print(f"[WS] Error: {e}")
        await manager.disconnect(ws)