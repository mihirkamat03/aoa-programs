#include <stdio.h>

int call_count = 0; // Required by TSEC practical

void merge(int a[], int low, int mid, int high) {
    int h = low, i = low, j = mid + 1, k;
    int b[100]; // Auxiliary array b[] from notes

    while (h <= mid && j <= high) {
        if (a[h] <= a[j]) b[i++] = a[h++];
        else b[i++] = a[j++];
    }
    if (h > mid) {
        for (k = j; k <= high; k++) b[i++] = a[k];
    } else {
        for (k = h; k <= mid; k++) b[i++] = a[k];
    }
    for (k = low; k <= high; k++) {
        a[k] = b[k];
    }
}

void mergeSort(int a[], int low, int high) {
    call_count++; // Track calls
    if (low < high) {
        int mid = (low + high) / 2;
        mergeSort(a, low, mid);
        mergeSort(a, mid + 1, high);
        merge(a, low, mid, high);
    }
}

int main() {
    int a[] = {38, 27, 43, 3, 9, 82, 10};
    int n = sizeof(a) / sizeof(a[0]);
    mergeSort(a, 0, n - 1);
    printf("Sorted Array: ");
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\nTotal calls to MergeSort procedure: %d\n", call_count);
    return 0;
}