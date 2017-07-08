# Move the first letter of each word to the end of it, then add 'ay' to the end of the word.
#
# pig_it('Pig latin is cool') # igPay atinlay siay oolcay


def pig_it(text):
    if text and isinstance(text, str):
        split_text = text.split(' ')
        answer_list = []
        for word in split_text:
            temp_list = list(word)
            temp_list.append(temp_list.pop(0))
            if word not in '!@#$%^&*()-_=+?':
                temp_list.append('a')
                temp_list.append('y')
            answer_list.append(''.join(temp_list))

        return ' '.join(answer_list)
