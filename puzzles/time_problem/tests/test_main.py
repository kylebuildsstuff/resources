import unittest

from main import return_answer


class TestSolution(unittest.TestCase):

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_subtract_one_time_range_from_another_time_range_lower_bound(self):
        a_time_ranges = [['9:00', '10:00']]
        b_time_ranges = [['9:30', '11:00']]
        expected = [['9:00', '9:30']]
        actual = return_answer(a_time_ranges, b_time_ranges)
        self.assertEqual(actual, expected)

    def test_subtract_one_time_range_from_another_time_range_upper_bound(self):
        a_time_ranges = [['9:00', '10:00']]
        b_time_ranges = [['9:00', '9:30']]
        expected = [['9:30', '10:00']]
        actual = return_answer(a_time_ranges, b_time_ranges)
        self.assertEqual(actual, expected)

    def test_subtract_one_time_range_from_another_time_range_inner_bound(self):
        a_time_ranges = [['9:00', '10:00']]
        b_time_ranges = [['9:15', '9:30']]
        expected = [['9:00', '9:15'], ['9:30', '10:00']]
        actual = return_answer(a_time_ranges, b_time_ranges)
        self.assertEqual(actual, expected)

    def test_subtract_one_time_range_from_multiple_time_ranges(self):
        a_time_ranges = [['9:00', '9:30'], ['10:00', '10:30']]
        b_time_ranges = [['9:15', '10:15']]
        expected = [['9:00', '9:15'], ['10:15', '10:30']]
        actual = return_answer(a_time_ranges, b_time_ranges)
        self.assertEqual(actual, expected)

    def test_subtract_multiple_time_ranges_from_multiple_time_ranges(self):
        a_time_ranges = [['9:00', '11:00'], ['13:00', '15:00']]
        b_time_ranges = [['9:00', '9:15'], ['10:00', '10:15'], ['12:30', '16:00']]
        expected = [['9:15', '10:00'], ['10:15', '11:00']]
        actual = return_answer(a_time_ranges, b_time_ranges)
        self.assertEqual(actual, expected)
