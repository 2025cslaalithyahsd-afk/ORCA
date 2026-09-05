import asyncio
from database.session import init_db, SessionLocal
from database.seed_data import SAMPLE_SCENARIOS
from reasoning.orchestrator import ReasoningOrchestrator
from models.analysis import Analysis

async def test_agents_and_orchestrator():
    print("=== 1. Initializing Database ===")
    init_db()
    
    db = SessionLocal()
    count = db.query(Analysis).count()
    print(f"Database initialized. Seeded Analysis count: {count}")
    assert count > 0, "Expected database to have seeded analyses"
    
    print("\n=== 2. Testing Reasoning Orchestrator ===")
    orchestrator = ReasoningOrchestrator()
    
    for key, scenario in SAMPLE_SCENARIOS.items():
        print(f"\n--- Running Scenario: {key.upper()} ({scenario.location}) ---")
        result = await orchestrator.run_collaborative_analysis(scenario)
        print(f"Composite Score: {result.ecosystem_score}/100 | Risk Level: {result.risk_level}")
        print(f"Active Agents Evaluated: {len(result.agent_results)}")
        print(f"Cross-Agent Observations: {len(result.cross_agent_reasoning)}")
        print(f"Compound Threats: {result.compound_risks}")
        print(f"Immediate Recommendations: {len(result.recommendations['immediate'])}")
        print(f"Short-Term Recommendations: {len(result.recommendations['short_term'])}")
        print(f"Long-Term Recommendations: {len(result.recommendations['long_term'])}")
        print(f"Reasoning Mode: {result.reasoning_mode}")

    print("\n=== ALL BACKEND AGENT & REASONING TESTS PASSED SUCCESSFULLY! ===")
    db.close()

if __name__ == "__main__":
    asyncio.run(test_agents_and_orchestrator())
