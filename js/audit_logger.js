// ==============================================================
// STATUTORY AUDIT LOGGING SYSTEM (Section 70A IT Act)
    // ==============================================================
    let auditLogTrail = [
      {
        id: "LOG-104921",
        timestamp: "2026-09-30 01:00:14 IST",
        category: "SYSTEM",
        document: "Air-Gap Core Services (SAT-SA Runtime)",
        tool: "Section 70A Supervisory Engine v2.4",
        operator: "SYSTEM_DAEMON",
        outcome: "Core services initialized. Zero external egress policy enforced.",
        hash: "9A42F1C8"
      },
      {
        id: "LOG-104922",
        timestamp: "2026-09-30 01:05:22 IST",
        category: "SYSTEM",
        document: "NCIIPC Supervisory Calibration Benchmarks",
        tool: "Sector Baseline Normalizer (BFSI, Power, Transit, Defence)",
        operator: "auditor.admin@nciipc.gov.in",
        outcome: "National peer cohort thresholds initialized (Cohort N=1,420).",
        hash: "7E11B402"
      },
      {
        id: "LOG-104923",
        timestamp: "2026-09-30 01:10:05 IST",
        category: "AI_INFERENCE",
        document: "Local Ollama Daemon (qwen2.5:3b GGUF)",
        tool: "Ollama Air-Gap IPC Daemon (Port 11434)",
        operator: "SYSTEM_DAEMON",
        outcome: "Local inference runtime connected. Zero telemetry exfiltration verified.",
        hash: "C398E45D"
      }
    ];

    function recordAuditLog({ category, document: docName, tool, operator, outcome, details }) {
      const pad = (n) => n < 10 ? '0' + n : n;
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} IST`;
      const hashStr = Math.random().toString(16).substring(2, 10).toUpperCase();

      const entry = {
        id: "LOG-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: timeStr,
        category: category || "ANALYSIS",
        document: docName || "Unspecified Entity Batch",
        tool: tool || "Supervisory Evaluation Tool",
        operator: operator || "auditor.admin@nciipc.gov.in",
        outcome: outcome || "Executed successfully",
        hash: hashStr,
        details: details || ""
      };

      auditLogTrail.unshift(entry);
      updateAuditStats();
      renderAuditLogTable();
    }

    function updateAuditStats() {
      const elTot = document.getElementById('logTotalEvents');
      if (elTot) elTot.innerText = auditLogTrail.length;

      const docSet = new Set(auditLogTrail.filter(l => l.category === 'INGESTION').map(l => l.document));
      const elDocs = document.getElementById('logTotalDocs');
      if (elDocs) elDocs.innerText = docSet.size;
    }

    function renderAuditLogTable() {
      const tbody = document.getElementById('auditLogTableBody');
      if (!tbody) return;

      const q = (document.getElementById('logSearchInput') ? document.getElementById('logSearchInput').value : '').toLowerCase().trim();
      const filterCat = document.getElementById('logFilterType') ? document.getElementById('logFilterType').value : 'ALL';

      let filtered = auditLogTrail.filter(log => {
        if (filterCat !== 'ALL' && log.category !== filterCat) return false;
        if (!q) return true;
        return (
          log.document.toLowerCase().includes(q) ||
          log.tool.toLowerCase().includes(q) ||
          log.operator.toLowerCase().includes(q) ||
          log.outcome.toLowerCase().includes(q) ||
          log.hash.toLowerCase().includes(q) ||
          log.category.toLowerCase().includes(q)
        );
      });

      const countLbl = document.getElementById('logShowingCount');
      if (countLbl) countLbl.innerText = `Showing ${filtered.length} of ${auditLogTrail.length} events`;

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 28px; color: var(--text-muted); font-size: 0.8rem;">No audit records match the current filter or search criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(item => {
        let badgeStyle = "background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;";
        let catText = item.category;

        if (item.category === 'INGESTION') {
          badgeStyle = "background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd;";
          catText = "DATA INGESTION";
        } else if (item.category === 'ANALYSIS') {
          badgeStyle = "background: #fef3c7; color: #92400e; border: 1px solid #fde68a;";
          catText = "ANALYTICAL ENGINE";
        } else if (item.category === 'AI_INFERENCE') {
          badgeStyle = "background: #f3e8ff; color: #6b21a8; border: 1px solid #e9d5ff;";
          catText = "OLLAMA AI REASONER";
        } else if (item.category === 'DOSSIER') {
          badgeStyle = "background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;";
          catText = "OFFICIAL DOSSIER";
        } else if (item.category === 'RESET_PURGE') {
          badgeStyle = "background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; font-weight: 700;";
          catText = "ADMIN RESET PURGE";
        } else if (item.category === 'SYSTEM') {
          badgeStyle = "background: #f8fafc; color: #334155; border: 1px solid #e2e8f0;";
          catText = "SYSTEM RUNTIME";
        }

        return `
          <tr>
            <td style="font-family: ui-monospace, monospace; font-size: 0.72rem; color: var(--text-muted); white-space: nowrap;">${item.timestamp}</td>
            <td><span class="badge" style="${badgeStyle}; padding: 3px 8px; font-size: 0.65rem; border-radius: 4px; display: inline-block;">${catText}</span></td>
            <td><strong style="color: var(--text-main); font-size: 0.76rem;">${item.document}</strong></td>
            <td><code style="font-family: ui-monospace, monospace; font-size: 0.72rem; color: #0284c7; background: #f0f9ff; padding: 2px 6px; border-radius: 4px; border: 1px solid #e0f2fe;">${item.tool}</code></td>
            <td style="font-size: 0.73rem; color: var(--text-body);">${item.operator}</td>
            <td style="font-size: 0.74rem; color: var(--text-body); max-width: 320px;">${item.outcome}</td>
            <td><code style="font-family: ui-monospace, monospace; font-size: 0.72rem; color: #64748b; background: #f1f5f9; padding: 2px 5px; border-radius: 4px;">#${item.hash}</code></td>
          </tr>
        `;
      }).join('');
    }

    function exportAuditLogsJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogTrail, null, 2));
      const dl = document.createElement('a');
      dl.setAttribute("href", dataStr);
      dl.setAttribute("download", `nciipc_sat_sa_audit_ledger_${new Date().toISOString().slice(0,10)}.json`);
      dl.click();
    }

    function exportAuditLogsCSV() {
      const headers = ["ID", "Timestamp", "Category", "Document", "Tool", "Operator", "Outcome", "HashDigest"];
      const rows = auditLogTrail.map(l => [
        l.id,
        `"${l.timestamp}"`,
        `"${l.category}"`,
        `"${l.document.replace(/"/g, '""')}"`,
        `"${l.tool.replace(/"/g, '""')}"`,
        `"${l.operator.replace(/"/g, '""')}"`,
        `"${l.outcome.replace(/"/g, '""')}"`,
        `"${l.hash}"`
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const dl = document.createElement('a');
      dl.setAttribute("href", encodeURI(csvContent));
      dl.setAttribute("download", `nciipc_sat_sa_audit_ledger_${new Date().toISOString().slice(0,10)}.csv`);
      dl.click();
    }
