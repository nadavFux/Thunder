# Thunder Phase 3: Geospatial Engines & Ingestion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully configure STAC and Tiler APIs and implement the ingestion worker to sync Sentinel-2 data from Earth Search.

**Architecture:**
- `stac-api` (stac-fastapi) connected to `stac-db`.
- `tiler-api` (titiler-pgstac) connected to `stac-db`.
- `worker` (Celery) fetches STAC items from Earth Search API and ingests them into `stac-db` via `pypgstac`.

**Tech Stack:** stac-fastapi, titiler.pgstac, pypgstac, pystac-client, Celery.

---

### Task 1: Configure STAC API & Tiler API

**Files:**
- Modify: `services/stac-api/main.py`
- Modify: `services/tiler-api/main.py`

- [ ] **Step 1: Implement stac-fastapi.pgstac in stac-api**
  Update `services/stac-api/main.py` to use the PgSTAC backend.

- [ ] **Step 2: Implement titiler.pgstac in tiler-api**
  Update `services/tiler-api/main.py` to use the PgSTAC backend and enable caching.

- [ ] **Step 3: Commit Task 1**
  ```bash
  git add services/stac-api/main.py services/tiler-api/main.py
  git commit -m "feat: configure STAC and Tiler APIs with PgSTAC backend"
  ```

### Task 2: Build Ingestion Worker

**Files:**
- Modify: `services/worker/main.py`
- Create: `services/worker/ingestion.py`

- [ ] **Step 1: Implement Sentinel-2 sync logic using pystac-client**
  In `services/worker/ingestion.py`, write a function to search Earth Search and format items for PgSTAC.

- [ ] **Step 2: Implement PgSTAC ingestion using pypgstac**
  Add logic to ingest formatted items into the local `stac-db`.

- [ ] **Step 3: Add Celery task for ingestion**
  Update `services/worker/main.py` to expose the ingestion task.

- [ ] **Step 4: Commit Task 2**
  ```bash
  git add services/worker/main.py services/worker/ingestion.py
  git commit -m "feat: implement Sentinel-2 ingestion worker"
  ```

### Task 3: Ingestion Verification

- [ ] **Step 1: Trigger a test ingestion for a small AOI**
  Use `docker exec` or a temporary script to trigger the Celery task.

- [ ] **Step 2: Verify items in stac-api**
  Query `http://localhost:8081/collections` and `http://localhost:8081/search` to ensure data is present.

- [ ] **Step 3: Verify tiling in tiler-api**
  Test a tile endpoint (e.g., `/pgstac/tiles/...`) to see if it renders imagery.
