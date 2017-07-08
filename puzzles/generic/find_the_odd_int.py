# Given an array, find the int that appears an odd number of times.
#
# There will always be only one integer that appears an odd number of times.

from collections import Counter


def find_it(seq):
    counted = Counter(seq)
    for i in counted:
        if counted[i] % 2 != 0:
            return i
