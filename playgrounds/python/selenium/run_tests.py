# Standard Libraries
import os
import sys
import argparse
import datetime
import unittest

# Third-Party Libraries
from dotenv import load_dotenv, find_dotenv

# Custom Modules
from tests.test_login_form import TestLoginForm


load_dotenv(find_dotenv())
os.environ.setdefault("DOMAIN_URL", 'https://local-smartcov.oss.csgwebapps.com')
os.environ.setdefault("LOGIN_PASSWORD", 'Password1')
os.environ.setdefault("SCREENSHOTS", 'False')
loader = unittest.TestLoader()

if __name__ == '__main__':
    start_dir = '.'
    pattern = 'test*.py'
    # e.g.: python run_test_suite test_vehicle_add_form.py
    if sys.argv:
        parser = argparse.ArgumentParser(description='Process some arguments.')
        parser.add_argument('--filename', type=str, required=False, help='A test file to run (e.g. test_vehicle_add_form.py)')
        parser.add_argument('--domain_url', type=str, required=False, help="Overwrite the default local domain url")
        parser.add_argument('--user_email', type=str, required=False, help='A user_email to override the one in .env, e.g.: csgwebapps.qa+205@gmail.com')
        parser.add_argument('--password', type=str, required=False, help='a password to override the one in .env')
        parser.add_argument('--postal_code', type=str, required=False, help='a postal_code to override the one in .env, e.g.: L3S4H1')
        parser.add_argument('--screenshots', type=str, required=False, help='Enable screenshots by setting to True (default=False)')

        parsed_args = parser.parse_args()

        os.environ.__setitem__("DOMAIN_URL", parsed_args.domain_url) if parsed_args.domain_url else None
        os.environ.__setitem__("LOGIN_USER_EMAIL", parsed_args.user_email) if parsed_args.user_email else None
        os.environ.__setitem__("LOGIN_PASSWORD", parsed_args.password) if parsed_args.password else None
        os.environ.__setitem__("SIGNUP_POSTAL_CODE", parsed_args.postal_code) if parsed_args.postal_code else None
        os.environ.__setitem__("SCREENSHOTS", parsed_args.postal_code) if parsed_args.postal_code else None
        pattern = parsed_args.filename if parsed_args.filename else pattern

    test_suite = loader.discover(start_dir, pattern)
    unittest.TextTestRunner().run(test_suite)
