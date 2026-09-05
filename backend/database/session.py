import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models.analysis import Base
from dotenv import load_dotenv

load_dotenv()

# Read DATABASE_URL from environment or fallback to local SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./orca_marine.db")

# For SQLite, ensure check_same_thread is False
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initializes tables and automatically populates seed data if empty."""
    Base.metadata.create_all(bind=engine)
    from database.seed_data import seed_initial_records
    db = SessionLocal()
    try:
        seed_initial_records(db)
    finally:
        db.close()
