import os

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


def main(webdriver):
    webdriver.get('{0}/signup'.format(os.environ.get('DOMAIN_URL', 'DOMAIN_URL_NOT_FOUND')))
    try:
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.NAME, 'email'))
        )
    except TimeoutException as error:
        raise Exception('Timed out waiting for signup page to load: ', error)

    if not os.environ.get('SIGNUP_POSTAL_CODE'):
        raise Exception('No postal code found to signup with')

    email_field = webdriver.find_element_by_name('email')
    email_field.send_keys(os.environ.get('LOGIN_USER_EMAIL'))
    postal_code_field = webdriver.find_element_by_name('postal_code')
    postal_code_field.send_keys(os.environ.get('SIGNUP_POSTAL_CODE'))
    password1_field = webdriver.find_element_by_name('password1')
    password1_field.send_keys(os.environ.get('LOGIN_PASSWORD'))
    password2_field = webdriver.find_element_by_name('password2')
    password2_field.send_keys(os.environ.get('LOGIN_PASSWORD'))
