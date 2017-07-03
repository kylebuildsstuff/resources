import datetime
from dateutil.parser import parse

"""
Write a program that will subtract one list of time ranges from another. Formally: for two lists of time ranges A and B, a time is in (A-B) if and only if it is part of A and not part of B.
A time range has a start time and an end time. You can define times and time ranges however you want (Unix timestamps, date/time objects in your preferred language, the actual string “start-end”, etc).
Your solution shouldn’t rely on the granularity of the timestamps (so don’t, for example, iterate over all the times in all the ranges and check to see if that time is “in”).

(9:00-10:00) “minus” (9:00-9:30) = (9:30-10:00)
(9:00-10:00) “minus” (9:00-10:00) = ()
(9:00-9:30) “minus” (9:30-15:00) = (9:00-9:30)
(9:00-9:30, 10:00-10:30) “minus” (9:15-10:15) = (9:00-9:15, 10:15-10:30)
(9:00-11:00, 13:00-15:00) “minus” (9:00-9:15, 10:00-10:15, 12:30-16:00) = (9:15-10:00, 10:15-11:00)
"""


def format_string(number):
    # Because datetime.datetime.minutes can return '0' when we want '00' to display '9:00'
    if int(number) < 10:
        return '0{}'.format(number)
    return '{}'.format(number)


def return_lower_time_bounds(a_start, b_start):
    if a_start and b_start:
        min_range = a_start
        max_range = a_start + (b_start - a_start)

        return [
            '{0}:{1}'.format(min_range.hour, format_string(min_range.minute)),
            '{0}:{1}'.format(max_range.hour, format_string(max_range.minute))
        ]
    return False


def return_upper_time_bounds(a_end, b_end):
    if a_end and b_end:
        min_range = b_end
        max_range = b_end + (a_end - b_end)

        return [
            '{0}:{1}'.format(min_range.hour, format_string(min_range.minute)),
            '{0}:{1}'.format(max_range.hour, format_string(max_range.minute))
        ]
    return False


def calculate_time_range(b_time_range, transient_time_ranges, a_start=None, a_end=None):
    copied_list = list(transient_time_ranges)
    if copied_list:
        # parse returns datetime.datetime objects
        a_start = parse(copied_list[0][0])
        a_end = parse(copied_list[0][1])
    b_start = parse(b_time_range[0])
    b_end = parse(b_time_range[1])
    copied_list.clear()

    if b_end < a_start or b_start > a_end:
        pass
    else:
        if b_start > a_start:
            copied_list.append(return_lower_time_bounds(a_start, b_start))
        if b_end < a_end:
            copied_list.append(return_upper_time_bounds(a_end, b_end))
    return copied_list


def return_answer(a_time_ranges, b_time_ranges):
    time_ranges_answer = []
    if a_time_ranges and b_time_ranges:
        for a_time_range in a_time_ranges:
            a_start = parse(a_time_range[0])
            a_end = parse(a_time_range[1])
            transient_time_ranges = []  # used to hold possible answers while looping through b_time_ranges
            for b_time_range in b_time_ranges:
                new_time_range = calculate_time_range(b_time_range, transient_time_ranges, a_start, a_end)
                transient_time_ranges = new_time_range if new_time_range else transient_time_ranges

            for time_range in transient_time_ranges:
                time_ranges_answer.append(time_range)

    return time_ranges_answer

# a_time_ranges = [['9:00', '10:00']]
# b_time_ranges = [['9:00', '9:30']]

# a_time_ranges = [['9:00', '10:00']]
# b_time_ranges = [['9:00', '10:00']]

# a_time_ranges = [['9:00', '9:30']]
# b_time_ranges = [['9:30', '15:00']]

# a_time_ranges = [['9:00', '9:30'], ['10:00', '10:30']]
# b_time_ranges = [['9:15', '10:15']]

# a_time_ranges = [['9:00', '11:00']]
# b_time_ranges = [['9:00', '9:15'], ['10:00', '10:15'], ['12:30', '16:00']]

# a_time_ranges = [['13:00', '15:00']]
# b_time_ranges = [['9:00', '9:15'], ['10:00', '10:15'], ['12:30', '16:00']]

a_time_ranges = [['9:00', '11:00'], ['13:00', '15:00']]
b_time_ranges = [['9:00', '9:15'], ['10:00', '10:15'], ['12:30', '16:00']]

if __name__ == "__main__":
    answer = return_answer(a_time_ranges, b_time_ranges)
    print(answer)
