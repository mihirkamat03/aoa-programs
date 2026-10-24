#include <stdio.h>
#include <string.h>
#define d 10 // Base for digits (or 256 for ASCII)

void rabinKarp(char pat[], char txt[], int q) {
    int m = strlen(pat);
    int n = strlen(txt);
    int p = 0; // hash for pattern
    int t = 0; // hash for text window
    int h = 1;

    // h = pow(d, m-1) % q
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;

    // Calculate initial hash values
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }

    printf("Pattern Hash: %d\n\nRolling Hash Trace:\n", p);

    for (int s = 0; s <= n - m; s++) {
        printf("Shift %2d: Window Hash = %d", s, t);
        if (p == t) {
            // Check character by character
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (txt[s + j] != pat[j]) { match = 0; break; }
            }
            if (match) printf(" -> *** ACTUAL MATCH AT %d ***\n", s);
            else printf(" -> [SPURIOUS HIT - Hash Collision]\n");
        } else {
            printf(" -> No match\n");
        }

        // Slide window (Rolling Hash calculation)
        if (s < n - m) {
            t = (d * (t - txt[s] * h) + txt[s + m]) % q;
            if (t < 0) t = t + q; // Keep positive
        }
    }
}

int main() {
    char txt[] = "2359023141526739921";
    char pat[] = "31415";
    int q = 13; // Prime number
    rabinKarp(pat, txt, q);
    return 0;
}