import os
from pystac_client import Client
from pypgstac.db import PgstacDB
from pypgstac.load import Loader, Methods
import json

EARTH_SEARCH_URL = "https://earth-search.aws.element84.com/v1"

def sync_sentinel_data(bbox, collections=["sentinel-2-l2a"], limit=100):
    """
    Search Earth Search for Sentinel-2 items in a BBOX and ingest into local PgSTAC.
    """
    print(f"Searching Earth Search for {collections} in {bbox}...")
    client = Client.open(EARTH_SEARCH_URL)
    
    search = client.search(
        collections=collections,
        bbox=bbox,
        max_items=limit
    )
    
    items = list(search.items())
    print(f"Found {len(items)} items.")
    
    if not items:
        return 0

    # Format items for pypgstac
    items_json = [item.to_dict() for item in items]
    
    # Ingest into local PgSTAC
    db_url = os.getenv("DATABASE_URL") # This should be the stac-db URL
    # Wait, the worker needs to talk to stac-db. 
    # In docker-compose, I set PGHOST=stac-db for the worker.
    
    db = PgstacDB() # Uses standard PG* env vars
    loader = Loader(db)
    
    # Load collection first (optional, Earth Search collections might need to be created locally)
    # For simplicity, we'll just try to load items. Pypgstac can create collections if needed?
    # Actually, it's better to load the collection object too.
    
    try:
        collection_obj = client.get_collection(collections[0]).to_dict()
        loader.load_collections([collection_obj], Methods.upsert)
        print(f"Loaded collection {collections[0]}")
    except Exception as e:
        print(f"Warning: Could not load collection: {e}")

    loader.load_items(items_json, Methods.upsert)
    print(f"Successfully ingested {len(items_json)} items.")
    
    return len(items_json)
