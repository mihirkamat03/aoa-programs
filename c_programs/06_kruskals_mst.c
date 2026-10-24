#include <stdio.h>
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

    printf("Edges in MST:\nEdge \tWeight\n");
    for (i = 0; i < e; i++) {
        printf("%d - %d \t%d\n", resultMST[i].src, resultMST[i].dest, resultMST[i].weight);
    }
    printf("Minimum Cost of MST = %d\n", totalCost);
}

int main() {
    int V = 4, E = 5;
    struct Edge edges[] = {
        {0, 1, 10}, {0, 2, 6}, {0, 3, 5},
        {1, 3, 15}, {2, 3, 4}
    };
    kruskalMST(edges, V, E);
    return 0;
}