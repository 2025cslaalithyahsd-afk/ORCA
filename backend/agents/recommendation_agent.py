from typing import Dict, List, Tuple
from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput, RecommendationItem

class RecommendationAgent(BaseAgent):
    """
    Agent 6 – Recommendation Agent
    Reads telemetry and findings from all prior agents to curate prioritized,
    contextual environmental interventions categorized into Immediate (0-48h),
    Short-Term (1-4w), and Long-Term (1-12m) horizons.
    """

    def __init__(self):
        super().__init__(
            agent_id="recommendation_agent",
            agent_name="Recommendation Agent",
            icon="Compass"
        )

    def generate_recommendations(
        self,
        data: EcosystemInput,
        domain_outputs: Dict[str, AgentOutput],
        composite_score: float,
        compound_risks: List[str]
    ) -> Tuple[AgentOutput, Dict[str, List[RecommendationItem]]]:
        immediate: List[RecommendationItem] = []
        short_term: List[RecommendationItem] = []
        long_term: List[RecommendationItem] = []

        rec_counter = 1

        # -------------------------------------------------------------------------
        # IMMEDIATE INTERVENTIONS (0 - 48 Hours)
        # -------------------------------------------------------------------------
        if data.oil_pollution >= 20.0:
            immediate.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Mobilize Hydrocarbon Spill Containment & Skimming Fleet",
                timeframe="Immediate",
                priority="Critical",
                agent_source="Pollution Detection Agent",
                reason=f"Detected significant hydrocarbon concentration ({data.oil_pollution:.1f}/100) presenting toxic smothering threat.",
                expected_impact="Constrain surface slick boundary within 12 hours and prevent coastal intertidal fouling.",
                steps=[
                    "Deploy pneumatic containment booms around the primary slick perimeter.",
                    "Dispatch mechanical weir skimmers and sorbent recovery barges.",
                    "Broadcast mariners' advisory to divert commercial traffic away from the containment sector."
                ]
            ))
            rec_counter += 1

        if data.dissolved_oxygen < 4.0:
            immediate.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Deploy Emergency Artificial Aeration & Issue Fish Kill Watch",
                timeframe="Immediate",
                priority="Critical",
                agent_source="Ocean Chemistry Agent",
                reason=f"Dissolved oxygen levels ({data.dissolved_oxygen:.1f} mg/L) have breached acute hypoxia thresholds.",
                expected_impact="Provide localized oxygen refuge zones for juvenile and sedentary benthic species.",
                steps=[
                    "Position solar-powered venturi micro-bubble aeration units in sheltered embayments.",
                    "Alert local fisheries enforcement to halt all bottom trawl operations in the affected basin.",
                    "Initiate continuous 30-minute automated DO dissolved oxygen profiling at depth."
                ]
            ))
            rec_counter += 1

        if data.temperature >= 30.0:
            immediate.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Initiate Marine Heatwave Bleaching Response Protocol",
                timeframe="Immediate",
                priority="High",
                agent_source="Climate & Weather Agent",
                reason=f"Water temperature at {data.temperature:.1f}°C induces severe thermal stress on symbiotic organisms.",
                expected_impact="Minimize auxiliary anthropogenic stress during peak solar and thermal exposure hours.",
                steps=[
                    "Issue recreational diving and boating advisory to limit reef physical contact.",
                    "Coordinate with coastal power stations to modulate cooling-water thermal effluent plume discharge."
                ]
            ))
            rec_counter += 1

        if not immediate:
            immediate.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Verify Automated In-Situ Sensor Calibrations",
                timeframe="Immediate",
                priority="Low",
                agent_source="Recommendation Agent",
                reason="Environmental parameters are within stable operational parameters.",
                expected_impact="Ensure continuous telemetry accuracy and eliminate zero-drift optical errors.",
                steps=[
                    "Execute standard diagnostic loop across optical DO and turbidity sensors.",
                    "Cross-check satellite SST matching against local buoy data."
                ]
            ))
            rec_counter += 1

        # -------------------------------------------------------------------------
        # SHORT-TERM INTERVENTIONS (1 - 4 Weeks)
        # -------------------------------------------------------------------------
        if data.nitrate > 3.0 or data.phosphate > 0.1 or data.chlorophyll > 8.0:
            short_term.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Watershed Nutrient Catchment Audit & Agricultural Runoff Curb",
                timeframe="Short-Term",
                priority="High",
                agent_source="Ocean Chemistry Agent",
                reason=f"Elevated Nitrate ({data.nitrate:.2f} mg/L) and Phosphate ({data.phosphate:.2f} mg/L) driving eutrophication.",
                expected_impact="Reduce downstream dissolved reactive phosphorus and inorganic nitrogen influx by 35%.",
                steps=[
                    "Inspect agricultural runoff drainage canals and mandate retention pond settling.",
                    "Audit municipal wastewater treatment effluent for secondary nutrient stripping compliance."
                ]
            ))
            rec_counter += 1

        if data.plastic_pollution >= 30.0:
            short_term.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Install Estuarine Debris Interceptors & River Mouth Traps",
                timeframe="Short-Term",
                priority="High",
                agent_source="Pollution Detection Agent",
                reason=f"Plastic pollution index ({data.plastic_pollution:.1f}/100) indicates significant uncontained riverine inflow.",
                expected_impact="Intercept macro-plastics before marine fragmentation into irreversible microplastics.",
                steps=[
                    "Install hydrodynamic trash booms at key river discharge bottlenecks.",
                    "Organize weekly coastal cleanup brigades targeting tidal debris deposition hotspots."
                ]
            ))
            rec_counter += 1

        if data.species_population < 750.0:
            short_term.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Comprehensive eDNA Spatial Biodiversity Survey",
                timeframe="Short-Term",
                priority="Medium",
                agent_source="Marine Biodiversity Agent",
                reason=f"Species population count ({data.species_population:.0f}) reflects significant community loss.",
                expected_impact="Identify exact taxonomic guilds experiencing population collapse to target protection.",
                steps=[
                    "Collect water column eDNA filter samples across a 5km stratified grid.",
                    "Map biomass recovery corridors and identify key nursery habitats."
                ]
            ))
            rec_counter += 1

        if not short_term:
            short_term.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Biannual Habitat Health Assessment & Macroalgal Census",
                timeframe="Short-Term",
                priority="Low",
                agent_source="Marine Biodiversity Agent",
                reason="Ecosystem functions remain healthy; routine validation sustains baseline trends.",
                expected_impact="Maintains continuous longitudinal ecological datasets.",
                steps=[
                    "Deploy diver photographic transects across benthic substrate.",
                    "Verify seagrass bed canopy density and epiphytic algal growth."
                ]
            ))
            rec_counter += 1

        # -------------------------------------------------------------------------
        # LONG-TERM INTERVENTIONS (1 - 12 Months)
        # -------------------------------------------------------------------------
        if composite_score < 70.0 or data.ph < 7.9:
            long_term.append(RecommendationItem(
                id=f"REC-{rec_counter:03d}",
                title="Establish Legally Enforced Marine Protected Area (MPA) Buffer Zone",
                timeframe="Long-Term",
                priority="High",
                agent_source="Ecosystem Risk Agent",
                reason="Cumulative chronic multi-stressors threaten long-term regional ecological resilience.",
                expected_impact="Provide refuge for benthic recovery, replenishment of broodstock, and natural carbon sequestration.",
                steps=[
                    "Draft geospatial boundary designations prohibiting destructive bottom-contact gear.",
                    "Integrate community artisanal fishers into co-management stewardship councils."
                ]
            ))
            rec_counter += 1

        long_term.append(RecommendationItem(
            id=f"REC-{rec_counter:03d}",
            title="Seagrass & Mangrove Blue Carbon Habitat Restoration",
            timeframe="Long-Term",
            priority="Medium",
            agent_source="Recommendation Agent",
            reason="Natural coastal vegetated habitats buffer wave energy, filter sediment turbidity, and draw down CO2.",
            expected_impact="Elevates localized pH buffering, stabilizes sediment substrates, and expands nursery habitat.",
            steps=[
                "Re-plant indigenous Posidonia / Zostera seagrass plugs in degraded subtidal zones.",
                "Construct fringing mangrove living shorelines to trap agricultural sediment plumes."
            ]
        ))
        rec_counter += 1

        long_term.append(RecommendationItem(
            id=f"REC-{rec_counter:03d}",
            title="Deploy Continuous Autonomous IoT Ocean Buoy Network",
            timeframe="Long-Term",
            priority="Medium",
            agent_source="Recommendation Agent",
            reason="Continuous multi-parameter data streams enhance predictive machine learning early warnings.",
            expected_impact="Provide real-time telemetry updates to the ORCA collaborative agent pipeline.",
            steps=[
                "Anchor smart solar-powered oceanographic buoys equipped with multiparameter sondes.",
                "Establish LoRaWAN/Satellite telemetry pipelines into regional environmental ministries."
            ]
        ))

        categorized_recs = {
            "immediate": immediate,
            "short_term": short_term,
            "long_term": long_term
        }

        agent_output = AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=min(100.0, composite_score + 10.0),
            status="Active Guidance",
            severity="Low",
            confidence=95.0,
            findings=[
                f"Generated {len(immediate)} immediate, {len(short_term)} short-term, and {len(long_term)} long-term interventions.",
                f"Prioritized actions specifically addressing {len(compound_risks)} compounding environmental threats."
            ],
            risks=[],
            reasoning=(
                "The Recommendation Agent synthesized outputs from all 5 preceding domain agents. "
                "Actions are stratified across emergency mitigation (0-48h), catchment remediation (1-4w), "
                "and systemic policy governance (1-12m) to deliver a pragmatic, staged recovery pathway."
            ),
            recommendations=[r.title for r in immediate + short_term],
            metrics={
                "immediate_count": len(immediate),
                "short_term_count": len(short_term),
                "long_term_count": len(long_term)
            }
        )

        return agent_output, categorized_recs

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=90.0,
            status="Active Guidance",
            severity="Low",
            confidence=90.0,
            findings=["Standard decision-support template."],
            risks=[],
            reasoning="Standing by for upstream multi-agent telemetry.",
            recommendations=["Initiate collaborative reasoning workflow."]
        )
