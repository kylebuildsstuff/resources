from django.conf.urls import url, include

from normal_api import views


app_name = 'normal_api'
urlpatterns = [
    url(r'^$', views.index, name='index')
]
