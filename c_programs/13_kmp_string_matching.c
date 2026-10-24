#include <stdio.h>
#include <string.h>

void computeLPSArray(char* pat, int m, int lps[]) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void KMPSearch(char* pat, char* txt) {
    int m = strlen(pat);
    int n = strlen(txt);
    int lps[m];
    computeLPSArray(pat, m, lps);

    // Print LPS / Pi Table (TSEC requirement)
    printf("Precomputed LPS (pi) Table:\n");
    for (int k = 0; k < m; k++) printf("%c ", pat[k]);
    printf("\n");
    for (int k = 0; k < m; k++) printf("%d ", lps[k]);
    printf("\n\nOccurrences of Pattern in Text:\n");

    int i = 0, j = 0;
    int matchFound = 0;
    while (i < n) {
        if (pat[j] == txt[i]) {
            i++; j++;
        }
        if (j == m) {
            printf("Pattern found at index %d\n", i - j);
            matchFound = 1;
            j = lps[j - 1];
        } else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1]; // Jump pattern pointer
            else i++;
        }
    }
    if (!matchFound) printf("Pattern not found.\n");
}

int main() {
    char txt[] = "AABAACAADAABAABA";
    char pat[] = "AABA";
    KMPSearch(pat, txt);
    return 0;
}