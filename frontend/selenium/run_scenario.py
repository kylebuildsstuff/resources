# Standard Library
import os
import sys
import argparse
import datetime

# Third-Party Libraries
from dotenv import load_dotenv, find_dotenv
from selenium import webdriver as selenium_webdriver


load_dotenv(find_dotenv())
os.environ.setdefault("DOMAIN_URL", 'https://local-smartcov.oss.csgwebapps.com')
os.environ.setdefault("LOGIN_PASSWORD", "Password1")
os.environ.setdefault("SIGNUP_POSTAL_CODE", "A1A1A1")


if __name__ == '__main__':
    if sys.argv:
        parser = argparse.ArgumentParser(description='Process some arguments.')
        parser.add_argument('scenario', type=str, help='A scenario to run  (e.g. add_vehicle)')
        parser.add_argument('--user_email', type=str, required=False, help='A custom user email')
        parser.add_argument('--password', type=str, required=False, help='A custom user password')
        parser.add_argument('--postal_code', type=str, required=False, help='A custom user postal code')
        parser.add_argument('--timeout', type=str, required=False, default='5', help='Set the default timeout when waiting for elements to appear')
        parser.add_argument('--domain_url', type=str, required=False, help="Overwrite the default local domain url")
        parsed_args = parser.parse_args()

        os.environ.__setitem__("SIGNUP_POSTAL_CODE", parsed_args.postal_code) if parsed_args.postal_code else None
        os.environ.__setitem__("LOGIN_USER_EMAIL", parsed_args.user_email) if parsed_args.user_email else None
        os.environ.__setitem__("LOGIN_PASSWORD", parsed_args.password) if parsed_args.password else None
        os.environ.__setitem__("DOMAIN_URL", parsed_args.domain_url) if parsed_args.domain_url else None
        os.environ.__setitem__("TIMEOUT", parsed_args.timeout) if parsed_args.timeout else '10'

        module = __import__('scenarios.{}'.format(sys.argv[1]), globals(), locals(), ['main'])
        if module and module.main:
            webdriver = selenium_webdriver.Chrome() if os.name == 'posix' else selenium_webdriver.Chrome('C:\Selenium\chromedriver.exe')
            webdriver.set_window_size(960, 1000)
            module.main(webdriver)
        else:
            print('Pass in a scenario')
