# Abstract: Supervisory Analytics Tool for SOC Assessment (SAT-SA)
## Automated Detection of Execution Gaps and Telemetry Negative Space in Critical Infrastructure Cyber Governance
**Target Organization:** National Critical Information Infrastructure Protection Centre (NCIIPC)  
**Regulatory Mandate:** Section 70A, Information Technology Act, 2000 (Amended 2008) | Problem Statement ID #26157  
**Operational Environment:** 100% Air-Gapped, Zero-Cloud, Sovereign Supervisory Architecture  

---

### Executive & Scholarly Abstract

The National Critical Information Infrastructure Protection Centre (NCIIPC) is the designated statutory authority under Section 70A of the Information Technology Act for evaluating the cyber resilience of Critical Sector Entities (CSEs) across Power, Financial Services, Transportation, Telecommunications, and Strategic Defence. Historically, supervisory assessments have relied either on manual sampling of Security Operations Centre (SOC) records—a process that is resource-intensive, difficult to scale across expanding entity cohorts, and subject to cognitive fatigue—or on conventional compliance checklists, policy reviews, and executive KPI dashboards. However, high-level dashboards showing pristine Service Level Agreement (SLA) compliance and rapid Mean Time to Detect (MTTD) frequently mask catastrophic operational vulnerabilities, deliberate metric gaming, and active cyber adversary persistence.

The **Supervisory Analytics Tool for SOC Assessment (SAT-SA)** is an offline, air-gapped supervisory analytics platform engineered to ingest periodic, structured batch submissions of SOC alert lifecycle metadata, case management records, and escalation registries. In strict accordance with NCIIPC statutory boundaries, SAT-SA does not operate as an active SOC, does not perform live network packet capture (PCAP) inspection, does not function as a SIEM, and does not aggregate proprietary customer data. Instead, it functions as a specialized supervisory intelligence capability designed to audit the operational integrity, forensic depth, and completeness of security operations across national critical infrastructure.

The core conceptual breakthrough of SAT-SA lies in the mathematical formalization and automated discovery of two pervasive operational failure modes:
1. **Execution Gaps:** Situations where documented governance frameworks and reported capabilities suggest robust defence, but operational evidence reveals that security alerts are acknowledged and closed without meaningful forensic inquiry. Analysts artificially game SLA metrics by closing high-severity alerts in under 60 seconds with duplicate, copy-pasted boilerplate remarks (*"verified benign false positive"*), systematically bypassing mandatory escalations to senior Tier-2 incident handlers and CISOs to protect performance bonuses.
2. **Negative Space:** The pathology of absent operational evidence—termed *"the dog that didn't bark"*—where critical Tier-1 assets (such as Core Banking Oracle RAC clusters or PowerGrid SCADA Substation RTUs) generate zero alerts over extended audit periods. SAT-SA recognizes that total telemetry silence is not evidence of cyber hygiene, but mathematical proof of broken log forwarders, unmonitored blindspots, or deliberate adversary sensor suppression.

---

### Architectural Design & Mathematical Engine

To enforce absolute data sovereignty and operate within classified supervisory chambers, SAT-SA is engineered as a 100% air-gapped Single-Page Application (SPA) backed by a local Python daemon, completely free from external cloud services, CDNs, or external APIs. The system operates across a five-tier pipeline:

1. **Ingestion & Cryptographic Custody:** Parses heterogeneous CSV/JSON telemetry dumps from diverse vendor SIEMs (Splunk, Elastic, Sentinel, QRadar) into normalized columnar tuples while calculating hardware-accelerated SHA-256 custody hashes to guarantee legal non-repudiation in regulatory proceedings.
2. **Dual-Detection Statistical Engines:**
   * *Velocity Anomaly ($Z_{velocity}$):* Standardizes alert triage durations against national peer cohort distributions, penalizing sub-60-second closures that violate human forensic feasibility limits.
   * *Shannon Note Entropy ($H(X)$):* Measures textual diversity across analyst remarks ($H(X) = -\sum P(x) \log_2 P(x)$), detecting automated template rubber-stamping when entropy collapses toward zero, reinforced by pairwise Levenshtein similarity clustering ($\text{Sim}(s_1, s_2) \ge 0.85$).
   * *Senior Escalation Adherence:* Tracks the proportion of critical alerts on Tier-1 infrastructure dismissed at entry level without senior escalation.
   * *Poisson Silence Hunter:* Formulates alert arrivals as an inhomogeneous Poisson process ($P(k=0) = e^{-\lambda T}$), flagging critical assets with silence probabilities $P < 10^{-6}$ as urgent telemetry voids.
   * *MITRE ATT&CK Kill-Chain Matrix:* Identifies internal tactical voids where perimeter alerts dominate while lateral movement and credential access monitoring remain completely blind.
3. **Resilience Scoring & Multi-View Visualization:** Computes the composite **Entity Cyber Resilience Index (ECRI)** ($0-100$), formulated as:
   $$\text{ECRI} = \max\left(0, 100 - \left[ w_v \cdot (\mathcal{P}_{velocity} \times 100) + w_c \cdot (\mathcal{P}_{clone} \times 100) + w_e \cdot (\mathcal{P}_{escalate} \times 100) + w_s \cdot (\mathcal{P}_{silence} \times 100) \right]\right)$$
   with calibrated weights $w_v = 0.30$, $w_c = 0.20$, $w_e = 0.25$, and $w_s = 0.25$. The index stratifies audited entities into *Compliant / Exemplary* ($\ge 80$), *Supervisory Watchlist* ($60-79$), and *Critical Deficiency* ($<60$). The Executive Dashboard implements a zero-congestion, dual-panel layout rendering six specialized SVG vector graphics—including a 6-Axis Spider/Radar Graph, 24-Hour Gaming Spike Timeline, SLA Donut Chart, and National Peer Cohort Benchmark—without layout jump or cognitive clutter.
4. **Explainable AI (XAI) & Regulatory Enforcement:** Integrates with an offline, locally hosted Ollama large language model (`qwen2.5:3b`) via local loopback. The AI synthesizes mathematical anomalies into formal legal findings under Section 70A and generates pointed interrogatories for CISO depositions. If critical deficiencies are detected ($\text{ECRI} < 60$), SAT-SA automatically formats an official NCIIPC Supervisory Audit Dossier and On-Site Inspection Warrant.
5. **Supervisory Audit Ledger & Cryptographic Purge:** Maintains an immutable chronological event ledger with full-text search and CSV/JSON export. Administrative state resets require two-factor authorization (Email, Master Password, 6-digit PIN, and Regulatory Justification), triggering complete in-memory cryptographic zeroization and appending signed purge records.

---

### Empirical Validation & National Policy Impact

SAT-SA was rigorously validated across four multi-sector benchmark datasets modeling Indian critical infrastructure:
* **National PowerGrid SCADA (150 alerts):** Detected 83.3% sub-60-second speed gaming and widespread template reuse, resulting in an ECRI collapse to 38.4/100 and triggering an automatic on-site inspection warrant.
* **State Bank Core Banking (140 alerts):** Unmasked 3 Tier-1 Core Banking Oracle RAC DBs and SWIFT Gateways generating zero alerts over 90 days ($P = 1.7 \times 10^{-10}$), exposing a crashed syslog forwarder that had been silent for 88 days.
* **Delhi Metro Rail (120 alerts):** Isolated an internal kill-chain detection blindspot with 0% coverage across lateral movement tactics (ECRI: 62.5/100).
* **DRDO Strategic Defence (100 alerts):** Verified high-fidelity forensic investigations with 58-minute average triage, high entropy ($H = 4.86$), and full escalation compliance (ECRI: 92.6/100).

Benchmarking demonstrates sub-second execution on 100,000 alert records (780ms ingestion, 290ms engine run) with an 82MB memory footprint, reducing supervisory audit cycles from weeks of manual sampling to seconds of exhaustive mathematical auditing. By bridging technical forensic reality with statutory enforcement, SAT-SA equips NCIIPC with an uncompromised, legally defensible, and sovereign platform to safeguard the digital backbone of the nation.
