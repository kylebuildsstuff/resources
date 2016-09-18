from django.test import TestCase

# Create your tests here.
def order(request):
    """Send an order form from admin with contact/order details"""

    context_dic = {}
    if request.method =='POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            recipients = [form.cleaned_data['sender'], 'saraducharme@macrofoods.ca', 'chrisjames@macrofoods.ca']

            subject = ("Order: " + str(form.cleaned_data['name']))
            request = ("Name: " + str(form.cleaned_data['name']) + '\n' +
            "Contact number: " + str(form.cleaned_data['phone']) + '\n' +
            "Address: " + str(form.cleaned_data['address']) + '\n' +
            "Email: " + str(form.cleaned_data['sender']) + '\n' +
            "Number of meal days: " + str(form.cleaned_data['days']) + '\n' +
            '\n' +
            "A Meals: " + str(form.cleaned_data['meal1']) + '\n' +
            "B Meals: " + str(form.cleaned_data['meal2']) + '\n' +
            "C Meals: " + str(form.cleaned_data['meal3']) + '\n' +
            "Custom Meals: " + str(form.cleaned_data['meal4']) + '\n' +
            '\n' +
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


    context_dic['form'] = form
    return render(request, 'Food/order.html', context_dic)

class OrderForm(forms.Form):

    name = forms.CharField(label="Name")
    sender = forms.EmailField(label="Email")
    phone = forms.CharField(label="Contact Number")
    address = forms.CharField(label="Address")
    days = forms.IntegerField(label="Number of meal days")
    meal1 = forms.IntegerField(label="A Meals", initial=0)
    meal2 = forms.IntegerField(label="B Meals", initial=0)
    meal3 = forms.IntegerField(label="C Meals", initial=0)
    meal4 = forms.IntegerField(label="Custom Meals", initial=0)
    message = forms.CharField(label="Requests", initial="n/a", widget=forms.Textarea)

<div class="row zero-padding">
  <div class="col-xs-12 orderform">
    <form class="orderfields" id=orderform method="post" action="/order/">
      {% csrf_token %}
      <p>{{ form.name.label }}</p>
      <p>{{ form.name }}</p>
      <p>{{ form.sender.label }}</p>
      <p>{{ form.sender }}</p>
      <p>{{ form.address.label }}</p>
      <p>{{ form.address }}</p>
      <p>{{ form.days.label }}</p>
      <p>{{ form.days }}</p>
      <p>Meals per day: </p>
      <p>{{ form.meal1.label }}: {{ form.meal1 }}</p>
      <p>{{ form.meal2.label }}: {{ form.meal2 }}</p>
      <p>{{ form.meal3.label }}: {{ form.meal3 }}</p>
      <p>{{ form.meal4.label }}: {{ form.meal4 }}</p>

      <p>{{ form.message.label }}</p>
      <p>{{ form.message }}</p>
      <input type="submit" name="submit" value="Send"/>
    </form>
  </div>
</div>
