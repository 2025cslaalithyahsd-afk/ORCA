import os
import json
from contextlib import asynccontextmanager
from typing import List, Dict, Any
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from schemas.ecosystem import (
    EcosystemInput,
    AnalysisResponse,
    HistoricalAnalysisSummary
)
from database.session import get_db, init_db
from database.seed_data import SAMPLE_SCENARIOS, seed_initial_records
from models.analysis import Analysis, AgentResult
from reasoning.orchestrator import ReasoningOrchestrator

load_dotenv()

orchestrator = ReasoningOrchestrator()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database tables and seed sample data
    print("[ORCA Backend] Initializing database and agent subsystems...")
    init_db()
    print("[ORCA Backend] ORCA AI Agent Engine Ready.")
    yield
    print("[ORCA Backend] Shutting down...")

app = FastAPI(
    title="ORCA API – Marine Ecosystem Reasoning with Collaborative Agents",
    description="Multi-Agent Ecological Intelligence and Decision-Support Platform",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in origins else origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------------------------------------------------
# SYSTEM HEALTH & META ENDPOINTS
# -----------------------------------------------------------------------------
@app.get("/api/health", tags=["System"])
async def get_system_health(db: Session = Depends(get_db)):
    """Returns backend status, DB connection, and active agent roster."""
    analysis_count = db.query(Analysis).count()
    return {
        "status": "healthy",
        "service": "ORCA Marine Intelligence Engine",
        "version": "1.0.0",
        "database": "connected",
        "database_records": analysis_count,
        "active_agents": [
            {"id": "ocean_chemistry", "name": "Ocean Chemistry Agent", "status": "Operational"},
            {"id": "marine_biodiversity", "name": "Marine Biodiversity Agent", "status": "Operational"},
            {"id": "pollution_detection", "name": "Pollution Detection Agent", "status": "Operational"},
            {"id": "climate_weather", "name": "Climate & Weather Agent", "status": "Operational"},
            {"id": "ecosystem_risk", "name": "Ecosystem Risk Agent", "status": "Operational"},
            {"id": "recommendation_agent", "name": "Recommendation Agent", "status": "Operational"}
        ],
        "reasoning_mode": orchestrator.llm_service.provider_name,
        "llm_enrichment_available": orchestrator.llm_service.is_llm_enabled
    }

# -----------------------------------------------------------------------------
# SCENARIOS ENDPOINTS
# -----------------------------------------------------------------------------
@app.get("/api/sample-scenarios", tags=["Scenarios"])
async def get_sample_scenarios():
    """Returns preset environmental test scenarios for instant hackathon evaluation."""
    return {
        "scenarios": [
            {
                "key": "healthy",
                "name": "Scenario 1: Pristine Marine Sanctuary",
                "tagline": "Optimal water chemistry, low pollution, high biological diversity",
                "data": SAMPLE_SCENARIOS["healthy"]
            },
            {
                "key": "moderate",
                "name": "Scenario 2: Moderate Runoff & Coastal Stress",
                "tagline": "Elevated agricultural nutrients, rising temperature, slight hypoxic drift",
                "data": SAMPLE_SCENARIOS["moderate"]
            },
            {
                "key": "high_risk",
                "name": "Scenario 3: Severe Hypoxia & Hydrocarbon Spill",
                "tagline": "Critical dead zone threshold, toxic petrochemical sheen, severe biomass loss",
                "data": SAMPLE_SCENARIOS["high_risk"]
            }
        ]
    }

@app.post("/api/sample-analysis", response_model=AnalysisResponse, tags=["Scenarios"])
async def run_sample_analysis(scenario_key: str = Query("healthy", enum=["healthy", "moderate", "high_risk"]), db: Session = Depends(get_db)):
    """Executes collaborative multi-agent reasoning on a predefined sample scenario."""
    if scenario_key not in SAMPLE_SCENARIOS:
        raise HTTPException(status_code=400, detail="Invalid scenario key. Choose 'healthy', 'moderate', or 'high_risk'.")

    sample_input = SAMPLE_SCENARIOS[scenario_key]
    return await execute_and_save_analysis(sample_input, db)

# -----------------------------------------------------------------------------
# CORE MULTI-AGENT ANALYSIS PIPELINE
# -----------------------------------------------------------------------------
@app.post("/api/analyze", response_model=AnalysisResponse, tags=["Analysis"])
async def analyze_ecosystem(data: EcosystemInput, db: Session = Depends(get_db)):
    """
    Primary ORCA endpoint:
    Ingests environmental observations, dispatches parallel specialized agents,
    synthesizes cross-agent correlations, detects compound threats, and calculates
    the composite ecosystem health score and prioritized recommendations.
    """
    return await execute_and_save_analysis(data, db)

async def execute_and_save_analysis(data: EcosystemInput, db: Session) -> AnalysisResponse:
    try:
        # Run multi-agent collaborative orchestrator
        response = await orchestrator.run_collaborative_analysis(data)

        # Extract domain agent scores
        chem_score = next((a.score for a in response.agent_results if a.agent_id == "ocean_chemistry"), 0.0)
        bio_score = next((a.score for a in response.agent_results if a.agent_id == "marine_biodiversity"), 0.0)
        poll_score = next((a.score for a in response.agent_results if a.agent_id == "pollution_detection"), 0.0)
        clim_score = next((a.score for a in response.agent_results if a.agent_id == "climate_weather"), 0.0)

        # Persist to database
        db_analysis = Analysis(
            location=data.location,
            latitude=data.latitude or 0.0,
            longitude=data.longitude or 0.0,
            timestamp=response.timestamp,
            temperature=data.temperature,
            ph=data.ph,
            dissolved_oxygen=data.dissolved_oxygen,
            salinity=data.salinity,
            turbidity=data.turbidity,
            nitrate=data.nitrate,
            phosphate=data.phosphate,
            chlorophyll=data.chlorophyll,
            species_population=data.species_population,
            plastic_pollution=data.plastic_pollution,
            oil_pollution=data.oil_pollution,
            weather=data.weather,
            ecosystem_score=response.ecosystem_score,
            risk_level=response.risk_level,
            summary_verdict=response.summary_verdict,
            chemistry_score=chem_score,
            biodiversity_score=bio_score,
            pollution_score=poll_score,
            climate_score=clim_score,
            full_payload_json=json.dumps(response.model_dump(), default=str)
        )
        db.add(db_analysis)
        db.flush()

        for a in response.agent_results:
            db_agent = AgentResult(
                analysis_id=db_analysis.id,
                agent_name=a.agent_name,
                agent_id=a.agent_id,
                score=a.score,
                status=a.status,
                severity=a.severity,
                confidence=a.confidence,
                reasoning=a.reasoning,
                findings_json=json.dumps(a.findings),
                risks_json=json.dumps(a.risks),
                recommendations_json=json.dumps(a.recommendations)
            )
            db.add(db_agent)

        db.commit()
        response.id = db_analysis.id
        return response

    except Exception as e:
        db.rollback()
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Collaborative agent pipeline execution failed: {str(e)}"
        )

# -----------------------------------------------------------------------------
# HISTORICAL ANALYSES ARCHIVE
# -----------------------------------------------------------------------------
@app.get("/api/analyses", response_model=List[HistoricalAnalysisSummary], tags=["History"])
async def get_historical_analyses(
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Fetches list of historical marine ecosystem evaluations."""
    records = (
        db.query(Analysis)
        .order_by(Analysis.timestamp.desc())
        .limit(limit)
        .all()
    )

    summaries = []
    for r in records:
        # Determine risk color
        color = "#10b981" if r.ecosystem_score >= 88 else "#06b6d4" if r.ecosystem_score >= 75 else "#f59e0b" if r.ecosystem_score >= 58 else "#f97316" if r.ecosystem_score >= 38 else "#ef4444"

        summaries.append(HistoricalAnalysisSummary(
            id=r.id,
            location=r.location,
            latitude=r.latitude,
            longitude=r.longitude,
            timestamp=r.timestamp,
            ecosystem_score=r.ecosystem_score,
            risk_level=r.risk_level,
            risk_color=color,
            temperature=r.temperature,
            ph=r.ph,
            dissolved_oxygen=r.dissolved_oxygen,
            pollution_score=r.pollution_score,
            biodiversity_score=r.biodiversity_score
        ))

    return summaries

@app.get("/api/analyses/{analysis_id}", response_model=AnalysisResponse, tags=["History"])
async def get_analysis_by_id(analysis_id: int, db: Session = Depends(get_db)):
    """Retrieves full telemetry, agent reports, and cross-agent graph for a specific analysis."""
    record = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"Analysis ID {analysis_id} not found.")

    if record.full_payload_json:
        data_dict = json.loads(record.full_payload_json)
        data_dict["id"] = record.id
        return AnalysisResponse(**data_dict)

    # Reconstruct if json column was empty
    input_data = EcosystemInput(
        location=record.location,
        latitude=record.latitude,
        longitude=record.longitude,
        temperature=record.temperature,
        ph=record.ph,
        dissolved_oxygen=record.dissolved_oxygen,
        salinity=record.salinity,
        turbidity=record.turbidity,
        nitrate=record.nitrate,
        phosphate=record.phosphate,
        chlorophyll=record.chlorophyll,
        species_population=record.species_population,
        plastic_pollution=record.plastic_pollution,
        oil_pollution=record.oil_pollution,
        weather=record.weather
    )
    res = await orchestrator.run_collaborative_analysis(input_data)
    res.id = record.id
    res.timestamp = record.timestamp
    return res

@app.delete("/api/analyses/{analysis_id}", tags=["History"])
async def delete_analysis(analysis_id: int, db: Session = Depends(get_db)):
    """Deletes an analysis record from the archive."""
    record = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"Analysis ID {analysis_id} not found.")
    db.delete(record)
    db.commit()
    return {"message": f"Analysis {analysis_id} deleted successfully."}

@app.post("/api/seed", tags=["System"])
async def reseed_database(db: Session = Depends(get_db)):
    """Re-populates database with demo historical records."""
    seed_initial_records(db)
    return {"message": "Database successfully populated with realistic marine telemetry."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
