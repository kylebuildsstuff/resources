import unittest
from tests.test_main import TestSolution


loader = unittest.TestLoader()

if __name__ == '__main__':
    start_dir = '.'
    pattern = 'test*.py'
    test_suite = loader.discover(start_dir, pattern)
    unittest.TextTestRunner().run(test_suite)
