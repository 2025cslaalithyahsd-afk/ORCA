from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput

class PollutionDetectionAgent(BaseAgent):
    """
    Agent 3 – Pollution Detection Agent
    Specializes in anthropogenic contaminants including micro/macro plastic waste,
    hydrocarbon/petrochemical spills, and suspended sediment turbidity.
    """

    def __init__(self):
        super().__init__(
            agent_id="pollution_detection",
            agent_name="Pollution Detection Agent",
            icon="Trash2"
        )

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        findings = []
        risks = []
        recommendations = []
        deductions = 0.0

        # 1. Plastic Pollution Severity (0 to 100 Index)
        plastics = data.plastic_pollution
        if plastics < 15.0:
            findings.append(f"Plastic debris index is low ({plastics:.1f}/100); background marine litter within baseline limits.")
        elif 15.0 <= plastics < 40.0:
            findings.append(f"Moderate plastic concentration ({plastics:.1f}/100) observed in surface waters and coastal wrack line.")
            risks.append("Risk of ingestion by turtles, seabirds, and marine mammals mistaking debris for prey.")
            deductions += 15.0
        elif 40.0 <= plastics < 70.0:
            findings.append(f"High plastic contamination ({plastics:.1f}/100): Extensive microplastic fragmentation detected.")
            risks.append("Bioaccumulation of phthalates and persistent organic pollutants (POPs) up the marine food chain.")
            deductions += 35.0
        else:
            findings.append(f"SEVERE PLASTIC SATURATION ({plastics:.1f}/100): Dense plastic gyre accumulation.")
            risks.append("Pervasive ghost-gear entanglement hazards and benthic smothering of nursery grounds.")
            deductions += 50.0

        # 2. Hydrocarbon / Oil Pollution (0 to 100 Index)
        oil = data.oil_pollution
        if oil < 5.0:
            findings.append(f"Hydrocarbon presence is negligible ({oil:.1f}/100); no active petrochemical slicks identified.")
        elif 5.0 <= oil < 20.0:
            findings.append(f"Trace oil sheen detected ({oil:.1f}/100), consistent with routine commercial shipping bilge discharge.")
            risks.append("Localized surface tension reduction and mild plumage disruption for seabirds.")
            deductions += 15.0
        elif 20.0 <= oil < 50.0:
            findings.append(f"Elevated oil contamination ({oil:.1f}/100): Visible iridescent slick and dissolved aromatic fractions.")
            risks.append("Acute cellular toxicity to pelagic fish larvae and disruption of coral gamete viability.")
            deductions += 35.0
        else:
            findings.append(f"CRITICAL OIL SPILL EMERGENCY ({oil:.1f}/100): Heavy unrefined/bunker hydrocarbon layer.")
            risks.append("Severe anoxic smothering of intertidal habitats and mass mortality across coastal wildlife.")
            deductions += 55.0

        # 3. Turbidity / Suspended Particulates (NTU)
        turb = data.turbidity
        if turb <= 5.0:
            findings.append(f"Water clarity is excellent (Turbidity: {turb:.1f} NTU); ample photic zone penetration.")
        elif 5.0 < turb <= 15.0:
            findings.append(f"Moderate turbidity ({turb:.1f} NTU) indicating mild suspended sediment or plankton density.")
            deductions += 8.0
        elif 15.0 < turb <= 30.0:
            findings.append(f"High turbidity ({turb:.1f} NTU): Significant light attenuation limiting photosynthesis.")
            risks.append("Reduced light reach to zooxanthellae corals and sub-aquatic vegetation (seagrass meadows).")
            deductions += 20.0
        else:
            findings.append(f"Extreme turbidity ({turb:.1f} NTU): Heavy sediment slurry or dredging plume.")
            risks.append("Physical smothering of coral polyps and abrasive scouring of benthic substrates.")
            deductions += 35.0

        score = self.clamp_score(100.0 - deductions)
        status, severity = self.determine_status_severity(score)

        if oil >= 20.0:
            recommendations.append("Mobilize containment booms, skimmers, and sorbent barriers to arrest hydrocarbon slick spread.")
            recommendations.append("Notify maritime safety authorities and trace vessel AIS transponders for illicit bilge flushing.")
        if plastics >= 40.0:
            recommendations.append("Deploy ocean cleanup boom interceptors and enhance coastal catchment trash traps.")
        if turb >= 15.0:
            recommendations.append("Enforce sediment runoff traps and inspect coastal dredging and river mouth operations.")
        if not recommendations:
            recommendations.append("Maintain routine satellite synthetic aperture radar (SAR) monitoring for offshore discharges.")

        reasoning = (
            f"Pollution audit incorporates anthropogenic polymers ({plastics:.1f}/100), hydrocarbon burden ({oil:.1f}/100), "
            f"and photic turbidity ({turb:.1f} NTU). "
            f"Total environmental purity index stands at {score}/100, designated as {status}."
        )

        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=score,
            status=status,
            severity=severity,
            confidence=95.0,
            findings=findings,
            risks=risks,
            reasoning=reasoning,
            recommendations=recommendations,
            metrics={
                "plastic_pollution": plastics,
                "oil_pollution": oil,
                "turbidity": turb
            }
        )
