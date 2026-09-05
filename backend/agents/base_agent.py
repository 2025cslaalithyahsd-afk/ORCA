from abc import ABC, abstractmethod
from typing import Dict, Any, List
from schemas.ecosystem import EcosystemInput, AgentOutput

class BaseAgent(ABC):
    """Abstract Base Agent for all ORCA specialized marine intelligence agents."""
    
    def __init__(self, agent_id: str, agent_name: str, icon: str):
        self.agent_id = agent_id
        self.agent_name = agent_name
        self.icon = icon

    @abstractmethod
    def analyze(self, data: EcosystemInput) -> AgentOutput:
        """Analyze the ingested marine telemetry and return structured agent findings."""
        pass

    def clamp_score(self, score: float) -> float:
        """Clamps score between 0.0 and 100.0 rounded to 1 decimal place."""
        return round(max(0.0, min(100.0, score)), 1)

    def determine_status_severity(self, score: float) -> tuple[str, str]:
        """Translates 0-100 score into status badge and risk severity."""
        if score >= 85.0:
            return "Optimal", "Low"
        elif score >= 70.0:
            return "Good", "Low"
        elif score >= 50.0:
            return "Moderate Risk", "Moderate"
        elif score >= 30.0:
            return "High Risk", "High"
        else:
            return "Critical", "Severe"
