from django.conf.urls import url, include

from hydra import views

urlpatterns = [
url(r'^', views.index, name='index'),
]