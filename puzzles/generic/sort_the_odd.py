# You have an array of numbers.
# Your task is to sort ascending odd numbers but even numbers must be on their places.
#
# Zero isn't an odd number and you don't need to move it. If you have an empty array, you need to return it.
#
# Example
#
# sortArray([5, 3, 2, 8, 1, 4]) == [1, 3, 2, 8, 5, 4]


def sort_array(source_array):
    # Parse through list, and save the indexes of the odd number
    # append the odd numbers to another list, sort it
    # append back the sorted odd numbers using the odd_indexes
    # solution is very rough...
    if source_array:
        odd_indexes = [index for index in range(len(source_array)) if source_array[index] % 2 != 0]
        odd_list = []
        for i in range(len(source_array)):
            if source_array[i] % 2 != 0:
                odd_list.append(source_array[i])
        odd_list.sort()

        for oddy_index in range(len(odd_indexes)):
            source_array[odd_indexes[oddy_index]] = odd_list[oddy_index]


    return source_array
