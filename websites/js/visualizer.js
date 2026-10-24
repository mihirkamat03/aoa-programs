/**
 * Visualizer Rendering Engine
 * Renders pro-level animated visualizations for:
 * - Arrays (Sorting)
 * - Chessboard (N-Queens)
 * - Strings (KMP & Rabin-Karp)
 * - DP Grids & Matrices (Knapsack, LCS, Floyd-Warshall)
 * - Graphs (Prim, Kruskal, Dijkstra, BFS, DFS)
 */

class VisualizerRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  clear() {
    this.container.innerHTML = "";
  }

  // 1. Array Visualizer for Sorting (Horizontal Rounded Cells matching Lecture Notes & Reference Image)
  renderArray(step) {
    this.clear();
    const arr = step.array || [];
    const highlights = step.highlights || [];
    const vars = step.variables || {};

    const wrapper = document.createElement("div");
    wrapper.className = "visual-array-wrapper";

    // Top Status Header Bar
    const titleBar = document.createElement("div");
    titleBar.className = "visual-stage-header";
    
    let passText = vars.pass !== undefined ? `Pass: ${vars.pass}` : "";
    let callsText = vars.total_calls !== undefined ? `Procedure Calls: ${vars.total_calls}` : "";
    
    titleBar.innerHTML = `
      <span class="badge badge-info">Array Size: ${arr.length}</span>
      ${passText ? `<span class="badge badge-primary">${passText}</span>` : ""}
      ${callsText ? `<span class="badge badge-accent">${callsText}</span>` : ""}
      ${step.range ? `<span class="badge badge-secondary">Active Window: [${step.range[0]} .. ${step.range[1]}]</span>` : ""}
    `;
    wrapper.appendChild(titleBar);

    // Floating Key Indicator (for Insertion Sort)
    if (step.floatingKey !== undefined && step.floatingKey !== null) {
      const keyBanner = document.createElement("div");
      keyBanner.className = "floating-key-banner";
      keyBanner.innerHTML = `
        <div class="floating-key-card glow-pulse">
          <span class="key-icon">🔑</span>
          <span class="key-label">Floating Key:</span>
          <span class="key-val">${step.floatingKey}</span>
        </div>
        <div class="floating-key-note">
          Lifted card from array &bull; Comparing with left cards to find insertion spot
        </div>
      `;
      wrapper.appendChild(keyBanner);
    }

    // Main Array Container (Horizontal row of rounded cells)
    const arrayContainer = document.createElement("div");
    arrayContainer.className = "array-arena-container";

    const arrayTrack = document.createElement("div");
    arrayTrack.className = "array-cells-track";

    arr.forEach((val, idx) => {
      const slot = document.createElement("div");
      slot.className = "array-cell-slot";

      // Check if slot is dimmed (outside active recursion window in Quick/Merge Sort)
      if (step.range && (idx < step.range[0] || idx > step.range[1])) {
        slot.classList.add("slot-dimmed");
      }

      // Collect pointer labels matching this index
      const ptrs = [];
      if (vars.j === idx) ptrs.push({ name: "j", cls: "j" });
      if (vars.i === idx) ptrs.push({ name: "i", cls: "i" });
      if (vars.k === idx) ptrs.push({ name: "k", cls: "k" });
      if (vars.h === idx) ptrs.push({ name: "h", cls: "h" });
      if (vars.p === idx) ptrs.push({ name: "p", cls: "p" });
      if (vars.r === idx) ptrs.push({ name: "r", cls: "r" });
      if (vars.q === idx) ptrs.push({ name: "q", cls: "q" });
      if (vars.low === idx) ptrs.push({ name: "low", cls: "low" });
      if (vars.mid === idx) ptrs.push({ name: "mid", cls: "mid" });
      if (vars.high === idx) ptrs.push({ name: "high", cls: "high" });
      if (step.pivotIdx === idx && !ptrs.some(p => p.name === "pivot")) ptrs.push({ name: "pivot", cls: "pivot" });

      // Determine highlight status
      const h = highlights.find(item => item.index === idx);
      const isVacated = (step.vacatedIdx === idx);
      const isSwapping = (step.swapIndices && step.swapIndices.includes(idx));

      let stateClass = "state-default";
      let badgeLabel = "";

      if (isVacated) {
        stateClass = "state-vacated";
      } else if (isSwapping) {
        stateClass = "state-swapping";
        badgeLabel = "SWAP";
      } else if (h) {
        if (h.type === "comparing") {
          stateClass = "state-comparing";
          badgeLabel = "CMP";
        } else if (h.type === "compareFailed") {
          stateClass = "state-compare-failed";
          badgeLabel = "✕ NO";
        } else if (h.type === "key") {
          stateClass = "state-key";
          badgeLabel = "KEY";
        } else if (h.type === "pivot") {
          stateClass = "state-pivot";
          badgeLabel = "PIVOT";
        } else if (h.type === "currentMin") {
          stateClass = "state-min";
          badgeLabel = "MIN";
        } else if (h.type === "newMin") {
          stateClass = "state-new-min";
          badgeLabel = "MIN★";
        } else if (h.type === "shifted") {
          stateClass = "state-shifted";
          badgeLabel = "SHIFT";
        } else if (h.type === "placed") {
          stateClass = "state-placed";
          badgeLabel = "INSERT";
        } else if (h.type === "sorted") {
          stateClass = "state-sorted";
          badgeLabel = "✓";
        } else if (h.type === "swapA" || h.type === "swapB") {
          stateClass = "state-swapping";
          badgeLabel = "SWAP";
        } else if (h.type === "merging") {
          stateClass = "state-merging";
        }
      }

      // Pointer Area (Top)
      const ptrZone = document.createElement("div");
      ptrZone.className = "cell-pointer-zone";
      if (ptrs.length > 0) {
        ptrZone.innerHTML = `
          <div class="ptr-tags-group">
            ${ptrs.map(p => `<span class="ptr-tag ptr-${p.cls}">${p.name}</span>`).join("")}
          </div>
          <div class="ptr-down-arrow">▼</div>
        `;
      } else {
        ptrZone.innerHTML = `<div class="ptr-placeholder"></div>`;
      }
      slot.appendChild(ptrZone);

      // Slot Home Ghost (dashed silhouette showing origin when card is dragged down)
      const ghostBox = document.createElement("div");
      ghostBox.className = "slot-home-ghost";
      slot.appendChild(ghostBox);

      // Rounded Cell Card (Center Box)
      const cellCard = document.createElement("div");
      cellCard.className = `array-cell-card ${stateClass}`;
      cellCard.dataset.index = idx;
      cellCard.innerHTML = `
        <div class="cell-val-text">${isVacated ? '⬚' : val}</div>
        ${badgeLabel ? `<div class="cell-state-badge badge-${stateClass}">${badgeLabel}</div>` : ''}
      `;
      slot.appendChild(cellCard);

      // Index Zone (Bottom)
      const idxZone = document.createElement("div");
      idxZone.className = "cell-index-zone";
      idxZone.innerHTML = `<span class="cell-index-label">[${idx}]</span>`;
      slot.appendChild(idxZone);

      arrayTrack.appendChild(slot);
    });

    arrayContainer.appendChild(arrayTrack);

    // Comparison Runway Indicator below array
    const hasComparing = highlights.some(h => h.type === "comparing");
    const hasFailed = highlights.some(h => h.type === "compareFailed");
    if (hasComparing || hasFailed) {
      const runway = document.createElement("div");
      runway.className = `comparison-runway ${hasComparing ? 'runway-comparing' : 'runway-failed'}`;
      runway.innerHTML = `
        <span class="runway-icon">${hasComparing ? '⬇️' : '↩️'}</span>
        <span class="runway-text">${hasComparing ? 'Comparing: elements dragged down into spotlight' : 'Comparison condition not met: sliding block smoothly back into home slot'}</span>
      `;
      arrayContainer.appendChild(runway);
    }

    wrapper.appendChild(arrayContainer);

    // Auxiliary Array b[] (for Merge Sort)
    if (step.auxArray !== undefined) {
      const auxSection = document.createElement("div");
      auxSection.className = "aux-array-section";
      auxSection.innerHTML = `
        <div class="aux-header">
          <span class="badge badge-warning">Auxiliary Array b[ ] (Temporary RAM Buffer)</span>
          <span class="aux-note">Elements merged into b[i] before copying back to a[ ]</span>
        </div>
      `;

      const auxTrack = document.createElement("div");
      auxTrack.className = "array-cells-track aux-track";

      arr.forEach((_, idx) => {
        const auxSlot = document.createElement("div");
        auxSlot.className = "array-cell-slot";

        const hasVal = step.auxArray && step.auxArray[idx] !== undefined;
        const isTarget = (vars.i === idx);

        auxSlot.innerHTML = `
          <div class="cell-pointer-zone">
            ${isTarget ? '<div class="ptr-tags-group"><span class="ptr-tag ptr-i">i</span></div><div class="ptr-down-arrow">▼</div>' : '<div class="ptr-placeholder"></div>'}
          </div>
          <div class="array-cell-card ${hasVal ? 'state-aux-filled' : 'state-aux-empty'} ${isTarget ? 'state-aux-target' : ''}">
            <div class="cell-val-text">${hasVal ? step.auxArray[idx] : '-'}</div>
          </div>
          <div class="cell-index-zone">
            <span class="cell-index-label">b[${idx}]</span>
          </div>
        `;
        auxTrack.appendChild(auxSlot);
      });

      auxSection.appendChild(auxTrack);
      wrapper.appendChild(auxSection);
    }

    this.container.appendChild(wrapper);
  }

  // 2. Chessboard Visualizer for N-Queens
  renderChessboard(step) {
    this.clear();
    const boardState = step.boardState || {};
    const n = boardState.n || 4;
    const queens = boardState.queens || {};
    const activeRow = boardState.activeRow;
    const candidateCol = boardState.candidateCol;
    const status = boardState.status;

    const wrapper = document.createElement("div");
    wrapper.className = "visual-chessboard-wrapper";

    const header = document.createElement("div");
    header.className = "visual-stage-header";
    header.innerHTML = `
      <span class="badge badge-accent">Board Size: ${n} × ${n}</span>
      <span class="badge ${status === 'conflict' ? 'badge-danger' : (status === 'safe' || status === 'solution' ? 'badge-success' : 'badge-primary')}">
        Status: ${status.toUpperCase()}
      </span>
      ${boardState.conflictReason ? `<span class="badge badge-warning">${boardState.conflictReason}</span>` : ""}
    `;
    wrapper.appendChild(header);

    const board = document.createElement("div");
    board.className = `chessboard-grid size-${n}`;
    board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    for (let r = 1; r <= n; r++) {
      for (let c = 1; c <= n; c++) {
        const square = document.createElement("div");
        const isDark = (r + c) % 2 === 1;
        square.className = `chess-square ${isDark ? 'square-dark' : 'square-light'}`;

        const isQueenHere = queens[r] === c;
        const isCandidate = (activeRow === r && candidateCol === c);

        // Highlight conflict lines or safe placements
        if (isCandidate) {
          if (status === "conflict") square.classList.add("square-conflict");
          else if (status === "safe") square.classList.add("square-safe");
        } else if (activeRow === r) {
          square.classList.add("square-active-row");
        }

        if (isQueenHere) {
          square.classList.add("square-has-queen");
          square.innerHTML = `<span class="queen-piece">👑</span><span class="queen-coord">R${r}C${c}</span>`;
        } else if (isCandidate) {
          square.innerHTML = `
            <span class="queen-ghost ${status === 'conflict' ? 'ghost-conflict' : 'ghost-safe'}">
              ${status === 'conflict' ? '💥' : '👑?'}
            </span>
          `;
        } else {
          square.innerHTML = `<span class="square-coord">${r},${c}</span>`;
        }

        board.appendChild(square);
      }
    }

    wrapper.appendChild(board);

    // 1D Array Output Bar
    const oneDBar = document.createElement("div");
    oneDBar.className = "nqueens-1d-display";
    const xArr = [];
    for (let k = 1; k <= n; k++) xArr.push(queens[k] ? queens[k] : "-");
    oneDBar.innerHTML = `
      <div class="oned-title">1D Array Format (x[1..${n}]):</div>
      <div class="oned-cells">
        ${xArr.map((col, idx) => `
          <div class="oned-cell ${col !== '-' ? 'oned-filled' : ''}">
            <span class="oned-idx">Row ${idx + 1}</span>
            <span class="oned-val">${col !== '-' ? `Col ${col}` : '—'}</span>
          </div>
        `).join("")}
      </div>
    `;
    wrapper.appendChild(oneDBar);

    this.container.appendChild(wrapper);
  }

  // 3. String Matching Visualizer (KMP & Rabin-Karp)
  renderStringMatching(step) {
    this.clear();
    const wrapper = document.createElement("div");
    wrapper.className = "visual-string-wrapper";

    if (step.stringState) {
      // KMP View
      const s = step.stringState;
      const text = s.text;
      const pat = s.pattern;
      const lps = s.lps || [];

      wrapper.innerHTML = `
        <div class="visual-stage-header">
          <span class="badge badge-primary">Algorithm: KMP</span>
          <span class="badge badge-info">Phase: ${s.phase}</span>
          ${s.matches && s.matches.length > 0 ? `<span class="badge badge-success">Matches: ${s.matches.length} (at ${s.matches.join(', ')})</span>` : ""}
        </div>

        <!-- LPS Precomputed Table -->
        <div class="kmp-lps-box">
          <div class="box-title">Precomputed π (LPS) Table:</div>
          <div class="lps-table-grid">
            <div class="lps-row header-row">
              <span class="lps-cell label">Pattern char:</span>
              ${pat.split("").map((c, idx) => `<span class="lps-cell ${s.lpsI === idx ? 'cell-active' : ''}">${c}</span>`).join("")}
            </div>
            <div class="lps-row">
              <span class="lps-cell label">Index j:</span>
              ${pat.split("").map((_, idx) => `<span class="lps-cell ${s.lpsI === idx ? 'cell-active' : ''}">${idx}</span>`).join("")}
            </div>
            <div class="lps-row val-row">
              <span class="lps-cell label">π[j] (LPS):</span>
              ${lps.map((val, idx) => `<span class="lps-cell ${s.lpsI === idx ? 'cell-active' : ''} ${val > 0 ? 'cell-nonzero' : ''}">${val}</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- Dual Row Text vs Pattern Arena -->
        <div class="string-arena">
          <div class="string-row-title">Text (Pointer i = ${s.textIdx !== null ? s.textIdx : '-'}):</div>
          <div class="char-blocks-row text-blocks">
            ${text.split("").map((ch, idx) => {
              let cls = "";
              if (idx === s.textIdx) cls = s.matchStatus === "match" ? "char-match" : (s.matchStatus === "mismatch" ? "char-mismatch" : "char-active");
              if (s.matches && s.matches.some(m => idx >= m && idx < m + pat.length)) cls += " char-found-match";
              return `
                <div class="char-block ${cls}">
                  <span class="char-char">${ch}</span>
                  <span class="char-idx">${idx}</span>
                  ${idx === s.textIdx ? '<span class="char-pointer-tag">i</span>' : ''}
                </div>
              `;
            }).join("")}
          </div>

          <div class="string-row-title" style="margin-top: 16px;">Pattern (Pointer j = ${s.patIdx !== null ? s.patIdx : '-'}):</div>
          <div class="char-blocks-row pattern-blocks" style="padding-left: ${Math.max(0, (s.textIdx || 0) - (s.patIdx || 0)) * 44}px;">
            ${pat.split("").map((ch, idx) => {
              let cls = "";
              if (idx === s.patIdx) cls = s.matchStatus === "match" ? "char-match" : (s.matchStatus === "mismatch" ? "char-mismatch" : "char-active");
              return `
                <div class="char-block ${cls}">
                  <span class="char-char">${ch}</span>
                  <span class="char-idx">${idx}</span>
                  ${idx === s.patIdx ? '<span class="char-pointer-tag pointer-j">j</span>' : ''}
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    } else if (step.rkState) {
      // Rabin-Karp View
      const r = step.rkState;
      wrapper.innerHTML = `
        <div class="visual-stage-header">
          <span class="badge badge-primary">Algorithm: Rabin-Karp</span>
          <span class="badge badge-accent">Prime q: ${r.q}</span>
          <span class="badge badge-warning">Pattern Hash (p): ${r.patternHash}</span>
          <span class="badge ${r.hashMatches ? (r.isActualMatch ? 'badge-success' : 'badge-danger') : 'badge-secondary'}">
            Window Hash (t): ${r.windowHash} ${r.hashMatches ? (r.isActualMatch ? '🎯 MATCH!' : '⚠️ SPURIOUS HIT!') : ''}
          </span>
        </div>

        <!-- Rolling Hash Formula Card -->
        <div class="rk-hash-formula-card">
          <div class="formula-title">🔢 Rolling Hash Calculation:</div>
          <div class="formula-body">
            ${r.rollingCalc ? `
              <div class="calc-step-line">Slide Window: Drop <b>${r.rollingCalc.lead}</b>, Add <b>${r.rollingCalc.trail}</b></div>
              <code class="calc-code">${r.rollingCalc.formula}</code>
            ` : `
              <div>Initial Window: "${r.windowStr}" -> Hash: ${r.windowHash}</div>
            `}
          </div>
        </div>

        <!-- Text Sliding Window Arena -->
        <div class="string-arena">
          <div class="string-row-title">Text with Sliding Window (Shift s = ${r.shift}):</div>
          <div class="char-blocks-row text-blocks">
            ${r.text.split("").map((ch, idx) => {
              const inWindow = (idx >= r.shift && idx < r.shift + r.pattern.length);
              let cls = inWindow ? "in-window" : "out-window";
              if (inWindow && r.hashMatches) {
                cls += r.isActualMatch ? " window-matched" : " window-spurious";
              }
              return `
                <div class="char-block ${cls}">
                  <span class="char-char">${ch}</span>
                  <span class="char-idx">${idx}</span>
                </div>
              `;
            }).join("")}
          </div>

          <div class="string-row-title" style="margin-top: 16px;">Search Pattern: "${r.pattern}"</div>
          <div class="char-blocks-row pattern-blocks" style="padding-left: ${r.shift * 44}px;">
            ${r.pattern.split("").map((ch, idx) => `
              <div class="char-block pattern-char-block">
                <span class="char-char">${ch}</span>
                <span class="char-idx">${idx}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    this.container.appendChild(wrapper);
  }

  // 4. Matrix & DP Grid Visualizer (0/1 Knapsack, LCS, Floyd-Warshall)
  renderMatrix(step) {
    this.clear();
    const wrapper = document.createElement("div");
    wrapper.className = "visual-matrix-wrapper";

    if (step.dpTable) {
      // 0/1 Knapsack Matrix
      const t = step.dpTable;
      const matrix = t.matrix;
      const active = t.activeCell;
      const refs = t.refCells || [];

      wrapper.innerHTML = `
        <div class="visual-stage-header">
          <span class="badge badge-accent">Capacity W: ${t.W}</span>
          <span class="badge badge-info">Items: ${t.weights.length}</span>
          <span class="badge badge-primary">Weights: [${t.weights.join(', ')}]</span>
          <span class="badge badge-success">Values: [${t.values.join(', ')}]</span>
        </div>
        <div class="matrix-scroll-container">
          <table class="dp-matrix-table">
            <thead>
              <tr>
                <th class="matrix-corner">i \\ w</th>
                ${Array.from({ length: t.numCols }, (_, c) => `<th>${c}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${matrix.map((row, r) => `
                <tr>
                  <th class="matrix-row-header">
                    ${r === 0 ? '0 (none)' : `#${r} (w:${t.weights[r-1]},v:${t.values[r-1]})`}
                  </th>
                  ${row.map((val, c) => {
                    const isActive = active && active.r === r && active.c === c;
                    const refMatch = refs.find(ref => ref.r === r && ref.c === c);
                    let cls = "";
                    if (isActive) cls = "cell-active";
                    else if (refMatch) cls = "cell-referenced";
                    return `
                      <td class="${cls}">
                        <div class="cell-val">${val}</div>
                        ${refMatch ? `<div class="cell-tag">${refMatch.label}</div>` : ''}
                      </td>
                    `;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (step.lcsTable) {
      // LCS Table with Direction Arrows
      const l = step.lcsTable;
      const L = l.L;
      const B = l.B;
      const X = l.X;
      const Y = l.Y;
      const active = l.activeCell;
      const pathCells = l.pathCells || [];

      wrapper.innerHTML = `
        <div class="visual-stage-header">
          <span class="badge badge-primary">String X (Row): "${X}"</span>
          <span class="badge badge-accent">String Y (Col): "${Y}"</span>
          ${step.variables['LCS Length'] !== undefined ? `<span class="badge badge-success">LCS: "${step.variables['LCS String']}" (Len: ${step.variables['LCS Length']})</span>` : ""}
        </div>
        <div class="matrix-scroll-container">
          <table class="dp-matrix-table lcs-matrix">
            <thead>
              <tr>
                <th>X \\ Y</th>
                <th>0 (ε)</th>
                ${Y.split("").map((char, idx) => `<th>${char} (${idx+1})</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${L.map((row, r) => `
                <tr>
                  <th class="matrix-row-header">
                    ${r === 0 ? '0 (ε)' : `${X[r-1]} (${r})`}
                  </th>
                  ${row.map((val, c) => {
                    const isActive = active && active.r === r && active.c === c;
                    const isPath = pathCells.some(p => p.r === r && p.c === c);
                    const arrow = (B[r] && B[r][c]) ? B[r][c] : "";
                    let cls = "";
                    if (isActive) cls = "cell-active";
                    else if (isPath) cls = "cell-path";
                    return `
                      <td class="${cls}">
                        <div class="lcs-val-arrow">
                          <span class="lcs-arrow">${arrow}</span>
                          <span class="lcs-num">${val}</span>
                        </div>
                      </td>
                    `;
                  }).join("")}
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (step.fwTable) {
      // Floyd-Warshall D and Pi Matrices
      const fw = step.fwTable;
      const D = fw.D;
      const Pi = fw.Pi;
      const V = fw.V;

      wrapper.innerHTML = `
        <div class="visual-stage-header">
          <span class="badge badge-primary">Intermediate Vertex k: ${fw.k}</span>
          <span class="badge badge-info">Source i: ${fw.i !== -1 ? fw.i : '-'}, Dest j: ${fw.j !== -1 ? fw.j : '-'}</span>
        </div>
        <div class="fw-tables-split">
          <div class="fw-matrix-box">
            <div class="box-title">D Matrix (Shortest Distances):</div>
            <table class="dp-matrix-table">
              <thead>
                <tr><th>i \\ j</th>${Array.from({length: V}, (_, c) => `<th>${c}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${D.map((row, r) => `
                  <tr>
                    <th>${r}</th>
                    ${row.map((val, c) => {
                      const isUp = fw.updatedCell && fw.updatedCell.r === r && fw.updatedCell.c === c;
                      return `<td class="${isUp ? 'cell-active' : ''}">${val >= 99999 ? '∞' : val}</td>`;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <div class="fw-matrix-box">
            <div class="box-title">Pi Matrix (Predecessors):</div>
            <table class="dp-matrix-table">
              <thead>
                <tr><th>i \\ j</th>${Array.from({length: V}, (_, c) => `<th>${c}</th>`).join("")}</tr>
              </thead>
              <tbody>
                ${Pi.map((row, r) => `
                  <tr>
                    <th>${r}</th>
                    ${row.map((val, c) => {
                      const isUp = fw.updatedCell && fw.updatedCell.r === r && fw.updatedCell.c === c;
                      return `<td class="${isUp ? 'cell-active' : ''}">${val === -1 ? 'NIL' : val}</td>`;
                    }).join("")}
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    this.container.appendChild(wrapper);
  }

  // 5. Graph Visualizer (Prim, Kruskal, Dijkstra, BFS, DFS)
  renderGraph(step) {
    this.clear();
    const g = step.graph;
    if (!g) return;

    const wrapper = document.createElement("div");
    wrapper.className = "visual-graph-wrapper";

    const header = document.createElement("div");
    header.className = "visual-stage-header";
    header.innerHTML = `
      <span class="badge badge-primary">Vertices: ${g.numVertices}</span>
      ${step.variables.totalCost !== undefined ? `<span class="badge badge-success">MST Cost: ${step.variables.totalCost}</span>` : ""}
      ${step.variables.u !== undefined ? `<span class="badge badge-accent">Current Vertex u: ${step.variables.u}</span>` : ""}
      ${g.queue ? `<span class="badge badge-warning">Queue: [${g.queue.join(', ')}]</span>` : ""}
      ${g.stack ? `<span class="badge badge-warning">Stack: [${g.stack.join(', ')}]</span>` : ""}
    `;
    wrapper.appendChild(header);

    // SVG Canvas for Graph
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 580 380");
    svg.setAttribute("class", "graph-svg-canvas");

    // Draw Edges
    const matrix = g.adjMatrix;
    const pos = g.positions;
    const mstEdges = g.mstEdges || [];
    const rejectedEdges = g.rejectedEdges || [];

    for (let u = 0; u < g.numVertices; u++) {
      for (let v = u + 1; v < g.numVertices; v++) {
        if (matrix[u][v] !== 0) {
          const p1 = pos[u];
          const p2 = pos[v];
          const w = matrix[u][v];

          const isMST = mstEdges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
          const isRejected = rejectedEdges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
          const isActive = (g.activeEdge && ((g.activeEdge.u === u && g.activeEdge.v === v) || (g.activeEdge.u === v && g.activeEdge.v === u))) ||
                           (g.currentU === u && g.checkingV === v) || (g.currentU === v && g.checkingV === u);

          let strokeClass = "graph-edge";
          if (isMST) strokeClass = "graph-edge-mst";
          else if (isRejected) strokeClass = "graph-edge-rejected";
          else if (isActive) strokeClass = "graph-edge-active";

          const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("x1", p1.x);
          line.setAttribute("y1", p1.y);
          line.setAttribute("x2", p2.x);
          line.setAttribute("y2", p2.y);
          line.setAttribute("class", strokeClass);
          svg.appendChild(line);

          // Edge Weight Label
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2 - 6;

          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("x", midX);
          text.setAttribute("y", midY);
          text.setAttribute("class", `graph-edge-label ${isMST ? 'edge-label-mst' : ''}`);
          text.textContent = w;
          svg.appendChild(text);
        }
      }
    }

    // Draw Vertices
    for (let i = 0; i < g.numVertices; i++) {
      const p = pos[i];
      let nodeClass = "graph-node";

      if (g.currentU === i) nodeClass += " node-current";
      else if (g.inMST && g.inMST[i]) nodeClass += " node-visited";
      else if (g.visited && g.visited[i]) nodeClass += " node-visited";
      else if (g.inQueue && g.inQueue[i]) nodeClass += " node-in-queue";
      else if (g.color && g.color[i] === "GRAY") nodeClass += " node-gray";
      else if (g.color && g.color[i] === "BLACK") nodeClass += " node-black";

      const gNode = document.createElementNS("http://www.w3.org/2000/svg", "g");

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", p.x);
      circle.setAttribute("cy", p.y);
      circle.setAttribute("r", 24);
      circle.setAttribute("class", nodeClass);
      gNode.appendChild(circle);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", p.x);
      label.setAttribute("y", p.y + 6);
      label.setAttribute("class", "graph-node-label");
      label.textContent = g.vertexLabels ? g.vertexLabels[i] : i;
      gNode.appendChild(label);

      // Distance / Key badge below node
      let subLabelText = "";
      if (g.key && g.key[i] !== undefined) subLabelText = `k:${g.key[i] >= 99999 ? '∞' : g.key[i]}`;
      else if (g.D && g.D[i] !== undefined) subLabelText = `d:${g.D[i] >= 99999 ? '∞' : g.D[i]}`;
      else if (g.d && g.d[i] !== undefined && g.f && g.f[i] !== undefined) subLabelText = `${g.d[i]}/${g.f[i]}`;

      if (subLabelText) {
        const sub = document.createElementNS("http://www.w3.org/2000/svg", "text");
        sub.setAttribute("x", p.x);
        sub.setAttribute("y", p.y + 40);
        sub.setAttribute("class", "graph-node-sublabel");
        sub.textContent = subLabelText;
        gNode.appendChild(sub);
      }

      svg.appendChild(gNode);
    }

    wrapper.appendChild(svg);

    // Vector Inspector below graph (D and Pi vectors for Dijkstra, etc.)
    if (g.D && g.Pi) {
      const vecBox = document.createElement("div");
      vecBox.className = "graph-vectors-bar";
      vecBox.innerHTML = `
        <div class="vec-item"><b>Distance Vector D:</b> [${g.D.map(v => v >= 99999 ? '∞' : v).join(", ")}]</div>
        <div class="vec-item"><b>Predecessor Vector Pi:</b> [${g.Pi.join(", ")}]</div>
      `;
      wrapper.appendChild(vecBox);
    }

    this.container.appendChild(wrapper);
  }

  // 6. Subset Visualizer (Sum of Subsets)
  renderSubset(step) {
    this.clear();
    const s = step.subsetState;
    if (!s) return;

    const wrapper = document.createElement("div");
    wrapper.className = "visual-subset-wrapper";

    wrapper.innerHTML = `
      <div class="visual-stage-header">
        <span class="badge badge-accent">Target Sum M: ${s.M}</span>
        <span class="badge badge-info">Current Sum: ${s.currentSum}</span>
        <span class="badge ${s.isSolution ? 'badge-success' : 'badge-primary'}">
          ${s.isSolution ? '🎉 VALID SUBSET FOUND!' : 'Exploring State Space'}
        </span>
      </div>

      <!-- Target Progress Meter -->
      <div class="subset-meter-box">
        <div class="meter-labels">
          <span>0</span>
          <span>Target M: ${s.M}</span>
        </div>
        <div class="meter-bar-track">
          <div class="meter-bar-fill ${s.currentSum === s.M ? 'fill-perfect' : (s.currentSum > s.M ? 'fill-overflow' : '')}"
               style="width: ${Math.min(100, Math.round((s.currentSum / s.M) * 100))}%;">
          </div>
        </div>
      </div>

      <!-- Elements Decision Cards -->
      <div class="subset-cards-grid">
        ${s.weights.map((wt, idx) => {
          const isDecided = idx <= s.k;
          const isIncluded = s.x[idx] === 1;
          const isCurrent = idx === s.k;

          let cardCls = "subset-card";
          if (isCurrent) cardCls += " card-current";
          if (isDecided && isIncluded) cardCls += " card-included";
          else if (isDecided && !isIncluded) cardCls += " card-excluded";

          return `
            <div class="${cardCls}">
              <div class="card-idx">Element #${idx + 1}</div>
              <div class="card-weight">${wt}</div>
              <div class="card-badge">
                ${isIncluded ? '✅ Included (x=1)' : (isDecided ? '❌ Excluded (x=0)' : '⏳ Pending')}
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <!-- Solution Vector Display -->
      <div class="oned-display" style="margin-top: 20px;">
        <div class="oned-title">Solution Vector X: [ ${s.x.join(", ")} ]</div>
        <div class="oned-subtitle">Active Elements: { ${s.weights.filter((_, idx) => s.x[idx] === 1).join(", ") || 'none'} }</div>
      </div>
    `;

    this.container.appendChild(wrapper);
  }
}
