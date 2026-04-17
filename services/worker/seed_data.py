import os
import requests
from pystac_client import Client
from pypgstac.db import PgstacDB
from pypgstac.load import Loader, Methods
from ingestion import sync_sentinel_data

def seed():
    # 1. Sync Sentinel-2 data for Berlin
    # BBOX for Berlin
    berlin_bbox = [13.08, 52.33, 13.76, 52.67]
    print("Seeding Sentinel-2 data for Berlin...")
    count = sync_sentinel_data(berlin_bbox, limit=5)
    print(f"Ingested {count} Sentinel-2 items.")

    # 2. Add a high-resolution Orthophoto (Mock or Real COG if available)
    # For now, we'll search for a NAIP item if we can, or just use another S2 item as 'Orthophoto'
    # Actually, let's try to add a specific high-res COG as a custom collection 'orthophoto'
    
    # Example COG (This is just a placeholder, in a real scenario you'd have a COG URL)
    # We will create a dummy STAC item for a "Digital Orthophoto" pointing to a public COG
    
    db = PgstacDB()
    loader = Loader(db)
    
    ortho_collection = {
        "id": "orthophoto",
        "type": "Collection",
        "stac_extensions": [],
        "description": "High-resolution Digital Orthophoto Quads",
        "license": "proprietary",
        "extent": {
            "spatial": {"bbox": [[-180, -90, 180, 90]]},
            "temporal": {"interval": [["2020-01-01T00:00:00Z", None]]}
        },
        "links": []
    }
    
    try:
        loader.load_collections([ortho_collection], Methods.upsert)
        print("Created 'orthophoto' collection.")
    except Exception as e:
        print(f"Error creating collection: {e}")

if __name__ == "__main__":
    seed()
