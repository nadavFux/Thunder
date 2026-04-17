# Thunder Project - Architecture & Design Specification (Balanced Performance)

## 1. Project Context & Objectives
Thunder is an enterprise-grade "Analyst Workstation" designed for expert Aerial Photograph Interpreters. It provides a Geospatial Workbench for scanning, analyzing, and processing raw satellite imagery (Sentinel-2 16-bit COGs) while maintaining high performance on standard hardware (CPU-based graphics).

### 1.1 Balanced Workbench Capabilities
Thunder uses a hybrid rendering approach to ensure responsiveness and precision:
- **Hybrid Rendering Engine:**
  - **Discovery Mode:** Request standard 8-bit WebP tiles for fast global browsing.
  - **Expert Analysis Mode:** Request **Lossless WebP** for exact pixel recovery. This enables real-time client-side processing of raw 16-bit data via **WebGL 2.0**.
- **Automated Stereoscopic 3D:** Automatic identification and computational alignment of STAC Item pairs. Supports Side-by-Side and Anaglyph modes natively.
- **Expert Multi-Pane UI:** A professional tiled interface (using `react-mosaic`) for managing multiple synchronized analysis views.
- **Keyboard-Driven Workflow:** Full hotkey registry for rapid navigation and tool control.
- **Structured CV Review:** sequential verification queue for approving AI-generated suggestions.
- **Persistent View Presets:** Storage of all analysis parameters (band math, histogram settings) in the App DB.

## 2. Core Architecture

### 2.1 Backend Services
- **`stac-api`:** `stac-fastapi` + PgSTAC. Search and discovery index.
- **`tiler-api`:** `TiTiler-PgSTAC`. Optimized for serving both visual tiles and raw data chunks (supporting `lossless=true` parameter).
- **`app-api`:** FastAPI + PostgreSQL. Manages workstation state, missions, and view presets.
- **`worker`:** Celery/Redis. Ingestion, 3D pairing logic, and background pre-warming.

### 2.2 Frontend Stack (The "Workstation")
- **Layout:** `react-mosaic` for tiled pane management.
- **Rendering:** **Deck.gl + WebGL 2.0**. Uses specialized layers for localized 16-bit pixel math and DRA.
- **Basemap:** MapLibre GL JS for standard reference layers.
- **State:** Zustand/immer for synchronized workspace management.

## 3. Implementation Phases

### Phase 1: Core Infrastructure (Complete)
- Docker Compose, Networking, Skeletons.

### Phase 2: Database & Auth (Complete)
- Models, Migrations, JWT.

### Phase 3: Geospatial & Ingestion (Complete)
- STAC Indexing, Sentinel-2 Worker.

### Phase 4: Expert Workbench Foundations
- Scaffold multi-pane React workbench.
- Implement hybrid tiling (Standard WebP -> Lossless WebP).
- Keyboard registry and central command system.

### Phase 5: 3D & Advanced Analysis
- 3D geometric pairing in worker.
- WebGL-based stereoscopic modes.
- Persistent view preset application.
