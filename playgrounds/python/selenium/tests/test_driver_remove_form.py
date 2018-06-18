# Standard Library
import os
import unittest
import datetime

# Third-Party Libraries
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# Custom modules
from tests.base_classes import FormLogin


class TestDriverRemoveForm(FormLogin):

    def setUp(self):
        super().setUp()

    def tearDown(self):
        self.webdriver.close()

    def fill_form(self):
        # Fills out the form with the most basic answers right up to the point before submitting
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Date of birth:')]"))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')

        self.webdriver.save_screenshot('screenshots/driver_remove_form/{0}-{1}.png'.format(datetime.datetime.now(), 'start')) if self.screenshots else False
        multi_driver_check = self.webdriver.find_elements_by_xpath("//*[contains(text(), 'Date of birth:')]")  # Array where len(check) will tell you how many vehicles in policy
        if not len(multi_driver_check) >= 2:
            raise Exception('Cannot remove a driver if only 1 driver exists on the policy')

        remove_driver_buttons = self.webdriver.find_elements_by_xpath('//button[text()="Remove"]')
        if remove_driver_buttons and len(remove_driver_buttons) >= 2:
            remove_driver_buttons[1].click()
        else:
            raise Exception('Could not find driver_remove button')
        self.webdriver.find_element_by_xpath('//a[@href="/account/drivers/01/remove"]').click()
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'requester_name'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

        requester_name_field = Select(self.webdriver.find_element_by_name('requester_name'))
        requester_name_field.select_by_index(1)
        driver_remove_reason_field = Select(self.webdriver.find_element_by_name('driver_remove_reason'))
        driver_remove_reason_field.select_by_visible_text('No longer lives in the household')
        date_fields = self.webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        other_frequent_driver_field = Select(self.webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')
        vehicle_usage_field = Select(self.webdriver.find_element_by_name('vehicle_usage'))
        vehicle_usage_field.select_by_visible_text('Pleasure')
        vehicle_annual_kms_field = self.webdriver.find_element_by_name('vehicle_annual_kms')
        vehicle_annual_kms_field.send_keys('90')
        date_fields = self.webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        self.webdriver.save_screenshot('screenshots/driver_remove_form/{0}-{1}.png'.format(datetime.datetime.now(), 'half_filled')) if self.screenshots else False

        for num in range(1, len(multi_driver_check) + 1):
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = self.webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)

    def test_successful_driver_remove(self):
        self.fill_form()
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            page_two_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Submit'))
            )
            self.assertTrue(page_two_element)
            self.webdriver.save_screenshot('screenshots/driver_remove_form/{0}-{1}.png'.format(datetime.datetime.now(), 'confirm')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form page two element: ', error)

        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)

            self.webdriver.save_screenshot('screenshots/driver_remove_form/{0}-{1}.png'.format(datetime.datetime.now(), 'success')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_remove_form success page element: ', error)
