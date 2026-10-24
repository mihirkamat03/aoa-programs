/**
 * Dynamic Programming Algorithm Step Generators:
 * 0/1 Knapsack, Longest Common Subsequence (LCS), and Floyd-Warshall APSP.
 * Output requirements:
 * - 0/1 Knapsack: Solution vector X, total profit earned, and DP matrix.
 * - LCS: Length, characters in LCS, and matrix along with arrows.
 * - Floyd-Warshall: Final D and Pi matrix, and path between every pair of vertices.
 */

function generateKnapsackSteps(W = 7, weights = [2, 3, 4, 5], values = [3, 4, 5, 6]) {
  const steps = [];
  const n = weights.length;
  // Initialize matrix V of size (n+1) x (W+1) with 0
  const V = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0));

  steps.push({
    codeLine: 1,
    dpTable: {
      matrix: V.map(row => [...row]),
      numRows: n + 1,
      numCols: W + 1,
      weights,
      values,
      W,
      activeCell: null,
      refCells: []
    },
    variables: { i: 0, w: 0, capacity: W, numItems: n },
    explanation: `0/1 Knapsack starts! We create a DP table of size (${n + 1}) rows × (${W + 1}) columns. Row 0 (0 items available) and Column 0 (backpack capacity 0) are filled with 0 profit.`,
    examLog: `Knapsack Initialized: Capacity W = ${W}, Items = ${n}`
  });

  for (let i = 1; i <= n; i++) {
    const itemWeight = weights[i - 1];
    const itemValue = values[i - 1];

    for (let w = 1; w <= W; w++) {
      if (itemWeight > w) {
        // Item is too heavy
        V[i][w] = V[i - 1][w];

        steps.push({
          codeLine: 6,
          dpTable: {
            matrix: V.map(row => [...row]),
            numRows: n + 1,
            numCols: W + 1,
            weights,
            values,
            W,
            activeCell: { r: i, c: w },
            refCells: [{ r: i - 1, c: w, label: "V[i-1][w]" }]
          },
          variables: { i, w, "itemWeight": itemWeight, "itemValue": itemValue, "decision": "Too heavy! Copy top" },
          explanation: `Item ${i} (weight: ${itemWeight}, profit: ${itemValue}) is too heavy for current bag capacity w = ${w} (${itemWeight} > ${w})! We cannot take it. So copy profit directly from cell above: V[${i-1}][${w}] = ${V[i-1][w]}.`,
          examLog: null
        });
      } else {
        // Compare taking vs leaving
        const excludeVal = V[i - 1][w];
        const includeVal = itemValue + V[i - 1][w - itemWeight];
        V[i][w] = Math.max(excludeVal, includeVal);

        steps.push({
          codeLine: 8,
          dpTable: {
            matrix: V.map(row => [...row]),
            numRows: n + 1,
            numCols: W + 1,
            weights,
            values,
            W,
            activeCell: { r: i, c: w },
            refCells: [
              { r: i - 1, c: w, label: `Leave (${excludeVal})` },
              { r: i - 1, c: w - itemWeight, label: `Take (${includeVal})` }
            ]
          },
          variables: {
            i, w, "wt": itemWeight, "val": itemValue,
            "Exclude (top)": excludeVal,
            "Include (val + V[i-1][w-wt])": `${itemValue} + ${V[i-1][w-itemWeight]} = ${includeVal}`,
            "Max chosen": V[i][w]
          },
          explanation: `Item ${i} fits! We compare: Choice 1 (Leave it) = V[${i-1}][${w}] = ${excludeVal} VS Choice 2 (Take it) = profit ${itemValue} + remaining capacity profit V[${i-1}][${w - itemWeight}] (${V[i-1][w - itemWeight]}) = ${includeVal}. We pick max = ${V[i][w]}!`,
          examLog: null
        });
      }
    }
  }

  // Backtracking for solution vector X
  const X = new Array(n).fill(0);
  let curW = W;
  const traceCells = [];

  for (let i = n; i > 0; i--) {
    traceCells.push({ r: i, c: curW });
    if (V[i][curW] !== V[i - 1][curW]) {
      X[i - 1] = 1; // Item included!
      curW -= weights[i - 1];
    }
  }

  const matrixString = V.map(row => row.map(v => String(v).padStart(3, " ")).join(" ")).join("\n");

  steps.push({
    codeLine: 10,
    dpTable: {
      matrix: V.map(row => [...row]),
      numRows: n + 1,
      numCols: W + 1,
      weights,
      values,
      W,
      activeCell: { r: n, c: W },
      refCells: traceCells.map(c => ({ ...c, label: "Path" }))
    },
    variables: {
      "Total Profit": V[n][W],
      "Solution Vector X": JSON.stringify(X),
      "Packed Items": weights.filter((_, idx) => X[idx] === 1).map((w, idx) => `Item #${idx + 1}(wt ${w})`).join(", ")
    },
    explanation: `🎉 DP Table Filled! Maximum Profit = ${V[n][W]}. By backtracking from V[${n}][${W}], we determine Solution Vector X = [${X.join(", ")}]. (Items packed: ${X.map((x, idx) => x ? `#${idx + 1}` : null).filter(Boolean).join(", ")}).`,
    examLog: `=== Final 0/1 Knapsack Output ===\nKnapsack DP Matrix:\n${matrixString}\n\nTotal Profit Earned = ${V[n][W]}\nSolution Vector X = [ ${X.join(" ")} ]`
  });

  return steps;
}

function generateLCSSteps(X = "LONGEST", Y = "STONE") {
  const steps = [];
  const m = X.length;
  const n = Y.length;

  const L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const B = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(" ")); // 'D' (diag \), 'U' (^), 'L' (<)

  steps.push({
    codeLine: 1,
    lcsTable: {
      L: L.map(r => [...r]),
      B: B.map(r => [...r]),
      X, Y,
      activeCell: null
    },
    variables: { i: 0, j: 0, str1: X, str2: Y },
    explanation: `LCS Algorithm starts! String X = "${X}" (length ${m}) and String Y = "${Y}" (length ${n}). Table row 0 and column 0 are initialized to 0.`,
    examLog: `LCS Started: X = "${X}", Y = "${Y}"`
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const charX = X[i - 1];
      const charY = Y[j - 1];

      if (charX === charY) {
        L[i][j] = L[i - 1][j - 1] + 1;
        B[i][j] = "↖"; // Diagonal match

        steps.push({
          codeLine: 4,
          lcsTable: {
            L: L.map(r => [...r]),
            B: B.map(r => [...r]),
            X, Y,
            activeCell: { r: i, c: j },
            refCell: { r: i - 1, c: j - 1 }
          },
          variables: { i, j, "X[i]": charX, "Y[j]": charY, "Match": "YES! ↖", "L[i][j]": L[i][j] },
          explanation: `Characters Match! X[${i - 1}] == Y[${j - 1}] ('${charX}'). We take top-left diagonal score + 1: L[${i-1}][${j-1}] + 1 = ${L[i][j]}. Direction arrow = ↖ (Diagonal).`,
          examLog: null
        });
      } else if (L[i - 1][j] >= L[i][j - 1]) {
        L[i][j] = L[i - 1][j];
        B[i][j] = "↑"; // From Top

        steps.push({
          codeLine: 7,
          lcsTable: {
            L: L.map(r => [...r]),
            B: B.map(r => [...r]),
            X, Y,
            activeCell: { r: i, c: j },
            refCell: { r: i - 1, c: j }
          },
          variables: { i, j, "X[i]": charX, "Y[j]": charY, "Match": "NO (take top ↑)", "L[i][j]": L[i][j] },
          explanation: `Mismatch ('${charX}' != '${charY}'). Top cell (${L[i-1][j]}) >= Left cell (${L[i][j-1]}). We carry forward value from TOP: ${L[i][j]}. Arrow = ↑.`,
          examLog: null
        });
      } else {
        L[i][j] = L[i][j - 1];
        B[i][j] = "←"; // From Left

        steps.push({
          codeLine: 9,
          lcsTable: {
            L: L.map(r => [...r]),
            B: B.map(r => [...r]),
            X, Y,
            activeCell: { r: i, c: j },
            refCell: { r: i, c: j - 1 }
          },
          variables: { i, j, "X[i]": charX, "Y[j]": charY, "Match": "NO (take left ←)", "L[i][j]": L[i][j] },
          explanation: `Mismatch ('${charX}' != '${charY}'). Left cell (${L[i][j-1]}) > Top cell (${L[i-1][j]}). We carry forward value from LEFT: ${L[i][j]}. Arrow = ←.`,
          examLog: null
        });
      }
    }
  }

  // Reconstruct LCS string
  let i = m, j = n;
  const lcsChars = [];
  const pathCells = [];

  while (i > 0 && j > 0) {
    pathCells.push({ r: i, c: j });
    if (B[i][j] === "↖") {
      lcsChars.push(X[i - 1]);
      i--; j--;
    } else if (B[i][j] === "↑") {
      i--;
    } else {
      j--;
    }
  }

  const lcsString = lcsChars.reverse().join("");

  let matrixLog = "    " + Y.split("").map(c => `  ${c}`).join("") + "\n";
  for (let r = 0; r <= m; r++) {
    matrixLog += (r === 0 ? " " : X[r - 1]) + ": " + L[r].map((val, c) => `${val}${B[r][c] || " "}`).join(" ") + "\n";
  }

  steps.push({
    codeLine: 11,
    lcsTable: {
      L: L.map(r => [...r]),
      B: B.map(r => [...r]),
      X, Y,
      pathCells,
      activeCell: { r: m, c: n }
    },
    variables: { "LCS Length": L[m][n], "LCS String": lcsString },
    explanation: `🎉 LCS Table Complete! Reconstructing along arrows backward: Length = ${L[m][n]}, Characters in LCS = "${lcsString}" (as required by TSEC practical exam!).`,
    examLog: `=== Final LCS Output ===\nMatrix along with Arrows:\n${matrixLog}\nLength of LCS = ${L[m][n]}\nCharacters in LCS = ${lcsString}`
  });

  return steps;
}

function generateFloydWarshallSteps() {
  const steps = [];
  const V = 4;
  const INF = 999999;

  const initialGraph = [
    [0,   3,   INF, 5],
    [2,   0,   INF, 4],
    [INF, 1,   0,   INF],
    [INF, INF, 2,   0]
  ];

  const D = initialGraph.map(row => [...row]);
  const Pi = Array.from({ length: V }, (_, i) =>
    Array.from({ length: V }, (_, j) => (i === j || initialGraph[i][j] === INF) ? -1 : i)
  );

  steps.push({
    codeLine: 2,
    fwTable: {
      D: D.map(r => [...r]),
      Pi: Pi.map(r => [...r]),
      V, k: -1, i: -1, j: -1
    },
    variables: { stage: "D^(0) Matrix", k: "-", i: "-", j: "-" },
    explanation: "Floyd-Warshall begins! Initial D matrix holds direct edge weights. Pi matrix holds the direct predecessor vertex (or -1 if no edge). We will run 3 nested loops: k, i, j.",
    examLog: "Floyd-Warshall initialized with 4 vertices."
  });

  for (let k = 0; k < V; k++) {
    steps.push({
      codeLine: 3,
      fwTable: {
        D: D.map(r => [...r]),
        Pi: Pi.map(r => [...r]),
        V, k, i: -1, j: -1
      },
      variables: { stage: `Phase k = ${k}`, "Allowed intermediate vertex": k },
      explanation: `🔄 Phase k = ${k}: We now test if paths from ANY vertex i to j can be shortened by taking intermediate pitstop at vertex k = ${k}.`,
      examLog: `--- Phase k = ${k} ---`
    });

    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (i !== j && D[i][k] !== INF && D[k][j] !== INF) {
          const detourDist = D[i][k] + D[k][j];
          if (detourDist < D[i][j]) {
            const oldDist = D[i][j];
            D[i][j] = detourDist;
            Pi[i][j] = Pi[k][j];

            steps.push({
              codeLine: 6,
              fwTable: {
                D: D.map(r => [...r]),
                Pi: Pi.map(r => [...r]),
                V, k, i, j,
                updatedCell: { r: i, c: j }
              },
              variables: {
                k, i, j,
                "D[i][k]": D[i][k],
                "D[k][j]": D[k][j],
                "D[i][k] + D[k][j]": detourDist,
                "Old D[i][j]": oldDist === INF ? "INF" : oldDist,
                "New D[i][j]": detourDist
              },
              explanation: `⚡ SHORTCUT FOUND! Going from ${i} -> ${k} -> ${j} costs ${D[i][k]} + ${D[k][j]} = ${detourDist}, which is strictly faster than old D[${i}][${j}] (${oldDist === INF ? "INF" : oldDist})! Updated D[${i}][${j}] = ${detourDist} and Pi[${i}][${j}] = ${Pi[k][j]}.`,
              examLog: `D[${i}][${j}] improved from ${oldDist === INF ? 'INF' : oldDist} to ${detourDist} via k=${k}`
            });
          }
        }
      }
    }
  }

  function getPath(i, j) {
    if (i === j) return `${i}`;
    if (Pi[i][j] === -1) return "No Path";
    return getPath(i, Pi[i][j]) + " -> " + j;
  }

  const allPairsPaths = [];
  for (let i = 0; i < V; i++) {
    for (let j = 0; j < V; j++) {
      if (i !== j && D[i][j] !== INF) {
        allPairsPaths.push(`Path ${i} to ${j} (Cost ${D[i][j]}): ${getPath(i, j)}`);
      }
    }
  }

  const dMatrixStr = D.map(r => r.map(v => (v === INF ? "INF" : String(v)).padStart(4, " ")).join(" ")).join("\n");
  const piMatrixStr = Pi.map(r => r.map(v => String(v).padStart(3, " ")).join(" ")).join("\n");

  steps.push({
    codeLine: 9,
    fwTable: {
      D: D.map(r => [...r]),
      Pi: Pi.map(r => [...r]),
      V, k: "Done", i: -1, j: -1
    },
    variables: { "All Pairs Solved": true },
    explanation: `🎉 Floyd-Warshall Complete! Final D Matrix and Pi Matrix computed. All-pairs shortest paths reconstructed (required by TSEC practical exam!).`,
    examLog: `=== Final Floyd-Warshall Output ===\nFinal D Matrix:\n${dMatrixStr}\n\nFinal Pi Matrix:\n${piMatrixStr}\n\nPaths between all pairs:\n` + allPairsPaths.join("\n")
  });

  return steps;
}
