# ⚡ Analysis of Algorithms (AOA) - Programs & Interactive Visualizer

[![Language](https://img.shields.io/badge/Language-C%20%7C%20Java%20%7C%20JavaScript-blue.svg)](#)
[![University](https://img.shields.io/badge/Curriculum-Mumbai%20University%20%2F%20TSEC-orange.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

A comprehensive, exam-ready repository for **Analysis of Algorithms (AOA)** (Semester III / Computer Engineering, TSEC & Mumbai University). Includes **all 16 core practical experiments** written in authentic, examiner-compliant **C code**, paired with a **pro-level interactive web visualizer** featuring step-by-step animations, drag-down comparison spotlights, floating keys, chessboard backtracking, DP grids, string matching, and Viva Voce preparation.

> 🌐 **Live Interactive Web Visualizer:** [https://mihirkamat03.github.io/aoa-programs/](https://mihirkamat03.github.io/aoa-programs/)

---

## 📑 Table of Contents
- [✨ Key Features](#-key-features)
- [📂 Repository Structure](#-repository-structure)
- [📊 Complete 16 Practicals Index](#-complete-16-practicals-index)
- [🎮 Running the Interactive Visualizer](#-running-the-interactive-visualizer)
- [💻 Compiling & Running C Programs](#-compiling--running-c-programs)
- [🎓 Practical Exam & Viva Voce Highlights](#-practical-exam--viva-voce-highlights)
- [📜 License](#-license)

---

## ✨ Key Features

1. **All 16 Practical Experiments in C**:
   - Exact variable names ($i, j, k, h, p, r, x, b[]$) matching lecture notes and standard textbooks (CLRS / Horowitz & Sahni).
   - Includes required exam stdout formats (pass-by-pass printouts and procedure call counters for QuickSort/MergeSort/N-Queens).
2. **Pro-Level Web Visualizer (No Bar Graphs!)**:
   - **Horizontal Rounded Array Cells**: Modern glassmorphic cards with crisp borders and index tags.
   - **Dragged-Down Comparison Spotlight**: Elements move down into a spotlight when compared. If the condition fails, they smoothly return up to their original slot.
   - **Floating Key Animation (Insertion Sort)**: Floating card hovering above the array while cards shift right.
   - **Auxiliary Buffer $b[ ]$ (Merge Sort)**: Displays temporary RAM storage merging before copying back.
   - **Interactive Chessboard (N-Queens)**: Live conflict detection rays, piece placements, and solution counters.
   - **String Matching Arena**: KMP $\pi$-table (LPS) and Rabin-Karp rolling hash calculation breakdown.
   - **DP Table Grids**: Interactive recurrence relation lookups for 0/1 Knapsack, LCS, and Floyd-Warshall.
   - **Graph Traversal & MST**: Visual Prim's, Kruskal's, Dijkstra's, BFS, and DFS with distance/predecessor vectors.
3. **Synchronized Real-Time Code Tracking**:
   - Visual steps highlight corresponding lines of C code in real time.
4. **Kid-Friendly (ELI5) Step-by-Step Stories**:
   - Intuitive, crystal-clear explanations for every state transition.

---

## 📂 Repository Structure

```plaintext
aoa-programs/
│
├── index.html                           # Web Portal Entry Point (Served directly via GitHub Pages)
├── css/
│   └── styles.css                       # Glassmorphic UI & Smooth Animation Keyframes
├── js/
│   ├── app.js                           # Main App Controller & Audio Synthesizer
│   ├── visualizer.js                    # SVG & DOM Visual Rendering Engine
│   ├── code_snippets.js                 # C, Java & Pseudocode Snippets
│   ├── viva_data.js                     # Viva Q&A Bank & Complexity Tables
│   └── algorithms/                      # Step Generators for all 16 algorithms
│       ├── sorting.js
│       ├── greedy.js
│       ├── dp.js
│       ├── backtracking.js
│       ├── strings.js
│       └── graphs.js
│
├── c_programs/                          # Standalone C source files for all 16 practicals
│   ├── 01_insertion_sort.c
│   ├── 02_selection_sort.c
│   ├── 03_quick_sort.c
│   ├── 04_merge_sort.c
│   ├── 05_prims_mst.c
│   ├── 06_kruskals_mst.c
│   ├── 07_dijkstra.c
│   ├── 08_knapsack_01.c
│   ├── 09_lcs.c
│   ├── 10_floyd_warshall.c
│   ├── 11_n_queen.c
│   ├── 12_sum_of_subset.c
│   ├── 13_kmp_string_matching.c
│   ├── 14_rabin_karp_string_matching.c
│   ├── 15_bfs_traversal.c
│   └── 16_dfs_traversal.c
│
├── Start_AOA_Visualizer.bat             # One-click Windows desktop launcher
└── README.md                            # Documentation & Study Guide
```

---

## 📊 Complete 16 Practicals Index

| Sr. No. | Experiment Name | Algorithm Paradigm | Best Case | Average Case | Worst Case | Space |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **1** | [Insertion Sort](c_programs/01_insertion_sort.c) | Incremental | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **2** | [Selection Sort](c_programs/02_selection_sort.c) | Brute-force / Selection | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **3** | [Quick Sort](c_programs/03_quick_sort.c) | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| **4** | [Merge Sort](c_programs/04_merge_sort.c) | Divide & Conquer | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| **5** | [Prim's MST](c_programs/05_prims_mst.c) | Greedy | $O(V^2)$ / $O(E \log V)$ | $O(E \log V)$ | $O(E \log V)$ | $O(V)$ |
| **6** | [Kruskal's MST](c_programs/06_kruskals_mst.c) | Greedy (Union-Find) | $O(E \log E)$ | $O(E \log E)$ | $O(E \log E)$ | $O(V + E)$ |
| **7** | [Dijkstra's SSSP](c_programs/07_dijkstra.c) | Greedy | $O(V^2)$ | $O((V+E)\log V)$ | $O(V^2)$ | $O(V)$ |
| **8** | [0/1 Knapsack](c_programs/08_knapsack_01.c) | Dynamic Programming | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ | $O(n \cdot W)$ |
| **9** | [Longest Common Subsequence (LCS)](c_programs/09_lcs.c) | Dynamic Programming | $O(m \cdot n)$ | $O(m \cdot n)$ | $O(m \cdot n)$ | $O(m \cdot n)$ |
| **10** | [Floyd-Warshall APSP](c_programs/10_floyd_warshall.c) | Dynamic Programming | $O(V^3)$ | $O(V^3)$ | $O(V^3)$ | $O(V^2)$ |
| **11** | [N-Queens Problem](c_programs/11_n_queen.c) | Backtracking | $O(N!)$ | $O(N!)$ | $O(N!)$ | $O(N)$ |
| **12** | [Sum of Subsets](c_programs/12_sum_of_subset.c) | Backtracking | $O(2^n)$ | $O(2^n)$ | $O(2^n)$ | $O(n)$ |
| **13** | [KMP String Matching](c_programs/13_kmp_string_matching.c) | String Matching (DFA) | $O(n + m)$ | $O(n + m)$ | $O(n + m)$ | $O(m)$ |
| **14** | [Rabin-Karp String Matching](c_programs/14_rabin_karp_string_matching.c) | String Matching (Hashing) | $O(n + m)$ | $O(n + m)$ | $O(n \cdot m)$ | $O(1)$ |
| **15** | [Breadth First Search (BFS)](c_programs/15_bfs_traversal.c) | Graph Traversal (Queue) | $O(V + E)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ |
| **16** | [Depth First Search (DFS)](c_programs/16_dfs_traversal.c) | Graph Traversal (Stack) | $O(V + E)$ | $O(V + E)$ | $O(V + E)$ | $O(V)$ |

---

## 🎮 Running the Interactive Visualizer

No web servers or dependencies needed! Simply open in any modern browser:

### Option A: Double-Click Batch File (Windows)
Double-click `Start_AOA_Visualizer.bat` in the root folder.

### Option B: Open Directly
Open `index.html` in Chrome, Edge, Firefox, or Safari.

### Visualizer Keyboard Shortcuts:
- **`Spacebar`**: Play / Pause animation
- **`Right Arrow (→)`**: Step Forward
- **`Left Arrow (←)`**: Step Backward
- **`R`**: Reset to initial step

---

## 💻 Compiling & Running C Programs

Each program in `c_programs/` is standalone and can be compiled using `gcc` or `clang`:

```bash
# Example 1: Compile & run Insertion Sort
gcc c_programs/01_insertion_sort.c -o insertion_sort
./insertion_sort

# Example 2: Compile & run Quick Sort (with call counter)
gcc c_programs/03_quick_sort.c -o quick_sort
./quick_sort

# Example 3: Compile & run 4-Queens Backtracking
gcc c_programs/11_n_queen.c -o n_queen
./n_queen
```

---

## 🎓 Practical Exam & Viva Voce Highlights

Common viva questions covered by this repository:
1. **Why is QuickSort $O(n^2)$ in worst case?**
   - When the chosen pivot is consistently the smallest or largest element (e.g., sorted array with last element as pivot).
2. **Why does MergeSort take $O(n)$ auxiliary space?**
   - The merge step requires a temporary buffer $b[ ]$ of size up to $n$ to store merged elements before copying back.
3. **What is a Spurious Hit in Rabin-Karp?**
   - When the hash values of the text window and pattern match ($t_s = p \pmod q$), but actual characters differ upon direct string comparison.
4. **Why is KMP linear time $O(n + m)$?**
   - The $\pi$-table (LPS array) allows shifting the pattern without ever backtracking the text pointer $i$.
5. **Dynamic Programming vs Greedy Method**:
   - Greedy makes the locally optimal choice at each step without reconsidering; DP solves all subproblems, memoizes results, and guarantees a globally optimal solution.

---

## 📜 License
Released under the [MIT License](LICENSE). Built for educational use and university exam preparation.
