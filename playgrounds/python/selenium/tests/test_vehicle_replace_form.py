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


class TestVehicleReplaceForm(FormLogin):

    def setUp(self):
        super().setUp()
        self.valid_vins = ['1A4GP45R86B638089', '3GTP1VE03BG498033', '4T1BF1FK9GU572575']
        self.invalid_vins = ['3ATP1VE03BG498033', '123456asdasdf', '3GTP1VE03BG49803-']
        self.valid_but_not_in_db_vins = ['3H1HF0308KD498926', '1XKDDR9X31J880802']

        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Authed'))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')
        self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'logged_in')) if self.screenshots else False
        #  Create check for multiple_vehicles
        self.multi_vehicle_check = self.webdriver.find_elements_by_class_name('VehicleDetail')
        if len(self.multi_vehicle_check) >= 2:
            vehicle_replace_button = self.webdriver.find_element(By.XPATH, '//button[text()="Replace"]')
            vehicle_replace_button.click()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.XPATH, '//a[@href="/account/vehicles/01/replace"]'))
                )
                self.webdriver.find_element(By.XPATH, '//a[@href="/account/vehicles/01/replace"]').click()
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.NAME, 'requester_name'))
                    )
                except TimeoutException:
                    raise Exception('Timed out waiting for requester_name_field')
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

        else:
            vehicle_replace_button = self.webdriver.find_element(By.XPATH, '//a[text()="Replace"]')
            vehicle_replace_button.click()
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
        requester_name_field.select_by_index(1)
        removing_vehicle_status_field = Select(self.webdriver.find_element_by_name('removing_vehicle_status'))
        removing_vehicle_status_field.select_by_visible_text('Traded in to dealership')
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'date_input'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

        date_fields = self.webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
        adding_vin_field.send_keys('2G1WF55K759381979')
        adding_vin_field.send_keys(Keys.TAB)  # Should autofill year, make, model from VIN
        date_fields[1].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        registered_province_field = Select(self.webdriver.find_element_by_name('registered_province'))
        registered_province_field.select_by_visible_text('Ontario')
        vehicle_condition_field = Select(self.webdriver.find_element_by_xpath("//select[@name='vehicle_condition']"))
        vehicle_condition_field.select_by_visible_text("Used")
        price_of_vehicle_field = self.webdriver.find_element_by_name('price_of_vehicle')
        price_of_vehicle_field.send_keys("9500")
        vehicle_usage_field = Select(self.webdriver.find_element_by_xpath("//select[@name='vehicle_usage']"))
        vehicle_usage_field.select_by_visible_text("Pleasure")
        vehicle_annual_kms_field = self.webdriver.find_element_by_name('vehicle_annual_kms')
        vehicle_annual_kms_field.send_keys('12345')
        self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'half_filled')) if self.screenshots else False
        self.webdriver.find_element_by_xpath("//input[@name='carry_passengers_for_compensation' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='carry_special_use' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='vehicle_modified' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='existing_damage' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='winter_tires' and @value='false']").click()
        registered_owner_field = Select(self.webdriver.find_element_by_xpath("//select[@name='registered_owner']"))
        registered_owner_field.select_by_index(1)
        principal_driver_field = Select(self.webdriver.find_element_by_xpath("//select[@name='principal_driver']"))
        principal_driver_field.select_by_index(1)

        for num in range(2, len(self.multi_vehicle_check) + 1):
            #  fill in principal_driver field for 'x' vehicle
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = self.webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)
        financing_field = Select(self.webdriver.find_element_by_name('financing'))
        financing_field.select_by_visible_text('No')
        other_frequent_driver_field = Select(self.webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')

    def test_successful_vehicle_replace(self):
        self.fill_form()
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            page_two_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Submit'))
            )
            self.assertTrue(page_two_element)
            self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'page_two')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding vehicle_replace_form page two element: ', error)

        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)
            self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'submit_success')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form success page element: ', error)

    # @unittest.skip('')
    def test_successful_vehicle_add(self):
        self.fill_form()
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            page_two_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Submit'))
            )
            self.assertTrue(page_two_element)
        except TimeoutException as error:
            raise Exception('Timed out finding vehicle_replace_form page two element: ', error)

        self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'page_two')) if self.screenshots else False
        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)
            self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'submit_success')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form success page element: ', error)  # does not work if bad vin is second or third in list...data is already there

    # @unittest.skip('')
    def test_valid_vins_auto_populate_vehicle_fields_with_data(self):
        for vin in self.valid_vins:
            # Needs to refresh or else invalid vin will reuse stale data and pass
            self.webdriver.refresh()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

            adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
            adding_vehicle_year_field = self.webdriver.find_element_by_name('adding_vehicle_year')
            adding_vin_field.send_keys(vin)
            adding_vin_field.send_keys(Keys.TAB)
            try:
                adding_vehicle_make_field = Select(WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.XPATH, "//select[@name='adding_vehicle_make']"))
                ))
                adding_vehicle_model_field = Select(WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.XPATH, "//select[@name='adding_vehicle_model']"))
                ))
            except TimeoutException as error:
                raise Exception('VIN {} produced no data and is invalid'.format(vin), error)
            self.assertTrue(adding_vin_field.get_attribute("value"))
            self.assertTrue(adding_vehicle_make_field.first_selected_option.get_attribute('value'))
            self.assertTrue(adding_vehicle_model_field.first_selected_option.get_attribute('value'))
            self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_valid_vins_auto_populate_vehicle_fields_with_data')) if self.screenshots else False

    # @unittest.skip('')
    def test_invalid_vins_pop_an_error_message(self):
        for vin in self.invalid_vins:
            self.webdriver.refresh()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

            adding_vehicle_year_field = self.webdriver.find_element_by_name('adding_vehicle_year')
            adding_vehicle_year_field.clear()
            adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
            adding_vin_field.send_keys(vin)
            adding_vin_field.send_keys(Keys.TAB)
            error_message_elements = self.webdriver.find_elements_by_xpath('//p[@class="error-msg"]')
            if len(error_message_elements) == 2:
                self.assertTrue(len(error_message_elements) == 2)
                self.assertFalse(adding_vehicle_year_field.get_attribute("value"))
                self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_invalid_vins_pop_an_error_message')) if self.screenshots else False
            else:
                raise Exception('VIN {} did NOT populate an error message'.format(vin))

    # @unittest.skip('')
    def test_valid_but_not_in_db_vins_do_not_pop_up_error_messages_and_do_not_fill_vehicle_fields(self):
        for vin in self.valid_but_not_in_db_vins:
            self.webdriver.refresh()
            try:
                WebDriverWait(self.webdriver, self.timeout).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')

            adding_vehicle_year_field = self.webdriver.find_element_by_name('adding_vehicle_year')
            adding_vehicle_year_field.clear()
            adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
            adding_vin_field.send_keys(vin)
            adding_vin_field.send_keys(Keys.TAB)
            error_message_elements = self.webdriver.find_elements_by_xpath('//p[@class="error-msg"]')
            if len(error_message_elements) == 1:  # error message for empty vehicle year
                self.assertTrue(len(error_message_elements) == 1)
                self.assertFalse(adding_vehicle_year_field.get_attribute("value"))
                self.webdriver.save_screenshot('screenshots/vehicle_replace_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_valid_but_not_in_db_vins_do_not_pop_up_error_messages_and_do_not_fill_vehicle_fields')) if self.screenshots else False
            else:
                raise Exception('VIN {} is NOT a valid_but_not_in_db vin'.format(vin))
