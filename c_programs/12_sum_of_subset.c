#include <stdio.h>

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
    printf("}\n");
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
    printf("Target Sum M = %d\n", M);
    sumOfSubset(0, 0, total_sum);
    printf("Total Calls to SumOfSubset Procedure: %d\n", call_count);
    return 0;
}