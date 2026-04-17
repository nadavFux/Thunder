# Thunder Phase 4: Frontend Foundations & Map Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a React + Vite + TypeScript application and integrate MapLibre GL JS to display raster tiles from our `tiler-api`.

**Architecture:** 
- A modern React SPA served via Vite.
- MapLibre GL JS handles the primary map view.
- A custom React component wraps the map engine and manages layers.
- Tailwind CSS provides enterprise-grade layout and styling.

**Tech Stack:** React, TypeScript, Vite, MapLibre GL JS, Tailwind CSS, Lucide React (icons).

---

### Task 1: Frontend Scaffolding & Setup

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/index.html`
- Create: `frontend/src/main.tsx`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/index.css`
- Create: `frontend/tailwind.config.js`
- Create: `frontend/postcss.config.js`

- [ ] **Step 1: Create package.json with necessary dependencies**
Include `maplibre-gl`, `react`, `react-dom`, `lucide-react`, and devDependencies for `vite`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`.

- [ ] **Step 2: Initialize Tailwind CSS configuration**

- [ ] **Step 3: Create the basic Vite and index.html structure**

- [ ] **Step 4: Verify the dev environment**
Run `npm install` and `npm run dev` (locally or via Docker). Note: For the agent, we will focus on file creation.

### Task 2: Core Map Component

**Files:**
- Create: `frontend/src/components/Map.tsx`

- [ ] **Step 1: Implement basic MapLibre GL JS container**
Initialize the map with a standard basemap (e.g., OpenStreetMap or a Carto dark matter layer).

- [ ] **Step 2: Connect Map component to App.tsx**

### Task 3: Raster Layer Integration (TiTiler)

**Files:**
- Modify: `frontend/src/components/Map.tsx`

- [ ] **Step 1: Add logic to fetch and display a raster layer from `tiler-api`**
Hardcode a test STAC item ID initially to verify the TileJSON -> MapLibre integration.
Url pattern: `http://localhost:8082/collections/sentinel-2-l2a/items/{itemId}/WebMercatorQuad/tilejson.json?assets=visual`

### Task 4: Mission Layout & Sidebar

**Files:**
- Create: `frontend/src/components/Sidebar.tsx`
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Build a simple sidebar for Mission selection**
- [ ] **Step 2: Implement basic responsive layout using Tailwind**

### Task 5: Dockerization (Optional but Recommended)

**Files:**
- Create: `frontend/Dockerfile`
- Modify: `docker-compose.yml`

- [ ] **Step 1: Create Dockerfile for frontend**
- [ ] **Step 2: Add frontend service to docker-compose.yml**
