import starlette.status
if not hasattr(starlette.status, "HTTP_422_UNPROCESSABLE_CONTENT"):
    starlette.status.HTTP_422_UNPROCESSABLE_CONTENT = 422

from fastapi import FastAPI
from titiler.pgstac.main import app as tiler_app

app = tiler_app

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "tiler-api"}
