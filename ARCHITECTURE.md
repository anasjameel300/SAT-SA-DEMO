# System Architecture: SAT-SA Platform

**Supervisory Analytics Tool for SOC Assessment (SAT-SA)**  
*National Critical Information Infrastructure Protection Centre (NCIIPC) — Regulatory Compliance Engine under Section 70A, Information Technology Act.*

---

## 1. Architectural Philosophy & Scope Boundaries

In accordance with national cybersecurity directives, NCIIPC does not function as an active SIEM or live packet capture (PCAP) monitoring station. Instead, SAT-SA operates as a **supervisory auditing system** designed to evaluate aggregated, periodic batch telemetry submitted by Critical Sector Entities (CSEs) across Power, Banking, Telecom, Transport, and Defence.

### Core Architectural Guarantees
1. **100% Air-Gapped & Offline Execution:** SAT-SA executes completely within isolated supervisory chambers with zero external network outbound calls, zero cloud dependencies, and zero third-party analytics libraries.
2. **Metadata-Only Schema Ingestion:** Aligns strictly with Section 2 of the statutory mandate—evaluating alert lifecycle metadata, resolution timestamps, investigation notes, and asset IDs without ingesting sensitive payloads or proprietary customer data.
3. **Cryptographic Chain of Custody & Audit Trail:** Calculates hardware-accelerated SHA-256 hashes upon file ingestion and maintains an immutable local audit ledger of all operator actions, tool executions, and state sanitizations.
4. **Single-Page Application (SPA) State Retention:** Preserves in-memory evaluation batches without page reloads, providing zero-latency navigation and eliminating white-screen flicker.

---

## 2. End-to-End System Pipeline

```mermaid
flowchart TD
    subgraph IngestionTier["Tier 1: Air-Gapped Ingestion & Custody"]
        A["Batch Telemetry Submissions (CSV / JSON)"] --> B["SHA-256 Custody Hash Generator"]
        B --> C["Columnar Schema Normalizer"]
        C --> D["In-Memory Analytics Store"]
        B -.-> AL["Statutory Audit Ledger"]
    end

    subgraph AnalyticalTier["Tier 2: Dual-Detection Statistical Engines"]
        D --> E1["Engine A: Execution Gap Engine"]
        D --> E2["Engine B: Negative Space Hunter"]
        
        E1 --> E1a["Velocity Anomaly Engine (<60s Resolution)"]
        E1 --> E1b["Shannon Entropy Note Similarity Analyzer"]
        E1 --> E1c["Senior Escalation Compliance Verifier"]

        E2 --> E2a["Poisson Silence Anomaly Calculator"]
        E2 --> E2b["Asset Inventory Cross-Referencer"]
        E2 --> E2c["MITRE ATT&CK Kill-Chain Coverage Matrix"]
    end

    subgraph ScoringTier["Tier 3: Entity Cyber Resilience Index (ECRI) & Visualization"]
        E1a & E1b & E1c & E2a & E2b & E2c --> F["Mathematical ECRI Formula Engine (0–100)"]
        F --> V1["Multi-View Visual Graph Engine"]
        V1 --> V1a["Triage Velocity Histogram"]
        V1 --> V1b["NCIIPC 6-Axis Spider / Radar Graph"]
        V1 --> V1c["24-Hour Batch Ingestion & Gaming Spike Timeline"]
        V1 --> V1d["Operational Assurance Deficit Gauges"]
        V1 --> V1e["Incident Disposition & SLA Integrity Donut"]
        V1 --> V1f["National Sector Peer Cohort Benchmark"]
    end

    subgraph RegulatoryTier["Tier 4: Local Explainable AI & Statutory Dossier"]
        F --> G["Local Ollama Examiner (qwen2.5:3b)"]
        G --> H["Section 70A Inspection Dossier & Statutory Warrant"]
        G -.-> AL
        H -.-> AL
    end

    subgraph SecurityTier["Tier 5: Supervisory Access Control & Cryptographic Purge"]
        I["Admin Authorization Modal"] --> J["Email, Password & 6-Digit PIN Validation"]
        J --> K["Cryptographic In-Memory Zeroization"]
        K -.-> AL
    end
```

---

## 3. Deep-Dive: Processing Tiers

### Tier 1: Ingestion & Cryptographic Custody
* **File Input:** Supports CSV and JSON dumps of alert logs, case management tickets, escalation manifests, and asset inventories.
* **Hash Computation:** Runs `crypto.subtle.digest('SHA-256')` directly over the byte stream. The resulting 64-character hexadecimal digest binds the audit report permanently to the submitted artifact.
* **Columnar Normalization:** Flattens diverse SOC vendor schemas (Splunk, Elastic, Sentinel, QRadar) into standard internal tuples:
  $$\langle \text{AlertID}, \text{AssetID}, \text{Severity}, \text{CreatedAt}, \text{ClosedAt}, \text{TriageDuration}, \text{AnalystNote}, \text{EscalatedTier} \rangle$$

---

### Tier 2: Dual-Detection Statistical Engines

#### Engine A: Execution Gap Engine
Detects fraudulent, lazy, or negligent alert management practices that create severe operational exposure:
1. **SLA Speed Metric Gaming (Velocity Anomaly):**  
   Evaluates alert triage speed against realistic human forensic limits. Alerts resolved in $t < 60\text{ seconds}$ on Tier-1 assets receive a critical penalty:
   $$Z_{velocity} = \frac{t - \mu_{cohort}}{\sigma_{cohort}}$$
2. **Investigation Note Cloning (Shannon Entropy):**  
   Measures textual diversity and semantic replication across analyst remarks. When multiple analysts submit identical strings (*"Host examined, verified benign false positive"*), entropy drops toward zero, flagging automated template rubber-stamping:
   $$H(X) = -\sum_{i=1}^{n} P(x_i) \log_2 P(x_i)$$
3. **Escalation Hierarchy Bypass:**  
   Verifies whether Critical/High alerts on designated Tier-1 assets were escalated to Tier-2 incident response leads or the CISO, or dismissed at L1 entry-level without review.

#### Engine B: Negative Space Hunter
Detects the most dangerous cyber threats: silent critical systems that should be generating logs but produce nothing:
1. **Poisson Silence Probability:**  
   Given an asset's baseline historical arrival rate $\lambda$ (alerts/day), the probability of observing zero alerts ($k=0$) over an observation period $T$ is:
   $$P(k = 0) = e^{-\lambda T}$$
   When $P(k=0) < 10^{-6}$ for critical nodes (e.g., Core Banking Oracle RAC DBs, SCADA Substation RTUs), SAT-SA flags a severe telemetry void.
2. **MITRE ATT&CK Matrix Void Analysis:**  
   Maps alert categories to the MITRE ATT&CK kill-chain. An entity capturing thousands of initial phishing alerts but **zero** Lateral Movement or Credential Access alerts is flagged for internal sensor blindness.

---

### Tier 3: Entity Cyber Resilience Index (ECRI) & Multi-View Visualization

#### ECRI Benchmark Metric
ECRI is a composite 0–100 benchmark metric derived from multi-attribute operational risk functions:

$$\text{ECRI} = \max\left(0, 100 - \left[ w_v \cdot \mathcal{P}_{velocity} + w_c \cdot \mathcal{P}_{clone} + w_e \cdot \mathcal{P}_{escalate} + w_s \cdot \mathcal{P}_{silence} \right]\right)$$

*Where:*
* $\mathcal{P}_{velocity}$: Percentage of alerts resolved under 60 seconds.
* $\mathcal{P}_{clone}$: Percentage of tickets containing identical duplicate closure notes.
* $\mathcal{P}_{escalate}$: Rate of senior escalation avoidance on Tier-1 assets.
* $\mathcal{P}_{silence}$: Ratio of silent critical nodes to total registered infrastructure.
* **Thresholds:**
  * $\ge 80$: **Exemplary / Compliant**
  * $60 - 79$: **Supervisory Watchlist** (Elevated audit frequency)
  * $< 60$: **Critical Deficiency** (Immediate on-site statutory warrant issued)

#### Multi-View Visual Graph Engine (Zero-Congestion Architecture)
The Executive Dashboard presents a balanced two-card grid (`grid-2col`) where **only two graphs are active by default**, allowing auditors to seamlessly toggle between 6 specialized analytical views without vertical jump or layout congestion:

1. **Left Panel: Operational Triage & Temporal Dynamics**
   * **Histogram (Default):** Discrete resolution time bins (`< 60s`, `1–15m`, `15–45m`, `> 45m`).
   * **NCIIPC 6-Axis Spider / Radar Graph:** Evaluates entity posture across six regulatory pillars (Triage Rigour, Note Entropy, Escalation Adherence, Negative Space Coverage, MITRE ATT&CK Breadth, Forensic Depth) against the National Peer Cohort baseline polygon.
     $$\text{Vertex Coordinate } (x_i, y_i) = \left( cx + r_i \cdot \sin\theta_i,\; cy - r_i \cdot \cos\theta_i \right), \quad \theta_i \in \left\{ 0^\circ, 60^\circ, 120^\circ, 180^\circ, 240^\circ, 300^\circ \right\}$$
   * **Hourly Ingestion vs Gaming Spikes Timeline:** 24-hour temporal distribution curve comparing normal background ingestion against shift-handover ticket flushing spikes.

2. **Right Panel: Assurance Deficit & Peer Benchmarking**
   * **Assurance Gauges (Default):** 4 high-contrast progress meters measuring velocity rigour, note uniqueness, escalation adherence, and telemetry coverage.
   * **Incident Disposition & SLA Integrity Donut Chart:** Categorizes alert closures into SLA Gaming (`<60s`), Routine Operations, Benign Noise, and Deep Forensics with a central ECRI index readout. Circumference arc lengths:
     $$L_i = \left(\frac{P_i}{100}\right) \cdot 2\pi r, \quad r = 52\text{px}, \quad C \approx 326.7\text{px}$$
   * **National Peer Cohort Benchmark:** Comparative horizontal bar charts displaying entity performance against anonymized national sector baselines.

---

### Tier 4: Explainable AI (XAI) & Regulatory Enforcement

* **Local Ollama Reasoner:** Integrates with local lightweight quantized models (`qwen2.5:3b`, `qwen2.5:1.5b`) via a low-latency loopback daemon (`server.py`).
* **Section 70A Statutory Inquiries:** Transforms statistical anomaly vectors into formal legal findings and precise questions for CISO depositions.
* **Supervisory Dossier:** Automatically generates an official NCIIPC Supervisory Audit Dossier and On-Site Inspection Warrant containing cryptographic custody proofs, velocity histograms, negative space logs, and CISO interrogatories.

---

### Tier 5: Regulatory Audit Ledger & Cryptographic Purge Protocol

1. **Section 70A Immutable Audit Ledger:**
   * Chronological, search-indexed log recording every supervisory action:
     $$\langle \text{Timestamp}, \text{Category}, \text{Target Document}, \text{Tool Invoked}, \text{Operator}, \text{Findings}, \text{SHA-256 Digest} \rangle$$
   * Direct export capabilities to statutory compliance formats (`JSON` and `CSV`).
2. **Secured Admin State Reset & Purge:**
   * Prevents inadvertent data loss by enforcing two-factor admin authentication (Official Email, Master Password, 6-digit Security PIN, and Regulatory Purge Reason).
   * Cryptographically zeroes in-memory evaluation records, resets UI views, and appends a signed `ADMIN RESET PURGE` audit record to the ledger.

---

## 4. Modular Client Architecture & Directory Layout

To ensure maintainability, testability, and clean separation of concerns, the frontend is structured as a modular Single-Page Application (SPA):

```
SAT-SA/
│
├── index.html                  # Clean semantic SPA layout (~1,150 lines)
│                               # Houses the 7 statutory screens & modal overlays
│
├── css/
│   └── style.css               # GovTech design tokens, typography, grid layouts,
│                               # SVG chart styles, badges, and animations (20.3 KB)
│
├── js/
│   ├── data_presets.js         # Benchmark datasets (PowerGrid, SBI, DMRC, DRDO) (7.7 KB)
│   ├── charts.js               # Mathematical SVG coordinate plotting (Radar, Donut, Peer, Timeline) (9.8 KB)
│   ├── audit_logger.js         # Section 70A audit ledger, live filtering & CSV/JSON export (7.7 KB)
│   └── app.js                  # Main controller: SPA routing, pipeline modal, dropzone parser,
│                               # admin reset authentication, and local Ollama inference (42.1 KB)
│
├── assets/
│   ├── emblem_india.svg        # Crisp pure-white State Emblem of India
│   ├── header_monument_perfect.png # Subtle Rashtrapati Bhavan top toolbar watermark
│   └── sidebar_monument.png    # Edge-to-edge seamless navy base watermark
│
├── data/
│   ├── sample_cses/            # 54 Banking alerts, 26 registered critical assets
│   └── large_datasets/         # Multi-hundred row multi-sector evaluation batches
│
└── server.py                   # Local air-gapped web server & Ollama reverse proxy
```
