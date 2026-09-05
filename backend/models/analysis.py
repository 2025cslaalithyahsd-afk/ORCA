from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    location = Column(String(255), nullable=False, index=True)
    latitude = Column(Float, default=0.0)
    longitude = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Environmental input metrics
    temperature = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    dissolved_oxygen = Column(Float, nullable=False)
    salinity = Column(Float, nullable=False)
    turbidity = Column(Float, nullable=False)
    nitrate = Column(Float, nullable=False)
    phosphate = Column(Float, nullable=False)
    chlorophyll = Column(Float, nullable=False)
    species_population = Column(Float, nullable=False)
    plastic_pollution = Column(Float, nullable=False)
    oil_pollution = Column(Float, nullable=False)
    weather = Column(String(255), nullable=False)
    
    # Core Assessment Outcomes
    ecosystem_score = Column(Float, nullable=False)
    risk_level = Column(String(50), nullable=False)
    summary_verdict = Column(Text, nullable=True)
    
    # Domain scores for fast indexing
    chemistry_score = Column(Float, default=0.0)
    biodiversity_score = Column(Float, default=0.0)
    pollution_score = Column(Float, default=0.0)
    climate_score = Column(Float, default=0.0)
    
    # Serialized JSON representations for complete state restoration
    full_payload_json = Column(Text, nullable=True)
    
    # Relationships
    agent_results = relationship("AgentResult", back_populates="analysis", cascade="all, delete-orphan")

class AgentResult(Base):
    __tablename__ = "agent_results"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id", ondelete="CASCADE"), nullable=False)
    agent_name = Column(String(100), nullable=False)
    agent_id = Column(String(50), nullable=False)
    score = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)
    severity = Column(String(50), nullable=False)
    confidence = Column(Float, nullable=False)
    reasoning = Column(Text, nullable=False)
    findings_json = Column(Text, nullable=True)
    risks_json = Column(Text, nullable=True)
    recommendations_json = Column(Text, nullable=True)

    analysis = relationship("Analysis", back_populates="agent_results")
