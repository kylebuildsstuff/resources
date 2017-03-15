from celery import task
from celery.exceptions import SoftTimeLimitExceeded
import time

# To test, open 2 shells, first one run: ./manage.py celery worker --loglevel=info
# in the second shell, run ./manage.py shell
# then you can invoke .delay() on which ever task you want

# HARD time_limit is not catchable
# use soft time limit instead
@task(time_limit=2)
def add(x, y):
    try:
        time.sleep(3)
        return x + y
    except Exception as err:
        print('what', err)
        return None

@task(soft_time_limit=2)
def soft_add(x, y):
    try:
        time.sleep(3)
        return x + y
    except SoftTimeLimitExceeded as err:
        print('what', err)
        return None

@task()
def normal():
    print('ima normal task')
