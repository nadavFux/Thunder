from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from datetime import timedelta
from typing import List, Optional
import uuid

from database import get_session, init_db
from models import User, Project, Mission, Job
from auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    oauth2_scheme, 
    decode_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

app = FastAPI(title="Thunder App API")

@app.on_event("startup")
def on_startup():
    # init_db() # Using Alembic for migrations instead
    pass

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "app-api"}

# --- Authentication ---

@app.post("/auth/register", response_model=User)
def register(user: User, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.username == user.username)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    user.hashed_password = get_password_hash(user.hashed_password)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    username: str = payload.get("sub")
    user = session.exec(select(User).where(User.username == username)).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

# --- Projects ---

@app.post("/projects/", response_model=Project)
def create_project(project: Project, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    project.owner_id = current_user.id
    session.add(project)
    session.commit()
    session.refresh(project)
    return project

@app.get("/projects/", response_model=List[Project])
def read_projects(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    projects = session.exec(select(Project).where(Project.owner_id == current_user.id)).all()
    return projects

@app.get("/projects/{project_id}", response_model=Project)
def read_project(project_id: uuid.UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

# --- Missions ---

@app.post("/missions/", response_model=Mission)
def create_mission(mission: Mission, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    # Verify project ownership
    project = session.get(Project, mission.project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found or access denied")
    
    session.add(mission)
    session.commit()
    session.refresh(mission)
    return mission

@app.get("/projects/{project_id}/missions/", response_model=List[Mission])
def read_missions(project_id: uuid.UUID, current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project or project.owner_id != current_user.id:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.missions
