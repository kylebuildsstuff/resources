from django.conf.urls import patterns, url
from Food import views

urlpatterns = [
               url(r'^$', views.index, name='index'),
               url(r'^email_success/$', views.email_success, name='email_success'),
               url(r'^contact/$', views.contact, name='contact')
              ]
