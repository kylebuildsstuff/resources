import os
import unittest

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# Custom modules
from tests.base_classes import TestCaseSetup


class TestSignupForm(TestCaseSetup):

    def setUp(self):
        super().setUp()
        self.webdriver.get('{0}/signup'.format(os.environ.get('DOMAIN_URL', 'DOMAIN_URL_NOT_FOUND')))
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'email'))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')

    def tearDown(self):
        self.webdriver.close()

    @unittest.skip('Skipping until user delete is added because a user can only be signed up once.')
    def test_successful_signup(self):
        self.webdriver.save_screenshot('screenshots/signup_form/{0}-{1}.png'.format(datetime.datetime.now(), 'start')) if self.screenshots else False
        if not self.signup_postal_code:
            raise Exception('No postal code found to signup with')

        email_field = self.webdriver.find_element_by_name('email')
        email_field.send_keys(self.user_email)
        postal_code_field = self.webdriver.find_element_by_name('postal_code')
        postal_code_field.send_keys(self.signup_postal_code)
        password1_field = self.webdriver.find_element_by_name('password1')
        password1_field.send_keys(self.user_password)
        password2_field = self.webdriver.find_element_by_name('password2')
        password2_field.send_keys(self.user_password)
        self.webdriver.save_screenshot('screenshots/signup_form/{0}-{1}.png'.format(datetime.datetime.now(), 'filled_out')) if self.screenshots else False
        submit = self.webdriver.find_element_by_class_name('Submit').click()

        try:
            element = WebDriverWait(self.webdriver, 3).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Authed'))
            )
            self.assertTrue(element)
            self.webdriver.save_screenshot('screenshots/signup_form/{0}-{1}.png'.format(datetime.datetime.now(), 'end')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Signup Timed out: ', error)
