from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from Food.models import Meal, MealItem, ContentEditer
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.conf import settings

from datetime import *
from dateutil.relativedelta import *
import calendar

from Food.forms import OrderForm, ContactForm


def index(request):
    context_dic = {}

    if request.method =='POST':
        form = OrderForm(request.POST)
        if form.is_valid():

            mealPrice = 8.00
            tax = 0.13
            deliveryFee = 2.50

            recipients = [form.cleaned_data['sender'], 'saraducharme@macrofoods.ca', 'chrisjames@macrofoods.ca']
            preTotal = ( (float(form.cleaned_data['days'])) * ((float(form.cleaned_data['mealnumber']))*mealPrice) + deliveryFee)
            taxTotal = (tax*preTotal) + preTotal

            finalTotal = ("%.2f" %taxTotal)
            numMeals = ((float(form.cleaned_data['days'])) * (float(form.cleaned_data['mealnumber'])))

            subject = ("Order: " + str(form.cleaned_data['name']))
            request = ("Name: " + str(form.cleaned_data['name']) + ' ' + str(form.cleaned_data['lastName']) + '\n' +
            "Contact number: " + str(form.cleaned_data['phone']) + '\n' +
            "Address: " + str(form.cleaned_data['address']) + '\n' +
            "Postal Code: " + str(form.cleaned_data['postal']) + '\n' +
            "Email: " + str(form.cleaned_data['sender']) + '\n' +
            "Meal type: " + str(form.cleaned_data['mealtype']) + '\n' +
            "Number of meals per day: " + str(form.cleaned_data['mealnumber']) + '\n' +
            "Number of days: " + str(form.cleaned_data['days']) + '\n' +
            "Delivery day preference: " + str(form.cleaned_data['delivery']) + '\n' +
            "*Deliveries will be split between Sunday and Wednesday if there are more than 3 days" + '\n' +
            "*DELIVERY OPTION ONLY AVAILIBLE FOR ORDERS WITH 3 OR MORE MEALS." + '\n' +
            '\n' +
            # "Preferred method of contact: " + str(form.cleaned_data['verificationtype']) +'\n' +
            "Permission to leave meal on porch/designated area in the event you are not home at time of delivery:" + str(form.cleaned_data['safety_consent']) + '\n' +
            '\n' +
            "Total number of meals: " + str(numMeals) + '\n' +
            "Total Price: $" + str(taxTotal) + '\n' +
            "*Tax and Delivery fee of 2.50 included" + '\n' +
            '\n' +
            "How did you hear about us?: " + str(form.cleaned_data['marketing']) + '\n' +
            "Message: " + str(form.cleaned_data['message']))

            send_mail(subject,
            request,
            settings.EMAIL_HOST_USER,
            recipients,
            fail_silently=False
            )
            return HttpResponseRedirect('/email_success/')
        else:
            print (form.errors)
    else:
        form = OrderForm()

    week_items = MealItem.objects.filter(meal__mealtype="Weekly")

    imagesHome = ContentEditer.objects.get(section="imagesHome")
    imagesHomeHealthy = ContentEditer.objects.get(section="imagesHomeHealthy")
    imagesHomeDelicious = ContentEditer.objects.get(section="imagesHomeDelicious")
    imagesHomeFlexible = ContentEditer.objects.get(section="imagesHomeFlexible")

    imagesHowitworks1 = ContentEditer.objects.get(section="imagesHowitworks1")
    imagesHowitworks2 = ContentEditer.objects.get(section="imagesHowitworks2")
    imagesHowitworks3 = ContentEditer.objects.get(section="imagesHowitworks3")
    imagesHowitworks4 = ContentEditer.objects.get(section="imagesHowitworks4")
    imagesHowitworksMacro1 = ContentEditer.objects.get(section="imagesHowitworksMacro1")
    imagesHowitworksMacro2 = ContentEditer.objects.get(section="imagesHowitworksMacro2")
    imagesHowitworksMacro3 = ContentEditer.objects.get(section="imagesHowitworksMacro3")

    imagesPiechart1 = ContentEditer.objects.get(section="imagesPiechart1")
    imagesPiechart2 = ContentEditer.objects.get(section="imagesPiechart2")
    imagesPiechart3 = ContentEditer.objects.get(section="imagesPiechart3")

    context_dic['week_items'] = week_items

    context_dic['imagesHome'] = imagesHome
    context_dic['imagesHomeHealthy'] = imagesHomeHealthy
    context_dic['imagesHomeDelicious'] = imagesHomeDelicious
    context_dic['imagesHomeFlexible'] = imagesHomeFlexible

    context_dic['imagesHowitworks1'] = imagesHowitworks1
    context_dic['imagesHowitworks2'] = imagesHowitworks2
    context_dic['imagesHowitworks3'] = imagesHowitworks3
    context_dic['imagesHowitworks4'] = imagesHowitworks4
    context_dic['imagesHowitworksMacro1'] = imagesHowitworksMacro1
    context_dic['imagesHowitworksMacro2'] = imagesHowitworksMacro2
    context_dic['imagesHowitworksMacro3'] = imagesHowitworksMacro3

    context_dic['imagesPiechart1'] = imagesPiechart1
    context_dic['imagesPiechart2'] = imagesPiechart2
    context_dic['imagesPiechart3'] = imagesPiechart3

    context_dic['form'] = form

    return render(request, 'Food/index.html', context_dic)


def contact(request):
    """Send an email from admin with a contact form"""

    context_dic = {}
    if request.method =='POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            recipients = [form.cleaned_data['sender'], 'saraducharme@macrofoods.ca', 'chrisjames@macrofoods.ca']

            send_mail(form.cleaned_data['subject'],
            form.cleaned_data['message'],
            settings.EMAIL_HOST_USER,
            recipients,
            fail_silently=False
            )
            return HttpResponseRedirect('/email_success/')
        else:
            print (form.errors)

    else:
        form = ContactForm()

    context_dic['form'] = form

    return render(request, 'Food/contact.html', context_dic)


def email_success(request):

    context_dic = {}

    return render(request, 'Food/email_success.html', context_dic)
