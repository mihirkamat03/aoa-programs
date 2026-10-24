/**
 * AOA Practical Exam - Viva Voce & Algorithm Explanations
 * Tailored for Mumbai University / TSEC AOA Practical Syllabus
 * Kid-Friendly "Explain Like I'm 5" (ELI5) + Academic Viva Answers
 */

const ALGO_DATA = {
  insertionSort: {
    id: "insertionSort",
    name: "Insertion Sort",
    category: "Sorting",
    tsecSrNo: 1,
    tagline: "Sort playing cards one by one in your hand",
    eli5: "Imagine you are holding playing cards in your hand. You pick up cards one by one from the table. For each card (we call this 'key'), you look at the cards you already have in your hand from right to left (using variable 'j'). If a card is bigger than your new card, you slide it one spot to the right! The moment you find a card smaller than your key, you slide your key into the empty spot right after it (at j + 1). After each card is placed, that part of your hand is always sorted!",
    variablesExplained: {
      "i": "Points to the card we picked up from the table (starts from 1 up to n-1).",
      "key": "The value of the card currently in our fingers waiting to be placed.",
      "j": "Looks backward from i-1 down to 0, sliding any bigger cards to the right to make room."
    },
    examRequirements: "Show array output after every single pass (outer loop i = 1 to n-1).",
    timeComplexity: {
      best: "O(n) - When array is already sorted (while loop condition fails immediately on first check)",
      avg: "O(n²)",
      worst: "O(n²) - When array is sorted in reverse order (every element shifts all the way back)"
    },
    spaceComplexity: "O(1) - In-place sorting, no extra memory needed.",
    stability: "Stable (does not swap equal elements, maintains original order).",
    vivaQuestions: [
      {
        q: "Why is Insertion Sort O(n) in the best case?",
        a: "Because if the array is already sorted, the inner while loop condition `arr[j] > key` fails immediately on the very first comparison for every pass. Thus, only n-1 comparisons occur and 0 shifts are made!"
      },
      {
        q: "When is Insertion Sort preferred in real life?",
        a: "When the dataset is very small (often used as the base case in QuickSort or Timsort) or when data is already nearly sorted or continuously streaming in."
      },
      {
        q: "Is Insertion Sort an in-place and stable sorting algorithm?",
        a: "Yes! It operates directly within the array (O(1) auxiliary space) and does not swap elements with equal values, preserving their relative order."
      }
    ]
  },

  selectionSort: {
    id: "selectionSort",
    name: "Selection Sort",
    category: "Sorting",
    tsecSrNo: 2,
    tagline: "Always scan and pick the absolute smallest kid to stand in front",
    eli5: "Imagine kids standing in an unsorted line for morning assembly. You stand at position 'i' (starting from index 0). You walk through the rest of the line with pointer 'j' to find the shortest kid in the entire remaining group (we remember their position in 'min_idx'). Once you reach the end of the line, you swap the kid at position 'i' with the shortest kid found at 'min_idx'! Now position 'i' has the correct shortest kid forever. Then you move 'i' to the next spot and repeat!",
    variablesExplained: {
      "i": "Current spot at the front of the unsorted line that we want to fill (0 to n-2).",
      "min_idx": "The index of the smallest element found so far in the unsorted section.",
      "j": "The scout pointer searching from i+1 to n-1 comparing every element with arr[min_idx]."
    },
    examRequirements: "Show array output after every single pass (outer loop i = 0 to n-2).",
    timeComplexity: {
      best: "O(n²) - Even if already sorted, it STILL scans the entire unsorted subarray to confirm the minimum!",
      avg: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) - In-place sorting.",
    stability: "Unstable in standard array implementation (long-distance swap can jump equal elements).",
    vivaQuestions: [
      {
        q: "Why is Selection Sort O(n²) even in the best case?",
        a: "Because the inner loop ALWAYS runs from i+1 to n-1 to find the minimum element, regardless of whether the array is already sorted. Total comparisons = n(n-1)/2."
      },
      {
        q: "What is the key advantage of Selection Sort over Bubble Sort or Insertion Sort?",
        a: "It does at most O(n) swaps (maximum n-1 swaps total). This makes it valuable when memory write operations are extremely costly (e.g. Flash memory / EEPROM)."
      },
      {
        q: "Is Selection Sort stable?",
        a: "No! A long-distance swap can jump over identical elements and change their relative order. Example: [4a, 4b, 2] -> 2 swaps with 4a, giving [2, 4b, 4a]."
      }
    ]
  },

  quickSort: {
    id: "quickSort",
    name: "Quick Sort",
    category: "Sorting",
    tsecSrNo: 3,
    tagline: "Pick a leader (pivot), send smaller kids left and bigger kids right",
    eli5: "Imagine picking one kid in class as the 'pivot' (the leader). You arrange everyone so that all kids shorter than the leader move to the left side, and all kids taller than the leader move to the right side. The leader is now in their exact permanent spot! Then, you do the exact same trick separately for the left group and right group (Divide and Conquer). We keep a counter 'call_count' to count every time we tell a sub-group to divide!",
    variablesExplained: {
      "low": "Starting index of the current subarray we are sorting.",
      "high": "Ending index of the current subarray.",
      "pivot": "The chosen reference value (commonly arr[high] in Lomuto partition).",
      "i": "Index of the boundary of elements strictly smaller than the pivot (starts at low - 1).",
      "j": "Scout pointer scanning from low to high - 1 comparing arr[j] with pivot.",
      "call_count": "Crucial for TSEC exam! Incremented at the start of every quickSort() call."
    },
    examRequirements: "Must print the total number of calls to the quick sort procedure!",
    timeComplexity: {
      best: "O(n log n) - When pivot always divides array into two roughly equal halves.",
      avg: "O(n log n)",
      worst: "O(n²) - When array is already sorted/reverse sorted and we pick the last/first element as pivot."
    },
    spaceComplexity: "O(log n) auxiliary stack space for recursion (O(n) worst case).",
    stability: "Unstable.",
    vivaQuestions: [
      {
        q: "When does Quick Sort exhibit worst-case O(n²) time complexity?",
        a: "When the partition is completely unbalanced at every recursive level (e.g. subarray sizes 0 and n-1). This occurs if the array is already sorted or reverse sorted and the first or last element is chosen as pivot without randomization."
      },
      {
        q: "How can we avoid the O(n²) worst case in Quick Sort?",
        a: "1) Randomized QuickSort (pick a random pivot), 2) Median-of-Three pivot selection (median of first, middle, and last elements)."
      },
      {
        q: "Why is Quick Sort often faster than Merge Sort in practice despite having a worse worst-case?",
        a: "Quick Sort has superior cache locality, operates completely in-place without allocating temporary arrays, and has lower constant factors."
      }
    ]
  },

  mergeSort: {
    id: "mergeSort",
    name: "Merge Sort",
    category: "Sorting",
    tsecSrNo: 4,
    tagline: "Chop the line in half until single kids remain, then zip them back up",
    eli5: "Divide and conquer! If you have a big pile of numbered cards, you split the pile into two halves right in the middle (mid = (low + high)/2). You keep splitting each pile until each pile has only 1 card (a 1-card pile is already sorted!). Then comes the magic 'merge' step: you take two sorted piles and compare their top cards using pointers 'i' (left pile) and 'j' (right pile), putting the smaller one into a new tray 'B' at position 'k'. Like zipping up a jacket, both piles merge into one perfectly sorted pile!",
    variablesExplained: {
      "low": "Leftmost index of current subarray.",
      "mid": "Middle index where we cut the array: (low + high) / 2.",
      "high": "Rightmost index of current subarray.",
      "i": "Pointer scanning the left sorted half (from low to mid).",
      "j": "Pointer scanning the right sorted half (from mid + 1 to high).",
      "k": "Pointer writing into the temporary auxiliary array.",
      "call_count": "Crucial for TSEC exam! Incremented every time mergeSort() is called."
    },
    examRequirements: "Must print the total number of calls to the merge sort procedure!",
    timeComplexity: {
      best: "O(n log n)",
      avg: "O(n log n)",
      worst: "O(n log n) - Guaranteed under all inputs! Recurrence: T(n) = 2T(n/2) + O(n)."
    },
    spaceComplexity: "O(n) auxiliary space for the temporary merge array.",
    stability: "Stable (if elements are equal, we take from the left half first: `arr[i] <= arr[j]`).",
    vivaQuestions: [
      {
        q: "State the recurrence relation for Merge Sort and solve it using Master Theorem.",
        a: "T(n) = 2T(n/2) + cn. Here a = 2, b = 2, f(n) = cn. Log_b(a) = log_2(2) = 1. Since f(n) = Θ(n^1), Case 2 of Master Theorem applies: T(n) = Θ(n log n)."
      },
      {
        q: "What is the main drawback of Merge Sort compared to Quick Sort?",
        a: "Merge Sort requires O(n) auxiliary memory space to hold elements during the merge process, and copying elements to/from temporary arrays adds overhead."
      },
      {
        q: "Is Merge Sort preferred for Linked Lists?",
        a: "Yes! Because linked lists can be split and merged by manipulating pointers in O(1) extra space without needing random index access."
      }
    ]
  },

  primsMST: {
    id: "primsMST",
    name: "Prim's Algorithm (MST)",
    category: "Greedy",
    tsecSrNo: 5,
    tagline: "Build a friendly network by always picking the cheapest connection to our club",
    eli5: "Imagine cities wanting electricity. We start with one city in our 'electricity club'. Look at all roads connecting any city inside our club to any city OUTSIDE our club. We greedily pick the cheapest road! Now that new city joins our club. We repeat this until every city is connected! Since we always pick the cheapest edge bridging the boundary, we never form a loop (cycle) and we use the minimum total wire length possible!",
    variablesExplained: {
      "u": "The vertex outside the MST that has the minimum key value (cheapest to reach).",
      "v": "Neighbor of u being checked for a cheaper connection.",
      "key[]": "Array storing the minimum cost to connect each vertex to the growing MST tree.",
      "parent[] / pi[]": "Array storing who connects to whom in the MST tree.",
      "inMST[] / selected[]": "Boolean flag tracking if a city is already inside our club."
    },
    examRequirements: "Must print the minimum total cost and all edges included in the MST!",
    timeComplexity: {
      best: "O(V²)",
      avg: "O(V²) with adjacency matrix; O(E log V) with adjacency list and min-heap.",
      worst: "O(V²)"
    },
    spaceComplexity: "O(V) for key, parent, and inMST arrays.",
    vivaQuestions: [
      {
        q: "What is a Spanning Tree and Minimum Spanning Tree (MST)?",
        a: "A spanning tree of an undirected connected graph G=(V,E) is a subgraph that is a tree and includes all V vertices with exactly V-1 edges. An MST is a spanning tree whose sum of edge weights is minimized."
      },
      {
        q: "Does Prim's algorithm work on graphs with negative edge weights?",
        a: "Yes! Unlike Dijkstra's algorithm, Prim's algorithm works correctly with negative edge weights because an MST simply minimizes the sum of edges without computing path distances."
      },
      {
        q: "When should you prefer Prim's over Kruskal's?",
        a: "Prim's is faster for dense graphs (E ≈ V²) with O(V²) complexity, whereas Kruskal's is better for sparse graphs (E << V²) with O(E log E) complexity."
      }
    ]
  },

  kruskalsMST: {
    id: "kruskalsMST",
    name: "Kruskal's Algorithm (MST)",
    category: "Greedy",
    tsecSrNo: 6,
    tagline: "Sort all bridges from cheapest to most expensive, take them if no loop forms",
    eli5: "Write down EVERY single bridge in the whole kingdom on a piece of paper. Sort this list from cheapest to most expensive! Now look at the cheapest bridge. If building it connects two islands that are not already connected, build it! If both islands are already connected through other paths, building this bridge would create a redundant loop (cycle), so THROW IT AWAY! Stop when you have picked exactly (V - 1) bridges. We use a Union-Find trick with a `parent[]` array to instantly know if two islands are in the same family!",
    variablesExplained: {
      "edges[]": "List of all edges (u, v, weight) sorted in non-decreasing order of weight.",
      "parent[]": "Disjoint Set Union (DSU) array where parent[i] is the parent/representative of vertex i.",
      "find(i)": "Function that climbs up parent pointers to find the root boss of vertex i.",
      "union(u, v)": "Function that merges the two disjoint sets containing u and v.",
      "mstCount": "Number of edges added to MST so far (stops when mstCount == V - 1)."
    },
    examRequirements: "Must print the minimum total cost and all edges included in the MST!",
    timeComplexity: {
      best: "O(E log E) or O(E log V) dominated by sorting edges.",
      avg: "O(E log E)",
      worst: "O(E log E)"
    },
    spaceComplexity: "O(V + E) for storing edge list and DSU parent array.",
    vivaQuestions: [
      {
        q: "How does Kruskal's algorithm detect cycles?",
        a: "Using the Disjoint Set Union (DSU / Union-Find) data structure. For an edge (u, v), if find(u) == find(v), they already belong to the same connected component, meaning adding this edge creates a cycle!"
      },
      {
        q: "Why does Kruskal's algorithm run in O(E log E) time?",
        a: "Sorting E edges takes O(E log E). The subsequent Union-Find operations take almost linear time O(E α(V)) using path compression and union by rank. Hence sorting dominates: O(E log E)."
      },
      {
        q: "Can a graph have multiple distinct Minimum Spanning Trees?",
        a: "Yes, if multiple edges have identical weights. However, the total minimum cost will always be the same across all MSTs."
      }
    ]
  },

  knapsack01: {
    id: "knapsack01",
    name: "0/1 Knapsack (DP)",
    category: "Dynamic Programming",
    tsecSrNo: 7,
    tagline: "Fill a magic backpack to get maximum loot without breaking the weight limit",
    eli5: "You are a friendly treasure hunter with a backpack that holds max weight W. For each item 'i' with weight wt[i] and profit val[i], you have only two choices: TAKE IT (1) or LEAVE IT (0) — you cannot break an item into pieces! We build a cheat table V[i][w] representing: 'What is the max profit if we consider the first i items with backpack capacity w?' If item i is too heavy for weight w, we can't take it, so profit is V[i-1][w]. Otherwise, we compare: leaving it V[i-1][w] VS taking it (val[i] + V[i-1][w - wt[i]]). We pick the bigger number! Then we backtrack through the table to find the Solution Vector X = [1, 0, 1] showing which items were packed!",
    variablesExplained: {
      "i": "Current item index under consideration (1 to n).",
      "w": "Current sub-capacity of backpack being evaluated (0 to W).",
      "V[i][w]": "DP table storing maximum profit using subset of first i items with capacity w.",
      "wt[i]": "Weight of item i.",
      "val[i]": "Profit/value of item i.",
      "X[i]": "Solution vector where X[i] = 1 if item i is selected, or 0 if excluded."
    },
    examRequirements: "Must print the DP matrix, total profit earned, and the solution vector X!",
    timeComplexity: {
      best: "O(n · W) - Pseudo-polynomial time.",
      avg: "O(n · W)",
      worst: "O(n · W)"
    },
    spaceComplexity: "O(n · W) for the 2D DP matrix table.",
    vivaQuestions: [
      {
        q: "Why can't the Greedy method solve 0/1 Knapsack optimally?",
        a: "Because items cannot be broken into fractions. A greedy choice by highest profit or profit/weight ratio may leave empty unused capacity in the knapsack, resulting in suboptimal total profit. Fractional Knapsack can be solved greedily, but 0/1 requires Dynamic Programming."
      },
      {
        q: "Why is 0/1 Knapsack called 'pseudo-polynomial'?",
        a: "Because its running time O(n · W) depends on the numerical value of W, not the number of bits needed to represent W. In terms of input size in bits (log W), the complexity is exponential: O(n · 2^k)."
      },
      {
        q: "How do you backtrack to find the solution vector X from the DP table?",
        a: "Start from cell V[n][W]. If V[i][w] == V[i-1][w], item i was NOT included (X[i] = 0). If V[i][w] != V[i-1][w], item i WAS included (X[i] = 1), and we move to cell V[i-1][w - wt[i]]. Repeat until i = 0."
      }
    ]
  },

  lcs: {
    id: "lcs",
    name: "Longest Common Subsequence",
    category: "Dynamic Programming",
    tsecSrNo: 8,
    tagline: "Find the longest secret message hidden inside two words in the same order",
    eli5: "Suppose you have two words, like 'LONGEST' and 'STONE'. A subsequence means characters appearing in the same order, but not necessarily side by side! We make a 2D grid L[i][j]. For letter X[i] and Y[j]: if they match, we cheer! We take the score from top-left diagonal plus 1: L[i-1][j-1] + 1, and draw a diagonal arrow ↖! If they don't match, we take the max of top L[i-1][j] (arrow ↑) or left L[i][j-1] (arrow ←). When the grid is full, we follow the arrows backward from the bottom-right corner: every time we see a ↖ diagonal arrow, that letter is part of our LCS!",
    variablesExplained: {
      "i": "Pointer into first string X (length m).",
      "j": "Pointer into second string Y (length n).",
      "L[i][j]": "Length of LCS of prefix X[1..i] and Y[1..j].",
      "B[i][j]": "Arrow table storing direction: ↖ (diagonal match), ↑ (from top), or ← (from left)."
    },
    examRequirements: "Must print the DP matrix along with arrows, the length of LCS, and the characters of LCS!",
    timeComplexity: {
      best: "O(m · n)",
      avg: "O(m · n)",
      worst: "O(m · n) where m and n are string lengths."
    },
    spaceComplexity: "O(m · n) for DP and arrow matrix.",
    vivaQuestions: [
      {
        q: "What is the difference between Substring and Subsequence?",
        a: "A substring must consist of contiguous characters from the original string. A subsequence does NOT need to be contiguous, only appearing in the same relative order. Example: 'ACE' is a subsequence of 'ABCDE', but not a substring."
      },
      {
        q: "State the Bellman equation / recurrence relation for LCS.",
        a: "L[i][j] = 0 if i=0 or j=0;\nL[i][j] = 1 + L[i-1][j-1] if X[i] == Y[j];\nL[i][j] = max(L[i-1][j], L[i][j-1]) if X[i] != Y[j]."
      },
      {
        q: "How are arrows used to print the LCS string?",
        a: "Trace backwards from (m, n). If arrow is ↖ (diagonal), print X[i] (or push to stack) and move to (i-1, j-1). If arrow is ↑ (up), move to (i-1, j). If arrow is ← (left), move to (i, j-1). Stop when i=0 or j=0."
      }
    ]
  },

  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm (SSSP)",
    category: "Greedy",
    tsecSrNo: 9,
    tagline: "Find the quickest path from your house to every other place in town",
    eli5: "Imagine Google Maps finding the shortest route from your home (source). We keep an array D[] of distances (set D[home] = 0, and all other places to infinity ∞). We also keep a Pi[] vector of 'who got me here'. At each step, we look at the unvisited city with the smallest known distance (let's call it 'u'). We visit 'u', mark it done, and look at all its neighboring cities 'v'. If going from home to 'u' and then along road (u, v) is shorter than our old distance to 'v' (that is, D[u] + cost(u, v) < D[v]), we update D[v] and set Pi[v] = u! This is called 'Relaxation'!",
    variablesExplained: {
      "source": "The starting vertex.",
      "u": "The unvisited vertex with smallest current D[u] value.",
      "v": "Neighbor of u being checked.",
      "D[v]": "Current shortest known distance from source to vertex v.",
      "Pi[v]": "Predecessor (parent) of vertex v on the shortest path from source."
    },
    examRequirements: "Must print the final D vector, final Pi vector, and the shortest path between source and every vertex!",
    timeComplexity: {
      best: "O(V²)",
      avg: "O(V²) with matrix; O((V + E) log V) with adjacency list and min-priority queue.",
      worst: "O(V²)"
    },
    spaceComplexity: "O(V) for D[], Pi[], and visited[] arrays.",
    vivaQuestions: [
      {
        q: "Why does Dijkstra's algorithm fail when edge weights are negative?",
        a: "Dijkstra relies on the greedy assumption that once a vertex is marked visited with the minimum tentative distance, no shorter path to it can ever be found. A negative edge later in the graph could reduce an already finalized distance, which Dijkstra cannot revisit without looping infinitely."
      },
      {
        q: "Which algorithm should be used if a graph contains negative edges?",
        a: "The Bellman-Ford algorithm (Single Source Shortest Path, O(V · E)) or Floyd-Warshall (All-Pairs Shortest Path, O(V³))."
      },
      {
        q: "What does edge relaxation mean?",
        a: "Testing whether going through vertex u improves the shortest known distance to vertex v: if (D[u] + weight(u, v) < D[v]) then D[v] = D[u] + weight(u, v) and Pi[v] = u."
      }
    ]
  },

  floydWarshall: {
    id: "floydWarshall",
    name: "Floyd Warshall (APSP)",
    category: "Dynamic Programming",
    tsecSrNo: 10,
    tagline: "Find the shortest path between EVERY pair of cities using intermediate stops",
    eli5: "Instead of just starting from one city, what if we want a complete table of shortest distances between EVERY pair of cities (i to j)? We run 3 nested loops: k, i, j! Variable 'k' represents allowed intermediate stop cities (k = 1, 2, ..., n). In phase 'k', we ask: 'Can traveler going from city i to city j take a detour through city k and save travel time?' That is: is D[i][k] + D[k][j] < D[i][j]? If yes, we update D[i][j] and set Pi[i][j] = Pi[k][j]! After checking all intermediate stops k from 1 to n, matrix D has the absolute shortest path for all pairs!",
    variablesExplained: {
      "k": "The intermediate vertex allowed in the path (outermost loop: 1 to n).",
      "i": "Source vertex (middle loop: 1 to n).",
      "j": "Destination vertex (innermost loop: 1 to n).",
      "D[i][j]": "Shortest distance from i to j using intermediate vertices from {1..k}.",
      "Pi[i][j]": "Predecessor matrix tracking the vertex immediately preceding j on path from i."
    },
    examRequirements: "Must print final D matrix, final Pi matrix, and the path between every pair of vertices!",
    timeComplexity: {
      best: "O(V³)",
      avg: "O(V³)",
      worst: "O(V³) - Three nested loops each running from 1 to V."
    },
    spaceComplexity: "O(V²) for D and Pi matrices.",
    vivaQuestions: [
      {
        q: "Can Floyd-Warshall handle negative edge weights?",
        a: "Yes, provided there are no negative weight cycles! If after running the algorithm any diagonal entry D[i][i] < 0, a negative cycle exists in the graph."
      },
      {
        q: "Why MUST loop 'k' be the outermost loop in Floyd-Warshall?",
        a: "Because the DP state definition D^k[i][j] depends on paths using intermediate vertices strictly from {1, 2, ..., k}. If k were inner, we wouldn't have completed the k-1 subproblems before moving to k."
      },
      {
        q: "How is the shortest path reconstructed using the Pi matrix?",
        a: "If Pi[i][j] is NIL, no path exists. Otherwise, recursively print path from i to Pi[i][j], then print vertex j."
      }
    ]
  },

  nQueen: {
    id: "nQueen",
    name: "N-Queens Problem",
    category: "Backtracking",
    tsecSrNo: 11,
    tagline: "Place N chess queens on a board so no two queens shoot laser beams at each other",
    eli5: "A queen in chess can attack anyone in the same row, same column, or along any diagonal! We want to place N queens on an N×N board so no two queens attack. We place queens row by row. In row 'k', we try placing our queen in column 'i' (from 1 to N). Before leaving her there, our bodyguard function `place(k, i)` checks all previously placed queens 'j': 1) Are they in the same column (x[j] == i)? 2) Are they on the same diagonal (|x[j] - i| == |j - k|)? If safe, we advance to row k+1. If we get stuck and no column in row k+1 is safe, we BACKTRACK: lift the queen in row k and try the next column! We count every single time the queen procedure is called!",
    variablesExplained: {
      "k": "Current row we are attempting to place a queen in (starts at 1).",
      "i": "Candidate column in row k (tested from 1 to n).",
      "x[k]": "1D output array where x[k] = column index where queen in row k is placed.",
      "call_count": "Crucial for TSEC exam! Total number of calls to the nQueen() procedure."
    },
    examRequirements: "Must print output in 1D array format (e.g. [2, 4, 1, 3]), 2D board format, and total number of calls to queen procedure!",
    timeComplexity: {
      best: "O(N!)",
      avg: "O(N!)",
      worst: "O(N!) - Exponential search tree."
    },
    spaceComplexity: "O(N) for array x[] and recursion stack.",
    vivaQuestions: [
      {
        q: "What is the bounding condition / check in the place(k, i) function?",
        a: "For all previous rows j from 1 to k-1: 1) Same column check: `x[j] == i`. 2) Diagonal check: `abs(x[j] - i) == abs(j - k)`. If either condition is true, return false (unsafe); else return true (safe)."
      },
      {
        q: "Why do we only need a 1D array x[1..n] instead of a 2D matrix?",
        a: "Because by design we place exactly one queen per row! Hence the row index is implicitly the array index k, and the value x[k] stores the column index."
      },
      {
        q: "How many solutions exist for 4-Queens and 8-Queens?",
        a: "For 4-Queens: 2 distinct solutions ([2, 4, 1, 3] and [3, 1, 4, 2]). For 8-Queens: 92 distinct solutions (12 fundamentally unique solutions up to rotations and reflections)."
      }
    ]
  },

  sumOfSubset: {
    id: "sumOfSubset",
    name: "Sum of Subsets",
    category: "Backtracking",
    tsecSrNo: 12,
    tagline: "Pick numbers from a bag that add up EXACTLY to your target sum",
    eli5: "Imagine having coins with numbers like {3, 5, 7, 9} and your mom asks for exactly 12 rupees! We sort the numbers first. At each coin 'k', we have two choices (a binary tree): Branch 1: INCLUDE coin k (x[k] = 1). Branch 2: EXCLUDE coin k (x[k] = 0). We use smart bounding rules to stop wasting time: 1) If current sum + coin k > 12, STOP going deeper! 2) If current sum + ALL remaining coins together can't even reach 12, STOP going deeper! Every time we call the procedure, we increment 'call_count' for the exam!",
    variablesExplained: {
      "k": "Index of current element in set w[] being considered.",
      "current_sum (s)": "Sum of all elements selected so far (where x[i] == 1).",
      "remaining_sum (r)": "Sum of all remaining available elements yet to be decided.",
      "M": "Target sum we want to reach.",
      "x[k]": "Solution vector: 1 if element w[k] is included, 0 if excluded.",
      "call_count": "Crucial for TSEC exam! Total number of calls to SumOfSubset procedure."
    },
    examRequirements: "Must print all solution vectors X and the total number of calls to the Sum of Subset procedure!",
    timeComplexity: {
      best: "O(2ⁿ)",
      avg: "O(2ⁿ)",
      worst: "O(2ⁿ) pruned state-space tree."
    },
    spaceComplexity: "O(n) for solution vector and recursion stack.",
    vivaQuestions: [
      {
        q: "Why is it important to sort elements in ascending order before running Sum of Subsets?",
        a: "Sorting enables effective pruning! If `current_sum + w[k] > M`, then because elements are sorted, all subsequent elements `w[k+1] ... w[n]` will also exceed M, allowing us to immediately terminate that branch without exploring further."
      },
      {
        q: "State the two bounding functions used to prune the state space tree.",
        a: "1) `current_sum + w[k] <= M` (cannot exceed target sum).\n2) `current_sum + remaining_sum >= M` (even taking everything left must be able to reach target sum)."
      },
      {
        q: "What is the difference between 0/1 Knapsack and Sum of Subsets?",
        a: "0/1 Knapsack is an optimization problem (maximize profit subject to weight constraint <= W), typically solved in pseudo-polynomial time using DP. Sum of Subsets is a decision / constraint satisfaction problem (find all subsets summing EXACTLY to M), solved using Backtracking."
      }
    ]
  },

  kmp: {
    id: "kmp",
    name: "KMP String Matching",
    category: "String Matching",
    tsecSrNo: 13,
    tagline: "Never look backwards in the book! Use a prefix cheat-table to jump forward",
    eli5: "Suppose you are searching for 'ABABAC' inside a 1000-page book. In the naive method, whenever you hit a mismatch, you start reading from scratch at the next letter. That's super slow! In KMP, pointer 'i' into the book NEVER GOES BACKWARDS. How? We first inspect our pattern and build an LPS (Longest Proper Prefix which is also Suffix) table (also called π table). When a mismatch happens at pattern index 'j', the π table tells us: 'Hey! The prefix of length π[j-1] was already matched, so jump pattern pointer j directly to π[j-1] and keep checking!'",
    variablesExplained: {
      "i": "Pointer into Text string (advances continuously from 0 to n-1, NEVER backtracks).",
      "j": "Pointer into Pattern string (0 to m).",
      "pi[] / lps[]": "Array where pi[j] is the length of longest proper prefix of pattern[0..j] that is also a suffix.",
      "len": "Length of the previous longest prefix suffix during pi table construction."
    },
    examRequirements: "Must print all occurrence indices of the pattern in text and the precomputed π (LPS) table!",
    timeComplexity: {
      best: "O(m + n) linear time!",
      avg: "O(m + n)",
      worst: "O(m + n) - O(m) to build pi table, O(n) to match text."
    },
    spaceComplexity: "O(m) for the π (LPS) array of the pattern.",
    vivaQuestions: [
      {
        q: "What does the π (or LPS) table represent in KMP?",
        a: "For each prefix P[0..i], π[i] stores the length of the longest proper prefix that is also a suffix of P[0..i]. It tells us the next character to compare without backtracking the text pointer."
      },
      {
        q: "Why is KMP's time complexity O(m + n) rather than O(m · n)?",
        a: "Because the text pointer 'i' never decrements (monotonically increases up to n). In the pattern, the pointer 'j' can decrease, but it can only decrease as many times as it increased (at most n times). Total comparisons <= 2n."
      },
      {
        q: "What is a 'proper prefix'?",
        a: "A prefix of a string S that is not equal to S itself. Example: for 'ABC', proper prefixes are '', 'A', 'AB'."
      }
    ]
  },

  rabinKarp: {
    id: "rabinKarp",
    name: "Rabin-Karp String Matching",
    category: "String Matching",
    tsecSrNo: 14,
    tagline: "Compute a math fingerprint for each window and slide it like a calculator",
    eli5: "Imagine every word having a unique numeric fingerprint (a hash). First, we calculate the hash of our search pattern (e.g. 523). Then we slide a window of the same length across the book and calculate the window's hash. If the hashes don't match, the words DEFINITELY don't match! If the hashes match, we double-check letter by letter to be 100% sure. How do we slide the window quickly without recalculating from scratch? Rolling Hash! Subtract the old leading letter value, multiply by 10 (base d), and add the new trailing letter! If hashes match but letters differ, we call it a 'Spurious Hit'!",
    variablesExplained: {
      "d": "Number of characters in alphabet (e.g. 10 for digits, 256 for ASCII).",
      "q": "A prime number used for modulo to prevent integer overflow.",
      "p": "Hash value of pattern.",
      "t": "Rolling hash value of current text window.",
      "h": "Value of d^(m-1) % q (used to remove the most significant digit from the rolling hash).",
      "s": "Window shift index (0 to n - m)."
    },
    examRequirements: "Must print all occurrence indices of string, rolling hash values at each shift, and note any spurious hits!",
    timeComplexity: {
      best: "O(n + m) when few hash collisions occur.",
      avg: "O(n + m)",
      worst: "O(n · m) if poor hash function results in spurious hits at every single window."
    },
    spaceComplexity: "O(1) auxiliary space.",
    vivaQuestions: [
      {
        q: "What is a 'Spurious Hit' in Rabin-Karp?",
        a: "A spurious hit occurs when the hash value of the current text window equals the hash value of the pattern (due to modulo arithmetic / hash collision), but the actual characters in the window do NOT match the pattern upon character-by-character verification."
      },
      {
        q: "What is the formula for rolling hash computation?",
        a: "t_{s+1} = (d * (t_s - T[s+1] * h) + T[s + m + 1]) mod q, where h = d^(m-1) mod q."
      },
      {
        q: "Why do we use a prime number q for modulo?",
        a: "Using a prime number distributes hash values more uniformly across the range [0, q-1], minimizing hash collisions and reducing spurious hits."
      }
    ]
  },

  bfs: {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    category: "Graph Traversal",
    tsecSrNo: 15,
    tagline: "Water ripples expanding outward level by level",
    eli5: "Imagine dropping a pebble in a pond: ripples spread outward in expanding circles! In BFS, you start at a source vertex (distance 0). First, you visit all immediate neighbors 1 step away (level 1). Then you visit all their unvisited neighbors 2 steps away (level 2), and so on! We use a FIFO (First-In First-Out) QUEUE to keep track of who to visit next. We color vertices: WHITE = unvisited, GRAY = waiting in queue, BLACK = completely visited!",
    variablesExplained: {
      "source": "Starting vertex for BFS traversal.",
      "queue": "FIFO queue storing discovered vertices waiting to be explored.",
      "visited[]": "Color or boolean flag (0=white, 1=gray, 2=black).",
      "d[]": "Distance from source to vertex (shortest path in unweighted graph!).",
      "pi[]": "Predecessor array pointing to the parent vertex in the BFS tree."
    },
    examRequirements: "Print the BFS traversal order, distance array d, and predecessor array pi!",
    timeComplexity: {
      best: "O(V + E) with adjacency list; O(V²) with adjacency matrix.",
      avg: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V) for queue, visited, and distance arrays.",
    vivaQuestions: [
      {
        q: "Which data structure is used in BFS and why?",
        a: "A FIFO Queue is used. This ensures vertices are explored in strictly increasing order of their distance from the source (level-by-level)."
      },
      {
        q: "Does BFS guarantee shortest path in an unweighted graph?",
        a: "Yes! Because it explores vertices level by level, the first time BFS discovers a vertex v, the path from source to v is guaranteed to have the minimum number of edges."
      },
      {
        q: "What are the three vertex states (colors) in standard BFS?",
        a: "WHITE: Undiscovered vertex. GRAY: Discovered vertex placed into the queue. BLACK: Finished vertex whose entire adjacency list has been explored."
      }
    ]
  },

  dfs: {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    category: "Graph Traversal",
    tsecSrNo: 16,
    tagline: "Explore a maze by following one tunnel until you hit a dead end, then backtrack",
    eli5: "Imagine exploring a deep mysterious cave. Whenever you reach a fork in the tunnel, you pick one path and walk as deep as you can until you hit a dead end! When stuck, you backtrack to the last fork and try the next tunnel. DFS uses a LIFO STACK (or recursion). We record two timestamps for every vertex: Discovery time d[u] (when we first entered the room) and Finish time f[u] (when we finished exploring all rooms connected to it)!",
    variablesExplained: {
      "u": "Current vertex being visited.",
      "time": "Global clock counter incremented at every discovery and finish event.",
      "d[u]": "Discovery timestamp (first visited).",
      "f[u]": "Finishing timestamp (all neighbors completely explored).",
      "pi[u]": "Predecessor / parent in the DFS tree."
    },
    examRequirements: "Print the DFS traversal order, discovery/finishing times d[] and f[], and classify edges!",
    timeComplexity: {
      best: "O(V + E) with adjacency list; O(V²) with adjacency matrix.",
      avg: "O(V + E)",
      worst: "O(V + E)"
    },
    spaceComplexity: "O(V) for recursion call stack and timestamp arrays.",
    vivaQuestions: [
      {
        q: "What is the Parenthesis Theorem in DFS?",
        a: "For any two vertices u and v, their intervals [d[u], f[u]] and [d[v], f[v]] are either completely disjoint (neither is a descendant of the other) or one is entirely contained within the other (one is a descendant of the other in the DFS tree)."
      },
      {
        q: "What are the 4 types of edges classified by DFS in a directed graph?",
        a: "1) Tree Edge: edge leading to a newly discovered vertex.\n2) Back Edge: edge connecting to an ancestor in the DFS tree (indicates a cycle!).\n3) Forward Edge: nontree edge connecting to a descendant.\n4) Cross Edge: edge connecting vertices across different branches or trees."
      },
      {
        q: "How can DFS be used to detect cycles in a directed graph?",
        a: "A directed graph contains a cycle if and only if DFS discovers at least one BACK EDGE (an edge from vertex u to an active ancestor v that is currently GRAY / on the recursion stack)."
      }
    ]
  }
};
