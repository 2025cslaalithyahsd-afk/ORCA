from typing import List, Dict, Tuple, Any
from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput, CrossAgentObservation

class EcosystemRiskAgent(BaseAgent):
    """
    Agent 5 – Ecosystem Risk Agent
    The central collaborative intelligence engine that synthesizes individual
    agent assessments, discovers cross-domain compounding risks, resolves
    divergences, and computes the composite ORCA ecosystem health score.
    """

    # Configurable baseline weights for domain agents
    WEIGHTS = {
        "ocean_chemistry": 0.25,
        "marine_biodiversity": 0.25,
        "pollution_detection": 0.25,
        "climate_weather": 0.25,
    }

    def __init__(self):
        super().__init__(
            agent_id="ecosystem_risk",
            agent_name="Ecosystem Risk Agent",
            icon="ShieldAlert"
        )

    def analyze_collaborative(
        self,
        data: EcosystemInput,
        domain_outputs: Dict[str, AgentOutput]
    ) -> Tuple[AgentOutput, List[CrossAgentObservation], List[str], List[str], float, str, str]:
        """
        Synthesizes parallel domain outputs, detects cross-agent compound threats,
        and derives the final composite ecosystem health score and classification.
        """
        chem = domain_outputs.get("ocean_chemistry")
        bio = domain_outputs.get("marine_biodiversity")
        poll = domain_outputs.get("pollution_detection")
        clim = domain_outputs.get("climate_weather")

        cross_observations: List[CrossAgentObservation] = []
        compound_risks: List[str] = []
        influential_factors: List[str] = []
        findings: List[str] = []
        risks: List[str] = []
        recommendations: List[str] = []

        obs_counter = 1

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 1: Eutrophication & Hypoxic Dead Zone Synergy
        # (Chemistry DO/Nutrients + Climate Temp + Plankton Chlorophyll)
        # -------------------------------------------------------------------------
        if chem and clim and (data.dissolved_oxygen < 5.0 or data.chlorophyll > 7.0 or data.nitrate > 3.0):
            if data.temperature >= 28.5 and data.dissolved_oxygen < 4.5:
                compound_risks.append(
                    "Compound Eutrophic Hypoxia: Elevated water temperature accelerates microbial decomposition "
                    "of excess organic nutrients, causing acute nocturnal oxygen depletion."
                )
                cross_observations.append(CrossAgentObservation(
                    id=f"OBS-{obs_counter:02d}",
                    source_agent="Ocean Chemistry Agent",
                    target_agent="Climate & Weather Agent",
                    relationship_type="Compounding Threat",
                    summary="High Temperature + Depleted DO + Nutrient Loading",
                    detail=(
                        f"Chemistry Agent recorded sub-optimal DO ({data.dissolved_oxygen:.1f} mg/L) alongside "
                        f"elevated nutrients. Climate Agent notes {data.temperature:.1f}°C temperature, which physically "
                        "reduces gas solubility and accelerates metabolic oxygen consumption."
                    ),
                    severity="Critical" if data.dissolved_oxygen < 3.0 else "High"
                ))
                obs_counter += 1
                influential_factors.append("Dissolved Oxygen Depletion & Thermal Solubility Trap")

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 2: Coral Bleaching & Acidification Synergy
        # (Climate Thermal Anomaly + Chemistry Acidic pH)
        # -------------------------------------------------------------------------
        if clim and chem and (data.temperature > 29.5 and data.ph < 7.9):
            compound_risks.append(
                "Synergistic Reef Degradation: Ocean warming combined with acidic pH severely restricts "
                "aragonite calcium carbonate saturation while expelling zooxanthellae."
            )
            cross_observations.append(CrossAgentObservation(
                id=f"OBS-{obs_counter:02d}",
                source_agent="Climate & Weather Agent",
                target_agent="Ocean Chemistry Agent",
                relationship_type="Compounding Threat",
                summary="Thermal Stress + Ocean Acidification",
                detail=(
                    f"Climate Agent alerts to marine heatwave ({data.temperature:.1f}°C), while Chemistry Agent "
                    f"detects low pH ({data.ph:.2f}). This co-stressor pair inhibits coral skeleton calcification "
                    "and triggers accelerated bleaching."
                ),
                severity="Critical" if (data.temperature > 31.0 and data.ph < 7.7) else "High"
            ))
            obs_counter += 1
            influential_factors.append("Thermal-Acidification Dual Stress")

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 3: Trophic Biodiversity Stress Correlation
        # (Biodiversity Population + Chemistry DO & Pollution)
        # -------------------------------------------------------------------------
        if bio and chem and (data.species_population < 700.0 and data.dissolved_oxygen < 5.0):
            cross_observations.append(CrossAgentObservation(
                id=f"OBS-{obs_counter:02d}",
                source_agent="Ocean Chemistry Agent",
                target_agent="Marine Biodiversity Agent",
                relationship_type="Correlation",
                summary="Hypoxia-Driven Species Eviction & Stress",
                detail=(
                    f"Biodiversity Agent observes species biomass at {data.species_population:.0f} (depleted). "
                    f"Chemistry Agent's low DO ({data.dissolved_oxygen:.1f} mg/L) provides the primary physiological mechanism."
                ),
                severity="High"
            ))
            obs_counter += 1
            influential_factors.append("Hypoxic Species Habitat Exclusion")

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 4: Anthropogenic Silt & Hydrocarbon Smothering
        # (Pollution Agent + Biodiversity Agent)
        # -------------------------------------------------------------------------
        if poll and bio and (data.turbidity > 15.0 or data.oil_pollution > 15.0 or data.plastic_pollution > 40.0):
            severity_str = "Critical" if data.oil_pollution > 30.0 else "High" if data.turbidity > 25.0 else "Medium"
            compound_risks.append(
                f"Anthropogenic Habitat Smothering: Suspended particulates ({data.turbidity:.1f} NTU) and toxic pollutants "
                f"(Plastics: {data.plastic_pollution:.1f}, Oil: {data.oil_pollution:.1f}) compromise benthic filter feeders."
            )
            cross_observations.append(CrossAgentObservation(
                id=f"OBS-{obs_counter:02d}",
                source_agent="Pollution Detection Agent",
                target_agent="Marine Biodiversity Agent",
                relationship_type="Compounding Threat",
                summary="Pollutant Load Smothering Biological Community",
                detail=(
                    f"Pollution Agent detected elevated contaminant index. Biodiversity Agent reports concurrent "
                    f"stress, confirming physical light starvation and particulate gill clogging."
                ),
                severity=severity_str
            ))
            obs_counter += 1
            influential_factors.append("Anthropogenic Sediment & Chemical Burden")

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 5: Consensus / Stability Confirmation
        # -------------------------------------------------------------------------
        if chem.score >= 80.0 and bio.score >= 80.0 and poll.score >= 80.0 and clim.score >= 80.0:
            cross_observations.append(CrossAgentObservation(
                id=f"OBS-{obs_counter:02d}",
                source_agent="All Specialized Agents",
                target_agent="Ecosystem Risk Agent",
                relationship_type="Consensus",
                summary="Multi-Domain Pristine Equilibrium",
                detail=(
                    "Chemistry, Biodiversity, Pollution, and Climate agents mutually confirm high ecological stability, "
                    "normal physicochemical ranges, and uninhibited biological productivity."
                ),
                severity="Low"
            ))
            obs_counter += 1
            findings.append("All specialized agents converge on high ecosystem health and resilience.")

        # -------------------------------------------------------------------------
        # CROSS-AGENT REASONING 6: Conflict / Discrepancy Detection
        # (e.g. Good chemistry but low biodiversity -> Overfishing or physical disturbance)
        # -------------------------------------------------------------------------
        if chem.score >= 80.0 and bio.score < 60.0 and poll.score >= 75.0:
            cross_observations.append(CrossAgentObservation(
                id=f"OBS-{obs_counter:02d}",
                source_agent="Marine Biodiversity Agent",
                target_agent="Ocean Chemistry Agent",
                relationship_type="Discrepancy",
                summary="Biomass Deficit Despite Healthy Water Quality",
                detail=(
                    "Water chemistry and pollution metrics are pristine, yet biodiversity is substantially depressed. "
                    "This discrepancy points toward non-chemical pressures such as unsustainable commercial overfishing, "
                    "bottom trawling, or invasive predatory species."
                ),
                severity="Medium"
            ))
            obs_counter += 1
            compound_risks.append("Selective Biomass Extraction: Species deficit independent of physicochemical water parameters.")
            influential_factors.append("Direct Biomass Harvesting / Physical Habitat Disturbance")

        # -------------------------------------------------------------------------
        # COMPOSITE SCORE CALCULATION
        # -------------------------------------------------------------------------
        weighted_base = (
            chem.score * self.WEIGHTS["ocean_chemistry"] +
            bio.score * self.WEIGHTS["marine_biodiversity"] +
            poll.score * self.WEIGHTS["pollution_detection"] +
            clim.score * self.WEIGHTS["climate_weather"]
        )

        # Compound synergy penalty: if multiple severe compounding stressors are discovered,
        # natural ecosystems suffer synergistic (non-linear) degradation.
        penalty = 0.0
        if len(compound_risks) == 1:
            penalty = 3.0
        elif len(compound_risks) == 2:
            penalty = 7.0
        elif len(compound_risks) >= 3:
            penalty = 12.0

        composite_score = self.clamp_score(weighted_base - penalty)

        # Risk Classification
        if composite_score >= 88.0:
            risk_level = "Excellent"
            risk_color = "#10b981"  # Emerald
            verdict = "Marine ecosystem is in pristine ecological balance with strong trophic resilience."
        elif composite_score >= 75.0:
            risk_level = "Healthy"
            risk_color = "#06b6d4"  # Cyan
            verdict = "Ecosystem maintains stable life-support functions with minor localized environmental variance."
        elif composite_score >= 58.0:
            risk_level = "Moderate Risk"
            risk_color = "#f59e0b"  # Amber
            verdict = "Ecosystem exhibits elevated stress signals; early intervention advised to prevent chronic degradation."
        elif composite_score >= 38.0:
            risk_level = "High Risk"
            risk_color = "#f97316"  # Orange
            verdict = "Severe ecological stress detected across multiple environmental vectors; immediate management required."
        else:
            risk_level = "Critical"
            risk_color = "#ef4444"  # Red
            verdict = "CRITICAL ECOSYSTEM ALERT: Imminent habitat collapse and dead zone risk requiring emergency remediation."

        findings.append(f"Synthesized weighted telemetry from 4 domain agents (Base Score: {weighted_base:.1f}, Compound Penalty: -{penalty:.1f}).")
        findings.append(f"Identified {len(cross_observations)} cross-agent relationships and {len(compound_risks)} compound stressor interactions.")

        if compound_risks:
            risks.extend(compound_risks)
        else:
            risks.append("No acute synergistic multi-stressor threats identified at current telemetry thresholds.")

        recommendations.append("Prioritize joint catchment-marine management to mitigate identified compound risks.")
        recommendations.append("Establish telemetry-triggered early warning thresholds for rapid environmental response.")

        reasoning = (
            f"The Ecosystem Risk Agent synthesized inputs across Ocean Chemistry ({chem.score:.1f}), "
            f"Biodiversity ({bio.score:.1f}), Pollution ({poll.score:.1f}), and Climate ({clim.score:.1f}). "
            f"Evaluating cross-domain correlations identified {len(compound_risks)} compounding stressors, "
            f"yielding an ORCA Composite Ecosystem Score of {composite_score}/100 ({risk_level}). "
            f"NOTE: This is an inferred multi-agent algorithmic assessment, intended as decision-support guidance."
        )

        agent_output = AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=composite_score,
            status=risk_level,
            severity="Severe" if composite_score < 40 else "High" if composite_score < 60 else "Moderate" if composite_score < 75 else "Low",
            confidence=96.0,
            findings=findings,
            risks=risks,
            reasoning=reasoning,
            recommendations=recommendations,
            metrics={
                "composite_score": composite_score,
                "weighted_base": round(weighted_base, 1),
                "compound_penalty": penalty,
                "compound_threats_count": len(compound_risks),
                "cross_observations_count": len(cross_observations)
            }
        )

        return agent_output, cross_observations, compound_risks, influential_factors, composite_score, risk_level, risk_color

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        # Fallback single analyze implementation
        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=75.0,
            status="Healthy",
            severity="Low",
            confidence=90.0,
            findings=["Default baseline evaluation."],
            risks=[],
            reasoning="Awaiting collaborative synthesis from domain agents.",
            recommendations=["Initiate full multi-agent reasoning pipeline."]
        )
