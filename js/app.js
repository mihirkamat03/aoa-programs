/**
 * Main Application Controller
 * Handles UI interactions, step navigation, playback timers,
 * code line synchronization, and audio feedback.
 */

class AOAApp {
  constructor() {
    this.currentAlgoId = "insertionSort";
    this.activeTab = "visualizer"; // visualizer | viva | complexity | guidelines
    this.activeCodeLang = "c"; // c | java | pseudo
    this.currentStepIdx = 0;
    this.steps = [];
    this.isPlaying = false;
    this.playbackInterval = null;
    this.playbackSpeedMs = 800; // default speed
    this.soundEnabled = true;

    this.renderer = new VisualizerRenderer("visualStageCanvas");
    this.audioCtx = null;

    this.initAudio();
    this.initDOM();
    this.loadAlgorithm(this.currentAlgoId);
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  playTone(freq = 440, type = "sine", duration = 0.08) {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio glitches
    }
  }

  initDOM() {
    // 1. Sidebar Search
    const searchInput = document.getElementById("sidebarSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.filterAlgoNav(e.target.value));
    }

    // 2. Playback Controls
    document.getElementById("btnPlayPause")?.addEventListener("click", () => this.togglePlay());
    document.getElementById("btnStepForward")?.addEventListener("click", () => this.stepForward());
    document.getElementById("btnStepBack")?.addEventListener("click", () => this.stepBack());
    document.getElementById("btnReset")?.addEventListener("click", () => this.resetSteps());
    document.getElementById("btnRandomInput")?.addEventListener("click", () => this.randomizeInput());
    document.getElementById("btnSoundToggle")?.addEventListener("click", () => this.toggleSound());

    // Speed Slider
    const speedSlider = document.getElementById("speedSlider");
    if (speedSlider) {
      speedSlider.addEventListener("input", (e) => {
        // Inverted: higher value = faster (smaller delay)
        const val = parseInt(e.target.value);
        this.playbackSpeedMs = 1500 - (val * 140);
        document.getElementById("speedLabel").textContent = `${val / 5}x`;
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });
    }

    // 3. Code Language Tabs
    document.querySelectorAll(".code-lang-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".code-lang-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.activeCodeLang = e.target.dataset.lang;
        this.renderCodeViewer();
      });
    });

    // 4. Copy Code Button
    document.getElementById("btnCopyCode")?.addEventListener("click", () => {
      const codeSnippet = CODE_SNIPPETS[this.currentAlgoId];
      if (!codeSnippet) return;
      let textToCopy = "";
      if (this.activeCodeLang === "c") textToCopy = codeSnippet.c;
      else if (this.activeCodeLang === "java") textToCopy = codeSnippet.java;
      else textToCopy = codeSnippet.pseudo.join("\n");

      navigator.clipboard.writeText(textToCopy).then(() => {
        const btn = document.getElementById("btnCopyCode");
        const originalText = btn.textContent;
        btn.textContent = "✅ Copied!";
        setTimeout(() => btn.textContent = originalText, 1500);
      });
    });

    // 5. App Navigation Tabs
    document.querySelectorAll(".nav-tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".nav-tab-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.switchMainTab(e.target.dataset.tab);
      });
    });

    // 6. Keyboard Shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        this.stepForward();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        this.stepBack();
      } else if (e.code === "KeyR") {
        this.resetSteps();
      }
    });

    // Populate Sidebar Navigation
    this.populateSidebar();
  }

  populateSidebar() {
    const navContainer = document.getElementById("algoNavList");
    if (!navContainer) return;

    // Group by Category
    const categories = {
      "Sorting (Divide & Conquer / Incremental)": ["insertionSort", "selectionSort", "quickSort", "mergeSort"],
      "Greedy Algorithms": ["primsMST", "kruskalsMST", "dijkstra"],
      "Dynamic Programming": ["knapsack01", "lcs", "floydWarshall"],
      "Backtracking": ["nQueen", "sumOfSubset"],
      "String Matching": ["kmp", "rabinKarp"],
      "Graph Traversal": ["bfs", "dfs"]
    };

    navContainer.innerHTML = "";

    for (const [catName, algoKeys] of Object.entries(categories)) {
      const titleDiv = document.createElement("div");
      titleDiv.className = "nav-category-title";
      titleDiv.textContent = catName;
      navContainer.appendChild(titleDiv);

      algoKeys.forEach(key => {
        const info = ALGO_DATA[key];
        if (!info) return;

        const item = document.createElement("div");
        item.className = `nav-algo-item ${key === this.currentAlgoId ? 'active' : ''}`;
        item.dataset.algoId = key;
        item.innerHTML = `
          <span>${info.name}</span>
          <span class="algo-sr-badge">#${info.tsecSrNo}</span>
        `;
        item.addEventListener("click", () => {
          document.querySelectorAll(".nav-algo-item").forEach(el => el.classList.remove("active"));
          item.classList.add("active");
          this.loadAlgorithm(key);
        });
        navContainer.appendChild(item);
      });
    }
  }

  filterAlgoNav(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll(".nav-algo-item").forEach(el => {
      const name = el.textContent.toLowerCase();
      if (name.includes(q)) {
        el.style.display = "flex";
      } else {
        el.style.display = "none";
      }
    });
  }

  loadAlgorithm(algoId) {
    this.pause();
    this.currentAlgoId = algoId;
    this.currentStepIdx = 0;

    const data = ALGO_DATA[algoId];
    if (!data) return;

    // Update Header
    document.getElementById("algoTitle").textContent = data.name;
    document.getElementById("algoSrBadge").textContent = `TSEC Sr. No. ${data.tsecSrNo}`;
    document.getElementById("algoTagline").textContent = data.tagline;

    // Clear Terminal Output
    const term = document.getElementById("examOutputTerminal");
    if (term) term.textContent = `=== TSEC PRACTICAL EXAM CONSOLE OUTPUT ===\nExperiment #${data.tsecSrNo}: ${data.name}\nRequirement: ${data.examRequirements}\n--------------------------------------------------\n`;

    // Generate Steps based on algorithm
    this.generateStepsForCurrentAlgo();

    // Render Code & Step
    this.renderCodeViewer();
    this.updateStepView();
  }

  generateStepsForCurrentAlgo() {
    switch (this.currentAlgoId) {
      case "insertionSort":
        this.steps = generateInsertionSortSteps([25, 17, 31, 13, 2, 45, 9]);
        break;
      case "selectionSort":
        this.steps = generateSelectionSortSteps([64, 25, 12, 22, 11, 38]);
        break;
      case "quickSort":
        this.steps = generateQuickSortSteps([10, 80, 30, 90, 40, 50, 70]);
        break;
      case "mergeSort":
        this.steps = generateMergeSortSteps([38, 27, 43, 3, 9, 82, 10]);
        break;
      case "primsMST":
        this.steps = generatePrimsMSTSteps();
        break;
      case "kruskalsMST":
        this.steps = generateKruskalsMSTSteps();
        break;
      case "dijkstra":
        this.steps = generateDijkstraSteps();
        break;
      case "knapsack01":
        this.steps = generateKnapsackSteps(7, [2, 3, 4, 5], [3, 4, 5, 6]);
        break;
      case "lcs":
        this.steps = generateLCSSteps("LONGEST", "STONE");
        break;
      case "floydWarshall":
        this.steps = generateFloydWarshallSteps();
        break;
      case "nQueen":
        this.steps = generateNQueensSteps(4);
        break;
      case "sumOfSubset":
        this.steps = generateSumOfSubsetSteps([3, 5, 7, 9], 12);
        break;
      case "kmp":
        this.steps = generateKMPSteps("AABAACAADAABAABA", "AABA");
        break;
      case "rabinKarp":
        this.steps = generateRabinKarpSteps("2359023141526739921", "31415", 13);
        break;
      case "bfs":
        this.steps = generateBFSSteps();
        break;
      case "dfs":
        this.steps = generateDFSSteps();
        break;
      default:
        this.steps = [];
    }
  }

  randomizeInput() {
    this.pause();
    this.currentStepIdx = 0;

    if (["insertionSort", "selectionSort", "quickSort", "mergeSort"].includes(this.currentAlgoId)) {
      const randomArr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 85) + 5);
      if (this.currentAlgoId === "insertionSort") this.steps = generateInsertionSortSteps(randomArr);
      else if (this.currentAlgoId === "selectionSort") this.steps = generateSelectionSortSteps(randomArr);
      else if (this.currentAlgoId === "quickSort") this.steps = generateQuickSortSteps(randomArr);
      else if (this.currentAlgoId === "mergeSort") this.steps = generateMergeSortSteps(randomArr);
    } else {
      this.generateStepsForCurrentAlgo();
    }

    this.updateStepView();
  }

  updateStepView() {
    if (!this.steps || this.steps.length === 0) return;

    const step = this.steps[this.currentStepIdx];
    if (!step) return;

    // 1. Update Indicator Badge
    const ind = document.getElementById("stepIndicatorBadge");
    if (ind) ind.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;

    // 2. Render Visual Component
    if (step.array) {
      this.renderer.renderArray(step);
      this.playTone(300 + (step.variables.i || 0) * 40, "triangle", 0.04);
    } else if (step.boardState) {
      this.renderer.renderChessboard(step);
      if (step.boardState.status === "solution") this.playTone(750, "sine", 0.2);
      else if (step.boardState.status === "conflict") this.playTone(220, "sawtooth", 0.05);
      else this.playTone(480, "triangle", 0.05);
    } else if (step.stringState || step.rkState) {
      this.renderer.renderStringMatching(step);
      this.playTone(400 + (step.variables['Text Pointer i'] || step.variables['Shift s'] || 0) * 30, "sine", 0.05);
    } else if (step.dpTable || step.lcsTable || step.fwTable) {
      this.renderer.renderMatrix(step);
      this.playTone(520, "sine", 0.04);
    } else if (step.graph) {
      this.renderer.renderGraph(step);
      this.playTone(440, "triangle", 0.06);
    } else if (step.subsetState) {
      this.renderer.renderSubset(step);
      this.playTone(480, "sine", 0.05);
    }

    // 3. Update ELI5 Explanation
    const eli5Text = document.getElementById("eli5ExplanationText");
    if (eli5Text) eli5Text.textContent = step.explanation;

    // 4. Update Variables Watch Bar
    this.updateVariableWatch(step.variables);

    // 5. Update Code Active Line
    this.highlightCodeLine(this.getActiveLineNum(step));

    // 6. Append Exam Log to Terminal if present
    if (step.examLog) {
      const term = document.getElementById("examOutputTerminal");
      if (term) {
        term.textContent += step.examLog + "\n";
        term.scrollTop = term.scrollHeight;
      }
    }
  }

  getActiveLineNum(step) {
    if (!step) return 1;
    if (this.activeCodeLang === "c") {
      return (step.codeLineC !== undefined) ? step.codeLineC : (step.codeLine || 1);
    } else if (this.activeCodeLang === "pseudo") {
      return (step.codeLinePseudo !== undefined) ? step.codeLinePseudo : (step.codeLine || 1);
    } else if (this.activeCodeLang === "java") {
      return (step.codeLineJava !== undefined) ? step.codeLineJava : (step.codeLine || 1);
    }
    return step.codeLine || 1;
  }

  updateVariableWatch(vars = {}) {
    const bar = document.getElementById("variableWatchBar");
    if (!bar) return;

    bar.innerHTML = "";
    for (const [key, val] of Object.entries(vars)) {
      const chip = document.createElement("div");
      chip.className = "var-chip";
      chip.innerHTML = `<span class="var-chip-name">${key}:</span><span class="var-chip-val">${val}</span>`;
      bar.appendChild(chip);
    }
  }

  renderCodeViewer() {
    const container = document.getElementById("codeViewer");
    if (!container) return;

    const snippet = CODE_SNIPPETS[this.currentAlgoId];
    if (!snippet) {
      container.innerHTML = `<div class="code-line"><span class="code-line-text">No code snippet available.</span></div>`;
      return;
    }

    let lines = [];
    if (this.activeCodeLang === "c") {
      lines = snippet.c.split("\n");
    } else if (this.activeCodeLang === "java") {
      lines = snippet.java.split("\n");
    } else {
      lines = snippet.pseudo;
    }

    container.innerHTML = "";
    lines.forEach((lineText, idx) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "code-line";
      lineDiv.id = `codeLine-${idx + 1}`;
      lineDiv.innerHTML = `
        <span class="code-line-number">${idx + 1}</span>
        <span class="code-line-text">${this.escapeHTML(lineText)}</span>
      `;
      container.appendChild(lineDiv);
    });

    const activeLineNum = this.getActiveLineNum(this.steps[this.currentStepIdx]);
    this.highlightCodeLine(activeLineNum);
  }

  highlightCodeLine(lineNum) {
    document.querySelectorAll(".code-line").forEach(l => l.classList.remove("active-line"));
    const target = document.getElementById(`codeLine-${lineNum}`);
    if (target) {
      target.classList.add("active-line");
      // Auto-scroll inside code viewer
      target.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Playback Control Methods
  stepForward() {
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      this.updateStepView();
    } else {
      this.pause();
    }
  }

  stepBack() {
    if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      this.updateStepView();
    }
  }

  resetSteps() {
    this.pause();
    this.currentStepIdx = 0;
    const term = document.getElementById("examOutputTerminal");
    const data = ALGO_DATA[this.currentAlgoId];
    if (term && data) {
      term.textContent = `=== TSEC PRACTICAL EXAM CONSOLE OUTPUT ===\nExperiment #${data.tsecSrNo}: ${data.name}\nRequirement: ${data.examRequirements}\n--------------------------------------------------\n`;
    }
    this.updateStepView();
  }

  togglePlay() {
    if (this.isPlaying) this.pause();
    else this.play();
  }

  play() {
    if (this.currentStepIdx >= this.steps.length - 1) {
      this.currentStepIdx = 0;
    }
    this.isPlaying = true;
    const btn = document.getElementById("btnPlayPause");
    if (btn) {
      btn.innerHTML = `<span>⏸</span> Pause`;
      btn.className = "ctrl-btn btn-pause";
    }

    this.playbackInterval = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.stepForward();
      } else {
        this.pause();
      }
    }, this.playbackSpeedMs);
  }

  pause() {
    this.isPlaying = false;
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
    const btn = document.getElementById("btnPlayPause");
    if (btn) {
      btn.innerHTML = `<span>▶</span> Play`;
      btn.className = "ctrl-btn btn-play";
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById("btnSoundToggle");
    if (btn) {
      btn.textContent = this.soundEnabled ? "🔊 Sound: ON" : "🔇 Sound: OFF";
    }
  }

  switchMainTab(tabName) {
    this.activeTab = tabName;
    const visualizerSection = document.getElementById("visualizerTabSection");
    const studySection = document.getElementById("studyTabSection");

    if (tabName === "visualizer") {
      visualizerSection.style.display = "grid";
      studySection.style.display = "none";
    } else {
      visualizerSection.style.display = "none";
      studySection.style.display = "block";
      this.renderStudyTab(tabName);
    }
  }

  renderStudyTab(tabName) {
    const container = document.getElementById("studyTabSection");
    if (!container) return;

    if (tabName === "viva") {
      // Full Viva Voce Cards for All 16 Algorithms
      container.innerHTML = `
        <div class="viva-view-container">
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">🎓 TSEC AOA Practical Exam - Viva Voce Master Bank</h2>
          <p style="color: var(--text-muted); margin-bottom: 24px;">
            High-yield viva questions asked by Mumbai University / TSEC professors with both kid-friendly intuitions and formal academic answers.
          </p>

          ${Object.values(ALGO_DATA).map(item => `
            <div class="viva-card">
              <div class="viva-card-header">
                <div class="viva-algo-name">#${item.tsecSrNo} ${item.name} (${item.category})</div>
                <span class="badge badge-primary">${item.spaceComplexity}</span>
              </div>

              <div class="viva-complexity-grid">
                <div class="complexity-item">
                  <span class="comp-label">Best Time:</span>
                  <div class="comp-val">${item.timeComplexity.best}</div>
                </div>
                <div class="complexity-item">
                  <span class="comp-label">Average Time:</span>
                  <div class="comp-val">${item.timeComplexity.avg}</div>
                </div>
                <div class="complexity-item">
                  <span class="comp-label">Worst Time:</span>
                  <div class="comp-val">${item.timeComplexity.worst}</div>
                </div>
              </div>

              <div style="background: rgba(99, 102, 241, 0.08); padding: 8px 12px; border-radius: 6px; margin-bottom: 12px;">
                <b style="color: var(--accent-cyan); font-size: 0.8rem;">🎯 EXAM MANDATORY REQUIREMENT:</b>
                <div style="font-size: 0.85rem; color: #e2e8f0;">${item.examRequirements}</div>
              </div>

              <div class="viva-qa-list">
                ${item.vivaQuestions.map(q => `
                  <div class="viva-qa-item">
                    <div class="viva-q">Q: ${q.q}</div>
                    <div class="viva-a">A: ${q.a}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (tabName === "complexity") {
      // Master Complexity Comparison Table
      container.innerHTML = `
        <div class="viva-view-container">
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">📊 Master Time & Space Complexity Matrix</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Quick reference table for viva comparisons and asymptotic derivations.</p>
          
          <table class="dp-matrix-table" style="width: 100%; text-align: left;">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Algorithm</th>
                <th>Category</th>
                <th>Best Case</th>
                <th>Avg Case</th>
                <th>Worst Case</th>
                <th>Aux Space</th>
                <th>Stability</th>
              </tr>
            </thead>
            <tbody>
              ${Object.values(ALGO_DATA).map(a => `
                <tr>
                  <td><b>#${a.tsecSrNo}</b></td>
                  <td style="color: var(--accent-cyan); font-weight: 600;">${a.name}</td>
                  <td>${a.category}</td>
                  <td>${a.timeComplexity.best.split(" - ")[0]}</td>
                  <td>${a.timeComplexity.avg.split(" - ")[0]}</td>
                  <td>${a.timeComplexity.worst.split(" - ")[0]}</td>
                  <td>${a.spaceComplexity.split(" - ")[0]}</td>
                  <td>${a.stability || "N/A"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (tabName === "guidelines") {
      // Official Instructions extracted from PDF
      container.innerHTML = `
        <div class="viva-view-container">
          <h2 style="font-size: 1.6rem; margin-bottom: 8px;">📋 TSEC Practical Examination Guidelines & Checklist</h2>
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; line-height: 1.8;">
            <p><b>Subject:</b> Analysis of Algorithm (Subject Code: 2113113) - Semester III</p>
            <p><b>College:</b> Thadomal Shahani Engineering College (TSEC), Computer Engineering Dept.</p>
            <hr style="border-color: var(--border-color); margin: 16px 0;" />
            <h3 style="color: var(--accent-cyan); margin-bottom: 10px;">Official Exam Rules:</h3>
            <ul style="padding-left: 20px; color: #cbd5e1;">
              <li><b>1.</b> Report 30 minutes prior to exam time with uploaded e-journal of Analysis of Algorithm.</li>
              <li><b>2.</b> Allowed Programming Languages: <b>C and Java</b>.</li>
              <li><b>3.</b> Carry your own stationery (pen, pencil, scale, eraser, calculator, water bottle).</li>
              <li><b>4.</b> Zero malpractice tolerance (mobiles and study materials strictly prohibited).</li>
              <li><b>5.</b> Ensure course exit feedback and survey forms are filled beforehand.</li>
              <li><b>6.</b> Strictly adhere to formal dress code.</li>
            </ul>
          </div>
        </div>
      `;
    }
  }
}

// Instantiate on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.aoaApp = new AOAApp();
});
