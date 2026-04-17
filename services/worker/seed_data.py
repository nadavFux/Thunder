import os
import requests
from pystac_client import Client
from pypgstac.db import PgstacDB
from pypgstac.load import Loader, Methods
from ingestion import sync_sentinel_data

def seed():
    # 1. Sync Sentinel-2 data for Berlin
    berlin_bbox = [13.08, 52.33, 13.76, 52.67]
    print("Seeding Sentinel-2 data for Berlin...")
    sync_sentinel_data(berlin_bbox, limit=5)

    # 2. Sync NAIP (Orthophoto) data for a sample US area (San Francisco)
    # Earth Search has NAIP, or we can use Planetary Computer.
    # We'll use Earth Search to keep it consistent if possible.
    sf_bbox = [-122.51, 37.70, -122.35, 37.83]
    print("Seeding NAIP (Orthophoto) data for San Francisco...")
    try:
        sync_sentinel_data(sf_bbox, collections=["naip"], limit=5)
    except Exception as e:
        print(f"Warning: Could not seed NAIP: {e}")

if __name__ == "__main__":
    seed()
