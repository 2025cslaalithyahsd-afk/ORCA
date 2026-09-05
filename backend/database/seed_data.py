import json
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models.analysis import Analysis, AgentResult
from schemas.ecosystem import EcosystemInput

# -----------------------------------------------------------------------------
# PRESET TEST SCENARIOS FOR INSTANT EVALUATION & HACKATHON DEMONSTRATION
# -----------------------------------------------------------------------------
SAMPLE_SCENARIOS = {
    "healthy": EcosystemInput(
        location="Great Barrier Reef - Outer Marine Sanctuary",
        latitude=-16.2580,
        longitude=145.8920,
        temperature=26.4,
        ph=8.18,
        dissolved_oxygen=6.8,
        salinity=35.1,
        turbidity=1.8,
        nitrate=0.42,
        phosphate=0.03,
        chlorophyll=1.9,
        species_population=960.0,
        plastic_pollution=6.0,
        oil_pollution=0.5,
        weather="Clear Skies with Gentle Easterly Trade Winds"
    ),
    "moderate": EcosystemInput(
        location="Arabian Sea - Coastal Zone Alpha",
        latitude=18.9220,
        longitude=72.8347,
        temperature=29.2,
        ph=7.92,
        dissolved_oxygen=4.8,
        salinity=34.6,
        turbidity=9.4,
        nitrate=2.65,
        phosphate=0.12,
        chlorophyll=6.8,
        species_population=710.0,
        plastic_pollution=32.0,
        oil_pollution=8.5,
        weather="Pre-Monsoon Thermal Inversion with Stagnant Sea Breeze"
    ),
    "high_risk": EcosystemInput(
        location="Gulf of Mexico - Delta Anoxic Station B",
        latitude=28.8500,
        longitude=-89.4000,
        temperature=31.8,
        ph=7.54,
        dissolved_oxygen=2.2,
        salinity=31.2,
        turbidity=24.5,
        nitrate=7.80,
        phosphate=0.38,
        chlorophyll=16.4,
        species_population=320.0,
        plastic_pollution=68.0,
        oil_pollution=42.0,
        weather="Heatwave Dome with Agricultural Runoff Plume"
    )
}

HISTORICAL_SEEDS = [
    {
        "input": SAMPLE_SCENARIOS["healthy"],
        "days_ago": 14
    },
    {
        "input": SAMPLE_SCENARIOS["moderate"],
        "days_ago": 10
    },
    {
        "input": SAMPLE_SCENARIOS["high_risk"],
        "days_ago": 7
    },
    {
        "input": EcosystemInput(
            location="Coral Triangle - Raja Ampat Sanctuary",
            latitude=-0.2333,
            longitude=130.5167,
            temperature=27.1,
            ph=8.24,
            dissolved_oxygen=7.1,
            salinity=34.8,
            turbidity=1.2,
            nitrate=0.30,
            phosphate=0.02,
            chlorophyll=1.4,
            species_population=1120.0,
            plastic_pollution=4.5,
            oil_pollution=0.2,
            weather="Sunny with Mild Equatorial Currents"
        ),
        "days_ago": 4
    },
    {
        "input": EcosystemInput(
            location="North Pacific Gyre - Eastern Subtropical Station",
            latitude=32.5000,
            longitude=-140.0000,
            temperature=25.2,
            ph=8.08,
            dissolved_oxygen=6.2,
            salinity=35.5,
            turbidity=3.1,
            nitrate=0.85,
            phosphate=0.04,
            chlorophyll=2.1,
            species_population=640.0,
            plastic_pollution=74.0,
            oil_pollution=3.8,
            weather="Steady Oceanic Westerlies with Flotsam Convergence"
        ),
        "days_ago": 2
    },
    {
        "input": EcosystemInput(
            location="Baltic Sea - Gotland Basin Deep Station",
            latitude=57.3000,
            longitude=20.0000,
            temperature=18.4,
            ph=7.62,
            dissolved_oxygen=1.9,
            salinity=8.5,
            turbidity=14.0,
            nitrate=5.20,
            phosphate=0.22,
            chlorophyll=12.1,
            species_population=380.0,
            plastic_pollution=28.0,
            oil_pollution=5.0,
            weather="Cloudy Overcast with Deep Density Stratification"
        ),
        "days_ago": 1
    }
]

def seed_initial_records(db: Session):
    """Populates database with realistic historical records if empty."""
    count = db.query(Analysis).count()
    if count > 0:
        return  # Already seeded

    print("[ORCA DB] Pre-seeding database with realistic marine analyses...")
    from reasoning.orchestrator import ReasoningOrchestrator

    orchestrator = ReasoningOrchestrator()

    for item in HISTORICAL_SEEDS:
        inp = item["input"]
        days_ago = item["days_ago"]
        ts = datetime.utcnow() - timedelta(days=days_ago)

        # Run synchronously for seeding
        res = orchestrator.run_collaborative_analysis_sync(inp)
        res.timestamp = ts

        # Find domain agent scores
        chem_score = next((a.score for a in res.agent_results if a.agent_id == "ocean_chemistry"), 0.0)
        bio_score = next((a.score for a in res.agent_results if a.agent_id == "marine_biodiversity"), 0.0)
        poll_score = next((a.score for a in res.agent_results if a.agent_id == "pollution_detection"), 0.0)
        clim_score = next((a.score for a in res.agent_results if a.agent_id == "climate_weather"), 0.0)

        # Create Analysis record
        analysis_record = Analysis(
            location=inp.location,
            latitude=inp.latitude or 0.0,
            longitude=inp.longitude or 0.0,
            timestamp=ts,
            temperature=inp.temperature,
            ph=inp.ph,
            dissolved_oxygen=inp.dissolved_oxygen,
            salinity=inp.salinity,
            turbidity=inp.turbidity,
            nitrate=inp.nitrate,
            phosphate=inp.phosphate,
            chlorophyll=inp.chlorophyll,
            species_population=inp.species_population,
            plastic_pollution=inp.plastic_pollution,
            oil_pollution=inp.oil_pollution,
            weather=inp.weather,
            ecosystem_score=res.ecosystem_score,
            risk_level=res.risk_level,
            summary_verdict=res.summary_verdict,
            chemistry_score=chem_score,
            biodiversity_score=bio_score,
            pollution_score=poll_score,
            climate_score=clim_score,
            full_payload_json=json.dumps(res.model_dump(), default=str)
        )
        db.add(analysis_record)
        db.flush()

        # Add AgentResult records
        for a in res.agent_results:
            agent_record = AgentResult(
                analysis_id=analysis_record.id,
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
            db.add(agent_record)

    db.commit()
    print("[ORCA DB] Pre-seeding completed successfully.")
