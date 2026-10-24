#include <stdio.h>
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
    printf("\n\nDistances from source %d:\n", start);
    for (int i = 0; i < n; i++) printf("Vertex %d: distance = %d\n", i, d[i]);
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
}