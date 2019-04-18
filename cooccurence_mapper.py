#!/usr/bin/env python
"""mapper.py"""

import sys
from fingerprint import FingerPrint

f = FingerPrint()
# input comes from STDIN (standard input)
for line in sys.stdin:

    # TODO: Top 100 words and search ?

    # remove leading and trailing whitespace
    line = line.strip().decode('unicode_escape').encode('ascii', 'ignore')
    line = f.fingerprint(line)
    # split the line into words
    words = line.split()
    # increase counters
    i = 0

    unique_keys = set()
    for i in range(len(words)):
        for j in range(len(words)):
            if i != j:
                key = tuple(sorted([words[i], words[j]]))
                if key not in unique_keys:
                    unique_keys.add(key)
                    print('%s\t%s' % ("-".join(key), 1))
