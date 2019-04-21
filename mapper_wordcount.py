#!/usr/bin/env python
"""mapper.py"""

import sys
import string
import re
import itertools
import nltk
from nltk.stem import WordNetLemmatizer

# input comes from STDIN (standard input)
for line in sys.stdin:
    # remove leading and trailing whitespace
    line = line.strip().lower().decode('unicode_escape').encode('ascii', 'ignore')

    punct_chars = re.compile('[%s]' % re.escape(
        string.punctuation))
    num_chars = re.compile('[\d]+')

    twitter_usernames = re.compile('^@?(\w){1,15}$')

    hashtags = re.compile('^#[A-Za-z0-9\-\.\_]+')

    line = hashtags.sub(" ", line)
    line = twitter_usernames.sub(" ", line)
    line = punct_chars.sub(" ", line)
    line = num_chars.sub("", line)
    words = line.split()
    filter_stop_words = [
        w for w in words if not w in nltk.corpus.stopwords.words('english')]

    words = [WordNetLemmatizer().lemmatize(word)
             for word in filter_stop_words]

    # increase counters
    for word in words:
        # write the results to STDOUT (standard output);
        # what we output here will be the input for the
        # Reduce step, i.e. the input for reducer.py
        #
        # tab-delimited; the trivial word count is 1
        print('%s\t%s' % (word, 1))
