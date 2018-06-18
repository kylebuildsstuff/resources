import os
import datetime

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

from scenarios.login import main as login


def main(webdriver):
    login(webdriver)
    submit_button = webdriver.find_element_by_class_name('Submit')
    submit_button.click()

    try:
        auth_element = WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'Authed'))
        )
    except TimeoutException as error:
        raise Exception('Login Submission Timed out: ', error)
    multi_vehicle_check = webdriver.find_elements_by_class_name('VehicleDetail')
    try:
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.XPATH, '//a[text()="Change Address"]'))
        )
    except TimeoutException as error:
        raise Exception('Timed out waiting for page to load')
    change_address_button = webdriver.find_element(By.XPATH, '//a[text()="Change Address"]')
    change_address_button.click()

    requester_name_field = Select(webdriver.find_element_by_name('requester_name'))
    requester_name_field.select_by_index(1)
    postal_code_field = webdriver.find_element_by_name('postal_code')
    postal_code_field.send_keys('N9G 2Z4')
    postal_code_field.send_keys(Keys.TAB)
    new_street_number_field = webdriver.find_element_by_name('new_street_number')
    new_street_number_field.send_keys('111')
    effective_date_field = webdriver.find_element_by_name("date_input")
    effective_date_field.send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
    other_frequent_driver_field = Select(webdriver.find_element_by_name('other_frequent_driver'))
    other_frequent_driver_field.select_by_visible_text('None')
    vehicle_usage_field = Select(webdriver.find_element_by_xpath("//select[@name='vehicle_usage']"))
    vehicle_usage_field.select_by_visible_text("Pleasure")
    annual_kms_fields = webdriver.find_elements_by_name('vehicle_annual_kms')
    vehicle_usage_fields = webdriver.find_elements_by_xpath('//select[@name="vehicle_usage"]')
    if vehicle_usage_fields:
        for field in vehicle_usage_fields:
            select_vehicle_usage_field = Select(field)
            select_vehicle_usage_field.select_by_visible_text('Pleasure')
    if annual_kms_fields:
        for field in annual_kms_fields:
            field.send_keys('123')
    for num in range(1, len(multi_vehicle_check) + 1):
        stringified_num = '0{}'.format(num)
        x_principal_driver_field = webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
        if x_principal_driver_field:
            Select(x_principal_driver_field[0]).select_by_index(1)
