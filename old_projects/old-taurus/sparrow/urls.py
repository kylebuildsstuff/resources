from django.conf.urls import url

from sparrow import views

urlpatterns = [
    url(r'^', views.index, name='index'),
]
