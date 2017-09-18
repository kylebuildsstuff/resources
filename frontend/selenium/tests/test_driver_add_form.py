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


class TestDriverAddForm(FormLogin):

    def setUp(self):
        super().setUp()
        self.driver_first_name = 'Bobby'
        self.driver_last_name = 'McFerrin'
        try:
            WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//a[@href="/account/drivers/add-driver"]'))
            )
            self.multi_vehicle_check = self.webdriver.find_elements_by_class_name('VehicleDetail')  # Array where len(check) will tell you how many vehicles in policy
        except TimeoutException as error:
            raise Exception('Timed out waiting for page to load')
        driver_add_button = self.webdriver.find_element(By.XPATH, '//a[@href="/account/drivers/add-driver"]')
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'start')) if self.screenshots else False
        driver_add_button.click()
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
        effective_date_field.send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        driver_first_name_field = self.webdriver.find_element_by_name('driver_first_name')
        driver_first_name_field.send_keys(self.driver_first_name)
        driver_last_name_field = self.webdriver.find_element_by_name('driver_last_name')
        driver_last_name_field.send_keys(self.driver_last_name)
        relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
        relationship_status_field.select_by_visible_text('Relative')
        self.webdriver.find_element_by_xpath("//input[@name='licensed_in_policy_province' and @value='false']").send_keys(Keys.SPACE)

        marital_status_field = Select(self.webdriver.find_element_by_name('marital_status'))
        marital_status_field.select_by_visible_text('Single')
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'half_filled')) if self.screenshots else False
        authorization_status_field = Select(self.webdriver.find_element_by_name('authorization_status'))
        authorization_status_field.select_by_visible_text('No')
        licence_suspension_field = Select(self.webdriver.find_element_by_name('licence_suspension'))
        licence_suspension_field.select_by_visible_text('None')
        self.webdriver.find_element_by_xpath("//input[@name='auto_insurance_fraud' and @value='false']").send_keys(Keys.SPACE)
        other_frequent_driver_field = Select(self.webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')

        for num in range(1, len(self.multi_vehicle_check) + 1):
            #  fill in principal_driver field for 'x' vehicle
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = self.webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)

        self.webdriver.find_element_by_xpath("//input[@name='consent' and @value='false']").send_keys(Keys.SPACE)

    def prepare_driver_licence_questions(self, licence_number=False):
        # fill form options: licensed in Ontario, out_of_province_licence_history, licence_number
        # exposes the licence date questions
        self.webdriver.find_element_by_xpath("//input[@name='licensed_in_policy_province' and @value='true']").send_keys(Keys.SPACE)
        try:
            out_of_province_history_field = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'out_of_province_history'))
            )
            self.assertTrue(out_of_province_history_field)
        except TimeoutException as error:
            raise Exception('Timed out waiting for out_of_province_history_field', error)
        self.webdriver.find_element_by_xpath("//input[@name='out_of_province_history' and @value='false']").send_keys(Keys.SPACE)
        try:
            drivers_licence_number_field = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'drivers_licence_number'))
            )
            self.assertTrue(drivers_licence_number_field)
        except TimeoutException as error:
            raise Exception('Timed out waiting for drivers_licence_number_field', error)
        drivers_licence_number_field.send_keys(licence_number if licence_number else 'M61014070660905')
        try:
            basedrivers_licence_class_field = Select(WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.NAME, 'Basedrivers_licence_class'))
            ))
            self.assertTrue(basedrivers_licence_class_field)
        except TimeoutException as error:
            raise Exception('Timed out waiting for Basedrivers_licence_class_field', error)

    def fill_licence_dates(self, **kwargs):
        if kwargs.get('a_licence_date', None):
            formatted_text = "When did {} get their A licence?".format(self.driver_first_name)
            a_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not a_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for a licence fields', error)

            a_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            a_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            a_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            a_ddf_month_field.select_by_index(kwargs.get('a_licence_date').month)
            a_ddf_day_field.send_keys('01')
            a_ddf_year_field.send_keys('{}'.format(kwargs.get('a_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('b_licence_date', None):
            formatted_text = "When did {} get their B licence?".format(self.driver_first_name)
            b_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not b_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for b licence fields', error)

            b_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            b_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            b_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            b_ddf_month_field.select_by_index(kwargs.get('b_licence_date').month)
            b_ddf_day_field.send_keys('01')
            b_ddf_year_field.send_keys('{}'.format(kwargs.get('b_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('c_licence_date', None):
            formatted_text = "When did {} get their C licence?".format(self.driver_first_name)
            c_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not c_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for c licence fields', error)

            c_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            c_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            c_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            c_ddf_month_field.select_by_index(kwargs.get('c_licence_date').month)
            c_ddf_day_field.send_keys('01')
            c_ddf_year_field.send_keys('{}'.format(kwargs.get('c_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('d_licence_date', None):
            formatted_text = "When did {} get their D licence?".format(self.driver_first_name)
            d_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not d_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for d licence fields', error)

            d_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            d_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            d_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            d_ddf_month_field.select_by_index(kwargs.get('d_licence_date').month)
            d_ddf_day_field.send_keys('01')
            d_ddf_year_field.send_keys('{}'.format(kwargs.get('d_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('e_licence_date', None):
            formatted_text = "When did {} get their E licence?".format(self.driver_first_name)
            e_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not e_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for e licence fields', error)

            e_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            e_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            e_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            e_ddf_month_field.select_by_index(kwargs.get('e_licence_date').month)
            e_ddf_day_field.send_keys('01')
            e_ddf_year_field.send_keys('{}'.format(kwargs.get('e_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('f_licence_date', None):
            formatted_text = "When did {} get their F licence?".format(self.driver_first_name)
            f_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not f_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for f licence fields', error)

            f_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            f_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            f_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            f_ddf_month_field.select_by_index(kwargs.get('f_licence_date').month)
            f_ddf_day_field.send_keys('01')
            f_ddf_year_field.send_keys('{}'.format(kwargs.get('f_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields
        if kwargs.get('g_licence_date', None):
            formatted_text = "When did {} get their G licence?".format(self.driver_first_name)
            g_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not g_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for g licence fields', error)

            g_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            g_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            g_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            g_ddf_month_field.select_by_index(kwargs.get('g_licence_date').month)
            g_ddf_day_field.send_keys('01')
            g_ddf_year_field.send_keys('{}'.format(kwargs.get('g_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields

        if kwargs.get('g2_licence_date', None):
            formatted_text = "When did {} get their G2 licence?".format(self.driver_first_name)
            g2_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not g2_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for G2 licence fields', error)

            g2_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            g2_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            g2_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            g2_ddf_month_field.select_by_index(kwargs.get('g2_licence_date').month)
            g2_ddf_day_field.send_keys('01')
            g2_ddf_year_field.send_keys('{}'.format(kwargs.get('g2_licence_date').year))
            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Child')

        if kwargs.get('g1_licence_date', None):
            formatted_text = "When did {} get their G1 licence?".format(self.driver_first_name)
            g1_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not g1_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for G1 licence fields', error)

            g1_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            g1_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            g1_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            g1_ddf_month_field.select_by_index(kwargs.get('g1_licence_date').month)
            g1_ddf_day_field.send_keys('01')
            g1_ddf_year_field.send_keys('{}'.format(kwargs.get('g1_licence_date').year))
            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Relative')

        if kwargs.get('m_licence_date', None):
            self.webdriver.find_element_by_xpath("//input[@name='Baseother_licence' and @value='false']").send_keys(Keys.SPACE)
            formatted_text = "When did {} get their M licence?".format(self.driver_first_name)
            m_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not m_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for m licence fields', error)

            m_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            m_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            m_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            m_ddf_month_field.select_by_index(kwargs.get('m_licence_date').month)
            m_ddf_day_field.send_keys('01')
            m_ddf_year_field.send_keys('{}'.format(kwargs.get('m_licence_date').year))

            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Spouse')  # Explicitly focus another field... Using tabs gave some weird bugs with xpath and these date fields

        if kwargs.get('m2_licence_date', None):
            self.webdriver.find_element_by_xpath("//input[@name='Baseother_licence' and @value='false']").send_keys(Keys.SPACE)
            formatted_text = "When did {} get their M2 licence?".format(self.driver_first_name)
            m2_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not m2_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for M2 licence fields', error)

            m2_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            m2_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            m2_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            m2_ddf_month_field.select_by_index(kwargs.get('m2_licence_date').month)
            m2_ddf_day_field.send_keys('01')
            m2_ddf_year_field.send_keys('{}'.format(kwargs.get('m2_licence_date').year))
            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Child')

        if kwargs.get('m1_licence_date', None):
            self.webdriver.find_element_by_xpath("//input[@name='Baseother_licence' and @value='false']").send_keys(Keys.SPACE)
            formatted_text = "When did {} get their M1 licence?".format(self.driver_first_name)
            m1_field_check = self.webdriver.find_elements_by_xpath('//label[text()="{}"]'.format(formatted_text))
            if not m1_field_check:
                try:
                    WebDriverWait(self.webdriver, self.timeout).until(
                        EC.presence_of_element_located((By.XPATH, '//label[text()="{}"]'.format(formatted_text)))
                    )
                except TimeoutException as error:
                    raise Exception('Timed out waiting for M1 licence fields', error)

            m1_ddf_month_field = Select(self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//select".format(formatted_text)))
            m1_ddf_day_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-day']".format(formatted_text))
            m1_ddf_year_field = self.webdriver.find_element_by_xpath("//label[text()='{}']//following-sibling::div[@class='field']//div[@class='dmy']//input[@class='dmy-year']".format(formatted_text))

            m1_ddf_month_field.select_by_index(kwargs.get('m1_licence_date').month)
            m1_ddf_day_field.send_keys('01')
            m1_ddf_year_field.send_keys('{}'.format(kwargs.get('m1_licence_date').year))
            relationship_status_field = Select(self.webdriver.find_element_by_name('relationship_status'))
            relationship_status_field.select_by_visible_text('Relative')

    # @unittest.skip('')
    def test_successful_driver_add(self):
        self.fill_form()
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()

        try:
            page_two_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'Submit'))
            )
            self.assertTrue(page_two_element)
            self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'confirm')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form page two element: ', error)

        page_two_element.click()

        try:
            success_page_element = WebDriverWait(self.webdriver, self.timeout).until(
                EC.presence_of_element_located((By.XPATH, '//h3[text()="Received Your Request"]'))
            )
            self.assertTrue(success_page_element)
            self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'success')) if self.screenshots else False
        except TimeoutException as error:
            raise Exception('Timed out finding driver_add_form success page element: ', error)

    # @unittest.skip('')
    def test_g_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date.today() + datetime.timedelta(days=50),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g2_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G2')

        licence_dates = {
            'g2_licence_date': datetime.date.today() + datetime.timedelta(days=50),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g1_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G1')

        licence_dates = {
            'g1_licence_date': datetime.date.today() + datetime.timedelta(days=50),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_m_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('M')

        licence_dates = {
            'm_licence_date': datetime.date.today() + datetime.timedelta(days=50),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_a_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('A')

        licence_dates = {
            'a_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_b_licence_date_cannot_be_in_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('B')

        licence_dates = {
            'b_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_c_licence_date_cannot_be_in_the_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('C')

        licence_dates = {
            'c_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_d_licence_date_cannot_be_in_the_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('D')

        licence_dates = {
            'd_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_e_licence_date_cannot_be_in_the_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('E')

        licence_dates = {
            'e_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_f_licence_date_cannot_be_in_the_future(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('F')

        licence_dates = {
            'f_licence_date': datetime.date.today() + datetime.timedelta(days=50),
            'g_licence_date': datetime.date(year=1990, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'licence_date_error_future')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Licence date cannot be in the future"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g2_date_must_be_at_least_12_months_before_g_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2000, month=6, day=1),
            'g2_licence_date': datetime.date(year=2000, month=5, day=1),
            'g1_licence_date': datetime.date(year=1999, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'g2TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="G2 date must be at least 12 months before G date"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g_licence_g1_date_must_be_at_least_8_months_before_g2_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2000, month=6, day=1),
            'g2_licence_date': datetime.date(year=1999, month=6, day=1),
            'g1_licence_date': datetime.date(year=1999, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="G1 date must be at least 8 months before G2 date"]')
        self.assertTrue(error_message_element)
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'g1TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)

    # @unittest.skip('')
    def test_g2_licence_g1_date_must_be_at_least_8_months_before_g2_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G2')

        licence_dates = {
            'g2_licence_date': datetime.date(year=1999, month=6, day=1),
            'g1_licence_date': datetime.date(year=1999, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="G1 date must be at least 8 months before G2 date"]')
        self.assertTrue(error_message_element)
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'g1TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)

    # @unittest.skip('')
    def test_g_licence_too_young_to_hold_g_licence_before_gdl(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070800101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=1993, month=1, day=1)
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G licence"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g_licence_too_young_to_hold_g_licence_after_gdl(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2005, month=1, day=1)
        }

        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G licence"]')
        self.assertTrue(error_message_element)

    @unittest.skip('Currently known bug. Error messages says ...too young to hold a G licence instead of ...too young to hold a G2 licence')
    def test_g_licence_too_young_to_hold_g2_licence(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2007, month=1, day=1),
            'g2_licence_date': datetime.date(year=2007, month=1, day=1) - relativedelta(years=3),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G2 licence"]')
        self.assertTrue(error_message_element)

    @unittest.skip('Currently known bug. Error messages says ...too young to hold a G licence instead of ...too young to hold a G1 licence')
    def test_g_licence_too_young_to_hold_g1_licence(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2007, month=1, day=1),
            'g2_licence_date': datetime.date(year=2006, month=1, day=1),
            'g1_licence_date': datetime.date(year=2003, month=1, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G2 licence"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g2_licence_too_young_to_hold_g2_licence(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G2')

        licence_dates = {
            'g2_licence_date': datetime.date(year=2005, month=1, day=1),
            'g1_licence_date': datetime.date(year=2004, month=1, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G2 licence"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g2_licence_too_young_to_hold_g1_licence(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G2')

        licence_dates = {
            'g2_licence_date': datetime.date(year=2006, month=1, day=1),
            'g1_licence_date': datetime.date(year=2005, month=1, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G1 licence"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_g1_licence_too_young_to_hold_g1_licence(self):
        self.fill_form()
        self.prepare_driver_licence_questions(licence_number='M61014070900101')  # AGE 19/ANS YYYY/MM/DD
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G1')

        licence_dates = {
            'g1_licence_date': datetime.date(year=2005, month=1, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_1')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'test_g_licence_too_young_to_hold_g_licence_before_gdl_after_clicking_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="You must be at least 16 years old to hold a G1 licence"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_invalid_g2_date_before_1994(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2000, month=6, day=1),
            'g2_licence_date': datetime.date(year=1993, month=6, day=1),
            'g1_licence_date': datetime.date(year=1992, month=6, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'invalidGdl')) if self.screenshots else False
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Date appears to be invalid: cannot enter a graduated licensing date prior to April 1, 1994."]')
        self.assertTrue(error_message_element)
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)

    # @unittest.skip('')
    def test_invalid_g1_date_before_1994(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('G')

        licence_dates = {
            'g_licence_date': datetime.date(year=2000, month=6, day=1),
            'g2_licence_date': datetime.date(year=1999, month=6, day=1),
            'g1_licence_date': datetime.date(year=1992, month=11, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'invalidGdl')) if self.screenshots else False
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="Date appears to be invalid: cannot enter a graduated licensing date prior to April 1, 1994."]')
        self.assertTrue(error_message_element)
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)

    @unittest.skip('Currently known bug. validation currently does not work properly for this test')
    def test_m2_date_must_be_at_least_12_months_before_m_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('M')

        licence_dates = {
            'm_licence_date': datetime.date(year=2000, month=6, day=1),
            'm2_licence_date': datetime.date(year=2000, month=5, day=1),
            'm1_licence_date': datetime.date(year=1999, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'm2TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="M2 date must be at least 12 months before M date"]')
        self.assertTrue(error_message_element)

    @unittest.skip('Currently known bug. No Error message shows up occasionally')
    def test_m_licence_m1_date_must_be_at_least_8_months_before_m2_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('M')

        licence_dates = {
            'm_licence_date': datetime.date(year=2000, month=6, day=1),
            'm2_licence_date': datetime.date(year=1999, month=6, day=1),
            'm1_licence_date': datetime.date(year=1999, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'm2TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="M1 date must be at least 8 months before M2 date"]')
        self.assertTrue(error_message_element)

    @unittest.skip('Currently known bug. Error message says "G1 date must be at least 8 months before G2 date"... should be M licences')
    def test_m2_licence_m1_date_must_be_at_least_8_months_before_m2_date(self):
        self.fill_form()
        self.prepare_driver_licence_questions()
        basedrivers_licence_class_field = Select(self.webdriver.find_element_by_name('Basedrivers_licence_class'))
        basedrivers_licence_class_field.select_by_visible_text('M2')

        licence_dates = {
            'm2_licence_date': datetime.date(year=2000, month=6, day=1),
            'm1_licence_date': datetime.date(year=2000, month=5, day=1),
        }
        self.fill_licence_dates(**licence_dates)

        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'm2TimeBetween')) if self.screenshots else False
        self.webdriver.find_element(By.XPATH, '//button[text()="Next"]').click()
        self.webdriver.save_screenshot('screenshots/driver_add_form/{0}-{1}.png'.format(datetime.datetime.now(), 'picture_after_trying_to_click_next')) if self.screenshots else False
        page_two_elements = self.webdriver.find_elements_by_class_name('Submit')
        self.assertFalse(page_two_elements)
        error_message_element = self.webdriver.find_element_by_xpath('//p[text()="M1 date must be at least 8 months before M2 date"]')
        self.assertTrue(error_message_element)

    # @unittest.skip('')
    def test_5gdl_date_must_be_at_least_24_months_before_5_date(self):
        pass

    # @unittest.skip('')
    def test_7_date_must_be_at_least_12_months_before_5gdl_date(self):
        pass
