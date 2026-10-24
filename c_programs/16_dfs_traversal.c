#include <stdio.h>
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
    printf("\n\nTimestamps [Discovery / Finish]:\n");
    for (int i = 0; i < n; i++) {
        printf("Vertex %d: d = %d, f = %d\n", i, d[i], f[i]);
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
}