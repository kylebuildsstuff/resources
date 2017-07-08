# Welcome. In this kata you are required to, given a string, replace every letter with its position in the alphabet. If anything in the text isn't a letter, ignore it and don't return it. a being 1, b being 2, etc. As an example:
#
# alphabet_position("The sunset sets at twelve o' clock.")
# Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" (As a string.)


def alphabet_position(text):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    alphabet_index = {alphabet[index]: index + 1 for index in range(len(alphabet))}
    running_answer = []
    if text and isinstance(text, str):
        for letter in text:
            if letter.lower() in alphabet_index:
                running_answer.append('{}'.format(alphabet_index[letter.lower()]))
    return ' '.join(running_answer)
