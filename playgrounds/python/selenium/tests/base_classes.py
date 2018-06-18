# Standard Library
import os
import unittest
import datetime

# Third-Party Libraries
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


class TestCaseSetup(unittest.TestCase):
    # Set properties on class from environment variables
    def setUp(self):
        self.timeout = 20
        self.webdriver = webdriver.Chrome() if os.name == 'posix' else webdriver.Chrome('C:\Selenium\chromedriver.exe')
        self.webdriver.get('{0}/login'.format(os.environ.get('DOMAIN_URL', 'DOMAIN_URL_NOT_FOUND')))
        self.user_email = os.environ.get("LOGIN_USER_EMAIL", "USER_EMAIL_NOT_FOUND")
        self.user_password = os.environ.get("LOGIN_PASSWORD", "LOGIN_PASSWORD_NOT_FOUND")
        self.signup_postal_code = os.environ.get("SIGNUP_POSTAL_CODE", False)
        self.screenshots = os.environ.get("SCREENSHOTS", False)
        if self.screenshots in ['False', 'No', 'None', 'no', 'none', 'false']:
            self.screenshots = False

    def fill_form(self):
        pass


class FormLogin(TestCaseSetup):
    # Login
    def setUp(self):
        super().setUp()
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'email'))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')
        email_field = self.webdriver.find_element_by_name('email')
        email_field.send_keys(self.user_email)
        password_field = self.webdriver.find_element_by_name('password')
        password_field.send_keys(self.user_password)
        submit = self.webdriver.find_element_by_class_name('Submit').click()
        try:
            element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Authed'))
            )
            self.assertTrue(element)
        except TimeoutException as error:
            raise Exception('Login Timed out: ', error)
