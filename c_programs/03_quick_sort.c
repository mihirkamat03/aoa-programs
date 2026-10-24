#include <stdio.h>

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
    printf("\nTotal calls to QuickSort procedure: %d\n", call_count);
    return 0;
}