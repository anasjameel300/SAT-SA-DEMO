// ==============================================================
// DYNAMIC MULTI-VIEW CHARTING ENGINES
// ==============================================================
function switchLeftGraph(type) {
      const tabs = ['hist', 'radar', 'timeline'];
      tabs.forEach(t => {
        const btn = document.getElementById('tabLeft' + t.charAt(0).toUpperCase() + t.slice(1));
        const pane = document.getElementById('leftPane' + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) btn.classList.toggle('active', t === type);
        if (pane) pane.classList.toggle('active', t === type);
      });

      const title = document.getElementById('leftGraphTitle');
      const sub = document.getElementById('leftGraphSub');
      if (type === 'hist') {
        if (title) title.innerText = "Visual Key: Triage Velocity Distribution (SLA Speed Gaming)";
        if (sub) sub.innerText = "Tall red bar indicates unnatural <60s closures";
      } else if (type === 'radar') {
        if (title) title.innerText = "Visual Key: NCIIPC 6-Axis Regulatory Spider Graph";
        if (sub) sub.innerText = "Multidimensional SOC surveillance posture vs National Cohort baseline";
      } else if (type === 'timeline') {
        if (title) title.innerText = "Visual Key: 24-Hour Alert Volume & Batch Gaming Spikes";
        if (sub) sub.innerText = "Temporal analysis of end-of-shift ticket flushing anomalies";
      }
    }

    // Toggle Right Graph Views (Assurance Gauges vs Disposition Donut vs Peer Benchmark)
    function switchRightGraph(type) {
      const tabs = ['meters', 'donut', 'peer'];
      tabs.forEach(t => {
        const btn = document.getElementById('tabRight' + t.charAt(0).toUpperCase() + t.slice(1));
        const pane = document.getElementById('rightPane' + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) btn.classList.toggle('active', t === type);
        if (pane) pane.classList.toggle('active', t === type);
      });

      const title = document.getElementById('rightGraphTitle');
      const sub = document.getElementById('dashEntityNameSub');
      const curName = activeEvaluationData ? activeEvaluationData.name : "-";
      if (type === 'meters') {
        if (title) title.innerText = "Visual Key: Operational Assurance Deficit Breakdown";
        if (sub && sub.parentElement) sub.parentElement.innerHTML = `Computed specifically for <strong id="dashEntityNameSub" style="color: var(--text-main);">${curName}</strong>`;
      } else if (type === 'donut') {
        if (title) title.innerText = "Visual Key: Incident Disposition & SLA Integrity Donut";
        if (sub && sub.parentElement) sub.parentElement.innerHTML = `Breakdown of resolution depth for <strong id="dashEntityNameSub" style="color: var(--text-main);">${curName}</strong>`;
      } else if (type === 'peer') {
        if (title) title.innerText = "Visual Key: Entity vs National Sector Peer Cohort Benchmark";
        if (sub && sub.parentElement) sub.parentElement.innerHTML = `Comparative gap analysis for <strong id="dashEntityNameSub" style="color: var(--text-main);">${curName}</strong>`;
      }
    }

    // Dynamic 6-Axis Spider / Radar Calculation
    function updateRadarPolygon(d) {
      const v0 = Math.max(5, Math.min(100, 100 - (d.histFastPct || 0)));
      const tVal = parseFloat(d.templateVal) || 10;
      const v1 = Math.max(5, Math.min(100, 100 - tVal));
      const v2 = d.ecri > 70 ? 95 : (d.ecri > 50 ? 50 : 8);
      const v3 = (!d.silentNodes || d.silentNodes.length === 0) ? 100 : Math.max(15, 100 - (d.silentNodes.length * 15));
      const v4 = (d.mitreCredVoid || d.mitreLateralVoid) ? 40 : 90;
      const v5 = Math.max(4, Math.min(100, (d.histDeepPct || 2) * 2 + 5));

      const cx = 250;
      const cy = 100;
      const R = 70;

      const vals = [v0, v1, v2, v3, v4, v5];
      const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];

      const points = vals.map((v, i) => {
        const r = (v / 100) * R;
        const x = (cx + r * Math.sin(angles[i])).toFixed(1);
        const y = (cy - r * Math.cos(angles[i])).toFixed(1);
        return `${x},${y}`;
      }).join(' ');

      const poly = document.getElementById('radarEntityPoly');
      if (poly) {
        poly.setAttribute('points', points);
        if (d.ecri < 50) {
          poly.setAttribute('fill', 'rgba(239, 68, 68, 0.22)');
          poly.setAttribute('stroke', '#ef4444');
        } else if (d.ecri < 75) {
          poly.setAttribute('fill', 'rgba(245, 158, 11, 0.22)');
          poly.setAttribute('stroke', '#f59e0b');
        } else {
          poly.setAttribute('fill', 'rgba(16, 185, 129, 0.22)');
          poly.setAttribute('stroke', '#10b981');
        }
      }

      const elR0 = document.getElementById('lblRadarRigour'); if (elR0) elR0.innerText = `${Math.round(v0)}%`;
      const elR1 = document.getElementById('lblRadarEntropy'); if (elR1) elR1.innerText = `${Math.round(v1)}%`;
      const elR2 = document.getElementById('lblRadarEscalate'); if (elR2) elR2.innerText = `${Math.round(v2)}%`;
      const elR3 = document.getElementById('lblRadarCoverage'); if (elR3) elR3.innerText = `${Math.round(v3)}%`;
      const elR4 = document.getElementById('lblRadarMitre'); if (elR4) elR4.innerText = `${Math.round(v4)}%`;
      const elR5 = document.getElementById('lblRadarForensic'); if (elR5) elR5.innerText = `${Math.round(v5)}%`;

      const legend = document.getElementById('radarLegendEntity');
      if (legend) legend.innerText = `${d.name} (${d.ecri}/100)`;
    }

    // Dynamic Donut Chart Calculation
    function updateDonutChart(d) {
      const C = 326.72;
      const p1 = d.histFastPct || 0;
      const p2 = d.histMedPct || 0;
      const p3 = d.histNormPct || 0;
      const p4 = Math.max(1, 100 - (p1 + p2 + p3));

      const L1 = (p1 / 100) * C;
      const L2 = (p2 / 100) * C;
      const L3 = (p3 / 100) * C;
      const L4 = (p4 / 100) * C;

      const seg1 = document.getElementById('donutSeg1');
      const seg2 = document.getElementById('donutSeg2');
      const seg3 = document.getElementById('donutSeg3');
      const seg4 = document.getElementById('donutSeg4');

      if (seg1) {
        seg1.setAttribute('stroke-dasharray', `${L1.toFixed(1)} ${(C - L1).toFixed(1)}`);
        seg1.setAttribute('stroke-dashoffset', '0');
      }
      if (seg2) {
        seg2.setAttribute('stroke-dasharray', `${L2.toFixed(1)} ${(C - L2).toFixed(1)}`);
        seg2.setAttribute('stroke-dashoffset', `-${L1.toFixed(1)}`);
      }
      if (seg3) {
        seg3.setAttribute('stroke-dasharray', `${L3.toFixed(1)} ${(C - L3).toFixed(1)}`);
        seg3.setAttribute('stroke-dashoffset', `-${(L1 + L2).toFixed(1)}`);
      }
      if (seg4) {
        seg4.setAttribute('stroke-dasharray', `${L4.toFixed(1)} ${(C - L4).toFixed(1)}`);
        seg4.setAttribute('stroke-dashoffset', `-${(L1 + L2 + L3).toFixed(1)}`);
      }

      const centerVal = document.getElementById('donutCenterVal');
      if (centerVal) centerVal.textContent = d.ecri;

      const pctGaming = document.getElementById('donutPctGaming'); if (pctGaming) pctGaming.innerText = `${p1}%`;
      const pctMaint = document.getElementById('donutPctMaint'); if (pctMaint) pctMaint.innerText = `${p2}%`;
      const pctBenign = document.getElementById('donutPctBenign'); if (pctBenign) pctBenign.innerText = `${p3}%`;
      const pctDeep = document.getElementById('donutPctDeep'); if (pctDeep) pctDeep.innerText = `${p4}%`;
    }

    // Dynamic Peer Benchmark Comparison
    function updatePeerChart(d) {
      const v0 = Math.max(0, 100 - (d.histFastPct || 0));
      const tVal = parseFloat(d.templateVal) || 10;
      const v1 = Math.max(0, 100 - tVal);
      const v2 = d.ecri > 70 ? 95 : (d.ecri > 50 ? 50 : 4);
      const v3 = (!d.silentNodes || d.silentNodes.length === 0) ? 100 : Math.max(15, 100 - (d.silentNodes.length * 15));

      const pRigour = document.getElementById('peerEntRigour');
      const bRigour = document.getElementById('peerBarRigour');
      if (pRigour) pRigour.innerText = `${v0}%`;
      if (bRigour) {
        bRigour.style.width = `${v0}%`;
        bRigour.style.background = v0 < 40 ? '#ef4444' : '#10b981';
      }

      const pEntropy = document.getElementById('peerEntEntropy');
      const bEntropy = document.getElementById('peerBarEntropy');
      if (pEntropy) pEntropy.innerText = `${Math.round(v1)}%`;
      if (bEntropy) {
        bEntropy.style.width = `${Math.round(v1)}%`;
        bEntropy.style.background = v1 < 40 ? '#ef4444' : '#10b981';
      }

      const pEscalate = document.getElementById('peerEntEscalate');
      const bEscalate = document.getElementById('peerBarEscalate');
      if (pEscalate) pEscalate.innerText = `${v2}%`;
      if (bEscalate) {
        bEscalate.style.width = `${v2}%`;
        bEscalate.style.background = v2 < 50 ? '#ef4444' : '#10b981';
      }

      const pCoverage = document.getElementById('peerEntCoverage');
      const bCoverage = document.getElementById('peerBarCoverage');
      if (pCoverage) pCoverage.innerText = `${v3}%`;
      if (bCoverage) {
        bCoverage.style.width = `${v3}%`;
        bCoverage.style.background = v3 < 80 ? '#f59e0b' : '#10b981';
      }
    }

    // Dynamic Hourly Ingestion vs Gaming Spikes Timeline
    function updateTimelineGraph(d) {
      const spikePath = document.getElementById('timelineSpikePath');
      const spikeLine = document.getElementById('timelineSpikeLine');
      if (spikePath && spikeLine) {
        if (d.histFastPct > 15) {
          spikePath.style.display = 'block';
          spikeLine.style.display = 'block';
        } else {
          spikePath.style.display = 'none';
          spikeLine.style.display = 'none';
        }
      }
    }
