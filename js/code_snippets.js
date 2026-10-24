/**
 * Authentic C and Java code snippets for all 16 TSEC AOA Practical Experiments.
 * Includes pseudocode and line-by-line mapping for real-time visual code highlighting.
 */

const CODE_SNIPPETS = {
  insertionSort: {
    pseudo: [
      "// Insertion Sort (Module 1.3 Lecture Notes)",
      "for j = 2 to n do:",
      "    key = A[j]",
      "    i = j - 1",
      "    while (i > 0 and A[i] > key) do:",
      "        A[i + 1] = A[i]   // Shift right",
      "        i = i - 1",
      "    A[i + 1] = key        // Insert key in place",
      "    printPass(A, n, pass = j)"
    ],
    c: `#include <stdio.h>

void printPass(int a[], int n, int pass) {
    printf("Pass %d: ", pass);
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\\n");
}

void insertionSort(int a[], int n) {
    int i, j, key;
    for (j = 1; j < n; j++) {
        key = a[j];
        i = j - 1;
        while (i >= 0 && a[i] > key) {
            a[i + 1] = a[i];
            i = i - 1;
        }
        a[i + 1] = key;
        printPass(a, n, j); // Required by TSEC exam
    }
}

int main() {
    int a[] = {25, 17, 31, 13, 2, 45, 9};
    int n = sizeof(a) / sizeof(a[0]);
    printf("Initial Array: ");
    printPass(a, n, 0);
    insertionSort(a, n);
    return 0;
}`,
    java: `import java.util.Arrays;

public class InsertionSortPractical {
    public static void printPass(int[] a, int pass) {
        System.out.println("Pass " + pass + ": " + Arrays.toString(a));
    }

    public static void insertionSort(int[] a) {
        int n = a.length;
        for (int j = 1; j < n; j++) {
            int key = a[j];
            int i = j - 1;
            while (i >= 0 && a[i] > key) {
                a[i + 1] = a[i];
                i = i - 1;
            }
            a[i + 1] = key;
            printPass(a, j); // Required by TSEC exam
        }
    }

    public static void main(String[] args) {
        int[] a = {25, 17, 31, 13, 2, 45, 9};
        System.out.println("Initial: " + Arrays.toString(a));
        insertionSort(a);
    }
}`
  },

  selectionSort: {
    pseudo: [
      "// Selection Sort (Module 1.3 Lecture Notes)",
      "for i = 1 to n do:",
      "    j = i  // j is min tracker",
      "    for k = i + 1 to n do:",
      "        if (A[k] < A[j]) j = k",
      "    swap(A[i], A[j])",
      "    printPass(A, n, pass = i)"
    ],
    c: `#include <stdio.h>

void printPass(int a[], int n, int pass) {
    printf("Pass %d: ", pass);
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\\n");
}

void selectionSort(int a[], int n) {
    int i, j, k, t;
    for (i = 0; i < n - 1; i++) {
        j = i; // j is minimum index
        for (k = i + 1; k < n; k++) {
            if (a[k] < a[j]) {
                j = k;
            }
        }
        // Swap a[i] and a[j]
        t = a[i];
        a[i] = a[j];
        a[j] = t;
        printPass(a, n, i + 1); // Required by TSEC
    }
}

int main() {
    int a[] = {64, 25, 12, 22, 11};
    int n = sizeof(a) / sizeof(a[0]);
    selectionSort(a, n);
    return 0;
}`,
    java: `import java.util.Arrays;

public class SelectionSortPractical {
    public static void selectionSort(int[] a) {
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            int j = i;
            for (int k = i + 1; k < n; k++) {
                if (a[k] < a[j]) j = k;
            }
            int t = a[i];
            a[i] = a[j];
            a[j] = t;
            System.out.println("Pass " + (i + 1) + ": " + Arrays.toString(a));
        }
    }

    public static void main(String[] args) {
        int[] a = {64, 25, 12, 22, 11};
        selectionSort(a);
    }
}`
  },

  quickSort: {
    pseudo: [
      "// Quick Sort (Module 2.2 Lecture Notes)",
      "QUICKSORT(A, p, r)",
      "    if p < r then:",
      "        q = PARTITION(A, p, r)",
      "        QUICKSORT(A, p, q - 1)",
      "        QUICKSORT(A, q + 1, r)",
      "PARTITION(A, p, r)",
      "    x = A[r]  // Pivot",
      "    i = p - 1",
      "    for j = p to r - 1 do:",
      "        if A[j] <= x then:",
      "            i = i + 1",
      "            swap(A[i], A[j])",
      "    swap(A[i + 1], A[r])",
      "    return i + 1"
    ],
    c: `#include <stdio.h>

int call_count = 0; // Required by TSEC practical

void swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

int partition(int a[], int p, int r) {
    int x = a[r]; // Pivot x
    int i = p - 1;
    for (int j = p; j <= r - 1; j++) {
        if (a[j] <= x) {
            i++;
            swap(&a[i], &a[j]);
        }
    }
    swap(&a[i + 1], &a[r]);
    return i + 1;
}

void quickSort(int a[], int p, int r) {
    call_count++; // Track procedure calls
    if (p < r) {
        int q = partition(a, p, r);
        quickSort(a, p, q - 1);
        quickSort(a, q + 1, r);
    }
}

int main() {
    int a[] = {10, 80, 30, 90, 40, 50, 70};
    int n = sizeof(a) / sizeof(a[0]);
    quickSort(a, 0, n - 1);
    printf("Sorted Array: ");
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\\nTotal calls to QuickSort procedure: %d\\n", call_count);
    return 0;
}`,
    java: `import java.util.Arrays;

public class QuickSortPractical {
    static int callCount = 0;

    static int partition(int[] a, int p, int r) {
        int x = a[r]; // Pivot x
        int i = p - 1;
        for (int j = p; j < r; j++) {
            if (a[j] <= x) {
                i++;
                int temp = a[i]; a[i] = a[j]; a[j] = temp;
            }
        }
        int temp = a[i + 1]; a[i + 1] = a[r]; a[r] = temp;
        return i + 1;
    }

    static void quickSort(int[] a, int p, int r) {
        callCount++; // Required by TSEC exam
        if (p < r) {
            int q = partition(a, p, r);
            quickSort(a, p, q - 1);
            quickSort(a, q + 1, r);
        }
    }

    public static void main(String[] args) {
        int[] a = {10, 80, 30, 90, 40, 50, 70};
        quickSort(a, 0, a.length - 1);
        System.out.println("Sorted: " + Arrays.toString(a));
        System.out.println("Total calls to QuickSort procedure: " + callCount);
    }
}`
  },

  mergeSort: {
    pseudo: [
      "// Merge Sort (Module 2.1 Lecture Notes)",
      "MERGESORT(a, low, high)",
      "    if low < high then:",
      "        mid = (low + high) / 2",
      "        MERGESORT(a, low, mid)",
      "        MERGESORT(a, mid + 1, high)",
      "        MERGE(a, low, mid, high)",
      "MERGE(a, low, mid, high)",
      "    h = low; i = low; j = mid + 1",
      "    while h <= mid and j <= high do:",
      "        if a[h] <= a[j] then b[i++] = a[h++] else b[i++] = a[j++]",
      "    if h > mid then for k = j to high do b[i++] = a[k]",
      "    else for k = h to mid do b[i++] = a[k]",
      "    for k = low to high do a[k] = b[k]"
    ],
    c: `#include <stdio.h>

int call_count = 0; // Required by TSEC practical

void merge(int a[], int low, int mid, int high) {
    int h = low, i = low, j = mid + 1, k;
    int b[100]; // Auxiliary array b[] from notes

    while (h <= mid && j <= high) {
        if (a[h] <= a[j]) b[i++] = a[h++];
        else b[i++] = a[j++];
    }
    if (h > mid) {
        for (k = j; k <= high; k++) b[i++] = a[k];
    } else {
        for (k = h; k <= mid; k++) b[i++] = a[k];
    }
    for (k = low; k <= high; k++) {
        a[k] = b[k];
    }
}

void mergeSort(int a[], int low, int high) {
    call_count++; // Track calls
    if (low < high) {
        int mid = (low + high) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}

int main() {
    int a[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(a) / sizeof(a[0]);
    mergeSort(a, 0, n - 1);
    printf("Sorted Array: ");
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\\nTotal calls to MergeSort procedure: %d\\n", call_count);
    return 0;
}`,
    java: `import java.util.Arrays;

public class MergeSortPractical {
    static int callCount = 0;

    static void merge(int[] a, int low, int mid, int high) {
        int h = low, i = low, j = mid + 1, k;
        int[] b = new int[a.length];

        while (h <= mid && j <= high) {
            if (a[h] <= a[j]) b[i++] = a[h++];
            else b[i++] = a[j++];
        }
        if (h > mid) {
            for (k = j; k <= high; k++) b[i++] = a[k];
        } else {
            for (k = h; k <= mid; k++) b[i++] = a[k];
        }
        for (k = low; k <= high; k++) a[k] = b[k];
    }

    static void mergeSort(int[] a, int low, int high) {
        callCount++;
        if (low < high) {
            int mid = (low + high) / 2;
            mergeSort(a, low, mid);
            mergeSort(a, mid + 1, high);
            merge(a, low, mid, high);
        }
    }

    public static void main(String[] args) {
        int[] a = {38, 27, 43, 3, 9, 82, 10};
        mergeSort(a, 0, a.length - 1);
        System.out.println("Sorted: " + Arrays.toString(a));
        System.out.println("Total calls to MergeSort procedure: " + callCount);
    }
}
`
  },

  primsMST: {
    pseudo: [
      "// Prim's MST Algorithm",
      "initialize key[v] = infinity, parent[v] = -1 for all v",
      "key[0] = 0",
      "for count = 0 to V - 1 do:",
      "    u = minKeyVertex(key, inMST)",
      "    inMST[u] = true",
      "    for each neighbor v of u do:",
      "        if graph[u][v] != 0 and !inMST[v] and graph[u][v] < key[v]:",
      "            parent[v] = u",
      "            key[v] = graph[u][v]",
      "print MST edges and minimum total cost"
    ],
    c: `#include <stdio.h>
#define V 5
#define INF 999999

int minKey(int key[], int inMST[]) {
    int min = INF, min_index = -1;
    for (int v = 0; v < V; v++)
        if (!inMST[v] && key[v] < min)
            min = key[v], min_index = v;
    return min_index;
}

void primMST(int graph[V][V]) {
    int parent[V], key[V], inMST[V];
    for (int i = 0; i < V; i++) key[i] = INF, inMST[i] = 0;

    key[0] = 0; parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, inMST);
        inMST[u] = 1;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    // Output required by TSEC practical
    int totalCost = 0;
    printf("Edges in MST:\\nEdge \\tWeight\\n");
    for (int i = 1; i < V; i++) {
        printf("%d - %d \\t%d\\n", parent[i], i, graph[i][parent[i]]);
        totalCost += graph[i][parent[i]];
    }
    printf("Minimum Cost of MST = %d\\n", totalCost);
}

int main() {
    int graph[V][V] = {
        {0, 2, 0, 6, 0},
        {2, 0, 3, 8, 5},
        {0, 3, 0, 0, 7},
        {6, 8, 0, 0, 9},
        {0, 5, 7, 9, 0}
    };
    primMST(graph);
    return 0;
}`,
    java: `import java.util.Arrays;

public class PrimMSTPractical {
    static final int V = 5;
    static final int INF = 999999;

    static void primMST(int[][] graph) {
        int[] parent = new int[V];
        int[] key = new int[V];
        boolean[] inMST = new boolean[V];
        Arrays.fill(key, INF);

        key[0] = 0; parent[0] = -1;

        for (int count = 0; count < V - 1; count++) {
            int u = -1, min = INF;
            for (int v = 0; v < V; v++) {
                if (!inMST[v] && key[v] < min) { min = key[v]; u = v; }
            }
            inMST[u] = true;
            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && !inMST[v] && graph[u][v] < key[v]) {
                    parent[v] = u; key[v] = graph[u][v];
                }
            }
        }

        int totalCost = 0;
        System.out.println("Edges in MST:");
        for (int i = 1; i < V; i++) {
            System.out.println(parent[i] + " - " + i + " : " + graph[i][parent[i]]);
            totalCost += graph[i][parent[i]];
        }
        System.out.println("Minimum Cost = " + totalCost);
    }

    public static void main(String[] args) {
        int[][] graph = {
            {0, 2, 0, 6, 0},
            {2, 0, 3, 8, 5},
            {0, 3, 0, 0, 7},
            {6, 8, 0, 0, 9},
            {0, 5, 7, 9, 0}
        };
        primMST(graph);
    }
}`
  },

  kruskalsMST: {
    pseudo: [
      "// Kruskal's MST Algorithm",
      "sort all edges by weight in non-decreasing order",
      "initialize DSU: parent[v] = v for all v",
      "mstCount = 0",
      "for each edge (u, v, w) in sorted edges do:",
      "    rootU = find(u), rootV = find(v)",
      "    if rootU != rootV then:",
      "        add (u, v, w) to MST",
      "        union(rootU, rootV)",
      "        mstCount++",
      "        if mstCount == V - 1 then break",
      "print MST edges and minimum total cost"
    ],
    c: `#include <stdio.h>
#include <stdlib.h>

struct Edge { int src, dest, weight; };

int findRoot(int parent[], int i) {
    if (parent[i] == i) return i;
    return parent[i] = findRoot(parent, parent[i]); // Path compression
}

void unionSets(int parent[], int u, int v) {
    int rootU = findRoot(parent, u);
    int rootV = findRoot(parent, v);
    parent[rootU] = rootV;
}

int compareEdges(const void* a, const void* b) {
    return ((struct Edge*)a)->weight - ((struct Edge*)b)->weight;
}

void kruskalMST(struct Edge edges[], int V, int E) {
    qsort(edges, E, sizeof(edges[0]), compareEdges);
    int parent[V];
    for (int i = 0; i < V; i++) parent[i] = i;

    struct Edge resultMST[V - 1];
    int e = 0, i = 0, totalCost = 0;

    while (e < V - 1 && i < E) {
        struct Edge next = edges[i++];
        int x = findRoot(parent, next.src);
        int y = findRoot(parent, next.dest);
        if (x != y) { // No cycle!
            resultMST[e++] = next;
            totalCost += next.weight;
            unionSets(parent, x, y);
        }
    }

    printf("Edges in MST:\\nEdge \\tWeight\\n");
    for (i = 0; i < e; i++) {
        printf("%d - %d \\t%d\\n", resultMST[i].src, resultMST[i].dest, resultMST[i].weight);
    }
    printf("Minimum Cost of MST = %d\\n", totalCost);
}

int main() {
    int V = 4, E = 5;
    struct Edge edges[] = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},
        {1, 3, 15}, {2, 3, 4}
    };
    kruskalMST(edges, V, E);
    return 0;
}`,
    java: `import java.util.*;

public class KruskalMSTPractical {
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        Edge(int s, int d, int w) { src = s; dest = d; weight = w; }
        public int compareTo(Edge o) { return this.weight - o.weight; }
    }

    static int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }

    public static void main(String[] args) {
        int V = 4;
        List<Edge> edges = Arrays.asList(
            new Edge(0, 1, 10), new Edge(0, 2, 6), new Edge(0, 3, 5),
            new Edge(1, 3, 15), new Edge(2, 3, 4)
        );
        Collections.sort(edges);
        int[] parent = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;

        int totalCost = 0;
        System.out.println("Edges in MST:");
        for (Edge e : edges) {
            int rootU = find(parent, e.src);
            int rootV = find(parent, e.dest);
            if (rootU != rootV) {
                System.out.println(e.src + " - " + e.dest + " : " + e.weight);
                totalCost += e.weight;
                parent[rootU] = rootV;
            }
        }
        System.out.println("Minimum Cost = " + totalCost);
    }
}`
  },

  knapsack01: {
    pseudo: [
      "// 0/1 Knapsack Dynamic Programming",
      "for i = 0 to n: V[i][0] = 0",
      "for w = 0 to W: V[0][w] = 0",
      "for i = 1 to n do:",
      "    for w = 1 to W do:",
      "        if wt[i] > w then:",
      "            V[i][w] = V[i - 1][w]",
      "        else:",
      "            V[i][w] = max(V[i-1][w], val[i] + V[i-1][w - wt[i]])",
      "print DP Matrix V",
      "backtrack to find solution vector X: if V[i][w] != V[i-1][w] then X[i] = 1, w -= wt[i]",
      "print total profit and solution vector X"
    ],
    c: `#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

void knapsack(int W, int wt[], int val[], int n) {
    int V[n + 1][W + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) V[i][w] = 0;
            else if (wt[i - 1] <= w)
                V[i][w] = max(val[i - 1] + V[i - 1][w - wt[i - 1]], V[i - 1][w]);
            else
                V[i][w] = V[i - 1][w];
        }
    }

    // 1. Print Matrix (TSEC practical requirement)
    printf("Knapsack DP Matrix:\\n");
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) printf("%4d", V[i][w]);
        printf("\\n");
    }

    // 2. Find Solution Vector (TSEC practical requirement)
    int X[n];
    for (int i = 0; i < n; i++) X[i] = 0;
    int res = V[n][W], w = W;
    for (int i = n; i > 0 && res > 0; i--) {
        if (res != V[i - 1][w]) {
            X[i - 1] = 1; // Item included
            res -= val[i - 1];
            w -= wt[i - 1];
        }
    }

    // 3. Print Results
    printf("\\nTotal Profit Earned = %d\\n", V[n][W]);
    printf("Solution Vector X = [ ");
    for (int i = 0; i < n; i++) printf("%d ", X[i]);
    printf("]\\n");
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50, n = 3;
    knapsack(W, wt, val, n);
    return 0;
}`,
    java: `public class Knapsack01Practical {
    public static void main(String[] args) {
        int[] val = {60, 100, 120};
        int[] wt = {10, 20, 30};
        int W = 50, n = val.length;
        int[][] V = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (wt[i - 1] <= w)
                    V[i][w] = Math.max(val[i - 1] + V[i - 1][w - wt[i - 1]], V[i - 1][w]);
                else
                    V[i][w] = V[i - 1][w];
            }
        }

        System.out.println("DP Matrix:");
        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) System.out.printf("%4d", V[i][w]);
            System.out.println();
        }

        int[] X = new int[n];
        int res = V[n][W], curW = W;
        for (int i = n; i > 0 && res > 0; i--) {
            if (res != V[i - 1][curW]) {
                X[i - 1] = 1;
                res -= val[i - 1];
                curW -= wt[i - 1];
            }
        }

        System.out.println("Total Profit Earned = " + V[n][W]);
        System.out.print("Solution Vector X = [ ");
        for (int x : X) System.out.print(x + " ");
        System.out.println("]");
    }
}`
  },

  lcs: {
    pseudo: [
      "// Longest Common Subsequence with Direction Arrows",
      "for i = 1 to m do:",
      "    for j = 1 to n do:",
      "        if X[i-1] == Y[j-1] then:",
      "            L[i][j] = L[i-1][j-1] + 1",
      "            B[i][j] = 'D' // Diagonal arrow ↖",
      "        else if L[i-1][j] >= L[i][j-1] then:",
      "            L[i][j] = L[i-1][j]",
      "            B[i][j] = 'U' // Up arrow ↑",
      "        else:",
      "            L[i][j] = L[i][j-1]",
      "            B[i][j] = 'L' // Left arrow ←",
      "print Matrix with arrows",
      "traceback arrows to reconstruct and print LCS string"
    ],
    c: `#include <stdio.h>
#include <string.h>

void lcs(char* X, char* Y) {
    int m = strlen(X), n = strlen(Y);
    int L[m + 1][n + 1];
    char B[m + 1][n + 1]; // 'D' (diag), 'U' (up), 'L' (left)

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) { L[i][j] = 0; B[i][j] = ' '; }
            else if (X[i - 1] == Y[j - 1]) {
                L[i][j] = L[i - 1][j - 1] + 1;
                B[i][j] = '\\\\'; // Diagonal
            } else if (L[i - 1][j] >= L[i][j - 1]) {
                L[i][j] = L[i - 1][j];
                B[i][j] = '^';  // Up
            } else {
                L[i][j] = L[i][j - 1];
                B[i][j] = '<';  // Left
            }
        }
    }

    // Print Matrix along with arrows (TSEC requirement)
    printf("LCS Matrix with Arrows:\\n   ");
    for (int j = 0; j < n; j++) printf("   %c", Y[j]);
    printf("\\n");
    for (int i = 0; i <= m; i++) {
        if (i > 0) printf("%c: ", X[i - 1]);
        else printf(" : ");
        for (int j = 0; j <= n; j++) {
            printf("%d%c ", L[i][j], B[i][j]);
        }
        printf("\\n");
    }

    // Reconstruct LCS string
    int idx = L[m][n];
    char lcsStr[idx + 1];
    lcsStr[idx] = '\\0';
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (B[i][j] == '\\\\') {
            lcsStr[idx - 1] = X[i - 1];
            i--; j--; idx--;
        } else if (B[i][j] == '^') i--;
        else j--;
    }

    printf("\\nLength of LCS = %d\\n", L[m][n]);
    printf("Characters in LCS = %s\\n", lcsStr);
}

int main() {
    char X[] = "LONGEST";
    char Y[] = "STONE";
    lcs(X, Y);
    return 0;
}`,
    java: `public class LCSPractical {
    public static void main(String[] args) {
        String X = "LONGEST", Y = "STONE";
        int m = X.length(), n = Y.length();
        int[][] L = new int[m + 1][n + 1];
        char[][] B = new char[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                    L[i][j] = L[i - 1][j - 1] + 1;
                    B[i][j] = '\\\\';
                } else if (L[i - 1][j] >= L[i][j - 1]) {
                    L[i][j] = L[i - 1][j];
                    B[i][j] = '^';
                } else {
                    L[i][j] = L[i][j - 1];
                    B[i][j] = '<';
                }
            }
        }

        System.out.println("Matrix with Arrows:");
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) System.out.print(L[i][j] + "" + B[i][j] + " ");
            System.out.println();
        }

        StringBuilder lcs = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (B[i][j] == '\\\\') {
                lcs.append(X.charAt(i - 1));
                i--; j--;
            } else if (B[i][j] == '^') i--;
            else j--;
        }
        System.out.println("Length of LCS = " + L[m][n]);
        System.out.println("Characters in LCS = " + lcs.reverse());
    }
}`
  },

  dijkstra: {
    pseudo: [
      "// Dijkstra's Single Source Shortest Path",
      "initialize D[v] = INF, Pi[v] = -1 for all v; D[src] = 0",
      "for count = 0 to V - 1 do:",
      "    u = unvisited vertex with minimum D[u]",
      "    visited[u] = true",
      "    for each neighbor v of u do:",
      "        if !visited[v] and D[u] + graph[u][v] < D[v]:",
      "            D[v] = D[u] + graph[u][v]  // Relaxation",
      "            Pi[v] = u",
      "print final D and Pi vectors",
      "print path from source to every vertex"
    ],
    c: `#include <stdio.h>
#define V 5
#define INF 999999

int minDistance(int D[], int visited[]) {
    int min = INF, min_idx = -1;
    for (int v = 0; v < V; v++)
        if (!visited[v] && D[v] < min)
            min = D[v], min_idx = v;
    return min_idx;
}

void printPath(int Pi[], int j) {
    if (Pi[j] == -1) { printf("%d", j); return; }
    printPath(Pi, Pi[j]);
    printf(" -> %d", j);
}

void dijkstra(int graph[V][V], int src) {
    int D[V], Pi[V], visited[V];
    for (int i = 0; i < V; i++) {
        D[i] = INF; Pi[i] = -1; visited[i] = 0;
    }
    D[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(D, visited);
        if (u == -1) break;
        visited[u] = 1;

        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] && D[u] != INF 
                && D[u] + graph[u][v] < D[v]) {
                D[v] = D[u] + graph[u][v]; // Relaxation
                Pi[v] = u;
            }
        }
    }

    // TSEC requirements
    printf("Final D Vector: [ ");
    for (int i = 0; i < V; i++) printf("%d ", D[i]);
    printf("]\\n");

    printf("Final Pi Vector: [ ");
    for (int i = 0; i < V; i++) printf("%d ", Pi[i]);
    printf("]\\n\\nPaths from Source %d:\\n", src);

    for (int i = 0; i < V; i++) {
        printf("To vertex %d (Dist: %d): Path: ", i, D[i]);
        printPath(Pi, i);
        printf("\\n");
    }
}

int main() {
    int graph[V][V] = {
        {0, 10, 0, 5, 0},
        {0, 0, 1, 2, 0},
        {0, 0, 0, 0, 4},
        {0, 3, 9, 0, 2},
        {7, 0, 6, 0, 0}
    };
    dijkstra(graph, 0);
    return 0;
}`,
    java: `import java.util.Arrays;

public class DijkstraPractical {
    static final int V = 5, INF = 999999;

    static void printPath(int[] Pi, int j) {
        if (Pi[j] == -1) { System.out.print(j); return; }
        printPath(Pi, Pi[j]);
        System.out.print(" -> " + j);
    }

    public static void main(String[] args) {
        int[][] graph = {
            {0, 10, 0, 5, 0},
            {0, 0, 1, 2, 0},
            {0, 0, 0, 0, 4},
            {0, 3, 9, 0, 2},
            {7, 0, 6, 0, 0}
        };
        int src = 0;
        int[] D = new int[V];
        int[] Pi = new int[V];
        boolean[] visited = new boolean[V];
        Arrays.fill(D, INF);
        Arrays.fill(Pi, -1);
        D[src] = 0;

        for (int count = 0; count < V - 1; count++) {
            int u = -1, min = INF;
            for (int v = 0; v < V; v++)
                if (!visited[v] && D[v] < min) { min = D[v]; u = v; }
            if (u == -1) break;
            visited[u] = true;

            for (int v = 0; v < V; v++) {
                if (!visited[v] && graph[u][v] != 0 && D[u] + graph[u][v] < D[v]) {
                    D[v] = D[u] + graph[u][v];
                    Pi[v] = u;
                }
            }
        }

        System.out.println("Final D Vector: " + Arrays.toString(D));
        System.out.println("Final Pi Vector: " + Arrays.toString(Pi));
        for (int i = 0; i < V; i++) {
            System.out.print("Path to " + i + " (cost " + D[i] + "): ");
            printPath(Pi, i);
            System.out.println();
        }
    }
}`
  },

  floydWarshall: {
    pseudo: [
      "// Floyd Warshall All-Pairs Shortest Path",
      "initialize D[i][j] = graph[i][j], Pi[i][j] = (graph[i][j] != INF) ? i : -1",
      "for k = 0 to V - 1 do:        // intermediate vertex",
      "    for i = 0 to V - 1 do:    // source vertex",
      "        for j = 0 to V - 1 do:// destination vertex",
      "            if D[i][k] + D[k][j] < D[i][j] then:",
      "                D[i][j] = D[i][k] + D[k][j]",
      "                Pi[i][j] = Pi[k][j]",
      "print final D matrix, final Pi matrix, and paths between all pairs"
    ],
    c: `#include <stdio.h>
#define V 4
#define INF 999999

void printPath(int Pi[V][V], int i, int j) {
    if (i == j) { printf("%d", i); return; }
    if (Pi[i][j] == -1) { printf("No Path"); return; }
    printPath(Pi, i, Pi[i][j]);
    printf(" -> %d", j);
}

void floydWarshall(int graph[V][V]) {
    int D[V][V], Pi[V][V];
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            D[i][j] = graph[i][j];
            if (i == j || graph[i][j] == INF) Pi[i][j] = -1;
            else Pi[i][j] = i;
        }
    }

    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (D[i][k] != INF && D[k][j] != INF && D[i][k] + D[k][j] < D[i][j]) {
                    D[i][j] = D[i][k] + D[k][j];
                    Pi[i][j] = Pi[k][j];
                }
            }
        }
    }

    // TSEC requirements
    printf("Final D Matrix:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (D[i][j] == INF) printf("%7s", "INF");
            else printf("%7d", D[i][j]);
        }
        printf("\\n");
    }

    printf("\\nFinal Pi Matrix:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) printf("%4d", Pi[i][j]);
        printf("\\n");
    }

    printf("\\nPaths between all pairs:\\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (i != j && D[i][j] != INF) {
                printf("%d to %d (dist %d): ", i, j, D[i][j]);
                printPath(Pi, i, j);
                printf("\\n");
            }
        }
    }
}

int main() {
    int graph[V][V] = {
        {0,   3,   INF, 5},
        {2,   0,   INF, 4},
        {INF, 1,   0,   INF},
        {INF, INF, 2,   0}
    };
    floydWarshall(graph);
    return 0;
}`,
    java: `public class FloydWarshallPractical {
    static final int V = 4, INF = 999999;

    static void printPath(int[][] Pi, int i, int j) {
        if (i == j) { System.out.print(i); return; }
        if (Pi[i][j] == -1) { System.out.print("No path"); return; }
        printPath(Pi, i, Pi[i][j]);
        System.out.print(" -> " + j);
    }

    public static void main(String[] args) {
        int[][] graph = {
            {0, 3, INF, 5},
            {2, 0, INF, 4},
            {INF, 1, 0, INF},
            {INF, INF, 2, 0}
        };
        int[][] D = new int[V][V];
        int[][] Pi = new int[V][V];

        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                D[i][j] = graph[i][j];
                Pi[i][j] = (i == j || graph[i][j] == INF) ? -1 : i;
            }
        }

        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (D[i][k] + D[k][j] < D[i][j]) {
                        D[i][j] = D[i][k] + D[k][j];
                        Pi[i][j] = Pi[k][j];
                    }
                }
            }
        }

        System.out.println("Final D Matrix:");
        for (int[] row : D) {
            for (int val : row) System.out.printf("%5d", val == INF ? -1 : val);
            System.out.println();
        }
        System.out.println("Final Pi Matrix:");
        for (int[] row : Pi) {
            for (int val : row) System.out.printf("%4d", val);
            System.out.println();
        }
    }
}`
  },

  nQueen: {
    pseudo: [
      "// N-Queens Backtracking with Call Counter",
      "function place(k, i):",
      "    for j = 1 to k - 1 do:",
      "        if x[j] == i or abs(x[j] - i) == abs(j - k) then:",
      "            return false  // Same column or diagonal conflict",
      "    return true",
      "",
      "function nQueen(k, n):",
      "    call_count++  // Count procedure calls",
      "    for i = 1 to n do:",
      "        if place(k, i) then:",
      "            x[k] = i",
      "            if k == n then printSolution1Dand2D(x)",
      "            else nQueen(k + 1, n)"
    ],
    c: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int x[20];
int call_count = 0; // Required by TSEC exam
int sol_count = 0;

int place(int k, int i) {
    for (int j = 1; j < k; j++) {
        // Column conflict OR diagonal conflict
        if (x[j] == i || abs(x[j] - i) == abs(j - k))
            return 0;
    }
    return 1;
}

void printSolution(int n) {
    sol_count++;
    printf("\\n--- Solution %d ---\\n", sol_count);
    // 1D format (TSEC requirement)
    printf("1D Array Format: [ ");
    for (int i = 1; i <= n; i++) printf("%d ", x[i]);
    printf("]\\n");

    // 2D format (TSEC requirement)
    printf("2D Board Format:\\n");
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (x[i] == j) printf(" Q ");
            else printf(" . ");
        }
        printf("\\n");
    }
}

void nQueen(int k, int n) {
    call_count++; // Track procedure calls
    for (int i = 1; i <= n; i++) {
        if (place(k, i)) {
            x[k] = i;
            if (k == n) printSolution(n);
            else nQueen(k + 1, n);
        }
    }
}

int main() {
    int n = 4; // Try 4 or 8
    printf("Starting N-Queens for N = %d\\n", n);
    nQueen(1, n);
    printf("\\nTotal Solutions Found: %d\\n", sol_count);
    printf("Total Calls to Queen Procedure: %d\\n", call_count);
    return 0;
}`,
    java: `public class NQueensPractical {
    static int[] x = new int[20];
    static int callCount = 0;
    static int solCount = 0;

    static boolean place(int k, int i) {
        for (int j = 1; j < k; j++) {
            if (x[j] == i || Math.abs(x[j] - i) == Math.abs(j - k))
                return false;
        }
        return true;
    }

    static void printSolution(int n) {
        solCount++;
        System.out.println("Solution " + solCount + ":");
        System.out.print("1D Format: [ ");
        for (int i = 1; i <= n; i++) System.out.print(x[i] + " ");
        System.out.println("]");
        System.out.println("2D Format:");
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print(x[i] == j ? " Q " : " . ");
            }
            System.out.println();
        }
    }

    static void nQueen(int k, int n) {
        callCount++; // Required by TSEC exam
        for (int i = 1; i <= n; i++) {
            if (place(k, i)) {
                x[k] = i;
                if (k == n) printSolution(n);
                else nQueen(k + 1, n);
            }
        }
    }

    public static void main(String[] args) {
        int n = 4;
        nQueen(1, n);
        System.out.println("Total calls to queen procedure: " + callCount);
    }
}`
  },

  sumOfSubset: {
    pseudo: [
      "// Sum of Subsets Backtracking with Call Counter",
      "function sumOfSubset(s, k, r):",
      "    call_count++  // Count procedure calls",
      "    // Branch 1: Include w[k]",
      "    x[k] = 1",
      "    if s + w[k] == M then printSolution(x)",
      "    else if s + w[k] + w[k + 1] <= M then:",
      "        sumOfSubset(s + w[k], k + 1, r - w[k])",
      "    // Branch 2: Exclude w[k]",
      "    if (s + r - w[k] >= M) and (s + w[k + 1] <= M) then:",
      "        x[k] = 0",
      "        sumOfSubset(s, k + 1, r - w[k])"
    ],
    c: `#include <stdio.h>

int w[] = {3, 5, 7, 9}; // Must be sorted in ascending order
int x[10];
int M = 12; // Target sum
int n = 4;
int call_count = 0; // Required by TSEC exam
int sol_count = 0;

void printSolution() {
    sol_count++;
    printf("Solution %d: Vector X = [ ", sol_count);
    for (int i = 0; i < n; i++) printf("%d ", x[i]);
    printf("] -> Subset: { ");
    for (int i = 0; i < n; i++) if (x[i]) printf("%d ", w[i]);
    printf("}\\n");
}

void sumOfSubset(int s, int k, int r) {
    call_count++; // Track procedure calls
    // Branch 1: Include element w[k]
    x[k] = 1;
    if (s + w[k] == M) {
        printSolution();
    } else if (k + 1 < n && s + w[k] + w[k + 1] <= M) {
        sumOfSubset(s + w[k], k + 1, r - w[k]);
    }

    // Branch 2: Exclude element w[k]
    if (k + 1 < n && (s + r - w[k] >= M) && (s + w[k + 1] <= M)) {
        x[k] = 0;
        sumOfSubset(s, k + 1, r - w[k]);
    }
}

int main() {
    int total_sum = 0;
    for (int i = 0; i < n; i++) total_sum += w[i];
    printf("Target Sum M = %d\\n", M);
    sumOfSubset(0, 0, total_sum);
    printf("Total Calls to SumOfSubset Procedure: %d\\n", call_count);
    return 0;
}`,
    java: `public class SumOfSubsetPractical {
    static int[] w = {3, 5, 7, 9};
    static int[] x = new int[4];
    static int M = 12, callCount = 0;

    static void sumOfSubset(int s, int k, int r) {
        callCount++; // Required by TSEC exam
        x[k] = 1;
        if (s + w[k] == M) {
            System.out.print("Solution: [ ");
            for (int val : x) System.out.print(val + " ");
            System.out.println("]");
        } else if (k + 1 < w.length && s + w[k] + w[k + 1] <= M) {
            sumOfSubset(s + w[k], k + 1, r - w[k]);
        }
        if (k + 1 < w.length && s + r - w[k] >= M && s + w[k + 1] <= M) {
            x[k] = 0;
            sumOfSubset(s, k + 1, r - w[k]);
        }
    }

    public static void main(String[] args) {
        int total = 0;
        for (int val : w) total += val;
        sumOfSubset(0, 0, total);
        System.out.println("Total calls to SumOfSubset procedure: " + callCount);
    }
}`
  },

  kmp: {
    pseudo: [
      "// KMP String Matching with LPS (pi) Table",
      "computeLPSArray(pattern, m, lps)",
      "i = 0 (text index), j = 0 (pattern index)",
      "while i < n do:",
      "    if pattern[j] == text[i] then i++, j++",
      "    if j == m then:",
      "        print 'Found pattern at index ' + (i - j)",
      "        j = lps[j - 1]",
      "    else if i < n and pattern[j] != text[i] then:",
      "        if j != 0 then j = lps[j - 1] // No i backtracking!",
      "        else i++"
    ],
    c: `#include <stdio.h>
#include <string.h>

void computeLPSArray(char* pat, int m, int lps[]) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void KMPSearch(char* pat, char* txt) {
    int m = strlen(pat);
    int n = strlen(txt);
    int lps[m];
    computeLPSArray(pat, m, lps);

    // Print LPS / Pi Table (TSEC requirement)
    printf("Precomputed LPS (pi) Table:\\n");
    for (int k = 0; k < m; k++) printf("%c ", pat[k]);
    printf("\\n");
    for (int k = 0; k < m; k++) printf("%d ", lps[k]);
    printf("\\n\\nOccurrences of Pattern in Text:\\n");

    int i = 0, j = 0;
    int matchFound = 0;
    while (i < n) {
        if (pat[j] == txt[i]) {
            i++; j++;
        }
        if (j == m) {
            printf("Pattern found at index %d\\n", i - j);
            matchFound = 1;
            j = lps[j - 1];
        } else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1]; // Jump pattern pointer
            else i++;
        }
    }
    if (!matchFound) printf("Pattern not found.\\n");
}

int main() {
    char txt[] = "AABAACAADAABAABA";
    char pat[] = "AABA";
    KMPSearch(pat, txt);
    return 0;
}`,
    java: `public class KMPPractical {
    static void KMPSearch(String pat, String txt) {
        int m = pat.length(), n = txt.length();
        int[] lps = new int[m];
        int len = 0, i = 1;
        while (i < m) {
            if (pat.charAt(i) == pat.charAt(len)) {
                len++; lps[i++] = len;
            } else {
                if (len != 0) len = lps[len - 1];
                else lps[i++] = 0;
            }
        }

        System.out.println("LPS (pi) Table:");
        for (int val : lps) System.out.print(val + " ");
        System.out.println();

        i = 0; int j = 0;
        while (i < n) {
            if (pat.charAt(j) == txt.charAt(i)) { i++; j++; }
            if (j == m) {
                System.out.println("Pattern found at index " + (i - j));
                j = lps[j - 1];
            } else if (i < n && pat.charAt(j) != txt.charAt(i)) {
                if (j != 0) j = lps[j - 1];
                else i++;
            }
        }
    }

    public static void main(String[] args) {
        KMPSearch("AABA", "AABAACAADAABAABA");
    }
}`
  },

  rabinKarp: {
    pseudo: [
      "// Rabin-Karp String Matching with Rolling Hash",
      "p = pattern hash, t = first window text hash",
      "h = (d^(m-1)) mod q",
      "for s = 0 to n - m do:",
      "    if p == t then:  // Hash match! Check characters",
      "        if text[s..s+m-1] == pattern then:",
      "            print 'Pattern found at index ' + s",
      "        else:",
      "            print 'Spurious Hit at index ' + s",
      "    if s < n - m then:",
      "        t = (d * (t - text[s] * h) + text[s + m]) mod q  // Rolling Hash"
    ],
    c: `#include <stdio.h>
#include <string.h>
#define d 10 // Base for digits (or 256 for ASCII)

void rabinKarp(char pat[], char txt[], int q) {
    int m = strlen(pat);
    int n = strlen(txt);
    int p = 0; // hash for pattern
    int t = 0; // hash for text window
    int h = 1;

    // h = pow(d, m-1) % q
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;

    // Calculate initial hash values
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    printf("Pattern Hash: %d\\n\\nRolling Hash Trace:\\n", p);

    for (int s = 0; s <= n - m; s++) {
        printf("Shift %2d: Window Hash = %d", s, t);
        if (p == t) {
            // Check character by character
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (txt[s + j] != pat[j]) { match = 0; break; }
            }
            if (match) printf(" -> *** ACTUAL MATCH AT %d ***\\n", s);
            else printf(" -> [SPURIOUS HIT - Hash Collision]\\n");
        } else {
            printf(" -> No match\\n");
        }

        // Slide window (Rolling Hash calculation)
        if (s < n - m) {
            t = (d * (t - txt[s] * h) + txt[s + m]) % q;
            if (t < 0) t = t + q; // Keep positive
        }
    }
}

int main() {
    char txt[] = "2359023141526739921";
    char pat[] = "31415";
    int q = 13; // Prime number
    rabinKarp(pat, txt, q);
    return 0;
}`,
    java: `public class RabinKarpPractical {
    static final int d = 10;

    static void search(String pat, String txt, int q) {
        int m = pat.length(), n = txt.length();
        int p = 0, t = 0, h = 1;
        for (int i = 0; i < m - 1; i++) h = (h * d) % q;

        for (int i = 0; i < m; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }

        System.out.println("Pattern Hash = " + p);
        for (int s = 0; s <= n - m; s++) {
            if (p == t) {
                int j = 0;
                while (j < m && txt.charAt(s + j) == pat.charAt(j)) j++;
                if (j == m) System.out.println("Pattern found at index " + s);
                else System.out.println("Spurious Hit at index " + s);
            }
            if (s < n - m) {
                t = (d * (t - txt.charAt(s) * h) + txt.charAt(s + m)) % q;
                if (t < 0) t += q;
            }
        }
    }

    public static void main(String[] args) {
        search("31415", "2359023141526739921", 13);
    }
}`
  },

  bfs: {
    pseudo: [
      "// Breadth-First Search (BFS)",
      "initialize color[v] = WHITE, d[v] = INF, pi[v] = NIL for all v",
      "color[s] = GRAY, d[s] = 0, pi[s] = NIL",
      "enqueue(Q, s)",
      "while Q is not empty do:",
      "    u = dequeue(Q)",
      "    for each neighbor v of u do:",
      "        if color[v] == WHITE then:",
      "            color[v] = GRAY",
      "            d[v] = d[u] + 1",
      "            pi[v] = u",
      "            enqueue(Q, v)",
      "    color[u] = BLACK",
      "print traversal order and distance array"
    ],
    c: `#include <stdio.h>
#define MAX 20

int queue[MAX], front = -1, rear = -1;

void enqueue(int v) {
    if (rear == MAX - 1) return;
    if (front == -1) front = 0;
    queue[++rear] = v;
}

int dequeue() {
    if (front == -1 || front > rear) return -1;
    return queue[front++];
}

void bfs(int adj[MAX][MAX], int n, int start) {
    int visited[MAX] = {0};
    int d[MAX];
    for (int i = 0; i < n; i++) d[i] = -1;

    enqueue(start);
    visited[start] = 1;
    d[start] = 0;

    printf("BFS Traversal Order: ");
    while (front <= rear && front != -1) {
        int u = dequeue();
        printf("%d ", u);

        for (int v = 0; v < n; v++) {
            if (adj[u][v] == 1 && !visited[v]) {
                visited[v] = 1;
                d[v] = d[u] + 1;
                enqueue(v);
            }
        }
    }
    printf("\\n\\nDistances from source %d:\\n", start);
    for (int i = 0; i < n; i++) printf("Vertex %d: distance = %d\\n", i, d[i]);
}

int main() {
    int n = 6;
    int adj[MAX][MAX] = {
        {0, 1, 1, 0, 0, 0},
        {1, 0, 0, 1, 1, 0},
        {1, 0, 0, 0, 0, 1},
        {0, 1, 0, 0, 0, 0},
        {0, 1, 0, 0, 0, 1},
        {0, 0, 1, 0, 1, 0}
    };
    bfs(adj, n, 0);
    return 0;
}`,
    java: `import java.util.*;

public class BFSPractical {
    static void bfs(int[][] adj, int start) {
        int n = adj.length;
        boolean[] visited = new boolean[n];
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();

        q.add(start);
        visited[start] = true;
        dist[start] = 0;

        System.out.print("BFS Traversal: ");
        while (!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for (int v = 0; v < n; v++) {
                if (adj[u][v] == 1 && !visited[v]) {
                    visited[v] = true;
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        System.out.println("\\nDistances: " + Arrays.toString(dist));
    }

    public static void main(String[] args) {
        int[][] adj = {
            {0, 1, 1, 0, 0, 0},
            {1, 0, 0, 1, 1, 0},
            {1, 0, 0, 0, 0, 1},
            {0, 1, 0, 0, 0, 0},
            {0, 1, 0, 0, 0, 1},
            {0, 0, 1, 0, 1, 0}
        };
        bfs(adj, 0);
    }
}`
  },

  dfs: {
    pseudo: [
      "// Depth-First Search (DFS) with Timestamps",
      "initialize color[u] = WHITE, pi[u] = NIL for all u; time = 0",
      "function DFS_VISIT(u):",
      "    time = time + 1",
      "    d[u] = time; color[u] = GRAY",
      "    for each neighbor v of u do:",
      "        if color[v] == WHITE then:",
      "            pi[v] = u",
      "            DFS_VISIT(v) // Tree Edge",
      "        else if color[v] == GRAY then: // Back Edge (Cycle!)",
      "    color[u] = BLACK",
      "    time = time + 1; f[u] = time",
      "for each vertex u in V do: if color[u] == WHITE then DFS_VISIT(u)"
    ],
    c: `#include <stdio.h>
#define MAX 20

int visited[MAX];
int d[MAX], f[MAX], time_count = 0;

void dfsVisit(int adj[MAX][MAX], int n, int u) {
    time_count++;
    d[u] = time_count;
    visited[u] = 1;
    printf("%d ", u);

    for (int v = 0; v < n; v++) {
        if (adj[u][v] == 1 && !visited[v]) {
            dfsVisit(adj, n, v);
        }
    }
    time_count++;
    f[u] = time_count;
}

void dfs(int adj[MAX][MAX], int n) {
    for (int i = 0; i < n; i++) visited[i] = 0;
    time_count = 0;
    printf("DFS Traversal Order: ");
    for (int i = 0; i < n; i++) {
        if (!visited[i]) dfsVisit(adj, n, i);
    }
    printf("\\n\\nTimestamps [Discovery / Finish]:\\n");
    for (int i = 0; i < n; i++) {
        printf("Vertex %d: d = %d, f = %d\\n", i, d[i], f[i]);
    }
}

int main() {
    int n = 6;
    int adj[MAX][MAX] = {
        {0, 1, 1, 0, 0, 0},
        {1, 0, 0, 1, 1, 0},
        {1, 0, 0, 0, 0, 1},
        {0, 1, 0, 0, 0, 0},
        {0, 1, 0, 0, 0, 1},
        {0, 0, 1, 0, 1, 0}
    };
    dfs(adj, n);
    return 0;
}`,
    java: `public class DFSPractical {
    static int time = 0;

    static void dfsVisit(int[][] adj, int u, boolean[] visited, int[] d, int[] f) {
        visited[u] = true;
        d[u] = ++time;
        System.out.print(u + " ");
        for (int v = 0; v < adj.length; v++) {
            if (adj[u][v] == 1 && !visited[v]) {
                dfsVisit(adj, v, visited, d, f);
            }
        }
        f[u] = ++time;
    }

    public static void main(String[] args) {
        int[][] adj = {
            {0, 1, 1, 0, 0, 0},
            {1, 0, 0, 1, 1, 0},
            {1, 0, 0, 0, 0, 1},
            {0, 1, 0, 0, 0, 0},
            {0, 1, 0, 0, 0, 1},
            {0, 0, 1, 0, 1, 0}
        };
        int n = adj.length;
        boolean[] visited = new boolean[n];
        int[] d = new int[n], f = new int[n];

        System.out.print("DFS Traversal: ");
        for (int i = 0; i < n; i++) {
            if (!visited[i]) dfsVisit(adj, i, visited, d, f);
        }
        System.out.println();
        for (int i = 0; i < n; i++) {
            System.out.println("Vertex " + i + ": d=" + d[i] + ", f=" + f[i]);
        }
    }
}`
  }
};
