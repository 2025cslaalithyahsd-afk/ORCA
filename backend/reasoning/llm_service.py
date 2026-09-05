import os
import json
from typing import Optional, Dict, Any
import httpx
from dotenv import load_dotenv

load_dotenv()

class LLMReasoningService:
    """
    Dual-Mode Reasoning Service:
    Provides an abstraction layer supporting both deterministic local heuristics
    and optional LLM-assisted narrative enrichment (Gemini or OpenAI).
    The system NEVER fails if API keys are absent.
    """

    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
        self.openai_key = os.getenv("OPENAI_API_KEY", "").strip()

    @property
    def is_llm_enabled(self) -> bool:
        return bool(self.gemini_key or self.openai_key)

    @property
    def provider_name(self) -> str:
        if self.gemini_key:
            return "Google Gemini (Active)"
        if self.openai_key:
            return "OpenAI (Active)"
        return "Deterministic Expert Heuristics (Local Engine)"

    async def enrich_ecosystem_assessment(
        self,
        location: str,
        composite_score: float,
        risk_level: str,
        compound_risks: list[str],
        influential_factors: list[str]
    ) -> Optional[Dict[str, Any]]:
        """
        Optionally enhances the collaborative reasoning narrative using an LLM
        if an API key is present. Gracefully falls back if any request fails or times out.
        """
        if not self.is_llm_enabled:
            return None

        prompt = (
            f"You are the ORCA Marine Ecological Reasoning Engine. Provide a concise, scientific, 2-sentence "
            f"collaborative executive verdict for an ocean assessment in '{location}'.\n"
            f"Composite Ecosystem Score: {composite_score}/100 ({risk_level}).\n"
            f"Detected Compound Risks: {', '.join(compound_risks) if compound_risks else 'None'}.\n"
            f"Primary Influential Factors: {', '.join(influential_factors)}.\n"
            f"Return JSON format with a single key 'enhanced_verdict'."
        )

        try:
            if self.gemini_key:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"response_mime_type": "application/json"}
                }
                async with httpx.AsyncClient(timeout=4.0) as client:
                    resp = await client.post(url, json=payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        return json.loads(text)

            elif self.openai_key:
                url = "https://api.openai.com/v1/chat/completions"
                headers = {"Authorization": f"Bearer {self.openai_key}"}
                payload = {
                    "model": "gpt-4o-mini",
                    "messages": [{"role": "user", "content": prompt}],
                    "response_format": {"type": "json_object"}
                }
                async with httpx.AsyncClient(timeout=4.0) as client:
                    resp = await client.post(url, json=payload, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["choices"][0]["message"]["content"]
                        return json.loads(text)

        except Exception as e:
            # Silent fallback to local deterministic mode
            print(f"[ORCA LLM Service] Fallback to local heuristic engine due to: {e}")
            return None

        return None
