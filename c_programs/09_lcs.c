#include <stdio.h>
#include <string.h>

void lcs(char* X, char* Y) {
    int m = strlen(X), n = strlen(Y);
    int L[m + 1][n + 1];
    char B[m + 1][n + 1]; // 'D' (diag), 'U' (up), 'L' (left)

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) { L[i][j] = 0; B[i][j] = ' '; }
            else if (X[i - 1] == Y[j - 1]) {
                L[i][j] = L[i - 1][j - 1] + 1;
                B[i][j] = '\\'; // Diagonal
            } else if (L[i - 1][j] >= L[i][j - 1]) {
                L[i][j] = L[i - 1][j];
                B[i][j] = '^';  // Up
            } else {
                L[i][j] = L[i][j - 1];
                B[i][j] = '<';  // Left
            }
        }
    }

    // Print Matrix along with arrows (TSEC requirement)
    printf("LCS Matrix with Arrows:\n   ");
    for (int j = 0; j < n; j++) printf("   %c", Y[j]);
    printf("\n");
    for (int i = 0; i <= m; i++) {
        if (i > 0) printf("%c: ", X[i - 1]);
        else printf(" : ");
        for (int j = 0; j <= n; j++) {
            printf("%d%c ", L[i][j], B[i][j]);
        }
        printf("\n");
    }

    // Reconstruct LCS string
    int idx = L[m][n];
    char lcsStr[idx + 1];
    lcsStr[idx] = '\0';
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (B[i][j] == '\\') {
            lcsStr[idx - 1] = X[i - 1];
            i--; j--; idx--;
        } else if (B[i][j] == '^') i--;
        else j--;
    }

    printf("\nLength of LCS = %d\n", L[m][n]);
    printf("Characters in LCS = %s\n", lcsStr);
}

int main() {
    char X[] = "LONGEST";
    char Y[] = "STONE";
    lcs(X, Y);
    return 0;
}