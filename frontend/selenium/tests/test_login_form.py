# Standard Library
import os
import unittest
import datetime

# Third-Party Libraries
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# Custom modules
from tests.base_classes import TestCaseSetup


class TestLoginForm(TestCaseSetup):

    def setUp(self):
        super().setUp()
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'email'))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')

    def tearDown(self):
        self.webdriver.close()

    def test_successful_user_login(self):
        self.webdriver.save_screenshot('screenshots/login_form/{0}-{1}.png'.format(datetime.datetime.now(), 'start')) if self.screenshots else False
        email_field = self.webdriver.find_element_by_name('email')
        email_field.send_keys(self.user_email)
        password_field = self.webdriver.find_element_by_name('password')
        password_field.send_keys(self.user_password)
        self.webdriver.save_screenshot('screenshots/login_form/{0}-{1}.png'.format(datetime.datetime.now(), 'middle')) if self.screenshots else False
        submit = self.webdriver.find_element_by_class_name('Submit').click()
        try:
            element = WebDriverWait(self.webdriver, 3).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Authed'))
            )
            self.assertTrue(element)
            self.webdriver.save_screenshot('screenshots/login_form/{0}-{1}.png'.format(datetime.datetime.now(), 'end')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Login Timed out: ', error)

    def test_unsuccessful_user_login(self):
        email_field = self.webdriver.find_element_by_name('email')
        email_field.send_keys(self.user_email)
        password_field = self.webdriver.find_element_by_name('password')
        password_field.send_keys('WRONG_PASSWORD')
        submit = self.webdriver.find_element_by_class_name('Submit').click()
        try:
            element = WebDriverWait(self.webdriver, 3).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'form-errors'))
            )
            self.assertTrue(element)
        except TimeoutException as error:
            raise Exception('Login Timed out: ', error)
