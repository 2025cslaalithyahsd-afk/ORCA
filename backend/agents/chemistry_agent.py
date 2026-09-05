from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput

class OceanChemistryAgent(BaseAgent):
    """
    Agent 1 – Ocean Chemistry Agent
    Specializes in water chemistry, pH balance, dissolved oxygen dynamics,
    salinity gradients, and nutrient stoichiometry (Nitrate/Phosphate).
    """

    def __init__(self):
        super().__init__(
            agent_id="ocean_chemistry",
            agent_name="Ocean Chemistry Agent",
            icon="FlaskConical"
        )

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        findings = []
        risks = []
        recommendations = []
        deductions = 0.0

        # 1. Dissolved Oxygen (DO) Evaluation (Major life support parameter)
        do = data.dissolved_oxygen
        if do >= 6.5:
            findings.append(f"Dissolved Oxygen is robust at {do:.1f} mg/L, fully sustaining pelagic and benthic aerobic respiration.")
        elif 5.0 <= do < 6.5:
            findings.append(f"Dissolved Oxygen is acceptable at {do:.1f} mg/L, but entering mild biological demand zone.")
            deductions += 10.0
        elif 3.5 <= do < 5.0:
            findings.append(f"Moderate hypoxia warning: Dissolved Oxygen dropped to {do:.1f} mg/L (< 5.0 mg/L threshold).")
            risks.append("Sub-lethal physiological stress for fish and sensitive macro-invertebrates.")
            deductions += 25.0
        elif 2.0 <= do < 3.5:
            findings.append(f"Severe hypoxia detected at {do:.1f} mg/L. Mobile species are actively fleeing the water column.")
            risks.append("Acute asphyxiation risk and imminent local benthic mortality.")
            deductions += 45.0
        else:
            findings.append(f"CRITICAL ANOXIA: Dissolved Oxygen is {do:.1f} mg/L (< 2.0 mg/L Dead Zone criterion).")
            risks.append("Complete dead zone state with hydrogen sulfide anaerobic production risk.")
            deductions += 65.0

        # 2. pH Evaluation (Ocean Acidification)
        ph = data.ph
        if 8.0 <= ph <= 8.3:
            findings.append(f"pH level is optimal at {ph:.2f}, within standard oceanic buffering equilibrium.")
        elif 7.8 <= ph < 8.0:
            findings.append(f"Slight ocean acidification trend observed at pH {ph:.2f}.")
            risks.append("Mild reduction in carbonate ion availability for calcifying organisms.")
            deductions += 10.0
        elif 7.5 <= ph < 7.8:
            findings.append(f"Acidification stress alert: pH dropped to {ph:.2f}.")
            risks.append("Significant impairment to coral calcification, pteropods, and bivalve shell integrity.")
            deductions += 25.0
        elif ph < 7.5:
            findings.append(f"Severe chemical imbalance: Acidic pH of {ph:.2f}.")
            risks.append("High toxicity to larval stages and rapid dissolution of calcium carbonate structures.")
            deductions += 40.0
        else: # ph > 8.3
            findings.append(f"Alkaline drift detected at pH {ph:.2f}, often driven by intense diurnal photosynthetic carbon drawdown.")
            deductions += 12.0

        # 3. Salinity Evaluation
        sal = data.salinity
        if 32.0 <= sal <= 37.0:
            findings.append(f"Salinity is normal at {sal:.1f} PSU for open marine waters.")
        elif 25.0 <= sal < 32.0:
            findings.append(f"Brackish/freshened salinity detected ({sal:.1f} PSU), signaling substantial riverine runoff or monsoonal discharge.")
            risks.append("Osmotic stress on stenohaline marine flora and fauna.")
            deductions += 10.0
        elif sal < 25.0:
            findings.append(f"Extreme freshwater influx: Salinity at {sal:.1f} PSU.")
            risks.append("Severe osmotic disruption and potential stratification halocline formation.")
            deductions += 22.0
        else:
            findings.append(f"Hypersaline conditions detected at {sal:.1f} PSU (excessive evaporation or brine effluent).")
            risks.append("High salinity induces hyperosmotic stress on larval stages.")
            deductions += 15.0

        # 4. Nutrients & Eutrophication Potential (Nitrate + Phosphate)
        no3 = data.nitrate
        po4 = data.phosphate
        chla = data.chlorophyll

        nutrient_load = 0
        if no3 > 3.0 or po4 > 0.1:
            nutrient_load += 1
        if no3 > 6.0 or po4 > 0.25:
            nutrient_load += 1

        if nutrient_load == 0:
            findings.append(f"Nutrient levels are oligotrophic/balanced (Nitrate: {no3:.2f} mg/L, Phosphate: {po4:.2f} mg/L).")
        elif nutrient_load == 1:
            findings.append(f"Elevated nutrient loading: Nitrate {no3:.2f} mg/L, Phosphate {po4:.2f} mg/L.")
            risks.append("Moderate enrichment risk; may fuel opportunistic microalgae.")
            deductions += 15.0
        else:
            findings.append(f"Excessive eutrophic nutrient saturation: Nitrate {no3:.2f} mg/L, Phosphate {po4:.2f} mg/L.")
            risks.append("High eutrophication threat: fuels massive algal blooms followed by nocturnal oxygen collapse.")
            deductions += 30.0

        # Thermal solubility interaction
        if data.temperature > 29.5 and do < 5.0:
            risks.append(f"Thermodynamic exacerbation: Elevated water temperature ({data.temperature:.1f}°C) physically restricts oxygen saturation capacity.")
            deductions += 10.0

        # Compile score and status
        score = self.clamp_score(100.0 - deductions)
        status, severity = self.determine_status_severity(score)

        # Synthesize domain recommendations
        if do < 5.0:
            recommendations.append("Deploy continuous real-time dissolved oxygen optical sensors across multiple depth stratifications.")
        if no3 > 3.0 or po4 > 0.1:
            recommendations.append("Identify and regulate point-source agricultural and municipal nutrient discharges in the upstream watershed.")
        if ph < 7.8:
            recommendations.append("Initiate local alkalinity enhancement monitoring and assess total dissolved inorganic carbon (DIC).")
        if not recommendations:
            recommendations.append("Maintain baseline water quality bi-weekly monitoring protocol.")

        reasoning = (
            f"Ocean Chemistry analysis assesses hydrochemical integrity based on gas equilibrium (DO {do:.1f} mg/L), "
            f"acid-base balance (pH {ph:.2f}), ionic salinity ({sal:.1f} PSU), and macronutrient stoichiometry "
            f"(NO3 {no3:.2f} mg/L, PO4 {po4:.2f} mg/L). "
            f"Overall chemistry is classified as {status} (Score: {score}/100) with {severity.lower()} environmental concern."
        )

        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=score,
            status=status,
            severity=severity,
            confidence=94.0 if len(findings) >= 3 else 85.0,
            findings=findings,
            risks=risks,
            reasoning=reasoning,
            recommendations=recommendations,
            metrics={
                "dissolved_oxygen": do,
                "ph": ph,
                "salinity": sal,
                "nitrate": no3,
                "phosphate": po4,
                "chlorophyll": chla
            }
        )
