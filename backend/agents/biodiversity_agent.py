from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput

class MarineBiodiversityAgent(BaseAgent):
    """
    Agent 2 – Marine Biodiversity Agent
    Specializes in species population metrics, trophic food web balance,
    population variance against healthy historical baselines, and biological stress detection.
    """

    BASELINE_POPULATION = 1000.0  # Standard reference index for healthy marine biomass

    def __init__(self):
        super().__init__(
            agent_id="marine_biodiversity",
            agent_name="Marine Biodiversity Agent",
            icon="Fish"
        )

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        findings = []
        risks = []
        recommendations = []
        deductions = 0.0

        pop = data.species_population
        ratio = pop / self.BASELINE_POPULATION
        percent_of_baseline = ratio * 100.0

        # 1. Population Abundance Analysis
        if ratio >= 0.85:
            findings.append(f"Marine species population index is strong at {pop:.0f} ({percent_of_baseline:.1f}% of reference baseline).")
        elif 0.65 <= ratio < 0.85:
            findings.append(f"Species census indicates moderate abundance drop at {pop:.0f} ({percent_of_baseline:.1f}% of baseline).")
            risks.append("Noticeable thinning of intermediate trophic guilds (planktivores and benthic grazers).")
            deductions += 15.0
        elif 0.40 <= ratio < 0.65:
            findings.append(f"Substantial biodiversity depletion: Census index at {pop:.0f} ({percent_of_baseline:.1f}% of baseline).")
            risks.append("Loss of key ecological functional groups; high vulnerability to trophic cascade collapse.")
            deductions += 35.0
        else:
            findings.append(f"CRITICAL BIOMASS COLLAPSE: Species population plunged to {pop:.0f} ({percent_of_baseline:.1f}% of baseline).")
            risks.append("Severe ecosystem depauperation; high risk of local extirpation of endemic taxa.")
            deductions += 60.0

        # 2. Biological Stress from Chemical & Physical Drivers
        if data.dissolved_oxygen < 4.0:
            risks.append(f"Physiological suffocation threat: Dissolved oxygen of {data.dissolved_oxygen:.1f} mg/L exceeds species tolerance limits.")
            deductions += 15.0

        if data.turbidity > 15.0:
            risks.append("Impaired visual foraging and silt clogging of fish gill filaments and filter-feeding invertebrates.")
            deductions += 10.0

        # 3. Chlorophyll / Primary Producer Balance
        chla = data.chlorophyll
        if 1.0 <= chla <= 5.0:
            findings.append(f"Chlorophyll-a level ({chla:.1f} µg/L) represents productive, well-balanced phytoplankton base.")
        elif chla > 10.0:
            findings.append(f"Abnormally high primary production (Chlorophyll-a {chla:.1f} µg/L); potential harmful algal bloom (HAB).")
            risks.append("Potential phycotoxin production and nocturnal biological oxygen demand spike.")
            deductions += 12.0
        elif chla < 0.8:
            findings.append(f"Low primary productivity (Chlorophyll-a {chla:.1f} µg/L), indicating oligotrophic starvation stress.")
            deductions += 8.0

        score = self.clamp_score(100.0 - deductions)
        status, severity = self.determine_status_severity(score)

        if ratio < 0.70:
            recommendations.append("Establish seasonal fishing moratoriums or designated marine no-take sanctuary zones.")
            recommendations.append("Conduct comprehensive eDNA (environmental DNA) sequencing to identify vulnerable taxa.")
        if data.chlorophyll > 10.0:
            recommendations.append("Deploy microscopic plankton sampling to screen for dinoflagellate and cyanobacteria toxins.")
        if not recommendations:
            recommendations.append("Continue acoustic telemetry tagging and annual biodiversity transect surveys.")

        reasoning = (
            f"Biodiversity evaluation benchmarks current marine population ({pop:.0f}, {percent_of_baseline:.1f}% of baseline) "
            f"alongside environmental stressors (DO {data.dissolved_oxygen:.1f} mg/L, Turbidity {data.turbidity:.1f} NTU). "
            f"The biological community is designated as {status} (Score: {score}/100) with {severity.lower()} conservation urgency."
        )

        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=score,
            status=status,
            severity=severity,
            confidence=91.0,
            findings=findings,
            risks=risks,
            reasoning=reasoning,
            recommendations=recommendations,
            metrics={
                "population_index": pop,
                "baseline_ratio": round(ratio, 2),
                "chlorophyll": chla
            }
        )
