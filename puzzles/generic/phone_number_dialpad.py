# Print all possible words from phone digits
# Before advent of QWERTY keyboards, texts and numbers were placed on the same key. For example 2 has “ABC” if we wanted to write anything starting with ‘A’ we need to type key 2 once. If we wanted to type ‘B’, press key 2 twice and thrice for typing ‘C’. below is picture of such keypad.
#
# phoneKeyboard
#
# Given a keypad as shown in diagram, and a n digit number, list all words which are possible by pressing these numbers.
# For example if input number is 234, possible words which can be formed are (Alphabetical order):
# adg adh adi aeg aeh aei afg afh afi bdg bdh bdi beg beh bei bfg bfh bfi cdg cdh cdi ceg ceh cei cfg cfh cfi


def solution(n):
    if n:
        dialpad_map = {
            2: ['a', 'b', 'c'],
            3: ['d', 'e', 'f'],
            4: ['g', 'h', 'i'],
            5: ['j', 'k', 'l'],
            6: ['m', 'n', 'o'],
            7: ['p', 'q', 'r', 's'],
            8: ['t', 'u', 'v'],
            9: ['w', 'x', 'y', 'z'],
        }
        inputs = list(str(n))
        combinations = []
        for i in inputs:

    return


print(solution(234))


hashTable = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]


def printWordsUtil(numbers, curr_digit, output, n):
    if curr_digit == n:
        print output
        return

    for el in hashTable[numbers[curr_digit]]:
        printWordsUtil(numbers, curr_digit+1, output+el, n)
        if numbers[curr_digit] in (0, 1):
            return


def printWords(numbers):

    result = ""
    printWordsUtil(numbers, 0, result, len(numbers))


printWords([2, 3, 4])
