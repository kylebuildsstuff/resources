# Given two array A and B, print intersection (or common elements) of the two array.  If no element is common in two array, then print Zero.
#
# Input:
#
# The first line of input contains an integer T denoting the number of test cases.
# The first line of each test case is N and M,N is the size of array A and M is size of array B.
# The second line of each test case contains N input A[i].
# The third line of each test case contains M input B[i].
#
# Output:
#
# Print the intersecting elements.If no element is common in two array, then print "Zero" without quotes.
#
# Constraints:
#
# 1 ≤ T ≤ 50
# 1 ≤ N, M ≤ 100
# 1 ≤ A[i], B[i] ≤ 1000
#
# Example:
#
# Input:
# 2

# 5 3

# 89 24 75 11 23
# 89 2 4

# 6 5

# 1 2 3 4 5 6
# 3 4 5 6 7
#
# Output:
# 89
# 3 4 5 6
#
# **For More Examples Use Expected Output**
#


def solution(list_a, list_b):
    if list_a and list_b:
        intersections = [number for number in list_a if number in list_b]
        return intersections
    return "Zero"


# list_a = [89, 24, 75, 11, 23]
# list_b = [89, 2, 4]
list_a = [1, 2, 3, 4, 5, 6]
list_b = [3, 4, 5, 6, 7]

print(solution(list_a, list_b))
