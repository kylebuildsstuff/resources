from datetime import *
from dateutil.relativedelta import *
import calendar

from django import forms
from Food.models import Meal, MealItem
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from django.core import validators

# from Food.views import current_sunday, current_wednesday


class OrderForm(forms.Form):
    now = datetime.now()
    today = date.today()
    hour_deadline = 17  # 5pm

    current_sunday = today + relativedelta(weekday=SU)
    current_wednesday = today + relativedelta(weekday=WE)
    next_sunday = today + relativedelta(days=3, weekday=SU)
    next_wednesday = today + relativedelta(days=3, weekday=WE)
    if (now.weekday() == 5 and now.hour >= hour_deadline or now.weekday() == 6):
        current_sunday = next_sunday
    elif (now.weekday() == 1 and now.hour >= hour_deadline or now.weekday() == 2):
        current_wednesday= next_wednesday


    VERIFY = [('email', ('Email')),
    ('phone', ('Phone')),
    ('text', ('Text'))]

    YESNO = [('Yes', ('Yes')),
    ('No', ('No'))]

    MEALTYPE = [('Pro, Carb, Vege', ('Protein, Carbohydrate, Vegetable')),
    ('Pro, Carb, Carb', ('Protein, Carbohydrate, Carbohydrate')),
    ('Pro, Vege, Vege', ('Protein, Vegetable, Vegetable')),
    ('Custom', ('Custom (please clarify in the comment box)'))]

    # DELIVERYDAY = [('February 21st 2016', ('February 21st, 2016')),
    # (('February 17th 2016', ('February 17th, 2016')))]

    DELIVERYDAY = [((current_sunday.strftime("%A, %B %d, %Y")), (current_sunday.strftime("%A, %B %d, %Y"))),
    (((current_wednesday.strftime("%A, %B %d, %Y")), (current_wednesday.strftime("%A, %B %d, %Y"))))]

    # February 3rd 2016

    name = forms.CharField(label="First Name", initial="required")
    lastName = forms.CharField(label="Last Name", initial="required")
    sender = forms.EmailField(label="Email", initial="required")
    senderConfirm = forms.EmailField(label="Confirm Email", initial="required")
    phone = forms.CharField(label="Contact Number", required=False)
    address = forms.CharField(label="Address", initial="required")
    postal = forms.CharField(label="Postal Code", required=False)
    # verificationtype = forms.ChoiceField(label="How would you like to receive confirmation of your order?", choices=VERIFY, initial='email', widget=forms.RadioSelect)
    safety_consent = forms.ChoiceField(label="In the event that you are not home during the time of delivery, do we have permission to leave the meals on your porch or designated area?",
                                       choices=YESNO, initial='Yes', widget=forms.RadioSelect)

    mealtype = forms.ChoiceField(label="Which meal would you like?", choices=MEALTYPE, initial='Pro, Carb, Vege')
    mealnumber = forms.IntegerField(label="How many meals per day would you like?", initial=0)
    days = forms.IntegerField(label="How many days would you like to order for?", initial=0)
    delivery = forms.ChoiceField(label="Which day would you like your meals delivered?", choices=DELIVERYDAY, initial=current_sunday.strftime("%A, %B %d, %Y"), widget=forms.RadioSelect)
    marketing = forms.CharField(label="How did you hear about us?", required=False, initial=" ")
    message = forms.CharField(label="Requests", required=False, widget=forms.Textarea)

class ContactForm(forms.Form):

    name = forms.CharField(label="Name")
    subject = forms.CharField(label="Subject")
    sender = forms.EmailField(label="Email")
    message = forms.CharField(label="Message", widget=forms.Textarea)
