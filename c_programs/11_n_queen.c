#include <stdio.h>
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
    printf("\n--- Solution %d ---\n", sol_count);
    // 1D format (TSEC requirement)
    printf("1D Array Format: [ ");
    for (int i = 1; i <= n; i++) printf("%d ", x[i]);
    printf("]\n");

    // 2D format (TSEC requirement)
    printf("2D Board Format:\n");
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (x[i] == j) printf(" Q ");
            else printf(" . ");
        }
        printf("\n");
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
    printf("Starting N-Queens for N = %d\n", n);
    nQueen(1, n);
    printf("\nTotal Solutions Found: %d\n", sol_count);
    printf("Total Calls to Queen Procedure: %d\n", call_count);
    return 0;
}