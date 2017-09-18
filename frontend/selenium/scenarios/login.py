import os

from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


def main(webdriver):
    webdriver.get('{0}/login'.format(os.environ.get('DOMAIN_URL', 'DOMAIN_URL_NOT_FOUND')))
    try:
        WebDriverWait(webdriver, int(os.environ.get('TIMEOUT'))).until(
            EC.presence_of_element_located((By.NAME, 'email'))
        )
    except TimeoutException as error:
        raise Exception('Timed out waiting for login page to load: ', error)

    email_field = webdriver.find_element_by_name('email')
    password_field = webdriver.find_element_by_name('password')

    email_field.send_keys(os.environ.get('LOGIN_USER_EMAIL'))
    password_field.send_keys(os.environ.get('LOGIN_PASSWORD'))
