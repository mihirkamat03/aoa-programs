#include <stdio.h>

void printPass(int a[], int n, int pass) {
    printf("Pass %d: ", pass);
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\n");
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
}