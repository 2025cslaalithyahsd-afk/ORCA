# ORCA – Marine Ecosystem Reasoning with Collaborative Agents

<div align="center">

```
   ____  ____  _________ _ 
  / __ \/ __ \/ ____/   | |
 / / / / /_/ / /   / /| | |
/ /_/ / _, _/ /___/ ___ |_|
\____/_/ |_|\____/_/  |_(_)
```

**AI-Powered Marine Ecosystem Monitoring & Decision-Support Platform**
*Demonstrating Distributed Multi-Agent Collaborative Reasoning Over Oceanographic Telemetry*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg?style=flat&logo=python)](https://python.org)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Build-Vite_6-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20%2F%20SQLAlchemy-003B57.svg?style=flat&logo=sqlite)](https://sqlite.org)

</div>

---

## 1. Project Overview

**ORCA** is an AI-powered environmental intelligence platform engineered to demonstrate how **collaborative specialized AI agents** reason about complex marine ecosystem conditions instead of relying on a single monolithic black-box AI model.

Marine ecosystems are non-linear biogeochemical networks. A single environmental metric in isolation rarely tells the whole story:
- Warm water physically holds less dissolved oxygen (*Henry’s Law*).
- Excessive agricultural nitrogen & phosphorus stimulate microalgal blooms (*eutrophication*).
- When the bloom dies, aerobic bacteria consume virtually all dissolved oxygen, creating an **Anoxic Dead Zone**.
- If sea surface temperatures are concurrently elevated and pH is acidic, corals expel zooxanthellae, causing **Mass Bleaching & Aragonite Skeletal Dissolution**.

ORCA deploys **6 autonomous domain agents** that analyze sensor telemetries in parallel, exchange cross-agent observations, discover compounding crises, and formulate prioritized operational interventions.

---

## 2. Multi-Agent Architecture

```
                    USER INPUT / IOT SENSOR OBSERVATION
                                     ↓
                        Pydantic Schema Validation
                                     ↓
        ┌────────────────────────────────────────────────────────┐
        │              PARALLEL DOMAIN AGENTS                    │
        │                                                        │
        │  [Agent 1: Ocean Chemistry]  [Agent 2: Biodiversity]   │
        │  • Dissolved Oxygen (DO)     • Species Biomass Index   │
        │  • pH & Acidification        • Trophic Cascade Stress  │
        │  • Salinity & Osmotic Shock  • Plankton Balance        │
        │  • Nitrate & Phosphate       • Community Vulnerability │
        │                                                        │
        │  [Agent 3: Pollution Detect] [Agent 4: Climate/Weather]│
        │  • Microplastic Density      • Thermal SST Anomaly     │
        │  • Hydrocarbon/Oil Slicks    • Marine Heatwaves (DHW)  │
        │  • Suspended Silt Turbidity  • Storm Runoff Forcing    │
        └────────────────────────────────────────────────────────┘
                                     ↓
                       CROSS-AGENT REASONING MATRIX
            (Correlations, Consensuses, Discrepancies & Synergies)
                                     ↓
                        [Agent 5: Ecosystem Risk]
        • Synthesizes multi-domain observations
        • Detects compound multi-stressors (e.g. Eutrophic Hypoxia)
        • Computes the ORCA Composite Ecosystem Score (0 - 100)
                                     ↓
                      [Agent 6: Recommendation Agent]
        • Formulates prioritized, staged environmental interventions:
          - Immediate Actions (0 - 48 Hours)
          - Short-Term Actions (1 - 4 Weeks)
          - Long-Term Actions (1 - 12 Months)
                                     ↓
                      SQLAlchemy Storage (SQLite / Postgres)
                                     ↓
                 FastAPI REST API & Interactive React UI
```

### The 6 Specialized Agents
1. **Ocean Chemistry Agent**: Specializes in gas equilibrium (DO), acid-base carbonate buffers (pH), salinity, and macronutrient stoichiometry (NO3, PO4).
2. **Marine Biodiversity Agent**: Benchmarks species census against standard reference baselines (1000 index), detecting trophic degradation and habitat exclusion.
3. **Pollution Detection Agent**: Quantifies anthropogenic plastic waste (0-100), hydrocarbon/oil sheens (0-100), and photic light attenuation from turbidity (NTU).
4. **Climate & Weather Agent**: Evaluates sea surface temperature anomalies (+Δ°C), Degree Heating Weeks, atmospheric heat domes, and cyclonic storm runoff.
5. **Ecosystem Risk Agent**: The collaborative reasoning nexus. Detects cross-domain compound threats, resolves conflicts, applies ecological synergy penalties, and assigns the overall risk classification.
6. **Recommendation Agent**: Formulates categorized, actionable mitigation plans with priority levels, rationale, and expected ecological impacts.

---

## 3. Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, React Router v6, Axios, Recharts, Leaflet, React-Leaflet, Lucide-React.
- **Backend**: Python 3.10+, FastAPI, Pydantic v2, Uvicorn, SQLAlchemy 2.0, HTTPX, Python-Dotenv.
- **Database**: SQLite (local zero-configuration setup, fully swappable to PostgreSQL via `DATABASE_URL`).
- **Reasoning Engine**: Dual-mode architecture:
  - *Mode 1 (Default)*: High-performance deterministic expert heuristic rules engine. **100% operational offline with ZERO API keys required.**
  - *Mode 2 (Optional)*: LLM-assisted narrative enrichment if `GEMINI_API_KEY` or `OPENAI_API_KEY` is provided in `backend/.env`.

---

## 4. Project Structure

```
ORCA/
├── backend/
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base_agent.py             # Abstract base agent class
│   │   ├── chemistry_agent.py        # Agent 1: Ocean Chemistry
│   │   ├── biodiversity_agent.py     # Agent 2: Marine Biodiversity
│   │   ├── pollution_agent.py        # Agent 3: Pollution Detection
│   │   ├── climate_agent.py          # Agent 4: Climate & Weather
│   │   ├── ecosystem_risk_agent.py   # Agent 5: Ecosystem Risk & Synthesis
│   │   └── recommendation_agent.py   # Agent 6: Prioritized Actions
│   ├── reasoning/
│   │   ├── __init__.py
│   │   ├── orchestrator.py           # Master Multi-Agent Pipeline Coordinator
│   │   └── llm_service.py            # Dual-mode offline/LLM reasoning service
│   ├── models/
│   │   ├── __init__.py
│   │   └── analysis.py               # SQLAlchemy models (Analysis, AgentResult)
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── ecosystem.py              # Pydantic validation schemas
│   ├── database/
│   │   ├── __init__.py
│   │   ├── session.py                # Database connection & init_db
│   │   └── seed_data.py              # Realistic sample scenarios & seed records
│   ├── main.py                       # FastAPI application & REST endpoints
│   ├── test_backend.py               # Automated verification test suite
│   ├── requirements.txt              # Python dependencies
│   └── .env.example                  # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Top navigation & live status ping
│   │   │   ├── Footer.jsx            # System attribution & credits
│   │   │   ├── ScoreGauge.jsx        # Luminous circular SVG score meter
│   │   │   ├── AgentCard.jsx         # Domain agent card with accordion reasoning
│   │   │   ├── CollaborativeReasoningGraph.jsx # Neural topology visualization
│   │   │   ├── EnvironmentalCharts.jsx # Recharts water quality, pollution & radar
│   │   │   ├── RiskHeatmap.jsx       # Benchmark parameter comparison matrix
│   │   │   ├── RecommendationsSection.jsx # Immediate, Short-Term, Long-Term tabs
│   │   │   └── PipelineLiveSimulation.jsx # Animated agent execution simulation
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx       # Hero, features, and 6-agent roster
│   │   │   ├── DashboardPage.jsx     # Main stats & 1-click preset sandbox
│   │   │   ├── InputPage.jsx         # Full telemetry form with safety badges
│   │   │   ├── AnalysisPage.jsx      # Master collaborative reasoning report
│   │   │   ├── HistoryPage.jsx       # Longitudinal trends & archive table
│   │   │   ├── MapPage.jsx           # Interactive Leaflet ocean buoy GIS map
│   │   │   └── AboutPage.jsx         # Architecture & transparent formulas
│   │   ├── services/
│   │   │   └── api.js                # Axios client with graceful fallbacks
│   │   ├── utils/
│   │   │   └── formatters.js         # Risk colors, badges, date formatters
│   │   ├── App.jsx                   # React Router route registry
│   │   ├── main.jsx                  # React DOM root mounting
│   │   └── index.css                 # Oceanic glassmorphism & styling
│   ├── index.html                    # HTML5 head with Leaflet & Google fonts
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js                # Vite dev server & backend proxy
│   ├── tailwind.config.js            # Bioluminescent color palette
│   └── postcss.config.js
│
├── README.md                         # Complete documentation
└── .gitignore
```

---

## 5. Getting Started (Step-by-Step)

### Prerequisites
- **Python 3.10+** (Tested on Python 3.14)
- **Node.js v18+** & **npm** (Node v26.8+ tested)

---

### Step 1: Backend Setup & Execution

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment (optional):
   ```bash
   # You can copy .env.example to .env
   cp .env.example .env
   ```
   *Note: If no API keys are configured in `.env`, ORCA automatically runs in its deterministic expert heuristics mode.*

5. Run the backend test verification suite:
   ```bash
   python test_backend.py
   ```
   *You will see the database initialize, 6 global monitoring stations seed automatically, and the 3 scenarios evaluated successfully.*

6. Start the FastAPI backend server:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend will be live at `http://localhost:8000`.
   - Interactive Swagger API Docs: `http://localhost:8000/docs`
   - System Health Check: `http://localhost:8000/api/health`

---

### Step 2: Frontend Setup & Execution

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   The frontend application will be live at `http://localhost:5173`.

---

## 6. How the Frontend Connects to the Backend

The frontend communicates with the backend via `frontend/src/services/api.js`:
- During development, Vite forwards requests from `/api/*` to `http://localhost:8000` via the proxy configured in `vite.config.js`.
- If deploying to staging or production, you can configure the backend URL using the environment variable:
  ```env
  VITE_API_URL=http://localhost:8000/api
  ```
- CORS is enabled on the FastAPI backend for all local development ports (`http://localhost:5173`, `http://127.0.0.1:5173`).

---

## 7. Hackathon Judge Demonstration Walkthrough

When presenting ORCA to judges, follow this flow:

1. **Landing Page (`/`)**:
   - Point out the 6 specialized domain agents in the roster.
   - Explain that ORCA demonstrates **collaborative cross-agent reasoning** instead of relying on a single prompt.

2. **Dashboard (`/dashboard`)**:
   - Showcase the **Instant Hackathon Demonstration Presets** sandbox.
   - Click **Scenario 1: Pristine Coral Sanctuary** → Observe the live multi-agent execution pipeline simulation:
     - `Collecting marine observations...`
     - `Ocean Chemistry Agent analyzing...`
     - `Agents exchanging observations...`
     - Final score: **95-100 / 100 (Excellent)** with harmonious agent consensus.

3. **Try Scenario 3: Critical Hypoxia & Hydrocarbon Spill**:
   - From the Dashboard or Input page, load Scenario 3.
   - Observe how the **Ecosystem Risk Agent** discovers multiple **Compound Stressors**:
     - *Compound Eutrophic Hypoxia*: Temperature > 31°C + DO < 2.5 mg/L + Chlorophyll > 15 µg/L.
     - *Synergistic Reef Degradation*: High Heat + Acidic pH (7.54).
     - *Anthropogenic Smothering*: High Turbidity + Oil Spill + Plastic Debris.
   - Score drops to **Critical (0-37 / 100)** with red warning status.

4. **Inspect the Collaborative Reasoning Graph**:
   - Point out the animated neural SVG topology connecting Chemistry, Biodiversity, Pollution, and Climate agents into the central Risk Engine, feeding downward into the Recommendation Agent.
   - Review the cross-agent observation cards highlighting **Agreement**, **Correlations**, and **Compounding Threats**.

5. **Examine Staged Recommendations**:
   - Switch between **Immediate (0-48h)** (containment booms, emergency aeration), **Short-Term (1-4w)** (agricultural nutrient audit, sediment traps), and **Long-Term (1-12m)** (Marine Protected Area buffer zones).

6. **Explore the Ocean GIS Map (`/map`)**:
   - Show interactive Leaflet ocean buoy markers placed in the Arabian Sea, Great Barrier Reef, Gulf of Mexico, Coral Triangle, North Pacific, and Baltic Sea.
   - Click a buoy to inspect station popups and jump directly to its full assessment.

7. **Historical Records (`/history`)**:
   - Demonstrate the longitudinal health score trend chart over time.
   - Filter records by risk level or search by region.

---

## 8. Example REST API Request

### Post an Ecosystem Assessment (`POST /api/analyze`)

**Request Payload:**
```json
{
  "location": "Arabian Sea - Coastal Zone Alpha",
  "latitude": 18.9220,
  "longitude": 72.8347,
  "temperature": 29.2,
  "ph": 7.92,
  "dissolved_oxygen": 4.8,
  "salinity": 34.6,
  "turbidity": 9.4,
  "nitrate": 2.65,
  "phosphate": 0.12,
  "chlorophyll": 6.8,
  "species_population": 710.0,
  "plastic_pollution": 32.0,
  "oil_pollution": 8.5,
  "weather": "Pre-Monsoon Thermal Inversion"
}
```

**Response Payload (Truncated):**
```json
{
  "id": 7,
  "location": "Arabian Sea - Coastal Zone Alpha",
  "ecosystem_score": 69.2,
  "risk_level": "Moderate Risk",
  "summary_verdict": "The Ecosystem Risk Agent synthesized inputs across Ocean Chemistry (65.0), Biodiversity (73.0), Pollution (69.0), and Climate (70.0)...",
  "agent_results": [
    {
      "agent_name": "Ocean Chemistry Agent",
      "agent_id": "ocean_chemistry",
      "score": 65.0,
      "status": "Moderate Risk",
      "findings": [
        "Moderate hypoxia warning: Dissolved Oxygen dropped to 4.8 mg/L (< 5.0 mg/L threshold).",
        "Slight ocean acidification trend observed at pH 7.92.",
        "Salinity is normal at 34.6 PSU for open marine waters.",
        "Elevated nutrient loading: Nitrate 2.65 mg/L, Phosphate 0.12 mg/L."
      ]
    }
  ],
  "cross_agent_reasoning": [],
  "compound_risks": [],
  "recommendations": {
    "immediate": [...],
    "short_term": [...],
    "long_term": [...]
  }
}
```

---

## 9. Scoring System & Mathematical Formula

The **ORCA Composite Ecosystem Score** is a transparent index from 0 to 100:

$$\text{Base Score} = (S_{\text{chem}} \times 0.25) + (S_{\text{bio}} \times 0.25) + (S_{\text{poll}} \times 0.25) + (S_{\text{clim}} \times 0.25)$$

$$\text{Composite Score} = \text{clamp}\Big(\text{Base Score} - \text{Synergy Penalty},\; 0,\; 100\Big)$$

### Synergy Penalty Matrix
When natural ecosystems experience multiple simultaneous stressors, their vulnerability compounds non-linearly:
- **1 Compound Stressor**: $-3.0$ points
- **2 Compound Stressors**: $-7.0$ points
- **3+ Compound Stressors**: $-12.0$ points

### Risk Classification Tiers
| Composite Score | Classification | Status Color | Ecological State |
| :--- | :--- | :--- | :--- |
| **88 – 100** | **Excellent** | Emerald (`#10b981`) | Pristine ecological balance, resilient trophic guilds |
| **75 – 87** | **Healthy** | Cyan (`#06b6d4`) | Stable life-support functions, minor localized variance |
| **58 – 74** | **Moderate Risk** | Amber (`#f59e0b`) | Noticeable biological stress; early mitigation advised |
| **38 – 57** | **High Risk** | Orange (`#f97316`) | Severe chronic multi-stressor impairment |
| **0 – 37** | **Critical Alert** | Red (`#ef4444`) | Imminent dead zone / acute collapse requiring emergency response |

---

## 10. Troubleshooting & FAQ

**Q1: What if I don't have an OpenAI or Gemini API key?**
> You do NOT need any API key! ORCA comes with a comprehensive, deterministic rule-based ecological reasoning engine built directly into Python. It runs 100% locally and offline.

**Q2: The frontend says "Engine Connecting..." on the top bar.**
> Ensure the FastAPI backend is running on `http://localhost:8000`. You can test it by opening `http://localhost:8000/api/health` in your browser.

**Q3: How do I change from SQLite to PostgreSQL?**
> Set `DATABASE_URL=postgresql://user:password@localhost:5432/orca_db` in `backend/.env`. SQLAlchemy will automatically handle connection pooling and tables.

**Q4: Port 8000 or 5173 is already in use.**
> Backend: Start Uvicorn on another port: `uvicorn main:app --port 8001`. Update `vite.config.js` proxy or `VITE_API_URL` accordingly.
> Frontend: Vite will automatically prompt to use port 5174 or specify `npm run dev -- --port 3000`.

---

## 11. Academic Attribution & License

Developed for national-level college hackathon demonstration of **Collaborative Multi-Agent Systems in Environmental Intelligence**.
Distributed under the MIT Open Source License.
