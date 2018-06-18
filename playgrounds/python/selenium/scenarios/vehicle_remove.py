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
        remove_vehicle_buttons = webdriver.find_elements_by_xpath('//button[text()="Remove"]')
        if remove_vehicle_buttons:
            remove_vehicle_buttons[0].click()
        webdriver.find_element_by_xpath('//a[@href="/account/vehicles/01/remove"]').click()
        try:
            WebDriverWait(webdriver, int(os.environ.get('TIMEOUT', 5))).until(
                EC.presence_of_element_located((By.NAME, 'requester_name'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

        requester_name_field = Select(webdriver.find_element_by_name('requester_name'))
        requester_name_field.select_by_index(1)
        vehicle_remove_reason_field = Select(webdriver.find_element_by_name('vehicle_remove_reason'))
        vehicle_remove_reason_field.select_by_visible_text('Scrapped')
        registered_owner_field = Select(webdriver.find_element_by_name('registered_owner'))
        registered_owner_field.select_by_index(1)
        date_fields = webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        other_frequent_driver_field = Select(webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')
        vehicle_usage_field = Select(webdriver.find_element_by_name('vehicle_usage'))
        vehicle_usage_field.select_by_visible_text('Pleasure')
        vehicle_annual_kms_field = webdriver.find_element_by_name('vehicle_annual_kms')
        vehicle_annual_kms_field.send_keys('90')

        for num in range(1, len(multi_vehicle_check) + 1):
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)
    else:
        raise Exception('Can only remove Vehicle if policy has 2+ vehicles')
        webdriver.close()
