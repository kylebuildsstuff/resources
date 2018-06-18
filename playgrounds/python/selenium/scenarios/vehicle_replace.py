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
    if len(multi_vehicle_check) >= 2:
        vehicle_replace_button = webdriver.find_element(By.XPATH, '//button[text()="Replace"]')
        vehicle_replace_button.click()
        try:
            WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
                EC.presence_of_element_located((By.XPATH, '//a[@href="/account/vehicles/01/replace"]'))
            )
            webdriver.find_element(By.XPATH, '//a[@href="/account/vehicles/01/replace"]').click()
            try:
                WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
                    EC.presence_of_element_located((By.NAME, 'requester_name'))
                )
            except TimeoutException:
                raise Exception('Timed out waiting for requester_name_field')
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')
    else:
        vehicle_replace_button = webdriver.find_element(By.XPATH, '//a[text()="Replace"]')
        vehicle_replace_button.click()
        try:
            WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
                EC.presence_of_element_located((By.NAME, 'requester_name'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

    requester_name_field = Select(webdriver.find_element_by_name('requester_name'))
    requester_name_field.select_by_index(1)
    removing_vehicle_status_field = Select(webdriver.find_element_by_name('removing_vehicle_status'))
    removing_vehicle_status_field.select_by_visible_text('Traded in to dealership')

    try:
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.NAME, 'date_input'))
        )
    except TimeoutException:
        raise Exception('Timed out waiting for requester_name_field')

    date_fields = webdriver.find_elements_by_name("date_input")
    date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
    adding_vin_field = webdriver.find_element_by_name('adding_vin')
    adding_vin_field.send_keys('2G1WF55K759381979')
    adding_vin_field.send_keys(Keys.TAB)  # Should autofill year, make, model from VIN
    date_fields[1].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
    registered_province_field = Select(webdriver.find_element_by_name('registered_province'))
    registered_province_field.select_by_visible_text('Ontario')
    vehicle_condition_field = Select(webdriver.find_element_by_xpath("//select[@name='vehicle_condition']"))
    vehicle_condition_field.select_by_visible_text("Used")
    price_of_vehicle_field = webdriver.find_element_by_name('price_of_vehicle')
    price_of_vehicle_field.send_keys("9500")
    vehicle_usage_field = Select(webdriver.find_element_by_xpath("//select[@name='vehicle_usage']"))
    vehicle_usage_field.select_by_visible_text("Pleasure")
    vehicle_annual_kms_field = webdriver.find_element_by_name('vehicle_annual_kms')
    vehicle_annual_kms_field.send_keys('12345')
    webdriver.find_element_by_xpath("//input[@name='carry_passengers_for_compensation' and @value='false']").click()
    webdriver.find_element_by_xpath("//input[@name='carry_special_use' and @value='false']").click()
    webdriver.find_element_by_xpath("//input[@name='vehicle_modified' and @value='false']").click()
    webdriver.find_element_by_xpath("//input[@name='existing_damage' and @value='false']").click()
    webdriver.find_element_by_xpath("//input[@name='winter_tires' and @value='false']").click()
    registered_owner_field = Select(webdriver.find_element_by_xpath("//select[@name='registered_owner']"))
    registered_owner_field.select_by_index(1)
    principal_driver_field = Select(webdriver.find_element_by_xpath("//select[@name='principal_driver']"))
    principal_driver_field.select_by_index(1)

    for num in range(2, len(multi_vehicle_check) + 1):
        #  fill in principal_driver field for 'x' vehicle
        stringified_num = '0{}'.format(num)
        x_principal_driver_field = webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
        if x_principal_driver_field:
            Select(x_principal_driver_field[0]).select_by_index(1)

    financing_field = Select(webdriver.find_element_by_name('financing'))
    financing_field.select_by_visible_text('No')
    other_frequent_driver_field = Select(webdriver.find_element_by_name('other_frequent_driver'))
    other_frequent_driver_field.select_by_visible_text('None')

    annual_kms_fields = webdriver.find_elements_by_name('vehicle_annual_kms')
    vehicle_usage_fields = webdriver.find_elements_by_xpath('//select[@name="vehicle_usage"]')
    if vehicle_usage_fields:
        for field in vehicle_usage_fields:
            select_vehicle_usage_field = Select(field)
            select_vehicle_usage_field.select_by_visible_text('Pleasure')
    if annual_kms_fields:
        for field in annual_kms_fields:
            field.send_keys('123')
