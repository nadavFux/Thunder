# Thunder Infrastructure Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the foundational multi-modular microservice architecture using Docker Compose, including PostgreSQL (App DB), PgSTAC, Redis, and skeleton FastAPI services.

**Architecture:** A containerized microservice environment where each service (App API, STAC API, Tiler API, Worker) is isolated and communicates via a shared network.

**Tech Stack:** Docker, Docker Compose, Python, FastAPI, PostgreSQL, PgSTAC, Redis.

---

### Task 1: Project Structure & Environment

**Files:**
- Create: `docker-compose.yml`
- Create: `.env.example`
- Create: `services/app-api/requirements.txt`
- Create: `services/stac-api/requirements.txt`
- Create: `services/tiler-api/requirements.txt`
- Create: `services/worker/requirements.txt`

- [ ] **Step 1: Define Docker Compose orchestration**
  Create a `docker-compose.yml` with the following services:
  - `app-db`: postgres:15
  - `stac-db`: ghcr.io/stac-utils/pgstac:latest
  - `redis`: redis:7-alpine
  - `app-api`, `stac-api`, `tiler-api`, `worker`: built from `./services/<name>`

- [ ] **Step 2: Create .env.example**
  Include database credentials, Redis URL, and service ports.

- [ ] **Step 3: Create requirements.txt for all services**
  All services need `fastapi`, `uvicorn`. `app-api` needs `sqlalchemy`, `psycopg2-binary`. `stac-api` needs `stac-fastapi.pgstac`. `tiler-api` needs `titiler.pgstac`.

### Task 2: Service Skeletons & Dockerization

**Files:**
- Create: `services/app-api/main.py`
- Create: `services/app-api/Dockerfile`
- Create: `services/stac-api/main.py` (and similar for others)
- Create: `services/stac-api/Dockerfile` (and similar for others)

- [ ] **Step 1: Write FastAPI skeletons**
  Implement a simple `/health` endpoint in each service.

- [ ] **Step 2: Create Dockerfiles**
  Use `python:3.11-slim` as the base image.

- [ ] **Step 3: Verify build**
  Run `docker compose up --build -d` and verify all containers are running.
