# Write a function that accepts a string, and determines if the string is a palindrome. A palindrome is a word which is the same both forwards and backwards. Examples: “ABBA”, “mom”, “deleveled”


def palindrome(s):
    if s and s == s[::-1]:
        return True
    return False

print(palindrome('mom'))
