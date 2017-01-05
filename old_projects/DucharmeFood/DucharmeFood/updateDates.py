from datetime import *


today = date.today()

if today.weekday() < 6:
    sunday = today + timedelta(days=6-(today.weekday()))
if today.weekday() == 6:
    sunday = today + timedelta(days=7)


if today.weekday() == 2:
    wednesday = today + timedelta(days=7)
if today.weekday() < 2:
    wednesday = today + timedelta(days=2-(today.weekday()))
if today.weekday() > 2:
    wednesday = today + timedelta(days=7-(today.weekday()-2))

print (sunday)
print (wednesday)

"""
sunday = date.today()
wednesday  = date.today()


today = date.today()

if sunday.weekday() < 6:
    sunday += timedelta(days=(6-sunday.weekday()))
elif sunday.weekday() == 6:
    sunday += timedelta(days=7)

if wednesday.weekday() < 2:
    wednesday += timedelta(days=(2-wednesday.weekday()))
elif wednesday.weekday() > 2:
    wednesday += timedelta(days=(7-(wednesday.weekday()-2)))
elif wednesday.weekday() == 2:
    wednesday += timedelta(days=7)
    

print (sunday)
print (wednesday)
"""
