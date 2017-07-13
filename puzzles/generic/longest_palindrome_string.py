# Given a string S, find the longest palindromic substring in S.
#
# Substring of string S:
#
# S[ i . . . . j ] where 0 ≤ i ≤ j < len(S)
#
# Palindrome string:
#
# A string which reads the same backwards. More formally, S is palindrome if reverse(S) = S.
#
# Incase of conflict, return the substring which occurs first ( with the least starting index ).
#
# Input:
#
# The first line of input consists number of the test cases. The following T lines consist of a string each.
#
#
# Output:
#
# In each separate line print the longest palindrome of the string given in the respective test case.
#
#
# Constraints:
#
# 1 ≤T≤ 70
# 1 ≤ str≤ 100
#
#
# Example:
#
# Input:
#
# 1
# aaaabbaa
#
# Output:
#
# aabbaa
#
# **For More Examples Use Expected Output**


def solution(s):
    if s:
        longest_palindrome = ''
        for index in range(len(s)):
            forward_string = s[index:]
            reversed_string = s[index:][::-1]
            longest_palindrome = forward_string if forward_string == reversed_string and len(forward_string) > len(longest_palindrome) else longest_palindrome
    return longest_palindrome


print(solution('aaaabbaa'))
