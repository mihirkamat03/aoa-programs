#include <stdio.h>
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
    printf("]\n");

    printf("Final Pi Vector: [ ");
    for (int i = 0; i < V; i++) printf("%d ", Pi[i]);
    printf("]\n\nPaths from Source %d:\n", src);

    for (int i = 0; i < V; i++) {
        printf("To vertex %d (Dist: %d): Path: ", i, D[i]);
        printPath(Pi, i);
        printf("\n");
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
}