/**
 * String Matching Algorithm Step Generators:
 * Knuth-Morris-Pratt (KMP) and Rabin-Karp.
 * Output requirements:
 * - KMP: Precomputed LPS (pi) table and all occurrence indices.
 * - Rabin-Karp: Rolling hash value at each window, pattern hash, and all occurrences + spurious hits.
 */

function generateKMPSteps(text = "AABAACAADAABAABA", pattern = "AABA") {
  const steps = [];
  const n = text.length;
  const m = pattern.length;

  // 1. Build LPS array
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;

  steps.push({
    codeLine: 1,
    stringState: {
      text, pattern, lps: [...lps],
      textIdx: null, patIdx: null,
      phase: "LPS_BUILD"
    },
    variables: { phase: "Precomputing LPS (pi) Table", i: 1, len: 0 },
    explanation: `KMP begins! First, we precompute the π (LPS) table for Pattern "${pattern}". π[j] tells us: 'If we mismatch at j, what is the length of longest prefix that is also a suffix?' lps[0] is always 0.`,
    examLog: `KMP Preprocessing for Pattern: "${pattern}"`
  });

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;

      steps.push({
        codeLine: 5,
        stringState: {
          text, pattern, lps: [...lps],
          lpsI: i, lpsLen: len,
          phase: "LPS_BUILD"
        },
        variables: { i, len, "pattern[i]": pattern[i], "pattern[len-1]": pattern[len - 1], "lps[i]": len },
        explanation: `LPS Match! pattern[i=${i}] ('${pattern[i]}') == pattern[len=${len - 1}] ('${pattern[len - 1]}'). Increment len to ${len} and set lps[${i}] = ${len}.`,
        examLog: null
      });

      i++;
    } else {
      if (len !== 0) {
        const oldLen = len;
        len = lps[len - 1];
        steps.push({
          codeLine: 8,
          stringState: {
            text, pattern, lps: [...lps],
            lpsI: i, lpsLen: len,
            phase: "LPS_BUILD"
          },
          variables: { i, "old len": oldLen, "new len = lps[len-1]": len },
          explanation: `LPS Mismatch at i=${i}! Fall back len from ${oldLen} to lps[${oldLen - 1}] = ${len}.`,
          examLog: null
        });
      } else {
        lps[i] = 0;
        steps.push({
          codeLine: 10,
          stringState: {
            text, pattern, lps: [...lps],
            lpsI: i, lpsLen: 0,
            phase: "LPS_BUILD"
          },
          variables: { i, len: 0, "lps[i]": 0 },
          explanation: `LPS Mismatch at i=${i} with len=0! Set lps[${i}] = 0. Advance i to ${i + 1}.`,
          examLog: null
        });
        i++;
      }
    }
  }

  steps.push({
    codeLine: 12,
    stringState: {
      text, pattern, lps: [...lps],
      phase: "LPS_DONE"
    },
    variables: { "Final LPS Table": JSON.stringify(lps) },
    explanation: `✅ LPS Table Ready! LPS = [${lps.join(", ")}]. Now we start scanning the Text string "${text}" using pointer i (for text) and j (for pattern). POINTER i NEVER BACKTRACKS!`,
    examLog: `Precomputed LPS Table: [ ${lps.join(", ")} ]`
  });

  // 2. Text Search
  let textI = 0;
  let patJ = 0;
  const matches = [];

  while (textI < n) {
    steps.push({
      codeLine: 14,
      stringState: {
        text, pattern, lps: [...lps],
        textIdx: textI, patIdx: patJ,
        phase: "SEARCH_COMPARE",
        matchStatus: (pattern[patJ] === text[textI]) ? "match" : "mismatch",
        matches: [...matches]
      },
      variables: {
        "Text Pointer i": textI, "Char Text[i]": text[textI],
        "Pattern Pointer j": patJ, "Char Pat[j]": pattern[patJ],
        "Result": (pattern[patJ] === text[textI]) ? "MATCH! 🎉" : "MISMATCH ❌"
      },
      explanation: `Comparing text[i=${textI}] ('${text[textI]}') with pattern[j=${patJ}] ('${pattern[patJ]}'). ` +
        (pattern[patJ] === text[textI] ? "They match! Advance both pointers i and j." : "Mismatch! KMP will use the LPS table to jump j without resetting i."),
      examLog: null
    });

    if (pattern[patJ] === text[textI]) {
      textI++;
      patJ++;
    }

    if (patJ === m) {
      const matchIdx = textI - patJ;
      matches.push(matchIdx);

      steps.push({
        codeLine: 16,
        stringState: {
          text, pattern, lps: [...lps],
          textIdx: textI, patIdx: patJ,
          phase: "SEARCH_FOUND",
          matchIdx,
          matches: [...matches]
        },
        variables: {
          "🎉 PATTERN FOUND": `At index ${matchIdx}`,
          "Occurrences": JSON.stringify(matches)
        },
        explanation: `🎯 BINGO! Pattern found at Text Index ${matchIdx} (substring: "${text.substring(matchIdx, matchIdx + m)}")! Next, jump j = lps[j - 1] = lps[${m - 1}] = ${lps[m - 1]} to search for more matches.`,
        examLog: `Pattern found at index ${matchIdx}`
      });

      patJ = lps[patJ - 1];
    } else if (textI < n && pattern[patJ] !== text[textI]) {
      if (patJ !== 0) {
        const oldJ = patJ;
        patJ = lps[patJ - 1];

        steps.push({
          codeLine: 18,
          stringState: {
            text, pattern, lps: [...lps],
            textIdx: textI, patIdx: patJ,
            phase: "SEARCH_FALLBACK",
            matches: [...matches]
          },
          variables: {
            "Text Pointer i (Unchanged!)": textI,
            "Pattern Pointer old j": oldJ,
            "Jumped j to lps[j-1]": patJ
          },
          explanation: `⚡ KMP MAGIC: Notice pointer i stays at index ${textI}! Only pattern pointer j jumps from ${oldJ} to lps[${oldJ - 1}] = ${patJ} because the first ${patJ} characters are already guaranteed to match!`,
          examLog: null
        });
      } else {
        textI++;
      }
    }
  }

  steps.push({
    codeLine: 20,
    stringState: {
      text, pattern, lps: [...lps],
      phase: "DONE",
      matches: [...matches]
    },
    variables: { "Total Matches Found": matches.length, "Indices": JSON.stringify(matches) },
    explanation: `🏁 KMP Search Complete! Total pattern occurrences: ${matches.length} at indices: [${matches.join(", ")}] (as required by TSEC practical exam!).`,
    examLog: `=== Final KMP Output ===\nLPS Table: [ ${lps.join(" ")} ]\nAll Occurrences at indices: [ ${matches.join(", ")} ]`
  });

  return steps;
}

function generateRabinKarpSteps(text = "2359023141526739921", pattern = "31415", q = 13) {
  const steps = [];
  const d = 10; // Base 10 for digits
  const m = pattern.length;
  const n = text.length;

  let p = 0; // hash for pattern
  let t = 0; // hash for current window
  let h = 1;

  // h = d^(m-1) % q
  for (let i = 0; i < m - 1; i++) {
    h = (h * d) % q;
  }

  // Calculate pattern hash and first window hash
  for (let i = 0; i < m; i++) {
    p = (d * p + parseInt(pattern[i])) % q;
    t = (d * t + parseInt(text[i])) % q;
  }

  steps.push({
    codeLine: 2,
    rkState: {
      text, pattern, q, d, h,
      patternHash: p,
      windowHash: t,
      shift: 0,
      windowStr: text.substring(0, m)
    },
    variables: {
      d, q, "h = (d^(m-1))%q": h,
      "Pattern Hash p": p,
      "Window 0 Hash t": t,
      "Window 0 Substring": text.substring(0, m)
    },
    explanation: `Rabin-Karp starts! We calculate fingerprint hashes modulo prime q = ${q}. Pattern "${pattern}" has hash p = ${p}. The first text window "${text.substring(0, m)}" has hash t = ${t}.`,
    examLog: `Pattern Hash: ${p} (Pattern: "${pattern}", Prime q: ${q})`
  });

  const matches = [];
  const spuriousHits = [];

  for (let s = 0; s <= n - m; s++) {
    const windowStr = text.substring(s, s + m);
    const hashMatches = (p === t);
    let isActualMatch = false;

    if (hashMatches) {
      isActualMatch = (windowStr === pattern);
      if (isActualMatch) {
        matches.push(s);
      } else {
        spuriousHits.push(s);
      }
    }

    steps.push({
      codeLine: 5,
      rkState: {
        text, pattern, q, d, h,
        patternHash: p,
        windowHash: t,
        shift: s,
        windowStr,
        hashMatches,
        isActualMatch,
        matches: [...matches],
        spuriousHits: [...spuriousHits]
      },
      variables: {
        "Shift s": s,
        "Window": `"${windowStr}"`,
        "Pattern Hash p": p,
        "Window Hash t": t,
        "Hash Match?": hashMatches ? "YES! 🎯" : "NO",
        "Character Match?": hashMatches ? (isActualMatch ? "YES (Real Match!)" : "NO (Spurious Hit!)") : "N/A"
      },
      explanation: `Shift s = ${s}: Current window is "${windowStr}" with hash t = ${t} (Pattern hash p = ${p}). ` +
        (hashMatches
          ? (isActualMatch
            ? `🎉 MATCH FOUND! Hash matches (${p} == ${t}) AND character verification matches! Pattern located at index ${s}!`
            : `⚠️ SPURIOUS HIT! Hash matches (${p} == ${t}) due to modulo ${q}, BUT characters "${windowStr}" != "${pattern}"! This is a classic hash collision.`)
          : `Hashes do not match (${t} != ${p}). Move window forward.`),
      examLog: `Shift ${s}: Window "${windowStr}" Hash=${t} -> ` +
        (hashMatches ? (isActualMatch ? `*** ACTUAL MATCH AT ${s} ***` : `[SPURIOUS HIT - Hash Collision]`) : "No match")
    });

    // Rolling hash calculation for next window
    if (s < n - m) {
      const leadingChar = parseInt(text[s]);
      const trailingChar = parseInt(text[s + m]);
      const nextT = (d * (t - leadingChar * h) + trailingChar) % q;
      const normalizedT = (nextT < 0) ? nextT + q : nextT;

      steps.push({
        codeLine: 9,
        rkState: {
          text, pattern, q, d, h,
          patternHash: p,
          windowHash: normalizedT,
          shift: s + 1,
          windowStr: text.substring(s + 1, s + 1 + m),
          rollingCalc: {
            oldHash: t,
            lead: leadingChar,
            trail: trailingChar,
            formula: `(10 * (${t} - ${leadingChar} * ${h}) + ${trailingChar}) % ${q} = ${normalizedT}`
          }
        },
        variables: {
          "Old Hash": t,
          "Subtract Leading": `${leadingChar} × ${h}`,
          "Add Trailing": trailingChar,
          "New Rolling Hash": normalizedT
        },
        explanation: `⚡ ROLLING HASH SLIDE: Instead of re-hashing all ${m} characters from scratch, we slide in O(1) time! Drop old leading '${leadingChar}' and add new trailing '${trailingChar}'. Formula: (d*(t - text[s]*h) + text[s+m]) mod q = ${normalizedT}!`,
        examLog: null
      });

      t = normalizedT;
    }
  }

  steps.push({
    codeLine: 11,
    rkState: {
      text, pattern, q, d, h,
      patternHash: p,
      windowHash: t,
      shift: n - m,
      phase: "DONE",
      matches: [...matches],
      spuriousHits: [...spuriousHits]
    },
    variables: {
      "Total Matches": matches.length,
      "Matches at Indices": JSON.stringify(matches),
      "Total Spurious Hits": spuriousHits.length
    },
    explanation: `🏁 Rabin-Karp Complete! Matches found at indices: [${matches.join(", ")}]. Spurious hits encountered: ${spuriousHits.length} at shifts: [${spuriousHits.join(", ")}] (as required by TSEC practical exam!).`,
    examLog: `=== Final Rabin-Karp Output ===\nOccurrences: [ ${matches.join(", ")} ]\nSpurious Hits: [ ${spuriousHits.join(", ")} ]`
  });

  return steps;
}
