from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class EcosystemInput(BaseModel):
    location: str = Field(..., description="Geographical name or region of observation", example="Arabian Sea - Coastal Zone Alpha")
    latitude: Optional[float] = Field(default=18.9220, description="Latitude coordinate for spatial mapping")
    longitude: Optional[float] = Field(default=72.8347, description="Longitude coordinate for spatial mapping")
    temperature: float = Field(..., ge=-5.0, le=45.0, description="Water temperature in °C", example=28.4)
    ph: float = Field(..., ge=4.0, le=11.0, description="Water pH level", example=8.1)
    dissolved_oxygen: float = Field(..., ge=0.0, le=20.0, description="Dissolved oxygen in mg/L", example=6.4)
    salinity: float = Field(..., ge=0.0, le=60.0, description="Salinity in PSU", example=35.2)
    turbidity: float = Field(..., ge=0.0, le=100.0, description="Turbidity in NTU", example=4.5)
    nitrate: float = Field(..., ge=0.0, le=50.0, description="Nitrate level in mg/L", example=0.85)
    phosphate: float = Field(..., ge=0.0, le=20.0, description="Phosphate level in mg/L", example=0.06)
    chlorophyll: float = Field(..., ge=0.0, le=100.0, description="Chlorophyll-a in µg/L", example=2.1)
    species_population: float = Field(..., ge=0.0, le=10000.0, description="Observed species population index or count", example=840.0)
    plastic_pollution: float = Field(..., ge=0.0, le=100.0, description="Plastic pollution severity index (0-100)", example=14.0)
    oil_pollution: float = Field(..., ge=0.0, le=100.0, description="Hydrocarbon/oil pollution index (0-100)", example=2.5)
    weather: str = Field(..., description="Ambient weather condition", example="Partly Cloudy with Moderate Sea Breeze")

class AgentOutput(BaseModel):
    agent_name: str
    agent_id: str
    icon: str
    score: float = Field(..., description="Agent domain health score (0-100, higher is healthier)")
    status: str = Field(..., description="Optimal, Good, Moderate Risk, High Risk, Critical")
    severity: str = Field(..., description="Low, Moderate, High, Severe")
    confidence: float = Field(..., description="Confidence percentage (0-100)")
    findings: List[str] = Field(default_factory=list)
    risks: List[str] = Field(default_factory=list)
    reasoning: str
    recommendations: List[str] = Field(default_factory=list)
    metrics: Dict[str, Any] = Field(default_factory=dict)

class CrossAgentObservation(BaseModel):
    id: str
    source_agent: str
    target_agent: str
    relationship_type: str  # "Compounding Threat", "Correlation", "Consensus", "Discrepancy"
    summary: str
    detail: str
    severity: str  # "Low", "Medium", "High", "Critical"

class RecommendationItem(BaseModel):
    id: str
    title: str
    timeframe: str  # "Immediate", "Short-Term", "Long-Term"
    priority: str   # "Critical", "High", "Medium", "Low"
    agent_source: str
    reason: str
    expected_impact: str
    steps: List[str] = Field(default_factory=list)

class ParameterRiskItem(BaseModel):
    parameter: str
    label: str
    value: float
    unit: str
    normal_range: str
    status: str     # "Optimal", "Acceptable", "Moderate Risk", "High Risk", "Critical"
    contributed_risk: str
    severity: str

class AnalysisResponse(BaseModel):
    id: Optional[int] = None
    location: str
    latitude: float
    longitude: float
    timestamp: datetime
    input_data: EcosystemInput
    ecosystem_score: float = Field(..., description="ORCA Composite Ecosystem Score (0-100)")
    risk_level: str        # "Excellent", "Healthy", "Moderate Risk", "High Risk", "Critical"
    risk_color: str
    summary_verdict: str
    agent_results: List[AgentOutput]
    cross_agent_reasoning: List[CrossAgentObservation]
    compound_risks: List[str]
    influential_factors: List[str]
    recommendations: Dict[str, List[RecommendationItem]]  # immediate, short_term, long_term
    parameter_matrix: List[ParameterRiskItem]
    pipeline_trace: List[Dict[str, str]]
    reasoning_mode: str = "Rule-based & Deterministic Expert Heuristics"

class HistoricalAnalysisSummary(BaseModel):
    id: int
    location: str
    latitude: float
    longitude: float
    timestamp: datetime
    ecosystem_score: float
    risk_level: str
    risk_color: str
    temperature: float
    ph: float
    dissolved_oxygen: float
    pollution_score: float
    biodiversity_score: float
