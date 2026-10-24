#include <stdio.h>

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
    printf("Knapsack DP Matrix:\n");
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) printf("%4d", V[i][w]);
        printf("\n");
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
    printf("\nTotal Profit Earned = %d\n", V[n][W]);
    printf("Solution Vector X = [ ");
    for (int i = 0; i < n; i++) printf("%d ", X[i]);
    printf("]\n");
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50, n = 3;
    knapsack(W, wt, val, n);
    return 0;
}