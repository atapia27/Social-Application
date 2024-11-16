# backend/database.py

# from sqlalchemy.ext.declarative import declarative_base  # deprecated
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="backend/.env")

# Fetch the database URL from environment variables
SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")

# Create the SQLAlchemy engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=10,           # Number of connections to maintain in the pool
    max_overflow=20,        # Allow extra connections beyond the pool size
    pool_timeout=30,        # Timeout for acquiring a new connection
    pool_recycle=1800       # Recycle connections after 30 minutes
)
# Configure session maker
localSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative class definitions
print("Creating Base class in database.py")
Base = declarative_base()
