import time
from datetime import datetime
from typing import Dict, List
from schemas.ecosystem import (
    EcosystemInput,
    AnalysisResponse,
    AgentOutput,
    ParameterRiskItem
)
from agents.chemistry_agent import OceanChemistryAgent
from agents.biodiversity_agent import MarineBiodiversityAgent
from agents.pollution_agent import PollutionDetectionAgent
from agents.climate_agent import ClimateWeatherAgent
from agents.ecosystem_risk_agent import EcosystemRiskAgent
from agents.recommendation_agent import RecommendationAgent
from reasoning.llm_service import LLMReasoningService

class ReasoningOrchestrator:
    """
    Master Multi-Agent Orchestrator:
    Coordinates domain agents, executes cross-agent reasoning, calculates
    risk metrics, and formats comprehensive ecosystem intelligence responses.
    """

    def __init__(self):
        self.chemistry_agent = OceanChemistryAgent()
        self.biodiversity_agent = MarineBiodiversityAgent()
        self.pollution_agent = PollutionDetectionAgent()
        self.climate_agent = ClimateWeatherAgent()
        self.risk_agent = EcosystemRiskAgent()
        self.recommendation_agent = RecommendationAgent()
        self.llm_service = LLMReasoningService()

    def run_collaborative_analysis_sync(self, data: EcosystemInput) -> AnalysisResponse:
        """Synchronous core multi-agent reasoning execution."""
        start_time = time.time()
        pipeline_trace = []

        def log_step(step_name: str, detail: str):
            elapsed = time.time() - start_time
            pipeline_trace.append({
                "timestamp": f"{elapsed:.2f}s",
                "step": step_name,
                "detail": detail
            })

        log_step("Data Ingestion & Schema Validation", f"Validated 13 environmental metrics for '{data.location}'.")

        # ---------------------------------------------------------------------
        # PHASE 1: Parallel Specialized Domain Agents Execution
        # ---------------------------------------------------------------------
        log_step("Specialized Agents Dispatch", "Executing Chemistry, Biodiversity, Pollution, and Climate agents.")
        
        chem_out = self.chemistry_agent.analyze(data)
        bio_out = self.biodiversity_agent.analyze(data)
        poll_out = self.pollution_agent.analyze(data)
        clim_out = self.climate_agent.analyze(data)

        domain_outputs: Dict[str, AgentOutput] = {
            "ocean_chemistry": chem_out,
            "marine_biodiversity": bio_out,
            "pollution_detection": poll_out,
            "climate_weather": clim_out,
        }

        log_step(
            "Domain Evaluations Complete",
            f"Scores - Chemistry: {chem_out.score}, Bio: {bio_out.score}, Pollution: {poll_out.score}, Climate: {clim_out.score}."
        )

        # ---------------------------------------------------------------------
        # PHASE 2: Cross-Agent Reasoning & Ecosystem Risk Synthesis
        # ---------------------------------------------------------------------
        log_step("Cross-Agent Synthesis", "Analyzing inter-agent dependencies, correlations, and compound stressors.")
        
        risk_out, cross_obs, compound_threats, influential_factors, composite_score, risk_level, risk_color = (
            self.risk_agent.analyze_collaborative(data, domain_outputs)
        )

        log_step(
            "Risk Assessment Synthesized",
            f"Derived ORCA Score: {composite_score}/100 ({risk_level}). Identified {len(compound_threats)} compound risks."
        )

        # ---------------------------------------------------------------------
        # PHASE 3: Prioritized Recommendation Formulation
        # ---------------------------------------------------------------------
        log_step("Action Formulation", "Recommendation Agent generating prioritized operational and policy interventions.")
        
        rec_out, categorized_recs = self.recommendation_agent.generate_recommendations(
            data=data,
            domain_outputs=domain_outputs,
            composite_score=composite_score,
            compound_risks=compound_threats
        )

        log_step(
            "Recommendations Finalized",
            f"Cataloged {len(categorized_recs['immediate'])} immediate, {len(categorized_recs['short_term'])} short-term, "
            f"and {len(categorized_recs['long_term'])} long-term actions."
        )

        parameter_matrix = self._build_parameter_matrix(data)
        all_agent_results = [chem_out, bio_out, poll_out, clim_out, risk_out, rec_out]
        log_step("Assessment Delivery", f"Finished multi-agent pipeline in {time.time() - start_time:.2f}s.")

        return AnalysisResponse(
            location=data.location,
            latitude=data.latitude or 0.0,
            longitude=data.longitude or 0.0,
            timestamp=datetime.utcnow(),
            input_data=data,
            ecosystem_score=composite_score,
            risk_level=risk_level,
            risk_color=risk_color,
            summary_verdict=risk_out.reasoning,
            agent_results=all_agent_results,
            cross_agent_reasoning=cross_obs,
            compound_risks=compound_threats,
            influential_factors=influential_factors,
            recommendations=categorized_recs,
            parameter_matrix=parameter_matrix,
            pipeline_trace=pipeline_trace,
            reasoning_mode=f"Rule-based & Deterministic Expert Heuristics ({self.llm_service.provider_name})"
        )

    async def run_collaborative_analysis(self, data: EcosystemInput) -> AnalysisResponse:
        """Asynchronous execution with optional LLM enrichment if configured."""
        response = self.run_collaborative_analysis_sync(data)

        if self.llm_service.is_llm_enabled:
            llm_result = await self.llm_service.enrich_ecosystem_assessment(
                location=data.location,
                composite_score=response.ecosystem_score,
                risk_level=response.risk_level,
                compound_risks=response.compound_risks,
                influential_factors=response.influential_factors
            )
            if llm_result and "enhanced_verdict" in llm_result:
                response.summary_verdict = llm_result["enhanced_verdict"]
                response.reasoning_mode = f"LLM-Assisted Collaborative Reasoning ({self.llm_service.provider_name})"
                response.pipeline_trace.append({
                    "timestamp": "+0.1s",
                    "step": "LLM Synthesis Merged",
                    "detail": "Integrated LLM executive verdict into final report."
                })

        return response

    def _build_parameter_matrix(self, d: EcosystemInput) -> List[ParameterRiskItem]:
        """Generates a comparative risk heatmap matrix benchmarked against marine baselines."""
        items = []

        # Temperature
        t_stat, t_sev = ("Optimal", "Low") if 24 <= d.temperature <= 28.5 else ("Moderate Risk", "Moderate") if d.temperature <= 30.0 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="temperature",
            label="Water Temperature",
            value=d.temperature,
            unit="°C",
            normal_range="24.0 – 28.5",
            status=t_stat,
            contributed_risk="Elevated thermal metabolic load / Bleaching threat" if t_stat != "Optimal" else "None",
            severity=t_sev
        ))

        # pH
        p_stat, p_sev = ("Optimal", "Low") if 8.0 <= d.ph <= 8.3 else ("Moderate Risk", "Moderate") if 7.8 <= d.ph < 8.0 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="ph",
            label="pH Level",
            value=d.ph,
            unit="pH",
            normal_range="8.00 – 8.30",
            status=p_stat,
            contributed_risk="Acidification stress / Carbonate dissolution" if p_stat != "Optimal" else "None",
            severity=p_sev
        ))

        # Dissolved Oxygen
        do_stat, do_sev = ("Optimal", "Low") if d.dissolved_oxygen >= 6.0 else ("Moderate Risk", "Moderate") if d.dissolved_oxygen >= 4.0 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="dissolved_oxygen",
            label="Dissolved Oxygen",
            value=d.dissolved_oxygen,
            unit="mg/L",
            normal_range="> 6.0",
            status=do_stat,
            contributed_risk="Hypoxic stress / Fish asphyxiation" if do_stat != "Optimal" else "None",
            severity=do_sev
        ))

        # Salinity
        s_stat, s_sev = ("Optimal", "Low") if 32 <= d.salinity <= 37 else ("Moderate Risk", "Moderate")
        items.append(ParameterRiskItem(
            parameter="salinity",
            label="Salinity",
            value=d.salinity,
            unit="PSU",
            normal_range="32.0 – 37.0",
            status=s_stat,
            contributed_risk="Osmotic imbalance" if s_stat != "Optimal" else "None",
            severity=s_sev
        ))

        # Turbidity
        tu_stat, tu_sev = ("Optimal", "Low") if d.turbidity <= 5.0 else ("Moderate Risk", "Moderate") if d.turbidity <= 15.0 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="turbidity",
            label="Turbidity",
            value=d.turbidity,
            unit="NTU",
            normal_range="0.5 – 5.0",
            status=tu_stat,
            contributed_risk="Light attenuation / Silt gill clogging" if tu_stat != "Optimal" else "None",
            severity=tu_sev
        ))

        # Nitrate
        n_stat, n_sev = ("Optimal", "Low") if d.nitrate <= 1.0 else ("Moderate Risk", "Moderate") if d.nitrate <= 3.5 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="nitrate",
            label="Nitrate (NO3)",
            value=d.nitrate,
            unit="mg/L",
            normal_range="0.1 – 1.0",
            status=n_stat,
            contributed_risk="Eutrophication fuel" if n_stat != "Optimal" else "None",
            severity=n_sev
        ))

        # Phosphate
        po_stat, po_sev = ("Optimal", "Low") if d.phosphate <= 0.05 else ("Moderate Risk", "Moderate") if d.phosphate <= 0.15 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="phosphate",
            label="Phosphate (PO4)",
            value=d.phosphate,
            unit="mg/L",
            normal_range="0.01 – 0.05",
            status=po_stat,
            contributed_risk="Algal bloom stimulant" if po_stat != "Optimal" else "None",
            severity=po_sev
        ))

        # Chlorophyll
        ch_stat, ch_sev = ("Optimal", "Low") if 0.8 <= d.chlorophyll <= 4.0 else ("Moderate Risk", "Moderate") if d.chlorophyll <= 8.0 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="chlorophyll",
            label="Chlorophyll-a",
            value=d.chlorophyll,
            unit="µg/L",
            normal_range="0.8 – 4.0",
            status=ch_stat,
            contributed_risk="Harmful algal bloom bloom risk" if ch_stat != "Optimal" else "None",
            severity=ch_sev
        ))

        # Species Population
        sp_stat, sp_sev = ("Optimal", "Low") if d.species_population >= 800 else ("Moderate Risk", "Moderate") if d.species_population >= 500 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="species_population",
            label="Species Population",
            value=d.species_population,
            unit="Index",
            normal_range="800 – 1200",
            status=sp_stat,
            contributed_risk="Trophic collapse / Biodiversity depletion" if sp_stat != "Optimal" else "None",
            severity=sp_sev
        ))

        # Plastic Pollution
        pl_stat, pl_sev = ("Optimal", "Low") if d.plastic_pollution <= 15 else ("Moderate Risk", "Moderate") if d.plastic_pollution <= 40 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="plastic_pollution",
            label="Plastic Debris",
            value=d.plastic_pollution,
            unit="/100",
            normal_range="0 – 15.0",
            status=pl_stat,
            contributed_risk="Microplastic toxicity & entanglement" if pl_stat != "Optimal" else "None",
            severity=pl_sev
        ))

        # Oil Pollution
        oi_stat, oi_sev = ("Optimal", "Low") if d.oil_pollution <= 5 else ("Moderate Risk", "Moderate") if d.oil_pollution <= 20 else ("Critical", "Severe")
        items.append(ParameterRiskItem(
            parameter="oil_pollution",
            label="Hydrocarbon / Oil",
            value=d.oil_pollution,
            unit="/100",
            normal_range="0 – 5.0",
            status=oi_stat,
            contributed_risk="Toxic petrochemical slick & smothering" if oi_stat != "Optimal" else "None",
            severity=oi_sev
        ))

        return items
