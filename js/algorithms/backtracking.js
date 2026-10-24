/**
 * Backtracking Algorithm Step Generators:
 * N-Queens Problem & Sum of Subsets.
 * Output requirements:
 * - N-Queens: Print output in 1D and 2D format, and print total number of calls to queen procedure.
 * - Sum of Subsets: Print total number of calls to Sum of Subset procedure, and solution vectors.
 */

function generateNQueensSteps(n = 4) {
  const steps = [];
  const x = new Array(n + 1).fill(0); // 1-based indexing for x[1..n]
  let callCount = 0;
  let solutionCount = 0;

  function place(k, i) {
    for (let j = 1; j < k; j++) {
      if (x[j] === i || Math.abs(x[j] - i) === Math.abs(j - k)) {
        return false;
      }
    }
    return true;
  }

  function getConflictReason(k, i) {
    for (let j = 1; j < k; j++) {
      if (x[j] === i) {
        return `Same column conflict with Queen in Row ${j}!`;
      }
      if (Math.abs(x[j] - i) === Math.abs(j - k)) {
        return `Diagonal conflict with Queen in Row ${j} (|${x[j]} - ${i}| == |${j} - ${k}|)!`;
      }
    }
    return "Safe!";
  }

  steps.push({
    codeLine: 1,
    boardState: {
      n,
      queens: {}, // row -> col
      activeRow: 1,
      candidateCol: null,
      status: "init"
    },
    variables: { k: 1, n, call_count: 0, sol_count: 0, "1D Array x": "[0, 0, 0, 0]" },
    explanation: `N-Queens Backtracking begins for N = ${n}! We have an ${n}×${n} board. We want to place ${n} queens so no two attack each other. Queens are placed row by row (k = 1 to ${n}).`,
    examLog: `N-Queens Problem started for N = ${n}`
  });

  function nQueen(k) {
    callCount++;
    const currentCall = callCount;

    steps.push({
      codeLine: 6,
      boardState: {
        n,
        queens: { ...getQueensObj() },
        activeRow: k,
        candidateCol: null,
        status: "entering"
      },
      variables: { k, call_count: callCount, sol_count: solutionCount, "1D Array x": format1D() },
      explanation: `👑 nQueen(k = ${k}) called! (Procedure Call #${currentCall}). We are now trying to place a queen safely in Row ${k}.`,
      examLog: `Call #${callCount}: nQueen(k=${k})`
    });

    for (let i = 1; i <= n; i++) {
      const isSafe = place(k, i);
      const reason = getConflictReason(k, i);

      steps.push({
        codeLine: 8,
        boardState: {
          n,
          queens: { ...getQueensObj() },
          activeRow: k,
          candidateCol: i,
          status: isSafe ? "safe" : "conflict",
          conflictReason: reason
        },
        variables: { k, "candidateCol i": i, "place(k, i)": isSafe ? "TRUE (Safe)" : "FALSE (Conflict)", call_count: callCount },
        explanation: `Testing square (Row ${k}, Column ${i}): ${isSafe ? "✅ SAFE! No row, column, or diagonal conflict with previous queens." : "❌ UNSAFE! " + reason}`,
        examLog: null
      });

      if (isSafe) {
        x[k] = i;

        steps.push({
          codeLine: 9,
          boardState: {
            n,
            queens: { ...getQueensObj() },
            activeRow: k,
            candidateCol: null,
            status: "placed"
          },
          variables: { k, "x[k]": i, "1D Array x": format1D(), call_count: callCount },
          explanation: `Placed Queen in Row ${k} at Column ${i}! Current 1D placement vector: ${format1D()}.`,
          examLog: null
        });

        if (k === n) {
          solutionCount++;
          const sol1D = format1D();
          const board2D = generate2DBoardStr();

          steps.push({
            codeLine: 10,
            boardState: {
              n,
              queens: { ...getQueensObj() },
              activeRow: k,
              candidateCol: null,
              status: "solution",
              solutionNumber: solutionCount
            },
            variables: { "🎉 SOLUTION FOUND": `#${solutionCount}`, "1D Format": sol1D, call_count: callCount },
            explanation: `🎉 BINGO! Solution #${solutionCount} Found! All ${n} queens placed peacefully on board. 1D Vector = ${sol1D} (as required by TSEC practical exam!).`,
            examLog: `=== Solution ${solutionCount} Found ===\n1D Array Format: ${sol1D}\n2D Board Format:\n${board2D}`
          });
        } else {
          nQueen(k + 1);
        }

        // Backtrack
        x[k] = 0;
        steps.push({
          codeLine: 7,
          boardState: {
            n,
            queens: { ...getQueensObj() },
            activeRow: k,
            candidateCol: null,
            status: "backtracking"
          },
          variables: { k, "Backtracking": `Lifting Queen from Row ${k}`, call_count: callCount, "1D Array x": format1D() },
          explanation: `🔙 Backtracking: Lift queen from (Row ${k}, Column ${i}) and test next column!`,
          examLog: null
        });
      }
    }
  }

  function getQueensObj() {
    const obj = {};
    for (let r = 1; r <= n; r++) {
      if (x[r] > 0) obj[r] = x[r];
    }
    return obj;
  }

  function format1D() {
    return "[ " + x.slice(1, n + 1).join(", ") + " ]";
  }

  function generate2DBoardStr() {
    let s = "";
    for (let r = 1; r <= n; r++) {
      let rowStr = "";
      for (let c = 1; c <= n; c++) {
        rowStr += (x[r] === c) ? " Q " : " . ";
      }
      s += rowStr + "\n";
    }
    return s;
  }

  nQueen(1);

  steps.push({
    codeLine: 11,
    boardState: {
      n,
      queens: {},
      status: "done"
    },
    variables: { "Total Solutions": solutionCount, "Total Procedure Calls": callCount },
    explanation: `🏁 N-Queens Search Finished! Total distinct solutions found = ${solutionCount}. TOTAL calls to queen procedure = ${callCount} (as required by TSEC practical exam!).`,
    examLog: `=== Summary ===\nTotal Solutions Found: ${solutionCount}\nTotal Calls to Queen Procedure: ${callCount}`
  });

  return steps;
}

function generateSumOfSubsetSteps(weights = [3, 5, 7, 9], M = 12) {
  const steps = [];
  const n = weights.length;
  const x = new Array(n).fill(0);
  let callCount = 0;
  let solCount = 0;

  const totalSum = weights.reduce((a, b) => a + b, 0);

  steps.push({
    codeLine: 1,
    subsetState: {
      weights,
      M,
      x: [...x],
      currentSum: 0,
      remainingSum: totalSum,
      k: 0
    },
    variables: { M, weights: JSON.stringify(weights), totalSum, call_count: 0 },
    explanation: `Sum of Subsets starts! Weights set: [${weights.join(", ")}], Target sum M = ${M}. Total available sum = ${totalSum}.`,
    examLog: `Sum of Subsets initialized with weights = ${JSON.stringify(weights)}, M = ${M}`
  });

  function sumOfSubset(s, k, r) {
    callCount++;
    const currentCall = callCount;

    // Branch 1: Include w[k]
    x[k] = 1;
    const includedSum = s + weights[k];

    steps.push({
      codeLine: 4,
      subsetState: {
        weights,
        M,
        x: [...x],
        currentSum: includedSum,
        remainingSum: r - weights[k],
        k
      },
      variables: {
        k, "w[k]": weights[k],
        decision: `INCLUDE w[${k}] = ${weights[k]}`,
        "Current Sum s": includedSum,
        "Target M": M,
        call_count: callCount
      },
      explanation: `📞 Call #${currentCall}: BRANCH 1 -> TRY INCLUDING element w[${k}] = ${weights[k]} (set x[${k}] = 1). New sum = ${s} + ${weights[k]} = ${includedSum}.`,
      examLog: `Call #${callCount}: Including w[${k}]=${weights[k]}, sum=${includedSum}`
    });

    if (includedSum === M) {
      solCount++;
      const solVec = "[ " + x.join(", ") + " ]";
      const subsetStr = "{ " + weights.filter((_, idx) => x[idx] === 1).join(", ") + " }";

      steps.push({
        codeLine: 5,
        subsetState: {
          weights,
          M,
          x: [...x],
          currentSum: includedSum,
          remainingSum: r - weights[k],
          k,
          isSolution: true
        },
        variables: { "🎉 SOLUTION FOUND": `#${solCount}`, "Vector X": solVec, "Subset": subsetStr, call_count: callCount },
        explanation: `🎉 TARGET REACHED! Current sum (${includedSum}) == Target M (${M})! Solution Vector X = ${solVec} -> Subset = ${subsetStr}!`,
        examLog: `Solution #${solCount}: Vector X = ${solVec} -> Subset: ${subsetStr}`
      });
    } else if (k + 1 < n && includedSum + weights[k + 1] <= M) {
      sumOfSubset(includedSum, k + 1, r - weights[k]);
    } else {
      steps.push({
        codeLine: 6,
        subsetState: {
          weights,
          M,
          x: [...x],
          currentSum: includedSum,
          remainingSum: r - weights[k],
          k
        },
        variables: { k, reason: "Pruned by bounding condition", call_count: callCount },
        explanation: `✂️ Pruned branch! Adding next element would exceed target sum M (${M}) or no elements left.`,
        examLog: null
      });
    }

    // Branch 2: Exclude w[k]
    if (k + 1 < n && (s + r - weights[k] >= M) && (s + weights[k + 1] <= M)) {
      x[k] = 0;

      steps.push({
        codeLine: 8,
        subsetState: {
          weights,
          M,
          x: [...x],
          currentSum: s,
          remainingSum: r - weights[k],
          k
        },
        variables: {
          k, "w[k]": weights[k],
          decision: `EXCLUDE w[${k}] = ${weights[k]}`,
          "Current Sum s": s,
          call_count: callCount
        },
        explanation: `BRANCH 2 -> TRY EXCLUDING element w[${k}] = ${weights[k]} (set x[${k}] = 0). Sum stays ${s}. Bounding check passed: remaining elements can still achieve target sum!`,
        examLog: `Excluding w[${k}]=${weights[k]}`
      });

      sumOfSubset(s, k + 1, r - weights[k]);
    } else {
      x[k] = 0;
    }
  }

  sumOfSubset(0, 0, totalSum);

  steps.push({
    codeLine: 10,
    subsetState: {
      weights,
      M,
      x: [...x],
      currentSum: 0,
      remainingSum: 0,
      k: n
    },
    variables: { "Total Solutions": solCount, "Total Procedure Calls": callCount },
    explanation: `🏁 Sum of Subsets Complete! Total valid subsets found = ${solCount}. TOTAL calls to SumOfSubset procedure = ${callCount} (as required by TSEC practical exam!).`,
    examLog: `=== Final Summary ===\nTotal Solutions: ${solCount}\nTotal Calls to SumOfSubset Procedure: ${callCount}`
  });

  return steps;
}
