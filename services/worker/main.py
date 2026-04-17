from celery import Celery
import os
from ingestion import sync_sentinel_data

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://redis:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://redis:6379/0")

celery_app = Celery("thunder_worker", broker=CELERY_BROKER_URL, backend=CELERY_RESULT_BACKEND)

@celery_app.task(name="health_check")
def health_check():
    return {"status": "ok", "service": "worker"}

@celery_app.task(name="sync_stac_data")
def sync_stac_data(bbox, collections=["sentinel-2-l2a"], limit=100):
    return sync_sentinel_data(bbox, collections, limit)
