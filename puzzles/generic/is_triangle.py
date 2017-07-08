# Implement a method that accepts 3 integer values a, b, c. The method should return true if a triangle can be built with the sides of given length and false in any other case.
#
# (In this case, all triangles must have surface greater than 0 to be accepted).


def is_triangle(a, b, c):
    # The sum of the lengths of any two sides of a triangle is greater than
    # the length of the third side. If you take the three sides of a triangle and add them in pairs,
    # the sum is greater than (not equal to) the third side. If that is not true,
    # then it is not possible to construct a triangle with the given side lengths.
    if not a + b > c:
        return False
    if not a + c > b:
        return False
    if not b + c > a:
        return False
    return True
