/**
 * Sorting Algorithm Step Generators with ELI5 Explanations,
 * Variable Tracking matching Lecture Notes (i, j, k, h, p, r, x, key, b[]),
 * and Pass-by-Pass Output.
 */

// 1. Insertion Sort (Matches Module 1.3 PDF: outer loop j, key = A[j], inner loop i = j-1)
function generateInsertionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;

  // Initial step
  steps.push({
    codeLineC: 10,
    codeLinePseudo: 1,
    codeLineJava: 11,
    array: [...arr],
    variables: { j: "-", key: "-", i: "-", pass: 0 },
    highlights: [],
    explanation: "👋 Welcome to Insertion Sort! Imagine holding a hand of playing cards. We assume the very first card at index 0 is already 'sorted' by itself. We will loop j from 1 to " + (n - 1) + " (in 1-based math: card 2 to n).",
    examLog: "Initial Array: " + JSON.stringify(arr)
  });

  for (let j = 1; j < n; j++) {
    const key = arr[j];
    let i = j - 1;

    // Pick up key into hand
    steps.push({
      codeLineC: 13, // key = a[j];
      codeLinePseudo: 3,
      codeLineJava: 13,
      array: [...arr],
      floatingKey: key,
      vacatedIdx: j,
      variables: { j, key, i, pass: j },
      highlights: [{ index: j, type: "key" }],
      explanation: `Pass ${j}: We pick up card arr[j=${j}] (value = ${key}) into our fingers as our 'key'! Notice slot ${j} is now vacated and ready to receive shifted elements or the key itself. Next we inspect cards to its left using pointer i = j - 1 = ${i}.`,
      examLog: null
    });

    while (i >= 0 && arr[i] > key) {
      // Comparison step
      steps.push({
        codeLineC: 15, // while (i >= 0 && a[i] > key)
        codeLinePseudo: 5,
        codeLineJava: 15,
        array: [...arr],
        floatingKey: key,
        vacatedIdx: i + 1,
        variables: { j, key, i, pass: j },
        highlights: [
          { index: i, type: "comparing" },
          { index: i + 1, type: "vacated" }
        ],
        explanation: `Comparing arr[i=${i}] (${arr[i]}) with our floating key (${key}). Since ${arr[i]} > ${key}, ${arr[i]} is too big to stay on the left! We must shift ${arr[i]} one spot to the right into slot ${i + 1}.`,
        examLog: null
      });

      // Shift element right
      arr[i + 1] = arr[i];

      steps.push({
        codeLineC: 16, // a[i + 1] = a[i];
        codeLinePseudo: 6,
        codeLineJava: 16,
        array: [...arr],
        floatingKey: key,
        vacatedIdx: i,
        variables: { j, key, i, pass: j },
        highlights: [
          { index: i + 1, type: "shifted" }
        ],
        explanation: `➡️ Shifted ${arr[i]} to the right into slot ${i + 1}! Now slot ${i} is vacated. We decrement pointer i to ${i - 1} to check the next neighbor to the left.`,
        examLog: null
      });

      i = i - 1;
    }

    // Comparison that broke while loop (comparison failed: arr[i] <= key)
    if (i >= 0) {
      steps.push({
        codeLineC: 15,
        codeLinePseudo: 5,
        codeLineJava: 15,
        array: [...arr],
        floatingKey: key,
        vacatedIdx: i + 1,
        variables: { j, key, i, pass: j },
        highlights: [
          { index: i, type: "compareFailed" }
        ],
        explanation: `❌ Comparison Failed: arr[i=${i}] (${arr[i]}) is <= key (${key}). We found the correct spot! arr[${i}] returns smoothly back UP into its slot, and key will be placed into slot ${i + 1}.`,
        examLog: null
      });
    } else {
      steps.push({
        codeLineC: 15,
        codeLinePseudo: 5,
        codeLineJava: 15,
        array: [...arr],
        floatingKey: key,
        vacatedIdx: 0,
        variables: { j, key, i: -1, pass: j },
        highlights: [],
        explanation: `Pointer i is now -1! Our floating key (${key}) is smaller than all cards to its left, so it belongs right at the front (slot 0).`,
        examLog: null
      });
    }

    // Place key into slot i + 1
    arr[i + 1] = key;

    steps.push({
      codeLineC: 19, // a[i + 1] = key;
      codeLinePseudo: 8,
      codeLineJava: 19,
      array: [...arr],
      floatingKey: null,
      vacatedIdx: null,
      variables: { j, key, i, pass: j, "placedAt": i + 1 },
      highlights: [{ index: i + 1, type: "placed" }],
      explanation: `🎯 Drop the key! Inserted key (${key}) into empty slot arr[i + 1 = ${i + 1}].`,
      examLog: null
    });

    // Pass completion
    steps.push({
      codeLineC: 20, // printPass(a, n, j);
      codeLinePseudo: 9,
      codeLineJava: 20,
      array: [...arr],
      variables: { j, key: "-", i: "-", pass: j },
      highlights: Array.from({ length: j + 1 }, (_, idx) => ({ index: idx, type: "sorted" })),
      explanation: `✅ End of Pass ${j}! Subarray from index 0 to ${j} is now completely sorted: [${arr.slice(0, j + 1).join(", ")}].`,
      examLog: `Pass ${j}: ${JSON.stringify(arr)}`
    });
  }

  // All done
  steps.push({
    codeLineC: 21,
    codeLinePseudo: 9,
    codeLineJava: 21,
    array: [...arr],
    variables: { j: "Done", key: "-", i: "-", pass: n - 1 },
    highlights: arr.map((_, idx) => ({ index: idx, type: "sorted" })),
    explanation: "🎉 Hurray! The entire array is sorted! Total passes completed: " + (n - 1) + ".",
    examLog: `Final Output: ${JSON.stringify(arr)}`
  });

  return steps;
}

// 2. Selection Sort (Matches Module 1.3 PDF: outer loop i, min index j, scout loop k, swap temp t)
function generateSelectionSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  const n = arr.length;

  steps.push({
    codeLineC: 9,
    codeLinePseudo: 1,
    codeLineJava: 10,
    array: [...arr],
    variables: { i: "-", j: "-", k: "-", pass: 0 },
    highlights: [],
    explanation: "Selection Sort starts! We make (n - 1) passes. In each pass 'i', we assume arr[i] is the champion smallest number (tracked by min index 'j'). Scout 'k' checks the rest of the array to find if any smaller element exists!",
    examLog: "Initial Array: " + JSON.stringify(arr)
  });

  for (let i = 0; i < n - 1; i++) {
    let j = i; // j is minimum index from PDF notes

    steps.push({
      codeLineC: 11, // j = i;
      codeLinePseudo: 3,
      codeLineJava: 12,
      array: [...arr],
      variables: { i, j, k: "-", pass: i + 1 },
      highlights: [{ index: j, type: "currentMin" }],
      explanation: `Pass ${i + 1}: We want to find the champion smallest number to put at slot i = ${i}. We set our min tracker j = ${i} (value arr[j] = ${arr[j]}).`,
      examLog: null
    });

    for (let k = i + 1; k < n; k++) {
      // Step 1: Drag both elements down into comparison spotlight
      steps.push({
        codeLineC: 13, // if (a[k] < a[j])
        codeLinePseudo: 5,
        codeLineJava: 14,
        array: [...arr],
        variables: { i, j, k, pass: i + 1 },
        highlights: [
          { index: k, type: "comparing" },
          { index: j, type: "comparing" }
        ],
        explanation: `⬇️ Dragged scout arr[k=${k}] (${arr[k]}) and current champion arr[j=${j}] (${arr[j]}) down into the Comparison Zone! Checking: Is ${arr[k]} < ${arr[j]}?`,
        examLog: null
      });

      if (arr[k] < arr[j]) {
        j = k;
        steps.push({
          codeLineC: 14, // j = k;
          codeLinePseudo: 6,
          codeLineJava: 15,
          array: [...arr],
          variables: { i, j, k, pass: i + 1 },
          highlights: [{ index: j, type: "newMin" }],
          explanation: `🌟 Comparison Succeeded! ${arr[k]} < previous min! Element at index ${k} is crowned the NEW champion minimum (j = ${j})!`,
          examLog: null
        });
      } else {
        steps.push({
          codeLineC: 13,
          codeLinePseudo: 5,
          codeLineJava: 14,
          array: [...arr],
          variables: { i, j, k, pass: i + 1 },
          highlights: [
            { index: k, type: "compareFailed" },
            { index: j, type: "currentMin" }
          ],
          explanation: `❌ Comparison Failed: arr[k=${k}] (${arr[k]}) is >= champion arr[j=${j}] (${arr[j]}). Sliding arr[${k}] smoothly back UP to its original slot!`,
          examLog: null
        });
      }
    }

    // Ready to swap
    steps.push({
      codeLineC: 17, // t = a[i]; a[i] = a[j]; a[j] = t;
      codeLinePseudo: 7,
      codeLineJava: 17,
      array: [...arr],
      swapIndices: [i, j],
      variables: { i, j, k: "End", pass: i + 1 },
      highlights: [
        { index: i, type: "swapA" },
        { index: j, type: "swapB" }
      ],
      explanation: `Finished scanning! The smallest number for slot ${i} is ${arr[j]} at index j = ${j}. Now we swap arr[i=${i}] (${arr[i]}) with arr[j=${j}] (${arr[j]}).`,
      examLog: null
    });

    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;

    steps.push({
      codeLineC: 21, // printPass(a, n, i + 1);
      codeLinePseudo: 8,
      codeLineJava: 21,
      array: [...arr],
      variables: { i, j, k: "-", pass: i + 1 },
      highlights: Array.from({ length: i + 1 }, (_, idx) => ({ index: idx, type: "sorted" })),
      explanation: `✅ Pass ${i + 1} Complete! Swapped! Slot ${i} now permanently holds its sorted champion ${arr[i]}.`,
      examLog: `Pass ${i + 1}: ${JSON.stringify(arr)}`
    });
  }

  steps.push({
    codeLineC: 22,
    codeLinePseudo: 8,
    codeLineJava: 22,
    array: [...arr],
    variables: { i: "Done", j: "-", k: "-", pass: n - 1 },
    highlights: arr.map((_, idx) => ({ index: idx, type: "sorted" })),
    explanation: "🎉 All passes complete! The entire array is sorted.",
    examLog: `Final Output: ${JSON.stringify(arr)}`
  });

  return steps;
}

// 3. Quick Sort (Matches Module 2.2 PDF: QUICKSORT(A, p, r), PARTITION(A, p, r), x = A[r], i = p - 1, for j = p to r - 1)
function generateQuickSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  let callCount = 0;

  function qSort(p, r, depth = 0) {
    callCount++;
    const currentCall = callCount;

    steps.push({
      codeLineC: 26, // quickSort(a, p, r)
      codeLinePseudo: 2,
      codeLineJava: 27,
      array: [...arr],
      range: [p, r],
      variables: { p, r, total_calls: callCount, depth },
      highlights: (p <= r) ? [
        { index: p, type: "range" },
        { index: r, type: "range" }
      ] : [],
      explanation: `📞 QuickSort Call #${currentCall}: Called on subarray range [p=${p} ... r=${r}]. (Total calls to QuickSort so far: ${callCount} - required by TSEC practical exam!).`,
      examLog: `Call ${callCount}: quickSort(arr, p=${p}, r=${r})`
    });

    if (p < r) {
      // Partition step
      const x = arr[r]; // pivot element from PDF notes
      let i = p - 1;

      steps.push({
        codeLineC: 11, // int x = a[r]; int i = p - 1;
        codeLinePseudo: 8,
        codeLineJava: 12,
        array: [...arr],
        range: [p, r],
        pivotIdx: r,
        variables: { p, r, "pivot (x)": x, i, j: p, total_calls: callCount },
        highlights: [{ index: r, type: "pivot" }],
        explanation: `🎯 PARTITION: We choose the last element arr[r=${r}] (value x = ${x}) as our PIVOT! All elements <= ${x} will be herded to the left of boundary i. Currently boundary i = p - 1 = ${i}.`,
        examLog: null
      });

      for (let j = p; j <= r - 1; j++) {
        // Step 1: Drag scout down to compare with pivot
        steps.push({
          codeLineC: 14, // if (a[j] <= x)
          codeLinePseudo: 11,
          codeLineJava: 15,
          array: [...arr],
          range: [p, r],
          pivotIdx: r,
          variables: { p, r, "pivot (x)": x, i, j, total_calls: callCount },
          highlights: [
            { index: j, type: "comparing" },
            { index: r, type: "comparing" }
          ],
          explanation: `⬇️ Dragged scout arr[j=${j}] (${arr[j]}) and pivot arr[r=${r}] (x = ${x}) down into Comparison Zone! Checking: Is ${arr[j]} <= ${x}?`,
          examLog: null
        });

        if (arr[j] <= x) {
          i++;
          steps.push({
            codeLineC: 16, // t = a[i]; a[i] = a[j]; a[j] = t;
            codeLinePseudo: 13,
            codeLineJava: 17,
            array: [...arr],
            range: [p, r],
            pivotIdx: r,
            swapIndices: [i, j],
            variables: { p, r, "pivot (x)": x, i, j, total_calls: callCount },
            highlights: [
              { index: i, type: "swapA" },
              { index: j, type: "swapB" },
              { index: r, type: "pivot" }
            ],
            explanation: `✅ Comparison Succeeded! ${arr[j]} <= ${x}! Increment boundary i to ${i} and swap arr[i=${i}] (${arr[i]}) with arr[j=${j}] (${arr[j]}).`,
            examLog: null
          });

          const t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
        } else {
          steps.push({
            codeLineC: 14,
            codeLinePseudo: 11,
            codeLineJava: 15,
            array: [...arr],
            range: [p, r],
            pivotIdx: r,
            variables: { p, r, "pivot (x)": x, i, j, total_calls: callCount },
            highlights: [
              { index: j, type: "compareFailed" },
              { index: r, type: "pivot" }
            ],
            explanation: `❌ Comparison Failed: arr[j=${j}] (${arr[j]}) is > pivot (${x}). It belongs on the right side! Returning arr[${j}] smoothly back UP to its original position.`,
            examLog: null
          });
        }
      }

      // Place pivot into final position i + 1
      steps.push({
        codeLineC: 19, // t = a[i + 1]; a[i + 1] = a[r]; a[r] = t;
        codeLinePseudo: 14,
        codeLineJava: 20,
        array: [...arr],
        range: [p, r],
        swapIndices: [i + 1, r],
        variables: { p, r, "pivot (x)": x, "pivotTarget": i + 1, total_calls: callCount },
        highlights: [
          { index: i + 1, type: "swapA" },
          { index: r, type: "swapB" }
        ],
        explanation: `All scouts finished! Now place pivot (${x}) into its exact sorted home at slot i + 1 = ${i + 1} by swapping arr[${i + 1}] and arr[${r}].`,
        examLog: null
      });

      const t = arr[i + 1];
      arr[i + 1] = arr[r];
      arr[r] = t;
      const q = i + 1; // Partition index q

      steps.push({
        codeLineC: 20, // return i + 1;
        codeLinePseudo: 15,
        codeLineJava: 21,
        array: [...arr],
        range: [p, r],
        variables: { p, r, q, "pivotValue": arr[q], total_calls: callCount },
        highlights: [{ index: q, type: "sorted" }],
        explanation: `🎉 Pivot ${arr[q]} is now locked at index q = ${q}! Everything to the left [${p}..${q - 1}] is <= ${arr[q]}, and everything to the right [${q + 1}..${r}] is >= ${arr[q]}.`,
        examLog: `Partition complete: pivot ${arr[q]} at index ${q}. Subarray: ${JSON.stringify(arr.slice(p, r + 1))}`
      });

      // Recurse left
      qSort(p, q - 1, depth + 1);
      // Recurse right
      qSort(q + 1, r, depth + 1);
    } else {
      steps.push({
        codeLineC: 27,
        codeLinePseudo: 3,
        codeLineJava: 28,
        array: [...arr],
        variables: { p, r, total_calls: callCount },
        highlights: (p === r) ? [{ index: p, type: "sorted" }] : [],
        explanation: `Base case reached! Range [${p}...${r}] has 1 or 0 elements, which is trivially sorted. Returning from Call #${currentCall}.`,
        examLog: null
      });
    }
  }

  qSort(0, arr.length - 1);

  steps.push({
    codeLineC: 29,
    codeLinePseudo: 6,
    codeLineJava: 30,
    array: [...arr],
    variables: { total_calls: callCount, sorted: true },
    highlights: arr.map((_, idx) => ({ index: idx, type: "sorted" })),
    explanation: `🏁 QuickSort Complete! Final array sorted. TOTAL calls to QuickSort procedure = ${callCount} (as required by TSEC practical exam!).`,
    examLog: `Total calls to QuickSort procedure: ${callCount}`
  });

  return steps;
}

// 4. Merge Sort (Matches Module 2.1 PDF: MERGE(low, mid, high), h = low, j = mid + 1, i = low, b[i])
function generateMergeSortSteps(initialArr) {
  const steps = [];
  const arr = [...initialArr];
  let callCount = 0;

  function mSort(low, high) {
    callCount++;
    const currentCall = callCount;

    steps.push({
      codeLineC: 27, // mergeSort(a, low, high)
      codeLinePseudo: 2,
      codeLineJava: 28,
      array: [...arr],
      range: [low, high],
      variables: { low, high, total_calls: callCount },
      highlights: [{ index: low, type: "range" }, { index: high, type: "range" }],
      explanation: `📞 MergeSort Call #${currentCall}: Called on range [low=${low} ... high=${high}]. (Total procedure calls so far = ${callCount} - required by TSEC practical exam!).`,
      examLog: `Call ${callCount}: mergeSort(arr, low=${low}, high=${high})`
    });

    if (low < high) {
      const mid = Math.floor((low + high) / 2);

      steps.push({
        codeLineC: 29, // int mid = (low + high) / 2;
        codeLinePseudo: 4,
        codeLineJava: 30,
        array: [...arr],
        range: [low, high],
        mid,
        variables: { low, mid, high, total_calls: callCount },
        highlights: [
          { index: low, type: "range" },
          { index: mid, type: "pivot" },
          { index: high, type: "range" }
        ],
        explanation: `Divide: Splitting array in half at mid = (${low} + ${high}) / 2 = ${mid}. Left subarray: [${low}..${mid}], Right subarray: [${mid + 1}..${high}].`,
        examLog: null
      });

      mSort(low, mid);
      mSort(mid + 1, high);

      // MERGE Phase from Module 2.1 PDF:
      // h = low; i = low; j = mid + 1;
      let h = low;
      let i = low;
      let j = mid + 1;
      const b = []; // Auxiliary array b[]

      steps.push({
        codeLineC: 7, // void merge(int a[], int low, int mid, int high)
        codeLinePseudo: 7,
        codeLineJava: 8,
        array: [...arr],
        range: [low, high],
        mid,
        auxArray: [...b],
        auxLow: low,
        variables: { low, mid, high, h, j, i, total_calls: callCount },
        highlights: Array.from({ length: high - low + 1 }, (_, idx) => ({ index: low + idx, type: "merging" })),
        explanation: `MERGE: Now merging sorted left subarray a[${low}..${mid}] and sorted right subarray a[${mid + 1}..${high}] into auxiliary array b[]. Pointers: h = ${h}, j = ${j}, writing to b[i=${i}].`,
        examLog: null
      });

      while (h <= mid && j <= high) {
        steps.push({
          codeLineC: 10, // if (a[h] <= a[j])
          codeLinePseudo: 9,
          codeLineJava: 11,
          array: [...arr],
          range: [low, high],
          mid,
          auxArray: [...b],
          auxLow: low,
          variables: { h, j, i, "a[h]": arr[h], "a[j]": arr[j], total_calls: callCount },
          highlights: [
            { index: h, type: "comparing" },
            { index: j, type: "comparing" }
          ],
          explanation: `Comparing left element a[h=${h}] (${arr[h]}) with right element a[j=${j}] (${arr[j]}). Take the smaller one and store it in b[i=${i}]!`,
          examLog: null
        });

        if (arr[h] <= arr[j]) {
          b[i] = arr[h];
          h++;
        } else {
          b[i] = arr[j];
          j++;
        }

        steps.push({
          codeLineC: 11, // b[i] = ...; i++;
          codeLinePseudo: 10,
          codeLineJava: 12,
          array: [...arr],
          range: [low, high],
          mid,
          auxArray: [...b],
          auxLow: low,
          variables: { h, j, i, "Copied": b[i], total_calls: callCount },
          highlights: [],
          explanation: `Copied ${b[i]} into auxiliary array b[i=${i}]. Now increment i to ${i + 1}.`,
          examLog: null
        });

        i++;
      }

      // Copy remaining
      if (h > mid) {
        for (let k = j; k <= high; k++) {
          b[i] = arr[k];
          steps.push({
            codeLineC: 17, // for (k = j; k <= high; k++) { b[i] = a[k]; i++; }
            codeLinePseudo: 12,
            codeLineJava: 18,
            array: [...arr],
            range: [low, high],
            auxArray: [...b],
            auxLow: low,
            variables: { h: "Exhausted", j: k, i, "Copied": b[i], total_calls: callCount },
            highlights: [{ index: k, type: "comparing" }],
            explanation: `Left half exhausted! Copying remaining right element a[${k}] (${arr[k]}) into b[i=${i}].`,
            examLog: null
          });
          i++;
        }
      } else {
        for (let k = h; k <= mid; k++) {
          b[i] = arr[k];
          steps.push({
            codeLineC: 19, // for (k = h; k <= mid; k++) { b[i] = a[k]; i++; }
            codeLinePseudo: 13,
            codeLineJava: 20,
            array: [...arr],
            range: [low, high],
            auxArray: [...b],
            auxLow: low,
            variables: { h: k, j: "Exhausted", i, "Copied": b[i], total_calls: callCount },
            highlights: [{ index: k, type: "comparing" }],
            explanation: `Right half exhausted! Copying remaining left element a[${k}] (${arr[k]}) into b[i=${i}].`,
            examLog: null
          });
          i++;
        }
      }

      // Copy b[] back to a[]
      for (let k = low; k <= high; k++) {
        arr[k] = b[k];
      }

      steps.push({
        codeLineC: 21, // for (k = low; k <= high; k++) a[k] = b[k];
        codeLinePseudo: 14,
        codeLineJava: 22,
        array: [...arr],
        range: [low, high],
        auxArray: [...b],
        auxLow: low,
        variables: { low, high, total_calls: callCount },
        highlights: Array.from({ length: high - low + 1 }, (_, idx) => ({ index: low + idx, type: "sorted" })),
        explanation: `📥 Copy Back: Copied sorted auxiliary array b[${low}..${high}] back into original array a[${low}..${high}]: [${arr.slice(low, high + 1).join(", ")}].`,
        examLog: `Merged [${low}..${high}]: ${JSON.stringify(arr.slice(low, high + 1))}`
      });
    } else {
      steps.push({
        codeLineC: 28,
        codeLinePseudo: 3,
        codeLineJava: 29,
        array: [...arr],
        variables: { low, high, total_calls: callCount },
        highlights: [{ index: low, type: "sorted" }],
        explanation: `Base case! Single element at index ${low} (${arr[low]}) is trivially sorted. Returning from Call #${currentCall}.`,
        examLog: null
      });
    }
  }

  mSort(0, arr.length - 1);

  steps.push({
    codeLineC: 32,
    codeLinePseudo: 15,
    codeLineJava: 33,
    array: [...arr],
    variables: { total_calls: callCount, sorted: true },
    highlights: arr.map((_, idx) => ({ index: idx, type: "sorted" })),
    explanation: `🏁 MergeSort Complete! TOTAL procedure calls = ${callCount} (as required by TSEC practical exam!).`,
    examLog: `Total calls to MergeSort procedure: ${callCount}`
  });

  return steps;
}
