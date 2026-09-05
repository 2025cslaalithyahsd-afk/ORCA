from agents.base_agent import BaseAgent
from schemas.ecosystem import EcosystemInput, AgentOutput

class ClimateWeatherAgent(BaseAgent):
    """
    Agent 4 – Climate & Weather Agent
    Specializes in sea surface temperature anomalies, marine heatwaves,
    atmospheric weather interactions, and thermal stratification dynamics.
    """

    BASELINE_TEMP = 26.0  # Reference baseline sea surface temperature in °C

    def __init__(self):
        super().__init__(
            agent_id="climate_weather",
            agent_name="Climate & Weather Agent",
            icon="CloudSun"
        )

    def analyze(self, data: EcosystemInput) -> AgentOutput:
        findings = []
        risks = []
        recommendations = []
        deductions = 0.0

        temp = data.temperature
        anomaly = temp - self.BASELINE_TEMP
        weather_lower = data.weather.lower()

        # 1. Thermal Anomaly Evaluation (Marine Heatwave Proxy)
        if 23.0 <= temp <= 28.0:
            findings.append(f"Water temperature is optimal at {temp:.1f}°C (Delta: {anomaly:+.1f}°C relative to baseline).")
        elif 28.0 < temp <= 29.5:
            findings.append(f"Mild thermal elevation ({temp:.1f}°C, {anomaly:+.1f}°C above seasonal norm).")
            risks.append("Slight metabolic acceleration in ectothermic marine organisms.")
            deductions += 10.0
        elif 29.5 < temp <= 31.5:
            findings.append(f"MARINE HEATWAVE WARNING: Temperature reached {temp:.1f}°C ({anomaly:+.1f}°C anomaly).")
            risks.append("Thermal threshold crossing for symbiotic zooxanthellae; imminent coral bleaching risk.")
            deductions += 30.0
        elif temp > 31.5:
            findings.append(f"EXTREME MARINE HEATWAVE: Severe ocean warming at {temp:.1f}°C ({anomaly:+.1f}°C anomaly).")
            risks.append("Catastrophic mass thermal bleaching, mortality of fragile corals, and intense thermocline barrier.")
            deductions += 50.0
        else: # temp < 23.0
            findings.append(f"Unusually cool sea surface temperature ({temp:.1f}°C, {anomaly:+.1f}°C below norm).")
            if "upwelling" in weather_lower:
                findings.append("Signature indicates deep-water nutrient upwelling.")
            else:
                deductions += 12.0

        # 2. Weather & Atmospheric Forcing
        if any(w in weather_lower for w in ["heatwave", "scorching", "hot"]):
            findings.append("Atmospheric high-pressure heat dome suppresses evaporative cooling and wind mixing.")
            risks.append("Strong thermal stratification traps oxygen-depleted bottom waters.")
            deductions += 15.0
        elif any(w in weather_lower for w in ["storm", "cyclone", "typhoon", "gale"]):
            findings.append("Violent cyclonic wave agitation causing physical reef shearing and heavy turbidity resuspension.")
            risks.append("Massive terrestrial sediment discharge and stormwater runoff spikes.")
            deductions += 18.0
        elif any(w in weather_lower for w in ["rain", "runoff", "precipitation"]):
            findings.append("Heavy rainfall induces surface freshwater lens and delivers agricultural nutrient wash-off.")
            deductions += 10.0
        elif any(w in weather_lower for w in ["calm", "still", "stagnant"]):
            if temp > 28.5:
                findings.append("Low wind velocities prevent mechanical surface aeration during peak thermal loading.")
                risks.append("Accelerated nocturnal hypoxia development in stagnant embayments.")
                deductions += 10.0
            else:
                findings.append("Stable calm atmospheric conditions with baseline surface exchange.")

        score = self.clamp_score(100.0 - deductions)
        status, severity = self.determine_status_severity(score)

        if temp > 29.5:
            recommendations.append("Activate NOAA Coral Reef Watch Degree Heating Week (DHW) thermal tracking protocol.")
            recommendations.append("Restrict thermal effluent discharges from coastal power generation plants.")
        if "storm" in weather_lower or "rain" in weather_lower:
            recommendations.append("Deploy storm surge turbidity booms and close coastal shellfish harvesting zones temporarily.")
        if not recommendations:
            recommendations.append("Maintain satellite radiometer thermal anomaly surveillance.")

        reasoning = (
            f"Climate analysis correlates sea surface temperature ({temp:.1f}°C, anomaly {anomaly:+.1f}°C) with "
            f"atmospheric synoptic state ('{data.weather}'). "
            f"The climate stress factor is categorized as {status} (Score: {score}/100) with {severity.lower()} hazard."
        )

        return AgentOutput(
            agent_name=self.agent_name,
            agent_id=self.agent_id,
            icon=self.icon,
            score=score,
            status=status,
            severity=severity,
            confidence=92.0,
            findings=findings,
            risks=risks,
            reasoning=reasoning,
            recommendations=recommendations,
            metrics={
                "temperature": temp,
                "thermal_anomaly": round(anomaly, 1),
                "weather_state": data.weather
            }
        )
