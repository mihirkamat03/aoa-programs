#include <stdio.h>
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
    printf("Final D Matrix:\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (D[i][j] == INF) printf("%7s", "INF");
            else printf("%7d", D[i][j]);
        }
        printf("\n");
    }

    printf("\nFinal Pi Matrix:\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) printf("%4d", Pi[i][j]);
        printf("\n");
    }

    printf("\nPaths between all pairs:\n");
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (i != j && D[i][j] != INF) {
                printf("%d to %d (dist %d): ", i, j, D[i][j]);
                printPath(Pi, i, j);
                printf("\n");
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
}