#include <stdio.h>

void printPass(int a[], int n, int pass) {
    printf("Pass %d: ", pass);
    for (int k = 0; k < n; k++) printf("%d ", a[k]);
    printf("\n");
}

void insertionSort(int a[], int n) {
    int i, j, key;
    for (j = 1; j < n; j++) {
        key = a[j];
        i = j - 1;
        while (i >= 0 && a[i] > key) {
            a[i + 1] = a[i];
            i = i - 1;
        }
        a[i + 1] = key;
        printPass(a, n, j); // Required by TSEC exam
    }
}

int main() {
    int a[] = {25, 17, 31, 13, 2, 45, 9};
    int n = sizeof(a) / sizeof(a[0]);
    printf("Initial Array: ");
    printPass(a, n, 0);
    insertionSort(a, n);
    return 0;
}