# Thunder Phase 2: Database Schemas & Authentication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Initialize the PgSTAC catalog, set up the application database with Alembic migrations, and implement JWT-based authentication.

**Architecture:** 
- `stac-db` (PgSTAC) handles the geospatial catalog.
- `app-db` (Postgres) handles application state (Users, Projects, Missions).
- FastAPI `app-api` implements authentication and business logic using SQLModel/SQLAlchemy.

**Tech Stack:** PgSTAC, SQLModel, Alembic, PyJWT, passlib.

---

### Task 1: PgSTAC Catalog Initialization

**Files:**
- Modify: `services/worker/main.py` (add ingestion task skeleton)
- Create: `services/stac-api/init_db.py`

- [ ] **Step 1: Create a script to verify PgSTAC is ready**
  Create `services/stac-api/init_db.py` to check for PgSTAC version and ensure the `pgstac` schema exists.

- [ ] **Step 2: Commit Task 1**
  ```bash
  git add services/stac-api/init_db.py
  git commit -m "feat: add pgstac initialization check"
  ```

### Task 2: App DB Models & Alembic Setup

**Files:**
- Create: `services/app-api/database.py`
- Create: `services/app-api/models.py`
- Create: `services/app-api/alembic.ini`
- Create: `services/app-api/migrations/env.py`

- [ ] **Step 1: Define SQLModel models for User, Project, Mission, and Job**
  In `services/app-api/models.py`, define the schema for our enterprise app.

- [ ] **Step 2: Setup Alembic in app-api**
  Run `alembic init migrations` inside the `app-api` container or locally if dependencies are met.

- [ ] **Step 3: Create initial migration**
  Run `alembic revision --autogenerate -m "initial"` and verify the migration file.

- [ ] **Step 4: Commit Task 2**
  ```bash
  git add services/app-api/database.py services/app-api/models.py services/app-api/alembic.ini services/app-api/migrations/
  git commit -m "feat: setup app-db models and alembic migrations"
  ```

### Task 3: JWT Authentication & RBAC

**Files:**
- Create: `services/app-api/auth.py`
- Modify: `services/app-api/main.py`

- [ ] **Step 1: Implement password hashing and JWT token generation**
  Use `passlib` for hashing and `PyJWT` for tokens in `services/app-api/auth.py`.

- [ ] **Step 2: Add /auth/login and /auth/register endpoints**
  Update `services/app-api/main.py` with authentication routes.

- [ ] **Step 3: Implement Current User dependency**
  Add a dependency to get the current user from the token.

- [ ] **Step 4: Commit Task 3**
  ```bash
  git add services/app-api/auth.py services/app-api/main.py
  git commit -m "feat: implement JWT authentication and user registration"
  ```

### Task 4: Project & Mission CRUD

**Files:**
- Modify: `services/app-api/main.py`

- [ ] **Step 1: Implement CRUD routes for Projects**
- [ ] **Step 2: Implement CRUD routes for Mission Workspaces**
- [ ] **Step 3: Commit Task 4**
  ```bash
  git add services/app-api/main.py
  git commit -m "feat: add project and mission CRUD endpoints"
  ```
