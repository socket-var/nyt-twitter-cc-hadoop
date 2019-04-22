#!/usr/bin/env python
"""mapper.py"""

import sys
import string
import re
import itertools
import nltk
from nltk.stem import WordNetLemmatizer
from io import open

keywords = []

# top words file name - edit here
with open("./output/top_words/word_count/nyt/nyt_nfl.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip().split("\t")[0]
        keywords.append(line)

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
    i = 0
    for i in range(len(keywords)):
        # if top word is in paragraph
        if keywords[i] in words:
            # for each word in the paragraph
            for j in range(len(words)):
                print(j)
                # except the same word as top word
                if keywords[i] != words[j]:
                    key = tuple(sorted([keywords[i], words[j]]))
                    print('%s\t%s' % ("-".join(key), 1))
