# You might know some pretty large perfect squares. But what about the NEXT one?
#
# Complete the findNextSquare method that finds the next integral perfect square after the one passed as a parameter. Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.
#
# If the parameter is itself not a perfect square, than -1 should be returned. You may assume the parameter is positive.
#
# Examples:
#
# findNextSquare(121) --> returns 144
# findNextSquare(625) --> returns 676
# findNextSquare(114) --> returns -1 since 114 is not a perfect

def find_next_square(sq):
    if sq and sq == int(sq ** 0.5) ** 2:
        the_one = sq
        while True:
            the_one += 1
            if the_one == int(the_one ** 0.5) ** 2:
                return the_one
    return -1
