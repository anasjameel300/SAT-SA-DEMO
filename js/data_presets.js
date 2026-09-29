// ==============================================================
// NCIIPC REGULATORY BENCHMARK PRESETS
// ==============================================================
const benchmarkPresets = {
      powergrid: {
        name: "National Power Grid Corp (PGCIL)",
        sector: "Power & SCADA Infrastructure",
        alertCount: "150 Alerts Evaluated",
        gapIndex: "83% (124 Fast Closures)",
        gapSub: "Average Triage Speed: 28s",
        ecri: 41,
        verdict: "● URGENT REGULATORY AUDIT",
        speedVal: "83%",
        templateVal: "98.4%",
        escalateVal: "100%",
        mitreAccess: "8 Alerts",
        mitreExec: "4 Alerts",
        mitrePersist: "1 Alerts",
        mitreCredVoid: true,
        mitreLateralVoid: true,
        histFastPct: 83, histMedPct: 10, histNormPct: 5, histDeepPct: 2,
        fastCount: 124, medCount: 15, normCount: 8, deepCount: 3,
        samples: [
          { id: "ALT-PGR-0001", asset: "SCADA-RTU-04", sev: "Critical", dur: "23s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "SLA Speed Gaming" },
          { id: "ALT-PGR-0002", asset: "SUBSTATION-GW-09", sev: "Critical", dur: "18s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "Boilerplate Template" },
          { id: "ALT-PGR-0003", asset: "CORE-DC-01", sev: "Critical", dur: "39s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "Escalation Bypass" },
          { id: "ALT-PGR-0004", asset: "SUBSTATION-RTU-12", sev: "Critical", dur: "26s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "SLA Speed Gaming" }
        ],
        silentNodes: [
          { id: "SCADA-RTU-01", host: "rtu01.north.grid.in", tier: "Tier-1", role: "Substation RTU", days: 90, p: "2.4e-6", status: "Silent SCADA Node" },
          { id: "SCADA-RTU-02", host: "rtu02.north.grid.in", tier: "Tier-1", role: "Substation RTU", days: 90, p: "2.4e-6", status: "Silent SCADA Node" },
          { id: "SCADA-RTU-03", host: "rtu03.north.grid.in", tier: "Tier-1", role: "Substation RTU", days: 90, p: "2.4e-6", status: "Silent SCADA Node" },
          { id: "SCADA-RTU-05", host: "rtu05.north.grid.in", tier: "Tier-1", role: "Substation RTU", days: 90, p: "2.4e-6", status: "Silent SCADA Node" }
        ],
        toastMsg: "83% of critical alerts resolved in <60 seconds with boilerplate notes. 4 Tier-1 SCADA RTUs silent for 90 days."
      },
      sbi: {
        name: "State Bank of India (SBI)",
        sector: "Banking / BFSI Core Infrastructure",
        alertCount: "54 Alerts Evaluated",
        gapIndex: "24% (13 SLA Gaming Anomalies)",
        gapSub: "Median Triage: 31s on Critical | Cohort Median: 22m",
        ecri: 41,
        verdict: "● URGENT REGULATORY AUDIT",
        speedVal: "24%",
        templateVal: "92.0%",
        escalateVal: "100% Bypassed on Critical",
        mitreAccess: "8 Alerts",
        mitreExec: "4 Alerts",
        mitrePersist: "1 Alerts",
        mitreCredVoid: true,
        mitreLateralVoid: true,
        histFastPct: 24, histMedPct: 52, histNormPct: 20, histDeepPct: 4,
        fastCount: 13, medCount: 28, normCount: 11, deepCount: 2,
        samples: [
          { id: "ALT-SBI-003", asset: "ATM-SWITCH-MUMBAI", sev: "Critical", dur: "23s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "SLA Speed Gaming" },
          { id: "ALT-SBI-006", asset: "CORE-AD-MUMBAI", sev: "Critical", dur: "19s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "Boilerplate Template" },
          { id: "ALT-SBI-009", asset: "SWIFT-GW-PROD02", sev: "Critical", dur: "34s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "Escalation Bypass" },
          { id: "ALT-SBI-013", asset: "CBS-ORACLE-RAC02", sev: "Critical", dur: "42s", note: "Host examined, verified false positive benign traffic. Closing ticket.", flag: "SLA Speed Gaming" }
        ],
        silentNodes: [
          { id: "CBS-ORACLE-RAC01", host: "cbs01.mumbai.sbi.co.in", tier: "Tier-1", role: "Core Banking Oracle RAC Node 1", days: 90, p: "1.1e-7", status: "Disabled / Missing" },
          { id: "SWIFT-GW-PROD01", host: "swift01.mumbai.sbi.co.in", tier: "Tier-1", role: "SWIFT Alliance Access Interface", days: 90, p: "4.3e-8", status: "Agent Halted / Unmonitored" },
          { id: "PAYMENT-HSM-RAC01", host: "hsm-pay01.mumbai.sbi.co.in", tier: "Tier-1", role: "Payment PIN Encryption HSM", days: 90, p: "8.9e-6", status: "Syslog Dropped / Blindspot" }
        ],
        toastMsg: "State Bank of India (SBI) evaluated: 54 alerts analyzed across 26 registered critical assets. 3 Core Banking & SWIFT nodes produced ZERO telemetry over 90 days."
      },
      dmrc: {
        name: "Delhi Metro Rail Corp (DMRC)",
        sector: "Urban Transit & Signalling",
        alertCount: "120 Alerts Evaluated",
        gapIndex: "42% (50 Fast Closures)",
        gapSub: "Average Triage Speed: 8m",
        ecri: 64,
        verdict: "● SUPERVISORY WATCHLIST",
        speedVal: "42%",
        templateVal: "45.0%",
        escalateVal: "50% Bypassed",
        mitreAccess: "8 Alerts",
        mitreExec: "4 Alerts",
        mitrePersist: "1 Alerts",
        mitreCredVoid: true,
        mitreLateralVoid: true,
        histFastPct: 42, histMedPct: 40, histNormPct: 15, histDeepPct: 3,
        fastCount: 50, medCount: 48, normCount: 18, deepCount: 4,
        samples: [
          { id: "ALT-MRT-0001", asset: "STATION-WS-12", sev: "Medium", dur: "15m", note: "Email quarantined at gateway, user notified.", flag: "Perimeter Only" },
          { id: "ALT-MRT-0004", asset: "TRACTION-GW-01", sev: "High", dur: "22m", note: "Routine polling verified against timetable.", flag: "Triage Normal" }
        ],
        silentNodes: [
          { id: "TRACTION-RTU-04", host: "traction04.sub.dmrc.in", tier: "Tier-1", role: "Traction RTU Line 2", days: 60, p: "8.2e-4", status: "Traction Void" },
          { id: "ATO-GW-01", host: "ato01.signaling.dmrc.in", tier: "Tier-1", role: "Automatic Train Operation Gateway", days: 60, p: "8.2e-4", status: "Signaling Void" }
        ],
        toastMsg: "Zero Credential Access or Lateral Movement alerts observed in 6 months. Internal transit LAN is unmonitored."
      },
      drdo: {
        name: "Defence Research & Development (DRDO)",
        sector: "Strategic & Classified Defence",
        alertCount: "100 Alerts Evaluated",
        gapIndex: "0% Compliant",
        gapSub: "Average Triage Speed: 68m",
        ecri: 92,
        verdict: "● EXEMPLARY BENCHMARK",
        speedVal: "0%",
        templateVal: "4.1%",
        escalateVal: "0% Bypassed",
        mitreAccess: "12 Alerts",
        mitreExec: "8 Alerts",
        mitrePersist: "6 Alerts",
        mitreCredVoid: false,
        mitreLateralVoid: false,
        histFastPct: 0, histMedPct: 12, histNormPct: 38, histDeepPct: 50,
        fastCount: 0, medCount: 12, normCount: 38, deepCount: 50,
        samples: [
          { id: "ALT-DEF-0001", asset: "DEF-AIRGAP-WS01", sev: "Critical", dur: "70m", note: "Hardware keylogger detected on physical USB bus. Station disconnected from KVM, physical forensics initiated.", flag: "Benchmark Triage" },
          { id: "ALT-DEF-0004", asset: "DEF-ROOT-KDC", sev: "Critical", dur: "70m", note: "KRBTGT hash attack detected. Emergency password rotation cycle initiated. Escalated to CISO.", flag: "Compliant Escalation" }
        ],
        silentNodes: [],
        toastMsg: "Exemplary operational discipline. 100% active telemetry coverage and thorough 68-minute median triage."
      }
    };
