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
            EC.presence_of_element_located((By.XPATH, '//a[@href="/account/drivers/add-driver"]'))
        )
    except TimeoutException as error:
        raise Exception('Timed out waiting for page to load')
    driver_add_button = webdriver.find_element(By.XPATH, '//a[@href="/account/drivers/add-driver"]')
    driver_add_button.click()
    try:
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.NAME, 'requester_name'))
        )
    except TimeoutException:
        raise Exception('Timed out waiting for requester_name_field')

    requester_name_field = Select(webdriver.find_element_by_name('requester_name'))
    requester_name_field.select_by_index(1)
    effective_date_field = webdriver.find_element_by_name("date_input")
    effective_date_field.send_keys('{}'.format(datetime.date.today() + datetime.timedelta(days=2)))
    driver_first_name_field = webdriver.find_element_by_name('driver_first_name')
    driver_first_name_field.send_keys('Bobby')
    driver_last_name_field = webdriver.find_element_by_name('driver_last_name')
    driver_last_name_field.send_keys('McFerrin')
    relationship_status_field = Select(webdriver.find_element_by_name('relationship_status'))
    relationship_status_field.select_by_visible_text('Relative')
    webdriver.find_element_by_xpath("//input[@name='licensed_in_policy_province' and @value='false']").click()

    marital_status_field = Select(webdriver.find_element_by_name('marital_status'))
    marital_status_field.select_by_visible_text('Single')
    authorization_status_field = Select(webdriver.find_element_by_name('authorization_status'))
    authorization_status_field.select_by_visible_text('No')
    licence_suspension_field = Select(webdriver.find_element_by_name('licence_suspension'))
    licence_suspension_field.select_by_visible_text('None')
    webdriver.find_element_by_xpath("//input[@name='auto_insurance_fraud' and @value='false']").click()
    other_frequent_driver_field = Select(webdriver.find_element_by_name('other_frequent_driver'))
    other_frequent_driver_field.select_by_visible_text('None')

    webdriver.find_element_by_xpath("//input[@name='consent' and @value='false']").click()
    vehicle_usage_fields = webdriver.find_elements_by_xpath('//select[@name="vehicle_usage"]')
    if vehicle_usage_fields:
        for field in vehicle_usage_fields:
            select_vehicle_usage_field = Select(field)
            select_vehicle_usage_field.select_by_visible_text('Pleasure')

    for num in range(1, len(multi_vehicle_check) + 1):
        #  fill in principal_driver field for 'x' vehicle
        stringified_num = '0{}'.format(num)
        x_principal_driver_field = webdriver.find_elements_by_xpath("//select[@name={0}]".format("'veh_{}_principal_driver'".format(stringified_num)))
        if x_principal_driver_field:
            Select(x_principal_driver_field[0]).select_by_index(1)
