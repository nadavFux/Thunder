from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional, Dict
from datetime import datetime
import uuid
from sqlalchemy import JSON, Column

class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    projects: List["Project"] = Relationship(back_populates="owner")

class Project(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    owner_id: uuid.UUID = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    owner: User = Relationship(back_populates="projects")
    missions: List["Mission"] = Relationship(back_populates="project")

class Mission(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = None
    project_id: uuid.UUID = Field(foreign_key="project.id")
    aoi: Dict = Field(default={}, sa_column=Column(JSON))  # Storing GeoJSON
    stac_items: List[str] = Field(default=[], sa_column=Column(JSON)) # List of STAC Item IDs
    created_at: datetime = Field(default_factory=datetime.utcnow)

    project: Project = Relationship(back_populates="missions")
    jobs: List["Job"] = Relationship(back_populates="mission")

class Job(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    type: str = Field(default="cv-analysis")
    status: str = Field(default="pending") # pending, running, completed, failed
    mission_id: uuid.UUID = Field(foreign_key="mission.id")
    results_collection: Optional[str] = None # Collection ID in PgSTAC
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    mission: Mission = Relationship(back_populates="jobs")
