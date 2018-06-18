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
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Date of birth:')]"))
        )
    except TimeoutException as error:
        raise Exception('Timed out waiting for page to load')

    multi_driver_check = webdriver.find_elements_by_xpath("//*[contains(text(), 'Date of birth:')]")  # Array where len(check) will tell you how many vehicles in policy
    if len(multi_driver_check) >= 2:
        remove_driver_buttons = webdriver.find_elements_by_xpath('//button[text()="Remove"]')
        if remove_driver_buttons and len(remove_driver_buttons) >= 2:
            remove_driver_buttons[1].click()
        else:
            raise Exception('Could not find driver_remove button')
        webdriver.find_element_by_xpath('//a[@href="/account/drivers/01/remove"]').click()
        try:
            WebDriverWait(webdriver, int(os.environ.get('TIMEOUT', 5))).until(
                EC.presence_of_element_located((By.NAME, 'requester_name'))
            )
        except TimeoutException:
            raise Exception('Timed out waiting for requester_name_field')

        requester_name_field = Select(webdriver.find_element_by_name('requester_name'))
        requester_name_field.select_by_index(1)
        driver_remove_reason_field = Select(webdriver.find_element_by_name('driver_remove_reason'))
        driver_remove_reason_field.select_by_visible_text('No longer lives in the household')
        date_fields = webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
        other_frequent_driver_field = Select(webdriver.find_element_by_name('other_frequent_driver'))
        other_frequent_driver_field.select_by_visible_text('None')
        vehicle_usage_field = Select(webdriver.find_element_by_name('vehicle_usage'))
        vehicle_usage_field.select_by_visible_text('Pleasure')
        vehicle_annual_kms_field = webdriver.find_element_by_name('vehicle_annual_kms')
        vehicle_annual_kms_field.send_keys('90')
        date_fields = webdriver.find_elements_by_name("date_input")
        date_fields[0].send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))

        vehicle_usage_fields = webdriver.find_elements_by_xpath('//select[@name="vehicle_usage"]')
        annual_kms_fields = webdriver.find_elements_by_name('vehicle_annual_kms')
        if vehicle_usage_fields:
            for field in vehicle_usage_fields:
                select_vehicle_usage_field = Select(field)
                select_vehicle_usage_field.select_by_visible_text('Pleasure')
        if annual_kms_fields:
            for field in annual_kms_fields:
                field.send_keys('123')

        for num in range(1, len(multi_driver_check) + 1):
            stringified_num = '0{}'.format(num)
            x_principal_driver_field = webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
            if x_principal_driver_field:
                Select(x_principal_driver_field[0]).select_by_index(1)
    else:
        raise Exception('Can only remove driver if policy has 2+ drivers')
        webdriver.close()
