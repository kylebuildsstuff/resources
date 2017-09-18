# Standard Library
import os
import unittest
import datetime

# Third-Party Libraries
from dateutil.relativedelta import relativedelta
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

# Custom modules
from tests.base_classes import FormLogin


class TestVehicleAddForm(FormLogin):

    def setUp(self):
        super().setUp()
        # Try not to add more than 3 vins to each list because these are selenium tests and looping through them can get slow
        self.valid_vins = ['1A4GP45R86B638089', '3GTP1VE03BG498033', '4T1BF1FK9GU572575']
        self.invalid_vins = ['3ATP1VE03BG498033', '123456asdasdf', '3GTP1VE03BG49803-']
        self.valid_but_not_in_db_vins = ['3H1HF0308KD498926', '1XKDDR9X31J880802']
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//a[text()="Add"]'))
            )
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')

        self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'logged_in')) if self.screenshots else False
        self.multi_vehicle_check = self.webdriver.find_elements_by_class_name('VehicleDetail')  # Array where len(check) will tell you how many vehicles in policy
        vehicle_add_button = self.webdriver.find_element(By.XPATH, '//a[text()="Add"]')
        vehicle_add_button.click()
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
        effective_date_field = self.webdriver.find_element_by_name("date_input")
        effective_date_field.send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=1)))
        vin_field = self.webdriver.find_element_by_name('adding_vin')
        vin_field.send_keys('2G1WF55K759381979')
        vin_field.send_keys(Keys.TAB)  # Should autofill year, make, model from VIN
        vehicle_condition_field = Select(self.webdriver.find_element_by_xpath("//select[@name='vehicle_condition']"))
        vehicle_condition_field.select_by_visible_text("Used")
        price_field = self.webdriver.find_element_by_name('price_of_vehicle')
        price_field.send_keys("9500")
        vehicle_usage_field = Select(self.webdriver.find_element_by_xpath("//select[@name='vehicle_usage']"))
        vehicle_usage_field.select_by_visible_text("Pleasure")
        annual_kms_field = self.webdriver.find_element_by_name('vehicle_annual_kms')
        annual_kms_field.send_keys('12345')

        self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'half_filled_form')) if self.screenshots else False
        self.webdriver.find_element_by_xpath("//input[@name='carry_passengers_for_compensation' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='carry_special_use' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='vehicle_modified' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='existing_damage' and @value='false']").click()
        self.webdriver.find_element_by_xpath("//input[@name='winter_tires' and @value='false']").click()
        principal_driver_field = Select(self.webdriver.find_element_by_xpath("//select[@name='principal_driver']"))
        principal_driver_field.select_by_index(1)
        registered_owner_field = Select(self.webdriver.find_element_by_xpath("//select[@name='registered_owner']"))
        registered_owner_field.select_by_index(1)
        self.webdriver.find_element_by_xpath("//select[@name='financing']/option[text()='No']").click()
        self.webdriver.find_element_by_xpath("//select[@name='other_frequent_driver']/option[text()='None']").click()

        veh_01_principal_driver_field = Select(self.webdriver.find_element_by_xpath("//select[@name='veh_01_principal_driver']"))
        veh_01_principal_driver_field.select_by_index(1)

        for num in range(2, len(self.multi_vehicle_check) + 1):
            #  fill in principal_driver field for 'x' vehicle
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = self.webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)

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
            raise Exception('Timed out finding vehicle_add_form page two element: ', error)

        self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'page_two')) if self.screenshots else False
        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)
            self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'submit_success')) if self.screenshots else False
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
            self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_valid_vins_auto_populate_vehicle_fields_with_data')) if self.screenshots else False

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
                self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_invalid_vins_pop_an_error_message')) if self.screenshots else False
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
                self.webdriver.save_screenshot('screenshots/vehicle_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_valid_but_not_in_db_vins_do_not_pop_up_error_messages_and_do_not_fill_vehicle_fields')) if self.screenshots else False
            else:
                raise Exception('VIN {} is NOT a valid_but_not_in_db vin'.format(vin))

    # @unittest.skip('')
    def test_review_questions_update_when_updating_vehicles(self):
        # fill form
        if not self.valid_vins:
            raise Exception('no valid vin found in code')
        self.fill_form()
        adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
        adding_vin_field.clear()
        adding_vin_field.send_keys(self.valid_vins[0])
        adding_vin_field.send_keys(Keys.TAB)  # Should autofill year, make, model from VIN

        initial_adding_vin_field = adding_vin_field.get_attribute("value")
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            back_button_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//button[text()="Back"]'))
            )
            self.assertTrue(back_button_element)
        except TimeoutException as error:
            raise Exception('Timed out finding vehicle_add_form page back button: ', error)

        formatted_text = initial_adding_vin_field
        self.assertTrue(self.webdriver.find_element(By.XPATH, '//span[text()="{}"]'.format(formatted_text)))
        back_button_element.click()

        adding_vin_field = self.webdriver.find_element_by_name('adding_vin')
        adding_vin_field.clear()
        adding_vin_field.send_keys(self.valid_vins[1])

        adding_vin_field.send_keys(Keys.TAB)  # Should autofill year, make, model from VIN
        final_adding_vin_field = adding_vin_field.get_attribute("value")

        self.assertTrue(final_adding_vin_field != initial_adding_vin_field)
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            back_button_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//button[text()="Back"]'))
            )
            self.assertTrue(back_button_element)
        except TimeoutException as error:
            raise Exception('Timed out finding vehicle_add_form page back button: ', error)

        formatted_text_final = final_adding_vin_field
        self.assertTrue(self.webdriver.find_element(By.XPATH, '//span[text()="{}"]'.format(formatted_text_final)))
        self.assertFalse(self.webdriver.find_elements(By.XPATH, '//span[text()="{}"]'.format(formatted_text)))
