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


class TestAddressChangeForm(FormLogin):

    def setUp(self):
        super().setUp()
        self.valid_postal_codes = ['a1a2b2', 'N0R 1A0']
        self.invalid_postal_codes = ['Z1A1A1', '{/-script', 'M2X6C6']

        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//a[text()="Change Address"]'))
            )
            self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'authed')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')
        self.multi_vehicle_check = self.webdriver.find_elements_by_class_name('VehicleDetail')  # Array where len(check) will tell you how many vehicles in policy
        change_address_button = self.webdriver.find_element(By.XPATH, '//a[text()="Change Address"]')
        change_address_button.click()

        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'requester_name'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

    def tearDown(self):
        self.webdriver.close()

    def fill_form(self):
        # Fills out the form with the most basic answers right up to the point before submitting
        requester_name_field = Select(self.webdriver.find_element_by_name('requester_name'))
        self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'start')) if self.screenshots else False
        requester_name_field.select_by_index(1)
        postal_code_field = self.webdriver.find_element_by_name('postal_code')
        postal_code_field.send_keys('N9G 2Z4')
        postal_code_field.send_keys(Keys.TAB)
        new_street_number_field = self.webdriver.find_element_by_name('new_street_number')
        new_street_number_field.send_keys('111')
        effective_date_field = self.webdriver.find_element_by_name("date_input")
        effective_date_field.send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        other_frequent_driver_field = Select(self.webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')
        vehicle_usage_field = Select(self.webdriver.find_element_by_xpath("//select[@name='vehicle_usage']"))
        vehicle_usage_field.select_by_visible_text("Pleasure")
        annual_kms_fields = self.webdriver.find_elements_by_name('vehicle_annual_kms')
        for index in range(len(self.multi_vehicle_check)):
            annual_kms_fields[index].send_keys('12345')
        self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'half_filled')) if self.screenshots else False
        veh_01_principal_driver_field = Select(self.webdriver.find_element_by_xpath("//select[@name='veh_01_principal_driver']"))
        veh_01_principal_driver_field.select_by_index(1)

        for num in range(2, len(self.multi_vehicle_check) + 1):
            #  fill in principal_driver field for 'x' vehicle
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = self.webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)

    # @unittest.skip('')
    def test_successful_address_change(self):
        self.fill_form()
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            page_two_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Submit'))
            )
            self.assertTrue(page_two_element)
            self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'confirm')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding vehicle_add_form page two element: ', error)

        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)
            self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'success')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form success page element: ', error)

    # @unittest.skip('')
    def test_valid_postal_codes_will_populate_data(self):
        for postal_code in self.valid_postal_codes:
            self.webdriver.refresh()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

            postal_code_field = self.webdriver.find_element_by_name('postal_code')
            postal_code_field.clear()
            postal_code_field.send_keys(postal_code)
            street_name_field = Select(self.webdriver.find_element_by_name("new_street_name"))
            new_municipality_field = self.webdriver.find_element_by_name("new_municipality")
            new_province_field = self.webdriver.find_element_by_name("new_province")

            self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_valid_postal_codes_will_populate_data')) if self.screenshots else False
            # self.assertTrue(street_name_field.first_selected_option.get_attribute('value'))
            self.assertTrue(new_municipality_field.get_attribute("value"))
            self.assertTrue(new_province_field.get_attribute('value'))

    # @unittest.skip('')
    def test_invalid_postal_codes_will_show_error(self):
        for postal_code in self.invalid_postal_codes:
            self.webdriver.refresh()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

            postal_code_field = self.webdriver.find_element_by_name('postal_code')
            postal_code_field.clear()
            postal_code_field.send_keys(postal_code)
            postal_code_field.send_keys(Keys.TAB)
            error_message_elements = self.webdriver.find_elements_by_xpath('//p[@class="error-msg"]')
            self.webdriver.save_screenshot('screenshots/address_change_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_invalid_postal_codes_will_show_error')) if self.screenshots else False
            self.assertTrue(len(error_message_elements) == 1)
