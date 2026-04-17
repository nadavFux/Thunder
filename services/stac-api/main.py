import starlette.status
if not hasattr(starlette.status, "HTTP_422_UNPROCESSABLE_CONTENT"):
    starlette.status.HTTP_422_UNPROCESSABLE_CONTENT = 422

from stac_fastapi.api.app import StacApi
from stac_fastapi.pgstac.config import Settings
from stac_fastapi.pgstac.core import CoreCrudClient
from stac_fastapi.pgstac.db import connect_to_db
from stac_fastapi.pgstac.extensions import QueryExtension
from stac_fastapi.extensions.core import (
    FieldsExtension,
    FilterExtension,
    SortExtension,
    TokenPaginationExtension,
)
from fastapi import FastAPI

settings = Settings()

extensions = [
    QueryExtension(),
    SortExtension(),
    FieldsExtension(),
    TokenPaginationExtension(),
    FilterExtension(),
]

api = StacApi(
    settings=settings,
    extensions=extensions,
    client=CoreCrudClient(),
)

app = api.app

@app.on_event("startup")
async def startup_event():
    await connect_to_db(app)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "stac-api"}
